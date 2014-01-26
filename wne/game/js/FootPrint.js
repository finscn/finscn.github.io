"use strict";

(function(exports, undefined) {

    exports.FootPrint = Class.create({

        alpha: 1,
        x : 0,
        y : 0,
        size : 1, 

        no:0,

        init: function(scene) {
            this.scene=scene;
            scene.footPrints.push(this);
            this.img=ResourcePool.get("print-"+this.no);
            this.imgW=this.img.width;
            this.imgH=this.img.height;
        },

        render: function(context, timeStep) {

            context.globalAlpha=this.alpha;
            var w=this.imgW*this.size,
                h=this.imgH*this.size;
            context.drawImage(this.img,this.x-w/2,this.y-h/2,w,h);
            this.size-=0.01;
            if (this.size<0){
                this.size=0;
            }
            context.globalAlpha=1;
            this.alpha -= 0.02;
            if (this.alpha<=0){
                this._to_remove_=true;
            }
        }
    });


}(exports));