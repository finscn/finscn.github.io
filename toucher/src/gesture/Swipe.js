"use strict";
Toucher.Swipe = Toucher.Listener.extend({

    minDistance: 60,
    maxTime: 1000,

    filterWrappers: function(type, wrappers, event, controller) {
        return wrappers.length == 1;
    },

    start: function(wrappers, event, controller) {

    },

    move: function(wrappers, event, controller) {

    },

    end: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        var time = (t0.endTime - t0.startTime);
        if (time > this.maxTime) {
            if (this.onTouchEnd != null) {
                this.onTouchEnd(disX, disY, wrappers, event, controller);
            }
            return;
        }
        var disX = (t0.endPageX - t0.startPageX);
        var disY = (t0.endPageY - t0.startPageY);
        // var dis=Math.sqrt(disX*disX+disY*disY);
        // if (dis<this.minDistance){
        //  return;
        // }
        // var k=disY/disX;
        // this.onSwipe(dis,time,k,wrappers,event,controller);
        if (disX != 0 || disY != 0) {
            this.onSwipe(disX, disY, time, wrappers, event, controller);
        }
    },
    onTouchEnd: null,

    /* Implement by user */
    onSwipe: function(disX, disY, time, wrappers, event, controller) {

    }

});
