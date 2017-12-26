function createStatus(particleCount) {

    var initialPos = new Uint8Array(4 * fboWidth * fboHeight);
    var initialVec = new Uint8Array(4 * fboWidth * fboHeight);
    var initialRotation = new Uint8Array(4 * fboWidth * fboHeight);
    for (var i = 0; i < initialPos.length; i += 4) {
        var posX = ShaderParticle.encode(Math.random() * width, scale[0]);
        var posY = ShaderParticle.encode(Math.random() * -height * 2, SCALE[0]);
        initialPos[i + 0] = posX[0];
        initialPos[i + 1] = posX[1];
        initialPos[i + 2] = posY[0];
        initialPos[i + 3] = posY[1];

        var vecX = ShaderParticle.encode(Math.random() * 10, SCALE[1]);
        var vecY = ShaderParticle.encode(Math.random() * 5 - 2.5, SCALE[1]);
        initialVec[i + 0] = vecX[0];
        initialVec[i + 1] = vecX[1];
        initialVec[i + 2] = vecY[0];
        initialVec[i + 3] = vecY[1];

        var r = ShaderParticle.encode(Math.random() * 314 * 2, 100.0);
        // var r = ShaderParticle.encode(0.0 * 314 * 2, 100.0);
        initialRotation[i + 0] = r[0];
        initialRotation[i + 1] = r[1];
        initialRotation[i + 2] = 0;
        initialRotation[i + 3] = 0;
    };

    var statusList = [];

    /////////////////////////////

    var vertPhysics = null;

    var fragPhysics = `

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uStatusIn;
uniform sampler2D vecTex;
uniform vec2 uViewSize;
uniform vec2 uFboSize;
uniform float uParticleCount;

${encodeShader}

float rand(vec2 co)
{
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt = dot(co.xy, vec2(a,b));
    float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
}

void main(void)
{
    vec4 psample = texture2D(uStatusIn, vTextureCoord);
    vec2 position = vec2(decode(psample.rg, SCALE.x), decode(psample.ba, SCALE.x));
    vec4 vsample = texture2D(vecTex, vTextureCoord);
    vec2 velocity = vec2(decode(vsample.rg, SCALE.y), decode(vsample.ba, SCALE.y));

    position.xy += velocity.xy;

    if(position.y > uViewSize.y)
    {
        position.y = uViewSize.y;
    }

    if(position.x > uViewSize.x)
    {
        position.x = uViewSize.x;
    }
    else if(position.x < 0.0)
    {
        position.x = 0.0;
    }

    gl_FragColor = vec4(encode(position.x, SCALE.x), encode(position.y, SCALE.x));
}

`;

    var status = new PIXI.ShaderParticleStatus(
        vertPhysics,
        fragPhysics,
        initialPos
    );
    status.updateShader = function(renderer, particle) {
        particle.statusList[1].renderTargetOut.texture.bind(1);
        this.shader.uniforms.vecTex = 1;
        this.shader.uniforms.SCALE = SCALE;
    };
    statusList.push(status);

    /////////////////////////////

    var vertPhysics = null;

    var fragPhysics = `

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uTextureIn;
uniform sampler2D posTex;
uniform vec2 uViewSize;
uniform vec2 uFboSize;
uniform float uParticleCount;
uniform float random;

const float gravity = 0.75;

${encodeShader}

void main(void)
{
    vec4 vsample = texture2D(uTextureIn, vTextureCoord);
    vec2 velocity = vec2(decode(vsample.rg, SCALE.y), decode(vsample.ba, SCALE.y));
    vec4 psample = texture2D(posTex, vTextureCoord);
    vec2 position = vec2(decode(psample.rg, SCALE.x), decode(psample.ba, SCALE.x));

    position.xy += velocity.xy;
    velocity.y += gravity;
    if(position.y > uViewSize.y)
    {
        velocity.y = -25.0 + random * mod(position.x + position.y, 10.0);
    }
    if(position.x > uViewSize.x)
    {
        velocity.x *= -1.0;
    }
    else if(position.x < 0.0)
    {
        velocity.x *= -1.0;
    }

    gl_FragColor = vec4(encode(velocity.x, SCALE.y), encode(velocity.y, SCALE.y));
}

`;

    var status = new PIXI.ShaderParticleStatus(
        vertPhysics,
        fragPhysics,
        initialVec
    );
    status.updateShader = function(renderer, particle) {
        particle.statusList[0].renderTargetOut.texture.bind(1);
        this.shader.uniforms.posTex = 1;
        this.shader.uniforms.SCALE = SCALE;
    };
    statusList.push(status);

    /////////////////////////////

    var vertPhysics = null;
    var fragPhysics = `

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uTextureIn;

uniform vec2 uFboSize;
uniform float uParticleCount;

${encodeShader}

void main(void)
{
    vec4 rsample = texture2D(uTextureIn, vTextureCoord);
    float rotation = decode(rsample.rg, 100.0);

    rotation += 0.5;
    rotation = mod(rotation, 3.1415926 * 2.0);

    gl_FragColor = vec4(encode(rotation, 100.0), 0.0, 1.0);
}

    `;

    var status = new PIXI.ShaderParticleStatus(
        vertPhysics,
        fragPhysics,
        initialRotation
    );
    status.updateShader = function(renderer, particle) {
        this.shader.uniforms.SCALE = SCALE;
    };
    statusList.push(status);

    return statusList;
}
