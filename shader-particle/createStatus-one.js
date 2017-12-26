function createStatus(particleCount) {

    var initialData = new Float32Array(4 * fboWidth * fboHeight);
    var size = initialData.length;
    var halfSize = size / 2;

    for (var i = 0; i < halfSize; i += 4) {
        initialData[i] = Math.random() * width; // initial x of bunny
        initialData[i + 1] = Math.random() * -height * 2; // initial y of bunny
        initialData[i + 2] = Math.random() * 10; // initial x speed of bunny
        initialData[i + 3] = Math.random() * 5 - 2.5; // initial y speed of bunny
    };
    for (var i = halfSize; i < size; i += 4) {
        var r = Math.random() * 3.14 * 2;
        // initialRotation[i] = Math.cos(r);
        // initialRotation[i + 1] = Math.sin(r);
        initialData[i + 2] = r;
        initialData[i + 3] = 0;
    }

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
    float fboHeight = uFboSize.y;

    float x = gl_FragCoord.x - 0.5;
    float y = gl_FragCoord.y - 0.5;
    if (y < fboHeight * 0.5) {
        vec4 position = texture2D(uStatusIn, vTextureCoord);

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

        return;
    }

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
        initialData
    );

    statusList.push(status);

    return statusList;
}
