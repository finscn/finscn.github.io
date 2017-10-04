var Tiled = Tiled || {};

(function(exports) {

    var Utils = exports.Utils;
    var Collision = exports.Collision;
    var Tileset = exports.Tileset;
    var TileLayer = exports.TileLayer;
    var IsometricTileLayer = exports.IsometricTileLayer;

    var StaggeredTileLayer = exports.StaggeredTileLayer = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.initBaseData();
    };

    var proto = {
        constructor: StaggeredTileLayer,

        // x & y is viewport system
        viewToMap: function(x, y) {
            x = x;
            y = y / this.viewScaleY;
            return {
                x: x,
                y: y
            };
        },

        // x & y is map system
        mapToView: function(x, y) {
            x = x;
            y = y * this.viewScaleY;
            return {
                x: x,
                y: y
            };
        },

        // x & y is screen system
        screenToMap: function(x, y) {
            x = x / this.scale + this.viewX;
            y = (y / this.scale + this.viewY) / this.viewScaleY;
            return {
                x: x,
                y: y
            };
        },

        // x & y is map system
        mapToScreen: function(x, y) {
            x = (x - this.viewX) * this.scale;
            y = (y * this.viewScaleY - this.viewY) * this.scale;
            return {
                x: x,
                y: y
            };
        },

        // x & y is screen system
        getTileFromScreen: function(x, y) {
            x = x / this.scale + this.viewX;
            y = (y / this.scale + this.viewY) / this.viewScaleY;

            var newX = x * this.cos + y * this.sin;
            var newY = -x * this.sin + y * this.cos;

            var col = Math.floor(newX / this.tileSide);
            var row = Math.floor(newY / this.tileSide);

            var newRow = col + row;
            var newCol = Math.floor(col - newRow / 2);

            var evenRow = newRow % 2 === 0;
            x = newCol * this.tileWidth + (evenRow ? 0 : this.halfTileWidth);
            y = newRow * this.halfTileWidth;

            return {
                x: x,
                y: y,
                col: newCol,
                row: newRow
            };
        },

    };

    for (var p in IsometricTileLayer.prototype) {
        StaggeredTileLayer.prototype[p] = IsometricTileLayer.prototype[p];
    }

    for (var p in proto) {
        StaggeredTileLayer.prototype[p] = proto[p];
    }

}(Tiled));