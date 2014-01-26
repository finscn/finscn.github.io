;
(function(exports, undefined) {

    "use strict";


    var UIAction = {

        _callback: {},
        _callbackSN: 0,
        addCallback: function(func, id) {
            UIAction._callbackSN++;
            var id = id || UIAction._callbackSN;
            UIAction._callback[id] = func;
            return id;
        },
        callback: function(id, that) {
            var func = UIAction._callback[id];
            if (that) {
                func.call(that);
            } else {
                func();
            }
        },

        isFading: function() {
            var fade = game.uiManager.getUI("FadePage");
            return fade.visible;
        },

        fadeTo: function(idOrFunc, stepAlpha) {
            console.log(idOrFunc)
            var fade = game.uiManager.activate("FadePage");
            fade.stepAlpha = stepAlpha || fade.defaultStepAlpha;
            if (typeof idOrFunc == "function") {
                fade.afterShow = idOrFunc;
            } else {
                fade.afterShow = function() {
                    game.uiManager.inactivateAll("FadePage");
                    game.uiManager.activate(idOrFunc);
                };
            }
        },
        backHome: function() {
            game.stop();
            UIAction.fadeTo("HomePage");
            game.startLoop();
        },

        quickplay: function() {
            game.stop();
            UIAction.fadeTo(function() {
                game.uiManager.inactivateAll("FadePage");
                game.start(0);
            },0.02);
            game.startLoop();

        },
        next: function() {
            // game.stop();
            if (game.hasNextScene()) {
                UIAction.fadeTo(function() {
                    game.uiManager.inactivateAll("FadePage");
                    game.nextScene();
                }, 0.02);
            }else{
                UIAction.ending();
            }
            // game.startLoop();
        },

        ending: function(){
            game.uiManager.inactivateAll();
            game.uiManager.activate("EndingPage");

        },

        restart: function() {
            game.toPause = false;
            game.toRestart = false;
            // game.stop();
            console.log(123)
            UIAction.fadeTo(function() {
                game.uiManager.inactivateAll("FadePage");
                game.restart();
            }, 0.02);
            // game.startLoop();
        },
        pause: function() {
            game.toPause = false;
        },
        touchStart: function(x, y, id) {
            var t = game.uiManager.touchStart(x, y, id);
            if (!t && game.scene) {
                game.scene.touchStart(x, y, id);
            }

        },

        touchMove: function(x, y, dx, dy, id) {
            // game.scene.touchMove(x, y, dx, dy, id);
            // var t = game.uiManager.touchMove(x, y, id);
            // if (!t && game.scene) {
            //     game.scene.touchMove(x, y, id);
            // }
        },

        touchEnd: function(x, y, id) {
            var t = game.uiManager.touchEnd(x, y, id);
            if (!t && game.scene) {
                game.scene.touchEnd(x, y, id);
            }
        },

        tap: function(x, y, id) {
            var t = game.uiManager.tap(x, y, id);
            if (!t && game.scene) {
                game.scene.tap(x, y, id);
            }
        }

    }

    exports.UIAction = UIAction;

}(exports));
