var canvas, context;
var world;

var WIDTH = 800;
var HEIGHT = 500;
var COUNT = 500;
var boxSize = 0.4;

var stats = new Stats();

function randomInt(min, max) {
    return ((max - min + 1) * Math.random() + min) >> 0;
}

function drawPoly(ctx, vertices, vertexCount) {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var i = 1; i < vertexCount; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}


window.onload = function() {
    canvas = document.getElementById('stage');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    if (stats.domElement) {
        stats.domElement.style.cssText = 'opacity:0.75; position:absolute; right:0px; top:0px; z-index:9999;';
        document.body.appendChild(stats.domElement);
    }

    context = canvas.getContext('2d');

    init()
}

var timeStep = 1000 / 60;

function tick() {
    stats.begin();

    update(timeStep);
    render(context, timeStep);

    stats.end();

    requestAnimationFrame(tick);
}
