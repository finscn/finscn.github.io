"use strict";
(function(exports, undefined) {

    var ns = exports.Sprite = exports.Sprite || {};

    var Frame = ns.Frame = function(options) {
        for (var p in options) {
            this[p] = options[p];
        }
    }

    var proto = {

        constructor: Frame,
        pieces: null,
        time: 0,
        endTime: 0,
        duration: 0,
        init: function() {
            this.pieces = this.pieces || [];
            this.duration = this.duration || 0;
            this.time = this.time || 0;
            this.endTime = this.endTime || 0;
            this.duration = this.endTime - this.time;
            this.initPieces();
        },

        initPieces: function() {
            this.pieces.forEach(function(p) {
                p.zIndex = p.zIndex || 0;
                p.w = p.w || 0;
                p.h = p.h || 0;
                p.x = p.x || 0;
                p.y = p.y || 0;
                p.rotation = p.rotation || 0;
                p.scaleX = p.scaleX || 1;
                p.scaleY = p.scaleY || 1;
                p.alpha = p.alpha || p.alpha === 0 ? p.alpha : 1;

                p.origX = p.origX || 0;
                p.origY = p.origY || 0;

                var mappingInfo = ns.ImageMapping[p.imgName];
                if (mappingInfo) {
                    p.img = ns.ImagePool[mappingInfo.img];
                    p.ix = mappingInfo.x;
                    p.iy = mappingInfo.y;
                    p.iw = mappingInfo.w;
                    p.ih = mappingInfo.h;
                    p.origX += (p.ox = mappingInfo.ox || 0);
                    p.origY += (p.oy = mappingInfo.oy || 0);
                } else {
                    p.img = ns.ImagePool[p.imgName];
                    p.ix = p.ix || 0;
                    p.iy = p.iy || 0;
                    p.iw = p.w;
                    p.ih = p.h;
                }
            });
            this.pieces.sort(function(a, b) {
                return a.zIndex - b.zIndex;
            });
            this.pieceCount = this.pieces.length;
        },

        getAABB : function(){
            // TODO
        },

        render: function(context, x, y) {
            for (var i = 0; i < this.pieceCount; i++) {
                var p = this.pieces[i];
                context.save();
                context.globalAlpha = p.alpha;
                context.translate(p.x + x, p.y + y);
                context.rotate(p.rotation);
                context.scale(p.scaleX, p.scaleY);
                context.drawImage(p.img, p.ix, p.iy, p.iw, p.ih, -p.origX, -p.origY, p.iw, p.ih);
                context.strokeStyle = "#ff6600"
                context.strokeRect(-p.origX, -p.origY, p.iw, p.ih)
                context.strokeRect(0, 0, 2, 2)
                context.restore();
            }
        }

    };

    for (var p in proto) {
        Frame.prototype[p] = proto[p];
    }


})(this);
