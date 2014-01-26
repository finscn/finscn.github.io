"use strict";

(function(exports, undefined) {

    var BitmapText = exports.BitmapText = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key];
        }
    };

/*
    charData : {
        "A" : {img:... ,x:0, y:0, w:0 , h:0, ox:0, oy:0}

    }
*/
    var proto = {

        name: null,
        charData: null,
        textSetImg: null,
        space: 0,
        scale: 1,
        init: function() {
            this.textSetImg = ResourcePool.get(this.textSetImg) || this.textSetImg;
            this.charData = this.charData || {};
            for (var c in this.charData) {
                var data = this.charData[c];
                data.ox = data.ox || 0;
                data.oy = data.oy || 0;
            }
        },

        computeSize: function(text, space, scale) {
            space = space || 0;
            scale = scale || 1;
            // space*=scale;
            var w = 0,
                h = 0;
            for (var i = 0, len = text.length; i < len; i++) {
                var c = text[i];
                w = c.w * scale + (i + 1 == len ? "" : space);
                h = Math.max(h, c.h * scale);
            }
            return [w, h];
        },

        renderText: function(context, x, y, text, space, scale) {
            space = space || 0;
            scale = scale || 1;
            // space*=scale;
            for (var i = 0, len = text.length; i < len; i++) {
                var c = text[i];
                var data = this.charData[c];
                var w = data.w * scale,
                    h = data.h * scale;
                var ox = data.ox * scale,
                    oy = data.oy * scale;

                context.drawImage(this.textSetImg,
                    data.x, data.y, data.w, data.h,
                    x + ox, y + oy, w, h
                );
                x += w + space;
            }

        }

    };

    for (var p in proto) {
        BitmapText.prototype[p] = proto[p];
    }

}(this));
