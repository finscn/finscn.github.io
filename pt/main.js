// "use strict";
var width, height;
var canvas;


var width = width || 560;
var height = height || 400;
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
var logoOrig;
var logo;

var ImgPool;

function onReady() {

    doResize();

    canvas = document.getElementById("canvas");
    canvas.style.transform = "translatez(0)";
    canvas.style.position = "absolute";

    doReLocation();

    var options = { view: canvas, backgroundColor: 0xFFFFFF };
    renderer = new PIXI.WebGLRenderer(width, height, options);

    ImgPool = loadImages([
        { id: "class-header-3d", src: "class-header-3d.jpg" },
        { id: "HTML5_Badge_256", src: "HTML5_Badge_256.png" },
    ], function() {
        sprite = PIXI.Sprite.from(ImgPool["class-header-3d"]);
        logoOrig = PIXI.Sprite.from(ImgPool["HTML5_Badge_256"]);
        logo = PIXI.Sprite.from(ImgPool["HTML5_Badge_256"]);
        start();
    });

}


var bloomFilter;

function start() {
    createContainer();
    container.addChild(sprite);
    container.addChild(logoOrig);
    container.addChild(logo);

    bloomFilter = new PIXI.extension.BloomFilter(13, 0.2, 0.9);
    bloomFilter.padding = 16;

    sprite.rotation = 0;
    sprite.anchor.set(0.5, 0.5);
    sprite.scale.set(0.75, 0.75);
    sprite.position.set(centerX, centerY);

    logoOrig.rotation = 0;
    logoOrig.scale.set(0.5, 0.5);
    logoOrig.position.set(20, 20);

    logo.anchor.set(0.5, 0.5);
    logo.scale.set(0.5, 0.5);
    logo.position.set(centerX, centerY);


    PIXI.extension.PerspectiveRenderer.applyTo(sprite);

    logo.filters = [bloomFilter];

    frameCount = 0;
    requestAnimationFrame(update);
}

function update() {
    now = Date.now();
    frameCount++;

    if (sprite.updatePerspective) {
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
    }

    var offsetX = Math.sin(now / 800) * 80;
    var offsetY = Math.cos(now / 800) * 80;
    sprite.position.set(centerX + offsetX, centerY + offsetY);
    sprite.rotation += 0.008;

    logo.rotation += 0.005;

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

function loadImages(fileList, callback) {
    // src, id, onLoad(img, $next)
    var count = fileList.length;
    var imagePool = {};
    var idx = -1;
    var $next = function() {
        idx++;
        if (idx >= count) {
            callback(imagePool);
            return;
        }
        var cfg = fileList[idx];
        var img = new Image();
        img.src = cfg.src;
        img.id = cfg.id;
        img.onload = function(event) {
            imagePool[img.id] = img;
            if (cfg.onLoad) {
                cfg.onLoad.call(img, img);
            }
            $next();
        };
        img.onerror = function() {
            $next();
        };
    }
    $next();
    return imagePool;
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
