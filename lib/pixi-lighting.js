/*!
 * pixi-lighting - v2.0.3
 * Compiled Mon, 01 Apr 2019 04:17:06 UTC
 *
 * pixi-lighting is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.PIXI = global.PIXI || {}, global.PIXI.lighting = {})));
}(this, (function (exports) { 'use strict';

    /**
     * Contains mixins for the `PIXI.Circle` class.
     * @class Circle
     * @memberof PIXI
     * @see http://pixijs.download/release/docs/PIXI.Circle.html
     */
    /**
     * Creates vertices and indices arrays to describe this circle.
     * @method PIXI.Circle#getMesh
     * @param {number} [totalSegments=40] Total segments to build for the circle mesh.
     * @param {Float32Array} [verticesOutput] An array to output the vertices into. Length must be
     *  `((totalSegments + 2) * 2)` or more. If not passed it is created for you.
     * @param {Uint16Array} [indicesOutput] An array to output the indices into, in gl.TRIANGLE_FAN format. Length must
     *  be `(totalSegments + 3)` or more. If not passed it is created for you.
     * @return {PIXI.Circle~MeshData} Object with verticies and indices arrays
     */
    PIXI.Circle.prototype.getMesh = function getMesh(totalSegments, verticesOutput, indicesOutput)
    {
        var this$1 = this;
        if ( totalSegments === void 0 ) totalSegments = 40;

        verticesOutput = verticesOutput || new Float32Array((totalSegments + 1) * 2);
        indicesOutput = indicesOutput || new Uint16Array(totalSegments + 1);

        var seg = (Math.PI * 2) / totalSegments;
        var indicesIndex = -1;

        indicesOutput[++indicesIndex] = indicesIndex;

        for (var i = 0; i <= totalSegments; ++i)
        {
            var index = i * 2;
            var angle = seg * i;

            verticesOutput[index] = Math.cos(angle) * this$1.radius;
            verticesOutput[index + 1] = Math.sin(angle) * this$1.radius;

            indicesOutput[++indicesIndex] = indicesIndex;
        }

        indicesOutput[indicesIndex] = 1;

        return { verticesOutput: verticesOutput, indicesOutput: indicesOutput };
    };

    /**
     * @typedef PIXI.Circle~MeshData
     * @property {Float32Array} vertices - Vertices data
     * @property {Uint16Array} indices - Indices data
     */

    var utils = PIXI.utils;
    var Shader = PIXI.Shader;
    var BLEND_MODES = PIXI.BLEND_MODES;

    var Light = function Light(options)
    {
        options = options || {};

        // this.height = options.height || 0.45;
        this.position = options.position || {
            x: 0,
            y: 0,
        };

        if (!('z' in this.position))
        {
            this.position.z = 10;
        }

        this.position.set = function (x, y, z)
        {
            this.x = x;
            this.y = y;
            this.z = z !== undefined ? z : this.z;
        };
        this.positionArray = new Float32Array(3);

        // x + y * D + z * D * D
        this.falloff = new Float32Array(options.falloff || [0.75, 3, 20]);

        // color and brightness are exposed through setters
        this.colorArray = new Float32Array([0, 0, 0]);
        this._color = 0x555555;
        this._brightness = 1;
        this._colorRgb = new Float32Array([0.33, 0.33, 0.33]);

        // run the color setter
        if ('color' in options)
        {
            this.color = options.color;
        }

        // run the brightness setter
        if ('brightness' in options)
        {
            this.brightness = options.brightness;
        }

        // Default false for the SpriteIlluminator.
        // If use Photoshop , set to true.
        this.invertRed = false;
        if ('invertRed' in options)
        {
            this.invertRed = options.invertRed;
        }

        this.invertGreen = false;
        if ('invertGreen' in options)
        {
            this.invertGreen = options.invertGreen;
        }

        this.precision = 'lowp';
        if ('precision' in options)
        {
            this.precision = options.precision;
        }

        this.blendMode = BLEND_MODES.ADD;

        // TODO : disable Light
        this.visible = false;

        this.shaderName = null;
        this.needsUpdate = true;

        this.inited = false;
    };

    var prototypeAccessors = { color: { configurable: true },brightness: { configurable: true } };

    Light.prototype.init = function init (renderer, force)
    {
        if (!this.inited || force)
        {
            var gl = renderer.gl;

            this.viewSize = new Float32Array([renderer.width, renderer.height]);
            this.shader = this.generateShader(gl);
            this.inited = true;
        }
    };

    Light.prototype.generateShader = function generateShader (gl)
    {
        var vertexSrc = this.getVertexSource();
        var fragmentSrc = this.getFragmentSource();

        // Default Red hasn't flipped. invertRed means DO flipped.
        if (this.invertRed)
        {
            var invertR = 'normalColor.r = 1.0 - normalColor.r;';

            fragmentSrc = fragmentSrc.replace('// ' + invertR, invertR);
        }

        // Default Green has flipped. invertGreen means DON'T flipped.
        if (this.invertGreen)
        {
            var invertG = 'normalColor.g = 1.0 - normalColor.g;';

            fragmentSrc = fragmentSrc.replace(invertG, '// ' + invertG);
        }

        var id = vertexSrc + '@' + fragmentSrc;
        var shader = Light.shaderCache[id];

        if (!shader)
        {
            Light.shaderCache[id] = shader;
            shader = new Shader(gl, vertexSrc, fragmentSrc, Light.locationMapping, this.precision);
        }

        return shader;
    };

    Light.prototype.getVertexSource = function getVertexSource ()
    {
        // TODO
    };

    Light.prototype.getFragmentSource = function getFragmentSource ()
    {
        // TODO
    };

    Light.prototype.updateColor = function updateColor ()
    {
        var arr = this.colorArray;
        var rgb = this._colorRgb;
        var b = this._brightness;

        arr[0] = rgb[0] * b;
        arr[1] = rgb[1] * b;
        arr[2] = rgb[2] * b;
    };

    Light.prototype.syncShader = function syncShader ()
    {
        var shader = this.shader;

        shader.uniforms.uViewSize = this.viewSize;
        shader.uniforms.uLightColor = this.colorArray;
        shader.uniforms.uLightFalloff = this.falloff;
    };

    prototypeAccessors.color.get = function ()
    {
        return this._color;
    };

    prototypeAccessors.color.set = function (val)
    {
        this._color = val;
        utils.hex2rgb(val || 0, this._colorRgb);
        this.updateColor();
    };

    prototypeAccessors.brightness.get = function ()
    {
        return this._brightness;
    };

    prototypeAccessors.brightness.set = function (val)
    {
        this._brightness = val;
        this.updateColor();
    };

    Object.defineProperties( Light.prototype, prototypeAccessors );

    Light.shaderCache = {};
    Light.locationMapping = {
        aVertexPosition: 0,
        aTextureCoord: 1,
        aNormalTextureCoord: 2,
    };

    var utils$1 = PIXI.utils;
    var BLEND_MODES$1 = PIXI.BLEND_MODES;

    var LightWithAmbient = (function (Light$$1) {
        function LightWithAmbient(options)
        {
            options = options || {};

            Light$$1.call(this, options);

            this.blendMode = BLEND_MODES$1.ADD;

            this.ambientColorArray = new Float32Array([0, 0, 0]);

            this._ambientColorRgb = new Float32Array([0, 0, 0]);
            this._ambientColor = null;
            this._ambientBrightness = 1;

            if ('ambientColor' in options)
            {
                this.ambientColor = options.ambientColor;
            }

            if ('ambientBrightness' in options)
            {
                this.ambientBrightness = options.ambientBrightness;
            }
        }

        if ( Light$$1 ) LightWithAmbient.__proto__ = Light$$1;
        LightWithAmbient.prototype = Object.create( Light$$1 && Light$$1.prototype );
        LightWithAmbient.prototype.constructor = LightWithAmbient;

        var prototypeAccessors = { ambientColor: { configurable: true },ambientBrightness: { configurable: true } };

        LightWithAmbient.prototype.updateAmbientColor = function updateAmbientColor ()
        {
            var arr = this.ambientColorArray;
            var rgb = this._ambientColorRgb;
            var b = this._ambientBrightness;

            arr[0] = rgb[0] * b;
            arr[1] = rgb[1] * b;
            arr[2] = rgb[2] * b;
        };

        LightWithAmbient.prototype.syncShader = function syncShader ()
        {
            var shader = this.shader;

            shader.uniforms.uViewSize = this.viewSize;
            shader.uniforms.uLightColor = this.colorArray;
            shader.uniforms.uLightFalloff = this.falloff;
            shader.uniforms.uAmbientColor = this.ambientColorArray;
        };

        prototypeAccessors.ambientColor.get = function ()
        {
            return this._ambientColor;
        };

        prototypeAccessors.ambientColor.set = function (val)
        {
            this._ambientColor = val;
            utils$1.hex2rgb(val || 0, this._ambientColorRgb);
            this.updateAmbientColor();
            if (val === null)
            {
                this.blendMode = BLEND_MODES$1.ADD;
            }
            else
            {
                this.blendMode = BLEND_MODES$1.NORMAL;
            }
        };

        prototypeAccessors.ambientBrightness.get = function ()
        {
            return this._ambientBrightness;
        };

        prototypeAccessors.ambientBrightness.set = function (val)
        {
            this._ambientBrightness = val;
            this.updateAmbientColor();
        };

        Object.defineProperties( LightWithAmbient.prototype, prototypeAccessors );

        return LightWithAmbient;
    }(Light));

    var commonHead = "\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aNormalTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vNormalTextureCoord;\n\n";

    var vertex = ("\n\n" + commonHead + "\n\nvoid main(void) {\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vNormalTextureCoord = aNormalTextureCoord;\n}\n\n");

    var commonHead$1 = "\n\nuniform sampler2D uSampler;\nuniform sampler2D uNormalSampler;\n\n// light color, has multiplied bright for intensity.\nuniform vec3 uLightColor;\n\n// light attenuation coefficients (constant, linear, quadratic)\nuniform vec3 uLightFalloff;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vNormalTextureCoord;\n\nuniform vec2 uViewSize;\n\nuniform mat3 uWorldMatrix;\nuniform bool uFixedNormal;\n\n";

    var loadDiffuse = "\n\nvec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n\n// bail out early when diffuse has no data\nif (diffuseColor.a == 0.0) {\n   discard;\n}\n\n";

    var loadNormal = "\n\nvec4 normalColor = texture2D(uNormalSampler, vNormalTextureCoord);\n\n// Red layer is X coords.\n// normalColor.r = 1.0 - normalColor.r;\n\n// Green layer is flipped Y coords.\nnormalColor.g = 1.0 - normalColor.g;\n\n";

    var computeNormal = "\n\n// normalize vectors\nvec3 normal3 = vec3(normalColor.xyz * 2.0 - 1.0);\nvec3 N = normalize(\n        uFixedNormal ?\n            normal3 :\n            vec3((uWorldMatrix * vec3(normal3.xy, 0.0)).xy , normal3.z)\n    );\n\n";

    var fragment = ("\n\n" + commonHead$1 + "\n\nvoid main(void)\n{\n\n" + loadDiffuse + "\n" + loadNormal + "\n\n    uViewSize;\n\n    // simplified lambert shading that makes assumptions for ambient color\n\n    // compute Distance\n    float D = 1.0;\n\n" + computeNormal + "\n\n    vec3 L = vec3(1.0, 1.0, 1.0);\n\n    // pre-multiply light color with intensity\n    // then perform \"N dot L\" to determine our diffuse\n    vec3 diffuse = uLightColor * max(dot(N, L), 0.0);\n\n    vec3 finalColor = diffuseColor.rgb * diffuse;\n\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n\n");

    var BLEND_MODES$2 = PIXI.BLEND_MODES;

    var AmbientLight = (function (Light$$1) {
        function AmbientLight(options)
        {
            options = options || {};

            Light$$1.call(this, options);

            this.position.x = 0;
            this.position.y = 0;
            this.position.z = 0;

            // x + y * D + z * D * D
            this.falloff = new Float32Array([1, 0, 0]);

            this.blendMode = BLEND_MODES$2.NORMAL;

            this.shaderName = 'ambientLightShader';
        }

        if ( Light$$1 ) AmbientLight.__proto__ = Light$$1;
        AmbientLight.prototype = Object.create( Light$$1 && Light$$1.prototype );
        AmbientLight.prototype.constructor = AmbientLight;

        AmbientLight.prototype.getVertexSource = function getVertexSource ()
        {
            return vertex;
        };

        AmbientLight.prototype.getFragmentSource = function getFragmentSource ()
        {
            return fragment;
        };

        return AmbientLight;
    }(Light));

    var vertex$1 = ("\n\n" + commonHead + "\n\nvoid main(void) {\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vNormalTextureCoord = aNormalTextureCoord;\n}\n\n");

    var fragment$1 = ("\n\n// imports the common uniforms like samplers, and ambient/light color\n" + commonHead$1 + "\n\nuniform vec3 uAmbientColor;\nuniform vec3 uLightDirection;\n\nvoid main()\n{\n\n" + loadDiffuse + "\n" + loadNormal + "\n\n    // the directional vector of the light\n    vec3 lightVector = uLightDirection;\n\n    // correct for aspect ratio\n    lightVector.y *= uViewSize.y / uViewSize.x;\n\n    // compute Distance\n    // float D = length(lightVector);\n\n" + computeNormal + "\n\n    vec3 L = normalize(lightVector);\n\n    // pre-multiply light color with intensity\n    // then perform \"N dot L\" to determine our diffuse\n    vec3 diffuse = uLightColor * max(dot(N, L), 0.0);\n\n    // calculate attenuation\n    float attenuation = 1.0;\n\n    // calculate final intesity and color, then combine\n    vec3 intensity = uAmbientColor + diffuse * attenuation;\n\n    vec3 finalColor = diffuseColor.rgb * intensity;\n\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n\n");

    var DirectionalLight = (function (LightWithAmbient$$1) {
        function DirectionalLight(options)
        {
            options = options || {};

            LightWithAmbient$$1.call(this, options);

            this.target = options.target || {
                x: 0,
                y: 0,
            };

            if (!('z' in this.target))
            {
                this.target.z = 10;
            }

            this.directionArray = new Float32Array(3);
            this.updateDirection();

            this.shaderName = 'directionalLightShader';
        }

        if ( LightWithAmbient$$1 ) DirectionalLight.__proto__ = LightWithAmbient$$1;
        DirectionalLight.prototype = Object.create( LightWithAmbient$$1 && LightWithAmbient$$1.prototype );
        DirectionalLight.prototype.constructor = DirectionalLight;

        DirectionalLight.prototype.getVertexSource = function getVertexSource ()
        {
            return vertex$1;
        };

        DirectionalLight.prototype.getFragmentSource = function getFragmentSource ()
        {
            return fragment$1;
        };

        DirectionalLight.prototype.updateDirection = function updateDirection ()
        {
            var arr = this.directionArray;
            var tx = this.target.x;
            var ty = this.target.y;
            var tz = this.target.z;

            arr[0] = this.position.x - tx;
            arr[1] = this.position.y - ty;
            arr[2] = this.position.z - tz;
        };

        DirectionalLight.prototype.syncShader = function syncShader (sprite)
        {
            LightWithAmbient$$1.prototype.syncShader.call(this, sprite);

            this.shader.uniforms.uLightDirection = this.directionArray;
        };

        return DirectionalLight;
    }(LightWithAmbient));

    var vertex$2 = ("\n\n" + commonHead + "\n\nvarying float flippedY;\n\nvoid main(void) {\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vNormalTextureCoord = aNormalTextureCoord;\n\n    flippedY = projectionMatrix[1][1] < 0.0 ? 1.0 : 0.0;\n}\n\n");

    var fragment$2 = ("\n\n// imports the common uniforms like samplers, and ambient color\n" + commonHead$1 + "\n\nvarying float flippedY;\n\nuniform vec3 uAmbientColor;\nuniform vec3 uLightPosition;\nuniform float uLightRadius;\n\nvoid main()\n{\n\n" + loadDiffuse + "\n" + loadNormal + "\n\n    vec2 fragCoord = gl_FragCoord.xy / uViewSize.xy;\n\n    // FBOs positions are flipped.\n    fragCoord.y = flippedY > 0.0 ? 1.0 - fragCoord.y : fragCoord.y;\n\n    vec3 lightPosition = uLightPosition / vec3(uViewSize, uViewSize.x);\n    float lightRadius = uLightRadius / uViewSize.x;\n\n    // the directional vector of the light\n    vec3 lightVector = vec3(lightPosition.xy - fragCoord, lightPosition.z);\n\n    // correct for aspect ratio\n    lightVector.y *= uViewSize.y / uViewSize.x;\n\n    // compute Distance\n    float D = length(lightVector);\n\n    vec3 intensity = uAmbientColor;\n    // bail out early when pixel outside of light sphere\n    if (D <= lightRadius) {\n\n" + computeNormal + "\n\n        // vec3 L = normalize(lightVector);\n        vec3 L = lightVector / D;\n\n        // pre-multiply light color with intensity\n        // then perform N dot L to determine our diffuse\n        vec3 diffuse = uLightColor * max(dot(N, L), 0.0);\n\n        // calculate attenuation\n        float attenuation = 1.0 / (uLightFalloff.x + (uLightFalloff.y * D) + (uLightFalloff.z * D * D));\n\n        // calculate final intesity and color, then combine\n        intensity += diffuse * attenuation;\n    }\n\n    // TODO : roughness\n    // TODO : finalColor = ambient + diffuse + specular\n\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n\n");

    var utils$2 = PIXI.utils;

    var PointLight = (function (LightWithAmbient$$1) {
        function PointLight(options)
        {
            options = options || {};

            LightWithAmbient$$1.call(this, options);

            this.radius = options.radius || Infinity;

            this.shaderName = 'pointLightShader';
        }

        if ( LightWithAmbient$$1 ) PointLight.__proto__ = LightWithAmbient$$1;
        PointLight.prototype = Object.create( LightWithAmbient$$1 && LightWithAmbient$$1.prototype );
        PointLight.prototype.constructor = PointLight;

        var prototypeAccessors = { ambientLightColor: { configurable: true },ambientLightBrightness: { configurable: true } };

        PointLight.prototype.getVertexSource = function getVertexSource ()
        {
            return vertex$2;
        };

        PointLight.prototype.getFragmentSource = function getFragmentSource ()
        {
            return fragment$2;
        };

        PointLight.prototype.syncShader = function syncShader (sprite)
        {
            LightWithAmbient$$1.prototype.syncShader.call(this, sprite);

            this.positionArray[0] = this.position.x + (sprite.lightOffsetX || 0);
            this.positionArray[1] = this.position.y + (sprite.lightOffsetY || 0);
            this.positionArray[2] = this.position.z + (sprite.lightOffsetZ || 0);
            this.shader.uniforms.uLightPosition = this.positionArray;

            this.shader.uniforms.uAmbientLightColor = this._ambientLightColorRgba;
            this.shader.uniforms.uLightRadius = this.radius;
        };

        prototypeAccessors.ambientLightColor.get = function ()
        {
            return this._ambientLightColor;
        };

        prototypeAccessors.ambientLightColor.set = function (val)
        {
            this._ambientLightColor = val;
            utils$2.hex2rgb(val, this._ambientColorRgba);
        };

        prototypeAccessors.ambientLightBrightness.get = function ()
        {
            return this._ambientLightColorRgba[3];
        };

        prototypeAccessors.ambientLightBrightness.set = function (val)
        {
            this._ambientLightColorRgba[3] = val;
        };

        Object.defineProperties( PointLight.prototype, prototypeAccessors );

        return PointLight;
    }(LightWithAmbient));

    /**
     * Generic Mask Stack data structure
     *
     * @memberof PIXI
     * @function createIndicesForQuads
     * @private
     * @param {number} size - Number of quads
     * @return {Uint16Array} indices
     */
    function createIndicesForQuads(size)
    {
        // the total number of indices in our array, there are 6 points per quad.

        var totalIndices = size * 6;

        var indices = new Uint16Array(totalIndices);

        // fill the indices with the quads to draw
        for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4)
        {
            indices[i + 0] = j + 0;
            indices[i + 1] = j + 1;
            indices[i + 2] = j + 2;
            indices[i + 3] = j + 0;
            indices[i + 4] = j + 2;
            indices[i + 5] = j + 3;
        }

        return indices;
    }

    var glCore = PIXI.glCore;

    /**
     * Helper class to create a quad
     *
     * @class
     * @memberof PIXI
     */
    var LightQuad = function LightQuad(gl, state)
    {
        var this$1 = this;

        /*
         * the current WebGL drawing context
         *
         * @member {WebGLRenderingContext}
         */
        this.gl = gl;

        /**
         * Number of values sent in the vertex buffer.
         * aVertexPosition(2), aTextureCoord(2), aNormalTextureCoord(2) = 6
         *
         * @member {number}
         */
        this.vertSize = 6;

        /**
         * The size of the vertex information in bytes.
         *
         * @member {number}
         */
        this.vertByteSize = this.vertSize * 4;

        /**
         * An array of vertices
         *
         * @member {Float32Array}
         */
        this.vertices = new Float32Array([
            -1, -1,
            1, -1,
            1, 1,
            -1, 1 ]);

        /**
         * The Uvs of the quad
         *
         * @member {Float32Array}
         */
        this.uvs = new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            0, 1,
            0, 0,
            1, 0,
            1, 1,
            0, 1 ]);

        this.interleaved = new Float32Array(8 * 3);

        for (var i = 0; i < 4; i++)
        {
            this$1.interleaved[i * 6] = this$1.vertices[i * 2];
            this$1.interleaved[i * 6 + 1] = this$1.vertices[i * 2 + 1];
            this$1.interleaved[i * 6 + 2] = this$1.uvs[i * 2];
            this$1.interleaved[i * 6 + 3] = this$1.uvs[i * 2 + 1];
            this$1.interleaved[i * 6 + 4] = this$1.uvs[i * 2 + 8];
            this$1.interleaved[i * 6 + 5] = this$1.uvs[i * 2 + 1 + 8];
        }

        /*
         * @member {Uint16Array} An array containing the indices of the vertices
         */
        this.indices = createIndicesForQuads(1);

        /*
         * @member {glCore.GLBuffer} The vertex buffer
         */
        this.vertexBuffer = glCore.GLBuffer.createVertexBuffer(gl, this.interleaved, gl.STATIC_DRAW);

        /*
         * @member {glCore.GLBuffer} The index buffer
         */
        this.indexBuffer = glCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW);

        /*
         * @member {glCore.VertexArrayObject} The index buffer
         */
        this.vao = new glCore.VertexArrayObject(gl, state);
    };

    /**
     * Initialises the vaos and uses the shader.
     *
     * @param {PIXI.Shader} shader - the shader to use
     */
    LightQuad.prototype.initVao = function initVao (shader)
    {
        /* eslint-disable max-len */

        this.vao.clear()
            .addIndex(this.indexBuffer)
            .addAttribute(this.vertexBuffer, shader.attributes.aVertexPosition, this.gl.FLOAT, false, this.vertByteSize, 0)
            .addAttribute(this.vertexBuffer, shader.attributes.aTextureCoord, this.gl.FLOAT, false, this.vertByteSize, 2 * 4)
            .addAttribute(this.vertexBuffer, shader.attributes.aNormalTextureCoord, this.gl.FLOAT, false, this.vertByteSize, 4 * 4);

        /* eslint-enable max-len */
    };

    /**
     * Maps two Rectangle to the quad.
     *
     * @param {PIXI.Rectangle} targetTextureFrame - the first rectangle
     * @param {PIXI.Rectangle} destinationFrame - the second rectangle
     * @return {PIXI.Quad} Returns itself.
     */
    LightQuad.prototype.map = function map (targetTextureFrame, destinationFrame)
    {
        var x = 0; // destinationFrame.x / targetTextureFrame.width;
        var y = 0; // destinationFrame.y / targetTextureFrame.height;

        this.uvs[0] = x;
        this.uvs[1] = y;

        this.uvs[2] = x + (destinationFrame.width / targetTextureFrame.width);
        this.uvs[3] = y;

        this.uvs[4] = x + (destinationFrame.width / targetTextureFrame.width);
        this.uvs[5] = y + (destinationFrame.height / targetTextureFrame.height);

        this.uvs[6] = x;
        this.uvs[7] = y + (destinationFrame.height / targetTextureFrame.height);

        x = destinationFrame.x;
        y = destinationFrame.y;

        this.vertices[0] = x;
        this.vertices[1] = y;

        this.vertices[2] = x + destinationFrame.width;
        this.vertices[3] = y;

        this.vertices[4] = x + destinationFrame.width;
        this.vertices[5] = y + destinationFrame.height;

        this.vertices[6] = x;
        this.vertices[7] = y + destinationFrame.height;

        return this;
    };

    /**
     * Binds the buffer and uploads the data
     *
     * @return {PIXI.Quad} Returns itself.
     */
    LightQuad.prototype.upload = function upload ()
    {
            var this$1 = this;

        for (var i = 0; i < 4; i++)
        {
            this$1.interleaved[i * 6] = this$1.vertices[i * 2];
            this$1.interleaved[i * 6 + 1] = this$1.vertices[i * 2 + 1];
            this$1.interleaved[i * 6 + 2] = this$1.uvs[i * 2];
            this$1.interleaved[i * 6 + 3] = this$1.uvs[i * 2 + 1];
            this$1.interleaved[i * 6 + 4] = this$1.uvs[i * 2 + 8];
            this$1.interleaved[i * 6 + 5] = this$1.uvs[i * 2 + 1 + 8];
        }

        this.vertexBuffer.upload(this.interleaved);

        return this;
    };

    /**
     * Removes this quad from WebGL
     */
    LightQuad.prototype.destroy = function destroy ()
    {
        var gl = this.gl;

        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.indexBuffer);
    };

    var Texture = PIXI.Texture;
    var WebGLRenderer = PIXI.WebGLRenderer;
    var ObjectRenderer = PIXI.ObjectRenderer;
    // const RenderTexture = PIXI.RenderTexture;

    var LightSpriteRenderer = (function (ObjectRenderer) {
        function LightSpriteRenderer () {
            ObjectRenderer.apply(this, arguments);
        }

        if ( ObjectRenderer ) LightSpriteRenderer.__proto__ = ObjectRenderer;
        LightSpriteRenderer.prototype = Object.create( ObjectRenderer && ObjectRenderer.prototype );
        LightSpriteRenderer.prototype.constructor = LightSpriteRenderer;

        LightSpriteRenderer.prototype.onContextChange = function onContextChange ()
        {
            this.gl = this.renderer.gl;
            this.quad = new LightQuad(this.gl, this.renderer.state.attribState);
            Light.shaderCache = {};
            this.contextChanged = true;
        };

        LightSpriteRenderer.prototype.render = function render (sprite)
        {
            var this$1 = this;

            if (!sprite._texture._uvs || !sprite.lights)
            {
                return;
            }

            var renderer = this.renderer;
            var gl = renderer.gl;

            var lights = sprite.lights;
            var lightCount = lights.length;

            var vertexData = sprite.computedGeometry ? sprite.computedGeometry.vertices : sprite.vertexData;
            var diffuseTexture = sprite.diffuseTexture ? sprite.diffuseTexture : sprite._texture;
            var normalTexture = sprite.normalTexture ? sprite.normalTexture : LightSpriteRenderer.defaultNormalTexture;

            var uWorldMatrix = sprite.worldTransform.toArray(true);

            var uvsData = diffuseTexture._uvs;
            var uvsDataNormal = normalTexture._uvs;

            var uSamplerLocation = renderer.bindTexture(diffuseTexture, 1, true);
            var uNormalSamplerLocation;

            if (diffuseTexture.baseTexture === normalTexture.baseTexture)
            {
                uNormalSamplerLocation = uSamplerLocation;
            }
            else
            {
                uNormalSamplerLocation = renderer.bindTexture(normalTexture, 2, true);
            }

            var lastShader = null;

            for (var i = 0; i < lightCount; i++)
            {
                var light = lights[i];

                light.init(renderer, this$1.contextChanged);

                var shader = light.shader;

                if (i === 0)
                {
                    var quad = this$1.quad;
                    var vertices = quad.vertices;
                    var uvs = quad.uvs;

                    renderer.bindVao(null);
                    quad.initVao(shader);

                    for (var i$1 = 0; i$1 < 8; i$1++)
                    {
                        vertices[i$1] = vertexData[i$1];
                    }

                    uvs[0] = uvsData.x0;
                    uvs[1] = uvsData.y0;
                    uvs[2] = uvsData.x1;
                    uvs[3] = uvsData.y1;
                    uvs[4] = uvsData.x2;
                    uvs[5] = uvsData.y2;
                    uvs[6] = uvsData.x3;
                    uvs[7] = uvsData.y3;
                    uvs[8] = uvsDataNormal.x0;
                    uvs[9] = uvsDataNormal.y0;
                    uvs[10] = uvsDataNormal.x1;
                    uvs[11] = uvsDataNormal.y1;
                    uvs[12] = uvsDataNormal.x2;
                    uvs[13] = uvsDataNormal.y2;
                    uvs[14] = uvsDataNormal.x3;
                    uvs[15] = uvsDataNormal.y3;
                    quad.upload();
                    renderer.bindVao(quad.vao);
                }

                if (lastShader !== shader)
                {
                    lastShader = shader;
                    renderer.bindShader(shader);
                }

                shader.uniforms.uSampler = uSamplerLocation;
                shader.uniforms.uNormalSampler = uNormalSamplerLocation;
                shader.uniforms.uWorldMatrix = uWorldMatrix;
                shader.uniforms.uFixedNormal = !!sprite.fixedNormal;

                light.syncShader(sprite);

                renderer.state.setBlendMode(light.blendMode);

                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            }

            this.contextChanged = false;
        };

        LightSpriteRenderer.prototype.destroy = function destroy ()
        {
            ObjectRenderer.prototype.destroy.call(this);
            // TODO
        };

        return LightSpriteRenderer;
    }(ObjectRenderer));

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = canvas.height = 10;
    context.fillStyle = '#8080FF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    LightSpriteRenderer.defaultNormalTexture = Texture.from(canvas);
    LightSpriteRenderer.pluginName = 'lightSprite';
    WebGLRenderer.registerPlugin(LightSpriteRenderer.pluginName, LightSpriteRenderer);

    var LightTarget = function LightTarget () {};

    LightTarget.applyTo = function applyTo (sprite)
    {
        /* eslint-disable camelcase */
        sprite._bak_pluginName_LightSprite = sprite.pluginName;
        sprite._bak__texture_LightSprite = sprite._texture;
        sprite._bak_diffuseTexture_LightSprite = sprite.diffuseTexture;
        sprite._bak__renderWebGL_LightSprite = sprite._renderWebGL;

        sprite.pluginName = LightSpriteRenderer.pluginName;
        sprite.diffuseTexture = sprite.diffuseTexture || sprite._texture;
        sprite._renderWebGL = LightTarget.__renderWebGL_Sprite;
        /* eslint-enable camelcase */
    };

    LightTarget.unapplyTo = function unapplyTo (sprite)
    {
        /* eslint-disable camelcase */
        if (sprite._bak__renderWebGL_LightSprite)
        {
            sprite.pluginName = sprite._bak_pluginName_LightSprite;
            sprite._texture = sprite._bak__texture_LightSprite;
            sprite.diffuseTexture = sprite._bak_diffuseTexture_LightSprite;
            sprite._renderWebGL = sprite._bak__renderWebGL_LightSprite;

            sprite._bak_pluginName_LightSprite = null;
            sprite._bak__texture_LightSprite = null;
            sprite._bak_diffuseTexture_LightSprite = null;
            sprite._bak__renderWebGL_LightSprite = null;
        }
        /* eslint-enable camelcase */
    };

    LightTarget.__renderWebGL_Sprite = function __renderWebGL_Sprite (renderer) // eslint-disable-line camelcase
    {
        var sprite = this;

        sprite.calculateVertices();

        if (renderer.renderingDiffuses)
        {
            // const originalTexture = sprite._texture;
            var diffuseTexture = sprite.diffuseTexture || sprite._texture;

            sprite._texture = diffuseTexture;

            renderer.setObjectRenderer(renderer.plugins.sprite);
            renderer.plugins.sprite.render(sprite);

            return;
        }

        if (renderer.renderingNormals)
        {
            // const originalTexture = sprite._texture;
            var normalTexture = sprite.normalTexture || LightSpriteRenderer.defaultNormalTexture;

            sprite._texture = normalTexture;

            renderer.setObjectRenderer(renderer.plugins.sprite);
            renderer.plugins.sprite.render(sprite);

            return;
        }

        renderer.setObjectRenderer(renderer.plugins.lightSprite);
        renderer.plugins.lightSprite.render(sprite);
    };

    // export * from './main';

    exports.Light = Light;
    exports.LightWithAmbient = LightWithAmbient;
    exports.AmbientLight = AmbientLight;
    exports.DirectionalLight = DirectionalLight;
    exports.PointLight = PointLight;
    exports.LightSpriteRenderer = LightSpriteRenderer;
    exports.LightTarget = LightTarget;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
