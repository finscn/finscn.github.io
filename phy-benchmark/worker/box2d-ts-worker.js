var rootUrl;
var bodiesData;
var mainData;
var COUNT;

// Body:       id | xf.p.x | xf.p.y | angle | shapeCount
// poly:       vCount | x | y | ... | x | y
// rect(9):   4 | x | y | x | y |x | y |x | y
// circle(4):  0 | radius | x | y

var BODIES_SIZE = 0;

self.onmessage = function(e) {
    if (!box2d) {
        rootUrl = e.data.rootUrl;
        COUNT = e.data.COUNT;
        importScripts(rootUrl + '../base/system-production.js');
        importScripts(rootUrl + '../box2d-ts.min.js');
        init();
    } else {
        // We got a new buffer
        var array = e.data;
        // TODO
        bodiesData = array;
    }
}

var Config = {
    timeScale: 1.25 / 1000,
    gravity: -9.8,
    positionIterations: 3,
    velocityIterations: 8,

    angularVelocity: 0.2,
    boardWidth: 40,
    boardHeight: 1,
    circleRaius: 3,
    circleMargin: 12,
    boxSize: 0.8,

    // allowSleep: true,
    // warmStarting: true,
    // continuousPhysics: true,
    // subStepping: false,
    // blockSolve: true,
};

var tumblerBox;

var box2d;

function init() {
    System.import("Box2D").then(function(Box2D) {
        box2d = Box2D;
        console.log(box2d.b2_version);

        console.log(COUNT);

        world = new box2d.b2World(new box2d.b2Vec2(0, Config.gravity));

        var bd = new box2d.b2BodyDef();
        // bd.type = box2d.b2BodyType.b2_staticBody;
        // bd.type = box2d.b2BodyType.b2_kinematicBody;
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position.Set(0.0, 0.0);
        tumblerBox = createBody(bd);

        var shape;

        var bwHalf = Config.boardWidth / 2;
        var bhHalf = Config.boardHeight / 2;
        shape = createRectShape(bhHalf, bwHalf, new box2d.b2Vec2(bwHalf, 0.0), 0.0);
        tumblerBox.CreateFixture(shape, 1.0);
        shape = createRectShape(bhHalf, bwHalf, new box2d.b2Vec2(-bwHalf, 0.0), 0.0);
        tumblerBox.CreateFixture(shape, 1.0);
        shape = createRectShape(bwHalf, bhHalf, new box2d.b2Vec2(0.0, bwHalf), 0.0);
        tumblerBox.CreateFixture(shape, 1.0);
        shape = createRectShape(bwHalf, bhHalf, new box2d.b2Vec2(0.0, -bwHalf), 0.0);
        tumblerBox.CreateFixture(shape, 1.0);

        var radius = Config.circleRaius;
        var cx = Config.circleMargin;
        var cy = Config.circleMargin;
        shape = createCircleShape(radius, cx, cy)
        tumblerBox.CreateFixture(shape, 1.0);
        shape = createCircleShape(radius, -cx, cy)
        tumblerBox.CreateFixture(shape, 1.0);
        shape = createCircleShape(radius, -cx, -cy)
        tumblerBox.CreateFixture(shape, 1.0);
        shape = createCircleShape(radius, cx, -cy)
        tumblerBox.CreateFixture(shape, 1.0);


        var bd = new box2d.b2BodyDef();
        var ground = createBody(bd);
        var jd = new box2d.b2RevoluteJointDef();
        jd.bodyA = ground;
        jd.bodyB = tumblerBox;
        jd.localAnchorA.Set(-0.0, 0.0);
        jd.localAnchorB.Set(0.0, 0.0);
        jd.referenceAngle = 0.0;
        jd.motorSpeed = Config.angularVelocity;
        jd.maxMotorTorque = 1e8;
        jd.enableMotor = true;
        world.CreateJoint(jd);

        var count = 0;
        while (count < COUNT) {
            var bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_dynamicBody;
            bd.position.Set(0.0 + randomInt(-120, 120) / 10, 0.0 + randomInt(-120, 120) / 10);
            var body = createBody(bd);

            var shape = createRectShape(Config.boxSize / 2, Config.boxSize / 2);
            body.CreateFixture(shape, 1.0);

            count++;
        }

        start();

    }).catch(function(error) {
        console.error(error);
    });
}

function createBody(bodyDef) {
    var body = world.CreateBody(bodyDef);
    BODIES_SIZE += 5;
    return body;
}

function createRectShape(w, h, center, angle) {
    var shape = new box2d.b2PolygonShape();
    shape.SetAsBox(w, h, center || box2d.ZERO, angle || 0.0);
    BODIES_SIZE += 9;
    return shape;
}

function createCircleShape(radius, x, y) {
    var shape = new box2d.b2CircleShape(radius);
    shape.m_p.Set(x, y);
    BODIES_SIZE += 4;
    return shape;
}

function randomInt(min, max) {
    return ((max - min + 1) * Math.random() + min) >> 0;
}

function sendMainData() {
    if (mainData) {
        self.postMessage(mainData, [mainData.buffer]);
        mainData = null;
    }
}

function sendBodiesData() {
    if (bodiesData) {
        self.postMessage(bodiesData, [bodiesData.buffer]);
        bodiesData = null;
    }
}

var timeStep = 16 * Config.timeScale;

var loopId;

function start() {

    console.log('BODIES_SIZE', BODIES_SIZE);

    bodiesData = new Float32Array(BODIES_SIZE + 1);

    loopId = setInterval(function() {
        world.Step(timeStep, Config.velocityIterations, Config.positionIterations);

        if (!bodiesData) {
            return;
        }

        bodiesData[0] = 1;
        var i = 1;
        var bodyCount = 0;
        for (var b = world.m_bodyList; b; b = b.m_next) {
            bodyCount++;
            var id = b.id || 123;
            var xf = b.m_xf;
            bodiesData[i++] = id;
            bodiesData[i++] = xf.p.x;
            bodiesData[i++] = xf.p.y;
            bodiesData[i++] = xf.q.GetAngle();

            var sCountIdx = i++;
            var shapeCount = 0;
            for (var f = b.m_fixtureList; f; f = f.m_next) {
                shapeCount++;
                var shape = f.GetShape();
                if (shape.m_vertices) {
                    var vCount = bodiesData[i++] = shape.m_count;
                    for (var j = 0; j < vCount; j++) {
                        var v = shape.m_vertices[j];
                        bodiesData[i++] = v.x;
                        bodiesData[i++] = v.y;
                    }
                } else if (shape.m_p) {
                    bodiesData[i++] = 0;
                    bodiesData[i++] = shape.m_radius;
                    bodiesData[i++] = shape.m_p.x;
                    bodiesData[i++] = shape.m_p.y;
                }
            }

            bodiesData[sCountIdx] = shapeCount;
        }
        sendBodiesData();

    }, timeStep / Config.timeScale);
}
