"use strict";

Toucher.Tap = Toucher.Listener.extend({

    maxTimeLag: 800,
    maxDistance: 15,

    filterWrappers: function(type, wrappers, event, controller) {
        if (wrappers.length == 1 && this.filterWrapper(type, wrappers[0], event, controller)) {
            return wrappers;
        }
        return false;
    },

    filterWrapper: function(type, wrapper, event, controller) {
        return true;
    },

    start: function(wrappers, event, controller) {
        if (this.onTouchStart != null) {
            this.onTouchStart(wrappers, event, controller);
        }
    },
    onTouchStart: null,

    move: function(wrappers, event, controller) {
        if (this.onTouchMove != null) {
            this.onTouchMove(wrappers, event, controller);
        }
    },
    onTouchMove: null,

    end: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        var x = t0.pageX;
        var y = t0.pageY;
        if (this.checkMoveDistance(t0) && this.checkTimeLag(t0)) {
            this.tapped = true;
            this.onTap(x, y, wrappers, event, controller);
        }
        if (this.onTouchEnd != null) {
            this.onTouchEnd(x, y, wrappers, event, controller);
        }
        this.tapped = false;
    },
    onTouchEnd: null,

    checkMoveDistance: function(wrapper) {
        var dx = Math.abs(wrapper.moveAmountX);
        var dy = Math.abs(wrapper.moveAmountY);

        return dx <= this.maxDistance && dy <= this.maxDistance;
    },

    checkTimeLag: function(wrapper) {
        return wrapper.endTime - wrapper.startTime < this.maxTimeLag;
    },

    /* Implement by user */
    onTap: function(x, y, wrappers, event, controller) {

    }

});
