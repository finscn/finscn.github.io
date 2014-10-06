var Ball = function(options) {
    for(var p in options){
        this[p]=options[p];
    }
    this.radiusSq=this.radius*this.radius;
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
    throwSpeed: 0.08,

    isOnMe:function(x,y){
        var dx=this.x-x;
        var dy=this.y-y;
        var disSq=dx*dx+dy*dy;
        return disSq<this.radiusSq;
    },
    moveBy: function(dx, dy) {
        this.x += dx;
        this.y += dy;
    },
    throw: function(velX,velY) {
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

        this.moveBy(dx, dy);
    },
    render: function(context, timeStep, now) {
        context.fillStyle = "#ff9933"
        context.strokeStyle = "#000";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.stroke();
        context.closePath();
    }
};
