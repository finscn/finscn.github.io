var Tiled = Tiled || {};

// plugin-pixi-tilemap

(function(exports) {

    var Utils = exports.Utils;
    var Collision = exports.Collision;
    var Tileset = exports.Tileset;
    var TileLayer = exports.TileLayer;
    var OrthogonalTileLayer = exports.OrthogonalTileLayer;
    var IsometricTileLayer = exports.IsometricTileLayer;
    var StaggeredTileLayer = exports.StaggeredTileLayer;
    var ObjectLayer = exports.ObjectLayer;
    var Map = exports.Map;

    // `imgLoader` is a function that load img object by `tileset.name , tileset.image`
    Map.prototype.createTileTextures = function(imgLoader) {
        var baseTextureTable = {};

        for (var i = 0, len = this.tilesetList.length; i < len; i++) {
            var tileset = this.tilesetList[i];
            var name = tileset.name;
            var image = tileset.image;
            var baseTexture;
            if (typeof imgLoader === 'function') {
                baseTexture = PIXI.BaseTexture.from(imgLoader(name, image));
            } else {
                baseTexture = PIXI.BaseTexture.from(image);
            }
            baseTextureTable[name] = baseTexture;
        }

        var tileTextures = [];

        for (var i = 0, len = this.tileList.length; i < len; i++) {
            var t = this.tileList[i];
            var baseTexture = baseTextureTable[t.tileset];
            var texture = new PIXI.Texture(baseTexture,
                new PIXI.Rectangle(t.x, t.y, t.w, t.h)
            );
            tileTextures.push(texture);
        }

        return tileTextures;
    };

    Map.prototype.createTilemap = function(tileTextures, texPerChild) {
        // var tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, tileTextures, texPerChild);
        var tilemap = new PIXI.tilemap.RectTileLayer(0, tileTextures);

        return tilemap;
    };

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    OrthogonalTileLayer.prototype.updateTilemap = function(tilemap) {
        var scale = this.scale;

        var pivotX, pivotY;
        var viewOriginX, viewOriginY;
        var x, y;

        if (this.originX === null) {
            pivotX = this.viewX;
            viewOriginX = x = 0;
        } else {
            pivotX = this.originX;
            viewOriginX = this.originX - this.viewX;
            x = viewOriginX * scale;
        }

        if (this.originY === null) {
            pivotY = this.viewY;
            viewOriginY = y = 0;
        } else {
            pivotY = this.originY;
            viewOriginY = this.originY - this.viewY;
            y = viewOriginY * scale;
        }

        tilemap.opacity = this.opacity;
        tilemap.pivot.set(pivotX, pivotY);
        tilemap.position.set(x, y);
        tilemap.scale.set(scale, scale);

        var changed = this.scaleChanged || this.originChanged || this.scrolled;
        if (changed || this.updateCount === 0) {

            var tileWidth = this.tileWidth;
            var tileHeight = this.tileHeight;
            var mapData = this.mapData;
            var tileTable = this.map.tileTable;

            var startRow = this.viewRow;
            var endRow = this.viewEndRow;
            var startCol = this.viewCol;
            var endCol = this.viewEndCol;

            tilemap.clear();

            for (var r = startRow; r < endRow; r++) {
                var rowData = mapData[r];
                if (!rowData) {
                    continue;
                }
                for (var c = startCol; c < endCol; c++) {
                    var gid = rowData[c];
                    if (!gid || gid === 0) {
                        continue;
                    }
                    var tileIndex = gid - 1;
                    var x = c * tileWidth;
                    var y = r * tileHeight;
                    var t = tileTable[gid];
                    tilemap.addFrame(tileIndex, x + t.ox, y + t.oy);
                }
            }
        }
        this.updateCount++;
        this.restoreChangedState();
    };

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    IsometricTileLayer.prototype.updateTilemap = function(tilemap) {
        var scale = this.scale;

        var pivotX, pivotY;
        var viewOriginX, viewOriginY;
        var x, y;

        if (this.originX === null) {
            pivotX = this.viewX;
            viewOriginX = x = 0;
        } else {
            pivotX = this.originX;
            viewOriginX = this.originX - this.viewX;
            x = viewOriginX * scale;
        }

        if (this.originY === null) {
            pivotY = this.viewY;
            viewOriginY = y = 0;
        } else {
            pivotY = this.originY;
            viewOriginY = this.originY - this.viewY;
            y = viewOriginY * scale;
        }

        tilemap.opacity = this.opacity;
        tilemap.pivot.set(pivotX, pivotY);
        tilemap.position.set(x, y);
        tilemap.scale.set(scale, scale);

        var changed = this.scaleChanged || this.originChanged || this.scrolled;
        if (changed || this.updateCount === 0) {

            var tileWidth = this.tileWidth;
            var tileHeight = this.tileHeight;
            var halfTileWidth = this.halfTileWidth;
            var halfTileHeight = this.halfTileHeight;

            var mapData = this.mapData;
            var tileTable = this.map.tileTable;

            var startRow = this.viewRow;
            var endRow = this.viewEndRow;
            var startCol = this.viewCol;
            var endCol = this.viewEndCol;

            tilemap.clear();

            var dataCol = Math.ceil((startCol * 2 + startRow) / 2);
            var dataRow = startRow - dataCol;
            var evenRow = startRow % 2 === 0;

            for (var r = startRow; r < endRow; r++) {
                var col = dataCol;
                var row = dataRow;
                var offsetX = evenRow ? -halfTileWidth : 0;
                for (var c = startCol; c < endCol; c++) {
                    var rowData = mapData[row];
                    if (rowData) {
                        var gid = rowData[col];
                        if (gid) {
                            var tileIndex = gid - 1;
                            var x = c * tileWidth + offsetX;
                            var y = r * halfTileHeight;
                            var t = tileTable[gid];
                            tilemap.addFrame(tileIndex, x + t.ox, y + t.oy);
                        }
                    }
                    col++;
                    row--;
                }

                if (evenRow) {
                    dataCol++;
                } else {
                    dataRow++;
                }
                evenRow = !evenRow;
            }
        }

        this.updateCount++;
        this.restoreChangedState();

    };

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    StaggeredTileLayer.prototype.updateTilemap = function(tilemap) {

        var scale = this.scale;

        var pivotX, pivotY;
        var viewOriginX, viewOriginY;
        var x, y;

        if (this.originX === null) {
            pivotX = this.viewX;
            viewOriginX = x = 0;
        } else {
            pivotX = this.originX;
            viewOriginX = this.originX - this.viewX;
            x = viewOriginX * scale;
        }

        if (this.originY === null) {
            pivotY = this.viewY;
            viewOriginY = y = 0;
        } else {
            pivotY = this.originY;
            viewOriginY = this.originY - this.viewY;
            y = viewOriginY * scale;
        }

        tilemap.opacity = this.opacity;
        tilemap.pivot.set(pivotX, pivotY);
        tilemap.position.set(x, y);
        tilemap.scale.set(scale, scale);

        var changed = this.scaleChanged || this.originChanged || this.scrolled;
        if (changed || this.updateCount === 0) {

            var tileWidth = this.tileWidth;
            var tileHeight = this.tileHeight;
            var halfTileWidth = this.halfTileWidth;
            var halfTileHeight = this.halfTileHeight;
            var mapData = this.mapData;
            var tileTable = this.map.tileTable;

            var startRow = this.viewRow;
            var endRow = this.viewEndRow;
            var startCol = this.viewCol;
            var endCol = this.viewEndCol;

            tilemap.clear();

            var evenRow = startRow % 2 === 0;

            for (var r = startRow; r < endRow; r++) {
                var rowData = mapData[r];
                if (rowData) {
                    var offsetX = evenRow ? -halfTileWidth : 0;
                    for (var c = startCol; c < endCol; c++) {
                        var gid = rowData[c];
                        if (!gid || gid === 0) {
                            continue;
                        }
                        var tileIndex = gid - 1;
                        var x = c * tileWidth + offsetX;
                        var y = r * halfTileHeight;
                        var t = tileTable[gid];
                        tilemap.addFrame(tileIndex, x + t.ox, y + t.oy);
                    }
                }
                evenRow = !evenRow;
            }
        }

        this.updateCount++;
        this.restoreChangedState();
    };

}(Tiled));