"use strict";

(function(exports, undefined) {

    exports.Player = Class.create({

        id: "t_1",
        x: 5,
        y: 12,
        w: 2,
        h: 4,
        isPlayer: true,
        hp: 100,
        radius: 1,

        level: 0,

        init: function(scene) {
            this.scene = scene;
            this.radiusSq = this.radius * this.radius;

            this.color = Colors[this.level];


            var vertices = Utils.createRectVertices(this.w, this.h);
            Utils.translateVertices(vertices, this.x, this.y);
            var shape = new Circle({
                x: this.x,
                y: this.y,
                radius: this.radius,
                // vertices: vertices,
                damping: 0.4,
                dampingAng: 0.8,
                friction: 0.3,
                restitution: 2,
                density: 0.5,
                // inertia : 9.60532875131364 ,
                inertia: 1,
                isPlayer: true,
            });
            shape.init();
            this.shape = shape;
            this.shape.isPlayer = true;
            this.shape.owner = this;

            scene.world.addBody(shape);

            this.img = ResourcePool.get("p-" + this.level)
            this.imgRadius = this.img.width / 2;
            this.scaleSeed = 0;
        },

        hurtCD: 0,
        hurt: function(entity) {
            // if (this.level!=entity.level){
            entity.startFlash();
            // }
            // this.startFlash();
            if (this.hurtCD <= 0 && !this.scene.win) {
                this.hp--;
                this.hurtCD = 600;
            }
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

        addFootPrint: function(x, y) {
            var fp = new FootPrint({
                no: this.level,
                x: x,
                y: y
            })
            fp.init(this.scene)
        },

        lastPrint: 0,
        update: function(timeStep, now) {

            this.x = this.shape.x * Config.renderScale;
            this.y = this.shape.y * Config.renderScale;
            this.rotation = this.shape.angle;

            // return;
            // this.shape.velY+=0.05;
            if (this.hurtCD > 0) {
                this.hurtCD -= timeStep;
            } else {
                this.hurtCD = 0;
            }
            if (now - this.lastPrint > 200) {
                this.lastPrint = now;

                if (Math.abs(this.shape.velX) >= 0.2 || Math.abs(this.shape.velY) >= 0.2) {
                    this.addFootPrint(this.shape.x * 30, this.shape.y * 30);
                }
            }
        },



        render: function(context, timeStep) {
            var alpha = 1;
            if (this.flashing > 0) {
                this.updateFlash(timeStep);
                alpha = this.flashAlpha;
            }
            context.globalAlpha = 1 * alpha;

            this.scaleSeed = this.scaleSeed % 314;
            var scale = 1 + Math.abs(Math.sin(this.scaleSeed / 100)) * 0.07;
            if (this.scaleSeed > 157) {
                this.scaleSeed += 3;
            } else {
                this.scaleSeed += 6
            }

            context.save();
            context.translate(this.x, this.y);
            context.scale(scale, scale);
            context.drawImage(this.img, -this.imgRadius, -this.imgRadius)

            context.restore();

            return

            var radius = this.radius * Config.renderScale * this.sizeRatio;

            context.save();
            context.globalAlpha = this.alpha;
            context.translate(this.x, this.y);
            context.rotate(this.rotation + 0.314);
            // context.drawImage(this.img, 0, 0, this.imgW, this.imgH, -radius, -radius - 4, radius * 2, radius * 2)
            context.restore();

            drawCircle(context, this.shape);
            // var circle = {
            //     centre: [this.shape.x, this.shape.y],
            //     radius: this.radius
            // }
            // drawCircle(context, circle);

            context.globalAlpha = 1
        },

        isInCircle: function(x, y) {
            var dx = this.shape.x - x,
                dy = this.shape.y - y;
            return dx * dx + dy * dy < this.radiusSq;
        },


    });


}(exports));
