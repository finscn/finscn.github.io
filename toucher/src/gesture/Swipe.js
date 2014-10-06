"use strict";
Toucher.Swipe = Toucher.Listener.extend({

    minDistance: 60,
    maxTime: 1000,

    filterWrappers: function(type, wrappers, event, controller) {
        return wrappers.length == 1;
    },

    start: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        this.swipeStartX = t0.pageX;
        this.swipeStartY = t0.pageY;
        this.swipeTime = t0.startTime;
        this.swipeDirX = 0;
        this.swipeDirY = 0;
    },

    move: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        if (this.swipeDirX * t0.deltaX <= 0 || this.swipeDirY * t0.deltaY <= 0) {
            this.swipeDirX = t0.deltaX;
            this.swipeDirY = t0.deltaY;
            this.swipeStartX = t0.pageX;
            this.swipeStartY = t0.pageY;
            this.swipeTime = t0.moveTime;
        }
    },

    end: function(wrappers, event, controller) {
        var t0 = wrappers[0];
        var time = (t0.endTime - this.swipeTime);
        if (time > this.maxTime) {
            if (this.onTouchEnd != null) {
                this.onTouchEnd(disX, disY, wrappers, event, controller);
            }
            return;
        }
        var disX = (t0.endPageX - this.swipeStartX);
        var disY = (t0.endPageY - this.swipeStartY);
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
