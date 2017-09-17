function start() {
    initTiledMap("isometric_grass_and_water");
}

function updateTiledMap(timeStep, now) {

    var scale = game.scale;
    var viewX = game.viewX;
    var viewY = game.viewY;

    // scale = 1 + (Math.sin(now / 800)) * 0.2;
    scaleTiledMap(scale);

    var ox = (Math.sin(now / 1200) - 0.2) * 200;
    var oy = (Math.cos(now / 1200) + 0.5) * 200;
    viewX = game.viewX + ox;
    viewY = game.viewY + oy;

    game.tileLayers.forEach(function(tileLayer) {
        tileLayer.scrollViewTo(viewX, viewY);
        tileLayer.updateTilemap(tileLayer.tilemap);
    });
}

