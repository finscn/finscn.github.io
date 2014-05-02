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

var frameIndex = 0;
var frameCount = 20;
var speedScale = 1;
var animationName = "walk";
var frameRangeDom = null;

var Control = {
    animation: null,
    duration: 0,
    time: 0,
    paused: true,
    playBtn: null,
    stopBtn: null,
    progressDom: null,
}


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


    function apply() {
        var _frameCount = $id("_frameCount");
        var _speedScale = $id("_speedScale");
        frameCount = parseFloat(_frameCount.value) || frameCount;
        speedScale = parseFloat(_speedScale.value) || speedScale;
        _frameCount.value = frameCount;
        _speedScale.value = speedScale;
        Control.frameCountText.innerHTML = frameCount;

        createAnim(animationName);
        start();
    }

    function initAnimList() {

        entity = sconParser.entityMap[entityName];

        frameRangeDom = $id("range");

        var _frameCount = $id("_frameCount");
        var _speedScale = $id("_speedScale");
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

        createAnim(animationName);
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
        animationName = name;
        Control.animation = anim;
        Control.progressDom.max = anim.duration;
        Control.frameProgressDom.max = frameCount;
        Control.progressText.value = anim.played;
        Control.durationText.innerHTML = anim.duration;
    }

var intervalId;

function start() {
    var timeStep = 1000 / frameCount >> 0;
    console.log(timeStep, speedScale)
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "rgba(50,50,200,0.5)";
        context.strokeRect(0, originalY - 0.5, canvas.width, 1);
        context.strokeRect(originalX - 0.5, 0, 1, canvas.height);

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

    Control.playBtn = $id("playBtn");
    Control.playBtn.onclick = function() {
        Control.paused = !Control.paused
        Control.playBtn.innerHTML = Control.paused ? "PLAY" : "PAUSE";
    }
    Control.stopBtn = $id("stopBtn");
    Control.stopBtn.onclick = function() {
        Control.paused = true;
        Control.playBtn.innerHTML = "PLAY";
        Control.progressDom.value = 0;
        if (Control.animation) {
            Control.animation.setTime(0);
        }
    }
    Control.progressDom = $id("progress");
    Control.progressDom.onchange = function() {
        // Control.playBtn.innerHTML="PLAY";
        // console.log(this.value)
        // Control.paused=true;
        if (Control.animation) {
            Control.animation.setTime(this.value);
        }
        Control.progressText.value = Math.round(Number(this.value));
        Control.frameIndexText.value = anim.currentIndex;
        Control.frameProgressDom.value = anim.currentIndex;
    }

    Control.frameProgressDom.onchange = function() {
        // Control.playBtn.innerHTML="PLAY";
        // console.log(this.value)
        // Control.paused=true;
        if (Control.animation) {
            Control.animation.setFrame(this.value);
            anim.played = anim.currentFrame.time;
        }
        Control.frameIndexText.value = this.value;
        Control.progressDom.value = Math.round(Number(anim.played));
        Control.progressText.value = Math.round(Number(anim.played));
    }
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
