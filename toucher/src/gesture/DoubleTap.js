"use strict";
Toucher.DoubleTap = Toucher.Tap.extend({

    maxTimeLag: 800,
    maxDistance: 10,
    prevTap: null,

    end: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        if (this.checkMoveDistance(t0) && this.checkTimeLag(t0)) {
            var startTime = t0.startTime;
            var endTime = t0.endTime;
            var x = t0.pageX;
            var y = t0.pageY;
            if (this.prevTap === null || endTime - this.prevTap.startTime > this.maxTimeLag || Math.abs(x - this.prevTap.pageX) > this.maxDistance || Math.abs(y - this.prevTap.pageY) > this.maxDistance) {
                this.prevTap = {
                    startTime: startTime,
                    endTime: endTime,
                    pageX: x,
                    pageY: y
                };
                this.onFirstTap(x, y, wrappers, event, controller);
            } else {
                this.tapped = true;
                this.onDoubleTap(x, y, wrappers, event, controller);
                this.prevTap = null;
                this.valid = false;
                this.tapped = false;
                return;
            }
        } else {
            this.prevTap = null;
        }
    },

    /* Implement by user */
    onFirstTap: function(x, y, wrappers, event, controller) {

    },
    onDoubleTap: function(x, y, wrappers, event, controller) {

    }


});
