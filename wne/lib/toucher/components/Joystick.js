Toucher.Joystick = Toucher.Listener.extend({

    rad: 0,
    cos: 1,
    sin: 0,

    touchId: null,
    stickX: 0,
    stickY: 0,

    moveX: 0,
    moveY: 0,
    moveRadius: 0,
    maxMoveRadius: 100,

    touchRegion: null,
    dynamic: false,
    follow: false,
    followSpeed: 0,
    followDistance: 0,

    filterWrapper: function(type, wrapper, event, controller) {
        return true;
    },

    isOnStick: function(x, y) {
        if (!this.touchRegion) {
            return true;
        }
        return this.isInRect(this.touchRegion, x, y);
    },

    isInRect: function(rect, x, y) {
        return rect && rect[0] < x && x < rect[2] && rect[1] < y && y < rect[3];
    },

    followTouch: function() {
        var dis = this.followDistance;
        var speed = this.followSpeed;
        if (this.pageX - this.stickX > this.moveX + dis) {
            this.stickX += speed;
        }
        if (this.pageX - this.stickX < this.moveX - dis) {
            this.stickX -= speed;
        }
        if (this.pageY - this.stickY > this.moveY + dis) {
            this.stickY += speed;
        }
        if (this.pageY - this.stickY < this.moveY - dis) {
            this.stickY -= speed;
        }
    },

    start: function(wrappers, event, controller) {
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === null && this.isOnStick(w.pageX, w.pageY)) {
                this.touchId = w.id;
                this.pageX = w.pageX;
                this.pageY = w.pageY;
                if (this.dynamic) {
                    this.stickX = w.startPageX;
                    this.stickY = w.startPageY;
                }
                this.onTouchStart(w, event, controller);
                break;
            }
        }
    },

    move: function(wrappers, event, controller) {
        if (this.touchId === null) {
            return;
        }
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === w.id) {
                var dx = w.pageX - this.stickX;
                var dy = w.pageY - this.stickY;

                if (dx || dy) {
                    this.pageX = w.pageX;
                    this.pageY = w.pageY;

                    this.rad = Math.atan2(dy, dx);
                    this.cos = Math.cos(this.rad);
                    this.sin = Math.sin(this.rad);
                    var r=Math.sqrt(dx * dx + dy * dy);
                    if (r>this.maxMoveRadius){
                        r=this.maxMoveRadius;
                        dx=r*this.cos;
                        dy=r*this.sin;
                    }
                    this.moveX = dx;
                    this.moveY = dy;
                    this.moveRadius = r;
                    this.onTouchMove(w, event, controller);

                    if (this.follow) {
                        this.followTouch();
                    }
                }
                break;
            }
        }

    },

    end: function(wrappers, event, controller) {
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === w.id) {
                this.touchId = null;
                // this.stickX = 0;
                // this.stickY = 0;
                this.pageX = 0;
                this.pageY = 0;
                this.moveX = 0;
                this.moveY = 0;
                this.moveRadius = 0;
                this.rad = 0;
                this.cos = 1;
                this.sin = 0;
                this.onTouchEnd(w, event, controller);
                break;
            }
        }
    },


    /* Implement by user */
    onTouchStart: function(wrappers, event, controller) {

    },

    /* Implement by user */
    onTouchMove: function(wrappers, event, controller) {

    },

    /* Implement by user */
    onTouchEnd: function(wrappers, event, controller) {

    }

});
