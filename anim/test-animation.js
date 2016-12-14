var width = 640,
    height = 480;

var FPS = 60;

var Animation = PIXI.extensions.Animation;

var renderer;
var stage;
var graphics;

var sprite;
var ropeSprite;
var animSprite;

function createSprites(frames) {
    sprite = Animation.createSprite(frames, 2000, "anim");
    sprite.anim.timeScale = 0.80;
    sprite.anim.play();

    createPoints();

    ropeSprite = Animation.createMeshRope(frames, 2000, "anim", points);
    ropeSprite.anim.timeScale = 0.80;
    ropeSprite.anim.play();

    animSprite = new PIXI.Sprite();
    Animation.applyTo(animSprite);
    animSprite.initAnimation(frames, 2000);
    animSprite.timeScale = 0.80;
    animSprite.play();

}


function onAssetsLoaded() {
    var textures = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;
        textures.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    var frames = [];

    /**** could use frameObject for frame duration(ms) ****/
    // textures.forEach(function(texture) {
    //     frames.push({
    //         texture: texture,
    //         duration: randomInt(1, 5) * 20,
    //     });
    // });

    /**** could use textures as frames directly ****/
    frames = textures;


    createSprites(frames);

    sprite.position.set(160, 150);
    sprite.anchor.set(0.5, 0.5);
    stage.addChild(sprite);

    ropeSprite.position.set(480, 150);
    ropeSprite.anchor.set(0.5, 0.5);
    stage.addChild(ropeSprite);

    animSprite.position.set(310, 320);
    animSprite.anchor.set(0.5, 0.5);
    stage.addChild(animSprite);

    graphics.pivot.set(ropeWidth * ropeSprite.anchor.x, ropeHeight * ropeSprite.anchor.y);
    graphics.position.set(ropeSprite.x, ropeSprite.y);
    stage.addChild(graphics);

    gameLoop();
}

var timeLine = 0;

function gameLoop() {
    var timeStep = 1000 / FPS;
    timeLine += timeStep;

    sprite.rotation += 0.01;
    sprite.anim.update(timeStep);

    updatePoints(timeLine);

    ropeSprite.rotation += 0.01;
    ropeSprite.anim.update(timeStep);

    graphics.rotation = ropeSprite.rotation;
    renderPoints(graphics, points);

    animSprite.rotation += 0.01;
    animSprite.update(timeStep);

    renderer.render(stage);

    requestAnimationFrame(gameLoop);
}

function randomInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

/***************************
 *
 *  for points in the rope
 *
 **************************/

var pointCount = 6;
var points = [];

var ropeLength;
var ropeWidth = 0;
var ropeHeight = 0;

function createPoints(_points) {
    ropeWidth = 2;
    ropeHeight = 240;
    ropeLength = ropeHeight / (pointCount - 1);

    _points = _points || points;
    _points.length = 0;
    for (var i = 0; i < pointCount; i++) {
        _points.push(new PIXI.Point(0, i * ropeLength));
    }
}

function updatePoints(timeLine) {
    for (var i = 0; i < points.length; i++) {
        points[i].x = Math.sin((i * 0.5) + timeLine / 500) * 40;
        points[i].y = i * ropeLength + Math.cos((i * 0.3) + timeLine / 500) * 20;
    }
}

function renderPoints(graphics, points) {
    graphics.clear();
    graphics.lineStyle(2, 0xffc2c2);
    graphics.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        graphics.lineTo(points[i].x, points[i].y);
    }
    for (var i = 0; i < points.length; i++) {
        graphics.beginFill(0xff0022);
        graphics.drawCircle(points[i].x, points[i].y, 6);
        graphics.endFill();
    }
}

/***************************
 *
 *  for booting
 *
 **************************/
window.onload = function() {

    renderer = new PIXI.WebGLRenderer(width, height, {
        clearBeforeRender: true,
        backgroundColor: 0x333333
    });
    document.body.appendChild(renderer.view);

    stage = new PIXI.Container();

    graphics = new PIXI.Graphics();

    PIXI.loader
        .add('fighter.json')
        .load(onAssetsLoaded);
};
