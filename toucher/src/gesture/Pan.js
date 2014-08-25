"use strict";
Toucher.Pan = Toucher.Listener.extend({

    valid: false,

    filterWrappers: function(type, wrappers, event, controller) {
        return wrappers.length == 1;
    },

    start: function(wrappers, event, controller) {

    },

    move: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        var dx = t0.deltaX;
        var dy = t0.deltaY;
        var x = t0.pageX;
        var y = t0.pageY;
        this.onPan(dx, dy, x, y, t0.startPageX, t0.startPageY, wrappers, event, controller);
    },

    end: function(wrappers, event, controller) {
        // this.valid=false;
    },

    /* Implement by user */
    onPan: function(dx, dy, x, y, sx, sy, wrappers, event, controller) {

    }

});
