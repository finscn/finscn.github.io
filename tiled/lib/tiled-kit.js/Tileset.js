var Tiled = Tiled || {};

(function(exports) {

    var Collision = exports.Collision;

    var Tileset = exports.Tileset = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.init();
    };

    var proto = {
        constructor: Tileset,

        map: null,
        data: null,

        init: function() {
            var data = this.data;
            this.name = data.name;
            this.image = data.image;
            this.firstGid = data.firstgid;
            this.tileCount = data.tilecount;
            this.cols = data.columns;
            this.tileWidth = data.tilewidth;
            this.tileHeight = data.tileheight;
            this.imgHeight = data.imageheight;
            this.imgWidth = data.imagewidth;
            this.margin = data.margin;
            this.spacing = data.spacing;
            this.imagePath = data.image;

            if (data.tileoffset) {
                this.offsetX = data.tileoffset.x || 0;
                this.offsetY = data.tileoffset.y || 0;
            } else {
                this.offsetX = 0;
                this.offsetY = 0;
            }

            // TODO:
            //   data.grid
            //   data.terrains
            //   data.tiles
            //   data.tileproperties
            //   transparent color

            this.initTilesInfo();
        },

        initTilesInfo: function() {
            var map = this.map;

            var first = this.firstGid;
            var count = this.tileCount;
            var col = 0;
            var row = 0;
            for (var i = first; i < first + count; i++) {
                var id = i;
                var idx = i - 1;
                var tileInfo = {
                    id: id,
                    tileset: this.name,
                    x: this.tileWidth * col,
                    y: this.tileHeight * row,
                    w: this.tileWidth,
                    h: this.tileHeight,
                    ox: this.offsetX,
                    oy: this.offsetY + (map.tileHeight - this.tileHeight),
                };
                map.tileTable[id] = tileInfo;
                map.tileList[idx] = tileInfo;
                col++;
                if (col >= this.cols) {
                    col = 0;
                    row++;
                }
            }
        }
    };

    for (var p in proto) {
        Tileset.prototype[p] = proto[p];
    }

}(Tiled));