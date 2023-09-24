// Physics variables
var Jolt
var jolt;
var settings;
var physicsSystem;
var bodyInterface;


function initPhysics() {

    // Initialize Jolt
    settings = new Jolt.JoltSettings();
    jolt = new Jolt.JoltInterface(settings);
    physicsSystem = jolt.GetPhysicsSystem();
    bodyInterface = physicsSystem.GetBodyInterface();

    physicsSystem.SetGravity(new Jolt.Vec3(0, -6, 0))

    floorPos = new Jolt.Vec3(0, 0, 0)
    floorQuat = new Jolt.Quat(0, 0, 0, 1)

}

function generateBlockPhysicsBody(threeObject, data) {

    const { sx, sy, sz, convexRadius } = data
    const { radius, height } = data
    const { x, y, z, qx, qy, qz, qw } = data

    var shape = new Jolt.BoxShape(new Jolt.Vec3(sx, sy, sz), convexRadius, null);
    var creationSettings = new Jolt.BodyCreationSettings(shape,
        new Jolt.Vec3(x, y, z),
        new Jolt.Quat(qx, qy, qz, qw),
        Jolt.Kinematic, Jolt.MOVING);

    creationSettings.mMassPropertiesOverride.mMass = 0;
    creationSettings.mRestitution = restitution;
    creationSettings.mFriction = friction;

    let body = bodyInterface.CreateBody(creationSettings);

    bodyInterface.AddBody(body.GetID(), Jolt.Activate);

    return body
}

function generatePhysicsBody(threeObject, objectType, data) {
    let shape = null;
    const { sx, sy, sz, convexRadius } = data
    const { radius, height } = data
    const { x, y, z, qx, qy, qz, qw } = data


    switch (objectType) {
        case 1: {
            shape = new Jolt.SphereShape(radius, null);
            break;
        }
        case 2: {
            shape = new Jolt.BoxShape(new Jolt.Vec3(sx * 0.5, sy * 0.5, sz * 0.5), convexRadius, null);
            break;
        }
        case 3: {
            shape = new Jolt.CylinderShape(height * 0.5, radius, convexRadius, null);
            break;
        }
        case 4: {
            shape = new Jolt.CapsuleShape(height * 0.5, radius, null);
            break;
        }
    }


    let pos = threeObject.position;
    let rot = threeObject.quaternion;
    let creationSettings = new Jolt.BodyCreationSettings(shape,
        new Jolt.Vec3(pos.x, pos.y, pos.z),
        new Jolt.Quat(rot.x, rot.y, rot.z, rot.w), Jolt.Dynamic, Jolt.MOVING);
    creationSettings.mMassPropertiesOverride.mMass = mass;
    creationSettings.mRestitution = restitution;
    creationSettings.mFriction = friction;

    let body = bodyInterface.CreateBody(creationSettings);

    bodyInterface.AddBody(body.GetID(), Jolt.Activate);

    return body
}



function updateDynamicObjects() {
    for (let i = 0, il = dynamicObjects.length; i < il; i++) {
        let objThree = dynamicObjects[i];
        let body = dynamicObjects[i].userData.body;
        var p = body.GetPosition();
        var q = body.GetRotation();
        objThree.position.set(p.GetX(), p.GetY(), p.GetZ());
        objThree.quaternion.set(q.GetX(), q.GetY(), q.GetZ(), q.GetW());
    }
}

function updateFloor(deltaTime, dy) {
    if (floor && floor.position) {
        const body = floor.userData.body
        floorPos.SetY(floorY + dy)
        // bodyInterface.SetPosition(body.GetID(), floorPos)
        bodyInterface.MoveKinematic(body.GetID(), floorPos, floorQuat, deltaTime)

        floor.position.set(0, floorY + dy, 0)
    }
}

function updatePhysics(deltaTime) {
    deltaTime = Math.min(deltaTime, 1.0 / 30.0);
    var numSteps = deltaTime > 1.0 / 55.0 ? 2 : 1;
    // jolt.Step(deltaTime, numSteps);
    jolt.Step(1 / 60, 1);
}

