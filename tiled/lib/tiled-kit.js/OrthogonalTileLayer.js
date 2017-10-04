var Tiled = Tiled || {};

(function(exports) {

    var Utils = exports.Utils;
    var Collision = exports.Collision;
    var Tileset = exports.Tileset;
    var TileLayer = exports.TileLayer;

    var OrthogonalTileLayer = exports.OrthogonalTileLayer = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.initBaseData();
    };

    var proto = {
        constructor: OrthogonalTileLayer,

        init: function() {
            this.width = this.tileWidth * this.cols;
            this.height = this.tileHeight * this.rows;

            if (this.extX && !this.extCols) {
                this.extCols = Math.ceil(this.extX / this.tileWidth);
            }
            if (this.extY && !this.extRows) {
                this.extRows = Math.ceil(this.extY / this.tileHeight);
            }

            this.mapWidth = this.mapCols * this.tileWidth;
            this.mapHeight = this.mapRows * this.tileHeight;

            this.maxViewCol = this.maxViewCol === null ? this.mapCols : this.maxViewCol;
            this.maxViewRow = this.maxViewRow === null ? this.mapRows : this.maxViewRow;

            this.restoreChangedState();
            this.setOrigin(this.originX, this.originY);
            this.setScale(this.scale, true);
        },

        initCollision: function(options) {
            options = options || {};

            options.mapData = this.mapData;
            options.mapCols = this.mapCols;
            options.mapRows = this.mapRows;
            options.tileWidth = this.tileWidth;
            options.tileHeight = this.tileHeight;

            this.collision = new Collision(options);
        },

        // originX & originY is map system
        // tileWidthScaled & tileHeightScaled is screen system
        setScale: function(scale, force) {
            scale = Math.max(this.minScale, Math.min(this.maxScale, scale));

            this.scaleChanged = this.scale !== scale;

            if (!force && !this.scaleChanged && !this.originChanged) {
                return false;
            }

            this.tileWidthScaled = this.tileWidth * scale;
            this.tileHeightScaled = this.tileHeight * scale;

            this.viewCols = Math.ceil(this.viewWidth / this.tileWidthScaled + 1) + 1;
            this.viewRows = Math.ceil(this.viewHeight / this.tileHeightScaled + 1) + 1;

            this.viewWidthScaled = this.viewWidth / scale;
            this.viewHeightScaled = this.viewHeight / scale;

            // this.viewWidthFull = this.viewCols * this.tileWidthScaled;
            // this.viewHeightFull = this.viewRows * this.tileHeightScaled;

            var viewOriginX = this.originX === null ? 0 : this.originX - this.viewX;
            var viewOriginY = this.originY === null ? 0 : this.originY - this.viewY;

            var d = 1 - this.scale / scale;
            var ox = viewOriginX * d;
            var oy = viewOriginY * d;

            this.scale = scale;

            this.setViewPos(this.viewX + ox, this.viewY + oy, true);

            return true;
        },

        // x & y is map system
        // viewX & viewY is map system
        // viewWidth & viewHeight is map system
        // viewWidthScaled & viewWidthScaled is viewport system
        setViewPos: function(x, y, force) {
            var minX = this.minViewX || 0;
            var maxX = this.maxViewX === null ? this.mapWidth - this.viewWidthScaled : this.maxViewX;

            var minY = this.minViewY || 0;
            var maxY = this.maxViewY === null ? this.mapHeight - this.viewHeightScaled : this.maxViewY;

            x = Math.max(minX, Math.min(maxX, x));
            y = Math.max(minY, Math.min(maxY, y));

            this.viewPosChanged = this.viewX !== x || this.viewY !== y;
            this.scrolled = false;

            if (!force && !this.viewPosChanged) {
                // console.log("viewX === x && viewY === y", x, y);
                return false;
            }

            var lastCol = this.viewCol;
            var lastRow = this.viewRow;

            var col = Math.floor(x / this.tileWidth);
            if (this.extCols !== 0) {
                col = Math.max(this.minViewCol, col - this.extCols);
                this.viewCols += this.extCols + this.extCols;
            }
            this.viewEndCol = Math.min(this.maxViewCol, col + this.viewCols);
            this.tileOffsetX = col * this.tileWidth - x;

            var row = Math.floor(y / this.tileHeight);
            if (this.extRows !== 0) {
                row = Math.max(this.minViewRow, row - this.extRows);
                this.viewRows += this.extRows + this.extRows;
            }
            this.viewEndRow = Math.min(this.maxViewRow, row + this.viewRows);
            this.tileOffsetY = row * this.tileHeight - y;

            this.viewX = x;
            this.viewY = y;

            this.viewCol = col;
            this.viewRow = row;

            this.scrolled = lastCol !== col || lastRow !== row;

            return true;
        },

        mapTileToView: function(col, row) {
            return {
                col: col,
                row: row
            };
        },

        viewTileToMap: function(col, row) {
            return {
                col: col,
                row: row
            };
        },

        // x & y is viewport system
        viewToMap: function(x, y) {
            return {
                x: x,
                y: y
            };
        },

        // x & y is map system
        mapToView: function(x, y) {
            return {
                x: x,
                y: y
            };
        },

        // x & y is screen system
        screenToMap: function(x, y) {
            return {
                x: x / this.scale + this.viewX,
                y: y / this.scale + this.viewY
            };
        },

        // x & y is map system
        mapToScreen: function(x, y) {
            return {
                x: (x - this.viewX) * this.scale,
                y: (y - this.viewY) * this.scale
            };
        },

        // x & y is screen system
        getTileFromScreen: function(x, y) {
            x = x / this.scale + this.viewX;
            y = y / this.scale + this.viewY;

            var col = Math.floor(x / this.tileWidth);
            var row = Math.floor(y / this.tileHeight);

            x = col * this.tileWidth;
            y = row * this.tileHeight;

            return {
                x: x,
                y: y,
                col: Math.floor(x / this.tileWidth),
                row: Math.floor(y / this.tileHeight)
            }
        },
    };

    for (var p in TileLayer.prototype) {
        OrthogonalTileLayer.prototype[p] = TileLayer.prototype[p];
    }

    for (var p in proto) {
        OrthogonalTileLayer.prototype[p] = proto[p];
    }

}(Tiled));