// 设计尺寸
var designWidth = 600;
var designHeight = 800;

var FPS = 30;
var canvas, context;

var scaleMode = "ASPECT_FIT";
var scaler = new Scaler({
    width: designWidth,
    height: designHeight,
    scaleMode: Scaler[scaleMode]
});


window.onload = function() {
    start();
}
window.onresize = function() {
    resize();
}
window.onorientationchange = function() {
    resize();
}


function start() {
    canvas = document.getElementById("canvas");
    resize();
    context = canvas.getContext("2d");
    setInterval(function() {
        render();
    }, 1000 / FPS);
}

function resize() {
    scaler.setScreenSize(window.innerWidth, window.innerHeight);
    scaler.update();
    scaler.resizeCanvas(canvas);
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(scaler.offsetX, scaler.offsetY);
    // draw backgroung
    context.fillStyle = "#3080c0"
    context.fillRect(0, 0, designWidth, designHeight);
    context.fillStyle = "#f3f3f3";

    // draw circle
    context.beginPath();
    context.arc(designWidth / 2, designHeight / 2, designWidth / 3, 0, Math.PI * 2);
    context.fill();
    context.closePath();

    // draw text
    context.fillStyle = "#222";
    var fontSize = 30;
    context.font = fontSize + "px Arial";
    var text = "Scale Mode: " + scaleMode;
    var measure = context.measureText(text);
    context.fillText(text, designWidth - measure.width >> 1, designHeight + fontSize >> 1);

    context.restore();
}

function changeMode(event) {
    var target = event.target;
    scaleMode = target.textContent;
    scaler.setScaleMode(Scaler[scaleMode]);
    scaler.resizeCanvas(canvas);
}
