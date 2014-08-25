Toucher.Joystick = Toucher.Joybutton.extend({

    rad: 0,
    cos: 1,
    sin: 0,

    stickX: 0,
    stickY: 0,
    defaultStickX: null,
    defaultStickY: null,

    moveX: 0,
    moveY: 0,
    moveRadius: 0,
    distance: 0,

    minMoveRadius: 0, // scale
    maxMoveRadius: 100, // scale

    wayCount: 0, // 0 or null ==> full-ways

    followSpeed: 0, // scale
    followDistance: 0, // scale

    scale: 1,

    // TODO
    // warningEdge: false,
    // screenWidth: 0,
    // screenHeight: 0,

    init: function() {
        this.beforeInit();

        this.setScale(this.scale);

        this.onInit();
    },

    updateConfig: function() {
        if (this.wayCount) {
            this.wayRad = Math.PI * 2 / this.wayCount;
        }
        if (this.followSpeed) {
            this.followDistance = Math.max(this.maxMoveRadius, this.followDistance);
        }
    },

    setScale: function(scale) {
        scale = this.scale = scale || 1;
        this.minMoveRadius *=scale;
        this.maxMoveRadius *=scale;
        this.followSpeed *=scale;
        this.followDistance *=scale;
        this.updateConfig();
    },

    start: function(wrappers, event, controller) {
        if (this.disabled) {
            return;
        }
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === null && this.isOnMe(w.pageX, w.pageY)) {
                this.touchId = w.id;
                this.touched = true;
                this.pageX = w.pageX;
                this.pageY = w.pageY;
                if (this.dynamic) {
                    this.stickX = w.startPageX;
                    this.stickY = w.startPageY;
                } else {
                    this.updateMove();
                }
                this.onTouchStart(w, event, controller);
                break;
            }
        }
    },

    move: function(wrappers, event, controller) {
        if (this.disabled || this.touchId === null) {
            return;
        }
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === w.id) {
                this.pageX = w.pageX;
                this.pageY = w.pageY;
                if (this.updateMove()) {
                    this.onTouchMove(w, event, controller);
                }
                break;
            }
        }
    },

    updateMove: function() {
        var dx = this.dx = this.pageX - this.stickX;
        var dy = this.dy = this.pageY - this.stickY;

        if (!dx && !dy) {
            this.distance = 0;
            return false;
        }

        var r = this.distance = Math.sqrt(dx * dx + dy * dy);
        if (r < this.minMoveRadius) {
            this.moveX = this.moveY = this.moveRadius = 0;
            return;
        }

        var rad = Math.atan2(dy, dx);

        if (this.wayRad) {
            rad = Math.floor(rad / this.wayRad + 0.5) * this.wayRad;
        }

        this.rad = rad;
        this.cos = Math.cos(rad);
        this.sin = Math.sin(rad);

        if (r > this.maxMoveRadius) {
            r = this.maxMoveRadius;
            dx = r * this.cos;
            dy = r * this.sin;
        }
        this.moveX = dx;
        this.moveY = dy;
        this.moveRadius = r;
        return true;
    },

    end: function(wrappers, event, controller) {
        if (this.disabled) {
            return;
        }
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === w.id) {
                this.reset();
                this.onTouchEnd(w, event, controller);
                break;
            }
        }
    },

    reset: function() {
        this.touchId = null;
        this.touched = false;
        if (this.defaultStickX !== null) {
            this.stickX = this.defaultStickX;
        }
        if (this.defaultStickY !== null) {
            this.stickY = this.defaultStickY;
        }
        this.pageX = 0;
        this.pageY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.moveRadius = 0;
        this.distance = 0;
        this.rad = 0;
        this.cos = 1;
        this.sin = 0;
    },

    followTouch: function(timeStep) {
        if (this.disabled || !this.touched || !this.followSpeed || this.distance <= this.followDistance) {
            return;
        }
        var step = this.followSpeed * timeStep;
        if (!step) {
            return;
        }
        var dis = this.distance - this.followDistance;
        if (dis < step) {
            step = dis;
        }
        this.distance -= step;
        this.stickX += this.cos * step;
        this.stickY += this.sin * step;

    }

});
