"use strict";


var controller;

function initTouchController() {
    controller = new Toucher.Controller({
        beforeInit: function() {
            this.dom = window;
        },
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
            if (!window.UIAction) {
                return;
            }
            var wrapper = wrappers[wrappers.length - 1];
            var x = wrapper.pageX;
            var y = wrapper.pageY;
            event.preventDefault();

            UIAction.touchStart(x, y, wrapper.id);

        },

        move: function(wrappers, event, controller) {
            if (!window.UIAction) {
                return;
            }
            var wrapper = wrappers[wrappers.length - 1];
            var x = wrapper.pageX;
            var y = wrapper.pageY;
            event.preventDefault();

            UIAction.touchMove(x, y, wrapper.deltaX, wrapper.deltaY,wrapper.id);

        },

        end: function(wrappers, event, controller) {
            if (!window.UIAction) {
                return;
            }
            var wrapper = wrappers[wrappers.length - 1];
            var x = wrapper.pageX;
            var y = wrapper.pageY;
            event.preventDefault();

            if (this.checkMoveDistance(wrapper) && this.checkTimeLag(wrapper)) {
                // tap
                UIAction.tap(x, y, wrapper.id);
            } else {
                // end
                UIAction.touchEnd(x, y, wrapper.id);
            }

        },

        cancel: function(wrappers, event, controller) {

        },

        maxTimeLag: 800,
        maxDistance: 5,
        checkMoveDistance: function(wrapper) {
            var dx = Math.abs(wrapper.moveAmountX);
            var dy = Math.abs(wrapper.moveAmountY);
            var dis=this.maxDistance*(window.devicePixelRatio||1)
            return dx <= dis && dy <= dis;
        },

        checkTimeLag: function(wrapper) {
            return wrapper.endTime - wrapper.startTime < this.maxTimeLag;
        },

    });

    var tap = new Toucher.Tap({
        maxTimeLag: 1200,
        maxDistance: 15,
        touchStartTime: 0,
        start: function(wrappers, event, controller) {
            this.enabled = true;
            this.touchStartTime = wrappers[0].startTime;
        },

        trigger: function(x, y, wrappers, event, controller) {
            var element = event.target;

            var x = wrappers[0].pageX;
            var y = wrappers[0].pageY;


        },

        onTouchEnd: function(x, y, wrappers, event, controller) {
            var element = event.target;
            this.touchStartTime = 0;
        }
    });

    var pan = new Toucher.Pan({
        trigger: function(dx, dy, sx, sy, x, y, wrappers, event, controller) {
            var element = event.target;

            // addLog("pan : ",dx,dy);

            if (isTouchingView(element)) {

            } else {

            }
        }
    });

    controller.addListener(any);
    // controller.addListener(tap);
    // controller.addListener(pan);


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

        // initWindowEvent();
    }

    function initWindowEvent(){
        var touchDown = "mousedown",
            touchUp = "mouseup",
            touchMove = "mousemove";
        if ("ontouchstart" in window) {
            touchDown = "touchstart";
            touchUp = "touchend";
            touchMove = "touchmove";
        }

        window.addEventListener(touchMove, function(event) {
            if (!window.UIAction) {
                return;
            }
            if (!touched || touchedTime <= 0) {
                return;
            }
            if (event.changedTouches) {
                var x = event.changedTouches[0].pageX,
                    y = event.changedTouches[0].pageY;

            } else {
                var x = event.pageX,
                    y = event.pageY;

            }

            event.preventDefault();
        }, true);

        window.addEventListener(touchDown, function(event) {
            if (!window.UIAction) {
                return;
            }
            touched = true;
            touchedTime = Date.now();
            if (event.changedTouches) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    var x = event.changedTouches[i].pageX,
                        y = event.changedTouches[i].pageY;
                    UIAction.addWave(x, y);
                }
            } else {
                var x = event.pageX,
                    y = event.pageY;
                UIAction.addWave(x, y);

            }

            event.preventDefault();
        }, true);

        window.addEventListener(touchUp, function(event) {
            if (!window.UIAction) {
                return;
            }
            touched = false;
            // if (event.changedTouches) {
            //     for (var i=0;i<event.changedTouches.length;i++){
            //         var x = event.changedTouches[i].pageX,
            //             y = event.changedTouches[i].pageY;
            //          UIAction.addWave(x, y);
            //     }

            // } else {
            //     var x = event.pageX,
            //         y = event.pageY;
            //      UIAction.addWave(x, y);
            // }

            touchedTime = 0;
            event.preventDefault();
        }, true);
    }
}(exports))
