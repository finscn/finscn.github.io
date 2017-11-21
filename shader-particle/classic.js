var width = 640;
var height = 480;

var particleCount = 10 * 10000;
var zoom = 0.5 * 2;

var bunnies = new Array(particleCount);

var stats, counter;
var bunniesTexture;
var bunny;
var bunnyBig;
var containers = [];

var limit = 65536 / 4;

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

    var container;
    var pCount = 0;

    var rectList = [
        new PIXI.Rectangle(0, 0, 30, 46),
        new PIXI.Rectangle(0, 46, 30, 38),
        new PIXI.Rectangle(0, (46 + 38), 30, 38),
    ];
    var frameIdx = 0;
    for (var i = 0; i < particleCount; i++) {
        if (pCount === 0) {
            pCount = 0;
            container = new PIXI.particles.ParticleContainer(particleCount * 1.5, {
                rotation: true,
                position: true,
            });
            app.stage.addChild(container);
            containers.push(container);
        }

        var texture = new PIXI.Texture(bunniesTexture, rectList[frameIdx]);
        frameIdx = (frameIdx + 1) % rectList.length;

        var p = new PIXI.Sprite(texture);
        p.anchor.set(0.5, 0.5);
        p.scale.set(zoom);

        p.position.x = Math.random() * width; // initial x of bunny
        p.position.y = Math.random() * -height * 2; // initial y of bunny
        p.velX = Math.random() * 10; // initial x speed of bunny
        p.velY = (Math.random() * 5) - 2.5; // initial y speed of bunny

        container.addChild(p);
        bunnies[i] = p;
        pCount++;
        if (pCount >= limit) {
            pCount = 0;
        }
    }

}

function update(delta) {
    stats && stats.begin();

    var now = Date.now();

    bunny.rotation += 0.02 * delta;
    bunnyBig.rotation -= 0.02 * delta;

    containers.forEach(function(container) {
        container.position.x = 0 + Math.sin(now / 400) * 30;
        // container.position.y = 0 + Math.cos(now / 400) * 30;
        container.alpha = 0.6 + Math.sin(now / 500) * 0.4;
        container.colorMultiplier = 1.1;

        // var red = 0.22 + Math.sin(now / 500) * 0.2;
        // var green = 0.22 + Math.sin(now / 700) * 0.2;
        // var blue = 0.22 + Math.sin(now / 900) * 0.2;
        // container.colorOffset = new Float32Array([red, green, blue]);
    });

    var gravity = 0.75;
    for (var i = 0; i < particleCount; i++) {
        var p = bunnies[i];

        var posX = p.position.x;
        var posY = p.position.y;
        posX += p.velX;
        posY += p.velY;

        p.velY += gravity;

        if (posY > height) {
            posY = height;
            p.velY *= -0.85;

            if (p.velY > -20.0) {
                p.velY = Math.random() * -32.0;
            }
        }

        if (posX > width) {
            posX = width;
            p.velX *= -1.0;
        } else if (posX < 0.0) {
            posX = 0.0;
            p.velX *= -1.0;
        }
        p.position.set(posX, posY);

        var r = p.rotation;
        r += 0.1 + Math.random() * 0.1;
        if (r > 3.1415926 * 2.0) {
            r = 0.0;
        }
        p.rotation = r;
    }

    stats && stats.end();
}
