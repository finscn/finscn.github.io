"use strict";


var controller;

function initTouchController() {
    controller = new Toucher.Controller({
        beforeInit: function() {
            this.dom = window;
        },
        pixelRatio: Config.touchPixelRatio,
        preventDefaultMove: true
    });
    controller.init();
}


function initTouchListener() {

    var touched = false;
    var touchedTime = 0;
    var cooldown = 0;
    var touch = {
        x: 0,
        y: 0
    };

    var any = new Toucher.Any({

        start: function(wrappers, event, controller) {


            var wrapper = wrappers[wrappers.length - 1];
            var x = wrapper.pageX;
            var y = wrapper.pageY;
            event.preventDefault();
            console.log("touchstart:",x,y)

            game.uiManager.touchStart(x, y, wrapper.id);

        },

        move: function(wrappers, event, controller) {

            var wrapper = wrappers[wrappers.length - 1];
            var x = wrapper.pageX;
            var y = wrapper.pageY;
            event.preventDefault();

            game.uiManager.touchMove(x, y, wrapper.deltaX, wrapper.deltaY, wrapper.id);

        },

        end: function(wrappers, event, controller) {

            var wrapper = wrappers[wrappers.length - 1];
            var x = wrapper.pageX;
            var y = wrapper.pageY;
            event.preventDefault();

            if (this.checkMoveDistance(wrapper) && this.checkTimeLag(wrapper)) {
                // tap
                game.uiManager.tap(x, y, wrapper.id);
            } else {
                // end
                game.uiManager.touchEnd(x, y, wrapper.id);
            }

        },

        cancel: function(wrappers, event, controller) {

        },

        maxTimeLag: 1000,
        maxDistance: 10,
        checkMoveDistance: function(wrapper) {
            var dx = Math.abs(wrapper.moveAmountX);
            var dy = Math.abs(wrapper.moveAmountY);
            var dis = this.maxDistance * (Config.devicePixelRatio || 1)
            return dx <= dis && dy <= dis;
        },

        checkTimeLag: function(wrapper) {
            return wrapper.endTime - wrapper.startTime < this.maxTimeLag;
        },

    });


    var swipe = new Toucher.Swipe({
        minDistance: 50,
        maxTime: 2000,

        filterWrappers: function(type, wrappers, event, controller) {
            return window.game && game.sceneSelect
                    && controller.touchedCount == 0
                    && wrappers.length == 1;
        },

        trigger: function(disX, disY, time, wrappers, event, controller) {
            var vx = disX / time,
                vy = disY / time;

            var element = event.target;

            vx = Math.round(vx * 50) / 50;
            vy = Math.round(vy * 50) / 50;
            console.log("swipe : ", vx, vy);

            var minS=0.2;
            if (vx<-minS){
                UIAction.nextStage();
            }else if (vx>minS){
                UIAction.prevStage();
            }

        }
    });

    controller.addListener(any);
    controller.addListener(swipe);
    // controller.addListener(pan);
    // controller.addListener(tap);



}

(function(exports, undefined) {


    var touched = false;
    var touchedTime = 0;
    var cooldown = 0;
    var touch = {
        x: 0,
        y: 0
    };

    initEvent();

    function initEvent() {
        initTouchController();
        initTouchListener();

    }


}(exports))
