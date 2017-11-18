var stats, counter;

// create a new Sprite from an image path
var bunniesTexture;
var particle;
var bunny;
var bunnyBig;
var particleCount = 10 * 10000;
var zoom = 0.5;

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
    var texture = new PIXI.Texture(bunniesTexture, new PIXI.Rectangle(0, 46, 30, 38));

    particle = new PIXI.ShaderParticle(particleCount, texture, texture.width * zoom, texture.height * zoom);
    particle.anchor.set(0.5, 0.5);

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

    particle.alpha = 0.6 + Math.sin(now / 500) * 0.4;
    particle.colorMultiplier = 1.1;

    var red = 0.22 + Math.sin(now / 500) * 0.2;
    var green = 0.22 + Math.sin(now / 700) * 0.2;
    var blue = 0.22 + Math.sin(now / 900) * 0.2;

    particle.colorOffset = new Float32Array([red, green, blue]);
    particle.position.x = 0 + Math.sin(now / 400) * 30;
    // particle.position.y = 0 + Math.cow(now / 400) * 30;

    particle.updateStatus(app.renderer, delta * 33, now);

    stats && stats.end();
}
