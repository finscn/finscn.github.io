"use strict";

function MovePath(cfg) {
    merger(this, cfg);
}

MovePath.prototype = {

    constructor: MovePath,

    points: null, //[]

    used: 0,

    round: false,
    loop: false,

    init: function(scene) {
        this.scene = scene;
    },
    length: function() {
        return this.points ? this.points.length : 0;
    },
    getPoint: function(index) {
        return this.points[index];
    },
    setPoints: function(points) {
        var last = points.length;
        if (this.round) {
            for (var i = last - 2; i >= 0; i--) {
                var p = points[i];
                var _p = {};
                for (var key in p) {
                    _p[key] = p[key];
                }
                points.push(_p);
            }
            last = points.length;
        }

        this.points = points;
        var point = points[0];
        for (var i = 1; i < last; i++) {
            var next = points[i];
            this.pointToPoint(point, next);
            point = next;
        }

        if (this.loop) {
            this.points.length--;
            point = this.points[this.points.length - 1];
            this.pointToPoint(point, points[0]);
        } else {
            var p = points[points.length - 2];
            if (p) {
                point.rad = p.rad;
                point.cos = p.cos;
                point.sin = p.sin;
                point.cosZ = 1;
                point.sinZ = 0;
                point.dx = 0;
                point.dy = 0;
                point.dz = 0;
            }
        }


    },

    pointToPoint: function(point, next) {
        var dx = next.x - point.x,
            dy = next.y - point.y,
            dz = next.z - point.z;
        var rad = Math.atan2(dy, dx);
        point.rad = rad;

        point.cos = Math.cos(rad);
        point.sin = Math.sin(rad);

        if (dz) {

            var bowXYZ = Math.sqrt(dx * dx + dy * dy + dz * dz);
            point.sinZ = dz / bowXYZ;
            point.cosZ = Math.sqrt(1 - point.sinZ * point.sinZ);

            // var bowXY = Math.sqrt(dx * dx + dy * dy);
            // var radZ = Math.atan2(dz, bowXY);
            // point.cosZ = Math.cos(radZ);
            // point.sinZ = Math.sin(radZ);

        } else {
            point.cosZ = 1;
            point.sinZ = 0;
        }

        point.dx = dx;
        point.dy = dy;
        point.dz = dz;
        // console.log(point.cos,point.sin)
    },

    addEntity: function(entity, idx) {
        idx = idx || 0;
        entity.pointIndex = idx;
        var p = this.points[idx];
        entity.x = p.x;
        entity.y = p.y;
        entity.z = p.z;
        entity.dx = entity.vx = 0;
        entity.dy = entity.vy = 0;
        entity.dz = entity.vz = 0;
        entity.pathReady = false;
    },

    update: function(entity) {
        if (!entity.pathReady) {
            this.updateEntity(entity);
            entity.pathReady = true;
            return true;
        }

        var point = this.points[entity.nextIndex];
        if (!point) {
            return false;
        }
        var dx = point.x - entity.x,
            dy = point.y - entity.y,
            dz = point.z - entity.z;

        if (dx * entity.dx <= 0 || Math.abs(entity.dx) - Math.abs(dx) > 1E-4) {
            entity.vx = 0;
            entity.x = point.x;
        }

        if (dy * entity.dy <= 0 || Math.abs(entity.dy) - Math.abs(dy) > 1E-4) {
            entity.vy = 0;
            entity.y = point.y;
        }

        if (dz * entity.dz <= 0 || Math.abs(entity.dz) - Math.abs(dz) > 1E-4) {
            entity.vz = 0;
            entity.z = point.z;
        }

        if (-1E-4 < entity.vx && entity.vx < 1E-4 && -1E-4 < entity.vy && entity.vy < 1E-4 && -1E-4 < entity.vz && entity.vz < 1E-4) {
            entity.vx = 0;
            entity.vy = 0;
            entity.vz = 0;
            if (point.action) {
                entity.actionPoint = point;
                //TODO
                entity.pointIndex++;
            } else {
                this.gotoNext(entity);

            }
        } else {

        }
        return true;
    },

    gotoNext: function(entity) {
        entity.pointIndex++;
        if (this.loop && !this.points[entity.pointIndex]) {
            entity.pointIndex = 0;
        }
        this.updateEntity(entity);
    },

    updateEntity: function(entity) {
        // idx=idx||0;
        // entity.pointIndex=idx;
        // entity.nextIndex=idx+1;
        entity.nextIndex = entity.pointIndex + 1;
        if (this.loop && !this.points[entity.nextIndex]) {
            entity.nextIndex = 0;
        }
        var point = this.points[entity.pointIndex];
        entity.vz = entity.velocity * point.sinZ;
        var v = entity.velocity * point.cosZ;
        entity.vx = v * point.cos;
        entity.vy = v * point.sin;
        entity.cos = point.cos;
        entity.sin = point.sin;
        entity.rotation = point.rad;
        entity.actionPoint = null;
    }

}
