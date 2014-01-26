(function(exports, undefined) {

    function Block(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }

    Block.ratio = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 2, 2],
    ]

    exports.Block = Class.create(Block, {

        shape: null,

        isBlock: true,
        level: 0,

        init: function(scene) {
            this.scene = scene;

            this.color = Colors[this.level];

            this.shape.owner = this;
            this.shape.isBlock = this.isBlock;

            this.shape.init();
            scene.world.addBody(this.shape);

            var w = this.w,
                h = this.h;

            this.imgR = 0;
            this.img = ResourcePool.get("rect-" + this.w + "-" + this.h + "-" + this.level);
            if (!this.img) {
                this.img = ResourcePool.get("rect-" + this.h + "-" + this.w + "-" + this.level);
                if (this.img) {
                    this.imgR = Math.PI / 2;
                }
            }

            this.x = this.shape.x;
            this.y = this.shape.y;
            this.velX = this.shape.velX;
            this.velY = this.shape.velY;


            this.imgWidth = this.img.width;
            this.imgHeight = this.img.height;

            this.alpha = this.level == this.scene.player.level ? 1 : 0;
        },

        update: function(timeStep, now) {
            this.sleeping = false;
            this.shape.x = this.x;
            this.shape.y = this.y;
            this.shape.velX = this.velX;
            this.shape.velY = this.velY;

            this.shape.update(timeStep);

        },

        addDark: function() {
            var dark = new Dark({
                x: this.x - this.scene.x,
                y: this.y - this.scene.camera.y - 10,
            })

            var scene = this.scene;
            dark.init(scene);
            var time = 3000 * dark.y / this.scene.viewHeight;
            var tween = new TWEEN.Tween(dark)
                .to({
                    x: this.scene.viewWidth * 3 / 4,
                    y: 10,
                }, time)
                .easing(TWEEN.Easing.Quadratic.In).onComplete(function() {
                    dark._to_remove_ = true;
                    scene.hurtCount++;

                });
            tween.start();
        },

        startFlash: function(dark,minAlpha, maxAlpha,step) {
            minAlpha=minAlpha||0;
            maxAlpha=maxAlpha||1;
            this.flashMinAlpha=minAlpha;
            this.flashMaxAlpha=maxAlpha;
            this.flashStep=step||0.03;
            var flashTime=3;
            if (this.flashing > 0) {
                this.flashing = flashTime;
            } else {
                this.flashing = flashTime;
                this.flashAlpha = this.alpha;
                if (this.alpha >= maxAlpha) {
                    this.flashAlphaStep = -this.flashStep;
                } else {
                    this.flashAlphaStep = this.flashStep;
                }
            }
            if (dark !== false) {
                this.addDark();
            }
        },

        updateFlash: function(timeStep) {
            this.flashAlpha += this.flashAlphaStep;
            if (this.flashAlpha >= this.flashMaxAlpha) {
                this.flashAlpha = this.flashMaxAlpha;
                this.flashAlphaStep = -this.flashStep;
                if (this.alpha >=this.flashMaxAlpha) {
                    this.flashing--;
                }
            } else if (this.flashAlpha <= this.flashMinAlpha) {
                this.flashAlpha = this.flashMinAlpha;
                this.flashAlphaStep = this.flashStep;
                if (this.alpha != 1) {
                    this.flashing--;
                }
            }
        },

        render: function(context, timeStep) {

            this.x = this.shape.x * Config.renderScale;
            this.y = this.shape.y * Config.renderScale;
            this.rotation = this.shape.angle;

            var alpha = this.alpha;
            if (this.scene.previewing) {
                alpha = 1;
                if (this.alpha == 0 && this.scene.previewStep < 0) {
                    this.startFlash(false);
                }
            }

            if (this.flashing > 0) {
                this.updateFlash(timeStep);
                alpha = this.flashAlpha;
            }

            context.save();
            context.globalAlpha = 1 * alpha;
            context.translate(this.x, this.y);
            context.rotate(this.rotation + this.imgR);
            context.drawImage(this.img, -this.imgWidth / 2, -this.imgHeight / 2)
            context.restore()

            // drawBody(context, this.shape,null);

        },
    }, Entity);


}(exports));
