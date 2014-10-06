"use strict";
Toucher.Swipe = Toucher.Listener.extend({

    minDistance: 60,
    maxTime: 1000,

    filterWrappers: function(type, wrappers, event, controller) {
        return wrappers.length == 1;
    },

    start: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        this.swipeDirX = 0;
        this.swipeDirY = 0;
        this.turnPointX = t0.pageX;
        this.turnPointY = t0.pageY;
        this.turnTime = t0.startTime;
    },

    move: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        if (this.swipeDirX * t0.deltaX <= 0 || this.swipeDirY * t0.deltaY <= 0) {
            this.swipeDirX = t0.deltaX;
            this.swipeDirY = t0.deltaY;
            this.turnPointX = t0.pageX;
            this.turnPointY = t0.pageY;
            this.turnTime = t0.moveTime;
        }
    },

    end: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        var time = (t0.endTime - this.turnTime);
        if (time > this.maxTime) {
            if (this.onTouchEnd != null) {
                this.onTouchEnd(disX, disY, wrappers, event, controller);
            }
            return;
        }
        // var disX = (t0.endPageX - this.turnPointX);
        // var disY = (t0.endPageY - this.turnPointY);

        var disX = t0.deltaX;
        var disY = t0.deltaY;

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
