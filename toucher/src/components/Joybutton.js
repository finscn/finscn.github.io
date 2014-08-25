Toucher.Joybutton = Toucher.Listener.extend({

    touchId: null,
    disabled: false,
    touchRegion: null,
    dynamic: false,

    buttonX: 0,
    buttonY: 0,
    hoverDown: false,

    filterWrapper: function(type, wrapper, event, controller) {
        return !this.disabled; //true;
    },
    enable: function() {
        this.disabled = false;
        this.touchId = null;
        this.touched = false;
    },
    disable: function() {
        this.disabled = true;
        this.touchId = null;
        this.touched = false;
    },

    reset: function(){
        this.disabled = false;
        this.touchId = null;
        this.touched = false;
    },

    isOnMe: function(x, y) {
        if (!this.touchRegion) {
            return true;
        }
        return this.isInRect(this.touchRegion, x, y);
    },

    onDown: function(wrapper, event, controller) {
        this.touched = true;
        this.onTouchStart(wrapper, event, controller);
    },

    onUp: function(wrapper, event, controller, out) {
        this.touchId = null;
        this.touched = false;
        this.onTouchEnd(wrapper, event, controller, out);
    },

    isInRect: function(rect, x, y) {
        return rect && rect[0] < x && x < rect[2] && rect[1] < y && y < rect[3];
    },

    start: function(wrappers, event, controller) {
        if (this.disabled) {
            return;
        }
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === null && this.isOnMe(w.pageX, w.pageY)) {
                this.touchId = w.id;
                this.onDown(w, event, controller);
                break;
            }
        }
    },

    move: function(wrappers, event, controller) {
        if (this.disabled) {
            return;
        }

        if (this.touchId) {
            for (var i = 0; i < wrappers.length; i++) {
                var w = wrappers[i];
                if (this.touchId === w.id) {
                    var hover = this.isOnMe(w.pageX, w.pageY);
                    if (this.touched && !hover) {
                        this.onUp(w, event, controller, true);
                    } else if (this.hoverDown && !this.touched && hover) {
                        this.onDown(w, event, controller);
                    }
                    break;
                }
            }
        } else {
            for (var i = 0; i < wrappers.length; i++) {
                var w = wrappers[i];
                if (this.hoverDown && this.isOnMe(w.pageX, w.pageY)) {
                    this.touchId = w.id;
                    this.onDown(w, event, controller);
                    break;
                }
            }
        }

        // } else if (!this.touched && this.isOnMe(w.pageX, w.pageY)) {
        //     this.onDown();
        // }
    },

    end: function(wrappers, event, controller) {
        if (this.disabled) {
            return;
        }
        for (var i = 0; i < wrappers.length; i++) {
            var w = wrappers[i];
            if (this.touchId === w.id) {
                // this.buttonX = 0;
                // this.buttonY = 0;
                // this.touchId = null;
                this.onUp(w, event, controller, !this.isOnMe(w.pageX, w.pageY));
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
