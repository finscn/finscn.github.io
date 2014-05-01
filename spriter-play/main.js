//
var projectDir = "example";
var sconFile = projectDir + "/" + "player.scon";
var entityName = "Player";
var entity, animation;

var sconParser;
var ImagePool, ImageMapping = {};
var anim;
var canvas, context;
var width = 640,
    height = 480;
var originalX = width / 2 >> 0;
var originalY = height * 2 / 3 >> 0;

var fps = 30;
var frameCount = 20;
var speedScale = 1;
var currentAnimation = "walk";


function loadScon() {
    loadFile(sconFile, function(text) {
        var scon = JSON.parse(text);
        sconParser = new SconDoc({
            scon: scon
        });
        loadAllImage();
    });
}

function loadAllImage() {
    var imgList = [];
    for (var key in sconParser.imageInfo) {
        imgList.push({
            id: getBaseName(key),
            src: projectDir + "/" + key
        });
    }

    loadImage(imgList, function(imgs) {
        ImagePool = imgs;
        initAnimList();
        start();
    });
}


function go() {
    var _fps = $id("_fps");
    var _frameCount = $id("_frameCount");
    var _speedScale = $id("_speedScale");
    fps = parseFloat(_fps.value) || fps;
    frameCount = parseFloat(_frameCount.value) || frameCount;
    speedScale = parseFloat(_speedScale.value) || speedScale;
    _fps.value = fps;
    _frameCount.value = frameCount;
    _speedScale.value = speedScale;

    createAnim(currentAnimation);
    start();
}

function initAnimList() {

    entity = sconParser.entityMap[entityName];

    var _fps = $id("_fps");
    var _frameCount = $id("_frameCount");
    var _speedScale = $id("_speedScale");
    _fps.value = fps;
    _frameCount.value = frameCount;
    _speedScale.value = speedScale;

    var toolbar = $id("toolbar");
    for (var key in entity.animationMap) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.onclick = (function(_key) {
            return function() {
                createAnim(_key);
            }
        })(key);
        btn.innerHTML = key;
        toolbar.appendChild(btn);
    }

    createAnim(currentAnimation);
}

function createAnim(name) {
    var sconAnim = entity.animationMap[name];
    sconAnim.createKeyFrames(frameCount);
    Sprite.ImageMapping = ImageMapping;
    Sprite.ImagePool = ImagePool;
    anim = new Sprite.Animation({
        duration: sconAnim.length,
        frames: sconAnim.frames,
        loop: true,
    });
    anim.init();
    $id("animName").innerHTML = name;
    currentAnimation = name;
}

var intervalId;

function start() {
    var timeStep = 1000 / fps >> 0;
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "rgba(50,50,200,0.5)";
        context.strokeRect(0, originalY - 0.5, canvas.width, 1);
        context.strokeRect(originalX - 0.5, 0, 1, canvas.height);

        anim.x = originalX;
        anim.y = originalY;
        anim.update(timeStep * speedScale);
        anim.render(context);

    }, timeStep);
}

window.onload = function() {
    canvas = $id("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    context.fillStyle = "#333333";
    context.font = "20px Arial";
    context.fillText("Loading images and scon file ... ", 20, 100)
    loadScon();
}
