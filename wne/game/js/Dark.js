"use strict";

(function(exports, undefined) {

    exports.Dark = Class.create({

        x : 0,
        y : 0,
        size : 1,

        no:0,
        alpha: 0,

        init: function(scene) {
            this.scene=scene;
            scene.darks.push(this);
            this.img=ResourcePool.get("dark");
            this.imgW=this.img.width;
            this.imgH=this.img.height;
        },

        render: function(context, timeStep) {

            context.globalAlpha=Math.min(1,this.alpha);
            var w=this.imgW*this.size,
                h=this.imgH*this.size;
            context.drawImage(this.img,this.x-w/2,this.y-h/2,w,h);

            context.globalAlpha=1;

            this.alpha+=0.015;

        }
    });


}(exports));