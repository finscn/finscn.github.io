var Config = {
    dynamic: false, // true,
    sensitive: false, // true,
    maxMoveRadius: 85,
    minMoveRadius: 20,
    followSpeed: 0, // 0.05
    followDistance: 1, // 80,
    warningEdge: 0, //60
};


var game = new Best.Game({
    FPS: 60,
    width: 640,
    height: 480,
    caption: '',
    onInit: function(caption) {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.caption = caption;

        this.fingerImg = $id("finger");
        if (window.initAudio) {
            this.playerImg = $id("player2");
        } else {
            this.playerImg = $id("player");
        }
        this.initEvent();
    },
    initEvent: function() {
        initTouchController();
    },
    onStart: function() {
        if (window.audioSource) {
            audioSource.loop = true;
            audioSource.start(0)
        }
    },
    handleInput: function(timeStep, now) {

    },
    update: function(timeStep, now) {

        if (joystick.moveRadius > joystick.minMoveRadius) {
            var k = Config.sensitive ? (joystick.moveRadius-joystick.minMoveRadius) / joystick.maxMoveRadius : 1;
            var step = player.speed * timeStep * k;
            var dx = player.dx = joystick.cos * step;
            var dy = joystick.sin * step;
            player.x += dx;
            player.y += dy;
            player.rotation = joystick.rad;
            console.log(this.width - 50)
            player.x = Math.min(this.width - 50, Math.max(50, player.x));
            player.y = Math.min(this.height - 50, Math.max(50, player.y));
            joystick.followTouch(timeStep);
        }
    },
    render: function(timeStep, now) {
        var ctx = this.context;
        ctx.clearRect(0, 0, this.width, this.height);
        // ctx.fillStyle="#3e565c";
        // ctx.globalAlpha=0.5;
        // ctx.fillRect(0, 0, this.width, this.height);
        // ctx.globalAlpha=1;

        if (this.renderStars) {
            this.renderStars(ctx, timeStep);
        }

        var r = joystick.touchRegion;
        ctx.globalAlpha = 0.05;
        ctx.fillStyle="white"
        ctx.fillRect(r[0], r[1], r[0] + r[2], r[1] + r[3]);
        ctx.globalAlpha = 1;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = player.color;
        ctx.translate(player.x, player.y);
        if (this.renderStars) {
            if (player.dx < 0) {
                ctx.scale(-1, 1);
            }
            ctx.drawImage(this.playerImg, -80, -60);
        } else {
            ctx.rotate(player.rotation);
            ctx.drawImage(this.playerImg, -60, -40);
        }
        // ctx.moveTo(0, -player.size / 3);
        // ctx.lineTo(0, player.size / 3);
        // ctx.lineTo(player.size, 0);
        // ctx.fill();
        // ctx.closePath();
        ctx.restore();


        var x = joystick.stickX,
            y = joystick.stickY;

        if (joystick.touched) {
            var px = joystick.pageX,
                py = joystick.pageY;
            ctx.globalAlpha = 0.7;
            ctx.drawImage(this.fingerImg, px - 30, py - 15, 100, 128)
            ctx.globalAlpha = 1;

            if (joystick.warningEdge > 0) {
                ctx.fillStyle = "rgba(255,0,0,0.2)";
                var e = joystick.warningEdge;
                if (px < e) {
                    ctx.fillRect(0, 0, e, this.height)
                }
                if (py > this.height - e) {
                    ctx.fillRect(0, this.height - e, this.width, e)
                }
            }
        }

        // render joystick


        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(x, y, joystick.maxMoveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();


        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.arc(x + joystick.moveX, y + joystick.moveY, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();


        ctx.fillStyle = "rgba(255,100,100,0.4)";
        ctx.beginPath();
        ctx.arc(x, y, joystick.minMoveRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    },
});


var player = {
    x: 200,
    y: 200,
    speed: 0.15,
    size: 80,
    rotation: 0,
    color: "red"
};

var controller;
var joystick;

function initTouchController() {
    controller = new Toucher.Controller({
        dom: $id("canvas"),
        pixelRatio: 1,
        preventDefaultMove: true,
        // useCapture:false,
    });
    controller.init();

    joystick = new Toucher.Joystick({
        disabled: false,
        touchRegion: [0, 100, game.width / 2, game.height],
        wayCount: null,
        stickX: 150,
        stickY: game.height - 150,
        defaultStickX: 150,
        defaultStickY: game.height - 150,

        minMoveRadius: Config.minMoveRadius,
        maxMoveRadius: Config.maxMoveRadius,

        dynamic: Config.dynamic,
        followSpeed: Config.followSpeed, // 0 is not follow
        followDistance: Config.followDistance,
        warningEdge: Config.warningEdge

    });

    controller.addListener(joystick);
}

window.onresize = function() {
    $id("toolbar").style.height = window.innerHeight + "px";
    game.width = window.innerWidth - 180;
    game.height = window.innerHeight;
    game.canvas.width = game.width;
    game.canvas.height = game.height;
    joystick.defaultStickY = game.height - 150;
    joystick.stickY = joystick.defaultStickY;
    joystick.touchRegion = [0, 100, game.width / 2, game.height];
};

window.onload = function() {
    $id("toolbar").style.width = 180 + "px";
    $id("toolbar").style.height = window.innerHeight + "px";
    game.width = window.innerWidth - 180;
    game.height = window.innerHeight;
    game.init();
    if (window.initAudio) {
        game.renderStars = renderStars;
        initAudio(function() {
            game.start();
            initAnalyser();
            initConfig();
        });
    } else {
        game.start();
        initConfig();
    }
};


function initConfig() {
    var dynamic = $id("dynamic");
    var sensitive = $id("sensitive");

    var maxMoveRadius = $id("maxMoveRadius");
    var maxMoveRadiusValue = $id("maxMoveRadiusValue");

    var minMoveRadius = $id("minMoveRadius");
    var minMoveRadiusValue = $id("minMoveRadiusValue");

    var followSpeed = $id("followSpeed");
    var followSpeedValue = $id("followSpeedValue");

    var followDistance = $id("followDistance");
    var followDistanceValue = $id("followDistanceValue");

    var warningEdge = $id("warningEdge");
    var warningEdgeValue = $id("warningEdgeValue");

    dynamic.checked = Config.dynamic;
    sensitive.checked = Config.sensitive;

    maxMoveRadius.value = Config.maxMoveRadius;
    maxMoveRadiusValue.innerHTML = maxMoveRadius.value;

    minMoveRadius.value = Config.minMoveRadius;
    minMoveRadiusValue.innerHTML = minMoveRadius.value;

    followSpeed.value = Config.followSpeed;
    followSpeedValue.innerHTML = followSpeed.value;

    followDistance.value = Config.followDistance;
    followDistanceValue.innerHTML = followDistance.value;

    warningEdge.value = Config.warningEdge;
    warningEdgeValue.innerHTML = warningEdge.value;

    dynamic.onchange = function() {
        Config.dynamic = this.checked;
        joystick.dynamic = this.checked;
        joystick.updateConfig();
    };
    sensitive.onchange = function() {
        Config.sensitive = this.checked;
    };

    maxMoveRadius.onchange = function() {
        Config.maxMoveRadius = this.value;
        maxMoveRadiusValue.innerHTML = this.value;
        joystick.maxMoveRadius = this.value;
        joystick.updateConfig();
    };

    minMoveRadius.onchange = function() {
        Config.minMoveRadius = this.value;
        minMoveRadiusValue.innerHTML = this.value;
        joystick.minMoveRadius = this.value;
        joystick.updateConfig();
    };

    followSpeed.onchange = function() {
        Config.followSpeed = this.value;
        followSpeedValue.innerHTML = this.value;
        joystick.followSpeed = this.value;
        joystick.updateConfig();
    };

    followDistance.onchange = function() {
        Config.followDistance = this.value;
        followDistanceValue.innerHTML = this.value;
        joystick.followDistance = this.value;
        joystick.updateConfig();
    };

    warningEdge.onchange = function() {
        Config.warningEdge = this.value;
        warningEdgeValue.innerHTML = this.value;
        joystick.warningEdge = this.value;
        joystick.updateConfig();
    };
}

function $id(id) {
    return document.getElementById(id);
}

function randomInt(min, max) {
    return ((max - min + 1) * Math.random() + min) >> 0;
}
