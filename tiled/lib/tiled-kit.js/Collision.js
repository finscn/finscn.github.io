var Tiled = Tiled || {};

(function(exports) {

    var Collision = exports.Collision = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.init();
    };

    var proto = {
        constructor: Collision,

        blockTiles: 1,

        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,

        mapData: null,
        mapCols: null,
        mapRows: null,
        mapMinCol: 0,
        mapMinRow: 0,

        tileWidth: null,
        tileHeight: null,

        mapNodes: null,

        verticalFirst: false,

        init: function() {
            this.mapNodes = this.mapNodes || {};
            this.initNodes(0, 0, this.mapCols, this.mapRows);
        },

        initNodes: function(col, row, endCol, endRow) {

            col = col || 0;
            row = row || 0;
            endCol = endCol || this.mapCols;
            endRow = endRow || this.mapRows;

            for (var r = row; r < endRow; r++) {
                var rowData = this.mapData[r];
                if (!rowData) {
                    continue;
                }
                var rowNodes = {};
                this.mapNodes[r] = rowNodes

                for (var c = col; c < endCol; c++) {
                    var gid = rowData[c];
                    var tileIndex = gid - 1;
                    var node = {
                        no: gid,
                        tileIndex: tileIndex,
                        col: c,
                        row: r,
                        x: c * this.tileWidth,
                        y: r * this.tileHeight,
                        w: this.tileWidth,
                        h: this.tileHeight,
                    };
                    this.initNodeCollideInfo(node);
                    rowNodes[c] = node;
                }
            }
        },

        getNode: function(col, row) {
            var row = this.mapNodes[row];
            return row ? row[col] : null;
        },

        // common
        initNodeCollideInfo: function(node) {
            var no = node.no;
            if (typeof this.blockTiles === "number") {
                node.block = no >= this.blockTiles;
            } else if (Array.isArray(this.blockTiles)) {
                node.block = this.blockTiles.indexOf(no) !== -1;
            }
        },

        collideWithEntity: function(box, dx, dy, collInfo) {

            collInfo = collInfo || {
                x: box[0],
                y: box[1],

                width: box[2] - box[0],
                height: box[3] - box[1],

                deltaX: dx,
                deltaY: dy,

                collisionX: false,
                collisionY: false,

                tileX: null,
                tileY: null
            };

            var absDx = Math.abs(dx),
                absDy = Math.abs(dy);

            var steps = Math.max(Math.ceil(absDx / this.tileWidth), Math.ceil(absDy / this.tileHeight));
            collInfo.steps = steps;

            this._collideStep = (this.verticalFirst || absDx < absDy) ? this._collideStepV : this._collideStepH;

            this._test = 0;

            if (steps > 1) {

                var sx = dx / steps;
                var sy = dy / steps;

                for (var i = 0; i < steps && (sx || sy); i++) {
                    this._collideStep(box, collInfo, sx, sy);
                    if (collInfo.collisionX) {
                        sx = 0;
                    }
                    if (collInfo.collisionY) {
                        sy = 0;
                    }
                    if (collInfo.collisionSlope) {
                        break;
                    }
                }
            } else {
                this._collideStep(box, collInfo, dx, dy);
            }

            // this.collideSlope(box, collInfo, dx, dy);

            if (this.onCollided !== null) {
                this.onCollided(box, collInfo, dx, dy);
            }

            return collInfo;
        },

        _collideStepH: function(box, collInfo, dx, dy) {
            if (dx !== 0) {
                this.collideHorizontal(collInfo, dx, dy);
            }

            if (dy !== 0) {
                this.collideVertical(collInfo, dx, dy)
            }
        },

        _collideStepV: function(box, collInfo, dx, dy) {
            if (dy !== 0) {
                this.collideVertical(collInfo, dx, dy)
            }

            if (dx !== 0) {
                this.collideHorizontal(collInfo, dx, dy);
            }
        },

        collideVertical: function(collInfo, dx, dy) {
            var down = dy > 0;
            var oldY = collInfo.y;
            var newY = collInfo.y + dy;
            collInfo.deltaY = dy;

            var tileY = Math.floor((newY + (down ? collInfo.height + 1 + this.marginBottom : -this.marginTop)) / this.tileHeight);

            var leftTileX = Math.floor(collInfo.x / this.tileWidth);
            var rightTileX = Math.floor((collInfo.x + collInfo.width) / this.tileWidth);

            for (var tileX = leftTileX; tileX <= rightTileX; tileX++) {
                var tile = this.getNode(tileX, tileY);
                this._test++;
                if (tile) {
                    if (tile.block) {
                        newY = tileY * this.tileHeight + (down ? -collInfo.height - 1 : this.tileHeight);
                        collInfo.deltaY = newY - oldY;
                        collInfo.collisionY = down ? 1 : -1;
                        collInfo.tileY = tile;
                        if (down) {
                            collInfo.blockBottom = tile;
                        } else {
                            collInfo.blockTop = tile;
                        }
                        break;
                    } else if (tile.slope) {
                        // TODO
                    }
                }
            }
            collInfo.y = newY;
        },

        collideHorizontal: function(collInfo, dx, dy) {
            var right = dx > 0;
            var oldX = collInfo.x;
            var newX = collInfo.x + dx;
            collInfo.deltaX = dx;

            var tileX = Math.floor((newX + (right ? collInfo.width + 1 + this.marginRight : -this.marginLeft)) / this.tileWidth);
            var topTileY = Math.floor(collInfo.y / this.tileHeight);
            var bottomTileY = Math.floor((collInfo.y + collInfo.height) / this.tileHeight);
            for (var tileY = topTileY; tileY <= bottomTileY; tileY++) {
                var tile = this.getNode(tileX, tileY);
                this._test++;
                if (tile) {
                    if (tile.block) {
                        newX = tileX * this.tileWidth + (right ? -collInfo.width - 1 : this.tileWidth);
                        collInfo.deltaX = newX - oldX;
                        collInfo.collisionX = right ? 1 : -1;
                        collInfo.tileX = tile;
                        if (right) {
                            collInfo.blockRight = tile;
                        } else {
                            collInfo.blockLeft = tile;
                        }
                        break;
                    } else if (tile.slope) {
                        // TODO
                    }
                }
            }
            collInfo.x = newX;
        },

        collideSlope: function(box, collInfo, dx, dy) {
            var left = Math.floor(collInfo.x / this.tileWidth);
            var top = Math.floor(collInfo.y / this.tileHeight);
            var right = Math.floor((collInfo.x + collInfo.width - 1) / this.tileWidth);
            var bottom = Math.floor((collInfo.y + collInfo.height - 1) / this.tileHeight);

            function _onSlope() {
                var inY = tile.y + tile.height - (collInfo.y + collInfo.height);
                if (inX > inY) {
                    inY = collInfo.height + inX;
                    collInfo.slope = true;
                    collInfo.collisionS = true;
                    collInfo.newY = tile.y + tile.height - inY;
                    collInfo.deltaY = collInfo.newY - box[1];
                }
            }
            var tile = this.getNode(right, bottom);
            this._test++;
            if (tile) {
                var k = this.slopeTiles[tile.no];
                if (k === 1) {
                    var inX = collInfo.x + collInfo.width - tile.x;
                    _onSlope();
                }
            }
            tile = this.getNode(left, bottom);
            this._test++;
            if (tile) {
                k = this.slopeTiles[tile.no];
                if (k === -1) {
                    var inX = tile.x + tile.width - collInfo.x;
                    _onSlope();
                }
            }

            collInfo.x = collInfo.newX;
            collInfo.y = collInfo.newY;
        },

        onCollided: null,

    };

    for (var p in proto) {
        Collision.prototype[p] = proto[p];
    }

    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////

}(Tiled));