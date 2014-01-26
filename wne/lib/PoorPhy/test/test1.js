var world, demo;
var canvas, context;
var FPS = 60;
var timeStep = 1 / 60;
var RENDER_SCALE = 30;
var scale = 1;
var allowSleep = !false;
var notSolve = false;

var gravity = 10;
var damping = 0;

var linearSlop = 0; //0.005;
var angularSlop = 2.0 / 180.0 * Math.PI;

var friction = 0.3;
var restitution = 0.25;
var solveIterations = 10;


function initGround() {

    createRectBody(1, 12, 1, 7.5, 0, BodyType.Static)
    createRectBody(1, 12, 19, 7.5, 0, BodyType.Static)
    createRectBody(20, 1, 10, 14, 0, BodyType.Static)

    // createCircleBody(10, -7, 8, 0, BodyType.Static)
    // createCircleBody(10, 27, 8, 0, BodyType.Static)
    // createCircleBody(8, 10, 20, 0, BodyType.Static)

}
var bb1, bb2, bb3;

function initBodies() {

    // bb1=createRectBody(3,1,8,9);
    // bb2 = createCircleBody(1.5, 5, 4)
    // bb3 = createRectBody(4, 2, 10, 5);
        // bb2=createRectBody(4,2,10,6,0);

    bb1 = createRectBody(3, 3, 8, 9-0.1);
    bb2 = createRectBody(3, 3, 8, 12-0.05);
    // bb3 = createCircleBody(1.5, 9, 0)

    // bb3 = createRectBody(3, 3, 8, 14-3-4);


    bb2.id="r1"
    // bb3 = createCircleBody(1, 6, 5)
    // bb3 = createCircleBody(1, 10, 7)
    // bb3 = createCircleBody(1.5, 15, 6)

}


function init() {

    world = new World({
        gravityY: gravity,
        allowSleep: allowSleep
    });
    world.init();
    world.solveIterations = solveIterations;
    world.collideManager.notSolve = notSolve;

    initRender();
    initGround();
    initBodies();


    function update() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        // console.log(bb1.velY, bb1.velY*timeStep,bb1.y)
        drawPoint(context, 8, 1);

        world.step(timeStep);

        var bodies = world.bodies;
        drawBodies(context,bodies);

        // drawArbiter(context,world.collideManager);
        
    };


    window.setInterval(update, 1000 / FPS);

};

function initRender() {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
}

Body.prototype.friction = friction;
Body.prototype.restitution = restitution;
Body.prototype.damping = damping;
Circle.prototype.friction = friction;
Circle.prototype.restitution = restitution;
Circle.prototype.damping = damping;
Polygon.prototype.friction = friction;
Polygon.prototype.restitution = restitution;
Polygon.prototype.damping = damping;