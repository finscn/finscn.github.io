var width = 640;
var height = 480;

var params = getUrlParams();
var particleCount = parseInt(params.p) || 1 * 10000;

var zoom = 0.5 * 2;

var fboWidth = 512;
var fboHeight = 512;

var scale = Math.floor(Math.pow(255, 2) / Math.max(width, height) / 3);
var SCALE = [scale, scale * 25];

var browser = getBrowserInfo();

var format = format || 'FLOAT';
if (format !== 'RGBA' && browser.iOS) {
    format = 'FLOAT HALF_FLOAT';
}

var useFilter = false;
var useFramebuffer = null;

var stats, counter;
var bunniesTexture;
var html5Texture;
var particle;
var bunny;
var bunnyBig;

var ShaderParticle = PIXI.ShaderParticle;

var app = new PIXI.Application(width, height, {
    backgroundColor: 0x1099bb,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
});
app.stop();
document.body.appendChild(app.view);

var ImagePool = loadImages(
    [
        { id: 'bunnies', src: 'asset/bunnies.png' },
        { id: 'html5', src: 'asset/html5.png' },
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
        start();
    }
);


function init() {
    if (useFilter) {
        // var filter = new PIXI.filters.BlurFilter();
        var filter = new PIXI.filters.AlphaFilter(1.0);
        filter.padding = 0;
        app.stage.filters = [filter];
    }

    bunniesTexture = PIXI.BaseTexture.from(ImagePool['bunnies']);
    html5Texture = PIXI.Texture.from(ImagePool['html5']);

    var texture = new PIXI.Texture(bunniesTexture, new PIXI.Rectangle(0, 0, 30, 46));

    bunnyBig = PIXI.Sprite.from(texture);
    bunnyBig.scale.set(4);
    bunnyBig.anchor.set(0.5);
    bunnyBig.x = app.renderer.width / 2;
    bunnyBig.y = 10;
    app.stage.addChild(bunnyBig);

    var html5 = PIXI.Sprite.from(html5Texture);
    html5.scale.set(0.5)
    html5.position.set(10, 10);
    app.stage.addChild(html5);

    initParticle();

    bunny = PIXI.Sprite.from(texture);
    bunny.anchor.set(0.5);
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
    app.stage.addChild(bunny);

    // app.renderer.state.setDepthTest(true);
}

function initParticle() {
    // var texture = new PIXI.Texture(bunniesTexture, new PIXI.Rectangle(0, 46, 30, 38));
    var texture = new PIXI.Texture(bunniesTexture);
    texture.orig = new PIXI.Rectangle(0, 0, 30 * zoom, 38 * zoom);

    particle = new PIXI.ShaderParticle(particleCount, texture, fboWidth, fboHeight);
    particle.anchor.set(0.5, 0.5);
    particle.setRegion(0, 0, width, height);
    particle.useFramebuffer = useFramebuffer;

    var statusList = createStatus(particleCount);
    var display = createDisplay(particleCount);

    var rectList = [
        [0, 0, 30 / 30, 46 / 203],
        [0, 46 / 203, 30 / 30, 38 / 203],
        [0, (46 + 38) / 203, 30 / 30, 38 / 203],
    ];
    var frames = [];
    var frameOffsets = [];
    var frameIdx = 0;
    for (var i = 0; i < particleCount; i++) {
        frames.push(rectList[frameIdx]);
        frameOffsets.push(rectList[frameIdx][0], rectList[frameIdx][1]);
        frameIdx = (frameIdx + 1) % rectList.length;
    }

    display.uniforms = {
        uParticleFrameSize: new Float32Array([30 / 30, 38 / 203])
    };
    display.attributes = [{
        'name': 'aParticleFrameOffset',
        'data': frameOffsets,
    }];

    particle.format = format;

    particle.setDisplay(display);
    particle.setStatusList(statusList);

    // particle.useStatus = [0, 1];

    particle.init(app.renderer.gl);

    app.stage.addChild(particle);
}

function start() {
    // app.ticker.add(update);
    update();
}

function update(delta) {

    stats && stats.begin();

    requestAnimationFrame(update);

    var now = Date.now();

    delta = 1;

    bunny.rotation += 0.02 * delta;
    bunnyBig.rotation -= 0.02 * delta;

    particle.position.x = 0 + Math.sin(now / 400) * 30;
    // particle.position.y = 0 + Math.cos(now / 400) * 30;
    particle.alpha = 0.6 + Math.sin(now / 500) * 0.4;
    particle.colorMultiplier = 1.1;

    particle.statusList[0].uniforms = {
        random: Math.random()
    };

    app.renderer.render(app.stage);

    // var red = 0.22 + Math.sin(now / 500) * 0.2;
    // var green = 0.22 + Math.sin(now / 700) * 0.2;
    // var blue = 0.22 + Math.sin(now / 900) * 0.2;
    // particle.colorOffset = new Float32Array([red, green, blue]);

    // particle.updateStatus(app.renderer);

    stats && stats.end();
}


var encodeShader = `
uniform vec2 SCALE;
// const vec2 SCALE = vec2(640.0 * 2.0, 640.0 * 2.0);
const float BASE = 255.0;
const float OFFSET = BASE * BASE / 2.0;

float decode(vec2 channels, float scale) {
    return (dot(channels, vec2(BASE, BASE * BASE)) - OFFSET) / scale;
}

vec2 encode(float value, float scale) {
    value = value * scale + OFFSET;
    float x = mod(value, BASE);
    float y = floor(value / BASE);
    return vec2(x, y) / BASE;
}
`;
