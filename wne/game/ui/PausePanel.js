"use strict";


(function(exports, undefined) {

    function PausePanel(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    PausePanel.prototype.xclass = "PausePanel";
    UIClass["PausePanel"] = PausePanel;

    exports.PausePanel = Class.create(PausePanel, {

        id: "PausePanel",
        mask: true,
        visible: false,
        relative: false,
        disabled: false,
        margin: 50,


        onInit: function(game) {

            this.initCloseBtn(game);
            this.initResume(game);
            this.initRestart(game);
            this.initNext(game);
            this.initBackHome(game);
            // this.initHelpBtn(game);
        },

        initCloseBtn: function(game) {
            var btn = new CloseButton({
                x: this.width - 90,
                y: 10,
                parent: this,
                onTap: function(x, y) {
                    this.game.uiManager.inactivate(this.parent.id);
                    this.down = false;
                    UIAction.resume();
                },
            });
            btn.init(game);
        },

        initResume: function(game) {
            var y = this.getRowY(1, 6, 10);
            var resumeBtn = new Button({
                y: y,
                width: 100,
                height: 50,
                parent: this,
                renderDown: function(context) {

                },
                renderNormal: function(context) {
                    context.fillStyle = "red";
                    context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.fillText("Resume", this.ax + 10, this.ay + 30);
                },
                onTap: function() {
                    UIAction.resume();
                }
            });
            resumeBtn.init(game);
            resumeBtn.alignCenterX();
        },

        initRestart: function(game) {
            var y = this.getRowY(2, 6, 10);
            var restartBtn = new Button({
                y: y,
                width: 100,
                height: 50,
                parent: this,
                renderDown: function(context) {
                    context.fillStyle = "black";
                    context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.fillText("Restart", this.ax + 10, this.ay + 30);
                },
                renderNormal: function(context) {
                    context.fillStyle = "red";
                    context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.fillText("Restart", this.ax + 10, this.ay + 30);
                },
                onTap: function() {
                    UIAction.restart();
                }
            });
            restartBtn.init(game);
            restartBtn.alignCenterX();
        },


        initNext: function() {
            var y = this.getRowY(3, 6, 10);
            var btn = new Button({
                y: y,
                width: 100,
                height: 50,
                parent: this,
                renderDown: function(context) {
                    context.fillStyle = "black";
                    context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.fillText("Next", this.ax + 10, this.ay + 30);
                },
                renderNormal: function(context) {
                    context.fillStyle = "red";
                    context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.fillText("Next", this.ax + 10, this.ay + 30);
                },
                onTap: function() {
                    UIAction.next();
                }
            });
            btn.init(game);
            btn.alignCenterX();

        },

        initBackHome: function(game) {
            var y = this.getRowY(4, 6, 10);
            var backBtn = new Button({
                y: y,
                width: 100,
                height: 50,
                parent: this,
                renderDown: function(context) {
                    context.fillStyle = "black";
                    context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.fillText("Home", this.ax + 10, this.ay + 30);
                },
                renderNormal: function(context) {
                    context.fillStyle = "red";
                    context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.fillText("Home", this.ax + 10, this.ay + 30);
                },
                onTap: function() {
                    UIAction.showStageSelector();
                }
            });
            backBtn.init(game);
            backBtn.alignCenterX();

        },
        initMusicBtn: function(game) {
            var x = this.getColX(1, 3, 10);
            var y = this.getRowY(5, 6, 10);

            var btn = new MusicButton({
                x: x,
                y: y,
                width: 80,
                height: 80,
                img: "music",
                iw: 102,
                ih: 107,
                zIndex: 2,
                parent: this,
            });
            btn.init(game);
            this.musicBtn = btn;
        },
        initSoundBtn: function(game) {
            var x = this.getColX(2, 3, 10);
            var y = this.getRowY(5, 6, 10);
            var btn = new SoundButton({
                x: x,
                y: y,
                width: 80,
                height: 80,
                zIndex: 3,
                parent: this,
            });
            btn.init(game);
            this.soundBtn = btn;

        },

        onShow: function() {
            this.canPlayNext = this.game.canPlayNextScene();

            if (game.setting.get("musicMute")) {
                this.musicBtn.turnOn();
            } else {
                this.musicBtn.turnOff();
            }
            if (game.setting.get("soundMute")) {
                this.soundBtn.turnOn();
            } else {
                this.soundBtn.turnOff();
            }
        },
        touchStart: function(x, y, id, list) {
            return this.checkTouch("touchStart", x, y, id, this.children);
        },
        touchEnd: function(x, y, id, list) {
            return this.checkTouch("touchEnd", x, y, id, this.children);

        },
        tap: function(x, y, id, list) {
            return this.checkTouch("tap", x, y, id, this.children);
        },

        update: function(timeStep, now) {
            // TODO
        },


        renderSelf: function(context, timeStep, now) {

            context.fillStyle = "#ffffff";
            context.fillRect(this.ax, this.ay, this.width, this.height);
            context.fillStyle = "#ffffff";
            context.fillRect(this.ax, this.ay, this.width, this.height);

            // TODO
        },
        onRender: function(context, timeStep, now) {
            // TODO
        },

        remove: function() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            // TODO
            this.destructor();
        },

    }, Component);


}(exports));
