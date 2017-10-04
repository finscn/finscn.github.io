var Tiled = Tiled || {};

(function(exports) {

    var Utils = exports.Utils;
    var Collision = exports.Collision;
    var Tileset = exports.Tileset;
    var TileLayer = exports.TileLayer;

    var ObjectLayer = exports.ObjectLayer = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.initBaseData();
    };

    var proto = {
        constructor: ObjectLayer,

        data: null,
        map: null,

        x: 0,
        y: 0,
        scale: 1,

        name: null,
        type: null,
        visible: true,

        minScale: 0.5,
        maxScale: 2,

        minViewX: null,
        maxViewX: null,
        minViewY: null,
        maxViewY: null,


        init: function() {

        },

        initBaseData: function() {
            var data = this.data;
            this.name = data.name;
            this.type = data.type;
            this.visible = data.visible !== false;
            this.offsetX = data.offsetx || 0;
            this.offsetY = data.offsety || 0;

            this.viewWidth = this.map.viewWidth;
            this.viewHeight = this.map.viewHeight;

            this.objects = [];

            this.ellipses = [];
            this.polygons = [];
            this.polylines = [];
            this.rects = [];

            for (var i = 0; i < data.objects.length; i++) {
                var object = data.objects[i];
                object.id = object.id || (i + 1);
                if (object.ellipse) {
                    // TODO
                    this.ellipses.push(object);

                } else if (object.polygon) {
                    // TODO
                    this.polygons.push(object);

                } else if (object.polyline) {
                    // TODO
                    this.polylines.push(object);
                } else {
                    // TODO
                    this.rects.push(object);
                }

                this.objects.push(object);
            }
        },

        getObjectsByType: function(type) {
            var objects = [];
            for (var i = 0; i < this.objects.length; i++) {
                var object = this.objects[i];
                if (object.type === type) {
                    objects.push(object);
                }
            }
            return objects;
        },

        // originX & originY is map system
        setScale: function(scale, originX, originY, force) {
            scale = Math.max(this.minScale, Math.min(this.maxScale, scale));
            this.scale = scale;

            if (!originX && originX !== 0) {
                originX = 0;
                // originX = this.viewWidth / 2;
            } else {
                originX = originX - this.viewX;
            }

            if (!originY && originY !== 0) {
                originY = 0;
                // originY = this.viewHeight / 2;
            } else {
                originY = originY - this.viewY;
            }

            var d = 1 - this.scale / scale;
            var ox = originX * d;
            var oy = originY * d;

            this.viewWidthScaled = this.viewWidth / scale;
            this.viewHeightScaled = this.viewHeight / scale;

            this.scale = scale;

            this.setViewPos(this.viewX + ox, this.viewY + oy, true);

        },

        // x & y is map system
        // viewX & viewY is map system
        // viewWidth & viewHeight is map system
        // viewWidthScaled & viewWidthScaled is screen system
        setViewPos: function(x, y, force) {

            var minX = this.minViewX || 0;
            var maxX = this.maxViewX === null ? this.mapWidth - this.viewWidthScaled : this.maxViewX;

            var minY = this.minViewY || 0;
            var maxY = this.maxViewY === null ? this.mapHeight - this.viewHeightScaled : this.maxViewY;

            x = Math.max(minX, Math.min(maxX, x));
            y = Math.max(minY, Math.min(maxY, y));

            if (!force && this.viewX === x && this.viewY === y) {
                // console.log("viewX === x && viewY === y", x, y);
                return false;
            }

            this.viewX = x;
            this.viewY = y;
        },

        // dx & dy is map system
        scrollViewBy: function(dx, dy) {
            var x = this.viewX + dx;
            var y = this.viewY + dy;
            this.setViewPos(x, y);
        },

        render: function(tilemap, originX, originY) {
            var scale = this.scale;

            var x = (-this.viewX + originX) * scale;
            var y = (-this.viewY + originY) * scale;

            // TODO
        }
    };

    for (var p in proto) {
        ObjectLayer.prototype[p] = proto[p];
    }

}(Tiled));