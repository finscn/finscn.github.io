// "use strict";
var width, height;
var canvas;


var width = width || 640;
var height = height || 480;
var aspectRatio = width / height;

var minX, maxX;
var minY, maxY;
var screenWidth, screenHeight;
var centerX, centerY;

var container;
var canvas;
var renderer;

var frameCount, now;
var sprite;


function onReady() {

    doResize();

    canvas = document.getElementById("canvas");
    canvas.style.transform = "translatez(0)";
    canvas.style.position = "absolute";

    doReLocation();

    var options = { view: canvas, backgroundColor: 0xFFFFFF };
    renderer = new PIXI.WebGLRenderer(width, height, options);

    var img = new Image();
    img.src = "class-header-3d.jpg";
    img.onload = function() {
        sprite = PIXI.Sprite.from(img);
        start();
    }

}


function start() {
    createContainer();
    PIXI.extension.PerspectiveRenderer.applyTo(sprite);
    container.addChild(sprite);

    sprite.rotation = 0;
    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(centerX, centerY);
    sprite.scale.set(0.75, 0.75);

    frameCount = 0;
    requestAnimationFrame(update);
}

function update() {
    now = Date.now();
    frameCount++;

    var src = [
        0, 0,
        1, 0,
        1, 1,
        0, 1,
    ];
    var a = (Math.sin((now + 1000) / 700) + 0.5) * 0.2;
    var b = (Math.cos((now + 2000) / 750) + 0.5) * 0.2;
    var c = (Math.sin((now + 3000) / 700) + 0.5) * 0.2;
    var d = (Math.cos((now + 4000) / 750) + 0.5) * 0.2;
    var e = (Math.sin((now + 5000) / 700) + 0.5) * 0.2;
    var f = (Math.cos((now + 6000) / 750) + 0.5) * 0.2;
    var g = (Math.sin((now + 7000) / 700) + 0.5) * 0.2;
    var h = (Math.cos((now + 8000) / 750) + 0.5) * 0.2;

    var dest = [
        0 + a, 0 + b,
        1 + c, 0 + d,
        1 + e, 1 + f,
        0 + g, 1 + h,
    ];
    sprite.updatePerspective(src, dest);

    var offsetX = Math.sin(now / 800) * 80;
    var offsetY = Math.cos(now / 800) * 80;
    sprite.position.set(centerX + offsetX, centerY + offsetY);
    sprite.rotation += 0.008;

    renderer.render(container);

    requestAnimationFrame(update);

}


function createContainer() {

    container = new PIXI.Container();
    // var options = {
    //     position: true,
    //     rotation: true,
    //     scale: true,

    //     alpha: true,
    //     uvs: true,
    // };
    // container = new PIXI.particles.ParticleContainer(particleMaxSize, options , particleBatchSize);


}


function resize() {
    setTimeout(function() {
        doResize();
        doReLocation();
        // renderer.resize(width, height);
    }, 10);
}

function doResize() {

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    if (screenWidth / screenHeight >= aspectRatio) {
        height = screenHeight;
        width = height * aspectRatio;
    } else if (screenWidth / screenHeight < aspectRatio) {
        width = screenWidth;
        height = width / aspectRatio;
    }

    maxX = width;
    minX = 0;
    maxY = height - 10;
    minY = 0;

    centerX = width / 2;
    centerY = height / 2;

}

function doReLocation() {

    var w = screenWidth / 2 - width / 2;
    var h = screenHeight / 2 - height / 2;

    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
    canvas.style.left = w + "px"
    canvas.style.top = h + "px"
}



/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


function randomInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

window.resImagePath = window.resImagePath || "";
window.onload = function() {
    onReady();
};
window.onresize = function() {
    resize();
};
window.onorientationchange = function() {
    resize();
};
