var LightSpriteRenderer = PIXI.extension.light.LightSpriteRenderer;
var AmbientLight = PIXI.extension.light.AmbientLight;
var DirectionalLight = PIXI.extension.light.DirectionalLight;
var PointLight = PIXI.extension.light.PointLight;


var canvas = document.getElementById("canvas");
var viewWidth = 1024;
var viewHeight = 512;

var renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight, {
    view: canvas
});

var stage = new PIXI.Container();
var stats = new Stats();
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
    brightness: 1,
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
        color: 0xffffff,
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
    .add('bg_diffuse', 'image/BGTextureTest.jpg')
    .add('bg_normal', 'image/BGTextureNORM.jpg')
    .add('block_diffuse', 'image/block.png')
    .add('block_normal', 'image/blockNormalMap.png')
    .add('panda', 'image/panda.png')
    .load(function(loader, res) {
        var bg = new PIXI.Sprite(res.bg_diffuse.texture);
        stage.addChild(bg);


        var block = new PIXI.Sprite(res.block_diffuse.texture);
        var block1 = new PIXI.Sprite(res.block_diffuse.texture);
        var block2 = new PIXI.Sprite(res.block_diffuse.texture);

        block.position.set(100, 100);
        block1.position.set(500, 100);
        block2.position.set(300, 400);

        dirLight.target.x = block1.x;
        dirLight.target.y = block1.y;
        dirLight.updateDirection();

        bg.normalTexture = res.bg_normal.texture;
        block.normalTexture = res.block_normal.texture;
        block1.normalTexture = res.block_normal.texture;
        block2.normalTexture = res.block_normal.texture;

        bg.rendererName = "lightsprite";
        block.rendererName = "lightsprite";
        block1.rendererName = "lightsprite";
        block2.rendererName = "lightsprite";

        bg.lights = allLights;
        block.lights = allLights;
        block1.lights = allLights;
        block2.lights = allLights;

        // no lights sprite
        var panda = new PIXI.Sprite(res.panda.texture);
        panda.position.set(550, 100);
        stage.addChild(panda);
        // panda.rendererName = "lightsprite";
        // panda.lights = allLights;

        stage.addChild(block);
        stage.addChild(block1);
        stage.addChild(block2);


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
