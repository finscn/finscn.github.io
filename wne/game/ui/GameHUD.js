"use strict";

(function(exports, undefined) {

    function GameHUD(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }


    exports.GameHUD = Class.create(GameHUD, {

        restart: null,
        pause: null,

        id: "GameHUD",

        onInit: function(game) {

            this.initRestart();
            this.initPause();
            this.reset();
        },

        initRestart: function() {
            this.restart = new Button({
                x: 0,
                y: 0,
                width: 100,
                height: 70,
                iw: 102,
                ih: 107,
                render: function(context) {
                    if (this.down) {
                        context.globalAlpha = 0.5;
                    } else {
                        context.globalAlpha = 1;
                    }
                    context.font = "22px Helvetica";
                    context.fillStyle = "#333333";
                    context.fillText("RETRY", this.ax + 12, this.ay + 32);
                    context.fillStyle = "rgba(255,255,255,0.8)";
                    context.fillText("RETRY", this.ax + 10, this.ay + 30);
                    context.globalAlpha = 1;
                },
                onTap: function(x, y, id) {
                    UIAction.restart();
                },


            });
            this.restart.init(game);

        },

        initPause: function() {
            this.pause = new Button({
                x: game.viewWidth - 100,
                y: 0,
                width: 100,
                height: 70,
                iw: 102,
                ih: 107,
                img: "pause",
                render: function(context) {
                    if (this.down) {
                        context.globalAlpha = 0.5;
                    } else {
                        context.globalAlpha = 1;
                    }
                    context.font = "22px Helvetica";
                    context.fillStyle = "#333333";
                    context.fillText("QUIT", this.ax + 12, this.ay + 32);
                    context.fillStyle = "rgba(255,255,255,0.8)";
                    context.fillText("QUIT", this.ax + 10, this.ay + 30);

                    // context.strokeStyle = "#ffffff";
                    // context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.globalAlpha = 1;
                },
                onTap: function(x, y) {
                    UIAction.backHome();
                },
            });
            this.pause.init(game);

        },

        reset: function() {


        },


        touchStart: function(x, y, id) {
            if (this.restart.touchStart(x, y, id) || this.pause.touchStart(x, y, id)) {
                return true;
            }
        },
        touchMove: function(x, y, id) {
            if (this.restart.touchMove(x, y, id) || this.pause.touchMove(x, y, id)) {
                return true;
            }
        },
        touchEnd: function(x, y, id) {
            if (this.restart.touchEnd(x, y, id) || this.pause.touchEnd(x, y, id)) {
                return true;
            }
        },
        tap: function(x, y, id) {
            if (this.restart.tap(x, y, id) || this.pause.tap(x, y, id)) {
                return true;
            }
        },
        update: function(timeStep) {

        },

        render: function(context, timeStep) {
            // context.font = "20px Dominican";
            context.font = "20px DINCondensed-Bold";
            context.fillStyle = "#ee0000";
            context.strokeStyle = "#ee0000";

            this.restart.render(context);
            this.pause.render(context);

            this.renderInfo(context);

            if (game.toPause) {
                UIAction.pause();
            }

        },


        renderInfo: function(context) {
            context.font = "22px Helvetica";
            var scene = this.game.scene;
            if (!scene){
                return;
            }
            var sec = (scene.timeCount * 0.001).toFixed(2);
            var x = 250,
                y = 30;
            var hurtX=scene.viewWidth*3/4-50;
            context.fillStyle = "#333333";
            context.fillText("Time: " + sec, x + 2, y + 2);
            context.fillText("Hurt: " + scene.hurtCount, hurtX + 2, y + 2);

            context.fillStyle = "rgba(240,240,240,1)";
            context.fillText("Time: " + sec, x, y);
            context.fillText("Hurt: " + scene.hurtCount, hurtX, y);

        },



        destructor: function(game) {
            for (var p in this) {
                this[p] = undefined;
            }
            this._to_remove_ = true;
        }

    }, Component);


}(exports));
