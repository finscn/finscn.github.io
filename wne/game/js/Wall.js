(function(exports, undefined) {

    function Wall(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }


    exports.Wall = Class.create(Wall, {

        shape: null,

        isWall: true,

        color: "#000000",
        init: function(scene) {
            this.scene = scene;


            this.shape.owner = this;
            this.shape.isWall = this.isWall;

            this.shape.init();

            scene.world.addBody(this.shape);
            this.x = this.shape.x;
            this.y = this.shape.y;
            this.velX = this.shape.velX;
            this.velY = this.shape.velY;

            var w = this.w,
                h = this.h;

            this.img = this.createImage(w, h, this.color)
            // var blurs = scene.game.blurs;
            // this.img = blurs[2].blurRGBA(this.img, null, true);
            this.imgWidth = this.img.width;
            this.imgHeight = this.img.height;
        },

        update: function(timeStep, now) {
            this.sleeping = false;
            this.shape.x = this.x;
            this.shape.y = this.y;
            this.shape.velX = this.velX;
            this.shape.velY = this.velY;

            this.shape.update(timeStep)
        },

        startFlash: function() {
            if (this.flashing > 0) {
                this.flashing = 4;
            } else {
                this.flashing = 4;
                this.flashAlpha = 1;
                this.flashAlphaStep = 0.08;
            }
        },
        updateFlash: function(timeStep) {
            if (this.flashAlpha >= 1) {
                this.flashAlphaStep = -0.05;
            } else if (this.flashAlpha < 0.3) {
                this.flashAlphaStep = 0.05;
                this.flashing--;
            }
            this.flashAlpha += this.flashAlphaStep;
        },

        render: function(context, timeStep) {

            this.x = this.shape.x * Config.renderScale;
            this.y = this.shape.y * Config.renderScale;

  
            context.drawImage(this.img, this.x-this.imgWidth / 2, this.y-this.imgHeight / 2)
        },

        createImage: function(w, h, color) {
            var margin = 4;
            var canvas = createCanvas(w + margin * 2, h + margin * 2);
            canvas.MSAAEnabled = Config.MSAAEnabled||false;
            canvas.MSAASamples = Config.MSAASamples||2;
            var context = canvas.getContext("2d");
            context.fillStyle = color || "#000000";
            context.fillRect(margin, margin, w, h)

            return canvas;
        },

    }, Entity);


}(exports));
