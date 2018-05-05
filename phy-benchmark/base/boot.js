var COUNT = 500;

var WIDTH = 700;
var HEIGHT = 600;

var canvas, context;
var world;
var stats;

function randomInt(min, max) {
    return ((max - min + 1) * Math.random() + min) >> 0;
}

function getUrlParams() {
    var params = {};
    var queryStr = window.location.search;
    if (queryStr) {
        queryStr = queryStr.substring(1);
        var args = queryStr.split("&");
        for (var i = 0, len = args.length; i < len; i++) {
            var a = args[i];
            if (a === "") {
                continue;
            }
            var nv = a.split("=");
            params[nv[0]] = nv.length > 1 ? window.decodeURIComponent(nv[1]) : true;
        }
    }
    return params;
}

function drawPoly(ctx, vertices, vertexCount) {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var i = 1; i < vertexCount; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

function drawCircle(ctx, radius, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

window.addEventListener('load', function() {
    canvas = document.getElementById('stage');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    stats = new Stats();
    if (stats.domElement) {
        stats.domElement.style.cssText = 'opacity:0.75; position:absolute; right:0px; top:0px; z-index:9999;';
        document.body.appendChild(stats.domElement);
    }

    canvas.style.backgroundColor = "#ffffff";
    context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.strokeStyle = '#000000';

    init()
});

var timeStep = 1000 / 60;

function tick() {
    stats.begin();

    update(timeStep);
    render(context, timeStep);

    stats.end();

    requestAnimationFrame(tick);
}
