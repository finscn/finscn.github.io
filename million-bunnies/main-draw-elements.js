var width = window.innerWidth;
var height = window.innerHeight;
var fboSize = 1024 * 2;
var zoom = 0.5;
var bunniesToRender = 1000000 // 1048576 ;
// var bunniesToRender = 200000;

var glCore = PIXI.glCore;
var gl;

var physicsShader;
var renderShader;
var vao;
var phyVao;
var fbo1;
var fbo2;
var bunnyTexture;


var loader = new PIXI.loaders.Loader();
loader.add('bunny_8x8.png');
loader.load(init);

function initShaders() {
    // set up the physics renderShader.
    // this shader will compute the position and speed of a bunny
    // r - position x
    // g - position y
    // b - speed x
    // a - speed y
    var vertPhysics = document.getElementById('physics-vert').innerHTML;
    var fragPhysics = document.getElementById('physics-frag').innerHTML;
    physicsShader = new glCore.GLShader(gl, vertPhysics, fragPhysics);

    physicsShader.bind();
    physicsShader.uniforms.positionTex = 0;
    physicsShader.uniforms.bounds = [width, height];

    // a simple shader that will render each bunny using points
    var vertPoints = document.getElementById('points-vert').innerHTML;
    var fragPoints = document.getElementById('points-frag').innerHTML;
    renderShader = new glCore.GLShader(gl, vertPoints, fragPoints);

    renderShader.bind();
    renderShader.uniforms.uSampler = 1;
    renderShader.uniforms.positionTex = 0;
    renderShader.uniforms.bounds = [width, height];
}

function initPhysicsVao() {
    // here we set up a vao to render a simple quad..
    var verts = new Float32Array([-1,-1
                                 ,-1, 1
                                 , 1, 1
                                 , 1,-1]);

    var uvs = new Float32Array([ 0, 0
                               , 0, 1
                               , 1, 1
                               , 1, 0])

    var indices = new Uint16Array([0,1,2,0,3,2]);

    var verts = new glCore.GLBuffer.createVertexBuffer(gl, verts);
    var uvs = new glCore.GLBuffer.createVertexBuffer(gl, uvs);
    var indices = new glCore.GLBuffer.createIndexBuffer(gl, indices);

    // create a VertexArrayObject - this will hold all the details for rendering the quad
    phyVao = new glCore.VertexArrayObject(gl);
    phyVao.addAttribute(verts, physicsShader.attributes.aVertexPosition);
    phyVao.addAttribute(uvs, physicsShader.attributes.aTextureCoord);
    phyVao.addIndex(indices);
}

function initPointsVao() {
    // the total numbe rof bunnys to upload..
    var totalBunnies = bunniesToRender // 1048576;

    var verts = new Float32Array(totalBunnies * 8);
    var coord = new Float32Array(totalBunnies * 8);
    var spriteIndices = new Float32Array(totalBunnies * 8);

    var idx = 0;
    var c = 0;
    var r = 0;

    for (var i = 0; i < totalBunnies; i++) {

        verts[idx + 0] = 0;
        verts[idx + 1] = 0;

        verts[idx + 2] = 0;
        verts[idx + 3] = -8 * zoom * 2 / height;

        verts[idx + 4] = 8 * zoom * 2 / width;
        verts[idx + 5] = -8 * zoom * 2 / height;

        verts[idx + 6] = 8 * zoom * 2 / width;
        verts[idx + 7] = 0;


        coord[idx + 0] = 0;
        coord[idx + 1] = 0;

        coord[idx + 2] = 0;
        coord[idx + 3] = 1;

        coord[idx + 4] = 1;
        coord[idx + 5] = 1;

        coord[idx + 6] = 1;
        coord[idx + 7] = 0;


        spriteIndices[idx + 0] = c / fboSize;
        spriteIndices[idx + 1] = r / fboSize;

        spriteIndices[idx + 2] = c / fboSize;
        spriteIndices[idx + 3] = r / fboSize;

        spriteIndices[idx + 4] = c / fboSize;
        spriteIndices[idx + 5] = r / fboSize;

        spriteIndices[idx + 6] = c / fboSize;
        spriteIndices[idx + 7] = r / fboSize;

        c++;
        if (c >= fboSize) {
            c = 0;
            r++;
        }
        idx += 8;
    };


    var totalIndices = totalBunnies * 6;

    var indices = new Uint16Array(totalIndices);

    // fill the indices with the quads to draw
    for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
        indices[i + 0] = j + 0;
        indices[i + 1] = j + 1;
        indices[i + 2] = j + 2;
        indices[i + 3] = j + 0;
        indices[i + 4] = j + 2;
        indices[i + 5] = j + 3;
    }

    // create some buffers to hold our vertex data
    // the vertex data here does not hold a posiiton of the bunny, but the uv of the pixle in the physics texture
    var quadVerts = new glCore.GLBuffer.createVertexBuffer(gl, verts);
    var quadCoord = new glCore.GLBuffer.createVertexBuffer(gl, coord);
    var quadSpriteIndices = new glCore.GLBuffer.createVertexBuffer(gl, spriteIndices);
    var indices = new glCore.GLBuffer.createIndexBuffer(gl, indices);

    // create a VertexArrayObject - this will hold all the details for rendering the points
    vao = new glCore.VertexArrayObject(gl);
    vao.addAttribute(quadVerts, renderShader.attributes.aVertexPosition);
    vao.addAttribute(quadCoord, renderShader.attributes.aTextureCoord);
    vao.addAttribute(quadSpriteIndices, renderShader.attributes.aIndex);
    vao.addIndex(indices);
}

function initFbos() {
    var bunnyPhysicsData = new Float32Array(4 * fboSize * fboSize);

    for (var i = 0; i < bunnyPhysicsData.length; i += 4) {
        bunnyPhysicsData[i] = Math.random() * width; // initial x of bunny
        bunnyPhysicsData[i + 1] = Math.random() * -height * 2; // initial y of bunny
        bunnyPhysicsData[i + 2] = Math.random() * 10; // initial x speed of bunny
        bunnyPhysicsData[i + 3] = (Math.random() * 5) - 2.5; // initial y speed of bunny
    };

    // create two floating points frambuffer objects..
    // we will flip flop these to update the physics
    fbo1 = glCore.GLFramebuffer.createFloat32(gl, fboSize, fboSize, bunnyPhysicsData); //createFBO(fboSize, fboSize, bunnyPhysicsData);
    fbo2 = glCore.GLFramebuffer.createFloat32(gl, fboSize, fboSize, bunnyPhysicsData);
}

function initBunnyTexture(width, height, data) {
    var img = PIXI.Texture.fromImage('bunny_8x8.png').baseTexture.source;
    // create a new bunny texture...
    bunnyTexture = new glCore.GLTexture.fromSource(gl, img, true);

    // get the bunny image

    // set up the texture
    bunnyTexture.enableWrapClamp();
    bunnyTexture.enableNearestScaling();

    //lets bind it to texture 1..
    bunnyTexture.bind(1);
}

function init() {
    var view = document.createElement('canvas');
    view.width = width;
    view.height = height;
    var contextOptions = {
        alpha: false,
        antialias: false,
        premultipliedAlpha: false,
        stencil: false,
        preserveDrawingBuffer: false,
    };

    document.body.appendChild(view);

    counter = document.createElement("div");
    counter.className = "counter";
    counter.innerHTML = bunniesToRender + " BUNNIES";
    document.body.appendChild(counter);

    // stats!
    stats = new Stats();
    document.body.appendChild(stats.domElement);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = "0px";

    gl = glCore.createContext(view, contextOptions);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(1, 1, 1, 1);

    initShaders();

    initPhysicsVao();
    initPointsVao();
    initFbos();

    initBunnyTexture();

    // lets activate texture 0 (this is the only one we update in the loop)
    gl.activeTexture(gl.TEXTURE0);


    // var gui = new dat.GUI({ width: 300 });
    // gui.add(window, 'bunniesToRender', 100000, 1000000);

    animate();
};

function animate() {

    stats.begin();

    /*

        STEP 1

     */
    // first we must update the physics on all the bunnies

    // bind the physics shader and then set the tick ( this is used to randoize the bounces )
    physicsShader.bind();
    physicsShader.uniforms.tick = Math.random() * 10000;

    // bind the firt fbo texture we will render this to the second fbo
    fbo1.texture.bind();

    // bind the second fbo..
    fbo2.bind();

    // disable blend as we want a straight overwrite. We could also us clear color here too
    gl.disable(gl.BLEND);
    // make sure the viewport is set to the same size as the fbo or weirdness will happen!
    gl.viewport(0, 0, fboSize, fboSize);

    // bind the quad vao
    phyVao.bind();

    // draw the quad..
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    // finally unbind the second fbo as we no longer need to render to it
    fbo2.unbind();


    /*

        STEP 2

     */

    // firt we clear the screen with a nice white

    gl.clear(gl.COLOR_BUFFER_BIT);

    // re-enable blending so our bunnies look good
    gl.enable(gl.BLEND);

    // set the view port to be the correct size of the gl context
    gl.viewport(0, 0, width, height);

    // bind the point shader program..
    renderShader.bind();

    // bind the texture we just rendered in step one.
    fbo2.texture.bind();

    // bind the vao
    vao.bind();

    // boom! draw some bunnies using gl Points
    gl.drawElements(gl.TRIANGLES, bunniesToRender * 6, gl.UNSIGNED_SHORT, 0);


    // flip flop the fbos so we write the new data to the other fbo next time
    var temp = fbo2;
    fbo2 = fbo1;
    fbo1 = temp;

    stats.end();

    // rinse and repeat
    requestAnimationFrame(animate);
}
