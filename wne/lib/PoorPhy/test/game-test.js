var world, demo;
var canvas, context;
var FPS = 60;
var timeStep = 1 / 60;
var RENDER_SCALE = 30;
var scale = 1;
var notSolve = false;
var allowSleep = !false;

var solveIterations = 10;
var damping = 0.4;
var dampingAng = 0.8;
var friction = 0.3;
var restitution = 0.25;
var gravity = 0;


var walls = []

    function initGround() {

        var w;

        w = createSegmentBody(20, 10, 1, 0, BodyType.Static)
        walls.push(w)
        w = createSegmentBody(20, 10, 14, 0, BodyType.Static)
        walls.push(w)
        w = createSegmentBody(20, 1, 10, Math.PI / 2, BodyType.Static)
        walls.push(w)
        w = createSegmentBody(20, 19, 10, Math.PI / 2, BodyType.Static)
        walls.push(w)

        // createCircleBody(10, -7, 8, 0, BodyType.Static)
        // createCircleBody(10, 27, 8, 0, BodyType.Static)
        // createCircleBody(8, 10, 20, 0, BodyType.Static)

    }
var star;
var blocks = [];
var entities = [];

function initBodies() {

    star = createPolyBody(5, 1, 8, 14 - 5);


    var b1 = createRectBodyA(1, 3, 4, 4.5);
    var b2 = createRectBodyA(2, 1, 4 + 1.5, 4.5 - 1);
    var cmp = new Composition({
        shapes: [
            b1, b2
        ]
    })
    cmp.init();
    world.addBody(cmp);

    blocks.push(cmp)

    for (var r = 0; r < 2; r++) {
        for (var c = 0; c < 2; c++) {
            if (!r && !c) {
                continue;
            }
            var w = 4,
                h = 2;
            var x = c * 10 + 4,
                y = r * 6 + 4;
            var a = randomInt(-10, 10) / 10;
            var b = createRectBody(w, h, x, y, a)
            blocks.push(b);

        }
    }

    entities = [star].concat(blocks);
}


function init() {

    world = new World({
        gravityY: gravity,
        allowSleep: allowSleep
    });
    world.init();
    world.solveIterations = solveIterations;
    world.collideManager.notSolve = notSolve;
    world.collideManager.collide = function(timeStep) {

        var entityCount = entities.length;
        var staticCount = walls.length;

        for (var i = 0; i < entityCount - 1; i++) {
            var entity = entities[i];

            for (var j = 0; j < staticCount; j++) {
                var wall = walls[j];
                this.collideTowBodies(wall, entity, timeStep);
            }

            for (var j = i + 1; j < entityCount; j++) {

                this.collideTowBodies(entity, entities[j], timeStep);

            }
        }

        var entity = entities[i];
        for (var j = 0; j < staticCount; j++) {
            var wall = walls[j];
            this.collideTowBodies(wall, entity, timeStep);
        }


        for (var i = 0, len = circles.length; i < len; i++) {
            var circle = circles[i];
            if (!circle.disabled) {
                var arbiter = this.collideTowBodies(circle, star, timeStep);
                if (arbiter) {
                    kickStar(circle, arbiter)
                }
            }
        }

    };

    initRender();
    initEvent();
    initGround();
    initBodies();


    function kickStar(circle, arbiter) {

        var dx = star.x - circle.x,
            dy = star.y - circle.y;
        var rad = Math.atan2(dy, dx);
        var cos = Math.cos(rad),
            sin = Math.sin(rad);
        var v = 2 + 10 * circle.alpha;
        var vx = v * cos,
            vy = v * sin;
        // console.log(vx,vy,arbiter.contacts[0].contactOnA)
        star.applyImpulse(vx, vy, arbiter.contacts[0].contactOnA);

        circle.disabled = true;
        arbiter.disabled = true;

    }

    function update() {

        if (touched) {
            if (cooldown <= 0) {
                addWaveCircle(touch.x, touch.y);
                cooldown = 600;
            }
            touchedTime += 30;
            cooldown -= 30;
        } else {
            cooldown = 600;
        }
        // star.velY+=0.05

        context.clearRect(0, 0, canvas.width, canvas.height);

        var i = 0,
            len = circles.length;
        while (i < len) {
            circle = circles[i];
            circle.radius += 0.03;
            circle.radiusSq = circle.radius * circle.radius;
            circle.updateAABB();
            circle.alpha -= 0.0075;
            if (circle.alpha <= 0) {
                circle.alpha = 0;
                circle.disabled = true;
                circle._to_remove_ = true;
                circles.splice(i, 1);
                len--;
                continue;
            }
            i++
        }
        // console.log(bb1.velY, bb1.velY*timeStep,bb1.y)

        world.step(timeStep);

        var bodies = world.bodies;
        drawBodies(context, bodies);

        // drawArbiter(context,world.collideManager);

    };


    window.setInterval(update, 1000 / FPS);

};

var circles = []



var touched = false;
var touchedTime = 0;
var cooldown = 0;
var touch = {
    x: 0,
    y: 0
};

function initEvent() {

    var tapDown = "mousedown",
        tapUp = "mouseup",
        touchMove = "mousemove";

    if ("ontouchstart" in window) {
        tapDown = "touchstart";
        tapUp = "touchend";
        touchMove = "touchmove";
    }

    window.addEventListener(touchMove, function(event) {
        if (!touched || touchedTime <= 0) {
            return;
        }
        var x = event.pageX,
            y = event.pageY;
        x -= canvas.x;
        y -= canvas.y;
        touch.x = x;
        touch.y = y;



    });

    window.addEventListener(tapDown, function(event) {
        touched = true;
        touchedTime = 0;
        cooldown = 600;
        var x = event.pageX,
            y = event.pageY;
        x -= canvas.x;
        y -= canvas.y;
        touch.x = x;
        touch.y = y;

    });

    window.addEventListener(tapUp, function(event) {
        touched = false;
        touchedTime = 0;
        cooldown = 600;

        var x = event.pageX,
            y = event.pageY;
        x -= canvas.x;
        y -= canvas.y;
        touch.x = x;
        touch.y = y;
        addWaveCircle(x, y);
    })
}

function addWaveCircle(x, y) {
    x /= RENDER_SCALE;
    y /= RENDER_SCALE;
    // if (star && !star.containPoint(x, y)) {
    // context.fillStyle="green";
    // context.fillRect(x*RENDER_SCALE,y*RENDER_SCALE,2,2);
    var c = createCircleBody(0.5, x, y, 0, BodyType.Static);
    c.alpha = 1;
    c.autoSleep=false;
    circles.push(c);
    console.log(circles.length)
    // }
}

function initRender() {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    var p = getElementPosition(canvas);
    canvas.x = p.x;
    canvas.y = p.y;
}

function createRectBodyA(w, h, x, y, angle, type) {
    var vertices = createRect(w * scale, h * scale);
    vertices = rotatePoints(vertices, angle || 0);
    vertices = translatePoints(vertices, x * scale, y * scale);

    var body = new Polygon({
        vertices: vertices,
        friction: friction,
        restitution: restitution
    })
    // BodyType.Static;
    if (type !== undefined) {
        body.bodyType = type;
    }
    if (body.bodyType === BodyType.Static) {
        body.mass = 0;
    }
    // body.init();
    // world.addBody(body);
    return body;

}

Body.prototype.friction = friction;
Body.prototype.restitution = restitution;
Body.prototype.damping = damping;
Body.prototype.dampingAng = dampingAng;
Circle.prototype.friction = friction;
Circle.prototype.restitution = restitution;
Circle.prototype.damping = damping;
Circle.prototype.dampingAng = dampingAng;
Polygon.prototype.friction = friction;
Polygon.prototype.restitution = restitution;
Polygon.prototype.damping = damping;
Polygon.prototype.dampingAng = dampingAng;
Segment.prototype.friction = friction;
Segment.prototype.restitution = restitution;
Segment.prototype.damping = damping;
Segment.prototype.dampingAng = dampingAng;
Composition.prototype.friction = friction;
Composition.prototype.restitution = restitution;
Composition.prototype.damping = damping;
Composition.prototype.dampingAng = dampingAng;