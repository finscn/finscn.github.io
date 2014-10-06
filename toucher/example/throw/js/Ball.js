var Ball = function(options) {
    for (var p in options) {
        this[p] = options[p];
    }
    this.radiusSq = this.radius * this.radius;

    this.initImage();

};

Ball.prototype = {

    constructor: Ball,

    x: 0,
    y: 0,
    radius: 30,
    zIndex: 0,
    velX: 0,
    velY: 0,
    accX: 0,
    accY: 0,
    throwSpeed: 0.4,

    initImage: function() {
        var canvas = document.createElement("canvas");
        canvas.width = canvas.height = this.radius * 2 + 2;
        var context = canvas.getContext('2d');
        context.fillStyle = "#ff9933"
        context.strokeStyle = "#000";
        context.beginPath();
        context.arc(this.radius + 1, this.radius + 1, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.stroke();
        context.closePath();
        this.img=canvas;
    },
    isOnMe: function(x, y) {
        var dx = this.x - x;
        var dy = this.y - y;
        var disSq = dx * dx + dy * dy;
        return disSq < this.radiusSq;
    },
    moveBy: function(dx, dy, throwR) {
        if (throwR) {
            this.x += dx;
            this.y += dy;
        } else {
            this.x = Math.max(this.x + dx, 0);
            this.x = Math.min(this.x, game.width);
            this.y = Math.max(this.y + dy, game.minY);
            this.y = Math.min(this.y, game.height);
        }
    },
    throw: function(rad) {
        var velX = this.throwSpeed * Math.cos(rad);
        var velY = this.throwSpeed * Math.sin(rad);
        this.velX = velX;
        this.velY = velY;
    },
    update: function(timeStep) {
        if (!this.velX && !this.accX && !this.velY && !this.accY) {
            return;
        }
        var newVelX = this.velX + this.accX * timeStep;
        var newVelY = this.velY + this.accY * timeStep;

        var dx = (this.velX + newVelX) / 2 * timeStep;
        var dy = (this.velY + newVelY) / 2 * timeStep;

        this.velX = newVelX;
        this.velY = newVelY;

        this.moveBy(dx, dy, true);
    },
    render: function(context, timeStep, now) {
        context.drawImage(this.img,this.x-this.radius-1,this.y-this.radius-1);
    }
};
