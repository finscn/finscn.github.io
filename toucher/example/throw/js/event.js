var controller;
var pan, swipe;



function initTouchController() {
    controller = new Toucher.Controller({
        dom: document,
        pixelRatio: 1,
        preventDefaultMove: true,
        beforeInit: function() {
                this.dom = document;
            }
            // useCapture:false,
    });

    pan = new Toucher.Pan({

        filterWrapper: function(type, wrapper, event, controller) {
            return wrapper.target.id == "canvas";
        },
        start: function(wrappers, event, controller) {
            game.selectBall = null;
            var w = wrappers[0];
            var x = w.pageX,
                y = w.pageY;
            for (var i = balls.length - 1; i >= 0; i--) {
                var b = balls[i];
                if (b.isOnMe(x, y)) {
                    game.selectBall = b;
                    balls.slice(i, 1);
                    balls.push(b);
                    break;
                }
            }
        },
        end: function() {
            // game.selectBall = null
        },
        onPan: function(dx, dy, x, y, sx, sy, wrappers, event, controller) {
            if (game.selectBall) {
                game.selectBall.moveBy(dx, dy);
            }
        }
    });

    swipe = new Toucher.Swipe({

        filterWrapper: function(type, wrapper, event, controller) {
            return wrapper.target.id == "canvas";
        },

        onSwipe: function(disX, disY, time, wrappers, event, controller) {
            // tap事件要执行的动作
            var w = wrappers[0];
            // var dx = w.deltaX,
            //     dy = w.deltaY;
            var vx = disX / time,
                vy = disY / time
            if (Math.abs(vx)>0.1&&Math.abs(vy)>0.1&&game.selectBall) {
                var rad=Math.atan2(vy,vx);
                game.selectBall.throw(rad);
                game.selectBall = null;
            }
        }
    });

    controller.init();
    controller.addListener(pan);
    controller.addListener(swipe);

}


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
