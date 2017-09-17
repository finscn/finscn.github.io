var Tiled = Tiled || {};

(function(exports) {

    var Collision = exports.Collision;
    var Tileset = exports.Tileset;

    // the `view` is viewport.
    // the `screen` is not physical screen.

    var TileLayer = exports.TileLayer = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    };

    var proto = {
        constructor: TileLayer,

        data: null,
        map: null,
        viewType: null,

        mapData: null,

        x: 0,
        y: 0,
        scale: 1,

        viewX: 0,
        viewY: 0,
        offsetX: 0,
        offsetY: 0,

        name: null,
        type: null,
        visible: true,

        minScale: 0.5,
        maxScale: 2,

        minViewX: null,
        maxViewX: null,
        minViewY: null,
        maxViewY: null,

        minViewCol: 0,
        minViewRow: 0,
        maxViewCol: null,
        maxViewRow: null,

        extRows: 0,
        extCols: 0,
        extX: 0,
        extY: 0,

        originX: null,
        originY: null,

        updateCount: 0,

        scaleChanged: false,
        originChanged: false,
        viewPosChanged: false,
        scrolled: false,

        init: function() {

        },

        initCollision: function(options) {

        },

        restoreChangedState: function() {
            this.originChanged = false;
            this.scaleChanged = false;
            this.viewPosChanged = false;
            this.scrolled = false;
        },

        setOrigin: function(x, y) {
            x = x === undefined ? null : x;
            y = y === undefined ? null : y;

            this.originChanged = x !== this.originX || y !== this.originY;

            if (!this.originChanged) {
                return false;
            }
            this.originX = x;
            this.originY = y;
            return true;
        },

        // originX & originY is map system
        // tileWidthScaled & tileHeightScaled is screen system
        setScale: function(scale, force) {

        },

        // x & y is map system
        // viewX & viewY is map system
        // viewWidth & viewHeight is map system
        // viewWidthScaled & viewWidthScaled is viewport system
        setViewPos: function(x, y, force) {

        },

        // x & y is map system
        scrollViewTo: function(x, y, withoutOffset) {
            if (withoutOffset !== false) {
                x -= this.offsetX * this.scale;
                y -= this.offsetY * this.scale;
            }
            this.setViewPos(x, y);
        },

        // dx & dy is map system
        scrollViewBy: function(dx, dy) {
            var x = this.viewX + dx;
            var y = this.viewY + dy;
            return this.setViewPos(x, y);
        },

        mapTileToView: function(col, row) {

        },

        viewTileToMap: function(col, row) {

        },

        // x & y is viewport system
        viewToMap: function(x, y) {

        },

        // x & y is map system
        mapToView: function(x, y) {

        },

        // x & y is screen system
        screenToMap: function(x, y) {

        },

        // x & y is map system
        mapToScreen: function(x, y) {

        },

        // x & y is screen system
        getTileFromScreen: function(x, y) {

        },
    };

    for (var p in proto) {
        TileLayer.prototype[p] = proto[p];
    }

}(Tiled));