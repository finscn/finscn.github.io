function createStatus(particleCount) {

    var initialPosVec = new Float32Array(4 * fboWidth * fboHeight);
    var initialRotation = new Float32Array(4 * fboWidth * fboHeight);
    for (var i = 0; i < initialPosVec.length; i += 4) {
        initialPosVec[i] = Math.random() * width; // initial x of bunny
        initialPosVec[i + 1] = Math.random() * -height * 1.5; // initial y of bunny
        initialPosVec[i + 2] = Math.random() * 10; // initial x speed of bunny
        initialPosVec[i + 3] = Math.random() * 5 - 2.5; // initial y speed of bunny

        var r = Math.random() * 3.14 * 2;
        // initialRotation[i] = Math.cos(r);
        // initialRotation[i + 1] = Math.sin(r);
        initialRotation[i + 2] = r;
        initialRotation[i + 3] = 0;
    };

    // var initialPosVec = new Uint16Array(4 * fboWidth * fboHeight);
    // var initialRotation = new Uint16Array(4 * fboWidth * fboHeight);
    // for (var i = 0; i < initialPosVec.length; i += 4) {
    //     initialPosVec[i] = ShaderParticle.toHalfFloat(Math.random() * width); // initial x of bunny
    //     initialPosVec[i + 1] = ShaderParticle.toHalfFloat(Math.random() * -height * 2); // initial y of bunny
    //     initialPosVec[i + 2] = ShaderParticle.toHalfFloat(Math.random() * 10); // initial x speed of bunny
    //     initialPosVec[i + 3] = ShaderParticle.toHalfFloat(Math.random() * 5 - 2.5); // initial y speed of bunny

    //    var r = Math.random() * 3.14 * 2;
    //    initialRotation[i] = ShaderParticle.toHalfFloat(Math.cos(r));
    //    initialRotation[i + 1] = ShaderParticle.toHalfFloat(Math.sin(r));
    //    initialRotation[i + 2] = ShaderParticle.toHalfFloat(r);
    //   initialRotation[i + 3] = ShaderParticle.toHalfFloat(0);

    // };

    var statusList = [];

    var vertPhysics = null;

    var fragPhysics = `

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uStatusIn;
uniform vec2 uViewSize;
uniform vec2 uFboSize;
uniform float uParticleCount;
uniform float random;

const float gravity = 0.75;

void main(void)
{
    // float fboWidth = uFboSize.x;

    // float x = gl_FragCoord.x - 0.5;
    // float y = gl_FragCoord.y - 0.5;
    // if (y * fboWidth + x >= uParticleCount){
    //     discard;
    // }

    vec4 position = texture2D(uStatusIn, vTextureCoord);

    float x = vTextureCoord.x;
    float no = vTextureCoord.y + x / 512.0;

    position.xy += position.zw;
    position.w += gravity;

    if(position.y > uViewSize.y)
    {
        position.y = uViewSize.y;
        position.w = -25.0 + random * mod(position.x + position.y, 10.0);
    }

    if(position.x > uViewSize.x)
    {
        position.x = uViewSize.x;
        position.z *= -1.0;
    }
    else if(position.x < 0.0)
    {
        position.x = 0.0;
        position.z *= -1.0;
    }

    gl_FragColor = position;
}

`;

    var status = new PIXI.ShaderParticleStatus(
        vertPhysics,
        fragPhysics,
        initialPosVec
    );

    statusList.push(status);


    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////


    var vertPhysics = null;
    var fragPhysics = `

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uStatusIn;

uniform vec2 uFboSize;
uniform float uParticleCount;

void main(void)
{
    // float fboWidth = uFboSize.x;

    // float x = gl_FragCoord.x - 0.5;
    // float y = gl_FragCoord.y - 0.5;
    // if (y * fboWidth + x >= uParticleCount){
    //     discard;
    // }

    vec4 rotation = texture2D(uStatusIn, vTextureCoord);
    rotation.z += 0.02;
    rotation.z = mod(rotation.z, 3.1415926 * 2.0);

    // rotation.x = cos(rotation.z);
    // rotation.y = sin(rotation.z);

    gl_FragColor = rotation;
}

    `;

    var status = new PIXI.ShaderParticleStatus(
        vertPhysics,
        fragPhysics,
        initialRotation
    );
    // status.once = true;
    statusList.push(status);

    return statusList;
}
