var LightSpriteRenderer = PIXI.lights.LightSpriteRenderer;
var AmbientLight = PIXI.lights.AmbientLight;
var DirectionalLight = PIXI.lights.DirectionalLight;
var PointLight = PIXI.lights.PointLight;

var viewWidth = 1024;
var viewHeight = 512;

var useStaticScene = false;
var scene;
var staticScene;


var stats = new Stats();
var canvas = document.getElementById("canvas");
var renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight, {
    view: canvas
});
var stage = new PIXI.Container();


var lightCount = 1;

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
    position: {
        x: viewWidth / 2,
        y: viewHeight / 2,
        z: lightHeight,
    }
});

// allLights.push(amLight);
allLights.push(dirLight);
allLights.push(mouseLight);


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


PIXI.loader
    .add('couch_diffuse', 'image/couch.jpg')
    .add('couch_normal', 'image/counch_norm.jpg')
    .add('bg_diffuse', 'image/BGTextureTest.jpg')
    .add('bg_normal', 'image/BGTextureNORM.jpg')
    .add('block_diffuse', 'image/block.png')
    .add('block_normal', 'image/blockNormalMap.png')
    .add('panda', 'image/panda.png')
    .load(function(loader, res) {
        var bg = new PIXI.Sprite(res.bg_diffuse.texture);

        var block = new PIXI.Sprite(res.block_diffuse.texture);
        var block1 = new PIXI.Sprite(res.block_diffuse.texture);
        var block2 = new PIXI.Sprite(res.block_diffuse.texture);
        var couch = new PIXI.Sprite(res.couch_diffuse.texture);

        block.position.set(100, 100);
        block1.position.set(500, 100);
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

        bg.pluginName = "lightSprite";
        couch.pluginName = "lightSprite";
        block.pluginName = "lightSprite";
        block1.pluginName = "lightSprite";
        block2.pluginName = "lightSprite";

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

        var sprites = [
            bg,
            couch,
            panda,
            block,
            block1,
            block2,
        ];

        if (!useStaticScene) {
            scene = new PIXI.Container();

            sprites.forEach(function(s) {
                scene.addChild(s);
            });

            stage.addChild(scene);
        } else {
            var diffuseRenderTexture = PIXI.RenderTexture.create(viewWidth, viewHeight);
            staticScene = PIXI.Sprite.from(diffuseRenderTexture);

            var normalRenderTexture = PIXI.RenderTexture.create(viewWidth, viewHeight);
            // staticScene.normalTexture = normalRenderTexture;
            // staticScene.pluginName = "lightSprite";

            renderer.renderingDiffuses = true;
            sprites.forEach(function(s) {
                renderer.render(s, diffuseRenderTexture, false);
            });
            renderer.renderingDiffuses = false;

            renderer.renderingNormals = true;
            sprites.forEach(function(s) {
                renderer.render(s, normalRenderTexture, false);
            });
            renderer.renderingNormals = false;

            stage.addChild(staticScene);
        }




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

        animate();
    });

function animate() {
    requestAnimationFrame(animate);
    stats.begin();
    renderer.render(stage);
    stats.end();
}
