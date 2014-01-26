"use strict";

(function(exports, undefined) {


    var IconButton = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    IconButton.prototype.xclass = "IconButton";
    UIClass["IconButton"] = IconButton;

    exports.IconButton = Class.create(IconButton, {

        id: null,

        downOffset: 5,

        ix:0,
        iy:0,
        iw:0,
        ih:0,

        onInit: function() {
            this.img = ResourcePool.get(this.img) || this.img;
            if (this.img){
                this.iw = this.iw||this.img.width;
                this.ih = this.iw||this.img.height;
            }
        },
        onTap: function() {
            // TODO
        },

        render: function(context) {
            var ox=0,oy=0;
            if (this.down){
                ox=oy=this.downOffset;
                // context.globalAlpha=0.6;
            }else{
                // context.globalAlpha=1;
            }
            context.drawImage(this.img, this.ix,this.iy,this.iw,this.ih,
                this.ax+ox,this.ay+oy,this.width-(ox<<1),this.height-(oy<<1));
            // context.globalAlpha=1;
        }

    }, Button);

}(this));
