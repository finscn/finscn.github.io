function createStatus(particleCount) {
    var statusList = [];

    var vertPhysics = null;

    var fragPhysics = `

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uTextureIn;
uniform vec2 viewSize;
uniform float fboSize;
uniform float particleCount;

const float gravity = 0.75;

float rand(vec2 co)
{
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt = dot(co.xy ,vec2(a,b));
    float sn = mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main(void)
{
    // float x = gl_FragCoord.x - 0.5;
    // float y = gl_FragCoord.y - 0.5;
    // if (y * fboSize + x >= particleCount){
    //     discard;
    // }

    vec4 position = texture2D(uTextureIn, vTextureCoord);
    position.xy += position.zw;
    position.w += gravity;

    if(position.y > viewSize.y)
    {
        position.y = viewSize.y;
        position.w *= -0.85;

        if(position.w > -20.0)
        {
            position.w = rand(vTextureCoord) * -32.0;
        }
    }

    if(position.x > viewSize.x)
    {
        position.x = viewSize.x;
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
        fragPhysics
    );

    var fboSize = status.fboSize;

    var defaultData = new Float32Array(4 * fboSize * fboSize);
    var width = app.renderer.width;
    var height = app.renderer.height;

    for (var i = 0; i < defaultData.length; i += 4) {
        defaultData[i] = Math.random() * width; // initial x of bunny
        defaultData[i + 1] = Math.random() * -height * 2; // initial y of bunny
        defaultData[i + 2] = Math.random() * 10; // initial x speed of bunny
        defaultData[i + 3] = (Math.random() * 5) - 2.5; // initial y speed of bunny
    };

    status.fboBuffer = defaultData;

    statusList.push(status);

    /////////////////////////////

    var vertPhysics = null;
    var fragPhysics = `

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uTextureIn;

uniform float fboSize;
uniform float particleCount;

float rand(vec2 co)
{
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt = dot(co.xy ,vec2(a,b));
    float sn = mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main(void)
{
    // float x = gl_FragCoord.x - 0.5;
    // float y = gl_FragCoord.y - 0.5;
    // if (y * fboSize + x >= particleCount){
    //     discard;
    // }

    vec4 raotation = texture2D(uTextureIn, vTextureCoord);
    raotation.z += 0.1 + rand(vTextureCoord) * 0.1;

    raotation.z = mod(raotation.z, 3.1415926 * 2.0);

    raotation.x = cos(raotation.z);
    raotation.y = sin(raotation.z);

    gl_FragColor = raotation;
}

    `;

    var status = new PIXI.ShaderParticleStatus(
        vertPhysics,
        fragPhysics,
        512
    );

    statusList.push(status);

    return statusList;
}
