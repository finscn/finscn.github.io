var Config = {


};


var balls = [];

var game = new Best.Game({
    FPS: 60,
    width: 640,
    height: 480,
    caption: '',
    selectBall: null,
    minY: 60,

    onInit: function(caption) {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.caption = caption;

        this.initEvent();
    },
    initEvent: function() {
        initTouchController();
    },
    onStart: function() {
        for (var i = 0; i < 10; i++) {
            var b = new Ball({
                zIndex: i + 1,
                x: randomInt(0, this.width / 10) * 10,
                y: randomInt(this.minY/10, this.height / 10) * 10
            });
            balls.push(b);
        }
    },
    handleInput: function(timeStep, now) {

    },
    update: function(timeStep, now) {
        for (var i = balls.length - 1; i >= 0; i--) {
            var b = balls[i];
            b.update(timeStep);
        }
    },
    render: function(timeStep, now) {
        var ctx = this.context;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle="red"
        ctx.fillRect(0,this.minY,this.width,2);
        balls.forEach(function(b) {
            b.render(ctx, timeStep);
        });
    },
});



window.onresize = function() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
    game.canvas.width = game.width;
    game.canvas.height = game.height;
};

window.onload = function() {
    game.width = window.innerWidth - 180;
    game.height = window.innerHeight;

    game.width = 320;
    game.height = 420;
    game.init();
    game.start();
};


function $id(id) {
    return document.getElementById(id);
}

function randomInt(min, max) {
    return ((max - min + 1) * Math.random() + min) >> 0;
}
