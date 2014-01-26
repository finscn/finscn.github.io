"use strict";


(function(exports, undefined) {

    function HomePage(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    HomePage.prototype.xclass = "HomePage";
    UIClass["HomePage"] = HomePage;

    exports.HomePage = Class.create(HomePage, {

        id: "HomePage",
        mask: true,
        visible: false,
        relative: false,
        disabled: false,


        onInit: function(game) {
            this.setSize(game.viewWidth, game.viewHeight);
            this.initTitle(game);
            this.initPlay(game);
        },

        initTitle: function(game) {
            this.titleImg = ResourcePool.get("title");
            this.titleX = (game.viewWidth - this.titleImg.width) / 2
            this.titleY = (game.viewHeight - this.titleImg.height) / 2 - 90;
        },

        initPlay: function(game) {

            var width = 120;
            var height = 70;
            var y = (game.viewHeight - height) / 2 + 100;

            var playBtn = new Button({
                relative: true,
                y: y,
                width: width,
                height: height,
                centerX: true,
                parent: this,
                render: function(context) {
                    var oy = 0;
                    if (this.down) {
                        context.globalAlpha = 0.4;
                        oy = 4;
                    } else {
                        context.globalAlpha = 1;
                    }
                    context.font = "50px DINCondensed-Bold";
                    context.fillStyle = "#ffffff";
                    context.fillText("Play", this.ax + 24, this.ay + 60 + oy);
                    // context.strokeStyle = "#ffffff";
                    // context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.globalAlpha = 1;

                },
                onTap: function() {
                    UIAction.quickplay();
                }
            });
            playBtn.init(game);

        },


        onShow: function(cb) {
            this.reset();
        },

        reset: function() {
            this.createBalls();
            this.initMusic();
        },
        initMusic: function(){
            this.musicIndex=0;
            this.musicSleep=600;
            this._musicSleep=0;
            this.music=Music[0];
            this.musicCount=this.music.length;
        },
        playMusic: function(timeStep){
            if (this._musicSleep>=this.musicSleep){
                Note.play(this.music[this.musicIndex]);
                this._musicSleep=0;
                this.musicIndex++;
                this.musicIndex=this.musicIndex%this.musicCount;
            }else{
                this._musicSleep+=timeStep;
            }
        },

        elasticOut : function ( k ) {
            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) { a = 1; s = p / 4; }
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            return ( a * Math.pow( 2, - 8 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

        },
        createBalls: function() {
            this.viewWidth = this.game.viewWidth;
            this.viewHeight = this.game.viewHeight;
            this.layers = [
                [],
                [],
                [],
            ];
            this.layersScale = [
                0.15,
                0.3,
                0.5
            ];

            for (var i = 0; i < 40; i++) {

                var layer = Math.random() * Ball.blurs.length >> 0;

                var r = Ball.radius[Math.random() * Ball.radius.length >> 0];
                var colorIdx = Math.random() * Ball.colors.length >> 0;
                var b = Ball.blurs[layer];
                var alpha = randomInt(10, 10) / 10;

                var scale = this.layersScale[layer];

                var c = new Ball({
                    sn: i,
                    layer: layer,
                    alpha: alpha,
                    radius: r,
                    colorIdx: colorIdx,
                    blur: b,
                    x: randomInt(0, this.viewWidth / 30) * 30,
                    y: randomInt(-10, -1) * 30
                })
                c.init(this);
                this.layers[layer].push(c);

                var tween = new TWEEN.Tween(c)
                    .to({
                        y: randomInt(1, this.viewHeight/20-1) * 20
                    }, randomInt(2000,3000)*10)
                    .easing(this.elasticOut).onComplete(function() {

                    });
                tween.start();
            }


        },

        touchStart: function(x, y, id, list) {
            return this.checkTouch("touchStart", x, y, id, this.children);
        },
        touchEnd: function(x, y, id, list) {
            return this.checkTouch("touchEnd", x, y, id, this.children);
        },
        tap: function(x, y, id, list) {
            var rs = this.checkTouch("tap", x, y, id, this.children);
        },

        update: function(timeStep, now) {
            // TODO
        },


        renderSelf: function(context, timeStep, now) {
            this.playMusic(timeStep);
            context.fillStyle = BgColors[0];
            context.fillRect(this.ax, this.ay, this.width, this.height);

            var Me = this;
            this.layers.forEach(function(layer) {
                layer.forEach(function(c, idx) {
                    c.render(context);
                });
            });

            // context.strokeStyle = "#ffffff";
            // context.strokeRect(this.title.ax, this.title.ay, this.title.width, this.title.height)

            context.drawImage(this.titleImg, this.titleX, this.titleY)

            // TODO
        },
        onRender: function(context, timeStep, now) {
            // TODO
        },

    }, Component);


}(exports));
