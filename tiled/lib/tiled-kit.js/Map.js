var Tiled = Tiled || {};

(function(exports) {

    var Collision = exports.Collision;
    var Tileset = exports.Tileset;
    var TileLayer = exports.TileLayer;
    var OrthogonalTileLayer = exports.OrthogonalTileLayer;
    var IsometricTileLayer = exports.IsometricTileLayer;
    var StaggeredTileLayer = exports.StaggeredTileLayer;
    var ObjectLayer = exports.ObjectLayer;

    var Map = exports.Map = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.init();
    };

    var proto = {
        constructor: Map,

        id: null,

        data: null,

        viewWidth: 960,
        viewHeight: 640,

        width: 0,
        height: 0,
        cols: 0,
        rows: 0,
        tileWidth: 0,
        tileHeight: 0,
        tileSide: 0,

        extX: 0,
        extY: 0,

        init: function() {
            var data = this.data;
            this.cols = data.width;
            this.rows = data.height;
            this.tileWidth = data.tilewidth;
            this.tileHeight = data.tileheight;
            this.viewType = data.orientation;

            if (this.viewType === "orthogonal") {
                this.width = this.tileWidth * this.cols;
                this.height = this.tileHeight * this.rows;
            } else if (this.viewType === "isometric") {
                this.gridSize = Math.max(this.cols, this.rows);
                this.width = this.tileWidth * this.gridSize;
                this.height = this.tileHeight * this.gridSize;
            }

            var Me = this;

            this.initTilesets(data);
            this.initLayers(data);
        },

        initTilesets: function(data) {
            var Me = this;
            this.tilesetTable = {};
            this.tilesetList = [];
            this.tileTable = {};
            this.tileList = [];

            var extX = 0;
            var extY = 0;

            data.tilesets.forEach(function(tilesetData, idx) {
                var tileset = new Tileset({
                    map: Me,
                    data: tilesetData,
                });
                Me.tilesetTable[tileset.name] = tileset;
                Me.tilesetList[idx] = tileset;

                var dw = Math.abs(tileset.tileWidth - Me.tileWidth);
                var dh = Math.abs(tileset.tileHeight - Me.tileHeight);
                extX = Math.max(extX, dw + Math.abs(tileset.offsetX));
                extY = Math.max(extY, dh + Math.abs(tileset.offsetY));
            });

            this.extX = this.extX || extX;
            this.extY = this.extY || extY;
        },

        initLayers: function(data) {
            var Me = this;
            this.layers = [];

            this.tileLayers = [];
            this.objectLayers = [];
            this.imageLayers = [];
            this.layerGroups = [];

            data.layers.forEach(function(layerData, idx) {
                var layer;
                if (layerData.type === "tilelayer") {
                    if (Me.viewType === "orthogonal") {
                        layer = new OrthogonalTileLayer({
                            map: Me,
                            data: layerData,
                            tileSide: Me.tileSide,
                            extX: Me.extX,
                            extY: Me.extY,
                        });
                    } else if (Me.viewType === "isometric") {
                        layer = new IsometricTileLayer({
                            map: Me,
                            data: layerData,
                            tileSide: Me.tileSide,
                            extX: Me.extX,
                            extY: Me.extY,
                        });
                    } else if (Me.viewType === "staggered") {
                        layer = new StaggeredTileLayer({
                            map: Me,
                            data: layerData,
                            tileSide: Me.tileSide,
                            extX: Me.extX,
                            extY: Me.extY,
                        });
                    }

                    if (layer) {
                        Me.initTileLayerBaseData(layer);
                        Me.tileLayers.push(layer);
                    }
                } else if (layerData.type === "objectgroup") {
                    layer = new ObjectLayer({
                        map: Me,
                        data: layerData
                    });
                    Me.objectLayers.push(layer);
                }
                // TODO
                // Image Layer
                // Layer Group

                if (layer) {
                    Me.layers.push(layer);
                }
            });
        },

        initTileLayerBaseData: function(layer) {
            var layerData = layer.data;

            layer.rawMapData = layerData.data;

            layer.name = layerData.name;
            layer.type = layerData.type;
            layer.visible = layerData.visible !== false;
            layer.offsetX = layerData.offsetx || 0;
            layer.offsetY = layerData.offsety || 0;

            layer.cols = layerData.width;
            layer.rows = layerData.height;
            layer.col = layerData.x;
            layer.row = layerData.y;

            // var compression = layerData.compression;
            // var encoding = layerData.encoding;
            var mapData = this.arrayTo2D(layer.rawMapData, this.cols);
            layer.mapData = mapData;

            layer.mapCols = this.cols;
            layer.mapRows = this.rows;

            layer.tileWidth = this.tileWidth;
            layer.tileHeight = this.tileHeight;

            layer.viewType = this.viewType;
            layer.viewWidth = this.viewWidth;
            layer.viewHeight = this.viewHeight;
        },

        getTileLayerAt: function(index) {
            return this.tileLayers[index] || null;
        },

        getTileLayer: function(name) {
            for (var i = 0; i < this.tileLayers.length; i++) {
                var layer = this.tileLayers[i];
                if (layer.name === name) {
                    return layer;
                }
            }
            return null;
        },

        getObjectLayer: function(name) {
            for (var i = 0; i < this.objectLayers.length; i++) {
                var layer = this.objectLayers[i];
                if (layer.name === name) {
                    return layer;
                }
            }
            return null;
        },

        // common
        getMinEven: function(n) {
            return n + (n % 2);
        },

        getMaxEven: function(n) {
            return n - (n % 2);
        },

        arrayTo2D: function(arr, cols) {
            cols = cols || 1;
            var arr2 = [];
            var rows = Math.floor((arr.length + cols) / cols) - 1;
            var r = 0,
                c = 0,
                i = 0;
            for (r = 0; r < rows; r++) {
                arr2[r] = [];
                for (c = 0; c < cols; c++) {
                    arr2[r][c] = arr[i++];
                }
            }
            return arr2;
        },
    };

    for (var p in proto) {
        Map.prototype[p] = proto[p];
    }

}(Tiled));