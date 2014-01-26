"use strict";


(function(exports, undefined) {

    function Ball(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Ball.prototype.xclass = "Ball";
    EntityClass["Ball"] = Ball;

    exports.Ball = Class.create(Ball, {

        x: 0,
        y: 0,
        z: 0,
        radius: 10,
        alpha: 1,

        velocity: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        dx: 0,
        dy: 0,
        dz: 0,


        accVel: 0.0004,
        accX: 0,
        accY: 0,

        scale: 1,
        init: function(scene) {
            this.scene = scene;
            this.blurImgs = {};
            this.aabb = [];
            this.ox=this.x;
            this.oy=this.y;

            var r=this.radius;
            var c=this.colorIdx;
            var b=this.blur;

            this.img = ResourcePool.get("c-" + r + "-" + c + "-" + b);
            this.w = this.img.width;
            this.h = this.img.height;

            this.updateAABB();
        },


        updateAABB: function() {
            this.aabb[0] = this.x - this.w * 0.5;
            this.aabb[1] = this.y - this.h * 0.5;
            this.aabb[2] = this.x + this.w * 0.5;
            this.aabb[3] = this.y + this.h * 0.5;
        },

        getHitBox: function() {
            return this.aabb;
        },

        collidePoint: function(x, y) {
            var aabb = this.aabb;
            return aabb[0] < x && x < aabb[2] && aabb[1] < y && y < aabb[3];
        },

        collideAABB: function(aabb) {
            var aabb2 = this.aabb;
            return aabb[0] < aabb2[2] && aabb[1] < aabb2[3] && aabb[2] > aabb2[0] && aabb[3] > aabb2[1];
        },

        isInView: function() {
            return true
            var scene = this.scene;
            var aabb2 = this.aabb;
            return scene.x < aabb2[2] && scene.y < aabb2[3] && scene.x + scene.viewWidth > aabb2[0] && scene.y + scene.viewHeight > aabb2[1];
        },

        updateMovement: function(timeStep) {

            var dx = this.vx * timeStep;
            var dy = this.vy * timeStep;

            this.dx = dx;
            this.dy = dy;

        },


        stopMove: function() {
            this.velocity = 0;
            this.accVel = 0;
            this.vx = 0;
            this.vy = 0;
            this.accX = 0;
            this.accY = 0;
        },

        br: 0,
        update: function(timeStep, now) {
            return;
            // this.changeBlur(this.br>>0);
            // this.br+=0.1;
            // this.scale+=0.001;
            // if (this.br>20){
            //     this.br=0;
            //     this.scale=1;
            // }
        },
        render: function(context, timeStep, now) {
            if (!this.isInView()) {
                return;
            }

            var w = this.w * this.scale,
                h = this.h * this.scale;
            context.globalAlpha=this.alpha;
            context.drawImage(this.img, this.x - w / 2, this.y - h / 2, w, h);
            context.globalAlpha=1;

            // var img=this.blurImgs[0];
            // var w = img.width * this.scale,
            //     h = img.height * this.scale;
            // context.drawImage(img, this.x - w / 2, this.y - h / 2, w, h);

        },

        destructor: function(game) {
            for (var p in this) {
                this[p] = undefined;
            }
            this._to_remove_ = true;
        }

    });



    Ball.radius = [
        8,
        15,
        20
    ];
    Ball.colors = BallColors;


    Ball.blurs = [
        40,
        25,
        10
    ];


}(exports));
