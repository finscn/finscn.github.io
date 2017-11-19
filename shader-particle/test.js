var width = 720;
var height = 480;

var stats, counter;

// create a new Sprite from an image path
var bunniesTexture;
var particle;
var bunny;
var bunnyBig;
var particleCount = 10 * 10000;
var zoom = 0.5;

var fboWidth = 512;
var fboHeight = 512;

var app = new PIXI.Application(width, height, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

var ImagePool = loadImages(
    [
        { id: 'bunnies', src: 'asset/bunnies.png' },
    ],
    function(imagePool) {
        if (typeof Stats != "undefined") {
            stats = new Stats();
            stats.domElement.style.position = "absolute";
            stats.domElement.style.top = "0px";
            document.body.appendChild(stats.domElement);

            counter = document.createElement("div");
            counter.className = "counter";
            counter.style.top = "50px";
            document.body.appendChild(counter);
        }

        if (counter) {
            counter.innerHTML = particleCount + " BUNNIES";
        }

        init();
        app.ticker.add(update);
    }
);


function init() {
    // var filter = new PIXI.filters.AlphaFilter(1.0);
    // var filter = new PIXI.filters.BlurFilter();
    // filter.padding = 0;
    // app.stage.filters = [filter];

    bunniesTexture = PIXI.BaseTexture.from(ImagePool['bunnies']);

    var texture = new PIXI.Texture(bunniesTexture, new PIXI.Rectangle(0, 0, 30, 46));

    bunnyBig = PIXI.Sprite.from(texture);
    bunnyBig.scale.set(4);
    bunnyBig.anchor.set(0.5);
    bunnyBig.x = app.renderer.width / 2;
    bunnyBig.y = 10;
    app.stage.addChild(bunnyBig);

    initParticle();

    bunny = PIXI.Sprite.from(texture);
    bunny.anchor.set(0.5);
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
    app.stage.addChild(bunny);
}

function initParticle() {
    // var texture = new PIXI.Texture(bunniesTexture, new PIXI.Rectangle(0, 46, 30, 38));
    var texture = new PIXI.Texture(bunniesTexture);
    texture.orig = new PIXI.Rectangle(0, 0, 30 * zoom, 38 * zoom);

    var defaultData = new Float32Array(4 * fboWidth * fboHeight);
    var width = app.renderer.width;
    var height = app.renderer.height;

    for (var i = 0; i < defaultData.length; i += 4) {
        defaultData[i] = Math.random() * width; // initial x of bunny
        defaultData[i + 1] = Math.random() * -height * 2; // initial y of bunny
        defaultData[i + 2] = Math.random() * 10; // initial x speed of bunny
        defaultData[i + 3] = (Math.random() * 5) - 2.5; // initial y speed of bunny
    };

    status.fboBuffer = defaultData;

    particle = new PIXI.ShaderParticle(particleCount, texture, defaultData, fboWidth, fboHeight);
    particle.anchor.set(0.5, 0.5);
    particle.setRegion(0, 0, width, height);

    var frameList = [
        [0, 0, 30 / 30, 46 / 203],
        [0, 46 / 203, 30 / 30, 38 / 203],
        [0, (46 + 38) / 203, 30 / 30, 38 / 203],
    ];
    var idx = 0;
    var frames = [];
    for (var i = 0; i < particleCount; i++) {
        frames.push(frameList[idx]);
        idx = (idx + 1) % frameList.length;
    }
    particle.setFrames(frames);

    var statusList = createStatus(particleCount);
    var display = createDisplay(particleCount);

    particle.setStatusList(statusList);
    particle.setDisplay(display);

    particle.init(app.renderer.gl);

    app.stage.addChild(particle);
}

function update(delta) {
    stats && stats.begin();

    var now = Date.now();

    bunny.rotation += 0.02 * delta;
    bunnyBig.rotation -= 0.02 * delta;

    // particle.position.x = 0 + Math.sin(now / 400) * 30;
    // particle.position.y = 0 + Math.cos(now / 400) * 30;
    // particle.alpha = 0.5;
    particle.alpha = 0.6 + Math.sin(now / 500) * 0.4;
    particle.colorMultiplier = 1.1;

    var red = 0.22 + Math.sin(now / 500) * 0.2;
    var green = 0.22 + Math.sin(now / 700) * 0.2;
    var blue = 0.22 + Math.sin(now / 900) * 0.2;
    particle.colorOffset = new Float32Array([red, green, blue]);

    particle.updateStatus(app.renderer, delta * 33, now);

    stats && stats.end();
}
