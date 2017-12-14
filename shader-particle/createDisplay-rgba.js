function createDisplay(particleCount) {

    var vertDisplay = `

precision mediump float;

uniform mat3 projectionMatrix;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

uniform vec2 uPosition;

uniform sampler2D uStatusOut0;
uniform sampler2D uStatusOut2;
attribute vec2 aParticleIndex;

attribute vec2 aParticleFrameOffset;
uniform vec2 uParticleFrameSize;

${encodeShader}

void main(void){

    vec4 state;

    vec4 psample = texture2D(uStatusOut0, aParticleIndex);
    vec2 position = vec2(decode(psample.rg, SCALE.x), decode(psample.ba, SCALE.x));

    vec4 rsample = texture2D(uStatusOut2, aParticleIndex);
    float rotation = decode(rsample.rg, 100.0);

    float cosR = cos(rotation);
    float sinR = sin(rotation);


    vec2 v = position + uPosition;

    v.x += aVertexPosition.x * cosR - aVertexPosition.y * sinR;
    v.y += aVertexPosition.x * sinR + aVertexPosition.y * cosR;

    gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    // vTextureCoord = aTextureCoord;

    // vTextureCoord = aParticleFrame.xy + aTextureCoord * aParticleFrame.zw;

    vTextureCoord = aParticleFrameOffset.xy + aTextureCoord * uParticleFrameSize.xy;
}

`;

    var fragDisplay = `

precision mediump float;

uniform sampler2D uSampler;
varying vec2 vTextureCoord;

uniform float uAlpha;
uniform float uColorMultiplier;
uniform vec3 uColorOffset;

void main(void){
  vec4 color = texture2D(uSampler, vTextureCoord) * uAlpha;
  color.rgb *= uColorMultiplier;
  color.rgb += uColorOffset * color.a;

  gl_FragColor = color;
}

`;
    // var vertDisplay = null;
    // var fragDisplay = null;

    var display = new PIXI.ShaderParticleDisplay(
        vertDisplay,
        fragDisplay
    );
    display.updateShader = function(renderer, particle) {
        this.shader.uniforms.SCALE = SCALE;
    };

    return display;
}
