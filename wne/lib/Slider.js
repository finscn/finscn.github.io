"use strict";

var Slider = function(options) {
    for (var p in options) {
        this[p] = options[p];
    }
}

Slider.prototype = {

    velX: 0,
    velY: 0,
    accX: 0,
    accY: 0,
    damping: 0.003,
    dx: 0,
    dy: 0,
    entity: null,

    init: function(entity) {
        this.entity = entity || this.entity;
    },

    reset: function() {
        this.started = false;
        this.toStart = false;

        var entity = this.entity;
        this.velX = this.velY = this.accX = this.accY = 0;
    },

    start: function(vx, vy, force) {
        if (this.toStart || force) {
            // vx*=0.75;
            // vy*=0.75;

            var entity = this.entity;
            this.velX = vx || 0;
            this.velY = vy || 0;

            this.toStart = false;
            this.started = true;
        } else {
            this.started = false;
        }
    },

    stop: function() {
        this.reset();
    },

    applyDamping: function(timeStep) {
        var d = 1 - timeStep * this.damping;
        (d < 0) && (d = 0);
        (d > 1) && (d = 1);
        this.velX *= d;
        this.velY *= d;
    },

    update: function(timeStep) {
        if (!this.started) {
            return false;
        }
        var entity = this.entity;

        var lastVelX = this.velX;
        var lastVelY = this.velY;
        this.applyDamping(timeStep);

        // var dx = (lastVelX+this.velX) / 2 * timeStep;
        // var dy = (lastVelY+this.velY) / 2 * timeStep;
        var dx = this.velX * timeStep;
        var dy = this.velY * timeStep;


        if (dx || dy) {
            this.dx = dx;
            this.dy = dy;

            return true;

        } else {
            this.dx = 0;
            this.dy = 0;

            this.toStart = false;
            this.started = false;

            return false;
        }
    }

};
