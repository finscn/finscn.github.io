function createDisplay(particleCount) {

    var vertDisplay = `

uniform mat3 projectionMatrix;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

uniform sampler2D stateTex0;
uniform sampler2D stateTex1;
attribute vec2 aParticleIndex;
attribute vec4 aParticleFrame;

uniform vec2 uPosition;

void main(void){

    vec4 state;

    state = texture2D(stateTex0, aParticleIndex);
    vec2 position = state.xy;

    state = texture2D(stateTex1, aParticleIndex);
    float cosR = state.x;
    float sinR = state.y;

    vec2 v = position + uPosition;

    v.x += aVertexPosition.x * cosR - aVertexPosition.y * sinR;
    v.y += aVertexPosition.x * sinR + aVertexPosition.y * cosR;

    gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    // vTextureCoord = aTextureCoord;
    vTextureCoord = aParticleFrame.xy + aTextureCoord * aParticleFrame.zw;
}

`;

    var fragDisplay = `

uniform sampler2D uTexture;
varying vec2 vTextureCoord;

uniform float uAlpha;
uniform float uColorMultiplier;
uniform vec3 uColorOffset;

void main(void){
  vec4 color = texture2D(uTexture, vTextureCoord) * uAlpha;
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
    display.useStatus = [0, 1];

    return display;
}
