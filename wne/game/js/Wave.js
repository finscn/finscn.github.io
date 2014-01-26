"use strict";

(function(exports, undefined) {

    var Wave = exports.Wave = Class.create({

        x: 0,
        y: 0,
        alpha: 1,
        rotation: 0,

        velRadius: 0.005 * 1.5,
        velAlpha: -0.0005 * 2,
        d: 0.996,

        kicked: null,

        maxForce: 6,

        isWave: true,

        radius: 0.3,
        
        init: function(scene) {
            this.scene = scene;
            var shape = new Circle({
                radius: this.radius,
                x: this.x,
                y: this.y,
                autoSleep: false,
                type: BodyType.Static,
                mass: Infinity,
                friction: 0.3,
                restitution: 0.25,
                isWave: true,
            });
            shape.init();

            this.shape = shape;

            scene.world.addBody(shape);

            this.color = "#ffffff";
            this.img = ResourcePool.get("wave");
            this.imgW = this.img.width;
            this.imgH = this.img.height;
            this.sizeRatio = this.imgW / 2 / Wave.imgRadius;

            this.kicked = {};
            this.rotation = randomInt(-5, 5) / 10;
            this.velR = Math.random() < 0.5 ? -0.005 : 0.005;

        },

        update: function(timeStep) {
            var circle = this.shape;

            this.velRadius *= this.d;
            this.velAlpha *= this.d;

            circle.radius += this.velRadius * timeStep; // 0.05;
            circle.radiusSq = circle.radius * circle.radius;

            if (this.disabled) {
                this.alpha += this.velAlpha * timeStep * 3; //0.015;
            } else {
                this.alpha += this.velAlpha * timeStep;
            }
            if (this.alpha < 0.18) {
                this.alpha = Math.max(0, this.alpha);
                this.disabled = true;
            } else {
                circle.updateAABB();
            }
            if (this.alpha<=0){
                this._to_remove_=true;
                this.shape._to_remove_=true;
            }
        },

        kickEntity: function(entity, arbiter) {
            var p = arbiter.contacts[0].contactOnA;
            var dx = p[0] - this.shape.x,
                dy = p[1] - this.shape.y;
            var rad = Math.atan2(dy, dx);
            var cos = Math.cos(rad),
                sin = Math.sin(rad);
            var force = this.maxForce * this.alpha + 1;
            var forceX = force * cos,
                forceY = force * sin;
            var body = entity.shape;
            body.applyImpulse(forceX, forceY, p);

            arbiter.disabled = true;
            this.kicked[entity.id] = true;

        },

        render: function(context, timeStep) {
            this.x = this.shape.x * Config.renderScale;
            this.y = this.shape.y * Config.renderScale;
            this.radius = this.shape.radius * Config.renderScale;
            // this.rotation = this.shape.angle;
            this.rotation += this.velR;


            var radius = this.radius * this.sizeRatio;

            context.globalAlpha = this.alpha;
            context.drawImage(this.img, 0, 0, this.imgW, this.imgH, this.x - radius, this.y - radius, radius * 2, radius * 2)
            context.globalAlpha = 1;

        },


    });

    Wave.imgRadius = 90;



}(exports));
