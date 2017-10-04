function start() {
    var baseTexture = PIXI.BaseTexture.from(ImagePool["perspective_walls"]);
    var emptyTexture = new PIXI.Texture(baseTexture,
        new PIXI.Rectangle(192, 192, 64, 64)
    );
    initTiledMap("perspective_walls",emptyTexture);
}

function updateTiledMap(timeStep, now) {

    var ox = 0;
    var oy = 0;
    var viewX = game.viewX;
    var viewY = game.viewY;
    var scale = game.scale;

    ox = (Math.sin(now / 1200) + 0.5) * 200;
    oy = (Math.cos(now / 1200) + 0.5) * 200;
    viewX = game.viewX + ox;
    viewY = game.viewY + oy;
    // scale = 1 + (Math.sin(now / 800)) * 0.2;

    scaleTiledMap(scale);

    game.tileLayers.forEach(function(tileLayer) {
        tileLayer.scrollViewTo(viewX, viewY);
        tileLayer.updateTilemap(tileLayer.tilemap);
    });
}
