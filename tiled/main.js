var game = {
    width: 640,
    height: 400,
    scale: 1,
    viewX: 0,
    viewY: 0,

    tiledMap: null,
    tileLayers: null,

    tilemap: null,
    timer: {
        now: 0,
        last: 0,
        timeStep: 0,
    }
};

var app = new PIXI.Application(game.width, game.height, {
    backgroundColor: 0xbbbbbb,
    view: document.getElementById("canvas"),
    // forceCanvas: true
});
document.body.appendChild(app.view);

var container = new PIXI.Container();
app.stage.addChild(container);
var tileBorder = new PIXI.Graphics();
var origin = new PIXI.Graphics();


function initTiledMap(name) {

    game.tiledMap = new Tiled.Map({
        viewWidth: game.width,
        viewHeight: game.height,
        data: TileMaps[name],
    });

    var tileTextures = game.tiledMap.createTileTextures(function(name, image) {
        return ImagePool[name];
    });

    game.tiledMap.tileLayers.forEach(function(tileLayer) {
        tileLayer.minViewX = -20000;
        tileLayer.minViewY = -20000;
        tileLayer.maxViewX = 20000;
        tileLayer.maxViewY = 20000;
        tileLayer.minScale = 0;
        tileLayer.maxScale = Infinity;
        tileLayer.init();

        tileLayer.tilemap = game.tiledMap.createTilemap(tileTextures, 32);
        container.addChild(tileLayer.tilemap);
    });
    game.tileLayers = game.tiledMap.tileLayers;
}

function scaleTiledMap(scale) {
    scale = scale || 1;
    game.tileLayers.forEach(function(tileLayer) {
        tileLayer.setScale(scale);
    });
}


function gameLoop() {

    var timer = game.timer;
    timer.now = Date.now();
    if (!timer.last) {
        timer.last = timer.now;
        requestAnimationFrame(gameLoop);
        return;
    }
    timer.timeStep = timer.now - timer.last;
    timer.last = timer.now;

    updateTiledMap && updateTiledMap(timer.timeStep, timer.now);

    requestAnimationFrame(gameLoop);
}


window.onload = function() {
    setTimeout(function() {
        start && start();

        initFlag();
        game.timer.now = Date.now();
        gameLoop();

    }, 100);
};

function initFlag() {

    // for interactive , why app.stage don't support interactive ?
    var sprite = PIXI.Sprite.from(PIXI.Texture.EMPTY);
    sprite.width = game.width;
    sprite.height = game.height;
    sprite.interactive = true;
    sprite.on("pointermove", function(event) {
        var p = event.data.global;
        var tileLayer = game.tileLayers[0];

        var mapPos = tileLayer.screenToMap(p.x, p.y);
        console.log("map: ", mapPos.x, mapPos.y);

        var tileInfo = tileLayer.getTileFromScreen(p.x, p.y);
        console.log("tile: ", tileInfo.col, tileInfo.row, tileInfo.x, tileInfo.y);

        tileBorder.clear();
        drawTileBorder(tileLayer, tileInfo);
    });

    container.addChild(tileBorder);
    container.addChild(origin);
    container.addChild(sprite);
}

var origin;

function drawOrigin(viewX, viewY, scale) {
    origin.clear();
    origin.lineStyle(1, 0xFF0000, 1);
    origin.beginFill(0xFFFFFF, 1);
    origin.drawRect(-viewX * scale - 2, -viewY * scale - 2, 4, 4);
}

function drawTileBorder(tileLayer, tileInfo) {

    var x = tileInfo.x;
    var y = tileInfo.y;
    var sp = tileLayer.mapToScreen(x, y);

    if (tileLayer.halfTileWidthScaled) {
        sp.x -= tileLayer.halfTileWidthScaled;
    }

    var w = tileLayer.tileWidthScaled;
    var h = tileLayer.tileHeightScaled;

    tileBorder.lineStyle(1, 0xFF0000, 0.75);
    tileBorder.beginFill(0xFF700B, 0.1);
    tileBorder.drawRect(0, 0, w, h);

    if (tileLayer.viewType === "isometric" || tileLayer.viewType === "staggered") {
        tileBorder.lineStyle(2, 0xFF0000, 1);
        tileBorder.beginFill(0xFF700B, 0.2);
        tileBorder.moveTo(w / 2, 0);
        tileBorder.lineTo(w, h / 2);
        tileBorder.lineTo(w / 2, h);
        tileBorder.lineTo(0, h / 2);
        tileBorder.lineTo(w / 2, 0);
        tileBorder.endFill();
    }

    tileBorder.position.set(sp.x, sp.y);
}

// function
var start;
var updateTiledMap;