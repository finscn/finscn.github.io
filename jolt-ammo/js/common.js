// Graphics variables
var container, stats;
var camera, controls, scene, renderer;

// List of objects spawned
var dynamicObjects = [];

// The update function
var onExampleUpdate;


var maxNumObjects = 2000;


// Timers
var clock = new THREE.Clock();
var time = 0;
// Spawning variables
var objectTimePeriod = 0.03;
var timeNextSpawn = time + objectTimePeriod;


let floor;
let floorY = 0
let floorPos;
let floorQuat;
const floorWidth = 64
const floorHeight = 64
const floorThickness = 10


const restitution = 0.4
const friction = 0.5
const mass = 5

var canvasWidth = 1024
var canvasHeight = 720

function onWindowResize() {

    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();

    // renderer.setSize(window.innerWidth, window.innerHeight);
}

function initGraphics() {

    // canvasWidth = window.innerWidth
    // canvasHeight = window.innerHeight

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xbfd1e5);
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(2);
    renderer.setSize(canvasWidth, canvasHeight);

    camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, 0.2, 2000);
    camera.position.set(0, 55, 55);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 10, 5);
    scene.add(dirLight);

    controls = new THREE.OrbitControls(camera, container);

    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function generateRandomFunction(seed) {
    const rand = function () {
        seed = ((214013 * seed + 2531011) & 4294967295) >>> 0
        return seed / 4294967296
    }

    return rand
}

const pRandom = generateRandomFunction(100200300)
function mRandom() {
    // return mRandom()
    return pRandom()
}

function randomRotation(threeObject) {
    // Derived from http://planning.cs.uiuc.edu/node198.html
    // Note, this source uses w, x, y, z ordering,
    // so we swap the order below.

    const u1 = mRandom();

    const sqrt1u1 = Math.sqrt(1 - u1);
    const sqrtu1 = Math.sqrt(u1);
    const u2 = 2 * Math.PI * mRandom();
    const u3 = 2 * Math.PI * mRandom();


    return threeObject.quaternion.set(
        sqrt1u1 * Math.cos(u2),
        sqrtu1 * Math.sin(u3),
        sqrtu1 * Math.cos(u3),
        sqrt1u1 * Math.sin(u2),
    );
}

function generateObject() {

    let numTypes = 4;
    let objectType = Math.ceil(mRandom() * numTypes);

    let threeObject = null;

    let colors = [0x00ff00, 0xd90074, 0xf2ff40, 0xdd3311, 0x80d5ff, 0x165943, 0x567371, 0x69778c, 0xbeb6f2, 0x7159b3, 0x73004d, 0xd9b1a3, 0xff8091, 0xbf3030, 0x592400, 0xa66c29, 0xb3aa86, 0x296600, 0x00e600, 0x66ccaa, 0x00eeff, 0x3d9df2, 0x000e33, 0x3d00e6, 0xb300a7, 0xff80d5, 0x330d17, 0x59332d, 0xff8c40, 0x33210d, 0x403c00, 0x89d96c, 0x0d3312, 0x0d3330, 0x005c73, 0x0066ff, 0x334166, 0x1b0066, 0x4d3949, 0xbf8faf, 0x59000c]
    let material = new THREE.MeshPhongMaterial({ color: colors[objectType - 1] });

    let radius;
    let width, height;
    let sx, sy, sz;
    switch (objectType) {
        case 1: {
            // Sphere
            radius = 0.5 + mRandom();
            threeObject = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 20), material);
            break;
        }

        case 2: {
            // Box
            sx = 1 + mRandom();
            sy = 1 + mRandom();
            sz = 1 + mRandom();
            threeObject = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
            break;
        }

        case 3: {
            // Cylinder
            radius = 0.5 + mRandom();
            height = 1 + mRandom();
            threeObject = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 20, 1), material);
            break;
        }

        case 4: {
            // Capsule
            radius = 0.5 + mRandom();
            height = 1 + mRandom();
            threeObject = new THREE.Mesh(new THREE.CapsuleGeometry(radius, height, 20, 10), material);
            break;
        }
    }

    if (!threeObject) {
        return
    }

    // Position and rotate visual mesh
    threeObject.position.set((mRandom() - 0.5) * floorWidth * 0.7, 20, (mRandom() - 0.5) * floorHeight * 0.7);
    randomRotation(threeObject);

    // Create physics body
    const data = {
        radius,
        width, height,
        sx, sy, sz,
        convexRadius: 0.05
    }
    let body = generatePhysicsBody(threeObject, objectType, data)

    addToScene(threeObject, body);
}

function createFloor() {
    // Create floor mesh
    let threeObject = new THREE.Mesh(
        new THREE.BoxGeometry(floorWidth, floorThickness, floorHeight, 1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0xC7C7C7 })
    );

    const data = {
        sx: floorWidth / 2,
        sy: floorThickness / 2,
        sz: floorHeight / 2,
        convexRadius: 0.05,
        x: 0,
        y: floorY,
        z: 0,
        qx: 0,
        qy: 0,
        qz: 0,
        qw: 1

    }
    let body = generateBlockPhysicsBody(threeObject, data)

    addToScene(threeObject, body, false);

    return threeObject;
}

function createWalls() {
    let cfg = [
        [floorWidth + 4, 34, 4, 0, 8, -floorHeight / 2],
        [floorWidth + 4, 34, 4, 0, 8, floorHeight / 2],
        [4, 34, floorHeight + 4, -floorWidth / 2, 8, 0],
        [4, 34, floorHeight + 4, floorWidth / 2, 8, 0]
    ]

    cfg.forEach(d => {
        let wall = new THREE.Mesh(
            new THREE.BoxGeometry(d[0], d[1], d[2], 1, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0x999999 }
            ));
        wall.position.set(d[3], d[4], d[5]);

        let data = {
            sx: d[0] / 2,
            sy: d[1] / 2,
            sz: d[2] / 2,
            convexRadius: 0.05,
            x: d[3],
            y: d[4],
            z: d[5],
            qx: 0,
            qy: 0,
            qz: 0,
            qw: 1
        }
        let body = generateBlockPhysicsBody(wall, data)
        addToScene(wall, body, false);
    })
}

function addToScene(threeObject, body, dynamic) {

    threeObject.userData.body = body;

    scene.add(threeObject);

    if (dynamic !== false) {
        dynamicObjects.push(threeObject);
    }
}


function initExample(updateFunction) {
    container = document.getElementById('container');
    container.innerHTML = "";

    if (WebGL.isWebGLAvailable()) {
        onExampleUpdate = updateFunction;

        initGraphics();
        initPhysics();
        renderExample();
    } else {
        const warning = WebGL.getWebGLErrorMessage();
        container.appendChild(warning);
    }
}


let shakeTime = 0
function renderExample() {

    requestAnimationFrame(renderExample);

    var deltaTime = clock.getDelta();

    if (onExampleUpdate != null)
        onExampleUpdate(time, deltaTime);

    // Update object transforms

    time += deltaTime;

    if (dynamicObjects.length >= maxNumObjects) {
        shakeTime += deltaTime
        let dy = -Math.sin(shakeTime * 1.5) * 2
        if (dy < 0) {
            dy *= 1.5
        }
        updateFloor(deltaTime, dy)
    }

    updatePhysics(deltaTime);

    updateDynamicObjects();

    controls.update(deltaTime);

    renderer.render(scene, camera);

    stats.update();
}


function start() {
    // Initialize this example
    initExample(onUpdate);

    createWalls()
    floor = createFloor();

    // Create a basic floor
    const countLabel = document.getElementById('obj-count')
    function onUpdate(time, deltaTime) {
        // Check if its time to spawn a new object
        let count = dynamicObjects.length
        if (count < maxNumObjects && time > timeNextSpawn) {
            for (let i = 0; i < 5; i++) {
                generateObject();
                count++
            }
            countLabel.innerText = count
            timeNextSpawn = time + objectTimePeriod;
        }
    }
}
