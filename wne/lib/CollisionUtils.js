var CollisionUtils = {


    checkBlocks: function(entity, dx, dy, blocks) {

        var collInfo = {
            x: 0,
            y: 0,
            deltaX: dx,
            deltaY: dy,
            collidedX: [],
            collidedY: []
        };

        var tempBox = [];

        var entityBox = entity.getHitBox();
        tempBox[0] = entityBox[0];
        tempBox[1] = entityBox[1];
        tempBox[2] = entityBox[2];
        tempBox[3] = entityBox[3];

        // console.error("TODO checkBlock")

        for (var i = 0, len = blocks.length; i < len; i++) {
            var block = blocks[i];
            if (block.disabled) {
                continue;
            }
            var blockBox = block.getHitBox();
            if (block.upOnly && entityBox[3] > blockBox[1]) {
                return;
            }
            var nx1 = entityBox[0] + dx;
            var nx2 = entityBox[2] + dx;
            var overlapX1 = nx2 <= blockBox[2] ? nx2 - blockBox[0] : 0,
                overlapX2 = blockBox[2] <= nx2 ? blockBox[2] - nx1 : 0;
            var overlapX = Math.max(overlapX1, overlapX2);

            var ny1 = entityBox[1] + dy;
            var ny2 = entityBox[3] + dy;
            var overlapY1 = ny2 <= blockBox[3] ? ny2 - blockBox[1] : 0,
                overlapY2 = blockBox[3] <= ny2 ? blockBox[3] - ny1 : 0;

            var overlapY = Math.max(overlapY1, overlapY2);
            if (overlapX > 0 && overlapY > 0) {
                if (overlapY < overlapX) {
                    if (this.checkBlockY(tempBox, dx, dy, blockBox, collInfo)) {
                        collInfo.collidedY.push(block);
                    }
                    dy = collInfo.deltaY;
                } else {
                    if (this.checkBlockX(tempBox, dx, dy, blockBox, collInfo)) {
                        collInfo.collidedX.push(block);
                    }
                    dx = collInfo.deltaX;
                }
            }
        }

        return collInfo;
    },

    checkBlockX: function(entityBox, dx, dy, blockBox, collInfo) {
        var _dy = dy; //0;
        var newY1 = entityBox[1] + _dy,
            newY2 = entityBox[3] + _dy;
        var newX1 = entityBox[0] + dx,
            newX2 = entityBox[2] + dx;
        var coll = false;
        if (blockBox[0] <= newX2 && newX2 <= blockBox[2]) {
            dx = blockBox[0] - entityBox[2];
            coll = true;
        } else if (blockBox[0] <= newX1 && newX1 <= blockBox[2]) {
            dx = blockBox[2] - entityBox[0];
            coll = true;
        }
        if (coll) {
            collInfo.x++;
            //TODO
        }
        collInfo.deltaX = dx;
        return coll;
    },

    checkBlockY: function(entityBox, dx, dy, blockBox, collInfo) {
        var _dx = dx; //0;
        var newX1 = entityBox[0] + _dx,
            newX2 = entityBox[2] + _dx;
        var newY1 = entityBox[1] + dy,
            newY2 = entityBox[3] + dy;
        var coll = false;
        if (blockBox[1] <= newY2 && newY2 <= blockBox[3]) {
            dy = blockBox[1] - entityBox[3];
            coll = true;
        } else if (blockBox[1] <= newY1 && newY1 <= blockBox[3]) {
            dy = blockBox[3] - entityBox[1];
            coll = true;
        }
        if (coll) {
            collInfo.y++;
            //TODO
        }
        collInfo.deltaY = dy;
        return coll;
    },

    _checkBlocks: function(entity, dx, dy, blocks) {

        var collInfo = {
            x: 0,
            y: 0,
            deltaX: dx,
            deltaY: dy,
            collidedX: [],
            collidedY: []
        };

        var tempBox = [];

        var entityBox = entity.getHitBox();
        tempBox[0] = entityBox[0];
        tempBox[1] = entityBox[1];
        tempBox[2] = entityBox[2];
        tempBox[3] = entityBox[3];

        collInfo.deltaY = dy = this.checkBlockY(tempBox, 0, dy, blocks, collInfo);
        collInfo.deltaX = dx = this.checkBlockX(tempBox, dx, dy, blocks, collInfo);

        return collInfo;
    },

    _checkBlocksX: function(entityBox, dx, dy, blocks, collInfo) {
        var _dy = dy; //0;
        var y1 = entityBox[1] + _dy,
            y2 = entityBox[3] + _dy;
        for (var i = 0, len = blocks.length; i < len; i++) {
            var block = blocks[i];
            if (block.disabled) {
                continue;
            }
            var blockBox = block.getHitBox();

            if (y1 < blockBox[3] && y2 > blockBox[1] && collInfo.x < 2) {
                if (block.upOnly && entityBox[3] > blockBox[1]) {
                    continue;
                }
                var x1 = entityBox[0] + dx,
                    x2 = entityBox[2] + dx;
                var coll = false;
                if (blockBox[0] <= x2 && x2 <= blockBox[2]) {
                    dx = blockBox[0] - entityBox[2];
                    coll = true;
                } else if (blockBox[0] <= x1 && x1 <= blockBox[2]) {
                    dx = blockBox[2] - entityBox[0];
                    coll = true;
                }
                if (coll) {
                    collInfo.x++;
                    collInfo.collidedX.push(block);
                }
            }
        }
        return dx;
    },

    _checkBlocksY: function(entityBox, dx, dy, blocks, collInfo) {
        var _dx = dx; //0;
        var x1 = entityBox[0] + _dx,
            x2 = entityBox[2] + _dx;
        for (var i = 0, len = blocks.length; i < len; i++) {
            var block = blocks[i];
            if (block.disabled) {
                continue;
            }
            var blockBox = block.getHitBox();

            if (x1 < blockBox[2] && x2 > blockBox[0] && collInfo.y < 2) {
                if (block.upOnly && entityBox[3] > blockBox[1]) {
                    continue;
                }
                var y1 = entityBox[1] + dy,
                    y2 = entityBox[3] + dy;
                var coll = false;
                if (blockBox[1] <= y2 && y2 <= blockBox[3]) {
                    dy = blockBox[1] - entityBox[3];
                    coll = true;
                } else if (blockBox[1] <= y1 && y1 <= blockBox[3]) {
                    dy = blockBox[3] - entityBox[1];
                    coll = true;
                }
                if (coll) {
                    collInfo.y++;
                    collInfo.collidedY.push(block);
                }
            }
        }
        return dy;
    },
};
