var collisionConfiguration
var dispatcher
var broadphase
var solver
var physicsWorld
var groundShape

var tmpTrans


function initPhysics() {

    // Physics configuration

    collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    broadphase = new Ammo.btDbvtBroadphase();
    solver = new Ammo.btSequentialImpulseConstraintSolver();
    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);

    physicsWorld.setGravity(new Ammo.btVector3(0, -6, 0));

    floorPos = new Ammo.btVector3(0, 0, 0)

    tmpTrans = new Ammo.btTransform();
}

function generateBlockPhysicsBody(threeObject, data) {

    const { sx, sy, sz, convexRadius } = data
    const { x, y, z, qx, qy, qz, qw } = data
    const { radius, width, height } = data

    var shape = new Ammo.btBoxShape(new Ammo.btVector3(sx, sy, sz));
    shape.setMargin(convexRadius);

    var localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(0, localInertia);
    var transform = new Ammo.btTransform();
    transform.setIdentity();
    var pos = threeObject.position;
    let rot = threeObject.quaternion;
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(rot.x, rot.y, rot.z, rot.w));
    var motionState = new Ammo.btDefaultMotionState(transform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody(rbInfo);

    body.setRestitution(restitution)

    physicsWorld.addRigidBody(body);

    return body
}

function generatePhysicsBody(threeObject, objectType, data) {
    let shape = null;
    const { sx, sy, sz, convexRadius } = data
    const { x, y, z, qx, qy, qz, qw } = data
    const { radius, width, height } = data

    const margin = convexRadius

    switch (objectType) {
        case 1: {
            shape = new Ammo.btSphereShape(radius);
            shape.setMargin(margin);
            break;
        }
        case 2: {
            shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
            shape.setMargin(margin);
            break;
        }
        case 3: {
            shape = new Ammo.btCylinderShape(new Ammo.btVector3(radius, height * 0.5, radius));
            shape.setMargin(margin);
            break;
        }
        case 4: {
            shape = new Ammo.btCapsuleShape(height * 0.5, radius, null);
            shape.setMargin(margin);
            break;
        }
    }


    var localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localInertia);
    var transform = new Ammo.btTransform();
    transform.setIdentity();
    var pos = threeObject.position;
    let rot = threeObject.quaternion;
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(rot.x, rot.y, rot.z, rot.w));
    var motionState = new Ammo.btDefaultMotionState(transform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody(rbInfo);

    body.setRestitution(restitution)

    physicsWorld.addRigidBody(body);

    return body
}


function updateDynamicObjects() {
    for (var i = 0, il = dynamicObjects.length; i < il; i++) {
        var objThree = dynamicObjects[i];
        var objPhys = objThree.userData.body;
        var ms = objPhys.getMotionState();
        if (ms) {
            ms.getWorldTransform(tmpTrans);
            var p = tmpTrans.getOrigin();
            var q = tmpTrans.getRotation();
            objThree.position.set(p.x(), p.y(), p.z());
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
    }
}

function updateFloor(deltaTime, dy) {
    if (floor && floor.position) {
        const body = floor.userData.body

        let ms = body.getMotionState();
        if (ms) {
            floorPos.setY(floorY + dy)

            // ms.getWorldTransform(tmpTrans);
            // tmpTrans.setOrigin(floorPos);
            // ms.setWorldTransform(tmpTrans);

            const worldTrans = body.getWorldTransform();
            worldTrans.setOrigin(floorPos);
            body.setWorldTransform(worldTrans);

            floor.position.set(0, floorY + dy, 0);
        }
    }
}


function updatePhysics(deltaTime) {
    deltaTime = Math.min(deltaTime, 1.0 / 30.0);
    var numSteps = deltaTime > 1.0 / 55.0 ? 2 : 1;
    physicsWorld.stepSimulation(deltaTime, numSteps);
    // physicsWorld.stepSimulation(1 / 60, 1);
}
