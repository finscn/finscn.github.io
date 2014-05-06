//
var projectDir = "example";
var sconFile = projectDir + "/" + "player.scon";
var entityName = "Player";
var entity, animation;

var sconParser;
var ImagePool, ImageMapping = {};
var canvas, context;
var width = 640,
    height = 480;
var originalX = width / 2 >> 0;
var originalY = height * 2 / 3 >> 0;

var frameIndex = 0;
var frameCount = 20;
var sizeScale = 0.5;
var speedScale = 1;
var animationName = "walk";
var frameRangeDom = null;
var borderSpace = 2;

var Control = {
    animation: null,
    duration: 0,
    time: 0,
    paused: true,
    playBtn: null,
    stopBtn: null,
    progressDom: null,
};


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
        var imageList = [];
        for (var id in imgs) {
            var img = imgs[id];
            imgs[id] = img;
            imageList.push({
                w: img.width,
                h: img.height,
                img: img,
                imgName: id
            });
        }
        initAnimList();
        start();
    });
}



function apply() {
    var _frameCount = $id("_frameCount");
    var _sizeScale = $id("_sizeScale");
    var _speedScale = $id("_speedScale");
    frameCount = parseFloat(_frameCount.value) || frameCount;
    sizeScale = parseFloat(_sizeScale.value) || sizeScale;
    speedScale = parseFloat(_speedScale.value) || speedScale;
    _frameCount.value = frameCount;
    _sizeScale.value = sizeScale;
    _speedScale.value = speedScale;
    Control.frameCountText.innerHTML = frameCount;

    createAnim(animationName);
    start();


}

function createSheet() {
    apply();
    $id("sheet").innerHTML = "";
    var frameList = createFrames(Control.animation, width, height, originalX, originalY, sizeScale);
    Utils.packImages(frameList);
    frameList.sort(function(a, b) {
        return a.time - b.time;
    })
    var str = JSON.stringify(frameList, function(k, v) {
        if (v.tagName) {
            return ;
        }
        return v;
    }, 2);
    $id("mapping").value = str;
    var anim=createSheetAnim(frameList);
}

function initAnimList() {

    entity = sconParser.entityMap[entityName];

    frameRangeDom = $id("range");

    var _frameCount = $id("_frameCount");
    var _sizeScale = $id("_sizeScale");
    var _speedScale = $id("_speedScale");
    _frameCount.value = frameCount;
    _sizeScale.value = sizeScale;
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

    createAnim(animationName);
}

function createAnim(name) {
    var sconAnim = entity.animationMap[name];
    sconAnim.createKeyFrames(frameCount);
    Sprite.ImageMapping = ImageMapping;
    Sprite.ImagePool = ImagePool;
    $id("animName").innerHTML = name;
    animationName = name;
    var anim = new Sprite.Animation({
        duration: sconAnim.length,
        frames: sconAnim.frames,
        loop: true,
    });
    anim.init();
    Control.animation = anim;
    Control.progressDom.max = anim.duration;
    Control.frameProgressDom.max = frameCount;
    Control.progressText.value = anim.played;
    Control.durationText.innerHTML = anim.duration;
}

function createSheetAnim(frames) {
    var anim = new Sprite.Animation({
        duration: Control.animation.duration,
        frames: frames,
        loop: true,
    });
    anim.init();
}

var intervalId;

function start() {
    var timeStep = 1000 / frameCount >> 0;
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // context.strokeStyle = "rgba(50,50,200,0.5)";
        // context.strokeRect(0, originalY - 0.5, canvas.width, 1);
        // context.strokeRect(originalX - 0.5, 0, 1, canvas.height);
        var anim = Control.animation;
        anim.x = originalX;
        anim.y = originalY;
        if (!Control.paused) {
            anim.update(timeStep * speedScale);
            Control.progressText.value = Control.progressDom.value = anim.played;
            Control.frameIndexText.value = Control.frameProgressDom.value = anim.currentIndex;
        }
        anim.render(context);

    }, timeStep);
}

function initControlBar() {
    Control.progressText = $id("progressText");
    Control.durationText = $id("durationText");
    Control.frameProgressDom = $id("frameProgress");
    Control.frameIndexText = $id("frameIndexText");
    Control.frameCountText = $id("frameCountText");
    Control.frameCountText.innerHTML = frameCount;
    Control.frameIndexText.value = frameIndex;
    Control.frameProgressDom.value = frameIndex;
    Control.progressDom = $id("progress");
    Control.progressDom.value = 0;

    Control.progressDom.onchange = function() {
        // Control.playBtn.innerHTML="PLAY";
        // console.log(this.value)
        // Control.paused=true;
        if (Control.animation) {
            Control.animation.setTime(this.value);
            Control.frameIndexText.value = Control.animation.currentIndex;
            Control.frameProgressDom.value = Control.animation.currentIndex;
            Control.progressText.value = Math.round(Number(this.value));
        }
    };

    Control.frameProgressDom.onchange = function() {
        // Control.playBtn.innerHTML="PLAY";
        // console.log(this.value)
        // Control.paused=true;
        if (Control.animation) {
            Control.animation.setFrame(this.value);
            Control.animation.played = Control.animation.currentFrame.time;

            Control.frameIndexText.value = this.value;
            Control.progressDom.value = Math.round(Number(Control.animation.played));
            Control.progressText.value = Math.round(Number(Control.animation.played));
        }
    };

    Control.playBtn = $id("playBtn");
    Control.playBtn.onclick = function() {
        Control.paused = !Control.paused
        Control.playBtn.innerHTML = Control.paused ? "PLAY" : "PAUSE";
    };
    Control.stopBtn = $id("stopBtn");
    Control.stopBtn.onclick = function() {
        Control.paused = true;
        Control.playBtn.innerHTML = "PLAY";
        Control.progressDom.value = 0;
        Control.progressText.value = 0;
        Control.frameProgressDom.value = 0;
        Control.frameIndexText.value = 0;

        if (Control.animation) {
            Control.animation.setTime(0);
        }
    };
}

window.onload = function() {

    canvas = $id("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    context.fillStyle = "#333333";
    context.font = "20px Arial";
    context.fillText("Loading images and scon file ... ", 20, 100);

    initControlBar();
    loadScon();
}
