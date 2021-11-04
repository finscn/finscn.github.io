var LightTarget = PIXI.lighting.LightTarget;
var AmbientLight = PIXI.lighting.AmbientLight;
var DirectionalLight = PIXI.lighting.DirectionalLight;
var PointLight = PIXI.lighting.PointLight;


var canvas = document.getElementById("canvas");
var viewWidth = 1024;
var viewHeight = 512;

var renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight, {
    view: canvas
});

var stage = new PIXI.Container();
var group = new PIXI.Container();

var moveBlock;
var rotateBlock;



var stats = new Stats();
var lightCount = 1;

var diffuseRenderTexture;
var normalRenderTexture;

var lightHeight = 90;
var allLights = [];

// var amLight = new AmbientLight({
//     color: 0x555555,
//     brightness: 0.6,
// });

var dirLight = new DirectionalLight({
    color: 0xffdd66,
    brightness: 1,
    ambientColor: 0x555555,
    ambientBrightness: 0.6,
    position: {
        x: 0,
        y: 0,
        z: lightHeight,
    },
    target: {
        x: 0,
        y: 0,
        z: 0,
    }
});

var mouseLight = new PointLight({
    color: 0xffffff,
    brightness: 4,

    ambientColor: 0x555555,
    ambientBrightness: 0.6,

    position: {
        x: viewWidth / 2,
        y: viewHeight / 2,
        z: lightHeight,
    }
});

// allLights.push(amLight);

// allLights.push(dirLight);
allLights.push(mouseLight);

var deferred = false;

function createClickLight(x, y) {
    var clickLight = new PointLight({
        color: 0xee3311,
        brightness: 8,
        falloff: [0.3, 6, 60],
        position: {
            x: x,
            y: y,
            z: lightHeight,
        }
    });
    allLights.push(clickLight);
}

stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

// align top-left

var fat, fatP;

PIXI.loader
    .add('fat_diffuse', 'image/fat.png')
    .add('fat_normal', 'image/fat_normal.png')
    .add('fat_normal_p', 'image/fat_normal_p.png')
    .add('couch_diffuse', 'image/couch.jpg')
    .add('couch_normal', 'image/couch_normal.jpg')
    .add('bg_diffuse', 'image/BGTextureTest.jpg')
    .add('bg_normal', 'image/BGTextureNORM.jpg')
    .add('block_diffuse', 'image/block.png')
    .add('block_normal', 'image/blockNormalMap.png')
    .add('panda', 'image/panda.png')
    .load(function(loader, res) {
        initEvent();

        var bg = new PIXI.Sprite(res.bg_diffuse.texture);

        var block = new PIXI.Sprite(res.block_diffuse.texture);
        var block1 = new PIXI.Sprite(res.block_diffuse.texture);
        block1.anchor.set(0.5);

        var block2 = new PIXI.Sprite(res.block_diffuse.texture);
        var couch = new PIXI.Sprite(res.couch_diffuse.texture);

        fat = new PIXI.Sprite(res.fat_diffuse.texture);
        fat.anchor.set(0.5)
        fatP = new PIXI.Sprite(res.fat_diffuse.texture);
        fatP.anchor.set(0.5)

        fat.position.set(360 - 200, 300);
        fat.scale.set(-1, 1);
        fatP.position.set(360, 300);

        block.position.set(150, 150);
        block1.position.set(500, 150);
        block2.position.set(300, 400);
        couch.position.set(640, 280);
        couch.scale.set(0.5, 0.5);

        dirLight.target.x = block2.x;
        dirLight.target.y = block2.y;
        dirLight.updateDirection();

        bg.normalTexture = res.bg_normal.texture;
        couch.normalTexture = res.couch_normal.texture;
        block.normalTexture = res.block_normal.texture;
        block1.normalTexture = res.block_normal.texture;
        block2.normalTexture = res.block_normal.texture;
        fat.normalTexture = res.fat_normal.texture;
        fatP.normalTexture = res.fat_normal_p.texture;


        bg.lights = allLights;
        couch.lights = allLights;
        block.lights = allLights;
        block1.lights = allLights;
        block2.lights = allLights;

        // no lights sprite
        var panda = new PIXI.Sprite(res.panda.texture);
        panda.position.set(550, 100);
        // panda.rendererName = "lightsprite";
        // panda.lights = allLights;

        group.addChild(bg);

        group.addChild(couch);
        group.addChild(panda);

        group.addChild(block);
        group.addChild(block1);
        group.addChild(block2);

        group.addChild(fat);
        group.addChild(fatP);

        moveBlock = block;
        rotateBlock = block1;
        rotateBlock.id = 'ttt';

        var sprites = group.children;
        sprites.forEach(function(s) {
            LightTarget.applyTo(s);
            if (!deferred) {
                s.lights = allLights;
            }
        });

        if (deferred) {
            // for Deferred lighting
            diffuseRenderTexture = PIXI.RenderTexture.create(viewWidth, viewHeight);
            normalRenderTexture = PIXI.RenderTexture.create(viewWidth, viewHeight);

            var groupSprite = PIXI.Sprite.from(diffuseRenderTexture);
            groupSprite.normalTexture = normalRenderTexture;
            groupSprite.pluginName = "lightSprite";
            groupSprite.lights = allLights;

            stage.addChild(groupSprite);
        } else {
            stage.addChild(group);
        }


        animate();
    });

function animate() {
    requestAnimationFrame(animate);
    stats.begin();

    var now = Date.now();

    var x = 150 + Math.cos(now / 600) * 100;
    var y = 150 + Math.sin(now / 600) * 100;
    moveBlock.position.set(x, y);

    rotateBlock.rotation += 0.005;
    // fatP.rotation += 0.01;

    if (deferred) {
        renderer.clearRenderTexture(diffuseRenderTexture);
        renderer.clearRenderTexture(normalRenderTexture);

        renderer.renderingDiffuses = true;
        renderer.render(group, diffuseRenderTexture, false);
        renderer.renderingDiffuses = false;

        renderer.renderingNormals = true;
        renderer.render(group, normalRenderTexture, false);
        renderer.renderingNormals = false;
    }

    renderer.render(stage);

    stats.end();
}

function initEvent() {
    canvas.addEventListener('mousemove', function(e) {
        var rect = e.target.getBoundingClientRect();

        mouseLight.position.x = e.clientX - rect.left;
        mouseLight.position.y = e.clientY - rect.top;
    });

    canvas.addEventListener('click', function(e) {
        var rect = e.target.getBoundingClientRect();

        createClickLight(e.clientX - rect.left, e.clientY - rect.top);

        document.getElementById('numLights').textContent = ++lightCount;
    });
}
