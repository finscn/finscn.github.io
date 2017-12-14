function createDisplay(particleCount) {

    var vertDisplay = `

precision mediump float;

uniform mat3 projectionMatrix;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

uniform vec2 uPosition;

uniform sampler2D uStatusOut0;
attribute vec2 aParticleIndex;

attribute vec2 aParticleFrameOffset;
uniform vec2 uParticleFrameSize;

void main(void){

    vec4 state;

    state = texture2D(uStatusOut0, aParticleIndex);
    vec2 position = state.xy;

    state = texture2D(uStatusOut0, vec2(aParticleIndex.x, aParticleIndex.y + 0.5));
    float cosR = cos(state.z);
    float sinR = sin(state.z);

    vec2 v = position + uPosition;

    v.x += aVertexPosition.x * cosR - aVertexPosition.y * sinR;
    v.y += aVertexPosition.x * sinR + aVertexPosition.y * cosR;

    gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

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

    return display;
}
