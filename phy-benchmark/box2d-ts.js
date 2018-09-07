var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Common/b2Settings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function b2Assert(condition) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!condition) {
            throw new (Error.bind.apply(Error, __spread([void 0], args)))();
        }
    }
    exports.b2Assert = b2Assert;
    function b2Maybe(value, def) {
        return value !== undefined ? value : def;
    }
    exports.b2Maybe = b2Maybe;
    exports.b2_maxFloat = 1E+37;
    exports.b2_epsilon = 1E-5;
    exports.b2_epsilon_sq = (exports.b2_epsilon * exports.b2_epsilon);
    exports.b2_pi = 3.14159265359;
    exports.b2_maxManifoldPoints = 2;
    exports.b2_maxPolygonVertices = 8;
    exports.b2_aabbExtension = 0.1;
    exports.b2_aabbMultiplier = 2;
    exports.b2_linearSlop = 0.008;
    exports.b2_angularSlop = 2 / 180 * exports.b2_pi;
    exports.b2_polygonRadius = 2 * exports.b2_linearSlop;
    exports.b2_maxSubSteps = 8;
    exports.b2_maxTOIContacts = 32;
    exports.b2_velocityThreshold = 1;
    exports.b2_maxLinearCorrection = 0.2;
    exports.b2_maxAngularCorrection = 8 / 180 * exports.b2_pi;
    exports.b2_maxTranslation = 2;
    exports.b2_maxTranslationSquared = exports.b2_maxTranslation * exports.b2_maxTranslation;
    exports.b2_maxRotation = 0.5 * exports.b2_pi;
    exports.b2_maxRotationSquared = exports.b2_maxRotation * exports.b2_maxRotation;
    exports.b2_baumgarte = 0.2;
    exports.b2_toiBaumgarte = 0.75;
    exports.b2_invalidParticleIndex = -1;
    exports.b2_maxParticleIndex = 0x7FFFFFFF;
    exports.b2_particleStride = 0.75;
    exports.b2_minParticleWeight = 1.0;
    exports.b2_maxParticlePressure = 0.25;
    exports.b2_maxParticleForce = 0.5;
    exports.b2_maxTriadDistance = 2.0;
    exports.b2_maxTriadDistanceSquared = (exports.b2_maxTriadDistance * exports.b2_maxTriadDistance);
    exports.b2_minParticleSystemBufferCapacity = 256;
    exports.b2_barrierCollisionTime = 2.5;
    exports.b2_timeToSleep = 0.5;
    exports.b2_linearSleepTolerance = 0.01;
    exports.b2_angularSleepTolerance = 2 / 180 * exports.b2_pi;
    function b2Alloc(size) {
        return null;
    }
    exports.b2Alloc = b2Alloc;
    function b2Free(mem) {
    }
    exports.b2Free = b2Free;
    function b2Log(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    }
    exports.b2Log = b2Log;
    var b2Version = (function () {
        function b2Version(major, minor, revision) {
            if (major === void 0) { major = 0; }
            if (minor === void 0) { minor = 0; }
            if (revision === void 0) { revision = 0; }
            this.major = 0;
            this.minor = 0;
            this.revision = 0;
            this.major = major;
            this.minor = minor;
            this.revision = revision;
        }
        b2Version.prototype.toString = function () {
            return this.major + "." + this.minor + "." + this.revision;
        };
        return b2Version;
    }());
    exports.b2Version = b2Version;
    exports.b2_version = new b2Version(2, 3, 2);
    exports.b2_changelist = 313;
    function b2ParseInt(v) {
        return parseInt(v, 10);
    }
    exports.b2ParseInt = b2ParseInt;
    function b2ParseUInt(v) {
        return Math.abs(parseInt(v, 10));
    }
    exports.b2ParseUInt = b2ParseUInt;
    function b2MakeArray(length, init) {
        var a = [];
        for (var i = 0; i < length; ++i) {
            a.push(init(i));
        }
        return a;
    }
    exports.b2MakeArray = b2MakeArray;
    function b2MakeNullArray(length) {
        var a = [];
        for (var i = 0; i < length; ++i) {
            a.push(null);
        }
        return a;
    }
    exports.b2MakeNullArray = b2MakeNullArray;
    function b2MakeNumberArray(length, init) {
        if (init === void 0) { init = 0; }
        var a = [];
        for (var i = 0; i < length; ++i) {
            a.push(init);
        }
        return a;
    }
    exports.b2MakeNumberArray = b2MakeNumberArray;
});
define("Common/b2Math", ["require", "exports", "Common/b2Settings"], function (require, exports, b2Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b2_pi_over_180 = b2Settings_1.b2_pi / 180;
    exports.b2_180_over_pi = 180 / b2Settings_1.b2_pi;
    exports.b2_two_pi = 2 * b2Settings_1.b2_pi;
    exports.b2Abs = Math.abs;
    exports.b2Min = Math.min;
    exports.b2Max = Math.max;
    function b2Clamp(a, lo, hi) {
        return (a < lo) ? (lo) : ((a > hi) ? (hi) : (a));
    }
    exports.b2Clamp = b2Clamp;
    function b2Swap(a, b) {
        var tmp = a[0];
        a[0] = b[0];
        b[0] = tmp;
    }
    exports.b2Swap = b2Swap;
    exports.b2IsValid = isFinite;
    function b2Sq(n) {
        return n * n;
    }
    exports.b2Sq = b2Sq;
    function b2InvSqrt(n) {
        return 1 / Math.sqrt(n);
    }
    exports.b2InvSqrt = b2InvSqrt;
    exports.b2Sqrt = Math.sqrt;
    exports.b2Pow = Math.pow;
    function b2DegToRad(degrees) {
        return degrees * exports.b2_pi_over_180;
    }
    exports.b2DegToRad = b2DegToRad;
    function b2RadToDeg(radians) {
        return radians * exports.b2_180_over_pi;
    }
    exports.b2RadToDeg = b2RadToDeg;
    exports.b2Cos = Math.cos;
    exports.b2Sin = Math.sin;
    exports.b2Acos = Math.acos;
    exports.b2Asin = Math.asin;
    exports.b2Atan2 = Math.atan2;
    function b2NextPowerOfTwo(x) {
        x |= (x >> 1) & 0x7FFFFFFF;
        x |= (x >> 2) & 0x3FFFFFFF;
        x |= (x >> 4) & 0x0FFFFFFF;
        x |= (x >> 8) & 0x00FFFFFF;
        x |= (x >> 16) & 0x0000FFFF;
        return x + 1;
    }
    exports.b2NextPowerOfTwo = b2NextPowerOfTwo;
    function b2IsPowerOfTwo(x) {
        return x > 0 && (x & (x - 1)) === 0;
    }
    exports.b2IsPowerOfTwo = b2IsPowerOfTwo;
    function b2Random() {
        return Math.random() * 2 - 1;
    }
    exports.b2Random = b2Random;
    function b2RandomRange(lo, hi) {
        return (hi - lo) * Math.random() + lo;
    }
    exports.b2RandomRange = b2RandomRange;
    var b2Vec2 = (function () {
        function b2Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        b2Vec2.prototype.Clone = function () {
            return new b2Vec2(this.x, this.y);
        };
        b2Vec2.prototype.SetZero = function () {
            this.x = 0;
            this.y = 0;
            return this;
        };
        b2Vec2.prototype.Set = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        b2Vec2.prototype.Copy = function (other) {
            this.x = other.x;
            this.y = other.y;
            return this;
        };
        b2Vec2.prototype.SelfAdd = function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        b2Vec2.prototype.SelfAddXY = function (x, y) {
            this.x += x;
            this.y += y;
            return this;
        };
        b2Vec2.prototype.SelfSub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        b2Vec2.prototype.SelfSubXY = function (x, y) {
            this.x -= x;
            this.y -= y;
            return this;
        };
        b2Vec2.prototype.SelfMul = function (s) {
            this.x *= s;
            this.y *= s;
            return this;
        };
        b2Vec2.prototype.SelfMulAdd = function (s, v) {
            this.x += s * v.x;
            this.y += s * v.y;
            return this;
        };
        b2Vec2.prototype.SelfMulSub = function (s, v) {
            this.x -= s * v.x;
            this.y -= s * v.y;
            return this;
        };
        b2Vec2.prototype.Dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        b2Vec2.prototype.Cross = function (v) {
            return this.x * v.y - this.y * v.x;
        };
        b2Vec2.prototype.Length = function () {
            var x = this.x, y = this.y;
            return Math.sqrt(x * x + y * y);
        };
        b2Vec2.prototype.LengthSquared = function () {
            var x = this.x, y = this.y;
            return (x * x + y * y);
        };
        b2Vec2.prototype.Normalize = function () {
            var length = this.Length();
            if (length >= b2Settings_1.b2_epsilon) {
                var inv_length = 1 / length;
                this.x *= inv_length;
                this.y *= inv_length;
            }
            return length;
        };
        b2Vec2.prototype.SelfNormalize = function () {
            var length = this.Length();
            if (length >= b2Settings_1.b2_epsilon) {
                var inv_length = 1 / length;
                this.x *= inv_length;
                this.y *= inv_length;
            }
            return this;
        };
        b2Vec2.prototype.SelfRotate = function (radians) {
            var c = Math.cos(radians);
            var s = Math.sin(radians);
            var x = this.x;
            this.x = c * x - s * this.y;
            this.y = s * x + c * this.y;
            return this;
        };
        b2Vec2.prototype.IsValid = function () {
            return isFinite(this.x) && isFinite(this.y);
        };
        b2Vec2.prototype.SelfCrossVS = function (s) {
            var x = this.x;
            this.x = s * this.y;
            this.y = -s * x;
            return this;
        };
        b2Vec2.prototype.SelfCrossSV = function (s) {
            var x = this.x;
            this.x = -s * this.y;
            this.y = s * x;
            return this;
        };
        b2Vec2.prototype.SelfMinV = function (v) {
            this.x = exports.b2Min(this.x, v.x);
            this.y = exports.b2Min(this.y, v.y);
            return this;
        };
        b2Vec2.prototype.SelfMaxV = function (v) {
            this.x = exports.b2Max(this.x, v.x);
            this.y = exports.b2Max(this.y, v.y);
            return this;
        };
        b2Vec2.prototype.SelfAbs = function () {
            this.x = exports.b2Abs(this.x);
            this.y = exports.b2Abs(this.y);
            return this;
        };
        b2Vec2.prototype.SelfNeg = function () {
            this.x = (-this.x);
            this.y = (-this.y);
            return this;
        };
        b2Vec2.prototype.SelfSkew = function () {
            var x = this.x;
            this.x = -this.y;
            this.y = x;
            return this;
        };
        b2Vec2.MakeArray = function (length) {
            return b2Settings_1.b2MakeArray(length, function (i) { return new b2Vec2(); });
        };
        b2Vec2.AbsV = function (v, out) {
            out.x = exports.b2Abs(v.x);
            out.y = exports.b2Abs(v.y);
            return out;
        };
        b2Vec2.MinV = function (a, b, out) {
            out.x = exports.b2Min(a.x, b.x);
            out.y = exports.b2Min(a.y, b.y);
            return out;
        };
        b2Vec2.MaxV = function (a, b, out) {
            out.x = exports.b2Max(a.x, b.x);
            out.y = exports.b2Max(a.y, b.y);
            return out;
        };
        b2Vec2.ClampV = function (v, lo, hi, out) {
            out.x = b2Clamp(v.x, lo.x, hi.x);
            out.y = b2Clamp(v.y, lo.y, hi.y);
            return out;
        };
        b2Vec2.RotateV = function (v, radians, out) {
            var v_x = v.x, v_y = v.y;
            var c = Math.cos(radians);
            var s = Math.sin(radians);
            out.x = c * v_x - s * v_y;
            out.y = s * v_x + c * v_y;
            return out;
        };
        b2Vec2.DotVV = function (a, b) {
            return a.x * b.x + a.y * b.y;
        };
        b2Vec2.CrossVV = function (a, b) {
            return a.x * b.y - a.y * b.x;
        };
        b2Vec2.CrossVS = function (v, s, out) {
            var v_x = v.x;
            out.x = s * v.y;
            out.y = -s * v_x;
            return out;
        };
        b2Vec2.CrossVOne = function (v, out) {
            var v_x = v.x;
            out.x = v.y;
            out.y = -v_x;
            return out;
        };
        b2Vec2.CrossSV = function (s, v, out) {
            var v_x = v.x;
            out.x = -s * v.y;
            out.y = s * v_x;
            return out;
        };
        b2Vec2.CrossOneV = function (v, out) {
            var v_x = v.x;
            out.x = -v.y;
            out.y = v_x;
            return out;
        };
        b2Vec2.AddVV = function (a, b, out) {
            out.x = a.x + b.x;
            out.y = a.y + b.y;
            return out;
        };
        b2Vec2.SubVV = function (a, b, out) {
            out.x = a.x - b.x;
            out.y = a.y - b.y;
            return out;
        };
        b2Vec2.MulSV = function (s, v, out) {
            out.x = v.x * s;
            out.y = v.y * s;
            return out;
        };
        b2Vec2.MulVS = function (v, s, out) {
            out.x = v.x * s;
            out.y = v.y * s;
            return out;
        };
        b2Vec2.AddVMulSV = function (a, s, b, out) {
            out.x = a.x + (s * b.x);
            out.y = a.y + (s * b.y);
            return out;
        };
        b2Vec2.SubVMulSV = function (a, s, b, out) {
            out.x = a.x - (s * b.x);
            out.y = a.y - (s * b.y);
            return out;
        };
        b2Vec2.AddVCrossSV = function (a, s, v, out) {
            var v_x = v.x;
            out.x = a.x - (s * v.y);
            out.y = a.y + (s * v_x);
            return out;
        };
        b2Vec2.MidVV = function (a, b, out) {
            out.x = (a.x + b.x) * 0.5;
            out.y = (a.y + b.y) * 0.5;
            return out;
        };
        b2Vec2.ExtVV = function (a, b, out) {
            out.x = (b.x - a.x) * 0.5;
            out.y = (b.y - a.y) * 0.5;
            return out;
        };
        b2Vec2.IsEqualToV = function (a, b) {
            return a.x === b.x && a.y === b.y;
        };
        b2Vec2.DistanceVV = function (a, b) {
            var c_x = a.x - b.x;
            var c_y = a.y - b.y;
            return Math.sqrt(c_x * c_x + c_y * c_y);
        };
        b2Vec2.DistanceSquaredVV = function (a, b) {
            var c_x = a.x - b.x;
            var c_y = a.y - b.y;
            return (c_x * c_x + c_y * c_y);
        };
        b2Vec2.NegV = function (v, out) {
            out.x = -v.x;
            out.y = -v.y;
            return out;
        };
        b2Vec2.ZERO = new b2Vec2(0, 0);
        b2Vec2.UNITX = new b2Vec2(1, 0);
        b2Vec2.UNITY = new b2Vec2(0, 1);
        b2Vec2.s_t0 = new b2Vec2();
        b2Vec2.s_t1 = new b2Vec2();
        b2Vec2.s_t2 = new b2Vec2();
        b2Vec2.s_t3 = new b2Vec2();
        return b2Vec2;
    }());
    exports.b2Vec2 = b2Vec2;
    exports.b2Vec2_zero = new b2Vec2(0, 0);
    var b2Vec3 = (function () {
        function b2Vec3(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        b2Vec3.prototype.Clone = function () {
            return new b2Vec3(this.x, this.y, this.z);
        };
        b2Vec3.prototype.SetZero = function () {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            return this;
        };
        b2Vec3.prototype.SetXYZ = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        b2Vec3.prototype.Copy = function (other) {
            this.x = other.x;
            this.y = other.y;
            this.z = other.z;
            return this;
        };
        b2Vec3.prototype.SelfNeg = function () {
            this.x = (-this.x);
            this.y = (-this.y);
            this.z = (-this.z);
            return this;
        };
        b2Vec3.prototype.SelfAdd = function (v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        };
        b2Vec3.prototype.SelfAddXYZ = function (x, y, z) {
            this.x += x;
            this.y += y;
            this.z += z;
            return this;
        };
        b2Vec3.prototype.SelfSub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        };
        b2Vec3.prototype.SelfSubXYZ = function (x, y, z) {
            this.x -= x;
            this.y -= y;
            this.z -= z;
            return this;
        };
        b2Vec3.prototype.SelfMul = function (s) {
            this.x *= s;
            this.y *= s;
            this.z *= s;
            return this;
        };
        b2Vec3.DotV3V3 = function (a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        };
        b2Vec3.CrossV3V3 = function (a, b, out) {
            var a_x = a.x, a_y = a.y, a_z = a.z;
            var b_x = b.x, b_y = b.y, b_z = b.z;
            out.x = a_y * b_z - a_z * b_y;
            out.y = a_z * b_x - a_x * b_z;
            out.z = a_x * b_y - a_y * b_x;
            return out;
        };
        b2Vec3.ZERO = new b2Vec3(0, 0, 0);
        b2Vec3.s_t0 = new b2Vec3();
        return b2Vec3;
    }());
    exports.b2Vec3 = b2Vec3;
    var b2Mat22 = (function () {
        function b2Mat22() {
            this.ex = new b2Vec2(1, 0);
            this.ey = new b2Vec2(0, 1);
        }
        b2Mat22.prototype.Clone = function () {
            return new b2Mat22().Copy(this);
        };
        b2Mat22.FromVV = function (c1, c2) {
            return new b2Mat22().SetVV(c1, c2);
        };
        b2Mat22.FromSSSS = function (r1c1, r1c2, r2c1, r2c2) {
            return new b2Mat22().SetSSSS(r1c1, r1c2, r2c1, r2c2);
        };
        b2Mat22.FromAngle = function (radians) {
            return new b2Mat22().SetAngle(radians);
        };
        b2Mat22.prototype.SetSSSS = function (r1c1, r1c2, r2c1, r2c2) {
            this.ex.Set(r1c1, r2c1);
            this.ey.Set(r1c2, r2c2);
            return this;
        };
        b2Mat22.prototype.SetVV = function (c1, c2) {
            this.ex.Copy(c1);
            this.ey.Copy(c2);
            return this;
        };
        b2Mat22.prototype.SetAngle = function (radians) {
            var c = Math.cos(radians);
            var s = Math.sin(radians);
            this.ex.Set(c, s);
            this.ey.Set(-s, c);
            return this;
        };
        b2Mat22.prototype.Copy = function (other) {
            this.ex.Copy(other.ex);
            this.ey.Copy(other.ey);
            return this;
        };
        b2Mat22.prototype.SetIdentity = function () {
            this.ex.Set(1, 0);
            this.ey.Set(0, 1);
            return this;
        };
        b2Mat22.prototype.SetZero = function () {
            this.ex.SetZero();
            this.ey.SetZero();
            return this;
        };
        b2Mat22.prototype.GetAngle = function () {
            return Math.atan2(this.ex.y, this.ex.x);
        };
        b2Mat22.prototype.GetInverse = function (out) {
            var a = this.ex.x;
            var b = this.ey.x;
            var c = this.ex.y;
            var d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0) {
                det = 1 / det;
            }
            out.ex.x = det * d;
            out.ey.x = (-det * b);
            out.ex.y = (-det * c);
            out.ey.y = det * a;
            return out;
        };
        b2Mat22.prototype.Solve = function (b_x, b_y, out) {
            var a11 = this.ex.x, a12 = this.ey.x;
            var a21 = this.ex.y, a22 = this.ey.y;
            var det = a11 * a22 - a12 * a21;
            if (det !== 0) {
                det = 1 / det;
            }
            out.x = det * (a22 * b_x - a12 * b_y);
            out.y = det * (a11 * b_y - a21 * b_x);
            return out;
        };
        b2Mat22.prototype.SelfAbs = function () {
            this.ex.SelfAbs();
            this.ey.SelfAbs();
            return this;
        };
        b2Mat22.prototype.SelfInv = function () {
            this.GetInverse(this);
            return this;
        };
        b2Mat22.prototype.SelfAddM = function (M) {
            this.ex.SelfAdd(M.ex);
            this.ey.SelfAdd(M.ey);
            return this;
        };
        b2Mat22.prototype.SelfSubM = function (M) {
            this.ex.SelfSub(M.ex);
            this.ey.SelfSub(M.ey);
            return this;
        };
        b2Mat22.AbsM = function (M, out) {
            var M_ex = M.ex, M_ey = M.ey;
            out.ex.x = exports.b2Abs(M_ex.x);
            out.ex.y = exports.b2Abs(M_ex.y);
            out.ey.x = exports.b2Abs(M_ey.x);
            out.ey.y = exports.b2Abs(M_ey.y);
            return out;
        };
        b2Mat22.MulMV = function (M, v, out) {
            var M_ex = M.ex, M_ey = M.ey;
            var v_x = v.x, v_y = v.y;
            out.x = M_ex.x * v_x + M_ey.x * v_y;
            out.y = M_ex.y * v_x + M_ey.y * v_y;
            return out;
        };
        b2Mat22.MulTMV = function (M, v, out) {
            var M_ex = M.ex, M_ey = M.ey;
            var v_x = v.x, v_y = v.y;
            out.x = M_ex.x * v_x + M_ex.y * v_y;
            out.y = M_ey.x * v_x + M_ey.y * v_y;
            return out;
        };
        b2Mat22.AddMM = function (A, B, out) {
            var A_ex = A.ex, A_ey = A.ey;
            var B_ex = B.ex, B_ey = B.ey;
            out.ex.x = A_ex.x + B_ex.x;
            out.ex.y = A_ex.y + B_ex.y;
            out.ey.x = A_ey.x + B_ey.x;
            out.ey.y = A_ey.y + B_ey.y;
            return out;
        };
        b2Mat22.MulMM = function (A, B, out) {
            var A_ex_x = A.ex.x, A_ex_y = A.ex.y;
            var A_ey_x = A.ey.x, A_ey_y = A.ey.y;
            var B_ex_x = B.ex.x, B_ex_y = B.ex.y;
            var B_ey_x = B.ey.x, B_ey_y = B.ey.y;
            out.ex.x = A_ex_x * B_ex_x + A_ey_x * B_ex_y;
            out.ex.y = A_ex_y * B_ex_x + A_ey_y * B_ex_y;
            out.ey.x = A_ex_x * B_ey_x + A_ey_x * B_ey_y;
            out.ey.y = A_ex_y * B_ey_x + A_ey_y * B_ey_y;
            return out;
        };
        b2Mat22.MulTMM = function (A, B, out) {
            var A_ex_x = A.ex.x, A_ex_y = A.ex.y;
            var A_ey_x = A.ey.x, A_ey_y = A.ey.y;
            var B_ex_x = B.ex.x, B_ex_y = B.ex.y;
            var B_ey_x = B.ey.x, B_ey_y = B.ey.y;
            out.ex.x = A_ex_x * B_ex_x + A_ex_y * B_ex_y;
            out.ex.y = A_ey_x * B_ex_x + A_ey_y * B_ex_y;
            out.ey.x = A_ex_x * B_ey_x + A_ex_y * B_ey_y;
            out.ey.y = A_ey_x * B_ey_x + A_ey_y * B_ey_y;
            return out;
        };
        b2Mat22.IDENTITY = new b2Mat22();
        return b2Mat22;
    }());
    exports.b2Mat22 = b2Mat22;
    var b2Mat33 = (function () {
        function b2Mat33() {
            this.ex = new b2Vec3(1, 0, 0);
            this.ey = new b2Vec3(0, 1, 0);
            this.ez = new b2Vec3(0, 0, 1);
        }
        b2Mat33.prototype.Clone = function () {
            return new b2Mat33().Copy(this);
        };
        b2Mat33.prototype.SetVVV = function (c1, c2, c3) {
            this.ex.Copy(c1);
            this.ey.Copy(c2);
            this.ez.Copy(c3);
            return this;
        };
        b2Mat33.prototype.Copy = function (other) {
            this.ex.Copy(other.ex);
            this.ey.Copy(other.ey);
            this.ez.Copy(other.ez);
            return this;
        };
        b2Mat33.prototype.SetIdentity = function () {
            this.ex.SetXYZ(1, 0, 0);
            this.ey.SetXYZ(0, 1, 0);
            this.ez.SetXYZ(0, 0, 1);
            return this;
        };
        b2Mat33.prototype.SetZero = function () {
            this.ex.SetZero();
            this.ey.SetZero();
            this.ez.SetZero();
            return this;
        };
        b2Mat33.prototype.SelfAddM = function (M) {
            this.ex.SelfAdd(M.ex);
            this.ey.SelfAdd(M.ey);
            this.ez.SelfAdd(M.ez);
            return this;
        };
        b2Mat33.prototype.Solve33 = function (b_x, b_y, b_z, out) {
            var a11 = this.ex.x, a21 = this.ex.y, a31 = this.ex.z;
            var a12 = this.ey.x, a22 = this.ey.y, a32 = this.ey.z;
            var a13 = this.ez.x, a23 = this.ez.y, a33 = this.ez.z;
            var det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
            if (det !== 0) {
                det = 1 / det;
            }
            out.x = det * (b_x * (a22 * a33 - a32 * a23) + b_y * (a32 * a13 - a12 * a33) + b_z * (a12 * a23 - a22 * a13));
            out.y = det * (a11 * (b_y * a33 - b_z * a23) + a21 * (b_z * a13 - b_x * a33) + a31 * (b_x * a23 - b_y * a13));
            out.z = det * (a11 * (a22 * b_z - a32 * b_y) + a21 * (a32 * b_x - a12 * b_z) + a31 * (a12 * b_y - a22 * b_x));
            return out;
        };
        b2Mat33.prototype.Solve22 = function (b_x, b_y, out) {
            var a11 = this.ex.x, a12 = this.ey.x;
            var a21 = this.ex.y, a22 = this.ey.y;
            var det = a11 * a22 - a12 * a21;
            if (det !== 0) {
                det = 1 / det;
            }
            out.x = det * (a22 * b_x - a12 * b_y);
            out.y = det * (a11 * b_y - a21 * b_x);
            return out;
        };
        b2Mat33.prototype.GetInverse22 = function (M) {
            var a = this.ex.x, b = this.ey.x, c = this.ex.y, d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0) {
                det = 1 / det;
            }
            M.ex.x = det * d;
            M.ey.x = -det * b;
            M.ex.z = 0;
            M.ex.y = -det * c;
            M.ey.y = det * a;
            M.ey.z = 0;
            M.ez.x = 0;
            M.ez.y = 0;
            M.ez.z = 0;
        };
        b2Mat33.prototype.GetSymInverse33 = function (M) {
            var det = b2Vec3.DotV3V3(this.ex, b2Vec3.CrossV3V3(this.ey, this.ez, b2Vec3.s_t0));
            if (det !== 0) {
                det = 1 / det;
            }
            var a11 = this.ex.x, a12 = this.ey.x, a13 = this.ez.x;
            var a22 = this.ey.y, a23 = this.ez.y;
            var a33 = this.ez.z;
            M.ex.x = det * (a22 * a33 - a23 * a23);
            M.ex.y = det * (a13 * a23 - a12 * a33);
            M.ex.z = det * (a12 * a23 - a13 * a22);
            M.ey.x = M.ex.y;
            M.ey.y = det * (a11 * a33 - a13 * a13);
            M.ey.z = det * (a13 * a12 - a11 * a23);
            M.ez.x = M.ex.z;
            M.ez.y = M.ey.z;
            M.ez.z = det * (a11 * a22 - a12 * a12);
        };
        b2Mat33.MulM33V3 = function (A, v, out) {
            var v_x = v.x, v_y = v.y, v_z = v.z;
            out.x = A.ex.x * v_x + A.ey.x * v_y + A.ez.x * v_z;
            out.y = A.ex.y * v_x + A.ey.y * v_y + A.ez.y * v_z;
            out.z = A.ex.z * v_x + A.ey.z * v_y + A.ez.z * v_z;
            return out;
        };
        b2Mat33.MulM33XYZ = function (A, x, y, z, out) {
            out.x = A.ex.x * x + A.ey.x * y + A.ez.x * z;
            out.y = A.ex.y * x + A.ey.y * y + A.ez.y * z;
            out.z = A.ex.z * x + A.ey.z * y + A.ez.z * z;
            return out;
        };
        b2Mat33.MulM33V2 = function (A, v, out) {
            var v_x = v.x, v_y = v.y;
            out.x = A.ex.x * v_x + A.ey.x * v_y;
            out.y = A.ex.y * v_x + A.ey.y * v_y;
            return out;
        };
        b2Mat33.MulM33XY = function (A, x, y, out) {
            out.x = A.ex.x * x + A.ey.x * y;
            out.y = A.ex.y * x + A.ey.y * y;
            return out;
        };
        b2Mat33.IDENTITY = new b2Mat33();
        return b2Mat33;
    }());
    exports.b2Mat33 = b2Mat33;
    var b2Rot = (function () {
        function b2Rot(angle) {
            if (angle === void 0) { angle = 0; }
            this.s = 0;
            this.c = 1;
            if (angle) {
                this.s = Math.sin(angle);
                this.c = Math.cos(angle);
            }
        }
        b2Rot.prototype.Clone = function () {
            return new b2Rot().Copy(this);
        };
        b2Rot.prototype.Copy = function (other) {
            this.s = other.s;
            this.c = other.c;
            return this;
        };
        b2Rot.prototype.SetAngle = function (angle) {
            this.s = Math.sin(angle);
            this.c = Math.cos(angle);
            return this;
        };
        b2Rot.prototype.SetIdentity = function () {
            this.s = 0;
            this.c = 1;
            return this;
        };
        b2Rot.prototype.GetAngle = function () {
            return Math.atan2(this.s, this.c);
        };
        b2Rot.prototype.GetXAxis = function (out) {
            out.x = this.c;
            out.y = this.s;
            return out;
        };
        b2Rot.prototype.GetYAxis = function (out) {
            out.x = -this.s;
            out.y = this.c;
            return out;
        };
        b2Rot.MulRR = function (q, r, out) {
            var q_c = q.c, q_s = q.s;
            var r_c = r.c, r_s = r.s;
            out.s = q_s * r_c + q_c * r_s;
            out.c = q_c * r_c - q_s * r_s;
            return out;
        };
        b2Rot.MulTRR = function (q, r, out) {
            var q_c = q.c, q_s = q.s;
            var r_c = r.c, r_s = r.s;
            out.s = q_c * r_s - q_s * r_c;
            out.c = q_c * r_c + q_s * r_s;
            return out;
        };
        b2Rot.MulRV = function (q, v, out) {
            var q_c = q.c, q_s = q.s;
            var v_x = v.x, v_y = v.y;
            out.x = q_c * v_x - q_s * v_y;
            out.y = q_s * v_x + q_c * v_y;
            return out;
        };
        b2Rot.MulTRV = function (q, v, out) {
            var q_c = q.c, q_s = q.s;
            var v_x = v.x, v_y = v.y;
            out.x = q_c * v_x + q_s * v_y;
            out.y = -q_s * v_x + q_c * v_y;
            return out;
        };
        b2Rot.IDENTITY = new b2Rot();
        return b2Rot;
    }());
    exports.b2Rot = b2Rot;
    var b2Transform = (function () {
        function b2Transform() {
            this.p = new b2Vec2();
            this.q = new b2Rot();
        }
        b2Transform.prototype.Clone = function () {
            return new b2Transform().Copy(this);
        };
        b2Transform.prototype.Copy = function (other) {
            this.p.Copy(other.p);
            this.q.Copy(other.q);
            return this;
        };
        b2Transform.prototype.SetIdentity = function () {
            this.p.SetZero();
            this.q.SetIdentity();
            return this;
        };
        b2Transform.prototype.SetPositionRotation = function (position, q) {
            this.p.Copy(position);
            this.q.Copy(q);
            return this;
        };
        b2Transform.prototype.SetPositionAngle = function (pos, a) {
            this.p.Copy(pos);
            this.q.SetAngle(a);
            return this;
        };
        b2Transform.prototype.SetPosition = function (position) {
            this.p.Copy(position);
            return this;
        };
        b2Transform.prototype.SetPositionXY = function (x, y) {
            this.p.Set(x, y);
            return this;
        };
        b2Transform.prototype.SetRotation = function (rotation) {
            this.q.Copy(rotation);
            return this;
        };
        b2Transform.prototype.SetRotationAngle = function (radians) {
            this.q.SetAngle(radians);
            return this;
        };
        b2Transform.prototype.GetPosition = function () {
            return this.p;
        };
        b2Transform.prototype.GetRotation = function () {
            return this.q;
        };
        b2Transform.prototype.GetRotationAngle = function () {
            return this.q.GetAngle();
        };
        b2Transform.prototype.GetAngle = function () {
            return this.q.GetAngle();
        };
        b2Transform.MulXV = function (T, v, out) {
            var T_q_c = T.q.c, T_q_s = T.q.s;
            var v_x = v.x, v_y = v.y;
            out.x = (T_q_c * v_x - T_q_s * v_y) + T.p.x;
            out.y = (T_q_s * v_x + T_q_c * v_y) + T.p.y;
            return out;
        };
        b2Transform.MulTXV = function (T, v, out) {
            var T_q_c = T.q.c, T_q_s = T.q.s;
            var p_x = v.x - T.p.x;
            var p_y = v.y - T.p.y;
            out.x = (T_q_c * p_x + T_q_s * p_y);
            out.y = (-T_q_s * p_x + T_q_c * p_y);
            return out;
        };
        b2Transform.MulXX = function (A, B, out) {
            b2Rot.MulRR(A.q, B.q, out.q);
            b2Vec2.AddVV(b2Rot.MulRV(A.q, B.p, out.p), A.p, out.p);
            return out;
        };
        b2Transform.MulTXX = function (A, B, out) {
            b2Rot.MulTRR(A.q, B.q, out.q);
            b2Rot.MulTRV(A.q, b2Vec2.SubVV(B.p, A.p, out.p), out.p);
            return out;
        };
        b2Transform.IDENTITY = new b2Transform();
        return b2Transform;
    }());
    exports.b2Transform = b2Transform;
    var b2Sweep = (function () {
        function b2Sweep() {
            this.localCenter = new b2Vec2();
            this.c0 = new b2Vec2();
            this.c = new b2Vec2();
            this.a0 = 0;
            this.a = 0;
            this.alpha0 = 0;
        }
        b2Sweep.prototype.Clone = function () {
            return new b2Sweep().Copy(this);
        };
        b2Sweep.prototype.Copy = function (other) {
            this.localCenter.Copy(other.localCenter);
            this.c0.Copy(other.c0);
            this.c.Copy(other.c);
            this.a0 = other.a0;
            this.a = other.a;
            this.alpha0 = other.alpha0;
            return this;
        };
        b2Sweep.prototype.GetTransform = function (xf, beta) {
            var one_minus_beta = (1 - beta);
            xf.p.x = one_minus_beta * this.c0.x + beta * this.c.x;
            xf.p.y = one_minus_beta * this.c0.y + beta * this.c.y;
            var angle = one_minus_beta * this.a0 + beta * this.a;
            xf.q.SetAngle(angle);
            xf.p.SelfSub(b2Rot.MulRV(xf.q, this.localCenter, b2Vec2.s_t0));
            return xf;
        };
        b2Sweep.prototype.Advance = function (alpha) {
            var beta = (alpha - this.alpha0) / (1 - this.alpha0);
            var one_minus_beta = (1 - beta);
            this.c0.x = one_minus_beta * this.c0.x + beta * this.c.x;
            this.c0.y = one_minus_beta * this.c0.y + beta * this.c.y;
            this.a0 = one_minus_beta * this.a0 + beta * this.a;
            this.alpha0 = alpha;
        };
        b2Sweep.prototype.Normalize = function () {
            var d = exports.b2_two_pi * Math.floor(this.a0 / exports.b2_two_pi);
            this.a0 -= d;
            this.a -= d;
        };
        return b2Sweep;
    }());
    exports.b2Sweep = b2Sweep;
});
define("Common/b2Draw", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2Color = (function () {
        function b2Color(rr, gg, bb, aa) {
            if (rr === void 0) { rr = 0.5; }
            if (gg === void 0) { gg = 0.5; }
            if (bb === void 0) { bb = 0.5; }
            if (aa === void 0) { aa = 1.0; }
            this.r = rr;
            this.g = gg;
            this.b = bb;
            this.a = aa;
        }
        b2Color.prototype.Clone = function () {
            return new b2Color().Copy(this);
        };
        b2Color.prototype.Copy = function (other) {
            this.r = other.r;
            this.g = other.g;
            this.b = other.b;
            this.a = other.a;
            return this;
        };
        b2Color.prototype.IsEqual = function (color) {
            return (this.r === color.r) && (this.g === color.g) && (this.b === color.b) && (this.a === color.a);
        };
        b2Color.prototype.IsZero = function () {
            return (this.r === 0) && (this.g === 0) && (this.b === 0) && (this.a === 0);
        };
        b2Color.prototype.Set = function (r, g, b, a) {
            if (a === void 0) { a = this.a; }
            this.SetRGBA(r, g, b, a);
        };
        b2Color.prototype.SetByteRGB = function (r, g, b) {
            this.r = r / 0xff;
            this.g = g / 0xff;
            this.b = b / 0xff;
            return this;
        };
        b2Color.prototype.SetByteRGBA = function (r, g, b, a) {
            this.r = r / 0xff;
            this.g = g / 0xff;
            this.b = b / 0xff;
            this.a = a / 0xff;
            return this;
        };
        b2Color.prototype.SetRGB = function (rr, gg, bb) {
            this.r = rr;
            this.g = gg;
            this.b = bb;
            return this;
        };
        b2Color.prototype.SetRGBA = function (rr, gg, bb, aa) {
            this.r = rr;
            this.g = gg;
            this.b = bb;
            this.a = aa;
            return this;
        };
        b2Color.prototype.SelfAdd = function (color) {
            this.r += color.r;
            this.g += color.g;
            this.b += color.b;
            this.a += color.a;
            return this;
        };
        b2Color.prototype.Add = function (color, out) {
            out.r = this.r + color.r;
            out.g = this.g + color.g;
            out.b = this.b + color.b;
            out.a = this.a + color.a;
            return out;
        };
        b2Color.prototype.SelfSub = function (color) {
            this.r -= color.r;
            this.g -= color.g;
            this.b -= color.b;
            this.a -= color.a;
            return this;
        };
        b2Color.prototype.Sub = function (color, out) {
            out.r = this.r - color.r;
            out.g = this.g - color.g;
            out.b = this.b - color.b;
            out.a = this.a - color.a;
            return out;
        };
        b2Color.prototype.SelfMul = function (s) {
            this.r *= s;
            this.g *= s;
            this.b *= s;
            this.a *= s;
            return this;
        };
        b2Color.prototype.Mul = function (s, out) {
            out.r = this.r * s;
            out.g = this.g * s;
            out.b = this.b * s;
            out.a = this.a * s;
            return out;
        };
        b2Color.prototype.Mix = function (mixColor, strength) {
            b2Color.MixColors(this, mixColor, strength);
        };
        b2Color.MixColors = function (colorA, colorB, strength) {
            var dr = (strength * (colorB.r - colorA.r));
            var dg = (strength * (colorB.g - colorA.g));
            var db = (strength * (colorB.b - colorA.b));
            var da = (strength * (colorB.a - colorA.a));
            colorA.r += dr;
            colorA.g += dg;
            colorA.b += db;
            colorA.a += da;
            colorB.r -= dr;
            colorB.g -= dg;
            colorB.b -= db;
            colorB.a -= da;
        };
        b2Color.prototype.MakeStyleString = function (alpha) {
            if (alpha === void 0) { alpha = this.a; }
            return b2Color.MakeStyleString(this.r, this.g, this.b, alpha);
        };
        b2Color.MakeStyleString = function (r, g, b, a) {
            if (a === void 0) { a = 1.0; }
            r *= 255;
            g *= 255;
            b *= 255;
            if (a < 1) {
                return "rgba(" + r + "," + g + "," + b + "," + a + ")";
            }
            else {
                return "rgb(" + r + "," + g + "," + b + ")";
            }
        };
        b2Color.ZERO = new b2Color(0, 0, 0, 0);
        b2Color.RED = new b2Color(1, 0, 0);
        b2Color.GREEN = new b2Color(0, 1, 0);
        b2Color.BLUE = new b2Color(0, 0, 1);
        return b2Color;
    }());
    exports.b2Color = b2Color;
    var b2DrawFlags;
    (function (b2DrawFlags) {
        b2DrawFlags[b2DrawFlags["e_none"] = 0] = "e_none";
        b2DrawFlags[b2DrawFlags["e_shapeBit"] = 1] = "e_shapeBit";
        b2DrawFlags[b2DrawFlags["e_jointBit"] = 2] = "e_jointBit";
        b2DrawFlags[b2DrawFlags["e_aabbBit"] = 4] = "e_aabbBit";
        b2DrawFlags[b2DrawFlags["e_pairBit"] = 8] = "e_pairBit";
        b2DrawFlags[b2DrawFlags["e_centerOfMassBit"] = 16] = "e_centerOfMassBit";
        b2DrawFlags[b2DrawFlags["e_particleBit"] = 32] = "e_particleBit";
        b2DrawFlags[b2DrawFlags["e_controllerBit"] = 64] = "e_controllerBit";
        b2DrawFlags[b2DrawFlags["e_all"] = 63] = "e_all";
    })(b2DrawFlags = exports.b2DrawFlags || (exports.b2DrawFlags = {}));
    var b2Draw = (function () {
        function b2Draw() {
            this.m_drawFlags = 0;
        }
        b2Draw.prototype.SetFlags = function (flags) {
            this.m_drawFlags = flags;
        };
        b2Draw.prototype.GetFlags = function () {
            return this.m_drawFlags;
        };
        b2Draw.prototype.AppendFlags = function (flags) {
            this.m_drawFlags |= flags;
        };
        b2Draw.prototype.ClearFlags = function (flags) {
            this.m_drawFlags &= ~flags;
        };
        b2Draw.prototype.PushTransform = function (xf) { };
        b2Draw.prototype.PopTransform = function (xf) { };
        b2Draw.prototype.DrawPolygon = function (vertices, vertexCount, color) { };
        b2Draw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) { };
        b2Draw.prototype.DrawCircle = function (center, radius, color) { };
        b2Draw.prototype.DrawSolidCircle = function (center, radius, axis, color) { };
        b2Draw.prototype.DrawParticles = function (centers, radius, colors, count) { };
        b2Draw.prototype.DrawSegment = function (p1, p2, color) { };
        b2Draw.prototype.DrawTransform = function (xf) { };
        return b2Draw;
    }());
    exports.b2Draw = b2Draw;
});
define("Common/b2Timer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2Timer = (function () {
        function b2Timer() {
            this.m_start = Date.now();
        }
        b2Timer.prototype.Reset = function () {
            this.m_start = Date.now();
            return this;
        };
        b2Timer.prototype.GetMilliseconds = function () {
            return Date.now() - this.m_start;
        };
        return b2Timer;
    }());
    exports.b2Timer = b2Timer;
    var b2Counter = (function () {
        function b2Counter() {
            this.m_count = 0;
            this.m_min_count = 0;
            this.m_max_count = 0;
        }
        b2Counter.prototype.GetCount = function () {
            return this.m_count;
        };
        b2Counter.prototype.GetMinCount = function () {
            return this.m_min_count;
        };
        b2Counter.prototype.GetMaxCount = function () {
            return this.m_max_count;
        };
        b2Counter.prototype.ResetCount = function () {
            var count = this.m_count;
            this.m_count = 0;
            return count;
        };
        b2Counter.prototype.ResetMinCount = function () {
            this.m_min_count = 0;
        };
        b2Counter.prototype.ResetMaxCount = function () {
            this.m_max_count = 0;
        };
        b2Counter.prototype.Increment = function () {
            this.m_count++;
            if (this.m_max_count < this.m_count) {
                this.m_max_count = this.m_count;
            }
        };
        b2Counter.prototype.Decrement = function () {
            this.m_count--;
            if (this.m_min_count > this.m_count) {
                this.m_min_count = this.m_count;
            }
        };
        return b2Counter;
    }());
    exports.b2Counter = b2Counter;
});
define("Common/b2GrowableStack", ["require", "exports", "Common/b2Settings"], function (require, exports, b2Settings_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2GrowableStack = (function () {
        function b2GrowableStack(N) {
            this.m_stack = [];
            this.m_count = 0;
            this.m_stack = b2Settings_2.b2MakeArray(N, function (index) { return null; });
            this.m_count = 0;
        }
        b2GrowableStack.prototype.Reset = function () {
            this.m_count = 0;
            return this;
        };
        b2GrowableStack.prototype.Push = function (element) {
            this.m_stack[this.m_count] = element;
            this.m_count++;
        };
        b2GrowableStack.prototype.Pop = function () {
            this.m_count--;
            var element = this.m_stack[this.m_count];
            this.m_stack[this.m_count] = null;
            if (element === null) {
                throw new Error();
            }
            return element;
        };
        b2GrowableStack.prototype.GetCount = function () {
            return this.m_count;
        };
        return b2GrowableStack;
    }());
    exports.b2GrowableStack = b2GrowableStack;
});
define("Common/b2BlockAllocator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2BlockAllocator = (function () {
        function b2BlockAllocator() {
        }
        return b2BlockAllocator;
    }());
    exports.b2BlockAllocator = b2BlockAllocator;
});
define("Common/b2StackAllocator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2StackAllocator = (function () {
        function b2StackAllocator() {
        }
        return b2StackAllocator;
    }());
    exports.b2StackAllocator = b2StackAllocator;
});
define("Collision/b2Distance", ["require", "exports", "Common/b2Settings", "Common/b2Math"], function (require, exports, b2Settings_3, b2Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2DistanceProxy = (function () {
        function b2DistanceProxy() {
            this.m_buffer = b2Math_1.b2Vec2.MakeArray(2);
            this.m_vertices = this.m_buffer;
            this.m_count = 0;
            this.m_radius = 0;
        }
        b2DistanceProxy.prototype.Reset = function () {
            this.m_vertices = this.m_buffer;
            this.m_count = 0;
            this.m_radius = 0;
            return this;
        };
        b2DistanceProxy.prototype.SetShape = function (shape, index) {
            shape.SetupDistanceProxy(this, index);
        };
        b2DistanceProxy.prototype.GetSupport = function (d) {
            var bestIndex = 0;
            var bestValue = b2Math_1.b2Vec2.DotVV(this.m_vertices[0], d);
            for (var i = 1; i < this.m_count; ++i) {
                var value = b2Math_1.b2Vec2.DotVV(this.m_vertices[i], d);
                if (value > bestValue) {
                    bestIndex = i;
                    bestValue = value;
                }
            }
            return bestIndex;
        };
        b2DistanceProxy.prototype.GetSupportVertex = function (d) {
            var bestIndex = 0;
            var bestValue = b2Math_1.b2Vec2.DotVV(this.m_vertices[0], d);
            for (var i = 1; i < this.m_count; ++i) {
                var value = b2Math_1.b2Vec2.DotVV(this.m_vertices[i], d);
                if (value > bestValue) {
                    bestIndex = i;
                    bestValue = value;
                }
            }
            return this.m_vertices[bestIndex];
        };
        b2DistanceProxy.prototype.GetVertexCount = function () {
            return this.m_count;
        };
        b2DistanceProxy.prototype.GetVertex = function (index) {
            return this.m_vertices[index];
        };
        return b2DistanceProxy;
    }());
    exports.b2DistanceProxy = b2DistanceProxy;
    var b2SimplexCache = (function () {
        function b2SimplexCache() {
            this.metric = 0;
            this.count = 0;
            this.indexA = [0, 0, 0];
            this.indexB = [0, 0, 0];
        }
        b2SimplexCache.prototype.Reset = function () {
            this.metric = 0;
            this.count = 0;
            return this;
        };
        return b2SimplexCache;
    }());
    exports.b2SimplexCache = b2SimplexCache;
    var b2DistanceInput = (function () {
        function b2DistanceInput() {
            this.proxyA = new b2DistanceProxy();
            this.proxyB = new b2DistanceProxy();
            this.transformA = new b2Math_1.b2Transform();
            this.transformB = new b2Math_1.b2Transform();
            this.useRadii = false;
        }
        b2DistanceInput.prototype.Reset = function () {
            this.proxyA.Reset();
            this.proxyB.Reset();
            this.transformA.SetIdentity();
            this.transformB.SetIdentity();
            this.useRadii = false;
            return this;
        };
        return b2DistanceInput;
    }());
    exports.b2DistanceInput = b2DistanceInput;
    var b2DistanceOutput = (function () {
        function b2DistanceOutput() {
            this.pointA = new b2Math_1.b2Vec2();
            this.pointB = new b2Math_1.b2Vec2();
            this.distance = 0;
            this.iterations = 0;
        }
        b2DistanceOutput.prototype.Reset = function () {
            this.pointA.SetZero();
            this.pointB.SetZero();
            this.distance = 0;
            this.iterations = 0;
            return this;
        };
        return b2DistanceOutput;
    }());
    exports.b2DistanceOutput = b2DistanceOutput;
    exports.b2_gjkCalls = 0;
    exports.b2_gjkIters = 0;
    exports.b2_gjkMaxIters = 0;
    function b2_gjk_reset() {
        exports.b2_gjkCalls = 0;
        exports.b2_gjkIters = 0;
        exports.b2_gjkMaxIters = 0;
    }
    exports.b2_gjk_reset = b2_gjk_reset;
    var b2SimplexVertex = (function () {
        function b2SimplexVertex() {
            this.wA = new b2Math_1.b2Vec2();
            this.wB = new b2Math_1.b2Vec2();
            this.w = new b2Math_1.b2Vec2();
            this.a = 0;
            this.indexA = 0;
            this.indexB = 0;
        }
        b2SimplexVertex.prototype.Copy = function (other) {
            this.wA.Copy(other.wA);
            this.wB.Copy(other.wB);
            this.w.Copy(other.w);
            this.a = other.a;
            this.indexA = other.indexA;
            this.indexB = other.indexB;
            return this;
        };
        return b2SimplexVertex;
    }());
    exports.b2SimplexVertex = b2SimplexVertex;
    var b2Simplex = (function () {
        function b2Simplex() {
            this.m_v1 = new b2SimplexVertex();
            this.m_v2 = new b2SimplexVertex();
            this.m_v3 = new b2SimplexVertex();
            this.m_vertices = [];
            this.m_count = 0;
            this.m_vertices[0] = this.m_v1;
            this.m_vertices[1] = this.m_v2;
            this.m_vertices[2] = this.m_v3;
        }
        b2Simplex.prototype.ReadCache = function (cache, proxyA, transformA, proxyB, transformB) {
            this.m_count = cache.count;
            var vertices = this.m_vertices;
            for (var i = 0; i < this.m_count; ++i) {
                var v = vertices[i];
                v.indexA = cache.indexA[i];
                v.indexB = cache.indexB[i];
                var wALocal = proxyA.GetVertex(v.indexA);
                var wBLocal = proxyB.GetVertex(v.indexB);
                b2Math_1.b2Transform.MulXV(transformA, wALocal, v.wA);
                b2Math_1.b2Transform.MulXV(transformB, wBLocal, v.wB);
                b2Math_1.b2Vec2.SubVV(v.wB, v.wA, v.w);
                v.a = 0;
            }
            if (this.m_count > 1) {
                var metric1 = cache.metric;
                var metric2 = this.GetMetric();
                if (metric2 < 0.5 * metric1 || 2 * metric1 < metric2 || metric2 < b2Settings_3.b2_epsilon) {
                    this.m_count = 0;
                }
            }
            if (this.m_count === 0) {
                var v = vertices[0];
                v.indexA = 0;
                v.indexB = 0;
                var wALocal = proxyA.GetVertex(0);
                var wBLocal = proxyB.GetVertex(0);
                b2Math_1.b2Transform.MulXV(transformA, wALocal, v.wA);
                b2Math_1.b2Transform.MulXV(transformB, wBLocal, v.wB);
                b2Math_1.b2Vec2.SubVV(v.wB, v.wA, v.w);
                v.a = 1;
                this.m_count = 1;
            }
        };
        b2Simplex.prototype.WriteCache = function (cache) {
            cache.metric = this.GetMetric();
            cache.count = this.m_count;
            var vertices = this.m_vertices;
            for (var i = 0; i < this.m_count; ++i) {
                cache.indexA[i] = vertices[i].indexA;
                cache.indexB[i] = vertices[i].indexB;
            }
        };
        b2Simplex.prototype.GetSearchDirection = function (out) {
            switch (this.m_count) {
                case 1:
                    return b2Math_1.b2Vec2.NegV(this.m_v1.w, out);
                case 2: {
                    var e12 = b2Math_1.b2Vec2.SubVV(this.m_v2.w, this.m_v1.w, out);
                    var sgn = b2Math_1.b2Vec2.CrossVV(e12, b2Math_1.b2Vec2.NegV(this.m_v1.w, b2Math_1.b2Vec2.s_t0));
                    if (sgn > 0) {
                        return b2Math_1.b2Vec2.CrossOneV(e12, out);
                    }
                    else {
                        return b2Math_1.b2Vec2.CrossVOne(e12, out);
                    }
                }
                default:
                    return out.SetZero();
            }
        };
        b2Simplex.prototype.GetClosestPoint = function (out) {
            switch (this.m_count) {
                case 0:
                    return out.SetZero();
                case 1:
                    return out.Copy(this.m_v1.w);
                case 2:
                    return out.Set(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
                case 3:
                    return out.SetZero();
                default:
                    return out.SetZero();
            }
        };
        b2Simplex.prototype.GetWitnessPoints = function (pA, pB) {
            switch (this.m_count) {
                case 0:
                    break;
                case 1:
                    pA.Copy(this.m_v1.wA);
                    pB.Copy(this.m_v1.wB);
                    break;
                case 2:
                    pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
                    pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
                    pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
                    pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                    break;
                case 3:
                    pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
                    pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                    break;
                default:
                    break;
            }
        };
        b2Simplex.prototype.GetMetric = function () {
            switch (this.m_count) {
                case 0:
                    return 0;
                case 1:
                    return 0;
                case 2:
                    return b2Math_1.b2Vec2.DistanceVV(this.m_v1.w, this.m_v2.w);
                case 3:
                    return b2Math_1.b2Vec2.CrossVV(b2Math_1.b2Vec2.SubVV(this.m_v2.w, this.m_v1.w, b2Math_1.b2Vec2.s_t0), b2Math_1.b2Vec2.SubVV(this.m_v3.w, this.m_v1.w, b2Math_1.b2Vec2.s_t1));
                default:
                    return 0;
            }
        };
        b2Simplex.prototype.Solve2 = function () {
            var w1 = this.m_v1.w;
            var w2 = this.m_v2.w;
            var e12 = b2Math_1.b2Vec2.SubVV(w2, w1, b2Simplex.s_e12);
            var d12_2 = (-b2Math_1.b2Vec2.DotVV(w1, e12));
            if (d12_2 <= 0) {
                this.m_v1.a = 1;
                this.m_count = 1;
                return;
            }
            var d12_1 = b2Math_1.b2Vec2.DotVV(w2, e12);
            if (d12_1 <= 0) {
                this.m_v2.a = 1;
                this.m_count = 1;
                this.m_v1.Copy(this.m_v2);
                return;
            }
            var inv_d12 = 1 / (d12_1 + d12_2);
            this.m_v1.a = d12_1 * inv_d12;
            this.m_v2.a = d12_2 * inv_d12;
            this.m_count = 2;
        };
        b2Simplex.prototype.Solve3 = function () {
            var w1 = this.m_v1.w;
            var w2 = this.m_v2.w;
            var w3 = this.m_v3.w;
            var e12 = b2Math_1.b2Vec2.SubVV(w2, w1, b2Simplex.s_e12);
            var w1e12 = b2Math_1.b2Vec2.DotVV(w1, e12);
            var w2e12 = b2Math_1.b2Vec2.DotVV(w2, e12);
            var d12_1 = w2e12;
            var d12_2 = (-w1e12);
            var e13 = b2Math_1.b2Vec2.SubVV(w3, w1, b2Simplex.s_e13);
            var w1e13 = b2Math_1.b2Vec2.DotVV(w1, e13);
            var w3e13 = b2Math_1.b2Vec2.DotVV(w3, e13);
            var d13_1 = w3e13;
            var d13_2 = (-w1e13);
            var e23 = b2Math_1.b2Vec2.SubVV(w3, w2, b2Simplex.s_e23);
            var w2e23 = b2Math_1.b2Vec2.DotVV(w2, e23);
            var w3e23 = b2Math_1.b2Vec2.DotVV(w3, e23);
            var d23_1 = w3e23;
            var d23_2 = (-w2e23);
            var n123 = b2Math_1.b2Vec2.CrossVV(e12, e13);
            var d123_1 = n123 * b2Math_1.b2Vec2.CrossVV(w2, w3);
            var d123_2 = n123 * b2Math_1.b2Vec2.CrossVV(w3, w1);
            var d123_3 = n123 * b2Math_1.b2Vec2.CrossVV(w1, w2);
            if (d12_2 <= 0 && d13_2 <= 0) {
                this.m_v1.a = 1;
                this.m_count = 1;
                return;
            }
            if (d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
                var inv_d12 = 1 / (d12_1 + d12_2);
                this.m_v1.a = d12_1 * inv_d12;
                this.m_v2.a = d12_2 * inv_d12;
                this.m_count = 2;
                return;
            }
            if (d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
                var inv_d13 = 1 / (d13_1 + d13_2);
                this.m_v1.a = d13_1 * inv_d13;
                this.m_v3.a = d13_2 * inv_d13;
                this.m_count = 2;
                this.m_v2.Copy(this.m_v3);
                return;
            }
            if (d12_1 <= 0 && d23_2 <= 0) {
                this.m_v2.a = 1;
                this.m_count = 1;
                this.m_v1.Copy(this.m_v2);
                return;
            }
            if (d13_1 <= 0 && d23_1 <= 0) {
                this.m_v3.a = 1;
                this.m_count = 1;
                this.m_v1.Copy(this.m_v3);
                return;
            }
            if (d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
                var inv_d23 = 1 / (d23_1 + d23_2);
                this.m_v2.a = d23_1 * inv_d23;
                this.m_v3.a = d23_2 * inv_d23;
                this.m_count = 2;
                this.m_v1.Copy(this.m_v3);
                return;
            }
            var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
            this.m_v1.a = d123_1 * inv_d123;
            this.m_v2.a = d123_2 * inv_d123;
            this.m_v3.a = d123_3 * inv_d123;
            this.m_count = 3;
        };
        b2Simplex.s_e12 = new b2Math_1.b2Vec2();
        b2Simplex.s_e13 = new b2Math_1.b2Vec2();
        b2Simplex.s_e23 = new b2Math_1.b2Vec2();
        return b2Simplex;
    }());
    exports.b2Simplex = b2Simplex;
    var b2Distance_s_simplex = new b2Simplex();
    var b2Distance_s_saveA = [0, 0, 0];
    var b2Distance_s_saveB = [0, 0, 0];
    var b2Distance_s_p = new b2Math_1.b2Vec2();
    var b2Distance_s_d = new b2Math_1.b2Vec2();
    var b2Distance_s_normal = new b2Math_1.b2Vec2();
    var b2Distance_s_supportA = new b2Math_1.b2Vec2();
    var b2Distance_s_supportB = new b2Math_1.b2Vec2();
    function b2Distance(output, cache, input) {
        ++exports.b2_gjkCalls;
        var proxyA = input.proxyA;
        var proxyB = input.proxyB;
        var transformA = input.transformA;
        var transformB = input.transformB;
        var simplex = b2Distance_s_simplex;
        simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
        var vertices = simplex.m_vertices;
        var k_maxIters = 20;
        var saveA = b2Distance_s_saveA;
        var saveB = b2Distance_s_saveB;
        var saveCount = 0;
        var distanceSqr1 = b2Settings_3.b2_maxFloat;
        var distanceSqr2 = distanceSqr1;
        var iter = 0;
        while (iter < k_maxIters) {
            saveCount = simplex.m_count;
            for (var i = 0; i < saveCount; ++i) {
                saveA[i] = vertices[i].indexA;
                saveB[i] = vertices[i].indexB;
            }
            switch (simplex.m_count) {
                case 1:
                    break;
                case 2:
                    simplex.Solve2();
                    break;
                case 3:
                    simplex.Solve3();
                    break;
                default:
                    break;
            }
            if (simplex.m_count === 3) {
                break;
            }
            var p = simplex.GetClosestPoint(b2Distance_s_p);
            distanceSqr2 = p.LengthSquared();
            distanceSqr1 = distanceSqr2;
            var d = simplex.GetSearchDirection(b2Distance_s_d);
            if (d.LengthSquared() < b2Settings_3.b2_epsilon_sq) {
                break;
            }
            var vertex = vertices[simplex.m_count];
            vertex.indexA = proxyA.GetSupport(b2Math_1.b2Rot.MulTRV(transformA.q, b2Math_1.b2Vec2.NegV(d, b2Math_1.b2Vec2.s_t0), b2Distance_s_supportA));
            b2Math_1.b2Transform.MulXV(transformA, proxyA.GetVertex(vertex.indexA), vertex.wA);
            vertex.indexB = proxyB.GetSupport(b2Math_1.b2Rot.MulTRV(transformB.q, d, b2Distance_s_supportB));
            b2Math_1.b2Transform.MulXV(transformB, proxyB.GetVertex(vertex.indexB), vertex.wB);
            b2Math_1.b2Vec2.SubVV(vertex.wB, vertex.wA, vertex.w);
            ++iter;
            ++exports.b2_gjkIters;
            var duplicate = false;
            for (var i = 0; i < saveCount; ++i) {
                if (vertex.indexA === saveA[i] && vertex.indexB === saveB[i]) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate) {
                break;
            }
            ++simplex.m_count;
        }
        exports.b2_gjkMaxIters = b2Math_1.b2Max(exports.b2_gjkMaxIters, iter);
        simplex.GetWitnessPoints(output.pointA, output.pointB);
        output.distance = b2Math_1.b2Vec2.DistanceVV(output.pointA, output.pointB);
        output.iterations = iter;
        simplex.WriteCache(cache);
        if (input.useRadii) {
            var rA = proxyA.m_radius;
            var rB = proxyB.m_radius;
            if (output.distance > (rA + rB) && output.distance > b2Settings_3.b2_epsilon) {
                output.distance -= rA + rB;
                var normal = b2Math_1.b2Vec2.SubVV(output.pointB, output.pointA, b2Distance_s_normal);
                normal.Normalize();
                output.pointA.SelfMulAdd(rA, normal);
                output.pointB.SelfMulSub(rB, normal);
            }
            else {
                var p = b2Math_1.b2Vec2.MidVV(output.pointA, output.pointB, b2Distance_s_p);
                output.pointA.Copy(p);
                output.pointB.Copy(p);
                output.distance = 0;
            }
        }
    }
    exports.b2Distance = b2Distance;
});
define("Collision/Shapes/b2Shape", ["require", "exports", "Common/b2Math"], function (require, exports, b2Math_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2MassData = (function () {
        function b2MassData() {
            this.mass = 0;
            this.center = new b2Math_2.b2Vec2(0, 0);
            this.I = 0;
        }
        return b2MassData;
    }());
    exports.b2MassData = b2MassData;
    var b2ShapeType;
    (function (b2ShapeType) {
        b2ShapeType[b2ShapeType["e_unknown"] = -1] = "e_unknown";
        b2ShapeType[b2ShapeType["e_circleShape"] = 0] = "e_circleShape";
        b2ShapeType[b2ShapeType["e_edgeShape"] = 1] = "e_edgeShape";
        b2ShapeType[b2ShapeType["e_polygonShape"] = 2] = "e_polygonShape";
        b2ShapeType[b2ShapeType["e_chainShape"] = 3] = "e_chainShape";
        b2ShapeType[b2ShapeType["e_shapeTypeCount"] = 4] = "e_shapeTypeCount";
    })(b2ShapeType = exports.b2ShapeType || (exports.b2ShapeType = {}));
    var b2Shape = (function () {
        function b2Shape(type, radius) {
            this.m_type = b2ShapeType.e_unknown;
            this.m_radius = 0;
            this.m_type = type;
            this.m_radius = radius;
        }
        b2Shape.prototype.Copy = function (other) {
            this.m_radius = other.m_radius;
            return this;
        };
        b2Shape.prototype.GetType = function () {
            return this.m_type;
        };
        return b2Shape;
    }());
    exports.b2Shape = b2Shape;
});
define("Collision/b2Collision", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/b2Distance"], function (require, exports, b2Settings_4, b2Math_3, b2Distance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ContactFeatureType;
    (function (b2ContactFeatureType) {
        b2ContactFeatureType[b2ContactFeatureType["e_vertex"] = 0] = "e_vertex";
        b2ContactFeatureType[b2ContactFeatureType["e_face"] = 1] = "e_face";
    })(b2ContactFeatureType = exports.b2ContactFeatureType || (exports.b2ContactFeatureType = {}));
    var b2ContactFeature = (function () {
        function b2ContactFeature() {
            this._key = 0;
            this._key_invalid = false;
            this._indexA = 0;
            this._indexB = 0;
            this._typeA = 0;
            this._typeB = 0;
        }
        Object.defineProperty(b2ContactFeature.prototype, "key", {
            get: function () {
                if (this._key_invalid) {
                    this._key_invalid = false;
                    this._key = this._indexA | (this._indexB << 8) | (this._typeA << 16) | (this._typeB << 24);
                }
                return this._key;
            },
            set: function (value) {
                this._key = value;
                this._key_invalid = false;
                this._indexA = this._key & 0xff;
                this._indexB = (this._key >> 8) & 0xff;
                this._typeA = (this._key >> 16) & 0xff;
                this._typeB = (this._key >> 24) & 0xff;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(b2ContactFeature.prototype, "indexA", {
            get: function () {
                return this._indexA;
            },
            set: function (value) {
                this._indexA = value;
                this._key_invalid = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(b2ContactFeature.prototype, "indexB", {
            get: function () {
                return this._indexB;
            },
            set: function (value) {
                this._indexB = value;
                this._key_invalid = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(b2ContactFeature.prototype, "typeA", {
            get: function () {
                return this._typeA;
            },
            set: function (value) {
                this._typeA = value;
                this._key_invalid = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(b2ContactFeature.prototype, "typeB", {
            get: function () {
                return this._typeB;
            },
            set: function (value) {
                this._typeB = value;
                this._key_invalid = true;
            },
            enumerable: true,
            configurable: true
        });
        return b2ContactFeature;
    }());
    exports.b2ContactFeature = b2ContactFeature;
    var b2ContactID = (function () {
        function b2ContactID() {
            this.cf = new b2ContactFeature();
        }
        b2ContactID.prototype.Copy = function (o) {
            this.key = o.key;
            return this;
        };
        b2ContactID.prototype.Clone = function () {
            return new b2ContactID().Copy(this);
        };
        Object.defineProperty(b2ContactID.prototype, "key", {
            get: function () {
                return this.cf.key;
            },
            set: function (value) {
                this.cf.key = value;
            },
            enumerable: true,
            configurable: true
        });
        return b2ContactID;
    }());
    exports.b2ContactID = b2ContactID;
    var b2ManifoldPoint = (function () {
        function b2ManifoldPoint() {
            this.localPoint = new b2Math_3.b2Vec2();
            this.normalImpulse = 0;
            this.tangentImpulse = 0;
            this.id = new b2ContactID();
        }
        b2ManifoldPoint.MakeArray = function (length) {
            return b2Settings_4.b2MakeArray(length, function (i) { return new b2ManifoldPoint(); });
        };
        b2ManifoldPoint.prototype.Reset = function () {
            this.localPoint.SetZero();
            this.normalImpulse = 0;
            this.tangentImpulse = 0;
            this.id.key = 0;
        };
        b2ManifoldPoint.prototype.Copy = function (o) {
            this.localPoint.Copy(o.localPoint);
            this.normalImpulse = o.normalImpulse;
            this.tangentImpulse = o.tangentImpulse;
            this.id.Copy(o.id);
            return this;
        };
        return b2ManifoldPoint;
    }());
    exports.b2ManifoldPoint = b2ManifoldPoint;
    var b2ManifoldType;
    (function (b2ManifoldType) {
        b2ManifoldType[b2ManifoldType["e_unknown"] = -1] = "e_unknown";
        b2ManifoldType[b2ManifoldType["e_circles"] = 0] = "e_circles";
        b2ManifoldType[b2ManifoldType["e_faceA"] = 1] = "e_faceA";
        b2ManifoldType[b2ManifoldType["e_faceB"] = 2] = "e_faceB";
    })(b2ManifoldType = exports.b2ManifoldType || (exports.b2ManifoldType = {}));
    var b2Manifold = (function () {
        function b2Manifold() {
            this.points = b2ManifoldPoint.MakeArray(b2Settings_4.b2_maxManifoldPoints);
            this.localNormal = new b2Math_3.b2Vec2();
            this.localPoint = new b2Math_3.b2Vec2();
            this.type = b2ManifoldType.e_unknown;
            this.pointCount = 0;
        }
        b2Manifold.prototype.Reset = function () {
            for (var i = 0; i < b2Settings_4.b2_maxManifoldPoints; ++i) {
                this.points[i].Reset();
            }
            this.localNormal.SetZero();
            this.localPoint.SetZero();
            this.type = b2ManifoldType.e_unknown;
            this.pointCount = 0;
        };
        b2Manifold.prototype.Copy = function (o) {
            this.pointCount = o.pointCount;
            for (var i = 0; i < b2Settings_4.b2_maxManifoldPoints; ++i) {
                this.points[i].Copy(o.points[i]);
            }
            this.localNormal.Copy(o.localNormal);
            this.localPoint.Copy(o.localPoint);
            this.type = o.type;
            return this;
        };
        b2Manifold.prototype.Clone = function () {
            return new b2Manifold().Copy(this);
        };
        return b2Manifold;
    }());
    exports.b2Manifold = b2Manifold;
    var b2WorldManifold = (function () {
        function b2WorldManifold() {
            this.normal = new b2Math_3.b2Vec2();
            this.points = b2Math_3.b2Vec2.MakeArray(b2Settings_4.b2_maxManifoldPoints);
            this.separations = b2Settings_4.b2MakeNumberArray(b2Settings_4.b2_maxManifoldPoints);
        }
        b2WorldManifold.prototype.Initialize = function (manifold, xfA, radiusA, xfB, radiusB) {
            if (manifold.pointCount === 0) {
                return;
            }
            switch (manifold.type) {
                case b2ManifoldType.e_circles:
                    {
                        this.normal.Set(1, 0);
                        var pointA = b2Math_3.b2Transform.MulXV(xfA, manifold.localPoint, b2WorldManifold.Initialize_s_pointA);
                        var pointB = b2Math_3.b2Transform.MulXV(xfB, manifold.points[0].localPoint, b2WorldManifold.Initialize_s_pointB);
                        if (b2Math_3.b2Vec2.DistanceSquaredVV(pointA, pointB) > b2Settings_4.b2_epsilon_sq) {
                            b2Math_3.b2Vec2.SubVV(pointB, pointA, this.normal).SelfNormalize();
                        }
                        var cA = b2Math_3.b2Vec2.AddVMulSV(pointA, radiusA, this.normal, b2WorldManifold.Initialize_s_cA);
                        var cB = b2Math_3.b2Vec2.SubVMulSV(pointB, radiusB, this.normal, b2WorldManifold.Initialize_s_cB);
                        b2Math_3.b2Vec2.MidVV(cA, cB, this.points[0]);
                        this.separations[0] = b2Math_3.b2Vec2.DotVV(b2Math_3.b2Vec2.SubVV(cB, cA, b2Math_3.b2Vec2.s_t0), this.normal);
                    }
                    break;
                case b2ManifoldType.e_faceA:
                    {
                        b2Math_3.b2Rot.MulRV(xfA.q, manifold.localNormal, this.normal);
                        var planePoint = b2Math_3.b2Transform.MulXV(xfA, manifold.localPoint, b2WorldManifold.Initialize_s_planePoint);
                        for (var i = 0; i < manifold.pointCount; ++i) {
                            var clipPoint = b2Math_3.b2Transform.MulXV(xfB, manifold.points[i].localPoint, b2WorldManifold.Initialize_s_clipPoint);
                            var s = radiusA - b2Math_3.b2Vec2.DotVV(b2Math_3.b2Vec2.SubVV(clipPoint, planePoint, b2Math_3.b2Vec2.s_t0), this.normal);
                            var cA = b2Math_3.b2Vec2.AddVMulSV(clipPoint, s, this.normal, b2WorldManifold.Initialize_s_cA);
                            var cB = b2Math_3.b2Vec2.SubVMulSV(clipPoint, radiusB, this.normal, b2WorldManifold.Initialize_s_cB);
                            b2Math_3.b2Vec2.MidVV(cA, cB, this.points[i]);
                            this.separations[i] = b2Math_3.b2Vec2.DotVV(b2Math_3.b2Vec2.SubVV(cB, cA, b2Math_3.b2Vec2.s_t0), this.normal);
                        }
                    }
                    break;
                case b2ManifoldType.e_faceB:
                    {
                        b2Math_3.b2Rot.MulRV(xfB.q, manifold.localNormal, this.normal);
                        var planePoint = b2Math_3.b2Transform.MulXV(xfB, manifold.localPoint, b2WorldManifold.Initialize_s_planePoint);
                        for (var i = 0; i < manifold.pointCount; ++i) {
                            var clipPoint = b2Math_3.b2Transform.MulXV(xfA, manifold.points[i].localPoint, b2WorldManifold.Initialize_s_clipPoint);
                            var s = radiusB - b2Math_3.b2Vec2.DotVV(b2Math_3.b2Vec2.SubVV(clipPoint, planePoint, b2Math_3.b2Vec2.s_t0), this.normal);
                            var cB = b2Math_3.b2Vec2.AddVMulSV(clipPoint, s, this.normal, b2WorldManifold.Initialize_s_cB);
                            var cA = b2Math_3.b2Vec2.SubVMulSV(clipPoint, radiusA, this.normal, b2WorldManifold.Initialize_s_cA);
                            b2Math_3.b2Vec2.MidVV(cA, cB, this.points[i]);
                            this.separations[i] = b2Math_3.b2Vec2.DotVV(b2Math_3.b2Vec2.SubVV(cA, cB, b2Math_3.b2Vec2.s_t0), this.normal);
                        }
                        this.normal.SelfNeg();
                    }
                    break;
            }
        };
        b2WorldManifold.Initialize_s_pointA = new b2Math_3.b2Vec2();
        b2WorldManifold.Initialize_s_pointB = new b2Math_3.b2Vec2();
        b2WorldManifold.Initialize_s_cA = new b2Math_3.b2Vec2();
        b2WorldManifold.Initialize_s_cB = new b2Math_3.b2Vec2();
        b2WorldManifold.Initialize_s_planePoint = new b2Math_3.b2Vec2();
        b2WorldManifold.Initialize_s_clipPoint = new b2Math_3.b2Vec2();
        return b2WorldManifold;
    }());
    exports.b2WorldManifold = b2WorldManifold;
    var b2PointState;
    (function (b2PointState) {
        b2PointState[b2PointState["b2_nullState"] = 0] = "b2_nullState";
        b2PointState[b2PointState["b2_addState"] = 1] = "b2_addState";
        b2PointState[b2PointState["b2_persistState"] = 2] = "b2_persistState";
        b2PointState[b2PointState["b2_removeState"] = 3] = "b2_removeState";
    })(b2PointState = exports.b2PointState || (exports.b2PointState = {}));
    function b2GetPointStates(state1, state2, manifold1, manifold2) {
        var i;
        for (i = 0; i < manifold1.pointCount; ++i) {
            var id = manifold1.points[i].id;
            var key = id.key;
            state1[i] = b2PointState.b2_removeState;
            for (var j = 0, jct = manifold2.pointCount; j < jct; ++j) {
                if (manifold2.points[j].id.key === key) {
                    state1[i] = b2PointState.b2_persistState;
                    break;
                }
            }
        }
        for (; i < b2Settings_4.b2_maxManifoldPoints; ++i) {
            state1[i] = b2PointState.b2_nullState;
        }
        for (i = 0; i < manifold2.pointCount; ++i) {
            var id = manifold2.points[i].id;
            var key = id.key;
            state2[i] = b2PointState.b2_addState;
            for (var j = 0, jct = manifold1.pointCount; j < jct; ++j) {
                if (manifold1.points[j].id.key === key) {
                    state2[i] = b2PointState.b2_persistState;
                    break;
                }
            }
        }
        for (; i < b2Settings_4.b2_maxManifoldPoints; ++i) {
            state2[i] = b2PointState.b2_nullState;
        }
    }
    exports.b2GetPointStates = b2GetPointStates;
    var b2ClipVertex = (function () {
        function b2ClipVertex() {
            this.v = new b2Math_3.b2Vec2();
            this.id = new b2ContactID();
        }
        b2ClipVertex.MakeArray = function (length) {
            return b2Settings_4.b2MakeArray(length, function (i) { return new b2ClipVertex(); });
        };
        b2ClipVertex.prototype.Copy = function (other) {
            this.v.Copy(other.v);
            this.id.Copy(other.id);
            return this;
        };
        return b2ClipVertex;
    }());
    exports.b2ClipVertex = b2ClipVertex;
    var b2RayCastInput = (function () {
        function b2RayCastInput() {
            this.p1 = new b2Math_3.b2Vec2();
            this.p2 = new b2Math_3.b2Vec2();
            this.maxFraction = 1;
        }
        b2RayCastInput.prototype.Copy = function (o) {
            this.p1.Copy(o.p1);
            this.p2.Copy(o.p2);
            this.maxFraction = o.maxFraction;
            return this;
        };
        return b2RayCastInput;
    }());
    exports.b2RayCastInput = b2RayCastInput;
    var b2RayCastOutput = (function () {
        function b2RayCastOutput() {
            this.normal = new b2Math_3.b2Vec2();
            this.fraction = 0;
        }
        b2RayCastOutput.prototype.Copy = function (o) {
            this.normal.Copy(o.normal);
            this.fraction = o.fraction;
            return this;
        };
        return b2RayCastOutput;
    }());
    exports.b2RayCastOutput = b2RayCastOutput;
    var b2AABB = (function () {
        function b2AABB() {
            this.lowerBound = new b2Math_3.b2Vec2();
            this.upperBound = new b2Math_3.b2Vec2();
            this.m_cache_center = new b2Math_3.b2Vec2();
            this.m_cache_extent = new b2Math_3.b2Vec2();
        }
        b2AABB.prototype.Copy = function (o) {
            this.lowerBound.Copy(o.lowerBound);
            this.upperBound.Copy(o.upperBound);
            return this;
        };
        b2AABB.prototype.IsValid = function () {
            var d_x = this.upperBound.x - this.lowerBound.x;
            var d_y = this.upperBound.y - this.lowerBound.y;
            var valid = d_x >= 0 && d_y >= 0;
            valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid();
            return valid;
        };
        b2AABB.prototype.GetCenter = function () {
            return b2Math_3.b2Vec2.MidVV(this.lowerBound, this.upperBound, this.m_cache_center);
        };
        b2AABB.prototype.GetExtents = function () {
            return b2Math_3.b2Vec2.ExtVV(this.lowerBound, this.upperBound, this.m_cache_extent);
        };
        b2AABB.prototype.GetPerimeter = function () {
            var wx = this.upperBound.x - this.lowerBound.x;
            var wy = this.upperBound.y - this.lowerBound.y;
            return 2 * (wx + wy);
        };
        b2AABB.prototype.Combine1 = function (aabb) {
            this.lowerBound.x = b2Math_3.b2Min(this.lowerBound.x, aabb.lowerBound.x);
            this.lowerBound.y = b2Math_3.b2Min(this.lowerBound.y, aabb.lowerBound.y);
            this.upperBound.x = b2Math_3.b2Max(this.upperBound.x, aabb.upperBound.x);
            this.upperBound.y = b2Math_3.b2Max(this.upperBound.y, aabb.upperBound.y);
            return this;
        };
        b2AABB.prototype.Combine2 = function (aabb1, aabb2) {
            this.lowerBound.x = b2Math_3.b2Min(aabb1.lowerBound.x, aabb2.lowerBound.x);
            this.lowerBound.y = b2Math_3.b2Min(aabb1.lowerBound.y, aabb2.lowerBound.y);
            this.upperBound.x = b2Math_3.b2Max(aabb1.upperBound.x, aabb2.upperBound.x);
            this.upperBound.y = b2Math_3.b2Max(aabb1.upperBound.y, aabb2.upperBound.y);
            return this;
        };
        b2AABB.Combine = function (aabb1, aabb2, out) {
            out.Combine2(aabb1, aabb2);
            return out;
        };
        b2AABB.prototype.Contains = function (aabb) {
            var result = true;
            result = result && this.lowerBound.x <= aabb.lowerBound.x;
            result = result && this.lowerBound.y <= aabb.lowerBound.y;
            result = result && aabb.upperBound.x <= this.upperBound.x;
            result = result && aabb.upperBound.y <= this.upperBound.y;
            return result;
        };
        b2AABB.prototype.RayCast = function (output, input) {
            var tmin = (-b2Settings_4.b2_maxFloat);
            var tmax = b2Settings_4.b2_maxFloat;
            var p_x = input.p1.x;
            var p_y = input.p1.y;
            var d_x = input.p2.x - input.p1.x;
            var d_y = input.p2.y - input.p1.y;
            var absD_x = b2Math_3.b2Abs(d_x);
            var absD_y = b2Math_3.b2Abs(d_y);
            var normal = output.normal;
            if (absD_x < b2Settings_4.b2_epsilon) {
                if (p_x < this.lowerBound.x || this.upperBound.x < p_x) {
                    return false;
                }
            }
            else {
                var inv_d = 1 / d_x;
                var t1 = (this.lowerBound.x - p_x) * inv_d;
                var t2 = (this.upperBound.x - p_x) * inv_d;
                var s = (-1);
                if (t1 > t2) {
                    var t3 = t1;
                    t1 = t2;
                    t2 = t3;
                    s = 1;
                }
                if (t1 > tmin) {
                    normal.x = s;
                    normal.y = 0;
                    tmin = t1;
                }
                tmax = b2Math_3.b2Min(tmax, t2);
                if (tmin > tmax) {
                    return false;
                }
            }
            if (absD_y < b2Settings_4.b2_epsilon) {
                if (p_y < this.lowerBound.y || this.upperBound.y < p_y) {
                    return false;
                }
            }
            else {
                var inv_d = 1 / d_y;
                var t1 = (this.lowerBound.y - p_y) * inv_d;
                var t2 = (this.upperBound.y - p_y) * inv_d;
                var s = (-1);
                if (t1 > t2) {
                    var t3 = t1;
                    t1 = t2;
                    t2 = t3;
                    s = 1;
                }
                if (t1 > tmin) {
                    normal.x = 0;
                    normal.y = s;
                    tmin = t1;
                }
                tmax = b2Math_3.b2Min(tmax, t2);
                if (tmin > tmax) {
                    return false;
                }
            }
            if (tmin < 0 || input.maxFraction < tmin) {
                return false;
            }
            output.fraction = tmin;
            return true;
        };
        b2AABB.prototype.TestContain = function (point) {
            if (point.x < this.lowerBound.x || this.upperBound.x < point.x) {
                return false;
            }
            if (point.y < this.lowerBound.y || this.upperBound.y < point.y) {
                return false;
            }
            return true;
        };
        b2AABB.prototype.TestOverlap = function (other) {
            var d1_x = other.lowerBound.x - this.upperBound.x;
            var d1_y = other.lowerBound.y - this.upperBound.y;
            var d2_x = this.lowerBound.x - other.upperBound.x;
            var d2_y = this.lowerBound.y - other.upperBound.y;
            if (d1_x > 0 || d1_y > 0) {
                return false;
            }
            if (d2_x > 0 || d2_y > 0) {
                return false;
            }
            return true;
        };
        return b2AABB;
    }());
    exports.b2AABB = b2AABB;
    function b2TestOverlapAABB(a, b) {
        var d1_x = b.lowerBound.x - a.upperBound.x;
        var d1_y = b.lowerBound.y - a.upperBound.y;
        var d2_x = a.lowerBound.x - b.upperBound.x;
        var d2_y = a.lowerBound.y - b.upperBound.y;
        if (d1_x > 0 || d1_y > 0) {
            return false;
        }
        if (d2_x > 0 || d2_y > 0) {
            return false;
        }
        return true;
    }
    exports.b2TestOverlapAABB = b2TestOverlapAABB;
    function b2ClipSegmentToLine(vOut, vIn, normal, offset, vertexIndexA) {
        var numOut = 0;
        var vIn0 = vIn[0];
        var vIn1 = vIn[1];
        var distance0 = b2Math_3.b2Vec2.DotVV(normal, vIn0.v) - offset;
        var distance1 = b2Math_3.b2Vec2.DotVV(normal, vIn1.v) - offset;
        if (distance0 <= 0) {
            vOut[numOut++].Copy(vIn0);
        }
        if (distance1 <= 0) {
            vOut[numOut++].Copy(vIn1);
        }
        if (distance0 * distance1 < 0) {
            var interp = distance0 / (distance0 - distance1);
            var v = vOut[numOut].v;
            v.x = vIn0.v.x + interp * (vIn1.v.x - vIn0.v.x);
            v.y = vIn0.v.y + interp * (vIn1.v.y - vIn0.v.y);
            var id = vOut[numOut].id;
            id.cf.indexA = vertexIndexA;
            id.cf.indexB = vIn0.id.cf.indexB;
            id.cf.typeA = b2ContactFeatureType.e_vertex;
            id.cf.typeB = b2ContactFeatureType.e_face;
            ++numOut;
        }
        return numOut;
    }
    exports.b2ClipSegmentToLine = b2ClipSegmentToLine;
    var b2TestOverlapShape_s_input = new b2Distance_1.b2DistanceInput();
    var b2TestOverlapShape_s_simplexCache = new b2Distance_1.b2SimplexCache();
    var b2TestOverlapShape_s_output = new b2Distance_1.b2DistanceOutput();
    function b2TestOverlapShape(shapeA, indexA, shapeB, indexB, xfA, xfB) {
        var input = b2TestOverlapShape_s_input.Reset();
        input.proxyA.SetShape(shapeA, indexA);
        input.proxyB.SetShape(shapeB, indexB);
        input.transformA.Copy(xfA);
        input.transformB.Copy(xfB);
        input.useRadii = true;
        var simplexCache = b2TestOverlapShape_s_simplexCache.Reset();
        simplexCache.count = 0;
        var output = b2TestOverlapShape_s_output.Reset();
        b2Distance_1.b2Distance(output, simplexCache, input);
        return output.distance < 10 * b2Settings_4.b2_epsilon;
    }
    exports.b2TestOverlapShape = b2TestOverlapShape;
});
define("Collision/b2DynamicTree", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Common/b2GrowableStack", "Collision/b2Collision"], function (require, exports, b2Settings_5, b2Math_4, b2GrowableStack_1, b2Collision_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function verify(value) {
        if (value === null) {
            throw new Error();
        }
        return value;
    }
    var b2TreeNode = (function () {
        function b2TreeNode(id) {
            if (id === void 0) { id = 0; }
            this.m_id = 0;
            this.aabb = new b2Collision_1.b2AABB();
            this.parent = null;
            this.child1 = null;
            this.child2 = null;
            this.height = 0;
            this.m_id = id;
        }
        b2TreeNode.prototype.IsLeaf = function () {
            return this.child1 === null;
        };
        return b2TreeNode;
    }());
    exports.b2TreeNode = b2TreeNode;
    var b2DynamicTree = (function () {
        function b2DynamicTree() {
            this.m_root = null;
            this.m_freeList = null;
            this.m_path = 0;
            this.m_insertionCount = 0;
            this.m_stack = new b2GrowableStack_1.b2GrowableStack(256);
        }
        b2DynamicTree.prototype.Query = function (aabb, callback) {
            if (this.m_root === null) {
                return;
            }
            var stack = this.m_stack.Reset();
            stack.Push(this.m_root);
            while (stack.GetCount() > 0) {
                var node = stack.Pop();
                if (node.aabb.TestOverlap(aabb)) {
                    if (node.IsLeaf()) {
                        var proceed = callback(node);
                        if (!proceed) {
                            return;
                        }
                    }
                    else {
                        stack.Push(verify(node.child1));
                        stack.Push(verify(node.child2));
                    }
                }
            }
        };
        b2DynamicTree.prototype.QueryPoint = function (point, callback) {
            if (this.m_root === null) {
                return;
            }
            var stack = this.m_stack.Reset();
            stack.Push(this.m_root);
            while (stack.GetCount() > 0) {
                var node = stack.Pop();
                if (node.aabb.TestContain(point)) {
                    if (node.IsLeaf()) {
                        var proceed = callback(node);
                        if (!proceed) {
                            return;
                        }
                    }
                    else {
                        stack.Push(verify(node.child1));
                        stack.Push(verify(node.child2));
                    }
                }
            }
        };
        b2DynamicTree.prototype.RayCast = function (input, callback) {
            if (this.m_root === null) {
                return;
            }
            var p1 = input.p1;
            var p2 = input.p2;
            var r = b2Math_4.b2Vec2.SubVV(p2, p1, b2DynamicTree.s_r);
            r.Normalize();
            var v = b2Math_4.b2Vec2.CrossOneV(r, b2DynamicTree.s_v);
            var abs_v = b2Math_4.b2Vec2.AbsV(v, b2DynamicTree.s_abs_v);
            var maxFraction = input.maxFraction;
            var segmentAABB = b2DynamicTree.s_segmentAABB;
            var t_x = p1.x + maxFraction * (p2.x - p1.x);
            var t_y = p1.y + maxFraction * (p2.y - p1.y);
            segmentAABB.lowerBound.x = b2Math_4.b2Min(p1.x, t_x);
            segmentAABB.lowerBound.y = b2Math_4.b2Min(p1.y, t_y);
            segmentAABB.upperBound.x = b2Math_4.b2Max(p1.x, t_x);
            segmentAABB.upperBound.y = b2Math_4.b2Max(p1.y, t_y);
            var stack = this.m_stack.Reset();
            stack.Push(this.m_root);
            while (stack.GetCount() > 0) {
                var node = stack.Pop();
                if (!b2Collision_1.b2TestOverlapAABB(node.aabb, segmentAABB)) {
                    continue;
                }
                var c = node.aabb.GetCenter();
                var h = node.aabb.GetExtents();
                var separation = b2Math_4.b2Abs(b2Math_4.b2Vec2.DotVV(v, b2Math_4.b2Vec2.SubVV(p1, c, b2Math_4.b2Vec2.s_t0))) - b2Math_4.b2Vec2.DotVV(abs_v, h);
                if (separation > 0) {
                    continue;
                }
                if (node.IsLeaf()) {
                    var subInput = b2DynamicTree.s_subInput;
                    subInput.p1.Copy(input.p1);
                    subInput.p2.Copy(input.p2);
                    subInput.maxFraction = maxFraction;
                    var value = callback(subInput, node);
                    if (value === 0) {
                        return;
                    }
                    if (value > 0) {
                        maxFraction = value;
                        t_x = p1.x + maxFraction * (p2.x - p1.x);
                        t_y = p1.y + maxFraction * (p2.y - p1.y);
                        segmentAABB.lowerBound.x = b2Math_4.b2Min(p1.x, t_x);
                        segmentAABB.lowerBound.y = b2Math_4.b2Min(p1.y, t_y);
                        segmentAABB.upperBound.x = b2Math_4.b2Max(p1.x, t_x);
                        segmentAABB.upperBound.y = b2Math_4.b2Max(p1.y, t_y);
                    }
                }
                else {
                    stack.Push(verify(node.child1));
                    stack.Push(verify(node.child2));
                }
            }
        };
        b2DynamicTree.prototype.AllocateNode = function () {
            if (this.m_freeList) {
                var node = this.m_freeList;
                this.m_freeList = node.parent;
                node.parent = null;
                node.child1 = null;
                node.child2 = null;
                node.height = 0;
                delete node.userData;
                return node;
            }
            return new b2TreeNode(b2DynamicTree.s_node_id++);
        };
        b2DynamicTree.prototype.FreeNode = function (node) {
            node.parent = this.m_freeList;
            node.child1 = null;
            node.child2 = null;
            node.height = -1;
            delete node.userData;
            this.m_freeList = node;
        };
        b2DynamicTree.prototype.CreateProxy = function (aabb, userData) {
            var node = this.AllocateNode();
            var r_x = b2Settings_5.b2_aabbExtension;
            var r_y = b2Settings_5.b2_aabbExtension;
            node.aabb.lowerBound.x = aabb.lowerBound.x - r_x;
            node.aabb.lowerBound.y = aabb.lowerBound.y - r_y;
            node.aabb.upperBound.x = aabb.upperBound.x + r_x;
            node.aabb.upperBound.y = aabb.upperBound.y + r_y;
            node.userData = userData;
            node.height = 0;
            this.InsertLeaf(node);
            return node;
        };
        b2DynamicTree.prototype.DestroyProxy = function (proxy) {
            this.RemoveLeaf(proxy);
            this.FreeNode(proxy);
        };
        b2DynamicTree.prototype.MoveProxy = function (proxy, aabb, displacement) {
            if (proxy.aabb.Contains(aabb)) {
                return false;
            }
            this.RemoveLeaf(proxy);
            var r_x = b2Settings_5.b2_aabbExtension + b2Settings_5.b2_aabbMultiplier * (displacement.x > 0 ? displacement.x : (-displacement.x));
            var r_y = b2Settings_5.b2_aabbExtension + b2Settings_5.b2_aabbMultiplier * (displacement.y > 0 ? displacement.y : (-displacement.y));
            proxy.aabb.lowerBound.x = aabb.lowerBound.x - r_x;
            proxy.aabb.lowerBound.y = aabb.lowerBound.y - r_y;
            proxy.aabb.upperBound.x = aabb.upperBound.x + r_x;
            proxy.aabb.upperBound.y = aabb.upperBound.y + r_y;
            this.InsertLeaf(proxy);
            return true;
        };
        b2DynamicTree.prototype.InsertLeaf = function (leaf) {
            ++this.m_insertionCount;
            if (this.m_root === null) {
                this.m_root = leaf;
                this.m_root.parent = null;
                return;
            }
            var leafAABB = leaf.aabb;
            var index = this.m_root;
            while (!index.IsLeaf()) {
                var child1 = verify(index.child1);
                var child2 = verify(index.child2);
                var area = index.aabb.GetPerimeter();
                var combinedAABB = b2DynamicTree.s_combinedAABB;
                combinedAABB.Combine2(index.aabb, leafAABB);
                var combinedArea = combinedAABB.GetPerimeter();
                var cost = 2 * combinedArea;
                var inheritanceCost = 2 * (combinedArea - area);
                var cost1 = void 0;
                var aabb = b2DynamicTree.s_aabb;
                var oldArea = void 0;
                var newArea = void 0;
                if (child1.IsLeaf()) {
                    aabb.Combine2(leafAABB, child1.aabb);
                    cost1 = aabb.GetPerimeter() + inheritanceCost;
                }
                else {
                    aabb.Combine2(leafAABB, child1.aabb);
                    oldArea = child1.aabb.GetPerimeter();
                    newArea = aabb.GetPerimeter();
                    cost1 = (newArea - oldArea) + inheritanceCost;
                }
                var cost2 = void 0;
                if (child2.IsLeaf()) {
                    aabb.Combine2(leafAABB, child2.aabb);
                    cost2 = aabb.GetPerimeter() + inheritanceCost;
                }
                else {
                    aabb.Combine2(leafAABB, child2.aabb);
                    oldArea = child2.aabb.GetPerimeter();
                    newArea = aabb.GetPerimeter();
                    cost2 = newArea - oldArea + inheritanceCost;
                }
                if (cost < cost1 && cost < cost2) {
                    break;
                }
                if (cost1 < cost2) {
                    index = child1;
                }
                else {
                    index = child2;
                }
            }
            var sibling = index;
            var oldParent = sibling.parent;
            var newParent = this.AllocateNode();
            newParent.parent = oldParent;
            delete newParent.userData;
            newParent.aabb.Combine2(leafAABB, sibling.aabb);
            newParent.height = sibling.height + 1;
            if (oldParent) {
                if (oldParent.child1 === sibling) {
                    oldParent.child1 = newParent;
                }
                else {
                    oldParent.child2 = newParent;
                }
                newParent.child1 = sibling;
                newParent.child2 = leaf;
                sibling.parent = newParent;
                leaf.parent = newParent;
            }
            else {
                newParent.child1 = sibling;
                newParent.child2 = leaf;
                sibling.parent = newParent;
                leaf.parent = newParent;
                this.m_root = newParent;
            }
            var index2 = leaf.parent;
            while (index2 !== null) {
                index2 = this.Balance(index2);
                var child1 = verify(index2.child1);
                var child2 = verify(index2.child2);
                index2.height = 1 + b2Math_4.b2Max(child1.height, child2.height);
                index2.aabb.Combine2(child1.aabb, child2.aabb);
                index2 = index2.parent;
            }
        };
        b2DynamicTree.prototype.RemoveLeaf = function (leaf) {
            if (leaf === this.m_root) {
                this.m_root = null;
                return;
            }
            var parent = verify(leaf.parent);
            var grandParent = parent && parent.parent;
            var sibling;
            if (parent.child1 === leaf) {
                sibling = verify(parent.child2);
            }
            else {
                sibling = verify(parent.child1);
            }
            if (grandParent) {
                if (grandParent.child1 === parent) {
                    grandParent.child1 = sibling;
                }
                else {
                    grandParent.child2 = sibling;
                }
                sibling.parent = grandParent;
                this.FreeNode(parent);
                var index = grandParent;
                while (index) {
                    index = this.Balance(index);
                    var child1 = verify(index.child1);
                    var child2 = verify(index.child2);
                    index.aabb.Combine2(child1.aabb, child2.aabb);
                    index.height = 1 + b2Math_4.b2Max(child1.height, child2.height);
                    index = index.parent;
                }
            }
            else {
                this.m_root = sibling;
                sibling.parent = null;
                this.FreeNode(parent);
            }
        };
        b2DynamicTree.prototype.Balance = function (A) {
            if (A.IsLeaf() || A.height < 2) {
                return A;
            }
            var B = verify(A.child1);
            var C = verify(A.child2);
            var balance = C.height - B.height;
            if (balance > 1) {
                var F = verify(C.child1);
                var G = verify(C.child2);
                C.child1 = A;
                C.parent = A.parent;
                A.parent = C;
                if (C.parent !== null) {
                    if (C.parent.child1 === A) {
                        C.parent.child1 = C;
                    }
                    else {
                        C.parent.child2 = C;
                    }
                }
                else {
                    this.m_root = C;
                }
                if (F.height > G.height) {
                    C.child2 = F;
                    A.child2 = G;
                    G.parent = A;
                    A.aabb.Combine2(B.aabb, G.aabb);
                    C.aabb.Combine2(A.aabb, F.aabb);
                    A.height = 1 + b2Math_4.b2Max(B.height, G.height);
                    C.height = 1 + b2Math_4.b2Max(A.height, F.height);
                }
                else {
                    C.child2 = G;
                    A.child2 = F;
                    F.parent = A;
                    A.aabb.Combine2(B.aabb, F.aabb);
                    C.aabb.Combine2(A.aabb, G.aabb);
                    A.height = 1 + b2Math_4.b2Max(B.height, F.height);
                    C.height = 1 + b2Math_4.b2Max(A.height, G.height);
                }
                return C;
            }
            if (balance < -1) {
                var D = verify(B.child1);
                var E = verify(B.child2);
                B.child1 = A;
                B.parent = A.parent;
                A.parent = B;
                if (B.parent !== null) {
                    if (B.parent.child1 === A) {
                        B.parent.child1 = B;
                    }
                    else {
                        B.parent.child2 = B;
                    }
                }
                else {
                    this.m_root = B;
                }
                if (D.height > E.height) {
                    B.child2 = D;
                    A.child1 = E;
                    E.parent = A;
                    A.aabb.Combine2(C.aabb, E.aabb);
                    B.aabb.Combine2(A.aabb, D.aabb);
                    A.height = 1 + b2Math_4.b2Max(C.height, E.height);
                    B.height = 1 + b2Math_4.b2Max(A.height, D.height);
                }
                else {
                    B.child2 = E;
                    A.child1 = D;
                    D.parent = A;
                    A.aabb.Combine2(C.aabb, D.aabb);
                    B.aabb.Combine2(A.aabb, E.aabb);
                    A.height = 1 + b2Math_4.b2Max(C.height, D.height);
                    B.height = 1 + b2Math_4.b2Max(A.height, E.height);
                }
                return B;
            }
            return A;
        };
        b2DynamicTree.prototype.GetHeight = function () {
            if (this.m_root === null) {
                return 0;
            }
            return this.m_root.height;
        };
        b2DynamicTree.GetAreaNode = function (node) {
            if (node === null) {
                return 0;
            }
            if (node.IsLeaf()) {
                return 0;
            }
            var area = node.aabb.GetPerimeter();
            area += b2DynamicTree.GetAreaNode(node.child1);
            area += b2DynamicTree.GetAreaNode(node.child2);
            return area;
        };
        b2DynamicTree.prototype.GetAreaRatio = function () {
            if (this.m_root === null) {
                return 0;
            }
            var root = this.m_root;
            var rootArea = root.aabb.GetPerimeter();
            var totalArea = b2DynamicTree.GetAreaNode(this.m_root);
            return totalArea / rootArea;
        };
        b2DynamicTree.prototype.ComputeHeightNode = function (node) {
            if (!node || node.IsLeaf()) {
                return 0;
            }
            var height1 = this.ComputeHeightNode(node.child1);
            var height2 = this.ComputeHeightNode(node.child2);
            return 1 + b2Math_4.b2Max(height1, height2);
        };
        b2DynamicTree.prototype.ComputeHeight = function () {
            var height = this.ComputeHeightNode(this.m_root);
            return height;
        };
        b2DynamicTree.prototype.ValidateStructure = function (index) {
            if (index === null) {
                return;
            }
            if (index === this.m_root) {
            }
            var node = index;
            if (node.IsLeaf()) {
                return;
            }
            var child1 = verify(node.child1);
            var child2 = verify(node.child2);
            this.ValidateStructure(child1);
            this.ValidateStructure(child2);
        };
        b2DynamicTree.prototype.ValidateMetrics = function (index) {
            if (index === null) {
                return;
            }
            var node = index;
            if (node.IsLeaf()) {
                return;
            }
            var child1 = verify(node.child1);
            var child2 = verify(node.child2);
            var aabb = b2DynamicTree.s_aabb;
            aabb.Combine2(child1.aabb, child2.aabb);
            this.ValidateMetrics(child1);
            this.ValidateMetrics(child2);
        };
        b2DynamicTree.prototype.Validate = function () {
            this.ValidateStructure(this.m_root);
            this.ValidateMetrics(this.m_root);
            var freeIndex = this.m_freeList;
            while (freeIndex !== null) {
                freeIndex = freeIndex.parent;
            }
        };
        b2DynamicTree.GetMaxBalanceNode = function (node, maxBalance) {
            if (node === null) {
                return maxBalance;
            }
            if (node.height <= 1) {
                return maxBalance;
            }
            var child1 = verify(node.child1);
            var child2 = verify(node.child2);
            var balance = b2Math_4.b2Abs(child2.height - child1.height);
            return b2Math_4.b2Max(maxBalance, balance);
        };
        b2DynamicTree.prototype.GetMaxBalance = function () {
            var maxBalance = b2DynamicTree.GetMaxBalanceNode(this.m_root, 0);
            return maxBalance;
        };
        b2DynamicTree.prototype.RebuildBottomUp = function () {
            this.Validate();
        };
        b2DynamicTree.ShiftOriginNode = function (node, newOrigin) {
            if (node === null) {
                return;
            }
            if (node.height <= 1) {
                return;
            }
            var child1 = node.child1;
            var child2 = node.child2;
            b2DynamicTree.ShiftOriginNode(child1, newOrigin);
            b2DynamicTree.ShiftOriginNode(child2, newOrigin);
            node.aabb.lowerBound.SelfSub(newOrigin);
            node.aabb.upperBound.SelfSub(newOrigin);
        };
        b2DynamicTree.prototype.ShiftOrigin = function (newOrigin) {
            b2DynamicTree.ShiftOriginNode(this.m_root, newOrigin);
        };
        b2DynamicTree.s_r = new b2Math_4.b2Vec2();
        b2DynamicTree.s_v = new b2Math_4.b2Vec2();
        b2DynamicTree.s_abs_v = new b2Math_4.b2Vec2();
        b2DynamicTree.s_segmentAABB = new b2Collision_1.b2AABB();
        b2DynamicTree.s_subInput = new b2Collision_1.b2RayCastInput();
        b2DynamicTree.s_combinedAABB = new b2Collision_1.b2AABB();
        b2DynamicTree.s_aabb = new b2Collision_1.b2AABB();
        b2DynamicTree.s_node_id = 0;
        return b2DynamicTree;
    }());
    exports.b2DynamicTree = b2DynamicTree;
});
define("Collision/b2BroadPhase", ["require", "exports", "Collision/b2DynamicTree"], function (require, exports, b2DynamicTree_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2Pair = (function () {
        function b2Pair(proxyA, proxyB) {
            this.proxyA = proxyA;
            this.proxyB = proxyB;
        }
        return b2Pair;
    }());
    exports.b2Pair = b2Pair;
    var b2BroadPhase = (function () {
        function b2BroadPhase() {
            this.m_tree = new b2DynamicTree_1.b2DynamicTree();
            this.m_proxyCount = 0;
            this.m_moveCount = 0;
            this.m_moveBuffer = [];
            this.m_pairCount = 0;
            this.m_pairBuffer = [];
        }
        b2BroadPhase.prototype.CreateProxy = function (aabb, userData) {
            var proxy = this.m_tree.CreateProxy(aabb, userData);
            ++this.m_proxyCount;
            this.BufferMove(proxy);
            return proxy;
        };
        b2BroadPhase.prototype.DestroyProxy = function (proxy) {
            this.UnBufferMove(proxy);
            --this.m_proxyCount;
            this.m_tree.DestroyProxy(proxy);
        };
        b2BroadPhase.prototype.MoveProxy = function (proxy, aabb, displacement) {
            var buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
            if (buffer) {
                this.BufferMove(proxy);
            }
        };
        b2BroadPhase.prototype.TouchProxy = function (proxy) {
            this.BufferMove(proxy);
        };
        b2BroadPhase.prototype.GetProxyCount = function () {
            return this.m_proxyCount;
        };
        b2BroadPhase.prototype.UpdatePairs = function (callback) {
            var _this = this;
            this.m_pairCount = 0;
            var _loop_1 = function (i_1) {
                var queryProxy = this_1.m_moveBuffer[i_1];
                if (queryProxy === null) {
                    return "continue";
                }
                var fatAABB = queryProxy.aabb;
                this_1.m_tree.Query(fatAABB, function (proxy) {
                    if (proxy.m_id === queryProxy.m_id) {
                        return true;
                    }
                    var proxyA;
                    var proxyB;
                    if (proxy.m_id < queryProxy.m_id) {
                        proxyA = proxy;
                        proxyB = queryProxy;
                    }
                    else {
                        proxyA = queryProxy;
                        proxyB = proxy;
                    }
                    if (_this.m_pairCount === _this.m_pairBuffer.length) {
                        _this.m_pairBuffer[_this.m_pairCount] = new b2Pair(proxyA, proxyB);
                    }
                    else {
                        var pair = _this.m_pairBuffer[_this.m_pairCount];
                        pair.proxyA = proxyA;
                        pair.proxyB = proxyB;
                    }
                    ++_this.m_pairCount;
                    return true;
                });
            };
            var this_1 = this;
            for (var i_1 = 0; i_1 < this.m_moveCount; ++i_1) {
                _loop_1(i_1);
            }
            this.m_moveCount = 0;
            this.m_pairBuffer.length = this.m_pairCount;
            this.m_pairBuffer.sort(b2PairLessThan);
            var i = 0;
            while (i < this.m_pairCount) {
                var primaryPair = this.m_pairBuffer[i];
                var userDataA = primaryPair.proxyA.userData;
                var userDataB = primaryPair.proxyB.userData;
                callback(userDataA, userDataB);
                ++i;
                while (i < this.m_pairCount) {
                    var pair = this.m_pairBuffer[i];
                    if (pair.proxyA.m_id !== primaryPair.proxyA.m_id || pair.proxyB.m_id !== primaryPair.proxyB.m_id) {
                        break;
                    }
                    ++i;
                }
            }
        };
        b2BroadPhase.prototype.Query = function (aabb, callback) {
            this.m_tree.Query(aabb, callback);
        };
        b2BroadPhase.prototype.QueryPoint = function (point, callback) {
            this.m_tree.QueryPoint(point, callback);
        };
        b2BroadPhase.prototype.RayCast = function (input, callback) {
            this.m_tree.RayCast(input, callback);
        };
        b2BroadPhase.prototype.GetTreeHeight = function () {
            return this.m_tree.GetHeight();
        };
        b2BroadPhase.prototype.GetTreeBalance = function () {
            return this.m_tree.GetMaxBalance();
        };
        b2BroadPhase.prototype.GetTreeQuality = function () {
            return this.m_tree.GetAreaRatio();
        };
        b2BroadPhase.prototype.ShiftOrigin = function (newOrigin) {
            this.m_tree.ShiftOrigin(newOrigin);
        };
        b2BroadPhase.prototype.BufferMove = function (proxy) {
            this.m_moveBuffer[this.m_moveCount] = proxy;
            ++this.m_moveCount;
        };
        b2BroadPhase.prototype.UnBufferMove = function (proxy) {
            var i = this.m_moveBuffer.indexOf(proxy);
            this.m_moveBuffer[i] = null;
        };
        return b2BroadPhase;
    }());
    exports.b2BroadPhase = b2BroadPhase;
    function b2PairLessThan(pair1, pair2) {
        if (pair1.proxyA.m_id === pair2.proxyA.m_id) {
            return pair1.proxyB.m_id - pair2.proxyB.m_id;
        }
        return pair1.proxyA.m_id - pair2.proxyA.m_id;
    }
    exports.b2PairLessThan = b2PairLessThan;
});
define("Collision/b2TimeOfImpact", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Common/b2Timer", "Collision/b2Distance"], function (require, exports, b2Settings_6, b2Math_5, b2Timer_1, b2Distance_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b2_toiTime = 0;
    exports.b2_toiMaxTime = 0;
    exports.b2_toiCalls = 0;
    exports.b2_toiIters = 0;
    exports.b2_toiMaxIters = 0;
    exports.b2_toiRootIters = 0;
    exports.b2_toiMaxRootIters = 0;
    function b2_toi_reset() {
        exports.b2_toiTime = 0;
        exports.b2_toiMaxTime = 0;
        exports.b2_toiCalls = 0;
        exports.b2_toiIters = 0;
        exports.b2_toiMaxIters = 0;
        exports.b2_toiRootIters = 0;
        exports.b2_toiMaxRootIters = 0;
    }
    exports.b2_toi_reset = b2_toi_reset;
    var b2TimeOfImpact_s_xfA = new b2Math_5.b2Transform();
    var b2TimeOfImpact_s_xfB = new b2Math_5.b2Transform();
    var b2TimeOfImpact_s_pointA = new b2Math_5.b2Vec2();
    var b2TimeOfImpact_s_pointB = new b2Math_5.b2Vec2();
    var b2TimeOfImpact_s_normal = new b2Math_5.b2Vec2();
    var b2TimeOfImpact_s_axisA = new b2Math_5.b2Vec2();
    var b2TimeOfImpact_s_axisB = new b2Math_5.b2Vec2();
    var b2TOIInput = (function () {
        function b2TOIInput() {
            this.proxyA = new b2Distance_2.b2DistanceProxy();
            this.proxyB = new b2Distance_2.b2DistanceProxy();
            this.sweepA = new b2Math_5.b2Sweep();
            this.sweepB = new b2Math_5.b2Sweep();
            this.tMax = 0;
        }
        return b2TOIInput;
    }());
    exports.b2TOIInput = b2TOIInput;
    var b2TOIOutputState;
    (function (b2TOIOutputState) {
        b2TOIOutputState[b2TOIOutputState["e_unknown"] = 0] = "e_unknown";
        b2TOIOutputState[b2TOIOutputState["e_failed"] = 1] = "e_failed";
        b2TOIOutputState[b2TOIOutputState["e_overlapped"] = 2] = "e_overlapped";
        b2TOIOutputState[b2TOIOutputState["e_touching"] = 3] = "e_touching";
        b2TOIOutputState[b2TOIOutputState["e_separated"] = 4] = "e_separated";
    })(b2TOIOutputState = exports.b2TOIOutputState || (exports.b2TOIOutputState = {}));
    var b2TOIOutput = (function () {
        function b2TOIOutput() {
            this.state = b2TOIOutputState.e_unknown;
            this.t = 0;
        }
        return b2TOIOutput;
    }());
    exports.b2TOIOutput = b2TOIOutput;
    var b2SeparationFunctionType;
    (function (b2SeparationFunctionType) {
        b2SeparationFunctionType[b2SeparationFunctionType["e_unknown"] = -1] = "e_unknown";
        b2SeparationFunctionType[b2SeparationFunctionType["e_points"] = 0] = "e_points";
        b2SeparationFunctionType[b2SeparationFunctionType["e_faceA"] = 1] = "e_faceA";
        b2SeparationFunctionType[b2SeparationFunctionType["e_faceB"] = 2] = "e_faceB";
    })(b2SeparationFunctionType = exports.b2SeparationFunctionType || (exports.b2SeparationFunctionType = {}));
    var b2SeparationFunction = (function () {
        function b2SeparationFunction() {
            this.m_sweepA = new b2Math_5.b2Sweep();
            this.m_sweepB = new b2Math_5.b2Sweep();
            this.m_type = b2SeparationFunctionType.e_unknown;
            this.m_localPoint = new b2Math_5.b2Vec2();
            this.m_axis = new b2Math_5.b2Vec2();
        }
        b2SeparationFunction.prototype.Initialize = function (cache, proxyA, sweepA, proxyB, sweepB, t1) {
            this.m_proxyA = proxyA;
            this.m_proxyB = proxyB;
            var count = cache.count;
            this.m_sweepA.Copy(sweepA);
            this.m_sweepB.Copy(sweepB);
            var xfA = b2TimeOfImpact_s_xfA;
            var xfB = b2TimeOfImpact_s_xfB;
            this.m_sweepA.GetTransform(xfA, t1);
            this.m_sweepB.GetTransform(xfB, t1);
            if (count === 1) {
                this.m_type = b2SeparationFunctionType.e_points;
                var localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
                var localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
                var pointA = b2Math_5.b2Transform.MulXV(xfA, localPointA, b2TimeOfImpact_s_pointA);
                var pointB = b2Math_5.b2Transform.MulXV(xfB, localPointB, b2TimeOfImpact_s_pointB);
                b2Math_5.b2Vec2.SubVV(pointB, pointA, this.m_axis);
                var s = this.m_axis.Normalize();
                this.m_localPoint.SetZero();
                return s;
            }
            else if (cache.indexA[0] === cache.indexA[1]) {
                this.m_type = b2SeparationFunctionType.e_faceB;
                var localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
                var localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
                b2Math_5.b2Vec2.CrossVOne(b2Math_5.b2Vec2.SubVV(localPointB2, localPointB1, b2Math_5.b2Vec2.s_t0), this.m_axis).SelfNormalize();
                var normal = b2Math_5.b2Rot.MulRV(xfB.q, this.m_axis, b2TimeOfImpact_s_normal);
                b2Math_5.b2Vec2.MidVV(localPointB1, localPointB2, this.m_localPoint);
                var pointB = b2Math_5.b2Transform.MulXV(xfB, this.m_localPoint, b2TimeOfImpact_s_pointB);
                var localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
                var pointA = b2Math_5.b2Transform.MulXV(xfA, localPointA, b2TimeOfImpact_s_pointA);
                var s = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointA, pointB, b2Math_5.b2Vec2.s_t0), normal);
                if (s < 0) {
                    this.m_axis.SelfNeg();
                    s = -s;
                }
                return s;
            }
            else {
                this.m_type = b2SeparationFunctionType.e_faceA;
                var localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
                var localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
                b2Math_5.b2Vec2.CrossVOne(b2Math_5.b2Vec2.SubVV(localPointA2, localPointA1, b2Math_5.b2Vec2.s_t0), this.m_axis).SelfNormalize();
                var normal = b2Math_5.b2Rot.MulRV(xfA.q, this.m_axis, b2TimeOfImpact_s_normal);
                b2Math_5.b2Vec2.MidVV(localPointA1, localPointA2, this.m_localPoint);
                var pointA = b2Math_5.b2Transform.MulXV(xfA, this.m_localPoint, b2TimeOfImpact_s_pointA);
                var localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
                var pointB = b2Math_5.b2Transform.MulXV(xfB, localPointB, b2TimeOfImpact_s_pointB);
                var s = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointB, pointA, b2Math_5.b2Vec2.s_t0), normal);
                if (s < 0) {
                    this.m_axis.SelfNeg();
                    s = -s;
                }
                return s;
            }
        };
        b2SeparationFunction.prototype.FindMinSeparation = function (indexA, indexB, t) {
            var xfA = b2TimeOfImpact_s_xfA;
            var xfB = b2TimeOfImpact_s_xfB;
            this.m_sweepA.GetTransform(xfA, t);
            this.m_sweepB.GetTransform(xfB, t);
            switch (this.m_type) {
                case b2SeparationFunctionType.e_points: {
                    var axisA = b2Math_5.b2Rot.MulTRV(xfA.q, this.m_axis, b2TimeOfImpact_s_axisA);
                    var axisB = b2Math_5.b2Rot.MulTRV(xfB.q, b2Math_5.b2Vec2.NegV(this.m_axis, b2Math_5.b2Vec2.s_t0), b2TimeOfImpact_s_axisB);
                    indexA[0] = this.m_proxyA.GetSupport(axisA);
                    indexB[0] = this.m_proxyB.GetSupport(axisB);
                    var localPointA = this.m_proxyA.GetVertex(indexA[0]);
                    var localPointB = this.m_proxyB.GetVertex(indexB[0]);
                    var pointA = b2Math_5.b2Transform.MulXV(xfA, localPointA, b2TimeOfImpact_s_pointA);
                    var pointB = b2Math_5.b2Transform.MulXV(xfB, localPointB, b2TimeOfImpact_s_pointB);
                    var separation = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointB, pointA, b2Math_5.b2Vec2.s_t0), this.m_axis);
                    return separation;
                }
                case b2SeparationFunctionType.e_faceA: {
                    var normal = b2Math_5.b2Rot.MulRV(xfA.q, this.m_axis, b2TimeOfImpact_s_normal);
                    var pointA = b2Math_5.b2Transform.MulXV(xfA, this.m_localPoint, b2TimeOfImpact_s_pointA);
                    var axisB = b2Math_5.b2Rot.MulTRV(xfB.q, b2Math_5.b2Vec2.NegV(normal, b2Math_5.b2Vec2.s_t0), b2TimeOfImpact_s_axisB);
                    indexA[0] = -1;
                    indexB[0] = this.m_proxyB.GetSupport(axisB);
                    var localPointB = this.m_proxyB.GetVertex(indexB[0]);
                    var pointB = b2Math_5.b2Transform.MulXV(xfB, localPointB, b2TimeOfImpact_s_pointB);
                    var separation = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointB, pointA, b2Math_5.b2Vec2.s_t0), normal);
                    return separation;
                }
                case b2SeparationFunctionType.e_faceB: {
                    var normal = b2Math_5.b2Rot.MulRV(xfB.q, this.m_axis, b2TimeOfImpact_s_normal);
                    var pointB = b2Math_5.b2Transform.MulXV(xfB, this.m_localPoint, b2TimeOfImpact_s_pointB);
                    var axisA = b2Math_5.b2Rot.MulTRV(xfA.q, b2Math_5.b2Vec2.NegV(normal, b2Math_5.b2Vec2.s_t0), b2TimeOfImpact_s_axisA);
                    indexB[0] = -1;
                    indexA[0] = this.m_proxyA.GetSupport(axisA);
                    var localPointA = this.m_proxyA.GetVertex(indexA[0]);
                    var pointA = b2Math_5.b2Transform.MulXV(xfA, localPointA, b2TimeOfImpact_s_pointA);
                    var separation = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointA, pointB, b2Math_5.b2Vec2.s_t0), normal);
                    return separation;
                }
                default:
                    indexA[0] = -1;
                    indexB[0] = -1;
                    return 0;
            }
        };
        b2SeparationFunction.prototype.Evaluate = function (indexA, indexB, t) {
            var xfA = b2TimeOfImpact_s_xfA;
            var xfB = b2TimeOfImpact_s_xfB;
            this.m_sweepA.GetTransform(xfA, t);
            this.m_sweepB.GetTransform(xfB, t);
            switch (this.m_type) {
                case b2SeparationFunctionType.e_points: {
                    var localPointA = this.m_proxyA.GetVertex(indexA);
                    var localPointB = this.m_proxyB.GetVertex(indexB);
                    var pointA = b2Math_5.b2Transform.MulXV(xfA, localPointA, b2TimeOfImpact_s_pointA);
                    var pointB = b2Math_5.b2Transform.MulXV(xfB, localPointB, b2TimeOfImpact_s_pointB);
                    var separation = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointB, pointA, b2Math_5.b2Vec2.s_t0), this.m_axis);
                    return separation;
                }
                case b2SeparationFunctionType.e_faceA: {
                    var normal = b2Math_5.b2Rot.MulRV(xfA.q, this.m_axis, b2TimeOfImpact_s_normal);
                    var pointA = b2Math_5.b2Transform.MulXV(xfA, this.m_localPoint, b2TimeOfImpact_s_pointA);
                    var localPointB = this.m_proxyB.GetVertex(indexB);
                    var pointB = b2Math_5.b2Transform.MulXV(xfB, localPointB, b2TimeOfImpact_s_pointB);
                    var separation = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointB, pointA, b2Math_5.b2Vec2.s_t0), normal);
                    return separation;
                }
                case b2SeparationFunctionType.e_faceB: {
                    var normal = b2Math_5.b2Rot.MulRV(xfB.q, this.m_axis, b2TimeOfImpact_s_normal);
                    var pointB = b2Math_5.b2Transform.MulXV(xfB, this.m_localPoint, b2TimeOfImpact_s_pointB);
                    var localPointA = this.m_proxyA.GetVertex(indexA);
                    var pointA = b2Math_5.b2Transform.MulXV(xfA, localPointA, b2TimeOfImpact_s_pointA);
                    var separation = b2Math_5.b2Vec2.DotVV(b2Math_5.b2Vec2.SubVV(pointA, pointB, b2Math_5.b2Vec2.s_t0), normal);
                    return separation;
                }
                default:
                    return 0;
            }
        };
        return b2SeparationFunction;
    }());
    exports.b2SeparationFunction = b2SeparationFunction;
    var b2TimeOfImpact_s_timer = new b2Timer_1.b2Timer();
    var b2TimeOfImpact_s_cache = new b2Distance_2.b2SimplexCache();
    var b2TimeOfImpact_s_distanceInput = new b2Distance_2.b2DistanceInput();
    var b2TimeOfImpact_s_distanceOutput = new b2Distance_2.b2DistanceOutput();
    var b2TimeOfImpact_s_fcn = new b2SeparationFunction();
    var b2TimeOfImpact_s_indexA = [0];
    var b2TimeOfImpact_s_indexB = [0];
    var b2TimeOfImpact_s_sweepA = new b2Math_5.b2Sweep();
    var b2TimeOfImpact_s_sweepB = new b2Math_5.b2Sweep();
    function b2TimeOfImpact(output, input) {
        var timer = b2TimeOfImpact_s_timer.Reset();
        ++exports.b2_toiCalls;
        output.state = b2TOIOutputState.e_unknown;
        output.t = input.tMax;
        var proxyA = input.proxyA;
        var proxyB = input.proxyB;
        var sweepA = b2TimeOfImpact_s_sweepA.Copy(input.sweepA);
        var sweepB = b2TimeOfImpact_s_sweepB.Copy(input.sweepB);
        sweepA.Normalize();
        sweepB.Normalize();
        var tMax = input.tMax;
        var totalRadius = proxyA.m_radius + proxyB.m_radius;
        var target = b2Math_5.b2Max(b2Settings_6.b2_linearSlop, totalRadius - 3 * b2Settings_6.b2_linearSlop);
        var tolerance = 0.25 * b2Settings_6.b2_linearSlop;
        var t1 = 0;
        var k_maxIterations = 20;
        var iter = 0;
        var cache = b2TimeOfImpact_s_cache;
        cache.count = 0;
        var distanceInput = b2TimeOfImpact_s_distanceInput;
        distanceInput.proxyA = input.proxyA;
        distanceInput.proxyB = input.proxyB;
        distanceInput.useRadii = false;
        for (;;) {
            var xfA = b2TimeOfImpact_s_xfA;
            var xfB = b2TimeOfImpact_s_xfB;
            sweepA.GetTransform(xfA, t1);
            sweepB.GetTransform(xfB, t1);
            distanceInput.transformA.Copy(xfA);
            distanceInput.transformB.Copy(xfB);
            var distanceOutput = b2TimeOfImpact_s_distanceOutput;
            b2Distance_2.b2Distance(distanceOutput, cache, distanceInput);
            if (distanceOutput.distance <= 0) {
                output.state = b2TOIOutputState.e_overlapped;
                output.t = 0;
                break;
            }
            if (distanceOutput.distance < target + tolerance) {
                output.state = b2TOIOutputState.e_touching;
                output.t = t1;
                break;
            }
            var fcn = b2TimeOfImpact_s_fcn;
            fcn.Initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
            var done = false;
            var t2 = tMax;
            var pushBackIter = 0;
            for (;;) {
                var indexA = b2TimeOfImpact_s_indexA;
                var indexB = b2TimeOfImpact_s_indexB;
                var s2 = fcn.FindMinSeparation(indexA, indexB, t2);
                if (s2 > (target + tolerance)) {
                    output.state = b2TOIOutputState.e_separated;
                    output.t = tMax;
                    done = true;
                    break;
                }
                if (s2 > (target - tolerance)) {
                    t1 = t2;
                    break;
                }
                var s1 = fcn.Evaluate(indexA[0], indexB[0], t1);
                if (s1 < (target - tolerance)) {
                    output.state = b2TOIOutputState.e_failed;
                    output.t = t1;
                    done = true;
                    break;
                }
                if (s1 <= (target + tolerance)) {
                    output.state = b2TOIOutputState.e_touching;
                    output.t = t1;
                    done = true;
                    break;
                }
                var rootIterCount = 0;
                var a1 = t1;
                var a2 = t2;
                for (;;) {
                    var t = 0;
                    if (rootIterCount & 1) {
                        t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
                    }
                    else {
                        t = 0.5 * (a1 + a2);
                    }
                    ++rootIterCount;
                    ++exports.b2_toiRootIters;
                    var s = fcn.Evaluate(indexA[0], indexB[0], t);
                    if (b2Math_5.b2Abs(s - target) < tolerance) {
                        t2 = t;
                        break;
                    }
                    if (s > target) {
                        a1 = t;
                        s1 = s;
                    }
                    else {
                        a2 = t;
                        s2 = s;
                    }
                    if (rootIterCount === 50) {
                        break;
                    }
                }
                exports.b2_toiMaxRootIters = b2Math_5.b2Max(exports.b2_toiMaxRootIters, rootIterCount);
                ++pushBackIter;
                if (pushBackIter === b2Settings_6.b2_maxPolygonVertices) {
                    break;
                }
            }
            ++iter;
            ++exports.b2_toiIters;
            if (done) {
                break;
            }
            if (iter === k_maxIterations) {
                output.state = b2TOIOutputState.e_failed;
                output.t = t1;
                break;
            }
        }
        exports.b2_toiMaxIters = b2Math_5.b2Max(exports.b2_toiMaxIters, iter);
        var time = timer.GetMilliseconds();
        exports.b2_toiMaxTime = b2Math_5.b2Max(exports.b2_toiMaxTime, time);
        exports.b2_toiTime += time;
    }
    exports.b2TimeOfImpact = b2TimeOfImpact;
});
define("Collision/Shapes/b2CircleShape", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/Shapes/b2Shape"], function (require, exports, b2Settings_7, b2Math_6, b2Shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2CircleShape = (function (_super) {
        __extends(b2CircleShape, _super);
        function b2CircleShape(radius) {
            if (radius === void 0) { radius = 0; }
            var _this = _super.call(this, b2Shape_1.b2ShapeType.e_circleShape, radius) || this;
            _this.m_p = new b2Math_6.b2Vec2();
            return _this;
        }
        b2CircleShape.prototype.Set = function (position, radius) {
            if (radius === void 0) { radius = this.m_radius; }
            this.m_p.Copy(position);
            this.m_radius = radius;
            return this;
        };
        b2CircleShape.prototype.Clone = function () {
            return new b2CircleShape().Copy(this);
        };
        b2CircleShape.prototype.Copy = function (other) {
            _super.prototype.Copy.call(this, other);
            this.m_p.Copy(other.m_p);
            return this;
        };
        b2CircleShape.prototype.GetChildCount = function () {
            return 1;
        };
        b2CircleShape.prototype.TestPoint = function (transform, p) {
            var center = b2Math_6.b2Transform.MulXV(transform, this.m_p, b2CircleShape.TestPoint_s_center);
            var d = b2Math_6.b2Vec2.SubVV(p, center, b2CircleShape.TestPoint_s_d);
            return b2Math_6.b2Vec2.DotVV(d, d) <= b2Math_6.b2Sq(this.m_radius);
        };
        b2CircleShape.prototype.ComputeDistance = function (xf, p, normal, childIndex) {
            var center = b2Math_6.b2Transform.MulXV(xf, this.m_p, b2CircleShape.ComputeDistance_s_center);
            b2Math_6.b2Vec2.SubVV(p, center, normal);
            return normal.Normalize() - this.m_radius;
        };
        b2CircleShape.prototype.RayCast = function (output, input, transform, childIndex) {
            var position = b2Math_6.b2Transform.MulXV(transform, this.m_p, b2CircleShape.RayCast_s_position);
            var s = b2Math_6.b2Vec2.SubVV(input.p1, position, b2CircleShape.RayCast_s_s);
            var b = b2Math_6.b2Vec2.DotVV(s, s) - b2Math_6.b2Sq(this.m_radius);
            var r = b2Math_6.b2Vec2.SubVV(input.p2, input.p1, b2CircleShape.RayCast_s_r);
            var c = b2Math_6.b2Vec2.DotVV(s, r);
            var rr = b2Math_6.b2Vec2.DotVV(r, r);
            var sigma = c * c - rr * b;
            if (sigma < 0 || rr < b2Settings_7.b2_epsilon) {
                return false;
            }
            var a = (-(c + b2Math_6.b2Sqrt(sigma)));
            if (0 <= a && a <= input.maxFraction * rr) {
                a /= rr;
                output.fraction = a;
                b2Math_6.b2Vec2.AddVMulSV(s, a, r, output.normal).SelfNormalize();
                return true;
            }
            return false;
        };
        b2CircleShape.prototype.ComputeAABB = function (aabb, transform, childIndex) {
            var p = b2Math_6.b2Transform.MulXV(transform, this.m_p, b2CircleShape.ComputeAABB_s_p);
            aabb.lowerBound.Set(p.x - this.m_radius, p.y - this.m_radius);
            aabb.upperBound.Set(p.x + this.m_radius, p.y + this.m_radius);
        };
        b2CircleShape.prototype.ComputeMass = function (massData, density) {
            var radius_sq = b2Math_6.b2Sq(this.m_radius);
            massData.mass = density * b2Settings_7.b2_pi * radius_sq;
            massData.center.Copy(this.m_p);
            massData.I = massData.mass * (0.5 * radius_sq + b2Math_6.b2Vec2.DotVV(this.m_p, this.m_p));
        };
        b2CircleShape.prototype.SetupDistanceProxy = function (proxy, index) {
            proxy.m_vertices = proxy.m_buffer;
            proxy.m_vertices[0].Copy(this.m_p);
            proxy.m_count = 1;
            proxy.m_radius = this.m_radius;
        };
        b2CircleShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
            var p = b2Math_6.b2Transform.MulXV(xf, this.m_p, new b2Math_6.b2Vec2());
            var l = (-(b2Math_6.b2Vec2.DotVV(normal, p) - offset));
            if (l < (-this.m_radius) + b2Settings_7.b2_epsilon) {
                return 0;
            }
            if (l > this.m_radius) {
                c.Copy(p);
                return b2Settings_7.b2_pi * this.m_radius * this.m_radius;
            }
            var r2 = this.m_radius * this.m_radius;
            var l2 = l * l;
            var area = r2 * (b2Math_6.b2Asin(l / this.m_radius) + b2Settings_7.b2_pi / 2) + l * b2Math_6.b2Sqrt(r2 - l2);
            var com = (-2 / 3 * b2Math_6.b2Pow(r2 - l2, 1.5) / area);
            c.x = p.x + normal.x * com;
            c.y = p.y + normal.y * com;
            return area;
        };
        b2CircleShape.prototype.Dump = function (log) {
            log("    const shape: b2CircleShape = new b2CircleShape();\n");
            log("    shape.m_radius = %.15f;\n", this.m_radius);
            log("    shape.m_p.Set(%.15f, %.15f);\n", this.m_p.x, this.m_p.y);
        };
        b2CircleShape.TestPoint_s_center = new b2Math_6.b2Vec2();
        b2CircleShape.TestPoint_s_d = new b2Math_6.b2Vec2();
        b2CircleShape.ComputeDistance_s_center = new b2Math_6.b2Vec2();
        b2CircleShape.RayCast_s_position = new b2Math_6.b2Vec2();
        b2CircleShape.RayCast_s_s = new b2Math_6.b2Vec2();
        b2CircleShape.RayCast_s_r = new b2Math_6.b2Vec2();
        b2CircleShape.ComputeAABB_s_p = new b2Math_6.b2Vec2();
        return b2CircleShape;
    }(b2Shape_1.b2Shape));
    exports.b2CircleShape = b2CircleShape;
});
define("Collision/Shapes/b2PolygonShape", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/Shapes/b2Shape", "Collision/Shapes/b2Shape"], function (require, exports, b2Settings_8, b2Math_7, b2Shape_2, b2Shape_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2PolygonShape = (function (_super) {
        __extends(b2PolygonShape, _super);
        function b2PolygonShape() {
            var _this = _super.call(this, b2Shape_3.b2ShapeType.e_polygonShape, b2Settings_8.b2_polygonRadius) || this;
            _this.m_centroid = new b2Math_7.b2Vec2(0, 0);
            _this.m_vertices = [];
            _this.m_normals = [];
            _this.m_count = 0;
            return _this;
        }
        b2PolygonShape.prototype.Clone = function () {
            return new b2PolygonShape().Copy(this);
        };
        b2PolygonShape.prototype.Copy = function (other) {
            _super.prototype.Copy.call(this, other);
            this.m_centroid.Copy(other.m_centroid);
            this.m_count = other.m_count;
            this.m_vertices = b2Math_7.b2Vec2.MakeArray(this.m_count);
            this.m_normals = b2Math_7.b2Vec2.MakeArray(this.m_count);
            for (var i = 0; i < this.m_count; ++i) {
                this.m_vertices[i].Copy(other.m_vertices[i]);
                this.m_normals[i].Copy(other.m_normals[i]);
            }
            return this;
        };
        b2PolygonShape.prototype.GetChildCount = function () {
            return 1;
        };
        b2PolygonShape.prototype.Set = function (vertices, count, start) {
            if (count === void 0) { count = vertices.length; }
            if (start === void 0) { start = 0; }
            if (count < 3) {
                return this.SetAsBox(1, 1);
            }
            var n = b2Math_7.b2Min(count, b2Settings_8.b2_maxPolygonVertices);
            var ps = b2PolygonShape.Set_s_ps;
            var tempCount = 0;
            for (var i = 0; i < n; ++i) {
                var v = vertices[start + i];
                var unique = true;
                for (var j = 0; j < tempCount; ++j) {
                    if (b2Math_7.b2Vec2.DistanceSquaredVV(v, ps[j]) < ((0.5 * b2Settings_8.b2_linearSlop) * (0.5 * b2Settings_8.b2_linearSlop))) {
                        unique = false;
                        break;
                    }
                }
                if (unique) {
                    ps[tempCount++].Copy(v);
                }
            }
            n = tempCount;
            if (n < 3) {
                return this.SetAsBox(1.0, 1.0);
            }
            var i0 = 0;
            var x0 = ps[0].x;
            for (var i = 1; i < n; ++i) {
                var x = ps[i].x;
                if (x > x0 || (x === x0 && ps[i].y < ps[i0].y)) {
                    i0 = i;
                    x0 = x;
                }
            }
            var hull = b2PolygonShape.Set_s_hull;
            var m = 0;
            var ih = i0;
            for (;;) {
                hull[m] = ih;
                var ie = 0;
                for (var j = 1; j < n; ++j) {
                    if (ie === ih) {
                        ie = j;
                        continue;
                    }
                    var r = b2Math_7.b2Vec2.SubVV(ps[ie], ps[hull[m]], b2PolygonShape.Set_s_r);
                    var v = b2Math_7.b2Vec2.SubVV(ps[j], ps[hull[m]], b2PolygonShape.Set_s_v);
                    var c = b2Math_7.b2Vec2.CrossVV(r, v);
                    if (c < 0) {
                        ie = j;
                    }
                    if (c === 0 && v.LengthSquared() > r.LengthSquared()) {
                        ie = j;
                    }
                }
                ++m;
                ih = ie;
                if (ie === i0) {
                    break;
                }
            }
            this.m_count = m;
            this.m_vertices = b2Math_7.b2Vec2.MakeArray(this.m_count);
            this.m_normals = b2Math_7.b2Vec2.MakeArray(this.m_count);
            for (var i = 0; i < m; ++i) {
                this.m_vertices[i].Copy(ps[hull[i]]);
            }
            for (var i = 0; i < m; ++i) {
                var vertexi1 = this.m_vertices[i];
                var vertexi2 = this.m_vertices[(i + 1) % m];
                var edge = b2Math_7.b2Vec2.SubVV(vertexi2, vertexi1, b2Math_7.b2Vec2.s_t0);
                b2Math_7.b2Vec2.CrossVOne(edge, this.m_normals[i]).SelfNormalize();
            }
            b2PolygonShape.ComputeCentroid(this.m_vertices, m, this.m_centroid);
            return this;
        };
        b2PolygonShape.prototype.SetAsArray = function (vertices, count) {
            if (count === void 0) { count = vertices.length; }
            return this.Set(vertices, count);
        };
        b2PolygonShape.prototype.SetAsBox = function (hx, hy, center, angle) {
            if (angle === void 0) { angle = 0; }
            this.m_count = 4;
            this.m_vertices = b2Math_7.b2Vec2.MakeArray(this.m_count);
            this.m_normals = b2Math_7.b2Vec2.MakeArray(this.m_count);
            this.m_vertices[0].Set((-hx), (-hy));
            this.m_vertices[1].Set(hx, (-hy));
            this.m_vertices[2].Set(hx, hy);
            this.m_vertices[3].Set((-hx), hy);
            this.m_normals[0].Set(0, (-1));
            this.m_normals[1].Set(1, 0);
            this.m_normals[2].Set(0, 1);
            this.m_normals[3].Set((-1), 0);
            this.m_centroid.SetZero();
            if (center) {
                this.m_centroid.Copy(center);
                var xf = new b2Math_7.b2Transform();
                xf.SetPosition(center);
                xf.SetRotationAngle(angle);
                for (var i = 0; i < this.m_count; ++i) {
                    b2Math_7.b2Transform.MulXV(xf, this.m_vertices[i], this.m_vertices[i]);
                    b2Math_7.b2Rot.MulRV(xf.q, this.m_normals[i], this.m_normals[i]);
                }
            }
            return this;
        };
        b2PolygonShape.prototype.TestPoint = function (xf, p) {
            var pLocal = b2Math_7.b2Transform.MulTXV(xf, p, b2PolygonShape.TestPoint_s_pLocal);
            for (var i = 0; i < this.m_count; ++i) {
                var dot = b2Math_7.b2Vec2.DotVV(this.m_normals[i], b2Math_7.b2Vec2.SubVV(pLocal, this.m_vertices[i], b2Math_7.b2Vec2.s_t0));
                if (dot > 0) {
                    return false;
                }
            }
            return true;
        };
        b2PolygonShape.prototype.ComputeDistance = function (xf, p, normal, childIndex) {
            var pLocal = b2Math_7.b2Transform.MulTXV(xf, p, b2PolygonShape.ComputeDistance_s_pLocal);
            var maxDistance = -b2Settings_8.b2_maxFloat;
            var normalForMaxDistance = b2PolygonShape.ComputeDistance_s_normalForMaxDistance.Copy(pLocal);
            for (var i = 0; i < this.m_count; ++i) {
                var dot = b2Math_7.b2Vec2.DotVV(this.m_normals[i], b2Math_7.b2Vec2.SubVV(pLocal, this.m_vertices[i], b2Math_7.b2Vec2.s_t0));
                if (dot > maxDistance) {
                    maxDistance = dot;
                    normalForMaxDistance.Copy(this.m_normals[i]);
                }
            }
            if (maxDistance > 0) {
                var minDistance = b2PolygonShape.ComputeDistance_s_minDistance.Copy(normalForMaxDistance);
                var minDistance2 = maxDistance * maxDistance;
                for (var i = 0; i < this.m_count; ++i) {
                    var distance = b2Math_7.b2Vec2.SubVV(pLocal, this.m_vertices[i], b2PolygonShape.ComputeDistance_s_distance);
                    var distance2 = distance.LengthSquared();
                    if (minDistance2 > distance2) {
                        minDistance.Copy(distance);
                        minDistance2 = distance2;
                    }
                }
                b2Math_7.b2Rot.MulRV(xf.q, minDistance, normal);
                normal.Normalize();
                return Math.sqrt(minDistance2);
            }
            else {
                b2Math_7.b2Rot.MulRV(xf.q, normalForMaxDistance, normal);
                return maxDistance;
            }
        };
        b2PolygonShape.prototype.RayCast = function (output, input, xf, childIndex) {
            var p1 = b2Math_7.b2Transform.MulTXV(xf, input.p1, b2PolygonShape.RayCast_s_p1);
            var p2 = b2Math_7.b2Transform.MulTXV(xf, input.p2, b2PolygonShape.RayCast_s_p2);
            var d = b2Math_7.b2Vec2.SubVV(p2, p1, b2PolygonShape.RayCast_s_d);
            var lower = 0, upper = input.maxFraction;
            var index = -1;
            for (var i = 0; i < this.m_count; ++i) {
                var numerator = b2Math_7.b2Vec2.DotVV(this.m_normals[i], b2Math_7.b2Vec2.SubVV(this.m_vertices[i], p1, b2Math_7.b2Vec2.s_t0));
                var denominator = b2Math_7.b2Vec2.DotVV(this.m_normals[i], d);
                if (denominator === 0) {
                    if (numerator < 0) {
                        return false;
                    }
                }
                else {
                    if (denominator < 0 && numerator < lower * denominator) {
                        lower = numerator / denominator;
                        index = i;
                    }
                    else if (denominator > 0 && numerator < upper * denominator) {
                        upper = numerator / denominator;
                    }
                }
                if (upper < lower) {
                    return false;
                }
            }
            if (index >= 0) {
                output.fraction = lower;
                b2Math_7.b2Rot.MulRV(xf.q, this.m_normals[index], output.normal);
                return true;
            }
            return false;
        };
        b2PolygonShape.prototype.ComputeAABB = function (aabb, xf, childIndex) {
            var lower = b2Math_7.b2Transform.MulXV(xf, this.m_vertices[0], aabb.lowerBound);
            var upper = aabb.upperBound.Copy(lower);
            for (var i = 0; i < this.m_count; ++i) {
                var v = b2Math_7.b2Transform.MulXV(xf, this.m_vertices[i], b2PolygonShape.ComputeAABB_s_v);
                b2Math_7.b2Vec2.MinV(v, lower, lower);
                b2Math_7.b2Vec2.MaxV(v, upper, upper);
            }
            var r = this.m_radius;
            lower.SelfSubXY(r, r);
            upper.SelfAddXY(r, r);
        };
        b2PolygonShape.prototype.ComputeMass = function (massData, density) {
            var center = b2PolygonShape.ComputeMass_s_center.SetZero();
            var area = 0;
            var I = 0;
            var s = b2PolygonShape.ComputeMass_s_s.SetZero();
            for (var i = 0; i < this.m_count; ++i) {
                s.SelfAdd(this.m_vertices[i]);
            }
            s.SelfMul(1 / this.m_count);
            var k_inv3 = 1 / 3;
            for (var i = 0; i < this.m_count; ++i) {
                var e1 = b2Math_7.b2Vec2.SubVV(this.m_vertices[i], s, b2PolygonShape.ComputeMass_s_e1);
                var e2 = b2Math_7.b2Vec2.SubVV(this.m_vertices[(i + 1) % this.m_count], s, b2PolygonShape.ComputeMass_s_e2);
                var D = b2Math_7.b2Vec2.CrossVV(e1, e2);
                var triangleArea = 0.5 * D;
                area += triangleArea;
                center.SelfAdd(b2Math_7.b2Vec2.MulSV(triangleArea * k_inv3, b2Math_7.b2Vec2.AddVV(e1, e2, b2Math_7.b2Vec2.s_t0), b2Math_7.b2Vec2.s_t1));
                var ex1 = e1.x;
                var ey1 = e1.y;
                var ex2 = e2.x;
                var ey2 = e2.y;
                var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
                var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
                I += (0.25 * k_inv3 * D) * (intx2 + inty2);
            }
            massData.mass = density * area;
            center.SelfMul(1 / area);
            b2Math_7.b2Vec2.AddVV(center, s, massData.center);
            massData.I = density * I;
            massData.I += massData.mass * (b2Math_7.b2Vec2.DotVV(massData.center, massData.center) - b2Math_7.b2Vec2.DotVV(center, center));
        };
        b2PolygonShape.prototype.Validate = function () {
            for (var i = 0; i < this.m_count; ++i) {
                var i1 = i;
                var i2 = (i + 1) % this.m_count;
                var p = this.m_vertices[i1];
                var e = b2Math_7.b2Vec2.SubVV(this.m_vertices[i2], p, b2PolygonShape.Validate_s_e);
                for (var j = 0; j < this.m_count; ++j) {
                    if (j === i1 || j === i2) {
                        continue;
                    }
                    var v = b2Math_7.b2Vec2.SubVV(this.m_vertices[j], p, b2PolygonShape.Validate_s_v);
                    var c = b2Math_7.b2Vec2.CrossVV(e, v);
                    if (c < 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        b2PolygonShape.prototype.SetupDistanceProxy = function (proxy, index) {
            proxy.m_vertices = this.m_vertices;
            proxy.m_count = this.m_count;
            proxy.m_radius = this.m_radius;
        };
        b2PolygonShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
            var normalL = b2Math_7.b2Rot.MulTRV(xf.q, normal, b2PolygonShape.ComputeSubmergedArea_s_normalL);
            var offsetL = offset - b2Math_7.b2Vec2.DotVV(normal, xf.p);
            var depths = b2PolygonShape.ComputeSubmergedArea_s_depths;
            var diveCount = 0;
            var intoIndex = -1;
            var outoIndex = -1;
            var lastSubmerged = false;
            for (var i_2 = 0; i_2 < this.m_count; ++i_2) {
                depths[i_2] = b2Math_7.b2Vec2.DotVV(normalL, this.m_vertices[i_2]) - offsetL;
                var isSubmerged = depths[i_2] < (-b2Settings_8.b2_epsilon);
                if (i_2 > 0) {
                    if (isSubmerged) {
                        if (!lastSubmerged) {
                            intoIndex = i_2 - 1;
                            diveCount++;
                        }
                    }
                    else {
                        if (lastSubmerged) {
                            outoIndex = i_2 - 1;
                            diveCount++;
                        }
                    }
                }
                lastSubmerged = isSubmerged;
            }
            switch (diveCount) {
                case 0:
                    if (lastSubmerged) {
                        var md = b2PolygonShape.ComputeSubmergedArea_s_md;
                        this.ComputeMass(md, 1);
                        b2Math_7.b2Transform.MulXV(xf, md.center, c);
                        return md.mass;
                    }
                    else {
                        return 0;
                    }
                case 1:
                    if (intoIndex === (-1)) {
                        intoIndex = this.m_count - 1;
                    }
                    else {
                        outoIndex = this.m_count - 1;
                    }
                    break;
            }
            var intoIndex2 = ((intoIndex + 1) % this.m_count);
            var outoIndex2 = ((outoIndex + 1) % this.m_count);
            var intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
            var outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
            var intoVec = b2PolygonShape.ComputeSubmergedArea_s_intoVec.Set(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda, this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
            var outoVec = b2PolygonShape.ComputeSubmergedArea_s_outoVec.Set(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda, this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
            var area = 0;
            var center = b2PolygonShape.ComputeSubmergedArea_s_center.SetZero();
            var p2 = this.m_vertices[intoIndex2];
            var p3;
            var i = intoIndex2;
            while (i !== outoIndex2) {
                i = (i + 1) % this.m_count;
                if (i === outoIndex2) {
                    p3 = outoVec;
                }
                else {
                    p3 = this.m_vertices[i];
                }
                var triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
                area += triangleArea;
                center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
                center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
                p2 = p3;
            }
            center.SelfMul(1 / area);
            b2Math_7.b2Transform.MulXV(xf, center, c);
            return area;
        };
        b2PolygonShape.prototype.Dump = function (log) {
            log("    const shape: b2PolygonShape = new b2PolygonShape();\n");
            log("    const vs: b2Vec2[] = b2Vec2.MakeArray(%d);\n", b2Settings_8.b2_maxPolygonVertices);
            for (var i = 0; i < this.m_count; ++i) {
                log("    vs[%d].Set(%.15f, %.15f);\n", i, this.m_vertices[i].x, this.m_vertices[i].y);
            }
            log("    shape.Set(vs, %d);\n", this.m_count);
        };
        b2PolygonShape.ComputeCentroid = function (vs, count, out) {
            var c = out;
            c.SetZero();
            var area = 0;
            var pRef = b2PolygonShape.ComputeCentroid_s_pRef.SetZero();
            var inv3 = 1 / 3;
            for (var i = 0; i < count; ++i) {
                var p1 = pRef;
                var p2 = vs[i];
                var p3 = vs[(i + 1) % count];
                var e1 = b2Math_7.b2Vec2.SubVV(p2, p1, b2PolygonShape.ComputeCentroid_s_e1);
                var e2 = b2Math_7.b2Vec2.SubVV(p3, p1, b2PolygonShape.ComputeCentroid_s_e2);
                var D = b2Math_7.b2Vec2.CrossVV(e1, e2);
                var triangleArea = 0.5 * D;
                area += triangleArea;
                c.x += triangleArea * inv3 * (p1.x + p2.x + p3.x);
                c.y += triangleArea * inv3 * (p1.y + p2.y + p3.y);
            }
            c.SelfMul(1 / area);
            return c;
        };
        b2PolygonShape.Set_s_ps = b2Math_7.b2Vec2.MakeArray(b2Settings_8.b2_maxPolygonVertices);
        b2PolygonShape.Set_s_hull = b2Settings_8.b2MakeNumberArray(b2Settings_8.b2_maxPolygonVertices);
        b2PolygonShape.Set_s_r = new b2Math_7.b2Vec2();
        b2PolygonShape.Set_s_v = new b2Math_7.b2Vec2();
        b2PolygonShape.TestPoint_s_pLocal = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeDistance_s_pLocal = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeDistance_s_normalForMaxDistance = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeDistance_s_minDistance = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeDistance_s_distance = new b2Math_7.b2Vec2();
        b2PolygonShape.RayCast_s_p1 = new b2Math_7.b2Vec2();
        b2PolygonShape.RayCast_s_p2 = new b2Math_7.b2Vec2();
        b2PolygonShape.RayCast_s_d = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeAABB_s_v = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeMass_s_center = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeMass_s_s = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeMass_s_e1 = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeMass_s_e2 = new b2Math_7.b2Vec2();
        b2PolygonShape.Validate_s_e = new b2Math_7.b2Vec2();
        b2PolygonShape.Validate_s_v = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeSubmergedArea_s_normalL = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeSubmergedArea_s_depths = b2Settings_8.b2MakeNumberArray(b2Settings_8.b2_maxPolygonVertices);
        b2PolygonShape.ComputeSubmergedArea_s_md = new b2Shape_2.b2MassData();
        b2PolygonShape.ComputeSubmergedArea_s_intoVec = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeSubmergedArea_s_outoVec = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeSubmergedArea_s_center = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeCentroid_s_pRef = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeCentroid_s_e1 = new b2Math_7.b2Vec2();
        b2PolygonShape.ComputeCentroid_s_e2 = new b2Math_7.b2Vec2();
        return b2PolygonShape;
    }(b2Shape_3.b2Shape));
    exports.b2PolygonShape = b2PolygonShape;
});
define("Collision/b2CollideCircle", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/b2Collision"], function (require, exports, b2Settings_9, b2Math_8, b2Collision_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2CollideCircles_s_pA = new b2Math_8.b2Vec2();
    var b2CollideCircles_s_pB = new b2Math_8.b2Vec2();
    function b2CollideCircles(manifold, circleA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        var pA = b2Math_8.b2Transform.MulXV(xfA, circleA.m_p, b2CollideCircles_s_pA);
        var pB = b2Math_8.b2Transform.MulXV(xfB, circleB.m_p, b2CollideCircles_s_pB);
        var distSqr = b2Math_8.b2Vec2.DistanceSquaredVV(pA, pB);
        var radius = circleA.m_radius + circleB.m_radius;
        if (distSqr > radius * radius) {
            return;
        }
        manifold.type = b2Collision_2.b2ManifoldType.e_circles;
        manifold.localPoint.Copy(circleA.m_p);
        manifold.localNormal.SetZero();
        manifold.pointCount = 1;
        manifold.points[0].localPoint.Copy(circleB.m_p);
        manifold.points[0].id.key = 0;
    }
    exports.b2CollideCircles = b2CollideCircles;
    var b2CollidePolygonAndCircle_s_c = new b2Math_8.b2Vec2();
    var b2CollidePolygonAndCircle_s_cLocal = new b2Math_8.b2Vec2();
    var b2CollidePolygonAndCircle_s_faceCenter = new b2Math_8.b2Vec2();
    function b2CollidePolygonAndCircle(manifold, polygonA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        var c = b2Math_8.b2Transform.MulXV(xfB, circleB.m_p, b2CollidePolygonAndCircle_s_c);
        var cLocal = b2Math_8.b2Transform.MulTXV(xfA, c, b2CollidePolygonAndCircle_s_cLocal);
        var normalIndex = 0;
        var separation = (-b2Settings_9.b2_maxFloat);
        var radius = polygonA.m_radius + circleB.m_radius;
        var vertexCount = polygonA.m_count;
        var vertices = polygonA.m_vertices;
        var normals = polygonA.m_normals;
        for (var i = 0; i < vertexCount; ++i) {
            var s = b2Math_8.b2Vec2.DotVV(normals[i], b2Math_8.b2Vec2.SubVV(cLocal, vertices[i], b2Math_8.b2Vec2.s_t0));
            if (s > radius) {
                return;
            }
            if (s > separation) {
                separation = s;
                normalIndex = i;
            }
        }
        var vertIndex1 = normalIndex;
        var vertIndex2 = (vertIndex1 + 1) % vertexCount;
        var v1 = vertices[vertIndex1];
        var v2 = vertices[vertIndex2];
        if (separation < b2Settings_9.b2_epsilon) {
            manifold.pointCount = 1;
            manifold.type = b2Collision_2.b2ManifoldType.e_faceA;
            manifold.localNormal.Copy(normals[normalIndex]);
            b2Math_8.b2Vec2.MidVV(v1, v2, manifold.localPoint);
            manifold.points[0].localPoint.Copy(circleB.m_p);
            manifold.points[0].id.key = 0;
            return;
        }
        var u1 = b2Math_8.b2Vec2.DotVV(b2Math_8.b2Vec2.SubVV(cLocal, v1, b2Math_8.b2Vec2.s_t0), b2Math_8.b2Vec2.SubVV(v2, v1, b2Math_8.b2Vec2.s_t1));
        var u2 = b2Math_8.b2Vec2.DotVV(b2Math_8.b2Vec2.SubVV(cLocal, v2, b2Math_8.b2Vec2.s_t0), b2Math_8.b2Vec2.SubVV(v1, v2, b2Math_8.b2Vec2.s_t1));
        if (u1 <= 0) {
            if (b2Math_8.b2Vec2.DistanceSquaredVV(cLocal, v1) > radius * radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = b2Collision_2.b2ManifoldType.e_faceA;
            b2Math_8.b2Vec2.SubVV(cLocal, v1, manifold.localNormal).SelfNormalize();
            manifold.localPoint.Copy(v1);
            manifold.points[0].localPoint.Copy(circleB.m_p);
            manifold.points[0].id.key = 0;
        }
        else if (u2 <= 0) {
            if (b2Math_8.b2Vec2.DistanceSquaredVV(cLocal, v2) > radius * radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = b2Collision_2.b2ManifoldType.e_faceA;
            b2Math_8.b2Vec2.SubVV(cLocal, v2, manifold.localNormal).SelfNormalize();
            manifold.localPoint.Copy(v2);
            manifold.points[0].localPoint.Copy(circleB.m_p);
            manifold.points[0].id.key = 0;
        }
        else {
            var faceCenter = b2Math_8.b2Vec2.MidVV(v1, v2, b2CollidePolygonAndCircle_s_faceCenter);
            separation = b2Math_8.b2Vec2.DotVV(b2Math_8.b2Vec2.SubVV(cLocal, faceCenter, b2Math_8.b2Vec2.s_t1), normals[vertIndex1]);
            if (separation > radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = b2Collision_2.b2ManifoldType.e_faceA;
            manifold.localNormal.Copy(normals[vertIndex1]).SelfNormalize();
            manifold.localPoint.Copy(faceCenter);
            manifold.points[0].localPoint.Copy(circleB.m_p);
            manifold.points[0].id.key = 0;
        }
    }
    exports.b2CollidePolygonAndCircle = b2CollidePolygonAndCircle;
});
define("Collision/b2CollidePolygon", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/b2Collision", "Collision/b2Collision"], function (require, exports, b2Settings_10, b2Math_9, b2Collision_3, b2Collision_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2EdgeSeparation_s_normal1World = new b2Math_9.b2Vec2();
    var b2EdgeSeparation_s_normal1 = new b2Math_9.b2Vec2();
    var b2EdgeSeparation_s_v1 = new b2Math_9.b2Vec2();
    var b2EdgeSeparation_s_v2 = new b2Math_9.b2Vec2();
    function b2EdgeSeparation(poly1, xf1, edge1, poly2, xf2) {
        var vertices1 = poly1.m_vertices;
        var normals1 = poly1.m_normals;
        var count2 = poly2.m_count;
        var vertices2 = poly2.m_vertices;
        var normal1World = b2Math_9.b2Rot.MulRV(xf1.q, normals1[edge1], b2EdgeSeparation_s_normal1World);
        var normal1 = b2Math_9.b2Rot.MulTRV(xf2.q, normal1World, b2EdgeSeparation_s_normal1);
        var index = 0;
        var minDot = b2Settings_10.b2_maxFloat;
        for (var i = 0; i < count2; ++i) {
            var dot = b2Math_9.b2Vec2.DotVV(vertices2[i], normal1);
            if (dot < minDot) {
                minDot = dot;
                index = i;
            }
        }
        var v1 = b2Math_9.b2Transform.MulXV(xf1, vertices1[edge1], b2EdgeSeparation_s_v1);
        var v2 = b2Math_9.b2Transform.MulXV(xf2, vertices2[index], b2EdgeSeparation_s_v2);
        var separation = b2Math_9.b2Vec2.DotVV(b2Math_9.b2Vec2.SubVV(v2, v1, b2Math_9.b2Vec2.s_t0), normal1World);
        return separation;
    }
    var b2FindMaxSeparation_s_d = new b2Math_9.b2Vec2();
    var b2FindMaxSeparation_s_dLocal1 = new b2Math_9.b2Vec2();
    function b2FindMaxSeparation(edgeIndex, poly1, xf1, poly2, xf2) {
        var count1 = poly1.m_count;
        var normals1 = poly1.m_normals;
        var d = b2Math_9.b2Vec2.SubVV(b2Math_9.b2Transform.MulXV(xf2, poly2.m_centroid, b2Math_9.b2Vec2.s_t0), b2Math_9.b2Transform.MulXV(xf1, poly1.m_centroid, b2Math_9.b2Vec2.s_t1), b2FindMaxSeparation_s_d);
        var dLocal1 = b2Math_9.b2Rot.MulTRV(xf1.q, d, b2FindMaxSeparation_s_dLocal1);
        var edge = 0;
        var maxDot = (-b2Settings_10.b2_maxFloat);
        for (var i = 0; i < count1; ++i) {
            var dot = b2Math_9.b2Vec2.DotVV(normals1[i], dLocal1);
            if (dot > maxDot) {
                maxDot = dot;
                edge = i;
            }
        }
        var s = b2EdgeSeparation(poly1, xf1, edge, poly2, xf2);
        var prevEdge = (edge + count1 - 1) % count1;
        var sPrev = b2EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
        var nextEdge = (edge + 1) % count1;
        var sNext = b2EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
        var bestEdge = 0;
        var bestSeparation = 0;
        var increment = 0;
        if (sPrev > s && sPrev > sNext) {
            increment = -1;
            bestEdge = prevEdge;
            bestSeparation = sPrev;
        }
        else if (sNext > s) {
            increment = 1;
            bestEdge = nextEdge;
            bestSeparation = sNext;
        }
        else {
            edgeIndex[0] = edge;
            return s;
        }
        while (true) {
            if (increment === -1) {
                edge = (bestEdge + count1 - 1) % count1;
            }
            else {
                edge = (bestEdge + 1) % count1;
            }
            s = b2EdgeSeparation(poly1, xf1, edge, poly2, xf2);
            if (s > bestSeparation) {
                bestEdge = edge;
                bestSeparation = s;
            }
            else {
                break;
            }
        }
        edgeIndex[0] = bestEdge;
        return bestSeparation;
    }
    var b2FindIncidentEdge_s_normal1 = new b2Math_9.b2Vec2();
    function b2FindIncidentEdge(c, poly1, xf1, edge1, poly2, xf2) {
        var normals1 = poly1.m_normals;
        var count2 = poly2.m_count;
        var vertices2 = poly2.m_vertices;
        var normals2 = poly2.m_normals;
        var normal1 = b2Math_9.b2Rot.MulTRV(xf2.q, b2Math_9.b2Rot.MulRV(xf1.q, normals1[edge1], b2Math_9.b2Vec2.s_t0), b2FindIncidentEdge_s_normal1);
        var index = 0;
        var minDot = b2Settings_10.b2_maxFloat;
        for (var i = 0; i < count2; ++i) {
            var dot = b2Math_9.b2Vec2.DotVV(normal1, normals2[i]);
            if (dot < minDot) {
                minDot = dot;
                index = i;
            }
        }
        var i1 = index;
        var i2 = (i1 + 1) % count2;
        var c0 = c[0];
        b2Math_9.b2Transform.MulXV(xf2, vertices2[i1], c0.v);
        var cf0 = c0.id.cf;
        cf0.indexA = edge1;
        cf0.indexB = i1;
        cf0.typeA = b2Collision_3.b2ContactFeatureType.e_face;
        cf0.typeB = b2Collision_3.b2ContactFeatureType.e_vertex;
        var c1 = c[1];
        b2Math_9.b2Transform.MulXV(xf2, vertices2[i2], c1.v);
        var cf1 = c1.id.cf;
        cf1.indexA = edge1;
        cf1.indexB = i2;
        cf1.typeA = b2Collision_3.b2ContactFeatureType.e_face;
        cf1.typeB = b2Collision_3.b2ContactFeatureType.e_vertex;
    }
    var b2CollidePolygons_s_incidentEdge = b2Collision_4.b2ClipVertex.MakeArray(2);
    var b2CollidePolygons_s_clipPoints1 = b2Collision_4.b2ClipVertex.MakeArray(2);
    var b2CollidePolygons_s_clipPoints2 = b2Collision_4.b2ClipVertex.MakeArray(2);
    var b2CollidePolygons_s_edgeA = [0];
    var b2CollidePolygons_s_edgeB = [0];
    var b2CollidePolygons_s_localTangent = new b2Math_9.b2Vec2();
    var b2CollidePolygons_s_localNormal = new b2Math_9.b2Vec2();
    var b2CollidePolygons_s_planePoint = new b2Math_9.b2Vec2();
    var b2CollidePolygons_s_normal = new b2Math_9.b2Vec2();
    var b2CollidePolygons_s_tangent = new b2Math_9.b2Vec2();
    var b2CollidePolygons_s_ntangent = new b2Math_9.b2Vec2();
    var b2CollidePolygons_s_v11 = new b2Math_9.b2Vec2();
    var b2CollidePolygons_s_v12 = new b2Math_9.b2Vec2();
    function b2CollidePolygons(manifold, polyA, xfA, polyB, xfB) {
        manifold.pointCount = 0;
        var totalRadius = polyA.m_radius + polyB.m_radius;
        var edgeA = b2CollidePolygons_s_edgeA;
        edgeA[0] = 0;
        var separationA = b2FindMaxSeparation(edgeA, polyA, xfA, polyB, xfB);
        if (separationA > totalRadius) {
            return;
        }
        var edgeB = b2CollidePolygons_s_edgeB;
        edgeB[0] = 0;
        var separationB = b2FindMaxSeparation(edgeB, polyB, xfB, polyA, xfA);
        if (separationB > totalRadius) {
            return;
        }
        var poly1;
        var poly2;
        var xf1, xf2;
        var edge1 = 0;
        var flip = 0;
        var k_relativeTol = 0.98;
        var k_absoluteTol = 0.001;
        if (separationB > k_relativeTol * separationA + k_absoluteTol) {
            poly1 = polyB;
            poly2 = polyA;
            xf1 = xfB;
            xf2 = xfA;
            edge1 = edgeB[0];
            manifold.type = b2Collision_4.b2ManifoldType.e_faceB;
            flip = 1;
        }
        else {
            poly1 = polyA;
            poly2 = polyB;
            xf1 = xfA;
            xf2 = xfB;
            edge1 = edgeA[0];
            manifold.type = b2Collision_4.b2ManifoldType.e_faceA;
            flip = 0;
        }
        var incidentEdge = b2CollidePolygons_s_incidentEdge;
        b2FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
        var count1 = poly1.m_count;
        var vertices1 = poly1.m_vertices;
        var iv1 = edge1;
        var iv2 = (edge1 + 1) % count1;
        var local_v11 = vertices1[iv1];
        var local_v12 = vertices1[iv2];
        var localTangent = b2Math_9.b2Vec2.SubVV(local_v12, local_v11, b2CollidePolygons_s_localTangent);
        localTangent.Normalize();
        var localNormal = b2Math_9.b2Vec2.CrossVOne(localTangent, b2CollidePolygons_s_localNormal);
        var planePoint = b2Math_9.b2Vec2.MidVV(local_v11, local_v12, b2CollidePolygons_s_planePoint);
        var tangent = b2Math_9.b2Rot.MulRV(xf1.q, localTangent, b2CollidePolygons_s_tangent);
        var normal = b2Math_9.b2Vec2.CrossVOne(tangent, b2CollidePolygons_s_normal);
        var v11 = b2Math_9.b2Transform.MulXV(xf1, local_v11, b2CollidePolygons_s_v11);
        var v12 = b2Math_9.b2Transform.MulXV(xf1, local_v12, b2CollidePolygons_s_v12);
        var frontOffset = b2Math_9.b2Vec2.DotVV(normal, v11);
        var sideOffset1 = -b2Math_9.b2Vec2.DotVV(tangent, v11) + totalRadius;
        var sideOffset2 = b2Math_9.b2Vec2.DotVV(tangent, v12) + totalRadius;
        var clipPoints1 = b2CollidePolygons_s_clipPoints1;
        var clipPoints2 = b2CollidePolygons_s_clipPoints2;
        var np;
        var ntangent = b2Math_9.b2Vec2.NegV(tangent, b2CollidePolygons_s_ntangent);
        np = b2Collision_4.b2ClipSegmentToLine(clipPoints1, incidentEdge, ntangent, sideOffset1, iv1);
        if (np < 2) {
            return;
        }
        np = b2Collision_4.b2ClipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2, iv2);
        if (np < 2) {
            return;
        }
        manifold.localNormal.Copy(localNormal);
        manifold.localPoint.Copy(planePoint);
        var pointCount = 0;
        for (var i = 0; i < b2Settings_10.b2_maxManifoldPoints; ++i) {
            var cv = clipPoints2[i];
            var separation = b2Math_9.b2Vec2.DotVV(normal, cv.v) - frontOffset;
            if (separation <= totalRadius) {
                var cp = manifold.points[pointCount];
                b2Math_9.b2Transform.MulTXV(xf2, cv.v, cp.localPoint);
                cp.id.Copy(cv.id);
                if (flip) {
                    var cf = cp.id.cf;
                    cp.id.cf.indexA = cf.indexB;
                    cp.id.cf.indexB = cf.indexA;
                    cp.id.cf.typeA = cf.typeB;
                    cp.id.cf.typeB = cf.typeA;
                }
                ++pointCount;
            }
        }
        manifold.pointCount = pointCount;
    }
    exports.b2CollidePolygons = b2CollidePolygons;
});
define("Collision/Shapes/b2EdgeShape", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/Shapes/b2Shape"], function (require, exports, b2Settings_11, b2Math_10, b2Shape_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2EdgeShape = (function (_super) {
        __extends(b2EdgeShape, _super);
        function b2EdgeShape() {
            var _this = _super.call(this, b2Shape_4.b2ShapeType.e_edgeShape, b2Settings_11.b2_polygonRadius) || this;
            _this.m_vertex1 = new b2Math_10.b2Vec2();
            _this.m_vertex2 = new b2Math_10.b2Vec2();
            _this.m_vertex0 = new b2Math_10.b2Vec2();
            _this.m_vertex3 = new b2Math_10.b2Vec2();
            _this.m_hasVertex0 = false;
            _this.m_hasVertex3 = false;
            return _this;
        }
        b2EdgeShape.prototype.Set = function (v1, v2) {
            this.m_vertex1.Copy(v1);
            this.m_vertex2.Copy(v2);
            this.m_hasVertex0 = false;
            this.m_hasVertex3 = false;
            return this;
        };
        b2EdgeShape.prototype.Clone = function () {
            return new b2EdgeShape().Copy(this);
        };
        b2EdgeShape.prototype.Copy = function (other) {
            _super.prototype.Copy.call(this, other);
            this.m_vertex1.Copy(other.m_vertex1);
            this.m_vertex2.Copy(other.m_vertex2);
            this.m_vertex0.Copy(other.m_vertex0);
            this.m_vertex3.Copy(other.m_vertex3);
            this.m_hasVertex0 = other.m_hasVertex0;
            this.m_hasVertex3 = other.m_hasVertex3;
            return this;
        };
        b2EdgeShape.prototype.GetChildCount = function () {
            return 1;
        };
        b2EdgeShape.prototype.TestPoint = function (xf, p) {
            return false;
        };
        b2EdgeShape.prototype.ComputeDistance = function (xf, p, normal, childIndex) {
            var v1 = b2Math_10.b2Transform.MulXV(xf, this.m_vertex1, b2EdgeShape.ComputeDistance_s_v1);
            var v2 = b2Math_10.b2Transform.MulXV(xf, this.m_vertex2, b2EdgeShape.ComputeDistance_s_v2);
            var d = b2Math_10.b2Vec2.SubVV(p, v1, b2EdgeShape.ComputeDistance_s_d);
            var s = b2Math_10.b2Vec2.SubVV(v2, v1, b2EdgeShape.ComputeDistance_s_s);
            var ds = b2Math_10.b2Vec2.DotVV(d, s);
            if (ds > 0) {
                var s2 = b2Math_10.b2Vec2.DotVV(s, s);
                if (ds > s2) {
                    b2Math_10.b2Vec2.SubVV(p, v2, d);
                }
                else {
                    d.SelfMulSub(ds / s2, s);
                }
            }
            normal.Copy(d);
            return normal.Normalize();
        };
        b2EdgeShape.prototype.RayCast = function (output, input, xf, childIndex) {
            var p1 = b2Math_10.b2Transform.MulTXV(xf, input.p1, b2EdgeShape.RayCast_s_p1);
            var p2 = b2Math_10.b2Transform.MulTXV(xf, input.p2, b2EdgeShape.RayCast_s_p2);
            var d = b2Math_10.b2Vec2.SubVV(p2, p1, b2EdgeShape.RayCast_s_d);
            var v1 = this.m_vertex1;
            var v2 = this.m_vertex2;
            var e = b2Math_10.b2Vec2.SubVV(v2, v1, b2EdgeShape.RayCast_s_e);
            var normal = output.normal.Set(e.y, -e.x).SelfNormalize();
            var numerator = b2Math_10.b2Vec2.DotVV(normal, b2Math_10.b2Vec2.SubVV(v1, p1, b2Math_10.b2Vec2.s_t0));
            var denominator = b2Math_10.b2Vec2.DotVV(normal, d);
            if (denominator === 0) {
                return false;
            }
            var t = numerator / denominator;
            if (t < 0 || input.maxFraction < t) {
                return false;
            }
            var q = b2Math_10.b2Vec2.AddVMulSV(p1, t, d, b2EdgeShape.RayCast_s_q);
            var r = b2Math_10.b2Vec2.SubVV(v2, v1, b2EdgeShape.RayCast_s_r);
            var rr = b2Math_10.b2Vec2.DotVV(r, r);
            if (rr === 0) {
                return false;
            }
            var s = b2Math_10.b2Vec2.DotVV(b2Math_10.b2Vec2.SubVV(q, v1, b2Math_10.b2Vec2.s_t0), r) / rr;
            if (s < 0 || 1 < s) {
                return false;
            }
            output.fraction = t;
            b2Math_10.b2Rot.MulRV(xf.q, output.normal, output.normal);
            if (numerator > 0) {
                output.normal.SelfNeg();
            }
            return true;
        };
        b2EdgeShape.prototype.ComputeAABB = function (aabb, xf, childIndex) {
            var v1 = b2Math_10.b2Transform.MulXV(xf, this.m_vertex1, b2EdgeShape.ComputeAABB_s_v1);
            var v2 = b2Math_10.b2Transform.MulXV(xf, this.m_vertex2, b2EdgeShape.ComputeAABB_s_v2);
            b2Math_10.b2Vec2.MinV(v1, v2, aabb.lowerBound);
            b2Math_10.b2Vec2.MaxV(v1, v2, aabb.upperBound);
            var r = this.m_radius;
            aabb.lowerBound.SelfSubXY(r, r);
            aabb.upperBound.SelfAddXY(r, r);
        };
        b2EdgeShape.prototype.ComputeMass = function (massData, density) {
            massData.mass = 0;
            b2Math_10.b2Vec2.MidVV(this.m_vertex1, this.m_vertex2, massData.center);
            massData.I = 0;
        };
        b2EdgeShape.prototype.SetupDistanceProxy = function (proxy, index) {
            proxy.m_vertices = proxy.m_buffer;
            proxy.m_vertices[0].Copy(this.m_vertex1);
            proxy.m_vertices[1].Copy(this.m_vertex2);
            proxy.m_count = 2;
            proxy.m_radius = this.m_radius;
        };
        b2EdgeShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
            c.SetZero();
            return 0;
        };
        b2EdgeShape.prototype.Dump = function (log) {
            log("    const shape: b2EdgeShape = new b2EdgeShape();\n");
            log("    shape.m_radius = %.15f;\n", this.m_radius);
            log("    shape.m_vertex0.Set(%.15f, %.15f);\n", this.m_vertex0.x, this.m_vertex0.y);
            log("    shape.m_vertex1.Set(%.15f, %.15f);\n", this.m_vertex1.x, this.m_vertex1.y);
            log("    shape.m_vertex2.Set(%.15f, %.15f);\n", this.m_vertex2.x, this.m_vertex2.y);
            log("    shape.m_vertex3.Set(%.15f, %.15f);\n", this.m_vertex3.x, this.m_vertex3.y);
            log("    shape.m_hasVertex0 = %s;\n", this.m_hasVertex0);
            log("    shape.m_hasVertex3 = %s;\n", this.m_hasVertex3);
        };
        b2EdgeShape.ComputeDistance_s_v1 = new b2Math_10.b2Vec2();
        b2EdgeShape.ComputeDistance_s_v2 = new b2Math_10.b2Vec2();
        b2EdgeShape.ComputeDistance_s_d = new b2Math_10.b2Vec2();
        b2EdgeShape.ComputeDistance_s_s = new b2Math_10.b2Vec2();
        b2EdgeShape.RayCast_s_p1 = new b2Math_10.b2Vec2();
        b2EdgeShape.RayCast_s_p2 = new b2Math_10.b2Vec2();
        b2EdgeShape.RayCast_s_d = new b2Math_10.b2Vec2();
        b2EdgeShape.RayCast_s_e = new b2Math_10.b2Vec2();
        b2EdgeShape.RayCast_s_q = new b2Math_10.b2Vec2();
        b2EdgeShape.RayCast_s_r = new b2Math_10.b2Vec2();
        b2EdgeShape.ComputeAABB_s_v1 = new b2Math_10.b2Vec2();
        b2EdgeShape.ComputeAABB_s_v2 = new b2Math_10.b2Vec2();
        return b2EdgeShape;
    }(b2Shape_4.b2Shape));
    exports.b2EdgeShape = b2EdgeShape;
});
define("Collision/b2CollideEdge", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/b2Collision", "Collision/b2Collision"], function (require, exports, b2Settings_12, b2Math_11, b2Collision_5, b2Collision_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2CollideEdgeAndCircle_s_Q = new b2Math_11.b2Vec2();
    var b2CollideEdgeAndCircle_s_e = new b2Math_11.b2Vec2();
    var b2CollideEdgeAndCircle_s_d = new b2Math_11.b2Vec2();
    var b2CollideEdgeAndCircle_s_e1 = new b2Math_11.b2Vec2();
    var b2CollideEdgeAndCircle_s_e2 = new b2Math_11.b2Vec2();
    var b2CollideEdgeAndCircle_s_P = new b2Math_11.b2Vec2();
    var b2CollideEdgeAndCircle_s_n = new b2Math_11.b2Vec2();
    var b2CollideEdgeAndCircle_s_id = new b2Collision_5.b2ContactID();
    function b2CollideEdgeAndCircle(manifold, edgeA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        var Q = b2Math_11.b2Transform.MulTXV(xfA, b2Math_11.b2Transform.MulXV(xfB, circleB.m_p, b2Math_11.b2Vec2.s_t0), b2CollideEdgeAndCircle_s_Q);
        var A = edgeA.m_vertex1;
        var B = edgeA.m_vertex2;
        var e = b2Math_11.b2Vec2.SubVV(B, A, b2CollideEdgeAndCircle_s_e);
        var u = b2Math_11.b2Vec2.DotVV(e, b2Math_11.b2Vec2.SubVV(B, Q, b2Math_11.b2Vec2.s_t0));
        var v = b2Math_11.b2Vec2.DotVV(e, b2Math_11.b2Vec2.SubVV(Q, A, b2Math_11.b2Vec2.s_t0));
        var radius = edgeA.m_radius + circleB.m_radius;
        var id = b2CollideEdgeAndCircle_s_id;
        id.cf.indexB = 0;
        id.cf.typeB = b2Collision_5.b2ContactFeatureType.e_vertex;
        if (v <= 0) {
            var P_1 = A;
            var d_1 = b2Math_11.b2Vec2.SubVV(Q, P_1, b2CollideEdgeAndCircle_s_d);
            var dd_1 = b2Math_11.b2Vec2.DotVV(d_1, d_1);
            if (dd_1 > radius * radius) {
                return;
            }
            if (edgeA.m_hasVertex0) {
                var A1 = edgeA.m_vertex0;
                var B1 = A;
                var e1 = b2Math_11.b2Vec2.SubVV(B1, A1, b2CollideEdgeAndCircle_s_e1);
                var u1 = b2Math_11.b2Vec2.DotVV(e1, b2Math_11.b2Vec2.SubVV(B1, Q, b2Math_11.b2Vec2.s_t0));
                if (u1 > 0) {
                    return;
                }
            }
            id.cf.indexA = 0;
            id.cf.typeA = b2Collision_5.b2ContactFeatureType.e_vertex;
            manifold.pointCount = 1;
            manifold.type = b2Collision_6.b2ManifoldType.e_circles;
            manifold.localNormal.SetZero();
            manifold.localPoint.Copy(P_1);
            manifold.points[0].id.Copy(id);
            manifold.points[0].localPoint.Copy(circleB.m_p);
            return;
        }
        if (u <= 0) {
            var P_2 = B;
            var d_2 = b2Math_11.b2Vec2.SubVV(Q, P_2, b2CollideEdgeAndCircle_s_d);
            var dd_2 = b2Math_11.b2Vec2.DotVV(d_2, d_2);
            if (dd_2 > radius * radius) {
                return;
            }
            if (edgeA.m_hasVertex3) {
                var B2 = edgeA.m_vertex3;
                var A2 = B;
                var e2 = b2Math_11.b2Vec2.SubVV(B2, A2, b2CollideEdgeAndCircle_s_e2);
                var v2 = b2Math_11.b2Vec2.DotVV(e2, b2Math_11.b2Vec2.SubVV(Q, A2, b2Math_11.b2Vec2.s_t0));
                if (v2 > 0) {
                    return;
                }
            }
            id.cf.indexA = 1;
            id.cf.typeA = b2Collision_5.b2ContactFeatureType.e_vertex;
            manifold.pointCount = 1;
            manifold.type = b2Collision_6.b2ManifoldType.e_circles;
            manifold.localNormal.SetZero();
            manifold.localPoint.Copy(P_2);
            manifold.points[0].id.Copy(id);
            manifold.points[0].localPoint.Copy(circleB.m_p);
            return;
        }
        var den = b2Math_11.b2Vec2.DotVV(e, e);
        var P = b2CollideEdgeAndCircle_s_P;
        P.x = (1 / den) * (u * A.x + v * B.x);
        P.y = (1 / den) * (u * A.y + v * B.y);
        var d = b2Math_11.b2Vec2.SubVV(Q, P, b2CollideEdgeAndCircle_s_d);
        var dd = b2Math_11.b2Vec2.DotVV(d, d);
        if (dd > radius * radius) {
            return;
        }
        var n = b2CollideEdgeAndCircle_s_n.Set(-e.y, e.x);
        if (b2Math_11.b2Vec2.DotVV(n, b2Math_11.b2Vec2.SubVV(Q, A, b2Math_11.b2Vec2.s_t0)) < 0) {
            n.Set(-n.x, -n.y);
        }
        n.Normalize();
        id.cf.indexA = 0;
        id.cf.typeA = b2Collision_5.b2ContactFeatureType.e_face;
        manifold.pointCount = 1;
        manifold.type = b2Collision_6.b2ManifoldType.e_faceA;
        manifold.localNormal.Copy(n);
        manifold.localPoint.Copy(A);
        manifold.points[0].id.Copy(id);
        manifold.points[0].localPoint.Copy(circleB.m_p);
    }
    exports.b2CollideEdgeAndCircle = b2CollideEdgeAndCircle;
    var b2EPAxisType;
    (function (b2EPAxisType) {
        b2EPAxisType[b2EPAxisType["e_unknown"] = 0] = "e_unknown";
        b2EPAxisType[b2EPAxisType["e_edgeA"] = 1] = "e_edgeA";
        b2EPAxisType[b2EPAxisType["e_edgeB"] = 2] = "e_edgeB";
    })(b2EPAxisType || (b2EPAxisType = {}));
    var b2EPAxis = (function () {
        function b2EPAxis() {
            this.type = 0;
            this.index = 0;
            this.separation = 0;
        }
        return b2EPAxis;
    }());
    var b2TempPolygon = (function () {
        function b2TempPolygon() {
            this.vertices = b2Math_11.b2Vec2.MakeArray(b2Settings_12.b2_maxPolygonVertices);
            this.normals = b2Math_11.b2Vec2.MakeArray(b2Settings_12.b2_maxPolygonVertices);
            this.count = 0;
        }
        return b2TempPolygon;
    }());
    var b2ReferenceFace = (function () {
        function b2ReferenceFace() {
            this.i1 = 0;
            this.i2 = 0;
            this.v1 = new b2Math_11.b2Vec2();
            this.v2 = new b2Math_11.b2Vec2();
            this.normal = new b2Math_11.b2Vec2();
            this.sideNormal1 = new b2Math_11.b2Vec2();
            this.sideOffset1 = 0;
            this.sideNormal2 = new b2Math_11.b2Vec2();
            this.sideOffset2 = 0;
        }
        return b2ReferenceFace;
    }());
    var b2EPColliderVertexType;
    (function (b2EPColliderVertexType) {
        b2EPColliderVertexType[b2EPColliderVertexType["e_isolated"] = 0] = "e_isolated";
        b2EPColliderVertexType[b2EPColliderVertexType["e_concave"] = 1] = "e_concave";
        b2EPColliderVertexType[b2EPColliderVertexType["e_convex"] = 2] = "e_convex";
    })(b2EPColliderVertexType || (b2EPColliderVertexType = {}));
    var b2EPCollider = (function () {
        function b2EPCollider() {
            this.m_polygonB = new b2TempPolygon();
            this.m_xf = new b2Math_11.b2Transform();
            this.m_centroidB = new b2Math_11.b2Vec2();
            this.m_v0 = new b2Math_11.b2Vec2();
            this.m_v1 = new b2Math_11.b2Vec2();
            this.m_v2 = new b2Math_11.b2Vec2();
            this.m_v3 = new b2Math_11.b2Vec2();
            this.m_normal0 = new b2Math_11.b2Vec2();
            this.m_normal1 = new b2Math_11.b2Vec2();
            this.m_normal2 = new b2Math_11.b2Vec2();
            this.m_normal = new b2Math_11.b2Vec2();
            this.m_type1 = 0;
            this.m_type2 = 0;
            this.m_lowerLimit = new b2Math_11.b2Vec2();
            this.m_upperLimit = new b2Math_11.b2Vec2();
            this.m_radius = 0;
            this.m_front = false;
        }
        b2EPCollider.prototype.Collide = function (manifold, edgeA, xfA, polygonB, xfB) {
            b2Math_11.b2Transform.MulTXX(xfA, xfB, this.m_xf);
            b2Math_11.b2Transform.MulXV(this.m_xf, polygonB.m_centroid, this.m_centroidB);
            this.m_v0.Copy(edgeA.m_vertex0);
            this.m_v1.Copy(edgeA.m_vertex1);
            this.m_v2.Copy(edgeA.m_vertex2);
            this.m_v3.Copy(edgeA.m_vertex3);
            var hasVertex0 = edgeA.m_hasVertex0;
            var hasVertex3 = edgeA.m_hasVertex3;
            var edge1 = b2Math_11.b2Vec2.SubVV(this.m_v2, this.m_v1, b2EPCollider.s_edge1);
            edge1.Normalize();
            this.m_normal1.Set(edge1.y, -edge1.x);
            var offset1 = b2Math_11.b2Vec2.DotVV(this.m_normal1, b2Math_11.b2Vec2.SubVV(this.m_centroidB, this.m_v1, b2Math_11.b2Vec2.s_t0));
            var offset0 = 0;
            var offset2 = 0;
            var convex1 = false;
            var convex2 = false;
            if (hasVertex0) {
                var edge0 = b2Math_11.b2Vec2.SubVV(this.m_v1, this.m_v0, b2EPCollider.s_edge0);
                edge0.Normalize();
                this.m_normal0.Set(edge0.y, -edge0.x);
                convex1 = b2Math_11.b2Vec2.CrossVV(edge0, edge1) >= 0;
                offset0 = b2Math_11.b2Vec2.DotVV(this.m_normal0, b2Math_11.b2Vec2.SubVV(this.m_centroidB, this.m_v0, b2Math_11.b2Vec2.s_t0));
            }
            if (hasVertex3) {
                var edge2 = b2Math_11.b2Vec2.SubVV(this.m_v3, this.m_v2, b2EPCollider.s_edge2);
                edge2.Normalize();
                this.m_normal2.Set(edge2.y, -edge2.x);
                convex2 = b2Math_11.b2Vec2.CrossVV(edge1, edge2) > 0;
                offset2 = b2Math_11.b2Vec2.DotVV(this.m_normal2, b2Math_11.b2Vec2.SubVV(this.m_centroidB, this.m_v2, b2Math_11.b2Vec2.s_t0));
            }
            if (hasVertex0 && hasVertex3) {
                if (convex1 && convex2) {
                    this.m_front = offset0 >= 0 || offset1 >= 0 || offset2 >= 0;
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal0);
                        this.m_upperLimit.Copy(this.m_normal2);
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
                    }
                }
                else if (convex1) {
                    this.m_front = offset0 >= 0 || (offset1 >= 0 && offset2 >= 0);
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal0);
                        this.m_upperLimit.Copy(this.m_normal1);
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal2).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
                    }
                }
                else if (convex2) {
                    this.m_front = offset2 >= 0 || (offset0 >= 0 && offset1 >= 0);
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal1);
                        this.m_upperLimit.Copy(this.m_normal2);
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal0).SelfNeg();
                    }
                }
                else {
                    this.m_front = offset0 >= 0 && offset1 >= 0 && offset2 >= 0;
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal1);
                        this.m_upperLimit.Copy(this.m_normal1);
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal2).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal0).SelfNeg();
                    }
                }
            }
            else if (hasVertex0) {
                if (convex1) {
                    this.m_front = offset0 >= 0 || offset1 >= 0;
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal0);
                        this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal1);
                        this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
                    }
                }
                else {
                    this.m_front = offset0 >= 0 && offset1 >= 0;
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal1);
                        this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal1);
                        this.m_upperLimit.Copy(this.m_normal0).SelfNeg();
                    }
                }
            }
            else if (hasVertex3) {
                if (convex2) {
                    this.m_front = offset1 >= 0 || offset2 >= 0;
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal2);
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal1);
                    }
                }
                else {
                    this.m_front = offset1 >= 0 && offset2 >= 0;
                    if (this.m_front) {
                        this.m_normal.Copy(this.m_normal1);
                        this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal1);
                    }
                    else {
                        this.m_normal.Copy(this.m_normal1).SelfNeg();
                        this.m_lowerLimit.Copy(this.m_normal2).SelfNeg();
                        this.m_upperLimit.Copy(this.m_normal1);
                    }
                }
            }
            else {
                this.m_front = offset1 >= 0;
                if (this.m_front) {
                    this.m_normal.Copy(this.m_normal1);
                    this.m_lowerLimit.Copy(this.m_normal1).SelfNeg();
                    this.m_upperLimit.Copy(this.m_normal1).SelfNeg();
                }
                else {
                    this.m_normal.Copy(this.m_normal1).SelfNeg();
                    this.m_lowerLimit.Copy(this.m_normal1);
                    this.m_upperLimit.Copy(this.m_normal1);
                }
            }
            this.m_polygonB.count = polygonB.m_count;
            for (var i = 0; i < polygonB.m_count; ++i) {
                b2Math_11.b2Transform.MulXV(this.m_xf, polygonB.m_vertices[i], this.m_polygonB.vertices[i]);
                b2Math_11.b2Rot.MulRV(this.m_xf.q, polygonB.m_normals[i], this.m_polygonB.normals[i]);
            }
            this.m_radius = 2 * b2Settings_12.b2_polygonRadius;
            manifold.pointCount = 0;
            var edgeAxis = this.ComputeEdgeSeparation(b2EPCollider.s_edgeAxis);
            if (edgeAxis.type === 0) {
                return;
            }
            if (edgeAxis.separation > this.m_radius) {
                return;
            }
            var polygonAxis = this.ComputePolygonSeparation(b2EPCollider.s_polygonAxis);
            if (polygonAxis.type !== 0 && polygonAxis.separation > this.m_radius) {
                return;
            }
            var k_relativeTol = 0.98;
            var k_absoluteTol = 0.001;
            var primaryAxis;
            if (polygonAxis.type === 0) {
                primaryAxis = edgeAxis;
            }
            else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
                primaryAxis = polygonAxis;
            }
            else {
                primaryAxis = edgeAxis;
            }
            var ie = b2EPCollider.s_ie;
            var rf = b2EPCollider.s_rf;
            if (primaryAxis.type === 1) {
                manifold.type = b2Collision_6.b2ManifoldType.e_faceA;
                var bestIndex = 0;
                var bestValue = b2Math_11.b2Vec2.DotVV(this.m_normal, this.m_polygonB.normals[0]);
                for (var i = 1; i < this.m_polygonB.count; ++i) {
                    var value = b2Math_11.b2Vec2.DotVV(this.m_normal, this.m_polygonB.normals[i]);
                    if (value < bestValue) {
                        bestValue = value;
                        bestIndex = i;
                    }
                }
                var i1 = bestIndex;
                var i2 = (i1 + 1) % this.m_polygonB.count;
                var ie0 = ie[0];
                ie0.v.Copy(this.m_polygonB.vertices[i1]);
                ie0.id.cf.indexA = 0;
                ie0.id.cf.indexB = i1;
                ie0.id.cf.typeA = b2Collision_5.b2ContactFeatureType.e_face;
                ie0.id.cf.typeB = b2Collision_5.b2ContactFeatureType.e_vertex;
                var ie1 = ie[1];
                ie1.v.Copy(this.m_polygonB.vertices[i2]);
                ie1.id.cf.indexA = 0;
                ie1.id.cf.indexB = i2;
                ie1.id.cf.typeA = b2Collision_5.b2ContactFeatureType.e_face;
                ie1.id.cf.typeB = b2Collision_5.b2ContactFeatureType.e_vertex;
                if (this.m_front) {
                    rf.i1 = 0;
                    rf.i2 = 1;
                    rf.v1.Copy(this.m_v1);
                    rf.v2.Copy(this.m_v2);
                    rf.normal.Copy(this.m_normal1);
                }
                else {
                    rf.i1 = 1;
                    rf.i2 = 0;
                    rf.v1.Copy(this.m_v2);
                    rf.v2.Copy(this.m_v1);
                    rf.normal.Copy(this.m_normal1).SelfNeg();
                }
            }
            else {
                manifold.type = b2Collision_6.b2ManifoldType.e_faceB;
                var ie0 = ie[0];
                ie0.v.Copy(this.m_v1);
                ie0.id.cf.indexA = 0;
                ie0.id.cf.indexB = primaryAxis.index;
                ie0.id.cf.typeA = b2Collision_5.b2ContactFeatureType.e_vertex;
                ie0.id.cf.typeB = b2Collision_5.b2ContactFeatureType.e_face;
                var ie1 = ie[1];
                ie1.v.Copy(this.m_v2);
                ie1.id.cf.indexA = 0;
                ie1.id.cf.indexB = primaryAxis.index;
                ie1.id.cf.typeA = b2Collision_5.b2ContactFeatureType.e_vertex;
                ie1.id.cf.typeB = b2Collision_5.b2ContactFeatureType.e_face;
                rf.i1 = primaryAxis.index;
                rf.i2 = (rf.i1 + 1) % this.m_polygonB.count;
                rf.v1.Copy(this.m_polygonB.vertices[rf.i1]);
                rf.v2.Copy(this.m_polygonB.vertices[rf.i2]);
                rf.normal.Copy(this.m_polygonB.normals[rf.i1]);
            }
            rf.sideNormal1.Set(rf.normal.y, -rf.normal.x);
            rf.sideNormal2.Copy(rf.sideNormal1).SelfNeg();
            rf.sideOffset1 = b2Math_11.b2Vec2.DotVV(rf.sideNormal1, rf.v1);
            rf.sideOffset2 = b2Math_11.b2Vec2.DotVV(rf.sideNormal2, rf.v2);
            var clipPoints1 = b2EPCollider.s_clipPoints1;
            var clipPoints2 = b2EPCollider.s_clipPoints2;
            var np = 0;
            np = b2Collision_6.b2ClipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
            if (np < b2Settings_12.b2_maxManifoldPoints) {
                return;
            }
            np = b2Collision_6.b2ClipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
            if (np < b2Settings_12.b2_maxManifoldPoints) {
                return;
            }
            if (primaryAxis.type === 1) {
                manifold.localNormal.Copy(rf.normal);
                manifold.localPoint.Copy(rf.v1);
            }
            else {
                manifold.localNormal.Copy(polygonB.m_normals[rf.i1]);
                manifold.localPoint.Copy(polygonB.m_vertices[rf.i1]);
            }
            var pointCount = 0;
            for (var i = 0; i < b2Settings_12.b2_maxManifoldPoints; ++i) {
                var separation = void 0;
                separation = b2Math_11.b2Vec2.DotVV(rf.normal, b2Math_11.b2Vec2.SubVV(clipPoints2[i].v, rf.v1, b2Math_11.b2Vec2.s_t0));
                if (separation <= this.m_radius) {
                    var cp = manifold.points[pointCount];
                    if (primaryAxis.type === 1) {
                        b2Math_11.b2Transform.MulTXV(this.m_xf, clipPoints2[i].v, cp.localPoint);
                        cp.id = clipPoints2[i].id;
                    }
                    else {
                        cp.localPoint.Copy(clipPoints2[i].v);
                        cp.id.cf.typeA = clipPoints2[i].id.cf.typeB;
                        cp.id.cf.typeB = clipPoints2[i].id.cf.typeA;
                        cp.id.cf.indexA = clipPoints2[i].id.cf.indexB;
                        cp.id.cf.indexB = clipPoints2[i].id.cf.indexA;
                    }
                    ++pointCount;
                }
            }
            manifold.pointCount = pointCount;
        };
        b2EPCollider.prototype.ComputeEdgeSeparation = function (out) {
            var axis = out;
            axis.type = 1;
            axis.index = this.m_front ? 0 : 1;
            axis.separation = b2Settings_12.b2_maxFloat;
            for (var i = 0; i < this.m_polygonB.count; ++i) {
                var s = b2Math_11.b2Vec2.DotVV(this.m_normal, b2Math_11.b2Vec2.SubVV(this.m_polygonB.vertices[i], this.m_v1, b2Math_11.b2Vec2.s_t0));
                if (s < axis.separation) {
                    axis.separation = s;
                }
            }
            return axis;
        };
        b2EPCollider.prototype.ComputePolygonSeparation = function (out) {
            var axis = out;
            axis.type = 0;
            axis.index = -1;
            axis.separation = -b2Settings_12.b2_maxFloat;
            var perp = b2EPCollider.s_perp.Set(-this.m_normal.y, this.m_normal.x);
            for (var i = 0; i < this.m_polygonB.count; ++i) {
                var n = b2Math_11.b2Vec2.NegV(this.m_polygonB.normals[i], b2EPCollider.s_n);
                var s1 = b2Math_11.b2Vec2.DotVV(n, b2Math_11.b2Vec2.SubVV(this.m_polygonB.vertices[i], this.m_v1, b2Math_11.b2Vec2.s_t0));
                var s2 = b2Math_11.b2Vec2.DotVV(n, b2Math_11.b2Vec2.SubVV(this.m_polygonB.vertices[i], this.m_v2, b2Math_11.b2Vec2.s_t0));
                var s = b2Math_11.b2Min(s1, s2);
                if (s > this.m_radius) {
                    axis.type = 2;
                    axis.index = i;
                    axis.separation = s;
                    return axis;
                }
                if (b2Math_11.b2Vec2.DotVV(n, perp) >= 0) {
                    if (b2Math_11.b2Vec2.DotVV(b2Math_11.b2Vec2.SubVV(n, this.m_upperLimit, b2Math_11.b2Vec2.s_t0), this.m_normal) < -b2Settings_12.b2_angularSlop) {
                        continue;
                    }
                }
                else {
                    if (b2Math_11.b2Vec2.DotVV(b2Math_11.b2Vec2.SubVV(n, this.m_lowerLimit, b2Math_11.b2Vec2.s_t0), this.m_normal) < -b2Settings_12.b2_angularSlop) {
                        continue;
                    }
                }
                if (s > axis.separation) {
                    axis.type = 2;
                    axis.index = i;
                    axis.separation = s;
                }
            }
            return axis;
        };
        b2EPCollider.s_edge1 = new b2Math_11.b2Vec2();
        b2EPCollider.s_edge0 = new b2Math_11.b2Vec2();
        b2EPCollider.s_edge2 = new b2Math_11.b2Vec2();
        b2EPCollider.s_ie = b2Collision_6.b2ClipVertex.MakeArray(2);
        b2EPCollider.s_rf = new b2ReferenceFace();
        b2EPCollider.s_clipPoints1 = b2Collision_6.b2ClipVertex.MakeArray(2);
        b2EPCollider.s_clipPoints2 = b2Collision_6.b2ClipVertex.MakeArray(2);
        b2EPCollider.s_edgeAxis = new b2EPAxis();
        b2EPCollider.s_polygonAxis = new b2EPAxis();
        b2EPCollider.s_n = new b2Math_11.b2Vec2();
        b2EPCollider.s_perp = new b2Math_11.b2Vec2();
        return b2EPCollider;
    }());
    var b2CollideEdgeAndPolygon_s_collider = new b2EPCollider();
    function b2CollideEdgeAndPolygon(manifold, edgeA, xfA, polygonB, xfB) {
        var collider = b2CollideEdgeAndPolygon_s_collider;
        collider.Collide(manifold, edgeA, xfA, polygonB, xfB);
    }
    exports.b2CollideEdgeAndPolygon = b2CollideEdgeAndPolygon;
});
define("Collision/Shapes/b2ChainShape", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/Shapes/b2Shape", "Collision/Shapes/b2EdgeShape"], function (require, exports, b2Settings_13, b2Math_12, b2Shape_5, b2EdgeShape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ChainShape = (function (_super) {
        __extends(b2ChainShape, _super);
        function b2ChainShape() {
            var _this = _super.call(this, b2Shape_5.b2ShapeType.e_chainShape, b2Settings_13.b2_polygonRadius) || this;
            _this.m_vertices = [];
            _this.m_count = 0;
            _this.m_prevVertex = new b2Math_12.b2Vec2();
            _this.m_nextVertex = new b2Math_12.b2Vec2();
            _this.m_hasPrevVertex = false;
            _this.m_hasNextVertex = false;
            return _this;
        }
        b2ChainShape.prototype.CreateLoop = function (vertices, count, start) {
            if (count === void 0) { count = vertices.length; }
            if (start === void 0) { start = 0; }
            this.m_count = count + 1;
            this.m_vertices = b2Math_12.b2Vec2.MakeArray(this.m_count);
            for (var i = 0; i < count; ++i) {
                this.m_vertices[i].Copy(vertices[start + i]);
            }
            this.m_vertices[count].Copy(this.m_vertices[0]);
            this.m_prevVertex.Copy(this.m_vertices[this.m_count - 2]);
            this.m_nextVertex.Copy(this.m_vertices[1]);
            this.m_hasPrevVertex = true;
            this.m_hasNextVertex = true;
            return this;
        };
        b2ChainShape.prototype.CreateChain = function (vertices, count, start) {
            if (count === void 0) { count = vertices.length; }
            if (start === void 0) { start = 0; }
            this.m_count = count;
            this.m_vertices = b2Math_12.b2Vec2.MakeArray(count);
            for (var i = 0; i < count; ++i) {
                this.m_vertices[i].Copy(vertices[start + i]);
            }
            this.m_hasPrevVertex = false;
            this.m_hasNextVertex = false;
            this.m_prevVertex.SetZero();
            this.m_nextVertex.SetZero();
            return this;
        };
        b2ChainShape.prototype.SetPrevVertex = function (prevVertex) {
            this.m_prevVertex.Copy(prevVertex);
            this.m_hasPrevVertex = true;
            return this;
        };
        b2ChainShape.prototype.SetNextVertex = function (nextVertex) {
            this.m_nextVertex.Copy(nextVertex);
            this.m_hasNextVertex = true;
            return this;
        };
        b2ChainShape.prototype.Clone = function () {
            return new b2ChainShape().Copy(this);
        };
        b2ChainShape.prototype.Copy = function (other) {
            _super.prototype.Copy.call(this, other);
            this.CreateChain(other.m_vertices, other.m_count);
            this.m_prevVertex.Copy(other.m_prevVertex);
            this.m_nextVertex.Copy(other.m_nextVertex);
            this.m_hasPrevVertex = other.m_hasPrevVertex;
            this.m_hasNextVertex = other.m_hasNextVertex;
            return this;
        };
        b2ChainShape.prototype.GetChildCount = function () {
            return this.m_count - 1;
        };
        b2ChainShape.prototype.GetChildEdge = function (edge, index) {
            edge.m_type = b2Shape_5.b2ShapeType.e_edgeShape;
            edge.m_radius = this.m_radius;
            edge.m_vertex1.Copy(this.m_vertices[index]);
            edge.m_vertex2.Copy(this.m_vertices[index + 1]);
            if (index > 0) {
                edge.m_vertex0.Copy(this.m_vertices[index - 1]);
                edge.m_hasVertex0 = true;
            }
            else {
                edge.m_vertex0.Copy(this.m_prevVertex);
                edge.m_hasVertex0 = this.m_hasPrevVertex;
            }
            if (index < this.m_count - 2) {
                edge.m_vertex3.Copy(this.m_vertices[index + 2]);
                edge.m_hasVertex3 = true;
            }
            else {
                edge.m_vertex3.Copy(this.m_nextVertex);
                edge.m_hasVertex3 = this.m_hasNextVertex;
            }
        };
        b2ChainShape.prototype.TestPoint = function (xf, p) {
            return false;
        };
        b2ChainShape.prototype.ComputeDistance = function (xf, p, normal, childIndex) {
            var edge = b2ChainShape.ComputeDistance_s_edgeShape;
            this.GetChildEdge(edge, childIndex);
            return edge.ComputeDistance(xf, p, normal, 0);
        };
        b2ChainShape.prototype.RayCast = function (output, input, xf, childIndex) {
            var edgeShape = b2ChainShape.RayCast_s_edgeShape;
            edgeShape.m_vertex1.Copy(this.m_vertices[childIndex]);
            edgeShape.m_vertex2.Copy(this.m_vertices[(childIndex + 1) % this.m_count]);
            return edgeShape.RayCast(output, input, xf, 0);
        };
        b2ChainShape.prototype.ComputeAABB = function (aabb, xf, childIndex) {
            var vertexi1 = this.m_vertices[childIndex];
            var vertexi2 = this.m_vertices[(childIndex + 1) % this.m_count];
            var v1 = b2Math_12.b2Transform.MulXV(xf, vertexi1, b2ChainShape.ComputeAABB_s_v1);
            var v2 = b2Math_12.b2Transform.MulXV(xf, vertexi2, b2ChainShape.ComputeAABB_s_v2);
            b2Math_12.b2Vec2.MinV(v1, v2, aabb.lowerBound);
            b2Math_12.b2Vec2.MaxV(v1, v2, aabb.upperBound);
        };
        b2ChainShape.prototype.ComputeMass = function (massData, density) {
            massData.mass = 0;
            massData.center.SetZero();
            massData.I = 0;
        };
        b2ChainShape.prototype.SetupDistanceProxy = function (proxy, index) {
            proxy.m_vertices = proxy.m_buffer;
            proxy.m_vertices[0].Copy(this.m_vertices[index]);
            if (index + 1 < this.m_count) {
                proxy.m_vertices[1].Copy(this.m_vertices[index + 1]);
            }
            else {
                proxy.m_vertices[1].Copy(this.m_vertices[0]);
            }
            proxy.m_count = 2;
            proxy.m_radius = this.m_radius;
        };
        b2ChainShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
            c.SetZero();
            return 0;
        };
        b2ChainShape.prototype.Dump = function (log) {
            log("    const shape: b2ChainShape = new b2ChainShape();\n");
            log("    const vs: b2Vec2[] = b2Vec2.MakeArray(%d);\n", b2Settings_13.b2_maxPolygonVertices);
            for (var i = 0; i < this.m_count; ++i) {
                log("    vs[%d].Set(%.15f, %.15f);\n", i, this.m_vertices[i].x, this.m_vertices[i].y);
            }
            log("    shape.CreateChain(vs, %d);\n", this.m_count);
            log("    shape.m_prevVertex.Set(%.15f, %.15f);\n", this.m_prevVertex.x, this.m_prevVertex.y);
            log("    shape.m_nextVertex.Set(%.15f, %.15f);\n", this.m_nextVertex.x, this.m_nextVertex.y);
            log("    shape.m_hasPrevVertex = %s;\n", (this.m_hasPrevVertex) ? ("true") : ("false"));
            log("    shape.m_hasNextVertex = %s;\n", (this.m_hasNextVertex) ? ("true") : ("false"));
        };
        b2ChainShape.ComputeDistance_s_edgeShape = new b2EdgeShape_1.b2EdgeShape();
        b2ChainShape.RayCast_s_edgeShape = new b2EdgeShape_1.b2EdgeShape();
        b2ChainShape.ComputeAABB_s_v1 = new b2Math_12.b2Vec2();
        b2ChainShape.ComputeAABB_s_v2 = new b2Math_12.b2Vec2();
        return b2ChainShape;
    }(b2Shape_5.b2Shape));
    exports.b2ChainShape = b2ChainShape;
});
define("Dynamics/b2TimeStep", ["require", "exports", "Common/b2Settings", "Common/b2Math"], function (require, exports, b2Settings_14, b2Math_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2Profile = (function () {
        function b2Profile() {
            this.step = 0;
            this.collide = 0;
            this.solve = 0;
            this.solveInit = 0;
            this.solveVelocity = 0;
            this.solvePosition = 0;
            this.broadphase = 0;
            this.solveTOI = 0;
        }
        b2Profile.prototype.Reset = function () {
            this.step = 0;
            this.collide = 0;
            this.solve = 0;
            this.solveInit = 0;
            this.solveVelocity = 0;
            this.solvePosition = 0;
            this.broadphase = 0;
            this.solveTOI = 0;
            return this;
        };
        return b2Profile;
    }());
    exports.b2Profile = b2Profile;
    var b2TimeStep = (function () {
        function b2TimeStep() {
            this.dt = 0;
            this.inv_dt = 0;
            this.dtRatio = 0;
            this.velocityIterations = 0;
            this.positionIterations = 0;
            this.particleIterations = 0;
            this.warmStarting = false;
        }
        b2TimeStep.prototype.Copy = function (step) {
            this.dt = step.dt;
            this.inv_dt = step.inv_dt;
            this.dtRatio = step.dtRatio;
            this.positionIterations = step.positionIterations;
            this.velocityIterations = step.velocityIterations;
            this.particleIterations = step.particleIterations;
            this.warmStarting = step.warmStarting;
            return this;
        };
        return b2TimeStep;
    }());
    exports.b2TimeStep = b2TimeStep;
    var b2Position = (function () {
        function b2Position() {
            this.c = new b2Math_13.b2Vec2();
            this.a = 0;
        }
        b2Position.MakeArray = function (length) {
            return b2Settings_14.b2MakeArray(length, function (i) { return new b2Position(); });
        };
        return b2Position;
    }());
    exports.b2Position = b2Position;
    var b2Velocity = (function () {
        function b2Velocity() {
            this.v = new b2Math_13.b2Vec2();
            this.w = 0;
        }
        b2Velocity.MakeArray = function (length) {
            return b2Settings_14.b2MakeArray(length, function (i) { return new b2Velocity(); });
        };
        return b2Velocity;
    }());
    exports.b2Velocity = b2Velocity;
    var b2SolverData = (function () {
        function b2SolverData() {
            this.step = new b2TimeStep();
        }
        return b2SolverData;
    }());
    exports.b2SolverData = b2SolverData;
});
define("Dynamics/Joints/b2Joint", ["require", "exports", "Common/b2Settings", "Common/b2Math"], function (require, exports, b2Settings_15, b2Math_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2JointType;
    (function (b2JointType) {
        b2JointType[b2JointType["e_unknownJoint"] = 0] = "e_unknownJoint";
        b2JointType[b2JointType["e_revoluteJoint"] = 1] = "e_revoluteJoint";
        b2JointType[b2JointType["e_prismaticJoint"] = 2] = "e_prismaticJoint";
        b2JointType[b2JointType["e_distanceJoint"] = 3] = "e_distanceJoint";
        b2JointType[b2JointType["e_pulleyJoint"] = 4] = "e_pulleyJoint";
        b2JointType[b2JointType["e_mouseJoint"] = 5] = "e_mouseJoint";
        b2JointType[b2JointType["e_gearJoint"] = 6] = "e_gearJoint";
        b2JointType[b2JointType["e_wheelJoint"] = 7] = "e_wheelJoint";
        b2JointType[b2JointType["e_weldJoint"] = 8] = "e_weldJoint";
        b2JointType[b2JointType["e_frictionJoint"] = 9] = "e_frictionJoint";
        b2JointType[b2JointType["e_ropeJoint"] = 10] = "e_ropeJoint";
        b2JointType[b2JointType["e_motorJoint"] = 11] = "e_motorJoint";
        b2JointType[b2JointType["e_areaJoint"] = 12] = "e_areaJoint";
    })(b2JointType = exports.b2JointType || (exports.b2JointType = {}));
    var b2LimitState;
    (function (b2LimitState) {
        b2LimitState[b2LimitState["e_inactiveLimit"] = 0] = "e_inactiveLimit";
        b2LimitState[b2LimitState["e_atLowerLimit"] = 1] = "e_atLowerLimit";
        b2LimitState[b2LimitState["e_atUpperLimit"] = 2] = "e_atUpperLimit";
        b2LimitState[b2LimitState["e_equalLimits"] = 3] = "e_equalLimits";
    })(b2LimitState = exports.b2LimitState || (exports.b2LimitState = {}));
    var b2Jacobian = (function () {
        function b2Jacobian() {
            this.linear = new b2Math_14.b2Vec2();
            this.angularA = 0;
            this.angularB = 0;
        }
        b2Jacobian.prototype.SetZero = function () {
            this.linear.SetZero();
            this.angularA = 0;
            this.angularB = 0;
            return this;
        };
        b2Jacobian.prototype.Set = function (x, a1, a2) {
            this.linear.Copy(x);
            this.angularA = a1;
            this.angularB = a2;
            return this;
        };
        return b2Jacobian;
    }());
    exports.b2Jacobian = b2Jacobian;
    var b2JointEdge = (function () {
        function b2JointEdge(joint, other) {
            this.prev = null;
            this.next = null;
            this.joint = joint;
            this.other = other;
        }
        return b2JointEdge;
    }());
    exports.b2JointEdge = b2JointEdge;
    var b2JointDef = (function () {
        function b2JointDef(type) {
            this.type = b2JointType.e_unknownJoint;
            this.userData = null;
            this.collideConnected = false;
            this.type = type;
        }
        return b2JointDef;
    }());
    exports.b2JointDef = b2JointDef;
    var b2Joint = (function () {
        function b2Joint(def) {
            this.m_type = b2JointType.e_unknownJoint;
            this.m_prev = null;
            this.m_next = null;
            this.m_index = 0;
            this.m_islandFlag = false;
            this.m_collideConnected = false;
            this.m_userData = null;
            this.m_type = def.type;
            this.m_edgeA = new b2JointEdge(this, def.bodyB);
            this.m_edgeB = new b2JointEdge(this, def.bodyA);
            this.m_bodyA = def.bodyA;
            this.m_bodyB = def.bodyB;
            this.m_collideConnected = b2Settings_15.b2Maybe(def.collideConnected, false);
            this.m_userData = def.userData;
        }
        b2Joint.prototype.GetType = function () {
            return this.m_type;
        };
        b2Joint.prototype.GetBodyA = function () {
            return this.m_bodyA;
        };
        b2Joint.prototype.GetBodyB = function () {
            return this.m_bodyB;
        };
        b2Joint.prototype.GetNext = function () {
            return this.m_next;
        };
        b2Joint.prototype.GetUserData = function () {
            return this.m_userData;
        };
        b2Joint.prototype.SetUserData = function (data) {
            this.m_userData = data;
        };
        b2Joint.prototype.IsActive = function () {
            return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
        };
        b2Joint.prototype.GetCollideConnected = function () {
            return this.m_collideConnected;
        };
        b2Joint.prototype.Dump = function (log) {
            log("// Dump is not supported for this joint type.\n");
        };
        b2Joint.prototype.ShiftOrigin = function (newOrigin) {
        };
        return b2Joint;
    }());
    exports.b2Joint = b2Joint;
});
define("Particle/b2Particle", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Common/b2Draw"], function (require, exports, b2Settings_16, b2Math_15, b2Draw_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ParticleFlag;
    (function (b2ParticleFlag) {
        b2ParticleFlag[b2ParticleFlag["b2_waterParticle"] = 0] = "b2_waterParticle";
        b2ParticleFlag[b2ParticleFlag["b2_zombieParticle"] = 2] = "b2_zombieParticle";
        b2ParticleFlag[b2ParticleFlag["b2_wallParticle"] = 4] = "b2_wallParticle";
        b2ParticleFlag[b2ParticleFlag["b2_springParticle"] = 8] = "b2_springParticle";
        b2ParticleFlag[b2ParticleFlag["b2_elasticParticle"] = 16] = "b2_elasticParticle";
        b2ParticleFlag[b2ParticleFlag["b2_viscousParticle"] = 32] = "b2_viscousParticle";
        b2ParticleFlag[b2ParticleFlag["b2_powderParticle"] = 64] = "b2_powderParticle";
        b2ParticleFlag[b2ParticleFlag["b2_tensileParticle"] = 128] = "b2_tensileParticle";
        b2ParticleFlag[b2ParticleFlag["b2_colorMixingParticle"] = 256] = "b2_colorMixingParticle";
        b2ParticleFlag[b2ParticleFlag["b2_destructionListenerParticle"] = 512] = "b2_destructionListenerParticle";
        b2ParticleFlag[b2ParticleFlag["b2_barrierParticle"] = 1024] = "b2_barrierParticle";
        b2ParticleFlag[b2ParticleFlag["b2_staticPressureParticle"] = 2048] = "b2_staticPressureParticle";
        b2ParticleFlag[b2ParticleFlag["b2_reactiveParticle"] = 4096] = "b2_reactiveParticle";
        b2ParticleFlag[b2ParticleFlag["b2_repulsiveParticle"] = 8192] = "b2_repulsiveParticle";
        b2ParticleFlag[b2ParticleFlag["b2_fixtureContactListenerParticle"] = 16384] = "b2_fixtureContactListenerParticle";
        b2ParticleFlag[b2ParticleFlag["b2_particleContactListenerParticle"] = 32768] = "b2_particleContactListenerParticle";
        b2ParticleFlag[b2ParticleFlag["b2_fixtureContactFilterParticle"] = 65536] = "b2_fixtureContactFilterParticle";
        b2ParticleFlag[b2ParticleFlag["b2_particleContactFilterParticle"] = 131072] = "b2_particleContactFilterParticle";
    })(b2ParticleFlag = exports.b2ParticleFlag || (exports.b2ParticleFlag = {}));
    var b2ParticleDef = (function () {
        function b2ParticleDef() {
            this.flags = 0;
            this.position = new b2Math_15.b2Vec2();
            this.velocity = new b2Math_15.b2Vec2();
            this.color = new b2Draw_1.b2Color(0, 0, 0, 0);
            this.lifetime = 0.0;
            this.userData = null;
            this.group = null;
        }
        return b2ParticleDef;
    }());
    exports.b2ParticleDef = b2ParticleDef;
    function b2CalculateParticleIterations(gravity, radius, timeStep) {
        var B2_MAX_RECOMMENDED_PARTICLE_ITERATIONS = 8;
        var B2_RADIUS_THRESHOLD = 0.01;
        var iterations = Math.ceil(Math.sqrt(gravity / (B2_RADIUS_THRESHOLD * radius)) * timeStep);
        return b2Math_15.b2Clamp(iterations, 1, B2_MAX_RECOMMENDED_PARTICLE_ITERATIONS);
    }
    exports.b2CalculateParticleIterations = b2CalculateParticleIterations;
    var b2ParticleHandle = (function () {
        function b2ParticleHandle() {
            this.m_index = b2Settings_16.b2_invalidParticleIndex;
        }
        b2ParticleHandle.prototype.GetIndex = function () { return this.m_index; };
        b2ParticleHandle.prototype.SetIndex = function (index) { this.m_index = index; };
        return b2ParticleHandle;
    }());
    exports.b2ParticleHandle = b2ParticleHandle;
});
define("Dynamics/Joints/b2DistanceJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_17, b2Math_16, b2Joint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2DistanceJointDef = (function (_super) {
        __extends(b2DistanceJointDef, _super);
        function b2DistanceJointDef() {
            var _this = _super.call(this, b2Joint_1.b2JointType.e_distanceJoint) || this;
            _this.localAnchorA = new b2Math_16.b2Vec2();
            _this.localAnchorB = new b2Math_16.b2Vec2();
            _this.length = 1;
            _this.frequencyHz = 0;
            _this.dampingRatio = 0;
            return _this;
        }
        b2DistanceJointDef.prototype.Initialize = function (b1, b2, anchor1, anchor2) {
            this.bodyA = b1;
            this.bodyB = b2;
            this.bodyA.GetLocalPoint(anchor1, this.localAnchorA);
            this.bodyB.GetLocalPoint(anchor2, this.localAnchorB);
            this.length = b2Math_16.b2Vec2.DistanceVV(anchor1, anchor2);
            this.frequencyHz = 0;
            this.dampingRatio = 0;
        };
        return b2DistanceJointDef;
    }(b2Joint_1.b2JointDef));
    exports.b2DistanceJointDef = b2DistanceJointDef;
    var b2DistanceJoint = (function (_super) {
        __extends(b2DistanceJoint, _super);
        function b2DistanceJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_frequencyHz = 0;
            _this.m_dampingRatio = 0;
            _this.m_bias = 0;
            _this.m_localAnchorA = new b2Math_16.b2Vec2();
            _this.m_localAnchorB = new b2Math_16.b2Vec2();
            _this.m_gamma = 0;
            _this.m_impulse = 0;
            _this.m_length = 0;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_u = new b2Math_16.b2Vec2();
            _this.m_rA = new b2Math_16.b2Vec2();
            _this.m_rB = new b2Math_16.b2Vec2();
            _this.m_localCenterA = new b2Math_16.b2Vec2();
            _this.m_localCenterB = new b2Math_16.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_mass = 0;
            _this.m_qA = new b2Math_16.b2Rot();
            _this.m_qB = new b2Math_16.b2Rot();
            _this.m_lalcA = new b2Math_16.b2Vec2();
            _this.m_lalcB = new b2Math_16.b2Vec2();
            _this.m_frequencyHz = b2Settings_17.b2Maybe(def.frequencyHz, 0);
            _this.m_dampingRatio = b2Settings_17.b2Maybe(def.dampingRatio, 0);
            _this.m_localAnchorA.Copy(def.localAnchorA);
            _this.m_localAnchorB.Copy(def.localAnchorB);
            _this.m_length = def.length;
            return _this;
        }
        b2DistanceJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2DistanceJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2DistanceJoint.prototype.GetReactionForce = function (inv_dt, out) {
            out.x = inv_dt * this.m_impulse * this.m_u.x;
            out.y = inv_dt * this.m_impulse * this.m_u.y;
            return out;
        };
        b2DistanceJoint.prototype.GetReactionTorque = function (inv_dt) {
            return 0;
        };
        b2DistanceJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
        b2DistanceJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
        b2DistanceJoint.prototype.SetLength = function (length) {
            this.m_length = length;
        };
        b2DistanceJoint.prototype.Length = function () {
            return this.m_length;
        };
        b2DistanceJoint.prototype.SetFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        b2DistanceJoint.prototype.GetFrequency = function () {
            return this.m_frequencyHz;
        };
        b2DistanceJoint.prototype.SetDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        b2DistanceJoint.prototype.GetDampingRatio = function () {
            return this.m_dampingRatio;
        };
        b2DistanceJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2DistanceJointDef = new b2DistanceJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.length = %.15f;\n", this.m_length);
            log("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz);
            log("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2DistanceJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_16.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            b2Math_16.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_16.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            b2Math_16.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            this.m_u.x = cB.x + this.m_rB.x - cA.x - this.m_rA.x;
            this.m_u.y = cB.y + this.m_rB.y - cA.y - this.m_rA.y;
            var length = this.m_u.Length();
            if (length > b2Settings_17.b2_linearSlop) {
                this.m_u.SelfMul(1 / length);
            }
            else {
                this.m_u.SetZero();
            }
            var crAu = b2Math_16.b2Vec2.CrossVV(this.m_rA, this.m_u);
            var crBu = b2Math_16.b2Vec2.CrossVV(this.m_rB, this.m_u);
            var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
            this.m_mass = invMass !== 0 ? 1 / invMass : 0;
            if (this.m_frequencyHz > 0) {
                var C = length - this.m_length;
                var omega = 2 * b2Settings_17.b2_pi * this.m_frequencyHz;
                var d = 2 * this.m_mass * this.m_dampingRatio * omega;
                var k = this.m_mass * omega * omega;
                var h = data.step.dt;
                this.m_gamma = h * (d + h * k);
                this.m_gamma = this.m_gamma !== 0 ? 1 / this.m_gamma : 0;
                this.m_bias = C * h * k * this.m_gamma;
                invMass += this.m_gamma;
                this.m_mass = invMass !== 0 ? 1 / invMass : 0;
            }
            else {
                this.m_gamma = 0;
                this.m_bias = 0;
            }
            if (data.step.warmStarting) {
                this.m_impulse *= data.step.dtRatio;
                var P = b2Math_16.b2Vec2.MulSV(this.m_impulse, this.m_u, b2DistanceJoint.InitVelocityConstraints_s_P);
                vA.SelfMulSub(this.m_invMassA, P);
                wA -= this.m_invIA * b2Math_16.b2Vec2.CrossVV(this.m_rA, P);
                vB.SelfMulAdd(this.m_invMassB, P);
                wB += this.m_invIB * b2Math_16.b2Vec2.CrossVV(this.m_rB, P);
            }
            else {
                this.m_impulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2DistanceJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var vpA = b2Math_16.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2DistanceJoint.SolveVelocityConstraints_s_vpA);
            var vpB = b2Math_16.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2DistanceJoint.SolveVelocityConstraints_s_vpB);
            var Cdot = b2Math_16.b2Vec2.DotVV(this.m_u, b2Math_16.b2Vec2.SubVV(vpB, vpA, b2Math_16.b2Vec2.s_t0));
            var impulse = (-this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse));
            this.m_impulse += impulse;
            var P = b2Math_16.b2Vec2.MulSV(impulse, this.m_u, b2DistanceJoint.SolveVelocityConstraints_s_P);
            vA.SelfMulSub(this.m_invMassA, P);
            wA -= this.m_invIA * b2Math_16.b2Vec2.CrossVV(this.m_rA, P);
            vB.SelfMulAdd(this.m_invMassB, P);
            wB += this.m_invIB * b2Math_16.b2Vec2.CrossVV(this.m_rB, P);
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2DistanceJoint.prototype.SolvePositionConstraints = function (data) {
            if (this.m_frequencyHz > 0) {
                return true;
            }
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            var rA = b2Math_16.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            var rB = b2Math_16.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var u = this.m_u;
            u.x = cB.x + rB.x - cA.x - rA.x;
            u.y = cB.y + rB.y - cA.y - rA.y;
            var length = this.m_u.Normalize();
            var C = length - this.m_length;
            C = b2Math_16.b2Clamp(C, (-b2Settings_17.b2_maxLinearCorrection), b2Settings_17.b2_maxLinearCorrection);
            var impulse = (-this.m_mass * C);
            var P = b2Math_16.b2Vec2.MulSV(impulse, u, b2DistanceJoint.SolvePositionConstraints_s_P);
            cA.SelfMulSub(this.m_invMassA, P);
            aA -= this.m_invIA * b2Math_16.b2Vec2.CrossVV(rA, P);
            cB.SelfMulAdd(this.m_invMassB, P);
            aB += this.m_invIB * b2Math_16.b2Vec2.CrossVV(rB, P);
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            return b2Math_16.b2Abs(C) < b2Settings_17.b2_linearSlop;
        };
        b2DistanceJoint.InitVelocityConstraints_s_P = new b2Math_16.b2Vec2();
        b2DistanceJoint.SolveVelocityConstraints_s_vpA = new b2Math_16.b2Vec2();
        b2DistanceJoint.SolveVelocityConstraints_s_vpB = new b2Math_16.b2Vec2();
        b2DistanceJoint.SolveVelocityConstraints_s_P = new b2Math_16.b2Vec2();
        b2DistanceJoint.SolvePositionConstraints_s_P = new b2Math_16.b2Vec2();
        return b2DistanceJoint;
    }(b2Joint_1.b2Joint));
    exports.b2DistanceJoint = b2DistanceJoint;
});
define("Dynamics/Joints/b2AreaJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint", "Dynamics/Joints/b2DistanceJoint"], function (require, exports, b2Settings_18, b2Math_17, b2Joint_2, b2DistanceJoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2AreaJointDef = (function (_super) {
        __extends(b2AreaJointDef, _super);
        function b2AreaJointDef() {
            var _this = _super.call(this, b2Joint_2.b2JointType.e_areaJoint) || this;
            _this.bodies = [];
            _this.frequencyHz = 0;
            _this.dampingRatio = 0;
            return _this;
        }
        b2AreaJointDef.prototype.AddBody = function (body) {
            this.bodies.push(body);
            if (this.bodies.length === 1) {
                this.bodyA = body;
            }
            else if (this.bodies.length === 2) {
                this.bodyB = body;
            }
        };
        return b2AreaJointDef;
    }(b2Joint_2.b2JointDef));
    exports.b2AreaJointDef = b2AreaJointDef;
    var b2AreaJoint = (function (_super) {
        __extends(b2AreaJoint, _super);
        function b2AreaJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_frequencyHz = 0;
            _this.m_dampingRatio = 0;
            _this.m_impulse = 0;
            _this.m_targetArea = 0;
            _this.m_bodies = def.bodies;
            _this.m_frequencyHz = b2Settings_18.b2Maybe(def.frequencyHz, 0);
            _this.m_dampingRatio = b2Settings_18.b2Maybe(def.dampingRatio, 0);
            _this.m_targetLengths = b2Settings_18.b2MakeNumberArray(def.bodies.length);
            _this.m_normals = b2Math_17.b2Vec2.MakeArray(def.bodies.length);
            _this.m_joints = [];
            _this.m_deltas = b2Math_17.b2Vec2.MakeArray(def.bodies.length);
            _this.m_delta = new b2Math_17.b2Vec2();
            var djd = new b2DistanceJoint_1.b2DistanceJointDef();
            djd.frequencyHz = _this.m_frequencyHz;
            djd.dampingRatio = _this.m_dampingRatio;
            _this.m_targetArea = 0;
            for (var i = 0; i < _this.m_bodies.length; ++i) {
                var body = _this.m_bodies[i];
                var next = _this.m_bodies[(i + 1) % _this.m_bodies.length];
                var body_c = body.GetWorldCenter();
                var next_c = next.GetWorldCenter();
                _this.m_targetLengths[i] = b2Math_17.b2Vec2.DistanceVV(body_c, next_c);
                _this.m_targetArea += b2Math_17.b2Vec2.CrossVV(body_c, next_c);
                djd.Initialize(body, next, body_c, next_c);
                _this.m_joints[i] = body.GetWorld().CreateJoint(djd);
            }
            _this.m_targetArea *= 0.5;
            return _this;
        }
        b2AreaJoint.prototype.GetAnchorA = function (out) {
            return out;
        };
        b2AreaJoint.prototype.GetAnchorB = function (out) {
            return out;
        };
        b2AreaJoint.prototype.GetReactionForce = function (inv_dt, out) {
            return out;
        };
        b2AreaJoint.prototype.GetReactionTorque = function (inv_dt) {
            return 0;
        };
        b2AreaJoint.prototype.SetFrequency = function (hz) {
            this.m_frequencyHz = hz;
            for (var i = 0; i < this.m_joints.length; ++i) {
                this.m_joints[i].SetFrequency(hz);
            }
        };
        b2AreaJoint.prototype.GetFrequency = function () {
            return this.m_frequencyHz;
        };
        b2AreaJoint.prototype.SetDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
            for (var i = 0; i < this.m_joints.length; ++i) {
                this.m_joints[i].SetDampingRatio(ratio);
            }
        };
        b2AreaJoint.prototype.GetDampingRatio = function () {
            return this.m_dampingRatio;
        };
        b2AreaJoint.prototype.Dump = function (log) {
            log("Area joint dumping is not supported.\n");
        };
        b2AreaJoint.prototype.InitVelocityConstraints = function (data) {
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var prev = this.m_bodies[(i + this.m_bodies.length - 1) % this.m_bodies.length];
                var next = this.m_bodies[(i + 1) % this.m_bodies.length];
                var prev_c = data.positions[prev.m_islandIndex].c;
                var next_c = data.positions[next.m_islandIndex].c;
                var delta = this.m_deltas[i];
                b2Math_17.b2Vec2.SubVV(next_c, prev_c, delta);
            }
            if (data.step.warmStarting) {
                this.m_impulse *= data.step.dtRatio;
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var body = this.m_bodies[i];
                    var body_v = data.velocities[body.m_islandIndex].v;
                    var delta = this.m_deltas[i];
                    body_v.x += body.m_invMass * delta.y * 0.5 * this.m_impulse;
                    body_v.y += body.m_invMass * -delta.x * 0.5 * this.m_impulse;
                }
            }
            else {
                this.m_impulse = 0;
            }
        };
        b2AreaJoint.prototype.SolveVelocityConstraints = function (data) {
            var dotMassSum = 0;
            var crossMassSum = 0;
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                var body_v = data.velocities[body.m_islandIndex].v;
                var delta = this.m_deltas[i];
                dotMassSum += delta.LengthSquared() / body.GetMass();
                crossMassSum += b2Math_17.b2Vec2.CrossVV(body_v, delta);
            }
            var lambda = -2 * crossMassSum / dotMassSum;
            this.m_impulse += lambda;
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                var body_v = data.velocities[body.m_islandIndex].v;
                var delta = this.m_deltas[i];
                body_v.x += body.m_invMass * delta.y * 0.5 * lambda;
                body_v.y += body.m_invMass * -delta.x * 0.5 * lambda;
            }
        };
        b2AreaJoint.prototype.SolvePositionConstraints = function (data) {
            var perimeter = 0;
            var area = 0;
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                var next = this.m_bodies[(i + 1) % this.m_bodies.length];
                var body_c = data.positions[body.m_islandIndex].c;
                var next_c = data.positions[next.m_islandIndex].c;
                var delta = b2Math_17.b2Vec2.SubVV(next_c, body_c, this.m_delta);
                var dist = delta.Length();
                if (dist < b2Settings_18.b2_epsilon) {
                    dist = 1;
                }
                this.m_normals[i].x = delta.y / dist;
                this.m_normals[i].y = -delta.x / dist;
                perimeter += dist;
                area += b2Math_17.b2Vec2.CrossVV(body_c, next_c);
            }
            area *= 0.5;
            var deltaArea = this.m_targetArea - area;
            var toExtrude = 0.5 * deltaArea / perimeter;
            var done = true;
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                var body_c = data.positions[body.m_islandIndex].c;
                var next_i = (i + 1) % this.m_bodies.length;
                var delta = b2Math_17.b2Vec2.AddVV(this.m_normals[i], this.m_normals[next_i], this.m_delta);
                delta.SelfMul(toExtrude);
                var norm_sq = delta.LengthSquared();
                if (norm_sq > b2Math_17.b2Sq(b2Settings_18.b2_maxLinearCorrection)) {
                    delta.SelfMul(b2Settings_18.b2_maxLinearCorrection / b2Math_17.b2Sqrt(norm_sq));
                }
                if (norm_sq > b2Math_17.b2Sq(b2Settings_18.b2_linearSlop)) {
                    done = false;
                }
                body_c.x += delta.x;
                body_c.y += delta.y;
            }
            return done;
        };
        return b2AreaJoint;
    }(b2Joint_2.b2Joint));
    exports.b2AreaJoint = b2AreaJoint;
});
define("Dynamics/Joints/b2FrictionJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_19, b2Math_18, b2Joint_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2FrictionJointDef = (function (_super) {
        __extends(b2FrictionJointDef, _super);
        function b2FrictionJointDef() {
            var _this = _super.call(this, b2Joint_3.b2JointType.e_frictionJoint) || this;
            _this.localAnchorA = new b2Math_18.b2Vec2();
            _this.localAnchorB = new b2Math_18.b2Vec2();
            _this.maxForce = 0;
            _this.maxTorque = 0;
            return _this;
        }
        b2FrictionJointDef.prototype.Initialize = function (bA, bB, anchor) {
            this.bodyA = bA;
            this.bodyB = bB;
            this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
            this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
        };
        return b2FrictionJointDef;
    }(b2Joint_3.b2JointDef));
    exports.b2FrictionJointDef = b2FrictionJointDef;
    var b2FrictionJoint = (function (_super) {
        __extends(b2FrictionJoint, _super);
        function b2FrictionJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_localAnchorA = new b2Math_18.b2Vec2();
            _this.m_localAnchorB = new b2Math_18.b2Vec2();
            _this.m_linearImpulse = new b2Math_18.b2Vec2();
            _this.m_angularImpulse = 0;
            _this.m_maxForce = 0;
            _this.m_maxTorque = 0;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_rA = new b2Math_18.b2Vec2();
            _this.m_rB = new b2Math_18.b2Vec2();
            _this.m_localCenterA = new b2Math_18.b2Vec2();
            _this.m_localCenterB = new b2Math_18.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_linearMass = new b2Math_18.b2Mat22();
            _this.m_angularMass = 0;
            _this.m_qA = new b2Math_18.b2Rot();
            _this.m_qB = new b2Math_18.b2Rot();
            _this.m_lalcA = new b2Math_18.b2Vec2();
            _this.m_lalcB = new b2Math_18.b2Vec2();
            _this.m_K = new b2Math_18.b2Mat22();
            _this.m_localAnchorA.Copy(def.localAnchorA);
            _this.m_localAnchorB.Copy(def.localAnchorB);
            _this.m_linearImpulse.SetZero();
            _this.m_maxForce = b2Settings_19.b2Maybe(def.maxForce, 0);
            _this.m_maxTorque = b2Settings_19.b2Maybe(def.maxTorque, 0);
            _this.m_linearMass.SetZero();
            return _this;
        }
        b2FrictionJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_18.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var rA = b2Math_18.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_18.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var rB = b2Math_18.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var K = this.m_K;
            K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
            K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
            K.GetInverse(this.m_linearMass);
            this.m_angularMass = iA + iB;
            if (this.m_angularMass > 0) {
                this.m_angularMass = 1 / this.m_angularMass;
            }
            if (data.step.warmStarting) {
                this.m_linearImpulse.SelfMul(data.step.dtRatio);
                this.m_angularImpulse *= data.step.dtRatio;
                var P = this.m_linearImpulse;
                vA.SelfMulSub(mA, P);
                wA -= iA * (b2Math_18.b2Vec2.CrossVV(this.m_rA, P) + this.m_angularImpulse);
                vB.SelfMulAdd(mB, P);
                wB += iB * (b2Math_18.b2Vec2.CrossVV(this.m_rB, P) + this.m_angularImpulse);
            }
            else {
                this.m_linearImpulse.SetZero();
                this.m_angularImpulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2FrictionJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var h = data.step.dt;
            {
                var Cdot = wB - wA;
                var impulse = (-this.m_angularMass * Cdot);
                var oldImpulse = this.m_angularImpulse;
                var maxImpulse = h * this.m_maxTorque;
                this.m_angularImpulse = b2Math_18.b2Clamp(this.m_angularImpulse + impulse, (-maxImpulse), maxImpulse);
                impulse = this.m_angularImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            {
                var Cdot_v2 = b2Math_18.b2Vec2.SubVV(b2Math_18.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2Math_18.b2Vec2.s_t0), b2Math_18.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2Math_18.b2Vec2.s_t1), b2FrictionJoint.SolveVelocityConstraints_s_Cdot_v2);
                var impulseV = b2Math_18.b2Mat22.MulMV(this.m_linearMass, Cdot_v2, b2FrictionJoint.SolveVelocityConstraints_s_impulseV).SelfNeg();
                var oldImpulseV = b2FrictionJoint.SolveVelocityConstraints_s_oldImpulseV.Copy(this.m_linearImpulse);
                this.m_linearImpulse.SelfAdd(impulseV);
                var maxImpulse = h * this.m_maxForce;
                if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
                    this.m_linearImpulse.Normalize();
                    this.m_linearImpulse.SelfMul(maxImpulse);
                }
                b2Math_18.b2Vec2.SubVV(this.m_linearImpulse, oldImpulseV, impulseV);
                vA.SelfMulSub(mA, impulseV);
                wA -= iA * b2Math_18.b2Vec2.CrossVV(this.m_rA, impulseV);
                vB.SelfMulAdd(mB, impulseV);
                wB += iB * b2Math_18.b2Vec2.CrossVV(this.m_rB, impulseV);
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2FrictionJoint.prototype.SolvePositionConstraints = function (data) {
            return true;
        };
        b2FrictionJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2FrictionJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2FrictionJoint.prototype.GetReactionForce = function (inv_dt, out) {
            out.x = inv_dt * this.m_linearImpulse.x;
            out.y = inv_dt * this.m_linearImpulse.y;
            return out;
        };
        b2FrictionJoint.prototype.GetReactionTorque = function (inv_dt) {
            return inv_dt * this.m_angularImpulse;
        };
        b2FrictionJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
        b2FrictionJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
        b2FrictionJoint.prototype.SetMaxForce = function (force) {
            this.m_maxForce = force;
        };
        b2FrictionJoint.prototype.GetMaxForce = function () {
            return this.m_maxForce;
        };
        b2FrictionJoint.prototype.SetMaxTorque = function (torque) {
            this.m_maxTorque = torque;
        };
        b2FrictionJoint.prototype.GetMaxTorque = function () {
            return this.m_maxTorque;
        };
        b2FrictionJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2FrictionJointDef = new b2FrictionJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.maxForce = %.15f;\n", this.m_maxForce);
            log("  jd.maxTorque = %.15f;\n", this.m_maxTorque);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2FrictionJoint.SolveVelocityConstraints_s_Cdot_v2 = new b2Math_18.b2Vec2();
        b2FrictionJoint.SolveVelocityConstraints_s_impulseV = new b2Math_18.b2Vec2();
        b2FrictionJoint.SolveVelocityConstraints_s_oldImpulseV = new b2Math_18.b2Vec2();
        return b2FrictionJoint;
    }(b2Joint_3.b2Joint));
    exports.b2FrictionJoint = b2FrictionJoint;
});
define("Dynamics/Joints/b2PrismaticJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_20, b2Math_19, b2Joint_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2PrismaticJointDef = (function (_super) {
        __extends(b2PrismaticJointDef, _super);
        function b2PrismaticJointDef() {
            var _this = _super.call(this, b2Joint_4.b2JointType.e_prismaticJoint) || this;
            _this.localAnchorA = new b2Math_19.b2Vec2();
            _this.localAnchorB = new b2Math_19.b2Vec2();
            _this.localAxisA = new b2Math_19.b2Vec2(1, 0);
            _this.referenceAngle = 0;
            _this.enableLimit = false;
            _this.lowerTranslation = 0;
            _this.upperTranslation = 0;
            _this.enableMotor = false;
            _this.maxMotorForce = 0;
            _this.motorSpeed = 0;
            return _this;
        }
        b2PrismaticJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
            this.bodyA = bA;
            this.bodyB = bB;
            this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
            this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
            this.bodyA.GetLocalVector(axis, this.localAxisA);
            this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
        };
        return b2PrismaticJointDef;
    }(b2Joint_4.b2JointDef));
    exports.b2PrismaticJointDef = b2PrismaticJointDef;
    var b2PrismaticJoint = (function (_super) {
        __extends(b2PrismaticJoint, _super);
        function b2PrismaticJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_localAnchorA = new b2Math_19.b2Vec2();
            _this.m_localAnchorB = new b2Math_19.b2Vec2();
            _this.m_localXAxisA = new b2Math_19.b2Vec2();
            _this.m_localYAxisA = new b2Math_19.b2Vec2();
            _this.m_referenceAngle = 0;
            _this.m_impulse = new b2Math_19.b2Vec3(0, 0, 0);
            _this.m_motorImpulse = 0;
            _this.m_lowerTranslation = 0;
            _this.m_upperTranslation = 0;
            _this.m_maxMotorForce = 0;
            _this.m_motorSpeed = 0;
            _this.m_enableLimit = false;
            _this.m_enableMotor = false;
            _this.m_limitState = b2Joint_4.b2LimitState.e_inactiveLimit;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_localCenterA = new b2Math_19.b2Vec2();
            _this.m_localCenterB = new b2Math_19.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_axis = new b2Math_19.b2Vec2(0, 0);
            _this.m_perp = new b2Math_19.b2Vec2(0, 0);
            _this.m_s1 = 0;
            _this.m_s2 = 0;
            _this.m_a1 = 0;
            _this.m_a2 = 0;
            _this.m_K = new b2Math_19.b2Mat33();
            _this.m_K3 = new b2Math_19.b2Mat33();
            _this.m_K2 = new b2Math_19.b2Mat22();
            _this.m_motorMass = 0;
            _this.m_qA = new b2Math_19.b2Rot();
            _this.m_qB = new b2Math_19.b2Rot();
            _this.m_lalcA = new b2Math_19.b2Vec2();
            _this.m_lalcB = new b2Math_19.b2Vec2();
            _this.m_rA = new b2Math_19.b2Vec2();
            _this.m_rB = new b2Math_19.b2Vec2();
            _this.m_localAnchorA.Copy(b2Settings_20.b2Maybe(def.localAnchorA, b2Math_19.b2Vec2.ZERO));
            _this.m_localAnchorB.Copy(b2Settings_20.b2Maybe(def.localAnchorB, b2Math_19.b2Vec2.ZERO));
            _this.m_localXAxisA.Copy(b2Settings_20.b2Maybe(def.localAxisA, new b2Math_19.b2Vec2(1, 0))).SelfNormalize();
            b2Math_19.b2Vec2.CrossOneV(_this.m_localXAxisA, _this.m_localYAxisA);
            _this.m_referenceAngle = b2Settings_20.b2Maybe(def.referenceAngle, 0);
            _this.m_lowerTranslation = b2Settings_20.b2Maybe(def.lowerTranslation, 0);
            _this.m_upperTranslation = b2Settings_20.b2Maybe(def.upperTranslation, 0);
            _this.m_maxMotorForce = b2Settings_20.b2Maybe(def.maxMotorForce, 0);
            _this.m_motorSpeed = b2Settings_20.b2Maybe(def.motorSpeed, 0);
            _this.m_enableLimit = b2Settings_20.b2Maybe(def.enableLimit, false);
            _this.m_enableMotor = b2Settings_20.b2Maybe(def.enableMotor, false);
            return _this;
        }
        b2PrismaticJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_19.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var rA = b2Math_19.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_19.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var rB = b2Math_19.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var d = b2Math_19.b2Vec2.AddVV(b2Math_19.b2Vec2.SubVV(cB, cA, b2Math_19.b2Vec2.s_t0), b2Math_19.b2Vec2.SubVV(rB, rA, b2Math_19.b2Vec2.s_t1), b2PrismaticJoint.InitVelocityConstraints_s_d);
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            {
                b2Math_19.b2Rot.MulRV(qA, this.m_localXAxisA, this.m_axis);
                this.m_a1 = b2Math_19.b2Vec2.CrossVV(b2Math_19.b2Vec2.AddVV(d, rA, b2Math_19.b2Vec2.s_t0), this.m_axis);
                this.m_a2 = b2Math_19.b2Vec2.CrossVV(rB, this.m_axis);
                this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
                if (this.m_motorMass > 0) {
                    this.m_motorMass = 1 / this.m_motorMass;
                }
            }
            {
                b2Math_19.b2Rot.MulRV(qA, this.m_localYAxisA, this.m_perp);
                this.m_s1 = b2Math_19.b2Vec2.CrossVV(b2Math_19.b2Vec2.AddVV(d, rA, b2Math_19.b2Vec2.s_t0), this.m_perp);
                this.m_s2 = b2Math_19.b2Vec2.CrossVV(rB, this.m_perp);
                this.m_K.ex.x = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
                this.m_K.ex.y = iA * this.m_s1 + iB * this.m_s2;
                this.m_K.ex.z = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
                this.m_K.ey.x = this.m_K.ex.y;
                this.m_K.ey.y = iA + iB;
                if (this.m_K.ey.y === 0) {
                    this.m_K.ey.y = 1;
                }
                this.m_K.ey.z = iA * this.m_a1 + iB * this.m_a2;
                this.m_K.ez.x = this.m_K.ex.z;
                this.m_K.ez.y = this.m_K.ey.z;
                this.m_K.ez.z = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
            }
            if (this.m_enableLimit) {
                var jointTranslation = b2Math_19.b2Vec2.DotVV(this.m_axis, d);
                if (b2Math_19.b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings_20.b2_linearSlop) {
                    this.m_limitState = b2Joint_4.b2LimitState.e_equalLimits;
                }
                else if (jointTranslation <= this.m_lowerTranslation) {
                    if (this.m_limitState !== b2Joint_4.b2LimitState.e_atLowerLimit) {
                        this.m_limitState = b2Joint_4.b2LimitState.e_atLowerLimit;
                        this.m_impulse.z = 0;
                    }
                }
                else if (jointTranslation >= this.m_upperTranslation) {
                    if (this.m_limitState !== b2Joint_4.b2LimitState.e_atUpperLimit) {
                        this.m_limitState = b2Joint_4.b2LimitState.e_atUpperLimit;
                        this.m_impulse.z = 0;
                    }
                }
                else {
                    this.m_limitState = b2Joint_4.b2LimitState.e_inactiveLimit;
                    this.m_impulse.z = 0;
                }
            }
            else {
                this.m_limitState = b2Joint_4.b2LimitState.e_inactiveLimit;
                this.m_impulse.z = 0;
            }
            if (!this.m_enableMotor) {
                this.m_motorImpulse = 0;
            }
            if (data.step.warmStarting) {
                this.m_impulse.SelfMul(data.step.dtRatio);
                this.m_motorImpulse *= data.step.dtRatio;
                var P = b2Math_19.b2Vec2.AddVV(b2Math_19.b2Vec2.MulSV(this.m_impulse.x, this.m_perp, b2Math_19.b2Vec2.s_t0), b2Math_19.b2Vec2.MulSV((this.m_motorImpulse + this.m_impulse.z), this.m_axis, b2Math_19.b2Vec2.s_t1), b2PrismaticJoint.InitVelocityConstraints_s_P);
                var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
                var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
                vA.SelfMulSub(mA, P);
                wA -= iA * LA;
                vB.SelfMulAdd(mB, P);
                wB += iB * LB;
            }
            else {
                this.m_impulse.SetZero();
                this.m_motorImpulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2PrismaticJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            if (this.m_enableMotor && this.m_limitState !== b2Joint_4.b2LimitState.e_equalLimits) {
                var Cdot = b2Math_19.b2Vec2.DotVV(this.m_axis, b2Math_19.b2Vec2.SubVV(vB, vA, b2Math_19.b2Vec2.s_t0)) + this.m_a2 * wB - this.m_a1 * wA;
                var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
                var oldImpulse = this.m_motorImpulse;
                var maxImpulse = data.step.dt * this.m_maxMotorForce;
                this.m_motorImpulse = b2Math_19.b2Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                var P = b2Math_19.b2Vec2.MulSV(impulse, this.m_axis, b2PrismaticJoint.SolveVelocityConstraints_s_P);
                var LA = impulse * this.m_a1;
                var LB = impulse * this.m_a2;
                vA.SelfMulSub(mA, P);
                wA -= iA * LA;
                vB.SelfMulAdd(mB, P);
                wB += iB * LB;
            }
            var Cdot1_x = b2Math_19.b2Vec2.DotVV(this.m_perp, b2Math_19.b2Vec2.SubVV(vB, vA, b2Math_19.b2Vec2.s_t0)) + this.m_s2 * wB - this.m_s1 * wA;
            var Cdot1_y = wB - wA;
            if (this.m_enableLimit && this.m_limitState !== b2Joint_4.b2LimitState.e_inactiveLimit) {
                var Cdot2 = b2Math_19.b2Vec2.DotVV(this.m_axis, b2Math_19.b2Vec2.SubVV(vB, vA, b2Math_19.b2Vec2.s_t0)) + this.m_a2 * wB - this.m_a1 * wA;
                var f1 = b2PrismaticJoint.SolveVelocityConstraints_s_f1.Copy(this.m_impulse);
                var df3 = this.m_K.Solve33((-Cdot1_x), (-Cdot1_y), (-Cdot2), b2PrismaticJoint.SolveVelocityConstraints_s_df3);
                this.m_impulse.SelfAdd(df3);
                if (this.m_limitState === b2Joint_4.b2LimitState.e_atLowerLimit) {
                    this.m_impulse.z = b2Math_19.b2Max(this.m_impulse.z, 0);
                }
                else if (this.m_limitState === b2Joint_4.b2LimitState.e_atUpperLimit) {
                    this.m_impulse.z = b2Math_19.b2Min(this.m_impulse.z, 0);
                }
                var b_x = (-Cdot1_x) - (this.m_impulse.z - f1.z) * this.m_K.ez.x;
                var b_y = (-Cdot1_y) - (this.m_impulse.z - f1.z) * this.m_K.ez.y;
                var f2r = this.m_K.Solve22(b_x, b_y, b2PrismaticJoint.SolveVelocityConstraints_s_f2r);
                f2r.x += f1.x;
                f2r.y += f1.y;
                this.m_impulse.x = f2r.x;
                this.m_impulse.y = f2r.y;
                df3.x = this.m_impulse.x - f1.x;
                df3.y = this.m_impulse.y - f1.y;
                df3.z = this.m_impulse.z - f1.z;
                var P = b2Math_19.b2Vec2.AddVV(b2Math_19.b2Vec2.MulSV(df3.x, this.m_perp, b2Math_19.b2Vec2.s_t0), b2Math_19.b2Vec2.MulSV(df3.z, this.m_axis, b2Math_19.b2Vec2.s_t1), b2PrismaticJoint.SolveVelocityConstraints_s_P);
                var LA = df3.x * this.m_s1 + df3.y + df3.z * this.m_a1;
                var LB = df3.x * this.m_s2 + df3.y + df3.z * this.m_a2;
                vA.SelfMulSub(mA, P);
                wA -= iA * LA;
                vB.SelfMulAdd(mB, P);
                wB += iB * LB;
            }
            else {
                var df2 = this.m_K.Solve22((-Cdot1_x), (-Cdot1_y), b2PrismaticJoint.SolveVelocityConstraints_s_df2);
                this.m_impulse.x += df2.x;
                this.m_impulse.y += df2.y;
                var P = b2Math_19.b2Vec2.MulSV(df2.x, this.m_perp, b2PrismaticJoint.SolveVelocityConstraints_s_P);
                var LA = df2.x * this.m_s1 + df2.y;
                var LB = df2.x * this.m_s2 + df2.y;
                vA.SelfMulSub(mA, P);
                wA -= iA * LA;
                vB.SelfMulAdd(mB, P);
                wB += iB * LB;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2PrismaticJoint.prototype.SolvePositionConstraints = function (data) {
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var rA = b2Math_19.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            var rB = b2Math_19.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var d = b2Math_19.b2Vec2.SubVV(b2Math_19.b2Vec2.AddVV(cB, rB, b2Math_19.b2Vec2.s_t0), b2Math_19.b2Vec2.AddVV(cA, rA, b2Math_19.b2Vec2.s_t1), b2PrismaticJoint.SolvePositionConstraints_s_d);
            var axis = b2Math_19.b2Rot.MulRV(qA, this.m_localXAxisA, this.m_axis);
            var a1 = b2Math_19.b2Vec2.CrossVV(b2Math_19.b2Vec2.AddVV(d, rA, b2Math_19.b2Vec2.s_t0), axis);
            var a2 = b2Math_19.b2Vec2.CrossVV(rB, axis);
            var perp = b2Math_19.b2Rot.MulRV(qA, this.m_localYAxisA, this.m_perp);
            var s1 = b2Math_19.b2Vec2.CrossVV(b2Math_19.b2Vec2.AddVV(d, rA, b2Math_19.b2Vec2.s_t0), perp);
            var s2 = b2Math_19.b2Vec2.CrossVV(rB, perp);
            var impulse = b2PrismaticJoint.SolvePositionConstraints_s_impulse;
            var C1_x = b2Math_19.b2Vec2.DotVV(perp, d);
            var C1_y = aB - aA - this.m_referenceAngle;
            var linearError = b2Math_19.b2Abs(C1_x);
            var angularError = b2Math_19.b2Abs(C1_y);
            var active = false;
            var C2 = 0;
            if (this.m_enableLimit) {
                var translation = b2Math_19.b2Vec2.DotVV(axis, d);
                if (b2Math_19.b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings_20.b2_linearSlop) {
                    C2 = b2Math_19.b2Clamp(translation, (-b2Settings_20.b2_maxLinearCorrection), b2Settings_20.b2_maxLinearCorrection);
                    linearError = b2Math_19.b2Max(linearError, b2Math_19.b2Abs(translation));
                    active = true;
                }
                else if (translation <= this.m_lowerTranslation) {
                    C2 = b2Math_19.b2Clamp(translation - this.m_lowerTranslation + b2Settings_20.b2_linearSlop, (-b2Settings_20.b2_maxLinearCorrection), 0);
                    linearError = b2Math_19.b2Max(linearError, this.m_lowerTranslation - translation);
                    active = true;
                }
                else if (translation >= this.m_upperTranslation) {
                    C2 = b2Math_19.b2Clamp(translation - this.m_upperTranslation - b2Settings_20.b2_linearSlop, 0, b2Settings_20.b2_maxLinearCorrection);
                    linearError = b2Math_19.b2Max(linearError, translation - this.m_upperTranslation);
                    active = true;
                }
            }
            if (active) {
                var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
                var k12 = iA * s1 + iB * s2;
                var k13 = iA * s1 * a1 + iB * s2 * a2;
                var k22 = iA + iB;
                if (k22 === 0) {
                    k22 = 1;
                }
                var k23 = iA * a1 + iB * a2;
                var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
                var K = this.m_K3;
                K.ex.SetXYZ(k11, k12, k13);
                K.ey.SetXYZ(k12, k22, k23);
                K.ez.SetXYZ(k13, k23, k33);
                impulse = K.Solve33((-C1_x), (-C1_y), (-C2), impulse);
            }
            else {
                var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
                var k12 = iA * s1 + iB * s2;
                var k22 = iA + iB;
                if (k22 === 0) {
                    k22 = 1;
                }
                var K2 = this.m_K2;
                K2.ex.Set(k11, k12);
                K2.ey.Set(k12, k22);
                var impulse1 = K2.Solve((-C1_x), (-C1_y), b2PrismaticJoint.SolvePositionConstraints_s_impulse1);
                impulse.x = impulse1.x;
                impulse.y = impulse1.y;
                impulse.z = 0;
            }
            var P = b2Math_19.b2Vec2.AddVV(b2Math_19.b2Vec2.MulSV(impulse.x, perp, b2Math_19.b2Vec2.s_t0), b2Math_19.b2Vec2.MulSV(impulse.z, axis, b2Math_19.b2Vec2.s_t1), b2PrismaticJoint.SolvePositionConstraints_s_P);
            var LA = impulse.x * s1 + impulse.y + impulse.z * a1;
            var LB = impulse.x * s2 + impulse.y + impulse.z * a2;
            cA.SelfMulSub(mA, P);
            aA -= iA * LA;
            cB.SelfMulAdd(mB, P);
            aB += iB * LB;
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            return linearError <= b2Settings_20.b2_linearSlop && angularError <= b2Settings_20.b2_angularSlop;
        };
        b2PrismaticJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2PrismaticJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2PrismaticJoint.prototype.GetReactionForce = function (inv_dt, out) {
            out.x = inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x);
            out.y = inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y);
            return out;
        };
        b2PrismaticJoint.prototype.GetReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.y;
        };
        b2PrismaticJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
        b2PrismaticJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
        b2PrismaticJoint.prototype.GetLocalAxisA = function () { return this.m_localXAxisA; };
        b2PrismaticJoint.prototype.GetReferenceAngle = function () { return this.m_referenceAngle; };
        b2PrismaticJoint.prototype.GetJointTranslation = function () {
            var pA = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, b2PrismaticJoint.GetJointTranslation_s_pA);
            var pB = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, b2PrismaticJoint.GetJointTranslation_s_pB);
            var d = b2Math_19.b2Vec2.SubVV(pB, pA, b2PrismaticJoint.GetJointTranslation_s_d);
            var axis = this.m_bodyA.GetWorldVector(this.m_localXAxisA, b2PrismaticJoint.GetJointTranslation_s_axis);
            var translation = b2Math_19.b2Vec2.DotVV(d, axis);
            return translation;
        };
        b2PrismaticJoint.prototype.GetJointSpeed = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            b2Math_19.b2Vec2.SubVV(this.m_localAnchorA, bA.m_sweep.localCenter, this.m_lalcA);
            var rA = b2Math_19.b2Rot.MulRV(bA.m_xf.q, this.m_lalcA, this.m_rA);
            b2Math_19.b2Vec2.SubVV(this.m_localAnchorB, bB.m_sweep.localCenter, this.m_lalcB);
            var rB = b2Math_19.b2Rot.MulRV(bB.m_xf.q, this.m_lalcB, this.m_rB);
            var pA = b2Math_19.b2Vec2.AddVV(bA.m_sweep.c, rA, b2Math_19.b2Vec2.s_t0);
            var pB = b2Math_19.b2Vec2.AddVV(bB.m_sweep.c, rB, b2Math_19.b2Vec2.s_t1);
            var d = b2Math_19.b2Vec2.SubVV(pB, pA, b2Math_19.b2Vec2.s_t2);
            var axis = bA.GetWorldVector(this.m_localXAxisA, this.m_axis);
            var vA = bA.m_linearVelocity;
            var vB = bB.m_linearVelocity;
            var wA = bA.m_angularVelocity;
            var wB = bB.m_angularVelocity;
            var speed = b2Math_19.b2Vec2.DotVV(d, b2Math_19.b2Vec2.CrossSV(wA, axis, b2Math_19.b2Vec2.s_t0)) +
                b2Math_19.b2Vec2.DotVV(axis, b2Math_19.b2Vec2.SubVV(b2Math_19.b2Vec2.AddVCrossSV(vB, wB, rB, b2Math_19.b2Vec2.s_t0), b2Math_19.b2Vec2.AddVCrossSV(vA, wA, rA, b2Math_19.b2Vec2.s_t1), b2Math_19.b2Vec2.s_t0));
            return speed;
        };
        b2PrismaticJoint.prototype.IsLimitEnabled = function () {
            return this.m_enableLimit;
        };
        b2PrismaticJoint.prototype.EnableLimit = function (flag) {
            if (flag !== this.m_enableLimit) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_enableLimit = flag;
                this.m_impulse.z = 0;
            }
        };
        b2PrismaticJoint.prototype.GetLowerLimit = function () {
            return this.m_lowerTranslation;
        };
        b2PrismaticJoint.prototype.GetUpperLimit = function () {
            return this.m_upperTranslation;
        };
        b2PrismaticJoint.prototype.SetLimits = function (lower, upper) {
            if (lower !== this.m_lowerTranslation || upper !== this.m_upperTranslation) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_lowerTranslation = lower;
                this.m_upperTranslation = upper;
                this.m_impulse.z = 0;
            }
        };
        b2PrismaticJoint.prototype.IsMotorEnabled = function () {
            return this.m_enableMotor;
        };
        b2PrismaticJoint.prototype.EnableMotor = function (flag) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableMotor = flag;
        };
        b2PrismaticJoint.prototype.SetMotorSpeed = function (speed) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = speed;
        };
        b2PrismaticJoint.prototype.GetMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        b2PrismaticJoint.prototype.SetMaxMotorForce = function (force) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_maxMotorForce = force;
        };
        b2PrismaticJoint.prototype.GetMaxMotorForce = function () { return this.m_maxMotorForce; };
        b2PrismaticJoint.prototype.GetMotorForce = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        b2PrismaticJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2PrismaticJointDef = new b2PrismaticJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y);
            log("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle);
            log("  jd.enableLimit = %s;\n", (this.m_enableLimit) ? ("true") : ("false"));
            log("  jd.lowerTranslation = %.15f;\n", this.m_lowerTranslation);
            log("  jd.upperTranslation = %.15f;\n", this.m_upperTranslation);
            log("  jd.enableMotor = %s;\n", (this.m_enableMotor) ? ("true") : ("false"));
            log("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed);
            log("  jd.maxMotorForce = %.15f;\n", this.m_maxMotorForce);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2PrismaticJoint.InitVelocityConstraints_s_d = new b2Math_19.b2Vec2();
        b2PrismaticJoint.InitVelocityConstraints_s_P = new b2Math_19.b2Vec2();
        b2PrismaticJoint.SolveVelocityConstraints_s_P = new b2Math_19.b2Vec2();
        b2PrismaticJoint.SolveVelocityConstraints_s_f2r = new b2Math_19.b2Vec2();
        b2PrismaticJoint.SolveVelocityConstraints_s_f1 = new b2Math_19.b2Vec3();
        b2PrismaticJoint.SolveVelocityConstraints_s_df3 = new b2Math_19.b2Vec3();
        b2PrismaticJoint.SolveVelocityConstraints_s_df2 = new b2Math_19.b2Vec2();
        b2PrismaticJoint.SolvePositionConstraints_s_d = new b2Math_19.b2Vec2();
        b2PrismaticJoint.SolvePositionConstraints_s_impulse = new b2Math_19.b2Vec3();
        b2PrismaticJoint.SolvePositionConstraints_s_impulse1 = new b2Math_19.b2Vec2();
        b2PrismaticJoint.SolvePositionConstraints_s_P = new b2Math_19.b2Vec2();
        b2PrismaticJoint.GetJointTranslation_s_pA = new b2Math_19.b2Vec2();
        b2PrismaticJoint.GetJointTranslation_s_pB = new b2Math_19.b2Vec2();
        b2PrismaticJoint.GetJointTranslation_s_d = new b2Math_19.b2Vec2();
        b2PrismaticJoint.GetJointTranslation_s_axis = new b2Math_19.b2Vec2();
        return b2PrismaticJoint;
    }(b2Joint_4.b2Joint));
    exports.b2PrismaticJoint = b2PrismaticJoint;
});
define("Dynamics/Joints/b2RevoluteJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_21, b2Math_20, b2Joint_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2RevoluteJointDef = (function (_super) {
        __extends(b2RevoluteJointDef, _super);
        function b2RevoluteJointDef() {
            var _this = _super.call(this, b2Joint_5.b2JointType.e_revoluteJoint) || this;
            _this.localAnchorA = new b2Math_20.b2Vec2(0, 0);
            _this.localAnchorB = new b2Math_20.b2Vec2(0, 0);
            _this.referenceAngle = 0;
            _this.enableLimit = false;
            _this.lowerAngle = 0;
            _this.upperAngle = 0;
            _this.enableMotor = false;
            _this.motorSpeed = 0;
            _this.maxMotorTorque = 0;
            return _this;
        }
        b2RevoluteJointDef.prototype.Initialize = function (bA, bB, anchor) {
            this.bodyA = bA;
            this.bodyB = bB;
            this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
            this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
            this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
        };
        return b2RevoluteJointDef;
    }(b2Joint_5.b2JointDef));
    exports.b2RevoluteJointDef = b2RevoluteJointDef;
    var b2RevoluteJoint = (function (_super) {
        __extends(b2RevoluteJoint, _super);
        function b2RevoluteJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_localAnchorA = new b2Math_20.b2Vec2();
            _this.m_localAnchorB = new b2Math_20.b2Vec2();
            _this.m_impulse = new b2Math_20.b2Vec3();
            _this.m_motorImpulse = 0;
            _this.m_enableMotor = false;
            _this.m_maxMotorTorque = 0;
            _this.m_motorSpeed = 0;
            _this.m_enableLimit = false;
            _this.m_referenceAngle = 0;
            _this.m_lowerAngle = 0;
            _this.m_upperAngle = 0;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_rA = new b2Math_20.b2Vec2();
            _this.m_rB = new b2Math_20.b2Vec2();
            _this.m_localCenterA = new b2Math_20.b2Vec2();
            _this.m_localCenterB = new b2Math_20.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_mass = new b2Math_20.b2Mat33();
            _this.m_motorMass = 0;
            _this.m_limitState = b2Joint_5.b2LimitState.e_inactiveLimit;
            _this.m_qA = new b2Math_20.b2Rot();
            _this.m_qB = new b2Math_20.b2Rot();
            _this.m_lalcA = new b2Math_20.b2Vec2();
            _this.m_lalcB = new b2Math_20.b2Vec2();
            _this.m_K = new b2Math_20.b2Mat22();
            _this.m_localAnchorA.Copy(b2Settings_21.b2Maybe(def.localAnchorA, b2Math_20.b2Vec2.ZERO));
            _this.m_localAnchorB.Copy(b2Settings_21.b2Maybe(def.localAnchorB, b2Math_20.b2Vec2.ZERO));
            _this.m_referenceAngle = b2Settings_21.b2Maybe(def.referenceAngle, 0);
            _this.m_impulse.SetZero();
            _this.m_motorImpulse = 0;
            _this.m_lowerAngle = b2Settings_21.b2Maybe(def.lowerAngle, 0);
            _this.m_upperAngle = b2Settings_21.b2Maybe(def.upperAngle, 0);
            _this.m_maxMotorTorque = b2Settings_21.b2Maybe(def.maxMotorTorque, 0);
            _this.m_motorSpeed = b2Settings_21.b2Maybe(def.motorSpeed, 0);
            _this.m_enableLimit = b2Settings_21.b2Maybe(def.enableLimit, false);
            _this.m_enableMotor = b2Settings_21.b2Maybe(def.enableMotor, false);
            _this.m_limitState = b2Joint_5.b2LimitState.e_inactiveLimit;
            return _this;
        }
        b2RevoluteJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_20.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            b2Math_20.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_20.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            b2Math_20.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var fixedRotation = (iA + iB === 0);
            this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
            this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
            this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
            this.m_mass.ex.y = this.m_mass.ey.x;
            this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
            this.m_mass.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
            this.m_mass.ex.z = this.m_mass.ez.x;
            this.m_mass.ey.z = this.m_mass.ez.y;
            this.m_mass.ez.z = iA + iB;
            this.m_motorMass = iA + iB;
            if (this.m_motorMass > 0) {
                this.m_motorMass = 1 / this.m_motorMass;
            }
            if (!this.m_enableMotor || fixedRotation) {
                this.m_motorImpulse = 0;
            }
            if (this.m_enableLimit && !fixedRotation) {
                var jointAngle = aB - aA - this.m_referenceAngle;
                if (b2Math_20.b2Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2Settings_21.b2_angularSlop) {
                    this.m_limitState = b2Joint_5.b2LimitState.e_equalLimits;
                }
                else if (jointAngle <= this.m_lowerAngle) {
                    if (this.m_limitState !== b2Joint_5.b2LimitState.e_atLowerLimit) {
                        this.m_impulse.z = 0;
                    }
                    this.m_limitState = b2Joint_5.b2LimitState.e_atLowerLimit;
                }
                else if (jointAngle >= this.m_upperAngle) {
                    if (this.m_limitState !== b2Joint_5.b2LimitState.e_atUpperLimit) {
                        this.m_impulse.z = 0;
                    }
                    this.m_limitState = b2Joint_5.b2LimitState.e_atUpperLimit;
                }
                else {
                    this.m_limitState = b2Joint_5.b2LimitState.e_inactiveLimit;
                    this.m_impulse.z = 0;
                }
            }
            else {
                this.m_limitState = b2Joint_5.b2LimitState.e_inactiveLimit;
            }
            if (data.step.warmStarting) {
                this.m_impulse.SelfMul(data.step.dtRatio);
                this.m_motorImpulse *= data.step.dtRatio;
                var P = b2RevoluteJoint.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
                vA.SelfMulSub(mA, P);
                wA -= iA * (b2Math_20.b2Vec2.CrossVV(this.m_rA, P) + this.m_motorImpulse + this.m_impulse.z);
                vB.SelfMulAdd(mB, P);
                wB += iB * (b2Math_20.b2Vec2.CrossVV(this.m_rB, P) + this.m_motorImpulse + this.m_impulse.z);
            }
            else {
                this.m_impulse.SetZero();
                this.m_motorImpulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2RevoluteJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var fixedRotation = (iA + iB === 0);
            if (this.m_enableMotor && this.m_limitState !== b2Joint_5.b2LimitState.e_equalLimits && !fixedRotation) {
                var Cdot = wB - wA - this.m_motorSpeed;
                var impulse = -this.m_motorMass * Cdot;
                var oldImpulse = this.m_motorImpulse;
                var maxImpulse = data.step.dt * this.m_maxMotorTorque;
                this.m_motorImpulse = b2Math_20.b2Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            if (this.m_enableLimit && this.m_limitState !== b2Joint_5.b2LimitState.e_inactiveLimit && !fixedRotation) {
                var Cdot1 = b2Math_20.b2Vec2.SubVV(b2Math_20.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2Math_20.b2Vec2.s_t0), b2Math_20.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2Math_20.b2Vec2.s_t1), b2RevoluteJoint.SolveVelocityConstraints_s_Cdot1);
                var Cdot2 = wB - wA;
                var impulse_v3 = this.m_mass.Solve33(Cdot1.x, Cdot1.y, Cdot2, b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v3).SelfNeg();
                if (this.m_limitState === b2Joint_5.b2LimitState.e_equalLimits) {
                    this.m_impulse.SelfAdd(impulse_v3);
                }
                else if (this.m_limitState === b2Joint_5.b2LimitState.e_atLowerLimit) {
                    var newImpulse = this.m_impulse.z + impulse_v3.z;
                    if (newImpulse < 0) {
                        var rhs_x = -Cdot1.x + this.m_impulse.z * this.m_mass.ez.x;
                        var rhs_y = -Cdot1.y + this.m_impulse.z * this.m_mass.ez.y;
                        var reduced_v2 = this.m_mass.Solve22(rhs_x, rhs_y, b2RevoluteJoint.SolveVelocityConstraints_s_reduced_v2);
                        impulse_v3.x = reduced_v2.x;
                        impulse_v3.y = reduced_v2.y;
                        impulse_v3.z = -this.m_impulse.z;
                        this.m_impulse.x += reduced_v2.x;
                        this.m_impulse.y += reduced_v2.y;
                        this.m_impulse.z = 0;
                    }
                    else {
                        this.m_impulse.SelfAdd(impulse_v3);
                    }
                }
                else if (this.m_limitState === b2Joint_5.b2LimitState.e_atUpperLimit) {
                    var newImpulse = this.m_impulse.z + impulse_v3.z;
                    if (newImpulse > 0) {
                        var rhs_x = -Cdot1.x + this.m_impulse.z * this.m_mass.ez.x;
                        var rhs_y = -Cdot1.y + this.m_impulse.z * this.m_mass.ez.y;
                        var reduced_v2 = this.m_mass.Solve22(rhs_x, rhs_y, b2RevoluteJoint.SolveVelocityConstraints_s_reduced_v2);
                        impulse_v3.x = reduced_v2.x;
                        impulse_v3.y = reduced_v2.y;
                        impulse_v3.z = -this.m_impulse.z;
                        this.m_impulse.x += reduced_v2.x;
                        this.m_impulse.y += reduced_v2.y;
                        this.m_impulse.z = 0;
                    }
                    else {
                        this.m_impulse.SelfAdd(impulse_v3);
                    }
                }
                var P = b2RevoluteJoint.SolveVelocityConstraints_s_P.Set(impulse_v3.x, impulse_v3.y);
                vA.SelfMulSub(mA, P);
                wA -= iA * (b2Math_20.b2Vec2.CrossVV(this.m_rA, P) + impulse_v3.z);
                vB.SelfMulAdd(mB, P);
                wB += iB * (b2Math_20.b2Vec2.CrossVV(this.m_rB, P) + impulse_v3.z);
            }
            else {
                var Cdot_v2 = b2Math_20.b2Vec2.SubVV(b2Math_20.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2Math_20.b2Vec2.s_t0), b2Math_20.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2Math_20.b2Vec2.s_t1), b2RevoluteJoint.SolveVelocityConstraints_s_Cdot_v2);
                var impulse_v2 = this.m_mass.Solve22(-Cdot_v2.x, -Cdot_v2.y, b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v2);
                this.m_impulse.x += impulse_v2.x;
                this.m_impulse.y += impulse_v2.y;
                vA.SelfMulSub(mA, impulse_v2);
                wA -= iA * b2Math_20.b2Vec2.CrossVV(this.m_rA, impulse_v2);
                vB.SelfMulAdd(mB, impulse_v2);
                wB += iB * b2Math_20.b2Vec2.CrossVV(this.m_rB, impulse_v2);
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2RevoluteJoint.prototype.SolvePositionConstraints = function (data) {
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            var angularError = 0;
            var positionError = 0;
            var fixedRotation = (this.m_invIA + this.m_invIB === 0);
            if (this.m_enableLimit && this.m_limitState !== b2Joint_5.b2LimitState.e_inactiveLimit && !fixedRotation) {
                var angle = aB - aA - this.m_referenceAngle;
                var limitImpulse = 0;
                if (this.m_limitState === b2Joint_5.b2LimitState.e_equalLimits) {
                    var C = b2Math_20.b2Clamp(angle - this.m_lowerAngle, -b2Settings_21.b2_maxAngularCorrection, b2Settings_21.b2_maxAngularCorrection);
                    limitImpulse = -this.m_motorMass * C;
                    angularError = b2Math_20.b2Abs(C);
                }
                else if (this.m_limitState === b2Joint_5.b2LimitState.e_atLowerLimit) {
                    var C = angle - this.m_lowerAngle;
                    angularError = -C;
                    C = b2Math_20.b2Clamp(C + b2Settings_21.b2_angularSlop, -b2Settings_21.b2_maxAngularCorrection, 0);
                    limitImpulse = -this.m_motorMass * C;
                }
                else if (this.m_limitState === b2Joint_5.b2LimitState.e_atUpperLimit) {
                    var C = angle - this.m_upperAngle;
                    angularError = C;
                    C = b2Math_20.b2Clamp(C - b2Settings_21.b2_angularSlop, 0, b2Settings_21.b2_maxAngularCorrection);
                    limitImpulse = -this.m_motorMass * C;
                }
                aA -= this.m_invIA * limitImpulse;
                aB += this.m_invIB * limitImpulse;
            }
            {
                qA.SetAngle(aA);
                qB.SetAngle(aB);
                b2Math_20.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
                var rA = b2Math_20.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
                b2Math_20.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
                var rB = b2Math_20.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
                var C_v2 = b2Math_20.b2Vec2.SubVV(b2Math_20.b2Vec2.AddVV(cB, rB, b2Math_20.b2Vec2.s_t0), b2Math_20.b2Vec2.AddVV(cA, rA, b2Math_20.b2Vec2.s_t1), b2RevoluteJoint.SolvePositionConstraints_s_C_v2);
                positionError = C_v2.Length();
                var mA = this.m_invMassA, mB = this.m_invMassB;
                var iA = this.m_invIA, iB = this.m_invIB;
                var K = this.m_K;
                K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
                K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
                K.ey.x = K.ex.y;
                K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
                var impulse = K.Solve(C_v2.x, C_v2.y, b2RevoluteJoint.SolvePositionConstraints_s_impulse).SelfNeg();
                cA.SelfMulSub(mA, impulse);
                aA -= iA * b2Math_20.b2Vec2.CrossVV(rA, impulse);
                cB.SelfMulAdd(mB, impulse);
                aB += iB * b2Math_20.b2Vec2.CrossVV(rB, impulse);
            }
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            return positionError <= b2Settings_21.b2_linearSlop && angularError <= b2Settings_21.b2_angularSlop;
        };
        b2RevoluteJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2RevoluteJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2RevoluteJoint.prototype.GetReactionForce = function (inv_dt, out) {
            out.x = inv_dt * this.m_impulse.x;
            out.y = inv_dt * this.m_impulse.y;
            return out;
        };
        b2RevoluteJoint.prototype.GetReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.z;
        };
        b2RevoluteJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
        b2RevoluteJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
        b2RevoluteJoint.prototype.GetReferenceAngle = function () { return this.m_referenceAngle; };
        b2RevoluteJoint.prototype.GetJointAngle = function () {
            return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
        };
        b2RevoluteJoint.prototype.GetJointSpeed = function () {
            return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
        };
        b2RevoluteJoint.prototype.IsMotorEnabled = function () {
            return this.m_enableMotor;
        };
        b2RevoluteJoint.prototype.EnableMotor = function (flag) {
            if (this.m_enableMotor !== flag) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_enableMotor = flag;
            }
        };
        b2RevoluteJoint.prototype.GetMotorTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        b2RevoluteJoint.prototype.GetMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        b2RevoluteJoint.prototype.SetMaxMotorTorque = function (torque) {
            this.m_maxMotorTorque = torque;
        };
        b2RevoluteJoint.prototype.GetMaxMotorTorque = function () { return this.m_maxMotorTorque; };
        b2RevoluteJoint.prototype.IsLimitEnabled = function () {
            return this.m_enableLimit;
        };
        b2RevoluteJoint.prototype.EnableLimit = function (flag) {
            if (flag !== this.m_enableLimit) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_enableLimit = flag;
                this.m_impulse.z = 0;
            }
        };
        b2RevoluteJoint.prototype.GetLowerLimit = function () {
            return this.m_lowerAngle;
        };
        b2RevoluteJoint.prototype.GetUpperLimit = function () {
            return this.m_upperAngle;
        };
        b2RevoluteJoint.prototype.SetLimits = function (lower, upper) {
            if (lower !== this.m_lowerAngle || upper !== this.m_upperAngle) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_impulse.z = 0;
                this.m_lowerAngle = lower;
                this.m_upperAngle = upper;
            }
        };
        b2RevoluteJoint.prototype.SetMotorSpeed = function (speed) {
            if (this.m_motorSpeed !== speed) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_motorSpeed = speed;
            }
        };
        b2RevoluteJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2RevoluteJointDef = new b2RevoluteJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle);
            log("  jd.enableLimit = %s;\n", (this.m_enableLimit) ? ("true") : ("false"));
            log("  jd.lowerAngle = %.15f;\n", this.m_lowerAngle);
            log("  jd.upperAngle = %.15f;\n", this.m_upperAngle);
            log("  jd.enableMotor = %s;\n", (this.m_enableMotor) ? ("true") : ("false"));
            log("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed);
            log("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2RevoluteJoint.InitVelocityConstraints_s_P = new b2Math_20.b2Vec2();
        b2RevoluteJoint.SolveVelocityConstraints_s_P = new b2Math_20.b2Vec2();
        b2RevoluteJoint.SolveVelocityConstraints_s_Cdot_v2 = new b2Math_20.b2Vec2();
        b2RevoluteJoint.SolveVelocityConstraints_s_Cdot1 = new b2Math_20.b2Vec2();
        b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v3 = new b2Math_20.b2Vec3();
        b2RevoluteJoint.SolveVelocityConstraints_s_reduced_v2 = new b2Math_20.b2Vec2();
        b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v2 = new b2Math_20.b2Vec2();
        b2RevoluteJoint.SolvePositionConstraints_s_C_v2 = new b2Math_20.b2Vec2();
        b2RevoluteJoint.SolvePositionConstraints_s_impulse = new b2Math_20.b2Vec2();
        return b2RevoluteJoint;
    }(b2Joint_5.b2Joint));
    exports.b2RevoluteJoint = b2RevoluteJoint;
});
define("Dynamics/Joints/b2GearJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_22, b2Math_21, b2Joint_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2GearJointDef = (function (_super) {
        __extends(b2GearJointDef, _super);
        function b2GearJointDef() {
            var _this = _super.call(this, b2Joint_6.b2JointType.e_gearJoint) || this;
            _this.ratio = 1;
            return _this;
        }
        return b2GearJointDef;
    }(b2Joint_6.b2JointDef));
    exports.b2GearJointDef = b2GearJointDef;
    var b2GearJoint = (function (_super) {
        __extends(b2GearJoint, _super);
        function b2GearJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_typeA = b2Joint_6.b2JointType.e_unknownJoint;
            _this.m_typeB = b2Joint_6.b2JointType.e_unknownJoint;
            _this.m_localAnchorA = new b2Math_21.b2Vec2();
            _this.m_localAnchorB = new b2Math_21.b2Vec2();
            _this.m_localAnchorC = new b2Math_21.b2Vec2();
            _this.m_localAnchorD = new b2Math_21.b2Vec2();
            _this.m_localAxisC = new b2Math_21.b2Vec2();
            _this.m_localAxisD = new b2Math_21.b2Vec2();
            _this.m_referenceAngleA = 0;
            _this.m_referenceAngleB = 0;
            _this.m_constant = 0;
            _this.m_ratio = 0;
            _this.m_impulse = 0;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_indexC = 0;
            _this.m_indexD = 0;
            _this.m_lcA = new b2Math_21.b2Vec2();
            _this.m_lcB = new b2Math_21.b2Vec2();
            _this.m_lcC = new b2Math_21.b2Vec2();
            _this.m_lcD = new b2Math_21.b2Vec2();
            _this.m_mA = 0;
            _this.m_mB = 0;
            _this.m_mC = 0;
            _this.m_mD = 0;
            _this.m_iA = 0;
            _this.m_iB = 0;
            _this.m_iC = 0;
            _this.m_iD = 0;
            _this.m_JvAC = new b2Math_21.b2Vec2();
            _this.m_JvBD = new b2Math_21.b2Vec2();
            _this.m_JwA = 0;
            _this.m_JwB = 0;
            _this.m_JwC = 0;
            _this.m_JwD = 0;
            _this.m_mass = 0;
            _this.m_qA = new b2Math_21.b2Rot();
            _this.m_qB = new b2Math_21.b2Rot();
            _this.m_qC = new b2Math_21.b2Rot();
            _this.m_qD = new b2Math_21.b2Rot();
            _this.m_lalcA = new b2Math_21.b2Vec2();
            _this.m_lalcB = new b2Math_21.b2Vec2();
            _this.m_lalcC = new b2Math_21.b2Vec2();
            _this.m_lalcD = new b2Math_21.b2Vec2();
            _this.m_joint1 = def.joint1;
            _this.m_joint2 = def.joint2;
            _this.m_typeA = _this.m_joint1.GetType();
            _this.m_typeB = _this.m_joint2.GetType();
            var coordinateA, coordinateB;
            _this.m_bodyC = _this.m_joint1.GetBodyA();
            _this.m_bodyA = _this.m_joint1.GetBodyB();
            var xfA = _this.m_bodyA.m_xf;
            var aA = _this.m_bodyA.m_sweep.a;
            var xfC = _this.m_bodyC.m_xf;
            var aC = _this.m_bodyC.m_sweep.a;
            if (_this.m_typeA === b2Joint_6.b2JointType.e_revoluteJoint) {
                var revolute = def.joint1;
                _this.m_localAnchorC.Copy(revolute.m_localAnchorA);
                _this.m_localAnchorA.Copy(revolute.m_localAnchorB);
                _this.m_referenceAngleA = revolute.m_referenceAngle;
                _this.m_localAxisC.SetZero();
                coordinateA = aA - aC - _this.m_referenceAngleA;
            }
            else {
                var prismatic = def.joint1;
                _this.m_localAnchorC.Copy(prismatic.m_localAnchorA);
                _this.m_localAnchorA.Copy(prismatic.m_localAnchorB);
                _this.m_referenceAngleA = prismatic.m_referenceAngle;
                _this.m_localAxisC.Copy(prismatic.m_localXAxisA);
                var pC = _this.m_localAnchorC;
                var pA = b2Math_21.b2Rot.MulTRV(xfC.q, b2Math_21.b2Vec2.AddVV(b2Math_21.b2Rot.MulRV(xfA.q, _this.m_localAnchorA, b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.SubVV(xfA.p, xfC.p, b2Math_21.b2Vec2.s_t1), b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.s_t0);
                coordinateA = b2Math_21.b2Vec2.DotVV(b2Math_21.b2Vec2.SubVV(pA, pC, b2Math_21.b2Vec2.s_t0), _this.m_localAxisC);
            }
            _this.m_bodyD = _this.m_joint2.GetBodyA();
            _this.m_bodyB = _this.m_joint2.GetBodyB();
            var xfB = _this.m_bodyB.m_xf;
            var aB = _this.m_bodyB.m_sweep.a;
            var xfD = _this.m_bodyD.m_xf;
            var aD = _this.m_bodyD.m_sweep.a;
            if (_this.m_typeB === b2Joint_6.b2JointType.e_revoluteJoint) {
                var revolute = def.joint2;
                _this.m_localAnchorD.Copy(revolute.m_localAnchorA);
                _this.m_localAnchorB.Copy(revolute.m_localAnchorB);
                _this.m_referenceAngleB = revolute.m_referenceAngle;
                _this.m_localAxisD.SetZero();
                coordinateB = aB - aD - _this.m_referenceAngleB;
            }
            else {
                var prismatic = def.joint2;
                _this.m_localAnchorD.Copy(prismatic.m_localAnchorA);
                _this.m_localAnchorB.Copy(prismatic.m_localAnchorB);
                _this.m_referenceAngleB = prismatic.m_referenceAngle;
                _this.m_localAxisD.Copy(prismatic.m_localXAxisA);
                var pD = _this.m_localAnchorD;
                var pB = b2Math_21.b2Rot.MulTRV(xfD.q, b2Math_21.b2Vec2.AddVV(b2Math_21.b2Rot.MulRV(xfB.q, _this.m_localAnchorB, b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.SubVV(xfB.p, xfD.p, b2Math_21.b2Vec2.s_t1), b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.s_t0);
                coordinateB = b2Math_21.b2Vec2.DotVV(b2Math_21.b2Vec2.SubVV(pB, pD, b2Math_21.b2Vec2.s_t0), _this.m_localAxisD);
            }
            _this.m_ratio = b2Settings_22.b2Maybe(def.ratio, 1);
            _this.m_constant = coordinateA + _this.m_ratio * coordinateB;
            _this.m_impulse = 0;
            return _this;
        }
        b2GearJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_indexC = this.m_bodyC.m_islandIndex;
            this.m_indexD = this.m_bodyD.m_islandIndex;
            this.m_lcA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_lcB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_lcC.Copy(this.m_bodyC.m_sweep.localCenter);
            this.m_lcD.Copy(this.m_bodyD.m_sweep.localCenter);
            this.m_mA = this.m_bodyA.m_invMass;
            this.m_mB = this.m_bodyB.m_invMass;
            this.m_mC = this.m_bodyC.m_invMass;
            this.m_mD = this.m_bodyD.m_invMass;
            this.m_iA = this.m_bodyA.m_invI;
            this.m_iB = this.m_bodyB.m_invI;
            this.m_iC = this.m_bodyC.m_invI;
            this.m_iD = this.m_bodyD.m_invI;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var aC = data.positions[this.m_indexC].a;
            var vC = data.velocities[this.m_indexC].v;
            var wC = data.velocities[this.m_indexC].w;
            var aD = data.positions[this.m_indexD].a;
            var vD = data.velocities[this.m_indexD].v;
            var wD = data.velocities[this.m_indexD].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB), qC = this.m_qC.SetAngle(aC), qD = this.m_qD.SetAngle(aD);
            this.m_mass = 0;
            if (this.m_typeA === b2Joint_6.b2JointType.e_revoluteJoint) {
                this.m_JvAC.SetZero();
                this.m_JwA = 1;
                this.m_JwC = 1;
                this.m_mass += this.m_iA + this.m_iC;
            }
            else {
                var u = b2Math_21.b2Rot.MulRV(qC, this.m_localAxisC, b2GearJoint.InitVelocityConstraints_s_u);
                b2Math_21.b2Vec2.SubVV(this.m_localAnchorC, this.m_lcC, this.m_lalcC);
                var rC = b2Math_21.b2Rot.MulRV(qC, this.m_lalcC, b2GearJoint.InitVelocityConstraints_s_rC);
                b2Math_21.b2Vec2.SubVV(this.m_localAnchorA, this.m_lcA, this.m_lalcA);
                var rA = b2Math_21.b2Rot.MulRV(qA, this.m_lalcA, b2GearJoint.InitVelocityConstraints_s_rA);
                this.m_JvAC.Copy(u);
                this.m_JwC = b2Math_21.b2Vec2.CrossVV(rC, u);
                this.m_JwA = b2Math_21.b2Vec2.CrossVV(rA, u);
                this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
            }
            if (this.m_typeB === b2Joint_6.b2JointType.e_revoluteJoint) {
                this.m_JvBD.SetZero();
                this.m_JwB = this.m_ratio;
                this.m_JwD = this.m_ratio;
                this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
            }
            else {
                var u = b2Math_21.b2Rot.MulRV(qD, this.m_localAxisD, b2GearJoint.InitVelocityConstraints_s_u);
                b2Math_21.b2Vec2.SubVV(this.m_localAnchorD, this.m_lcD, this.m_lalcD);
                var rD = b2Math_21.b2Rot.MulRV(qD, this.m_lalcD, b2GearJoint.InitVelocityConstraints_s_rD);
                b2Math_21.b2Vec2.SubVV(this.m_localAnchorB, this.m_lcB, this.m_lalcB);
                var rB = b2Math_21.b2Rot.MulRV(qB, this.m_lalcB, b2GearJoint.InitVelocityConstraints_s_rB);
                b2Math_21.b2Vec2.MulSV(this.m_ratio, u, this.m_JvBD);
                this.m_JwD = this.m_ratio * b2Math_21.b2Vec2.CrossVV(rD, u);
                this.m_JwB = this.m_ratio * b2Math_21.b2Vec2.CrossVV(rB, u);
                this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
            }
            this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0;
            if (data.step.warmStarting) {
                vA.SelfMulAdd(this.m_mA * this.m_impulse, this.m_JvAC);
                wA += this.m_iA * this.m_impulse * this.m_JwA;
                vB.SelfMulAdd(this.m_mB * this.m_impulse, this.m_JvBD);
                wB += this.m_iB * this.m_impulse * this.m_JwB;
                vC.SelfMulSub(this.m_mC * this.m_impulse, this.m_JvAC);
                wC -= this.m_iC * this.m_impulse * this.m_JwC;
                vD.SelfMulSub(this.m_mD * this.m_impulse, this.m_JvBD);
                wD -= this.m_iD * this.m_impulse * this.m_JwD;
            }
            else {
                this.m_impulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
            data.velocities[this.m_indexC].w = wC;
            data.velocities[this.m_indexD].w = wD;
        };
        b2GearJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var vC = data.velocities[this.m_indexC].v;
            var wC = data.velocities[this.m_indexC].w;
            var vD = data.velocities[this.m_indexD].v;
            var wD = data.velocities[this.m_indexD].w;
            var Cdot = b2Math_21.b2Vec2.DotVV(this.m_JvAC, b2Math_21.b2Vec2.SubVV(vA, vC, b2Math_21.b2Vec2.s_t0)) +
                b2Math_21.b2Vec2.DotVV(this.m_JvBD, b2Math_21.b2Vec2.SubVV(vB, vD, b2Math_21.b2Vec2.s_t0));
            Cdot += (this.m_JwA * wA - this.m_JwC * wC) + (this.m_JwB * wB - this.m_JwD * wD);
            var impulse = -this.m_mass * Cdot;
            this.m_impulse += impulse;
            vA.SelfMulAdd((this.m_mA * impulse), this.m_JvAC);
            wA += this.m_iA * impulse * this.m_JwA;
            vB.SelfMulAdd((this.m_mB * impulse), this.m_JvBD);
            wB += this.m_iB * impulse * this.m_JwB;
            vC.SelfMulSub((this.m_mC * impulse), this.m_JvAC);
            wC -= this.m_iC * impulse * this.m_JwC;
            vD.SelfMulSub((this.m_mD * impulse), this.m_JvBD);
            wD -= this.m_iD * impulse * this.m_JwD;
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
            data.velocities[this.m_indexC].w = wC;
            data.velocities[this.m_indexD].w = wD;
        };
        b2GearJoint.prototype.SolvePositionConstraints = function (data) {
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var cC = data.positions[this.m_indexC].c;
            var aC = data.positions[this.m_indexC].a;
            var cD = data.positions[this.m_indexD].c;
            var aD = data.positions[this.m_indexD].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB), qC = this.m_qC.SetAngle(aC), qD = this.m_qD.SetAngle(aD);
            var linearError = 0;
            var coordinateA, coordinateB;
            var JvAC = this.m_JvAC, JvBD = this.m_JvBD;
            var JwA, JwB, JwC, JwD;
            var mass = 0;
            if (this.m_typeA === b2Joint_6.b2JointType.e_revoluteJoint) {
                JvAC.SetZero();
                JwA = 1;
                JwC = 1;
                mass += this.m_iA + this.m_iC;
                coordinateA = aA - aC - this.m_referenceAngleA;
            }
            else {
                var u = b2Math_21.b2Rot.MulRV(qC, this.m_localAxisC, b2GearJoint.SolvePositionConstraints_s_u);
                var rC = b2Math_21.b2Rot.MulRV(qC, this.m_lalcC, b2GearJoint.SolvePositionConstraints_s_rC);
                var rA = b2Math_21.b2Rot.MulRV(qA, this.m_lalcA, b2GearJoint.SolvePositionConstraints_s_rA);
                JvAC.Copy(u);
                JwC = b2Math_21.b2Vec2.CrossVV(rC, u);
                JwA = b2Math_21.b2Vec2.CrossVV(rA, u);
                mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
                var pC = this.m_lalcC;
                var pA = b2Math_21.b2Rot.MulTRV(qC, b2Math_21.b2Vec2.AddVV(rA, b2Math_21.b2Vec2.SubVV(cA, cC, b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.s_t0);
                coordinateA = b2Math_21.b2Vec2.DotVV(b2Math_21.b2Vec2.SubVV(pA, pC, b2Math_21.b2Vec2.s_t0), this.m_localAxisC);
            }
            if (this.m_typeB === b2Joint_6.b2JointType.e_revoluteJoint) {
                JvBD.SetZero();
                JwB = this.m_ratio;
                JwD = this.m_ratio;
                mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
                coordinateB = aB - aD - this.m_referenceAngleB;
            }
            else {
                var u = b2Math_21.b2Rot.MulRV(qD, this.m_localAxisD, b2GearJoint.SolvePositionConstraints_s_u);
                var rD = b2Math_21.b2Rot.MulRV(qD, this.m_lalcD, b2GearJoint.SolvePositionConstraints_s_rD);
                var rB = b2Math_21.b2Rot.MulRV(qB, this.m_lalcB, b2GearJoint.SolvePositionConstraints_s_rB);
                b2Math_21.b2Vec2.MulSV(this.m_ratio, u, JvBD);
                JwD = this.m_ratio * b2Math_21.b2Vec2.CrossVV(rD, u);
                JwB = this.m_ratio * b2Math_21.b2Vec2.CrossVV(rB, u);
                mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;
                var pD = this.m_lalcD;
                var pB = b2Math_21.b2Rot.MulTRV(qD, b2Math_21.b2Vec2.AddVV(rB, b2Math_21.b2Vec2.SubVV(cB, cD, b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.s_t0), b2Math_21.b2Vec2.s_t0);
                coordinateB = b2Math_21.b2Vec2.DotVV(b2Math_21.b2Vec2.SubVV(pB, pD, b2Math_21.b2Vec2.s_t0), this.m_localAxisD);
            }
            var C = (coordinateA + this.m_ratio * coordinateB) - this.m_constant;
            var impulse = 0;
            if (mass > 0) {
                impulse = -C / mass;
            }
            cA.SelfMulAdd(this.m_mA * impulse, JvAC);
            aA += this.m_iA * impulse * JwA;
            cB.SelfMulAdd(this.m_mB * impulse, JvBD);
            aB += this.m_iB * impulse * JwB;
            cC.SelfMulSub(this.m_mC * impulse, JvAC);
            aC -= this.m_iC * impulse * JwC;
            cD.SelfMulSub(this.m_mD * impulse, JvBD);
            aD -= this.m_iD * impulse * JwD;
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            data.positions[this.m_indexC].a = aC;
            data.positions[this.m_indexD].a = aD;
            return linearError < b2Settings_22.b2_linearSlop;
        };
        b2GearJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2GearJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2GearJoint.prototype.GetReactionForce = function (inv_dt, out) {
            return b2Math_21.b2Vec2.MulSV(inv_dt * this.m_impulse, this.m_JvAC, out);
        };
        b2GearJoint.prototype.GetReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse * this.m_JwA;
        };
        b2GearJoint.prototype.GetJoint1 = function () { return this.m_joint1; };
        b2GearJoint.prototype.GetJoint2 = function () { return this.m_joint2; };
        b2GearJoint.prototype.GetRatio = function () {
            return this.m_ratio;
        };
        b2GearJoint.prototype.SetRatio = function (ratio) {
            this.m_ratio = ratio;
        };
        b2GearJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            var index1 = this.m_joint1.m_index;
            var index2 = this.m_joint2.m_index;
            log("  const jd: b2GearJointDef = new b2GearJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.joint1 = joints[%d];\n", index1);
            log("  jd.joint2 = joints[%d];\n", index2);
            log("  jd.ratio = %.15f;\n", this.m_ratio);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2GearJoint.InitVelocityConstraints_s_u = new b2Math_21.b2Vec2();
        b2GearJoint.InitVelocityConstraints_s_rA = new b2Math_21.b2Vec2();
        b2GearJoint.InitVelocityConstraints_s_rB = new b2Math_21.b2Vec2();
        b2GearJoint.InitVelocityConstraints_s_rC = new b2Math_21.b2Vec2();
        b2GearJoint.InitVelocityConstraints_s_rD = new b2Math_21.b2Vec2();
        b2GearJoint.SolvePositionConstraints_s_u = new b2Math_21.b2Vec2();
        b2GearJoint.SolvePositionConstraints_s_rA = new b2Math_21.b2Vec2();
        b2GearJoint.SolvePositionConstraints_s_rB = new b2Math_21.b2Vec2();
        b2GearJoint.SolvePositionConstraints_s_rC = new b2Math_21.b2Vec2();
        b2GearJoint.SolvePositionConstraints_s_rD = new b2Math_21.b2Vec2();
        return b2GearJoint;
    }(b2Joint_6.b2Joint));
    exports.b2GearJoint = b2GearJoint;
});
define("Dynamics/Joints/b2MotorJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_23, b2Math_22, b2Joint_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2MotorJointDef = (function (_super) {
        __extends(b2MotorJointDef, _super);
        function b2MotorJointDef() {
            var _this = _super.call(this, b2Joint_7.b2JointType.e_motorJoint) || this;
            _this.linearOffset = new b2Math_22.b2Vec2(0, 0);
            _this.angularOffset = 0;
            _this.maxForce = 1;
            _this.maxTorque = 1;
            _this.correctionFactor = 0.3;
            return _this;
        }
        b2MotorJointDef.prototype.Initialize = function (bA, bB) {
            this.bodyA = bA;
            this.bodyB = bB;
            this.bodyA.GetLocalPoint(this.bodyB.GetPosition(), this.linearOffset);
            var angleA = this.bodyA.GetAngle();
            var angleB = this.bodyB.GetAngle();
            this.angularOffset = angleB - angleA;
        };
        return b2MotorJointDef;
    }(b2Joint_7.b2JointDef));
    exports.b2MotorJointDef = b2MotorJointDef;
    var b2MotorJoint = (function (_super) {
        __extends(b2MotorJoint, _super);
        function b2MotorJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_linearOffset = new b2Math_22.b2Vec2();
            _this.m_angularOffset = 0;
            _this.m_linearImpulse = new b2Math_22.b2Vec2();
            _this.m_angularImpulse = 0;
            _this.m_maxForce = 0;
            _this.m_maxTorque = 0;
            _this.m_correctionFactor = 0.3;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_rA = new b2Math_22.b2Vec2();
            _this.m_rB = new b2Math_22.b2Vec2();
            _this.m_localCenterA = new b2Math_22.b2Vec2();
            _this.m_localCenterB = new b2Math_22.b2Vec2();
            _this.m_linearError = new b2Math_22.b2Vec2();
            _this.m_angularError = 0;
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_linearMass = new b2Math_22.b2Mat22();
            _this.m_angularMass = 0;
            _this.m_qA = new b2Math_22.b2Rot();
            _this.m_qB = new b2Math_22.b2Rot();
            _this.m_K = new b2Math_22.b2Mat22();
            _this.m_linearOffset.Copy(b2Settings_23.b2Maybe(def.linearOffset, b2Math_22.b2Vec2.ZERO));
            _this.m_linearImpulse.SetZero();
            _this.m_maxForce = b2Settings_23.b2Maybe(def.maxForce, 0);
            _this.m_maxTorque = b2Settings_23.b2Maybe(def.maxTorque, 0);
            _this.m_correctionFactor = b2Settings_23.b2Maybe(def.correctionFactor, 0.3);
            return _this;
        }
        b2MotorJoint.prototype.GetAnchorA = function (out) {
            var pos = this.m_bodyA.GetPosition();
            out.x = pos.x;
            out.y = pos.y;
            return out;
        };
        b2MotorJoint.prototype.GetAnchorB = function (out) {
            var pos = this.m_bodyB.GetPosition();
            out.x = pos.x;
            out.y = pos.y;
            return out;
        };
        b2MotorJoint.prototype.GetReactionForce = function (inv_dt, out) {
            return b2Math_22.b2Vec2.MulSV(inv_dt, this.m_linearImpulse, out);
        };
        b2MotorJoint.prototype.GetReactionTorque = function (inv_dt) {
            return inv_dt * this.m_angularImpulse;
        };
        b2MotorJoint.prototype.SetLinearOffset = function (linearOffset) {
            if (!b2Math_22.b2Vec2.IsEqualToV(linearOffset, this.m_linearOffset)) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_linearOffset.Copy(linearOffset);
            }
        };
        b2MotorJoint.prototype.GetLinearOffset = function () {
            return this.m_linearOffset;
        };
        b2MotorJoint.prototype.SetAngularOffset = function (angularOffset) {
            if (angularOffset !== this.m_angularOffset) {
                this.m_bodyA.SetAwake(true);
                this.m_bodyB.SetAwake(true);
                this.m_angularOffset = angularOffset;
            }
        };
        b2MotorJoint.prototype.GetAngularOffset = function () {
            return this.m_angularOffset;
        };
        b2MotorJoint.prototype.SetMaxForce = function (force) {
            this.m_maxForce = force;
        };
        b2MotorJoint.prototype.GetMaxForce = function () {
            return this.m_maxForce;
        };
        b2MotorJoint.prototype.SetMaxTorque = function (torque) {
            this.m_maxTorque = torque;
        };
        b2MotorJoint.prototype.GetMaxTorque = function () {
            return this.m_maxTorque;
        };
        b2MotorJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            var rA = b2Math_22.b2Rot.MulRV(qA, b2Math_22.b2Vec2.SubVV(this.m_linearOffset, this.m_localCenterA, b2Math_22.b2Vec2.s_t0), this.m_rA);
            var rB = b2Math_22.b2Rot.MulRV(qB, b2Math_22.b2Vec2.NegV(this.m_localCenterB, b2Math_22.b2Vec2.s_t0), this.m_rB);
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var K = this.m_K;
            K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
            K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
            K.GetInverse(this.m_linearMass);
            this.m_angularMass = iA + iB;
            if (this.m_angularMass > 0) {
                this.m_angularMass = 1 / this.m_angularMass;
            }
            b2Math_22.b2Vec2.SubVV(b2Math_22.b2Vec2.AddVV(cB, rB, b2Math_22.b2Vec2.s_t0), b2Math_22.b2Vec2.AddVV(cA, rA, b2Math_22.b2Vec2.s_t1), this.m_linearError);
            this.m_angularError = aB - aA - this.m_angularOffset;
            if (data.step.warmStarting) {
                this.m_linearImpulse.SelfMul(data.step.dtRatio);
                this.m_angularImpulse *= data.step.dtRatio;
                var P = this.m_linearImpulse;
                vA.SelfMulSub(mA, P);
                wA -= iA * (b2Math_22.b2Vec2.CrossVV(rA, P) + this.m_angularImpulse);
                vB.SelfMulAdd(mB, P);
                wB += iB * (b2Math_22.b2Vec2.CrossVV(rB, P) + this.m_angularImpulse);
            }
            else {
                this.m_linearImpulse.SetZero();
                this.m_angularImpulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2MotorJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var h = data.step.dt;
            var inv_h = data.step.inv_dt;
            {
                var Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
                var impulse = -this.m_angularMass * Cdot;
                var oldImpulse = this.m_angularImpulse;
                var maxImpulse = h * this.m_maxTorque;
                this.m_angularImpulse = b2Math_22.b2Clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_angularImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            {
                var rA = this.m_rA;
                var rB = this.m_rB;
                var Cdot_v2 = b2Math_22.b2Vec2.AddVV(b2Math_22.b2Vec2.SubVV(b2Math_22.b2Vec2.AddVV(vB, b2Math_22.b2Vec2.CrossSV(wB, rB, b2Math_22.b2Vec2.s_t0), b2Math_22.b2Vec2.s_t0), b2Math_22.b2Vec2.AddVV(vA, b2Math_22.b2Vec2.CrossSV(wA, rA, b2Math_22.b2Vec2.s_t1), b2Math_22.b2Vec2.s_t1), b2Math_22.b2Vec2.s_t2), b2Math_22.b2Vec2.MulSV(inv_h * this.m_correctionFactor, this.m_linearError, b2Math_22.b2Vec2.s_t3), b2MotorJoint.SolveVelocityConstraints_s_Cdot_v2);
                var impulse_v2 = b2Math_22.b2Mat22.MulMV(this.m_linearMass, Cdot_v2, b2MotorJoint.SolveVelocityConstraints_s_impulse_v2).SelfNeg();
                var oldImpulse_v2 = b2MotorJoint.SolveVelocityConstraints_s_oldImpulse_v2.Copy(this.m_linearImpulse);
                this.m_linearImpulse.SelfAdd(impulse_v2);
                var maxImpulse = h * this.m_maxForce;
                if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
                    this.m_linearImpulse.Normalize();
                    this.m_linearImpulse.SelfMul(maxImpulse);
                }
                b2Math_22.b2Vec2.SubVV(this.m_linearImpulse, oldImpulse_v2, impulse_v2);
                vA.SelfMulSub(mA, impulse_v2);
                wA -= iA * b2Math_22.b2Vec2.CrossVV(rA, impulse_v2);
                vB.SelfMulAdd(mB, impulse_v2);
                wB += iB * b2Math_22.b2Vec2.CrossVV(rB, impulse_v2);
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2MotorJoint.prototype.SolvePositionConstraints = function (data) {
            return true;
        };
        b2MotorJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2MotorJointDef = new b2MotorJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.linearOffset.Set(%.15f, %.15f);\n", this.m_linearOffset.x, this.m_linearOffset.y);
            log("  jd.angularOffset = %.15f;\n", this.m_angularOffset);
            log("  jd.maxForce = %.15f;\n", this.m_maxForce);
            log("  jd.maxTorque = %.15f;\n", this.m_maxTorque);
            log("  jd.correctionFactor = %.15f;\n", this.m_correctionFactor);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2MotorJoint.SolveVelocityConstraints_s_Cdot_v2 = new b2Math_22.b2Vec2();
        b2MotorJoint.SolveVelocityConstraints_s_impulse_v2 = new b2Math_22.b2Vec2();
        b2MotorJoint.SolveVelocityConstraints_s_oldImpulse_v2 = new b2Math_22.b2Vec2();
        return b2MotorJoint;
    }(b2Joint_7.b2Joint));
    exports.b2MotorJoint = b2MotorJoint;
});
define("Dynamics/Joints/b2MouseJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_24, b2Math_23, b2Joint_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2MouseJointDef = (function (_super) {
        __extends(b2MouseJointDef, _super);
        function b2MouseJointDef() {
            var _this = _super.call(this, b2Joint_8.b2JointType.e_mouseJoint) || this;
            _this.target = new b2Math_23.b2Vec2();
            _this.maxForce = 0;
            _this.frequencyHz = 5;
            _this.dampingRatio = 0.7;
            return _this;
        }
        return b2MouseJointDef;
    }(b2Joint_8.b2JointDef));
    exports.b2MouseJointDef = b2MouseJointDef;
    var b2MouseJoint = (function (_super) {
        __extends(b2MouseJoint, _super);
        function b2MouseJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_localAnchorB = new b2Math_23.b2Vec2();
            _this.m_targetA = new b2Math_23.b2Vec2();
            _this.m_frequencyHz = 0;
            _this.m_dampingRatio = 0;
            _this.m_beta = 0;
            _this.m_impulse = new b2Math_23.b2Vec2();
            _this.m_maxForce = 0;
            _this.m_gamma = 0;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_rB = new b2Math_23.b2Vec2();
            _this.m_localCenterB = new b2Math_23.b2Vec2();
            _this.m_invMassB = 0;
            _this.m_invIB = 0;
            _this.m_mass = new b2Math_23.b2Mat22();
            _this.m_C = new b2Math_23.b2Vec2();
            _this.m_qB = new b2Math_23.b2Rot();
            _this.m_lalcB = new b2Math_23.b2Vec2();
            _this.m_K = new b2Math_23.b2Mat22();
            _this.m_targetA.Copy(b2Settings_24.b2Maybe(def.target, b2Math_23.b2Vec2.ZERO));
            b2Math_23.b2Transform.MulTXV(_this.m_bodyB.GetTransform(), _this.m_targetA, _this.m_localAnchorB);
            _this.m_maxForce = b2Settings_24.b2Maybe(def.maxForce, 0);
            _this.m_impulse.SetZero();
            _this.m_frequencyHz = b2Settings_24.b2Maybe(def.frequencyHz, 0);
            _this.m_dampingRatio = b2Settings_24.b2Maybe(def.dampingRatio, 0);
            _this.m_beta = 0;
            _this.m_gamma = 0;
            return _this;
        }
        b2MouseJoint.prototype.SetTarget = function (target) {
            if (!this.m_bodyB.IsAwake()) {
                this.m_bodyB.SetAwake(true);
            }
            this.m_targetA.Copy(target);
        };
        b2MouseJoint.prototype.GetTarget = function () {
            return this.m_targetA;
        };
        b2MouseJoint.prototype.SetMaxForce = function (maxForce) {
            this.m_maxForce = maxForce;
        };
        b2MouseJoint.prototype.GetMaxForce = function () {
            return this.m_maxForce;
        };
        b2MouseJoint.prototype.SetFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        b2MouseJoint.prototype.GetFrequency = function () {
            return this.m_frequencyHz;
        };
        b2MouseJoint.prototype.SetDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        b2MouseJoint.prototype.GetDampingRatio = function () {
            return this.m_dampingRatio;
        };
        b2MouseJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIB = this.m_bodyB.m_invI;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qB = this.m_qB.SetAngle(aB);
            var mass = this.m_bodyB.GetMass();
            var omega = 2 * b2Settings_24.b2_pi * this.m_frequencyHz;
            var d = 2 * mass * this.m_dampingRatio * omega;
            var k = mass * (omega * omega);
            var h = data.step.dt;
            this.m_gamma = h * (d + h * k);
            if (this.m_gamma !== 0) {
                this.m_gamma = 1 / this.m_gamma;
            }
            this.m_beta = h * k * this.m_gamma;
            b2Math_23.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            b2Math_23.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var K = this.m_K;
            K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
            K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
            K.GetInverse(this.m_mass);
            this.m_C.x = cB.x + this.m_rB.x - this.m_targetA.x;
            this.m_C.y = cB.y + this.m_rB.y - this.m_targetA.y;
            this.m_C.SelfMul(this.m_beta);
            wB *= 0.98;
            if (data.step.warmStarting) {
                this.m_impulse.SelfMul(data.step.dtRatio);
                vB.x += this.m_invMassB * this.m_impulse.x;
                vB.y += this.m_invMassB * this.m_impulse.y;
                wB += this.m_invIB * b2Math_23.b2Vec2.CrossVV(this.m_rB, this.m_impulse);
            }
            else {
                this.m_impulse.SetZero();
            }
            data.velocities[this.m_indexB].w = wB;
        };
        b2MouseJoint.prototype.SolveVelocityConstraints = function (data) {
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var Cdot = b2Math_23.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2MouseJoint.SolveVelocityConstraints_s_Cdot);
            var impulse = b2Math_23.b2Mat22.MulMV(this.m_mass, b2Math_23.b2Vec2.AddVV(Cdot, b2Math_23.b2Vec2.AddVV(this.m_C, b2Math_23.b2Vec2.MulSV(this.m_gamma, this.m_impulse, b2Math_23.b2Vec2.s_t0), b2Math_23.b2Vec2.s_t0), b2Math_23.b2Vec2.s_t0).SelfNeg(), b2MouseJoint.SolveVelocityConstraints_s_impulse);
            var oldImpulse = b2MouseJoint.SolveVelocityConstraints_s_oldImpulse.Copy(this.m_impulse);
            this.m_impulse.SelfAdd(impulse);
            var maxImpulse = data.step.dt * this.m_maxForce;
            if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
                this.m_impulse.SelfMul(maxImpulse / this.m_impulse.Length());
            }
            b2Math_23.b2Vec2.SubVV(this.m_impulse, oldImpulse, impulse);
            vB.SelfMulAdd(this.m_invMassB, impulse);
            wB += this.m_invIB * b2Math_23.b2Vec2.CrossVV(this.m_rB, impulse);
            data.velocities[this.m_indexB].w = wB;
        };
        b2MouseJoint.prototype.SolvePositionConstraints = function (data) {
            return true;
        };
        b2MouseJoint.prototype.GetAnchorA = function (out) {
            out.x = this.m_targetA.x;
            out.y = this.m_targetA.y;
            return out;
        };
        b2MouseJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2MouseJoint.prototype.GetReactionForce = function (inv_dt, out) {
            return b2Math_23.b2Vec2.MulSV(inv_dt, this.m_impulse, out);
        };
        b2MouseJoint.prototype.GetReactionTorque = function (inv_dt) {
            return 0;
        };
        b2MouseJoint.prototype.Dump = function (log) {
            log("Mouse joint dumping is not supported.\n");
        };
        b2MouseJoint.prototype.ShiftOrigin = function (newOrigin) {
            this.m_targetA.SelfSub(newOrigin);
        };
        b2MouseJoint.SolveVelocityConstraints_s_Cdot = new b2Math_23.b2Vec2();
        b2MouseJoint.SolveVelocityConstraints_s_impulse = new b2Math_23.b2Vec2();
        b2MouseJoint.SolveVelocityConstraints_s_oldImpulse = new b2Math_23.b2Vec2();
        return b2MouseJoint;
    }(b2Joint_8.b2Joint));
    exports.b2MouseJoint = b2MouseJoint;
});
define("Dynamics/Joints/b2PulleyJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_25, b2Math_24, b2Joint_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b2_minPulleyLength = 2;
    var b2PulleyJointDef = (function (_super) {
        __extends(b2PulleyJointDef, _super);
        function b2PulleyJointDef() {
            var _this = _super.call(this, b2Joint_9.b2JointType.e_pulleyJoint) || this;
            _this.groundAnchorA = new b2Math_24.b2Vec2(-1, 1);
            _this.groundAnchorB = new b2Math_24.b2Vec2(1, 1);
            _this.localAnchorA = new b2Math_24.b2Vec2(-1, 0);
            _this.localAnchorB = new b2Math_24.b2Vec2(1, 0);
            _this.lengthA = 0;
            _this.lengthB = 0;
            _this.ratio = 1;
            _this.collideConnected = true;
            return _this;
        }
        b2PulleyJointDef.prototype.Initialize = function (bA, bB, groundA, groundB, anchorA, anchorB, r) {
            this.bodyA = bA;
            this.bodyB = bB;
            this.groundAnchorA.Copy(groundA);
            this.groundAnchorB.Copy(groundB);
            this.bodyA.GetLocalPoint(anchorA, this.localAnchorA);
            this.bodyB.GetLocalPoint(anchorB, this.localAnchorB);
            this.lengthA = b2Math_24.b2Vec2.DistanceVV(anchorA, groundA);
            this.lengthB = b2Math_24.b2Vec2.DistanceVV(anchorB, groundB);
            this.ratio = r;
        };
        return b2PulleyJointDef;
    }(b2Joint_9.b2JointDef));
    exports.b2PulleyJointDef = b2PulleyJointDef;
    var b2PulleyJoint = (function (_super) {
        __extends(b2PulleyJoint, _super);
        function b2PulleyJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_groundAnchorA = new b2Math_24.b2Vec2();
            _this.m_groundAnchorB = new b2Math_24.b2Vec2();
            _this.m_lengthA = 0;
            _this.m_lengthB = 0;
            _this.m_localAnchorA = new b2Math_24.b2Vec2();
            _this.m_localAnchorB = new b2Math_24.b2Vec2();
            _this.m_constant = 0;
            _this.m_ratio = 0;
            _this.m_impulse = 0;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_uA = new b2Math_24.b2Vec2();
            _this.m_uB = new b2Math_24.b2Vec2();
            _this.m_rA = new b2Math_24.b2Vec2();
            _this.m_rB = new b2Math_24.b2Vec2();
            _this.m_localCenterA = new b2Math_24.b2Vec2();
            _this.m_localCenterB = new b2Math_24.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_mass = 0;
            _this.m_qA = new b2Math_24.b2Rot();
            _this.m_qB = new b2Math_24.b2Rot();
            _this.m_lalcA = new b2Math_24.b2Vec2();
            _this.m_lalcB = new b2Math_24.b2Vec2();
            _this.m_groundAnchorA.Copy(b2Settings_25.b2Maybe(def.groundAnchorA, new b2Math_24.b2Vec2(-1, 1)));
            _this.m_groundAnchorB.Copy(b2Settings_25.b2Maybe(def.groundAnchorB, new b2Math_24.b2Vec2(1, 0)));
            _this.m_localAnchorA.Copy(b2Settings_25.b2Maybe(def.localAnchorA, new b2Math_24.b2Vec2(-1, 0)));
            _this.m_localAnchorB.Copy(b2Settings_25.b2Maybe(def.localAnchorB, new b2Math_24.b2Vec2(1, 0)));
            _this.m_lengthA = b2Settings_25.b2Maybe(def.lengthA, 0);
            _this.m_lengthB = b2Settings_25.b2Maybe(def.lengthB, 0);
            _this.m_ratio = b2Settings_25.b2Maybe(def.ratio, 1);
            _this.m_constant = b2Settings_25.b2Maybe(def.lengthA, 0) + _this.m_ratio * b2Settings_25.b2Maybe(def.lengthB, 0);
            _this.m_impulse = 0;
            return _this;
        }
        b2PulleyJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_24.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            b2Math_24.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_24.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            b2Math_24.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            this.m_uA.Copy(cA).SelfAdd(this.m_rA).SelfSub(this.m_groundAnchorA);
            this.m_uB.Copy(cB).SelfAdd(this.m_rB).SelfSub(this.m_groundAnchorB);
            var lengthA = this.m_uA.Length();
            var lengthB = this.m_uB.Length();
            if (lengthA > 10 * b2Settings_25.b2_linearSlop) {
                this.m_uA.SelfMul(1 / lengthA);
            }
            else {
                this.m_uA.SetZero();
            }
            if (lengthB > 10 * b2Settings_25.b2_linearSlop) {
                this.m_uB.SelfMul(1 / lengthB);
            }
            else {
                this.m_uB.SetZero();
            }
            var ruA = b2Math_24.b2Vec2.CrossVV(this.m_rA, this.m_uA);
            var ruB = b2Math_24.b2Vec2.CrossVV(this.m_rB, this.m_uB);
            var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
            var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
            this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
            if (this.m_mass > 0) {
                this.m_mass = 1 / this.m_mass;
            }
            if (data.step.warmStarting) {
                this.m_impulse *= data.step.dtRatio;
                var PA = b2Math_24.b2Vec2.MulSV(-(this.m_impulse), this.m_uA, b2PulleyJoint.InitVelocityConstraints_s_PA);
                var PB = b2Math_24.b2Vec2.MulSV((-this.m_ratio * this.m_impulse), this.m_uB, b2PulleyJoint.InitVelocityConstraints_s_PB);
                vA.SelfMulAdd(this.m_invMassA, PA);
                wA += this.m_invIA * b2Math_24.b2Vec2.CrossVV(this.m_rA, PA);
                vB.SelfMulAdd(this.m_invMassB, PB);
                wB += this.m_invIB * b2Math_24.b2Vec2.CrossVV(this.m_rB, PB);
            }
            else {
                this.m_impulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2PulleyJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var vpA = b2Math_24.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2PulleyJoint.SolveVelocityConstraints_s_vpA);
            var vpB = b2Math_24.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2PulleyJoint.SolveVelocityConstraints_s_vpB);
            var Cdot = -b2Math_24.b2Vec2.DotVV(this.m_uA, vpA) - this.m_ratio * b2Math_24.b2Vec2.DotVV(this.m_uB, vpB);
            var impulse = -this.m_mass * Cdot;
            this.m_impulse += impulse;
            var PA = b2Math_24.b2Vec2.MulSV(-impulse, this.m_uA, b2PulleyJoint.SolveVelocityConstraints_s_PA);
            var PB = b2Math_24.b2Vec2.MulSV(-this.m_ratio * impulse, this.m_uB, b2PulleyJoint.SolveVelocityConstraints_s_PB);
            vA.SelfMulAdd(this.m_invMassA, PA);
            wA += this.m_invIA * b2Math_24.b2Vec2.CrossVV(this.m_rA, PA);
            vB.SelfMulAdd(this.m_invMassB, PB);
            wB += this.m_invIB * b2Math_24.b2Vec2.CrossVV(this.m_rB, PB);
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2PulleyJoint.prototype.SolvePositionConstraints = function (data) {
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_24.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var rA = b2Math_24.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_24.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var rB = b2Math_24.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var uA = this.m_uA.Copy(cA).SelfAdd(rA).SelfSub(this.m_groundAnchorA);
            var uB = this.m_uB.Copy(cB).SelfAdd(rB).SelfSub(this.m_groundAnchorB);
            var lengthA = uA.Length();
            var lengthB = uB.Length();
            if (lengthA > 10 * b2Settings_25.b2_linearSlop) {
                uA.SelfMul(1 / lengthA);
            }
            else {
                uA.SetZero();
            }
            if (lengthB > 10 * b2Settings_25.b2_linearSlop) {
                uB.SelfMul(1 / lengthB);
            }
            else {
                uB.SetZero();
            }
            var ruA = b2Math_24.b2Vec2.CrossVV(rA, uA);
            var ruB = b2Math_24.b2Vec2.CrossVV(rB, uB);
            var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
            var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
            var mass = mA + this.m_ratio * this.m_ratio * mB;
            if (mass > 0) {
                mass = 1 / mass;
            }
            var C = this.m_constant - lengthA - this.m_ratio * lengthB;
            var linearError = b2Math_24.b2Abs(C);
            var impulse = -mass * C;
            var PA = b2Math_24.b2Vec2.MulSV(-impulse, uA, b2PulleyJoint.SolvePositionConstraints_s_PA);
            var PB = b2Math_24.b2Vec2.MulSV(-this.m_ratio * impulse, uB, b2PulleyJoint.SolvePositionConstraints_s_PB);
            cA.SelfMulAdd(this.m_invMassA, PA);
            aA += this.m_invIA * b2Math_24.b2Vec2.CrossVV(rA, PA);
            cB.SelfMulAdd(this.m_invMassB, PB);
            aB += this.m_invIB * b2Math_24.b2Vec2.CrossVV(rB, PB);
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            return linearError < b2Settings_25.b2_linearSlop;
        };
        b2PulleyJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2PulleyJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2PulleyJoint.prototype.GetReactionForce = function (inv_dt, out) {
            out.x = inv_dt * this.m_impulse * this.m_uB.x;
            out.y = inv_dt * this.m_impulse * this.m_uB.y;
            return out;
        };
        b2PulleyJoint.prototype.GetReactionTorque = function (inv_dt) {
            return 0;
        };
        b2PulleyJoint.prototype.GetGroundAnchorA = function () {
            return this.m_groundAnchorA;
        };
        b2PulleyJoint.prototype.GetGroundAnchorB = function () {
            return this.m_groundAnchorB;
        };
        b2PulleyJoint.prototype.GetLengthA = function () {
            return this.m_lengthA;
        };
        b2PulleyJoint.prototype.GetLengthB = function () {
            return this.m_lengthB;
        };
        b2PulleyJoint.prototype.GetRatio = function () {
            return this.m_ratio;
        };
        b2PulleyJoint.prototype.GetCurrentLengthA = function () {
            var p = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, b2PulleyJoint.GetCurrentLengthA_s_p);
            var s = this.m_groundAnchorA;
            return b2Math_24.b2Vec2.DistanceVV(p, s);
        };
        b2PulleyJoint.prototype.GetCurrentLengthB = function () {
            var p = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, b2PulleyJoint.GetCurrentLengthB_s_p);
            var s = this.m_groundAnchorB;
            return b2Math_24.b2Vec2.DistanceVV(p, s);
        };
        b2PulleyJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2PulleyJointDef = new b2PulleyJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.groundAnchorA.Set(%.15f, %.15f);\n", this.m_groundAnchorA.x, this.m_groundAnchorA.y);
            log("  jd.groundAnchorB.Set(%.15f, %.15f);\n", this.m_groundAnchorB.x, this.m_groundAnchorB.y);
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.lengthA = %.15f;\n", this.m_lengthA);
            log("  jd.lengthB = %.15f;\n", this.m_lengthB);
            log("  jd.ratio = %.15f;\n", this.m_ratio);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2PulleyJoint.prototype.ShiftOrigin = function (newOrigin) {
            this.m_groundAnchorA.SelfSub(newOrigin);
            this.m_groundAnchorB.SelfSub(newOrigin);
        };
        b2PulleyJoint.InitVelocityConstraints_s_PA = new b2Math_24.b2Vec2();
        b2PulleyJoint.InitVelocityConstraints_s_PB = new b2Math_24.b2Vec2();
        b2PulleyJoint.SolveVelocityConstraints_s_vpA = new b2Math_24.b2Vec2();
        b2PulleyJoint.SolveVelocityConstraints_s_vpB = new b2Math_24.b2Vec2();
        b2PulleyJoint.SolveVelocityConstraints_s_PA = new b2Math_24.b2Vec2();
        b2PulleyJoint.SolveVelocityConstraints_s_PB = new b2Math_24.b2Vec2();
        b2PulleyJoint.SolvePositionConstraints_s_PA = new b2Math_24.b2Vec2();
        b2PulleyJoint.SolvePositionConstraints_s_PB = new b2Math_24.b2Vec2();
        b2PulleyJoint.GetCurrentLengthA_s_p = new b2Math_24.b2Vec2();
        b2PulleyJoint.GetCurrentLengthB_s_p = new b2Math_24.b2Vec2();
        return b2PulleyJoint;
    }(b2Joint_9.b2Joint));
    exports.b2PulleyJoint = b2PulleyJoint;
});
define("Dynamics/Joints/b2RopeJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_26, b2Math_25, b2Joint_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2RopeJointDef = (function (_super) {
        __extends(b2RopeJointDef, _super);
        function b2RopeJointDef() {
            var _this = _super.call(this, b2Joint_10.b2JointType.e_ropeJoint) || this;
            _this.localAnchorA = new b2Math_25.b2Vec2(-1, 0);
            _this.localAnchorB = new b2Math_25.b2Vec2(1, 0);
            _this.maxLength = 0;
            return _this;
        }
        return b2RopeJointDef;
    }(b2Joint_10.b2JointDef));
    exports.b2RopeJointDef = b2RopeJointDef;
    var b2RopeJoint = (function (_super) {
        __extends(b2RopeJoint, _super);
        function b2RopeJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_localAnchorA = new b2Math_25.b2Vec2();
            _this.m_localAnchorB = new b2Math_25.b2Vec2();
            _this.m_maxLength = 0;
            _this.m_length = 0;
            _this.m_impulse = 0;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_u = new b2Math_25.b2Vec2();
            _this.m_rA = new b2Math_25.b2Vec2();
            _this.m_rB = new b2Math_25.b2Vec2();
            _this.m_localCenterA = new b2Math_25.b2Vec2();
            _this.m_localCenterB = new b2Math_25.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_mass = 0;
            _this.m_state = b2Joint_10.b2LimitState.e_inactiveLimit;
            _this.m_qA = new b2Math_25.b2Rot();
            _this.m_qB = new b2Math_25.b2Rot();
            _this.m_lalcA = new b2Math_25.b2Vec2();
            _this.m_lalcB = new b2Math_25.b2Vec2();
            _this.m_localAnchorA.Copy(b2Settings_26.b2Maybe(def.localAnchorA, new b2Math_25.b2Vec2(-1, 0)));
            _this.m_localAnchorB.Copy(b2Settings_26.b2Maybe(def.localAnchorB, new b2Math_25.b2Vec2(1, 0)));
            _this.m_maxLength = b2Settings_26.b2Maybe(def.maxLength, 0);
            return _this;
        }
        b2RopeJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_25.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            b2Math_25.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_25.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            b2Math_25.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            this.m_u.Copy(cB).SelfAdd(this.m_rB).SelfSub(cA).SelfSub(this.m_rA);
            this.m_length = this.m_u.Length();
            var C = this.m_length - this.m_maxLength;
            if (C > 0) {
                this.m_state = b2Joint_10.b2LimitState.e_atUpperLimit;
            }
            else {
                this.m_state = b2Joint_10.b2LimitState.e_inactiveLimit;
            }
            if (this.m_length > b2Settings_26.b2_linearSlop) {
                this.m_u.SelfMul(1 / this.m_length);
            }
            else {
                this.m_u.SetZero();
                this.m_mass = 0;
                this.m_impulse = 0;
                return;
            }
            var crA = b2Math_25.b2Vec2.CrossVV(this.m_rA, this.m_u);
            var crB = b2Math_25.b2Vec2.CrossVV(this.m_rB, this.m_u);
            var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;
            this.m_mass = invMass !== 0 ? 1 / invMass : 0;
            if (data.step.warmStarting) {
                this.m_impulse *= data.step.dtRatio;
                var P = b2Math_25.b2Vec2.MulSV(this.m_impulse, this.m_u, b2RopeJoint.InitVelocityConstraints_s_P);
                vA.SelfMulSub(this.m_invMassA, P);
                wA -= this.m_invIA * b2Math_25.b2Vec2.CrossVV(this.m_rA, P);
                vB.SelfMulAdd(this.m_invMassB, P);
                wB += this.m_invIB * b2Math_25.b2Vec2.CrossVV(this.m_rB, P);
            }
            else {
                this.m_impulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2RopeJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var vpA = b2Math_25.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2RopeJoint.SolveVelocityConstraints_s_vpA);
            var vpB = b2Math_25.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2RopeJoint.SolveVelocityConstraints_s_vpB);
            var C = this.m_length - this.m_maxLength;
            var Cdot = b2Math_25.b2Vec2.DotVV(this.m_u, b2Math_25.b2Vec2.SubVV(vpB, vpA, b2Math_25.b2Vec2.s_t0));
            if (C < 0) {
                Cdot += data.step.inv_dt * C;
            }
            var impulse = -this.m_mass * Cdot;
            var oldImpulse = this.m_impulse;
            this.m_impulse = b2Math_25.b2Min(0, this.m_impulse + impulse);
            impulse = this.m_impulse - oldImpulse;
            var P = b2Math_25.b2Vec2.MulSV(impulse, this.m_u, b2RopeJoint.SolveVelocityConstraints_s_P);
            vA.SelfMulSub(this.m_invMassA, P);
            wA -= this.m_invIA * b2Math_25.b2Vec2.CrossVV(this.m_rA, P);
            vB.SelfMulAdd(this.m_invMassB, P);
            wB += this.m_invIB * b2Math_25.b2Vec2.CrossVV(this.m_rB, P);
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2RopeJoint.prototype.SolvePositionConstraints = function (data) {
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_25.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var rA = b2Math_25.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_25.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var rB = b2Math_25.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var u = this.m_u.Copy(cB).SelfAdd(rB).SelfSub(cA).SelfSub(rA);
            var length = u.Normalize();
            var C = length - this.m_maxLength;
            C = b2Math_25.b2Clamp(C, 0, b2Settings_26.b2_maxLinearCorrection);
            var impulse = -this.m_mass * C;
            var P = b2Math_25.b2Vec2.MulSV(impulse, u, b2RopeJoint.SolvePositionConstraints_s_P);
            cA.SelfMulSub(this.m_invMassA, P);
            aA -= this.m_invIA * b2Math_25.b2Vec2.CrossVV(rA, P);
            cB.SelfMulAdd(this.m_invMassB, P);
            aB += this.m_invIB * b2Math_25.b2Vec2.CrossVV(rB, P);
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            return length - this.m_maxLength < b2Settings_26.b2_linearSlop;
        };
        b2RopeJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2RopeJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2RopeJoint.prototype.GetReactionForce = function (inv_dt, out) {
            return b2Math_25.b2Vec2.MulSV((inv_dt * this.m_impulse), this.m_u, out);
        };
        b2RopeJoint.prototype.GetReactionTorque = function (inv_dt) {
            return 0;
        };
        b2RopeJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
        b2RopeJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
        b2RopeJoint.prototype.SetMaxLength = function (length) { this.m_maxLength = length; };
        b2RopeJoint.prototype.GetMaxLength = function () {
            return this.m_maxLength;
        };
        b2RopeJoint.prototype.GetLimitState = function () {
            return this.m_state;
        };
        b2RopeJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2RopeJointDef = new b2RopeJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.maxLength = %.15f;\n", this.m_maxLength);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2RopeJoint.InitVelocityConstraints_s_P = new b2Math_25.b2Vec2();
        b2RopeJoint.SolveVelocityConstraints_s_vpA = new b2Math_25.b2Vec2();
        b2RopeJoint.SolveVelocityConstraints_s_vpB = new b2Math_25.b2Vec2();
        b2RopeJoint.SolveVelocityConstraints_s_P = new b2Math_25.b2Vec2();
        b2RopeJoint.SolvePositionConstraints_s_P = new b2Math_25.b2Vec2();
        return b2RopeJoint;
    }(b2Joint_10.b2Joint));
    exports.b2RopeJoint = b2RopeJoint;
});
define("Dynamics/Joints/b2WeldJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_27, b2Math_26, b2Joint_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2WeldJointDef = (function (_super) {
        __extends(b2WeldJointDef, _super);
        function b2WeldJointDef() {
            var _this = _super.call(this, b2Joint_11.b2JointType.e_weldJoint) || this;
            _this.localAnchorA = new b2Math_26.b2Vec2();
            _this.localAnchorB = new b2Math_26.b2Vec2();
            _this.referenceAngle = 0;
            _this.frequencyHz = 0;
            _this.dampingRatio = 0;
            return _this;
        }
        b2WeldJointDef.prototype.Initialize = function (bA, bB, anchor) {
            this.bodyA = bA;
            this.bodyB = bB;
            this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
            this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
            this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
        };
        return b2WeldJointDef;
    }(b2Joint_11.b2JointDef));
    exports.b2WeldJointDef = b2WeldJointDef;
    var b2WeldJoint = (function (_super) {
        __extends(b2WeldJoint, _super);
        function b2WeldJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_frequencyHz = 0;
            _this.m_dampingRatio = 0;
            _this.m_bias = 0;
            _this.m_localAnchorA = new b2Math_26.b2Vec2();
            _this.m_localAnchorB = new b2Math_26.b2Vec2();
            _this.m_referenceAngle = 0;
            _this.m_gamma = 0;
            _this.m_impulse = new b2Math_26.b2Vec3(0, 0, 0);
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_rA = new b2Math_26.b2Vec2();
            _this.m_rB = new b2Math_26.b2Vec2();
            _this.m_localCenterA = new b2Math_26.b2Vec2();
            _this.m_localCenterB = new b2Math_26.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_mass = new b2Math_26.b2Mat33();
            _this.m_qA = new b2Math_26.b2Rot();
            _this.m_qB = new b2Math_26.b2Rot();
            _this.m_lalcA = new b2Math_26.b2Vec2();
            _this.m_lalcB = new b2Math_26.b2Vec2();
            _this.m_K = new b2Math_26.b2Mat33();
            _this.m_frequencyHz = b2Settings_27.b2Maybe(def.frequencyHz, 0);
            _this.m_dampingRatio = b2Settings_27.b2Maybe(def.dampingRatio, 0);
            _this.m_localAnchorA.Copy(b2Settings_27.b2Maybe(def.localAnchorA, b2Math_26.b2Vec2.ZERO));
            _this.m_localAnchorB.Copy(b2Settings_27.b2Maybe(def.localAnchorB, b2Math_26.b2Vec2.ZERO));
            _this.m_referenceAngle = b2Settings_27.b2Maybe(def.referenceAngle, 0);
            _this.m_impulse.SetZero();
            return _this;
        }
        b2WeldJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_26.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            b2Math_26.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_26.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            b2Math_26.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var K = this.m_K;
            K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
            K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
            K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
            K.ex.y = K.ey.x;
            K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
            K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
            K.ex.z = K.ez.x;
            K.ey.z = K.ez.y;
            K.ez.z = iA + iB;
            if (this.m_frequencyHz > 0) {
                K.GetInverse22(this.m_mass);
                var invM = iA + iB;
                var m = invM > 0 ? 1 / invM : 0;
                var C = aB - aA - this.m_referenceAngle;
                var omega = 2 * b2Settings_27.b2_pi * this.m_frequencyHz;
                var d = 2 * m * this.m_dampingRatio * omega;
                var k = m * omega * omega;
                var h = data.step.dt;
                this.m_gamma = h * (d + h * k);
                this.m_gamma = this.m_gamma !== 0 ? 1 / this.m_gamma : 0;
                this.m_bias = C * h * k * this.m_gamma;
                invM += this.m_gamma;
                this.m_mass.ez.z = invM !== 0 ? 1 / invM : 0;
            }
            else {
                K.GetSymInverse33(this.m_mass);
                this.m_gamma = 0;
                this.m_bias = 0;
            }
            if (data.step.warmStarting) {
                this.m_impulse.SelfMul(data.step.dtRatio);
                var P = b2WeldJoint.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
                vA.SelfMulSub(mA, P);
                wA -= iA * (b2Math_26.b2Vec2.CrossVV(this.m_rA, P) + this.m_impulse.z);
                vB.SelfMulAdd(mB, P);
                wB += iB * (b2Math_26.b2Vec2.CrossVV(this.m_rB, P) + this.m_impulse.z);
            }
            else {
                this.m_impulse.SetZero();
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2WeldJoint.prototype.SolveVelocityConstraints = function (data) {
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            if (this.m_frequencyHz > 0) {
                var Cdot2 = wB - wA;
                var impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
                this.m_impulse.z += impulse2;
                wA -= iA * impulse2;
                wB += iB * impulse2;
                var Cdot1 = b2Math_26.b2Vec2.SubVV(b2Math_26.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2Math_26.b2Vec2.s_t0), b2Math_26.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2Math_26.b2Vec2.s_t1), b2WeldJoint.SolveVelocityConstraints_s_Cdot1);
                var impulse1 = b2Math_26.b2Mat33.MulM33XY(this.m_mass, Cdot1.x, Cdot1.y, b2WeldJoint.SolveVelocityConstraints_s_impulse1).SelfNeg();
                this.m_impulse.x += impulse1.x;
                this.m_impulse.y += impulse1.y;
                var P = impulse1;
                vA.SelfMulSub(mA, P);
                wA -= iA * b2Math_26.b2Vec2.CrossVV(this.m_rA, P);
                vB.SelfMulAdd(mB, P);
                wB += iB * b2Math_26.b2Vec2.CrossVV(this.m_rB, P);
            }
            else {
                var Cdot1 = b2Math_26.b2Vec2.SubVV(b2Math_26.b2Vec2.AddVCrossSV(vB, wB, this.m_rB, b2Math_26.b2Vec2.s_t0), b2Math_26.b2Vec2.AddVCrossSV(vA, wA, this.m_rA, b2Math_26.b2Vec2.s_t1), b2WeldJoint.SolveVelocityConstraints_s_Cdot1);
                var Cdot2 = wB - wA;
                var impulse = b2Math_26.b2Mat33.MulM33XYZ(this.m_mass, Cdot1.x, Cdot1.y, Cdot2, b2WeldJoint.SolveVelocityConstraints_s_impulse).SelfNeg();
                this.m_impulse.SelfAdd(impulse);
                var P = b2WeldJoint.SolveVelocityConstraints_s_P.Set(impulse.x, impulse.y);
                vA.SelfMulSub(mA, P);
                wA -= iA * (b2Math_26.b2Vec2.CrossVV(this.m_rA, P) + impulse.z);
                vB.SelfMulAdd(mB, P);
                wB += iB * (b2Math_26.b2Vec2.CrossVV(this.m_rB, P) + impulse.z);
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2WeldJoint.prototype.SolvePositionConstraints = function (data) {
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            b2Math_26.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var rA = b2Math_26.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_26.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var rB = b2Math_26.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var positionError, angularError;
            var K = this.m_K;
            K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
            K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
            K.ez.x = -rA.y * iA - rB.y * iB;
            K.ex.y = K.ey.x;
            K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
            K.ez.y = rA.x * iA + rB.x * iB;
            K.ex.z = K.ez.x;
            K.ey.z = K.ez.y;
            K.ez.z = iA + iB;
            if (this.m_frequencyHz > 0) {
                var C1 = b2Math_26.b2Vec2.SubVV(b2Math_26.b2Vec2.AddVV(cB, rB, b2Math_26.b2Vec2.s_t0), b2Math_26.b2Vec2.AddVV(cA, rA, b2Math_26.b2Vec2.s_t1), b2WeldJoint.SolvePositionConstraints_s_C1);
                positionError = C1.Length();
                angularError = 0;
                var P = K.Solve22(C1.x, C1.y, b2WeldJoint.SolvePositionConstraints_s_P).SelfNeg();
                cA.SelfMulSub(mA, P);
                aA -= iA * b2Math_26.b2Vec2.CrossVV(rA, P);
                cB.SelfMulAdd(mB, P);
                aB += iB * b2Math_26.b2Vec2.CrossVV(rB, P);
            }
            else {
                var C1 = b2Math_26.b2Vec2.SubVV(b2Math_26.b2Vec2.AddVV(cB, rB, b2Math_26.b2Vec2.s_t0), b2Math_26.b2Vec2.AddVV(cA, rA, b2Math_26.b2Vec2.s_t1), b2WeldJoint.SolvePositionConstraints_s_C1);
                var C2 = aB - aA - this.m_referenceAngle;
                positionError = C1.Length();
                angularError = b2Math_26.b2Abs(C2);
                var impulse = K.Solve33(C1.x, C1.y, C2, b2WeldJoint.SolvePositionConstraints_s_impulse).SelfNeg();
                var P = b2WeldJoint.SolvePositionConstraints_s_P.Set(impulse.x, impulse.y);
                cA.SelfMulSub(mA, P);
                aA -= iA * (b2Math_26.b2Vec2.CrossVV(this.m_rA, P) + impulse.z);
                cB.SelfMulAdd(mB, P);
                aB += iB * (b2Math_26.b2Vec2.CrossVV(this.m_rB, P) + impulse.z);
            }
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            return positionError <= b2Settings_27.b2_linearSlop && angularError <= b2Settings_27.b2_angularSlop;
        };
        b2WeldJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2WeldJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2WeldJoint.prototype.GetReactionForce = function (inv_dt, out) {
            out.x = inv_dt * this.m_impulse.x;
            out.y = inv_dt * this.m_impulse.y;
            return out;
        };
        b2WeldJoint.prototype.GetReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.z;
        };
        b2WeldJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
        b2WeldJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
        b2WeldJoint.prototype.GetReferenceAngle = function () { return this.m_referenceAngle; };
        b2WeldJoint.prototype.SetFrequency = function (hz) { this.m_frequencyHz = hz; };
        b2WeldJoint.prototype.GetFrequency = function () { return this.m_frequencyHz; };
        b2WeldJoint.prototype.SetDampingRatio = function (ratio) { this.m_dampingRatio = ratio; };
        b2WeldJoint.prototype.GetDampingRatio = function () { return this.m_dampingRatio; };
        b2WeldJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2WeldJointDef = new b2WeldJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle);
            log("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz);
            log("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2WeldJoint.InitVelocityConstraints_s_P = new b2Math_26.b2Vec2();
        b2WeldJoint.SolveVelocityConstraints_s_Cdot1 = new b2Math_26.b2Vec2();
        b2WeldJoint.SolveVelocityConstraints_s_impulse1 = new b2Math_26.b2Vec2();
        b2WeldJoint.SolveVelocityConstraints_s_impulse = new b2Math_26.b2Vec3();
        b2WeldJoint.SolveVelocityConstraints_s_P = new b2Math_26.b2Vec2();
        b2WeldJoint.SolvePositionConstraints_s_C1 = new b2Math_26.b2Vec2();
        b2WeldJoint.SolvePositionConstraints_s_P = new b2Math_26.b2Vec2();
        b2WeldJoint.SolvePositionConstraints_s_impulse = new b2Math_26.b2Vec3();
        return b2WeldJoint;
    }(b2Joint_11.b2Joint));
    exports.b2WeldJoint = b2WeldJoint;
});
define("Dynamics/Joints/b2WheelJoint", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Dynamics/Joints/b2Joint"], function (require, exports, b2Settings_28, b2Math_27, b2Joint_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2WheelJointDef = (function (_super) {
        __extends(b2WheelJointDef, _super);
        function b2WheelJointDef() {
            var _this = _super.call(this, b2Joint_12.b2JointType.e_wheelJoint) || this;
            _this.localAnchorA = new b2Math_27.b2Vec2(0, 0);
            _this.localAnchorB = new b2Math_27.b2Vec2(0, 0);
            _this.localAxisA = new b2Math_27.b2Vec2(1, 0);
            _this.enableMotor = false;
            _this.maxMotorTorque = 0;
            _this.motorSpeed = 0;
            _this.frequencyHz = 2;
            _this.dampingRatio = 0.7;
            return _this;
        }
        b2WheelJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
            this.bodyA = bA;
            this.bodyB = bB;
            this.bodyA.GetLocalPoint(anchor, this.localAnchorA);
            this.bodyB.GetLocalPoint(anchor, this.localAnchorB);
            this.bodyA.GetLocalVector(axis, this.localAxisA);
        };
        return b2WheelJointDef;
    }(b2Joint_12.b2JointDef));
    exports.b2WheelJointDef = b2WheelJointDef;
    var b2WheelJoint = (function (_super) {
        __extends(b2WheelJoint, _super);
        function b2WheelJoint(def) {
            var _this = _super.call(this, def) || this;
            _this.m_frequencyHz = 0;
            _this.m_dampingRatio = 0;
            _this.m_localAnchorA = new b2Math_27.b2Vec2();
            _this.m_localAnchorB = new b2Math_27.b2Vec2();
            _this.m_localXAxisA = new b2Math_27.b2Vec2();
            _this.m_localYAxisA = new b2Math_27.b2Vec2();
            _this.m_impulse = 0;
            _this.m_motorImpulse = 0;
            _this.m_springImpulse = 0;
            _this.m_maxMotorTorque = 0;
            _this.m_motorSpeed = 0;
            _this.m_enableMotor = false;
            _this.m_indexA = 0;
            _this.m_indexB = 0;
            _this.m_localCenterA = new b2Math_27.b2Vec2();
            _this.m_localCenterB = new b2Math_27.b2Vec2();
            _this.m_invMassA = 0;
            _this.m_invMassB = 0;
            _this.m_invIA = 0;
            _this.m_invIB = 0;
            _this.m_ax = new b2Math_27.b2Vec2();
            _this.m_ay = new b2Math_27.b2Vec2();
            _this.m_sAx = 0;
            _this.m_sBx = 0;
            _this.m_sAy = 0;
            _this.m_sBy = 0;
            _this.m_mass = 0;
            _this.m_motorMass = 0;
            _this.m_springMass = 0;
            _this.m_bias = 0;
            _this.m_gamma = 0;
            _this.m_qA = new b2Math_27.b2Rot();
            _this.m_qB = new b2Math_27.b2Rot();
            _this.m_lalcA = new b2Math_27.b2Vec2();
            _this.m_lalcB = new b2Math_27.b2Vec2();
            _this.m_rA = new b2Math_27.b2Vec2();
            _this.m_rB = new b2Math_27.b2Vec2();
            _this.m_frequencyHz = b2Settings_28.b2Maybe(def.frequencyHz, 2);
            _this.m_dampingRatio = b2Settings_28.b2Maybe(def.dampingRatio, 0.7);
            _this.m_localAnchorA.Copy(b2Settings_28.b2Maybe(def.localAnchorA, b2Math_27.b2Vec2.ZERO));
            _this.m_localAnchorB.Copy(b2Settings_28.b2Maybe(def.localAnchorB, b2Math_27.b2Vec2.ZERO));
            _this.m_localXAxisA.Copy(b2Settings_28.b2Maybe(def.localAxisA, b2Math_27.b2Vec2.UNITX));
            b2Math_27.b2Vec2.CrossOneV(_this.m_localXAxisA, _this.m_localYAxisA);
            _this.m_maxMotorTorque = b2Settings_28.b2Maybe(def.maxMotorTorque, 0);
            _this.m_motorSpeed = b2Settings_28.b2Maybe(def.motorSpeed, 0);
            _this.m_enableMotor = b2Settings_28.b2Maybe(def.enableMotor, false);
            _this.m_ax.SetZero();
            _this.m_ay.SetZero();
            return _this;
        }
        b2WheelJoint.prototype.GetMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        b2WheelJoint.prototype.GetMaxMotorTorque = function () {
            return this.m_maxMotorTorque;
        };
        b2WheelJoint.prototype.SetSpringFrequencyHz = function (hz) {
            this.m_frequencyHz = hz;
        };
        b2WheelJoint.prototype.GetSpringFrequencyHz = function () {
            return this.m_frequencyHz;
        };
        b2WheelJoint.prototype.SetSpringDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        b2WheelJoint.prototype.GetSpringDampingRatio = function () {
            return this.m_dampingRatio;
        };
        b2WheelJoint.prototype.InitVelocityConstraints = function (data) {
            this.m_indexA = this.m_bodyA.m_islandIndex;
            this.m_indexB = this.m_bodyB.m_islandIndex;
            this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter);
            this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter);
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_27.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var rA = b2Math_27.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_27.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var rB = b2Math_27.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var d = b2Math_27.b2Vec2.SubVV(b2Math_27.b2Vec2.AddVV(cB, rB, b2Math_27.b2Vec2.s_t0), b2Math_27.b2Vec2.AddVV(cA, rA, b2Math_27.b2Vec2.s_t1), b2WheelJoint.InitVelocityConstraints_s_d);
            {
                b2Math_27.b2Rot.MulRV(qA, this.m_localYAxisA, this.m_ay);
                this.m_sAy = b2Math_27.b2Vec2.CrossVV(b2Math_27.b2Vec2.AddVV(d, rA, b2Math_27.b2Vec2.s_t0), this.m_ay);
                this.m_sBy = b2Math_27.b2Vec2.CrossVV(rB, this.m_ay);
                this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;
                if (this.m_mass > 0) {
                    this.m_mass = 1 / this.m_mass;
                }
            }
            this.m_springMass = 0;
            this.m_bias = 0;
            this.m_gamma = 0;
            if (this.m_frequencyHz > 0) {
                b2Math_27.b2Rot.MulRV(qA, this.m_localXAxisA, this.m_ax);
                this.m_sAx = b2Math_27.b2Vec2.CrossVV(b2Math_27.b2Vec2.AddVV(d, rA, b2Math_27.b2Vec2.s_t0), this.m_ax);
                this.m_sBx = b2Math_27.b2Vec2.CrossVV(rB, this.m_ax);
                var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
                if (invMass > 0) {
                    this.m_springMass = 1 / invMass;
                    var C = b2Math_27.b2Vec2.DotVV(d, this.m_ax);
                    var omega = 2 * b2Settings_28.b2_pi * this.m_frequencyHz;
                    var dc = 2 * this.m_springMass * this.m_dampingRatio * omega;
                    var k = this.m_springMass * omega * omega;
                    var h = data.step.dt;
                    this.m_gamma = h * (dc + h * k);
                    if (this.m_gamma > 0) {
                        this.m_gamma = 1 / this.m_gamma;
                    }
                    this.m_bias = C * h * k * this.m_gamma;
                    this.m_springMass = invMass + this.m_gamma;
                    if (this.m_springMass > 0) {
                        this.m_springMass = 1 / this.m_springMass;
                    }
                }
            }
            else {
                this.m_springImpulse = 0;
            }
            if (this.m_enableMotor) {
                this.m_motorMass = iA + iB;
                if (this.m_motorMass > 0) {
                    this.m_motorMass = 1 / this.m_motorMass;
                }
            }
            else {
                this.m_motorMass = 0;
                this.m_motorImpulse = 0;
            }
            if (data.step.warmStarting) {
                this.m_impulse *= data.step.dtRatio;
                this.m_springImpulse *= data.step.dtRatio;
                this.m_motorImpulse *= data.step.dtRatio;
                var P = b2Math_27.b2Vec2.AddVV(b2Math_27.b2Vec2.MulSV(this.m_impulse, this.m_ay, b2Math_27.b2Vec2.s_t0), b2Math_27.b2Vec2.MulSV(this.m_springImpulse, this.m_ax, b2Math_27.b2Vec2.s_t1), b2WheelJoint.InitVelocityConstraints_s_P);
                var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
                var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
                vA.SelfMulSub(this.m_invMassA, P);
                wA -= this.m_invIA * LA;
                vB.SelfMulAdd(this.m_invMassB, P);
                wB += this.m_invIB * LB;
            }
            else {
                this.m_impulse = 0;
                this.m_springImpulse = 0;
                this.m_motorImpulse = 0;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2WheelJoint.prototype.SolveVelocityConstraints = function (data) {
            var mA = this.m_invMassA, mB = this.m_invMassB;
            var iA = this.m_invIA, iB = this.m_invIB;
            var vA = data.velocities[this.m_indexA].v;
            var wA = data.velocities[this.m_indexA].w;
            var vB = data.velocities[this.m_indexB].v;
            var wB = data.velocities[this.m_indexB].w;
            {
                var Cdot = b2Math_27.b2Vec2.DotVV(this.m_ax, b2Math_27.b2Vec2.SubVV(vB, vA, b2Math_27.b2Vec2.s_t0)) + this.m_sBx * wB - this.m_sAx * wA;
                var impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
                this.m_springImpulse += impulse;
                var P = b2Math_27.b2Vec2.MulSV(impulse, this.m_ax, b2WheelJoint.SolveVelocityConstraints_s_P);
                var LA = impulse * this.m_sAx;
                var LB = impulse * this.m_sBx;
                vA.SelfMulSub(mA, P);
                wA -= iA * LA;
                vB.SelfMulAdd(mB, P);
                wB += iB * LB;
            }
            {
                var Cdot = wB - wA - this.m_motorSpeed;
                var impulse = -this.m_motorMass * Cdot;
                var oldImpulse = this.m_motorImpulse;
                var maxImpulse = data.step.dt * this.m_maxMotorTorque;
                this.m_motorImpulse = b2Math_27.b2Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            {
                var Cdot = b2Math_27.b2Vec2.DotVV(this.m_ay, b2Math_27.b2Vec2.SubVV(vB, vA, b2Math_27.b2Vec2.s_t0)) + this.m_sBy * wB - this.m_sAy * wA;
                var impulse = -this.m_mass * Cdot;
                this.m_impulse += impulse;
                var P = b2Math_27.b2Vec2.MulSV(impulse, this.m_ay, b2WheelJoint.SolveVelocityConstraints_s_P);
                var LA = impulse * this.m_sAy;
                var LB = impulse * this.m_sBy;
                vA.SelfMulSub(mA, P);
                wA -= iA * LA;
                vB.SelfMulAdd(mB, P);
                wB += iB * LB;
            }
            data.velocities[this.m_indexA].w = wA;
            data.velocities[this.m_indexB].w = wB;
        };
        b2WheelJoint.prototype.SolvePositionConstraints = function (data) {
            var cA = data.positions[this.m_indexA].c;
            var aA = data.positions[this.m_indexA].a;
            var cB = data.positions[this.m_indexB].c;
            var aB = data.positions[this.m_indexB].a;
            var qA = this.m_qA.SetAngle(aA), qB = this.m_qB.SetAngle(aB);
            b2Math_27.b2Vec2.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var rA = b2Math_27.b2Rot.MulRV(qA, this.m_lalcA, this.m_rA);
            b2Math_27.b2Vec2.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var rB = b2Math_27.b2Rot.MulRV(qB, this.m_lalcB, this.m_rB);
            var d = b2Math_27.b2Vec2.AddVV(b2Math_27.b2Vec2.SubVV(cB, cA, b2Math_27.b2Vec2.s_t0), b2Math_27.b2Vec2.SubVV(rB, rA, b2Math_27.b2Vec2.s_t1), b2WheelJoint.SolvePositionConstraints_s_d);
            var ay = b2Math_27.b2Rot.MulRV(qA, this.m_localYAxisA, this.m_ay);
            var sAy = b2Math_27.b2Vec2.CrossVV(b2Math_27.b2Vec2.AddVV(d, rA, b2Math_27.b2Vec2.s_t0), ay);
            var sBy = b2Math_27.b2Vec2.CrossVV(rB, ay);
            var C = b2Math_27.b2Vec2.DotVV(d, this.m_ay);
            var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
            var impulse;
            if (k !== 0) {
                impulse = -C / k;
            }
            else {
                impulse = 0;
            }
            var P = b2Math_27.b2Vec2.MulSV(impulse, ay, b2WheelJoint.SolvePositionConstraints_s_P);
            var LA = impulse * sAy;
            var LB = impulse * sBy;
            cA.SelfMulSub(this.m_invMassA, P);
            aA -= this.m_invIA * LA;
            cB.SelfMulAdd(this.m_invMassB, P);
            aB += this.m_invIB * LB;
            data.positions[this.m_indexA].a = aA;
            data.positions[this.m_indexB].a = aB;
            return b2Math_27.b2Abs(C) <= b2Settings_28.b2_linearSlop;
        };
        b2WheelJoint.prototype.GetDefinition = function (def) {
            return def;
        };
        b2WheelJoint.prototype.GetAnchorA = function (out) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, out);
        };
        b2WheelJoint.prototype.GetAnchorB = function (out) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, out);
        };
        b2WheelJoint.prototype.GetReactionForce = function (inv_dt, out) {
            out.x = inv_dt * (this.m_impulse * this.m_ay.x + this.m_springImpulse * this.m_ax.x);
            out.y = inv_dt * (this.m_impulse * this.m_ay.y + this.m_springImpulse * this.m_ax.y);
            return out;
        };
        b2WheelJoint.prototype.GetReactionTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        b2WheelJoint.prototype.GetLocalAnchorA = function () { return this.m_localAnchorA; };
        b2WheelJoint.prototype.GetLocalAnchorB = function () { return this.m_localAnchorB; };
        b2WheelJoint.prototype.GetLocalAxisA = function () { return this.m_localXAxisA; };
        b2WheelJoint.prototype.GetJointTranslation = function () {
            return this.GetPrismaticJointTranslation();
        };
        b2WheelJoint.prototype.GetJointSpeed = function () {
            return this.GetRevoluteJointSpeed();
        };
        b2WheelJoint.prototype.GetPrismaticJointTranslation = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            var pA = bA.GetWorldPoint(this.m_localAnchorA, new b2Math_27.b2Vec2());
            var pB = bB.GetWorldPoint(this.m_localAnchorB, new b2Math_27.b2Vec2());
            var d = b2Math_27.b2Vec2.SubVV(pB, pA, new b2Math_27.b2Vec2());
            var axis = bA.GetWorldVector(this.m_localXAxisA, new b2Math_27.b2Vec2());
            var translation = b2Math_27.b2Vec2.DotVV(d, axis);
            return translation;
        };
        b2WheelJoint.prototype.GetPrismaticJointSpeed = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            b2Math_27.b2Vec2.SubVV(this.m_localAnchorA, bA.m_sweep.localCenter, this.m_lalcA);
            var rA = b2Math_27.b2Rot.MulRV(bA.m_xf.q, this.m_lalcA, this.m_rA);
            b2Math_27.b2Vec2.SubVV(this.m_localAnchorB, bB.m_sweep.localCenter, this.m_lalcB);
            var rB = b2Math_27.b2Rot.MulRV(bB.m_xf.q, this.m_lalcB, this.m_rB);
            var pA = b2Math_27.b2Vec2.AddVV(bA.m_sweep.c, rA, b2Math_27.b2Vec2.s_t0);
            var pB = b2Math_27.b2Vec2.AddVV(bB.m_sweep.c, rB, b2Math_27.b2Vec2.s_t1);
            var d = b2Math_27.b2Vec2.SubVV(pB, pA, b2Math_27.b2Vec2.s_t2);
            var axis = bA.GetWorldVector(this.m_localXAxisA, new b2Math_27.b2Vec2());
            var vA = bA.m_linearVelocity;
            var vB = bB.m_linearVelocity;
            var wA = bA.m_angularVelocity;
            var wB = bB.m_angularVelocity;
            var speed = b2Math_27.b2Vec2.DotVV(d, b2Math_27.b2Vec2.CrossSV(wA, axis, b2Math_27.b2Vec2.s_t0)) +
                b2Math_27.b2Vec2.DotVV(axis, b2Math_27.b2Vec2.SubVV(b2Math_27.b2Vec2.AddVCrossSV(vB, wB, rB, b2Math_27.b2Vec2.s_t0), b2Math_27.b2Vec2.AddVCrossSV(vA, wA, rA, b2Math_27.b2Vec2.s_t1), b2Math_27.b2Vec2.s_t0));
            return speed;
        };
        b2WheelJoint.prototype.GetRevoluteJointAngle = function () {
            return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a;
        };
        b2WheelJoint.prototype.GetRevoluteJointSpeed = function () {
            var wA = this.m_bodyA.m_angularVelocity;
            var wB = this.m_bodyB.m_angularVelocity;
            return wB - wA;
        };
        b2WheelJoint.prototype.IsMotorEnabled = function () {
            return this.m_enableMotor;
        };
        b2WheelJoint.prototype.EnableMotor = function (flag) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableMotor = flag;
        };
        b2WheelJoint.prototype.SetMotorSpeed = function (speed) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = speed;
        };
        b2WheelJoint.prototype.SetMaxMotorTorque = function (force) {
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_maxMotorTorque = force;
        };
        b2WheelJoint.prototype.GetMotorTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        b2WheelJoint.prototype.Dump = function (log) {
            var indexA = this.m_bodyA.m_islandIndex;
            var indexB = this.m_bodyB.m_islandIndex;
            log("  const jd: b2WheelJointDef = new b2WheelJointDef();\n");
            log("  jd.bodyA = bodies[%d];\n", indexA);
            log("  jd.bodyB = bodies[%d];\n", indexB);
            log("  jd.collideConnected = %s;\n", (this.m_collideConnected) ? ("true") : ("false"));
            log("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y);
            log("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y);
            log("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y);
            log("  jd.enableMotor = %s;\n", (this.m_enableMotor) ? ("true") : ("false"));
            log("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed);
            log("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque);
            log("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz);
            log("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio);
            log("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
        };
        b2WheelJoint.InitVelocityConstraints_s_d = new b2Math_27.b2Vec2();
        b2WheelJoint.InitVelocityConstraints_s_P = new b2Math_27.b2Vec2();
        b2WheelJoint.SolveVelocityConstraints_s_P = new b2Math_27.b2Vec2();
        b2WheelJoint.SolvePositionConstraints_s_d = new b2Math_27.b2Vec2();
        b2WheelJoint.SolvePositionConstraints_s_P = new b2Math_27.b2Vec2();
        return b2WheelJoint;
    }(b2Joint_12.b2Joint));
    exports.b2WheelJoint = b2WheelJoint;
});
define("Dynamics/Joints/b2JointFactory", ["require", "exports", "Dynamics/Joints/b2Joint", "Dynamics/Joints/b2AreaJoint", "Dynamics/Joints/b2DistanceJoint", "Dynamics/Joints/b2FrictionJoint", "Dynamics/Joints/b2GearJoint", "Dynamics/Joints/b2MotorJoint", "Dynamics/Joints/b2MouseJoint", "Dynamics/Joints/b2PrismaticJoint", "Dynamics/Joints/b2PulleyJoint", "Dynamics/Joints/b2RevoluteJoint", "Dynamics/Joints/b2RopeJoint", "Dynamics/Joints/b2WeldJoint", "Dynamics/Joints/b2WheelJoint"], function (require, exports, b2Joint_13, b2AreaJoint_1, b2DistanceJoint_2, b2FrictionJoint_1, b2GearJoint_1, b2MotorJoint_1, b2MouseJoint_1, b2PrismaticJoint_1, b2PulleyJoint_1, b2RevoluteJoint_1, b2RopeJoint_1, b2WeldJoint_1, b2WheelJoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2JointFactory = (function () {
        function b2JointFactory() {
        }
        b2JointFactory.Create = function (def, allocator) {
            switch (def.type) {
                case b2Joint_13.b2JointType.e_distanceJoint: return new b2DistanceJoint_2.b2DistanceJoint(def);
                case b2Joint_13.b2JointType.e_mouseJoint: return new b2MouseJoint_1.b2MouseJoint(def);
                case b2Joint_13.b2JointType.e_prismaticJoint: return new b2PrismaticJoint_1.b2PrismaticJoint(def);
                case b2Joint_13.b2JointType.e_revoluteJoint: return new b2RevoluteJoint_1.b2RevoluteJoint(def);
                case b2Joint_13.b2JointType.e_pulleyJoint: return new b2PulleyJoint_1.b2PulleyJoint(def);
                case b2Joint_13.b2JointType.e_gearJoint: return new b2GearJoint_1.b2GearJoint(def);
                case b2Joint_13.b2JointType.e_wheelJoint: return new b2WheelJoint_1.b2WheelJoint(def);
                case b2Joint_13.b2JointType.e_weldJoint: return new b2WeldJoint_1.b2WeldJoint(def);
                case b2Joint_13.b2JointType.e_frictionJoint: return new b2FrictionJoint_1.b2FrictionJoint(def);
                case b2Joint_13.b2JointType.e_ropeJoint: return new b2RopeJoint_1.b2RopeJoint(def);
                case b2Joint_13.b2JointType.e_motorJoint: return new b2MotorJoint_1.b2MotorJoint(def);
                case b2Joint_13.b2JointType.e_areaJoint: return new b2AreaJoint_1.b2AreaJoint(def);
            }
            throw new Error();
        };
        b2JointFactory.Destroy = function (joint, allocator) {
        };
        return b2JointFactory;
    }());
    exports.b2JointFactory = b2JointFactory;
});
define("Dynamics/Contacts/b2CircleContact", ["require", "exports", "Collision/b2CollideCircle", "Dynamics/Contacts/b2Contact"], function (require, exports, b2CollideCircle_1, b2Contact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2CircleContact = (function (_super) {
        __extends(b2CircleContact, _super);
        function b2CircleContact() {
            return _super.call(this) || this;
        }
        b2CircleContact.Create = function (allocator) {
            return new b2CircleContact();
        };
        b2CircleContact.Destroy = function (contact, allocator) {
        };
        b2CircleContact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            _super.prototype.Reset.call(this, fixtureA, indexA, fixtureB, indexB);
        };
        b2CircleContact.prototype.Evaluate = function (manifold, xfA, xfB) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            b2CollideCircle_1.b2CollideCircles(manifold, shapeA, xfA, shapeB, xfB);
        };
        return b2CircleContact;
    }(b2Contact_1.b2Contact));
    exports.b2CircleContact = b2CircleContact;
});
define("Dynamics/Contacts/b2PolygonContact", ["require", "exports", "Collision/b2CollidePolygon", "Dynamics/Contacts/b2Contact"], function (require, exports, b2CollidePolygon_1, b2Contact_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2PolygonContact = (function (_super) {
        __extends(b2PolygonContact, _super);
        function b2PolygonContact() {
            return _super.call(this) || this;
        }
        b2PolygonContact.Create = function (allocator) {
            return new b2PolygonContact();
        };
        b2PolygonContact.Destroy = function (contact, allocator) {
        };
        b2PolygonContact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            _super.prototype.Reset.call(this, fixtureA, indexA, fixtureB, indexB);
        };
        b2PolygonContact.prototype.Evaluate = function (manifold, xfA, xfB) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            b2CollidePolygon_1.b2CollidePolygons(manifold, shapeA, xfA, shapeB, xfB);
        };
        return b2PolygonContact;
    }(b2Contact_2.b2Contact));
    exports.b2PolygonContact = b2PolygonContact;
});
define("Dynamics/Contacts/b2PolygonAndCircleContact", ["require", "exports", "Collision/b2CollideCircle", "Dynamics/Contacts/b2Contact"], function (require, exports, b2CollideCircle_2, b2Contact_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2PolygonAndCircleContact = (function (_super) {
        __extends(b2PolygonAndCircleContact, _super);
        function b2PolygonAndCircleContact() {
            return _super.call(this) || this;
        }
        b2PolygonAndCircleContact.Create = function (allocator) {
            return new b2PolygonAndCircleContact();
        };
        b2PolygonAndCircleContact.Destroy = function (contact, allocator) {
        };
        b2PolygonAndCircleContact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            _super.prototype.Reset.call(this, fixtureA, indexA, fixtureB, indexB);
        };
        b2PolygonAndCircleContact.prototype.Evaluate = function (manifold, xfA, xfB) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            b2CollideCircle_2.b2CollidePolygonAndCircle(manifold, shapeA, xfA, shapeB, xfB);
        };
        return b2PolygonAndCircleContact;
    }(b2Contact_3.b2Contact));
    exports.b2PolygonAndCircleContact = b2PolygonAndCircleContact;
});
define("Dynamics/Contacts/b2EdgeAndCircleContact", ["require", "exports", "Collision/b2CollideEdge", "Dynamics/Contacts/b2Contact"], function (require, exports, b2CollideEdge_1, b2Contact_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2EdgeAndCircleContact = (function (_super) {
        __extends(b2EdgeAndCircleContact, _super);
        function b2EdgeAndCircleContact() {
            return _super.call(this) || this;
        }
        b2EdgeAndCircleContact.Create = function (allocator) {
            return new b2EdgeAndCircleContact();
        };
        b2EdgeAndCircleContact.Destroy = function (contact, allocator) {
        };
        b2EdgeAndCircleContact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            _super.prototype.Reset.call(this, fixtureA, indexA, fixtureB, indexB);
        };
        b2EdgeAndCircleContact.prototype.Evaluate = function (manifold, xfA, xfB) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            b2CollideEdge_1.b2CollideEdgeAndCircle(manifold, shapeA, xfA, shapeB, xfB);
        };
        return b2EdgeAndCircleContact;
    }(b2Contact_4.b2Contact));
    exports.b2EdgeAndCircleContact = b2EdgeAndCircleContact;
});
define("Dynamics/Contacts/b2EdgeAndPolygonContact", ["require", "exports", "Collision/b2CollideEdge", "Dynamics/Contacts/b2Contact"], function (require, exports, b2CollideEdge_2, b2Contact_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2EdgeAndPolygonContact = (function (_super) {
        __extends(b2EdgeAndPolygonContact, _super);
        function b2EdgeAndPolygonContact() {
            return _super.call(this) || this;
        }
        b2EdgeAndPolygonContact.Create = function (allocator) {
            return new b2EdgeAndPolygonContact();
        };
        b2EdgeAndPolygonContact.Destroy = function (contact, allocator) {
        };
        b2EdgeAndPolygonContact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            _super.prototype.Reset.call(this, fixtureA, indexA, fixtureB, indexB);
        };
        b2EdgeAndPolygonContact.prototype.Evaluate = function (manifold, xfA, xfB) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            b2CollideEdge_2.b2CollideEdgeAndPolygon(manifold, shapeA, xfA, shapeB, xfB);
        };
        return b2EdgeAndPolygonContact;
    }(b2Contact_5.b2Contact));
    exports.b2EdgeAndPolygonContact = b2EdgeAndPolygonContact;
});
define("Dynamics/Contacts/b2ChainAndCircleContact", ["require", "exports", "Collision/b2CollideEdge", "Collision/Shapes/b2EdgeShape", "Dynamics/Contacts/b2Contact"], function (require, exports, b2CollideEdge_3, b2EdgeShape_2, b2Contact_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ChainAndCircleContact = (function (_super) {
        __extends(b2ChainAndCircleContact, _super);
        function b2ChainAndCircleContact() {
            return _super.call(this) || this;
        }
        b2ChainAndCircleContact.Create = function (allocator) {
            return new b2ChainAndCircleContact();
        };
        b2ChainAndCircleContact.Destroy = function (contact, allocator) {
        };
        b2ChainAndCircleContact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            _super.prototype.Reset.call(this, fixtureA, indexA, fixtureB, indexB);
        };
        b2ChainAndCircleContact.prototype.Evaluate = function (manifold, xfA, xfB) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            var chain = shapeA;
            var edge = b2ChainAndCircleContact.Evaluate_s_edge;
            chain.GetChildEdge(edge, this.m_indexA);
            b2CollideEdge_3.b2CollideEdgeAndCircle(manifold, edge, xfA, shapeB, xfB);
        };
        b2ChainAndCircleContact.Evaluate_s_edge = new b2EdgeShape_2.b2EdgeShape();
        return b2ChainAndCircleContact;
    }(b2Contact_6.b2Contact));
    exports.b2ChainAndCircleContact = b2ChainAndCircleContact;
});
define("Dynamics/Contacts/b2ChainAndPolygonContact", ["require", "exports", "Collision/b2CollideEdge", "Collision/Shapes/b2EdgeShape", "Dynamics/Contacts/b2Contact"], function (require, exports, b2CollideEdge_4, b2EdgeShape_3, b2Contact_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ChainAndPolygonContact = (function (_super) {
        __extends(b2ChainAndPolygonContact, _super);
        function b2ChainAndPolygonContact() {
            return _super.call(this) || this;
        }
        b2ChainAndPolygonContact.Create = function (allocator) {
            return new b2ChainAndPolygonContact();
        };
        b2ChainAndPolygonContact.Destroy = function (contact, allocator) {
        };
        b2ChainAndPolygonContact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            _super.prototype.Reset.call(this, fixtureA, indexA, fixtureB, indexB);
        };
        b2ChainAndPolygonContact.prototype.Evaluate = function (manifold, xfA, xfB) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            var chain = shapeA;
            var edge = b2ChainAndPolygonContact.Evaluate_s_edge;
            chain.GetChildEdge(edge, this.m_indexA);
            b2CollideEdge_4.b2CollideEdgeAndPolygon(manifold, edge, xfA, shapeB, xfB);
        };
        b2ChainAndPolygonContact.Evaluate_s_edge = new b2EdgeShape_3.b2EdgeShape();
        return b2ChainAndPolygonContact;
    }(b2Contact_7.b2Contact));
    exports.b2ChainAndPolygonContact = b2ChainAndPolygonContact;
});
define("Dynamics/Contacts/b2ContactFactory", ["require", "exports", "Common/b2Settings", "Collision/Shapes/b2Shape", "Dynamics/Contacts/b2CircleContact", "Dynamics/Contacts/b2PolygonContact", "Dynamics/Contacts/b2PolygonAndCircleContact", "Dynamics/Contacts/b2EdgeAndCircleContact", "Dynamics/Contacts/b2EdgeAndPolygonContact", "Dynamics/Contacts/b2ChainAndCircleContact", "Dynamics/Contacts/b2ChainAndPolygonContact"], function (require, exports, b2Settings_29, b2Shape_6, b2CircleContact_1, b2PolygonContact_1, b2PolygonAndCircleContact_1, b2EdgeAndCircleContact_1, b2EdgeAndPolygonContact_1, b2ChainAndCircleContact_1, b2ChainAndPolygonContact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ContactRegister = (function () {
        function b2ContactRegister() {
            this.createFcn = null;
            this.destroyFcn = null;
            this.primary = false;
        }
        return b2ContactRegister;
    }());
    exports.b2ContactRegister = b2ContactRegister;
    var b2ContactFactory = (function () {
        function b2ContactFactory(allocator) {
            this.m_allocator = null;
            this.m_allocator = allocator;
            this.InitializeRegisters();
        }
        b2ContactFactory.prototype.AddType = function (createFcn, destroyFcn, type1, type2) {
            var _this = this;
            var pool = b2Settings_29.b2MakeArray(256, function (i) { return createFcn(_this.m_allocator); });
            function poolCreateFcn(allocator) {
                return pool.pop() || createFcn(allocator);
            }
            function poolDestroyFcn(contact, allocator) {
                pool.push(contact);
            }
            this.m_registers[type1][type2].createFcn = poolCreateFcn;
            this.m_registers[type1][type2].destroyFcn = poolDestroyFcn;
            this.m_registers[type1][type2].primary = true;
            if (type1 !== type2) {
                this.m_registers[type2][type1].createFcn = poolCreateFcn;
                this.m_registers[type2][type1].destroyFcn = poolDestroyFcn;
                this.m_registers[type2][type1].primary = false;
            }
        };
        b2ContactFactory.prototype.InitializeRegisters = function () {
            this.m_registers = [];
            for (var i = 0; i < b2Shape_6.b2ShapeType.e_shapeTypeCount; i++) {
                this.m_registers[i] = [];
                for (var j = 0; j < b2Shape_6.b2ShapeType.e_shapeTypeCount; j++) {
                    this.m_registers[i][j] = new b2ContactRegister();
                }
            }
            this.AddType(b2CircleContact_1.b2CircleContact.Create, b2CircleContact_1.b2CircleContact.Destroy, b2Shape_6.b2ShapeType.e_circleShape, b2Shape_6.b2ShapeType.e_circleShape);
            this.AddType(b2PolygonAndCircleContact_1.b2PolygonAndCircleContact.Create, b2PolygonAndCircleContact_1.b2PolygonAndCircleContact.Destroy, b2Shape_6.b2ShapeType.e_polygonShape, b2Shape_6.b2ShapeType.e_circleShape);
            this.AddType(b2PolygonContact_1.b2PolygonContact.Create, b2PolygonContact_1.b2PolygonContact.Destroy, b2Shape_6.b2ShapeType.e_polygonShape, b2Shape_6.b2ShapeType.e_polygonShape);
            this.AddType(b2EdgeAndCircleContact_1.b2EdgeAndCircleContact.Create, b2EdgeAndCircleContact_1.b2EdgeAndCircleContact.Destroy, b2Shape_6.b2ShapeType.e_edgeShape, b2Shape_6.b2ShapeType.e_circleShape);
            this.AddType(b2EdgeAndPolygonContact_1.b2EdgeAndPolygonContact.Create, b2EdgeAndPolygonContact_1.b2EdgeAndPolygonContact.Destroy, b2Shape_6.b2ShapeType.e_edgeShape, b2Shape_6.b2ShapeType.e_polygonShape);
            this.AddType(b2ChainAndCircleContact_1.b2ChainAndCircleContact.Create, b2ChainAndCircleContact_1.b2ChainAndCircleContact.Destroy, b2Shape_6.b2ShapeType.e_chainShape, b2Shape_6.b2ShapeType.e_circleShape);
            this.AddType(b2ChainAndPolygonContact_1.b2ChainAndPolygonContact.Create, b2ChainAndPolygonContact_1.b2ChainAndPolygonContact.Destroy, b2Shape_6.b2ShapeType.e_chainShape, b2Shape_6.b2ShapeType.e_polygonShape);
        };
        b2ContactFactory.prototype.Create = function (fixtureA, indexA, fixtureB, indexB) {
            var type1 = fixtureA.GetType();
            var type2 = fixtureB.GetType();
            var reg = this.m_registers[type1][type2];
            if (reg.createFcn) {
                var c = reg.createFcn(this.m_allocator);
                if (reg.primary) {
                    c.Reset(fixtureA, indexA, fixtureB, indexB);
                }
                else {
                    c.Reset(fixtureB, indexB, fixtureA, indexA);
                }
                return c;
            }
            else {
                return null;
            }
        };
        b2ContactFactory.prototype.Destroy = function (contact) {
            var fixtureA = contact.m_fixtureA;
            var fixtureB = contact.m_fixtureB;
            if (contact.m_manifold.pointCount > 0 &&
                !fixtureA.IsSensor() &&
                !fixtureB.IsSensor()) {
                fixtureA.GetBody().SetAwake(true);
                fixtureB.GetBody().SetAwake(true);
            }
            var typeA = fixtureA.GetType();
            var typeB = fixtureB.GetType();
            var reg = this.m_registers[typeA][typeB];
            if (reg.destroyFcn) {
                reg.destroyFcn(contact, this.m_allocator);
            }
        };
        return b2ContactFactory;
    }());
    exports.b2ContactFactory = b2ContactFactory;
});
define("Dynamics/b2ContactManager", ["require", "exports", "Collision/b2BroadPhase", "Collision/b2Collision", "Dynamics/Contacts/b2ContactFactory", "Dynamics/b2Body", "Dynamics/b2WorldCallbacks"], function (require, exports, b2BroadPhase_1, b2Collision_7, b2ContactFactory_1, b2Body_1, b2WorldCallbacks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ContactManager = (function () {
        function b2ContactManager() {
            this.m_broadPhase = new b2BroadPhase_1.b2BroadPhase();
            this.m_contactList = null;
            this.m_contactCount = 0;
            this.m_contactFilter = b2WorldCallbacks_1.b2ContactFilter.b2_defaultFilter;
            this.m_contactListener = b2WorldCallbacks_1.b2ContactListener.b2_defaultListener;
            this.m_allocator = null;
            this.m_contactFactory = new b2ContactFactory_1.b2ContactFactory(this.m_allocator);
        }
        b2ContactManager.prototype.AddPair = function (proxyA, proxyB) {
            var fixtureA = proxyA.fixture;
            var fixtureB = proxyB.fixture;
            var indexA = proxyA.childIndex;
            var indexB = proxyB.childIndex;
            var bodyA = fixtureA.GetBody();
            var bodyB = fixtureB.GetBody();
            if (bodyA === bodyB) {
                return;
            }
            var edge = bodyB.GetContactList();
            while (edge) {
                if (edge.other === bodyA) {
                    var fA = edge.contact.GetFixtureA();
                    var fB = edge.contact.GetFixtureB();
                    var iA = edge.contact.GetChildIndexA();
                    var iB = edge.contact.GetChildIndexB();
                    if (fA === fixtureA && fB === fixtureB && iA === indexA && iB === indexB) {
                        return;
                    }
                    if (fA === fixtureB && fB === fixtureA && iA === indexB && iB === indexA) {
                        return;
                    }
                }
                edge = edge.next;
            }
            if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(fixtureA, fixtureB)) {
                return;
            }
            var c = this.m_contactFactory.Create(fixtureA, indexA, fixtureB, indexB);
            if (c === null) {
                return;
            }
            fixtureA = c.GetFixtureA();
            fixtureB = c.GetFixtureB();
            indexA = c.GetChildIndexA();
            indexB = c.GetChildIndexB();
            bodyA = fixtureA.m_body;
            bodyB = fixtureB.m_body;
            c.m_prev = null;
            c.m_next = this.m_contactList;
            if (this.m_contactList !== null) {
                this.m_contactList.m_prev = c;
            }
            this.m_contactList = c;
            c.m_nodeA.contact = c;
            c.m_nodeA.other = bodyB;
            c.m_nodeA.prev = null;
            c.m_nodeA.next = bodyA.m_contactList;
            if (bodyA.m_contactList !== null) {
                bodyA.m_contactList.prev = c.m_nodeA;
            }
            bodyA.m_contactList = c.m_nodeA;
            c.m_nodeB.contact = c;
            c.m_nodeB.other = bodyA;
            c.m_nodeB.prev = null;
            c.m_nodeB.next = bodyB.m_contactList;
            if (bodyB.m_contactList !== null) {
                bodyB.m_contactList.prev = c.m_nodeB;
            }
            bodyB.m_contactList = c.m_nodeB;
            if (!fixtureA.IsSensor() && !fixtureB.IsSensor()) {
                bodyA.SetAwake(true);
                bodyB.SetAwake(true);
            }
            ++this.m_contactCount;
        };
        b2ContactManager.prototype.FindNewContacts = function () {
            var _this = this;
            this.m_broadPhase.UpdatePairs(function (proxyA, proxyB) {
                _this.AddPair(proxyA, proxyB);
            });
        };
        b2ContactManager.prototype.Destroy = function (c) {
            var fixtureA = c.GetFixtureA();
            var fixtureB = c.GetFixtureB();
            var bodyA = fixtureA.GetBody();
            var bodyB = fixtureB.GetBody();
            if (this.m_contactListener && c.IsTouching()) {
                this.m_contactListener.EndContact(c);
            }
            if (c.m_prev) {
                c.m_prev.m_next = c.m_next;
            }
            if (c.m_next) {
                c.m_next.m_prev = c.m_prev;
            }
            if (c === this.m_contactList) {
                this.m_contactList = c.m_next;
            }
            if (c.m_nodeA.prev) {
                c.m_nodeA.prev.next = c.m_nodeA.next;
            }
            if (c.m_nodeA.next) {
                c.m_nodeA.next.prev = c.m_nodeA.prev;
            }
            if (c.m_nodeA === bodyA.m_contactList) {
                bodyA.m_contactList = c.m_nodeA.next;
            }
            if (c.m_nodeB.prev) {
                c.m_nodeB.prev.next = c.m_nodeB.next;
            }
            if (c.m_nodeB.next) {
                c.m_nodeB.next.prev = c.m_nodeB.prev;
            }
            if (c.m_nodeB === bodyB.m_contactList) {
                bodyB.m_contactList = c.m_nodeB.next;
            }
            this.m_contactFactory.Destroy(c);
            --this.m_contactCount;
        };
        b2ContactManager.prototype.Collide = function () {
            var c = this.m_contactList;
            while (c) {
                var fixtureA = c.GetFixtureA();
                var fixtureB = c.GetFixtureB();
                var indexA = c.GetChildIndexA();
                var indexB = c.GetChildIndexB();
                var bodyA = fixtureA.GetBody();
                var bodyB = fixtureB.GetBody();
                if (c.m_filterFlag) {
                    if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(fixtureA, fixtureB)) {
                        var cNuke = c;
                        c = cNuke.m_next;
                        this.Destroy(cNuke);
                        continue;
                    }
                    c.m_filterFlag = false;
                }
                var activeA = bodyA.IsAwake() && bodyA.m_type !== b2Body_1.b2BodyType.b2_staticBody;
                var activeB = bodyB.IsAwake() && bodyB.m_type !== b2Body_1.b2BodyType.b2_staticBody;
                if (!activeA && !activeB) {
                    c = c.m_next;
                    continue;
                }
                var proxyA = fixtureA.m_proxies[indexA].treeNode;
                var proxyB = fixtureB.m_proxies[indexB].treeNode;
                var overlap = b2Collision_7.b2TestOverlapAABB(proxyA.aabb, proxyB.aabb);
                if (!overlap) {
                    var cNuke = c;
                    c = cNuke.m_next;
                    this.Destroy(cNuke);
                    continue;
                }
                c.Update(this.m_contactListener);
                c = c.m_next;
            }
        };
        return b2ContactManager;
    }());
    exports.b2ContactManager = b2ContactManager;
});
define("Dynamics/Contacts/b2ContactSolver", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/b2Collision", "Collision/b2Collision", "Dynamics/b2TimeStep"], function (require, exports, b2Settings_30, b2Math_28, b2Collision_8, b2Collision_9, b2TimeStep_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2VelocityConstraintPoint = (function () {
        function b2VelocityConstraintPoint() {
            this.rA = new b2Math_28.b2Vec2();
            this.rB = new b2Math_28.b2Vec2();
            this.normalImpulse = 0;
            this.tangentImpulse = 0;
            this.normalMass = 0;
            this.tangentMass = 0;
            this.velocityBias = 0;
        }
        b2VelocityConstraintPoint.MakeArray = function (length) {
            return b2Settings_30.b2MakeArray(length, function (i) { return new b2VelocityConstraintPoint(); });
        };
        return b2VelocityConstraintPoint;
    }());
    exports.b2VelocityConstraintPoint = b2VelocityConstraintPoint;
    var b2ContactVelocityConstraint = (function () {
        function b2ContactVelocityConstraint() {
            this.points = b2VelocityConstraintPoint.MakeArray(b2Settings_30.b2_maxManifoldPoints);
            this.normal = new b2Math_28.b2Vec2();
            this.tangent = new b2Math_28.b2Vec2();
            this.normalMass = new b2Math_28.b2Mat22();
            this.K = new b2Math_28.b2Mat22();
            this.indexA = 0;
            this.indexB = 0;
            this.invMassA = 0;
            this.invMassB = 0;
            this.invIA = 0;
            this.invIB = 0;
            this.friction = 0;
            this.restitution = 0;
            this.tangentSpeed = 0;
            this.pointCount = 0;
            this.contactIndex = 0;
        }
        b2ContactVelocityConstraint.MakeArray = function (length) {
            return b2Settings_30.b2MakeArray(length, function (i) { return new b2ContactVelocityConstraint(); });
        };
        return b2ContactVelocityConstraint;
    }());
    exports.b2ContactVelocityConstraint = b2ContactVelocityConstraint;
    var b2ContactPositionConstraint = (function () {
        function b2ContactPositionConstraint() {
            this.localPoints = b2Math_28.b2Vec2.MakeArray(b2Settings_30.b2_maxManifoldPoints);
            this.localNormal = new b2Math_28.b2Vec2();
            this.localPoint = new b2Math_28.b2Vec2();
            this.indexA = 0;
            this.indexB = 0;
            this.invMassA = 0;
            this.invMassB = 0;
            this.localCenterA = new b2Math_28.b2Vec2();
            this.localCenterB = new b2Math_28.b2Vec2();
            this.invIA = 0;
            this.invIB = 0;
            this.type = b2Collision_9.b2ManifoldType.e_unknown;
            this.radiusA = 0;
            this.radiusB = 0;
            this.pointCount = 0;
        }
        b2ContactPositionConstraint.MakeArray = function (length) {
            return b2Settings_30.b2MakeArray(length, function (i) { return new b2ContactPositionConstraint(); });
        };
        return b2ContactPositionConstraint;
    }());
    exports.b2ContactPositionConstraint = b2ContactPositionConstraint;
    var b2ContactSolverDef = (function () {
        function b2ContactSolverDef() {
            this.step = new b2TimeStep_1.b2TimeStep();
            this.count = 0;
            this.allocator = null;
        }
        return b2ContactSolverDef;
    }());
    exports.b2ContactSolverDef = b2ContactSolverDef;
    var b2PositionSolverManifold = (function () {
        function b2PositionSolverManifold() {
            this.normal = new b2Math_28.b2Vec2();
            this.point = new b2Math_28.b2Vec2();
            this.separation = 0;
        }
        b2PositionSolverManifold.prototype.Initialize = function (pc, xfA, xfB, index) {
            var pointA = b2PositionSolverManifold.Initialize_s_pointA;
            var pointB = b2PositionSolverManifold.Initialize_s_pointB;
            var planePoint = b2PositionSolverManifold.Initialize_s_planePoint;
            var clipPoint = b2PositionSolverManifold.Initialize_s_clipPoint;
            switch (pc.type) {
                case b2Collision_9.b2ManifoldType.e_circles: {
                    b2Math_28.b2Transform.MulXV(xfA, pc.localPoint, pointA);
                    b2Math_28.b2Transform.MulXV(xfB, pc.localPoints[0], pointB);
                    b2Math_28.b2Vec2.SubVV(pointB, pointA, this.normal).SelfNormalize();
                    b2Math_28.b2Vec2.MidVV(pointA, pointB, this.point);
                    this.separation = b2Math_28.b2Vec2.DotVV(b2Math_28.b2Vec2.SubVV(pointB, pointA, b2Math_28.b2Vec2.s_t0), this.normal) - pc.radiusA - pc.radiusB;
                    break;
                }
                case b2Collision_9.b2ManifoldType.e_faceA: {
                    b2Math_28.b2Rot.MulRV(xfA.q, pc.localNormal, this.normal);
                    b2Math_28.b2Transform.MulXV(xfA, pc.localPoint, planePoint);
                    b2Math_28.b2Transform.MulXV(xfB, pc.localPoints[index], clipPoint);
                    this.separation = b2Math_28.b2Vec2.DotVV(b2Math_28.b2Vec2.SubVV(clipPoint, planePoint, b2Math_28.b2Vec2.s_t0), this.normal) - pc.radiusA - pc.radiusB;
                    this.point.Copy(clipPoint);
                    break;
                }
                case b2Collision_9.b2ManifoldType.e_faceB: {
                    b2Math_28.b2Rot.MulRV(xfB.q, pc.localNormal, this.normal);
                    b2Math_28.b2Transform.MulXV(xfB, pc.localPoint, planePoint);
                    b2Math_28.b2Transform.MulXV(xfA, pc.localPoints[index], clipPoint);
                    this.separation = b2Math_28.b2Vec2.DotVV(b2Math_28.b2Vec2.SubVV(clipPoint, planePoint, b2Math_28.b2Vec2.s_t0), this.normal) - pc.radiusA - pc.radiusB;
                    this.point.Copy(clipPoint);
                    this.normal.SelfNeg();
                    break;
                }
            }
        };
        b2PositionSolverManifold.Initialize_s_pointA = new b2Math_28.b2Vec2();
        b2PositionSolverManifold.Initialize_s_pointB = new b2Math_28.b2Vec2();
        b2PositionSolverManifold.Initialize_s_planePoint = new b2Math_28.b2Vec2();
        b2PositionSolverManifold.Initialize_s_clipPoint = new b2Math_28.b2Vec2();
        return b2PositionSolverManifold;
    }());
    exports.b2PositionSolverManifold = b2PositionSolverManifold;
    var b2ContactSolver = (function () {
        function b2ContactSolver() {
            this.m_step = new b2TimeStep_1.b2TimeStep();
            this.m_allocator = null;
            this.m_positionConstraints = b2ContactPositionConstraint.MakeArray(1024);
            this.m_velocityConstraints = b2ContactVelocityConstraint.MakeArray(1024);
            this.m_count = 0;
        }
        b2ContactSolver.prototype.Initialize = function (def) {
            this.m_step.Copy(def.step);
            this.m_allocator = def.allocator;
            this.m_count = def.count;
            if (this.m_positionConstraints.length < this.m_count) {
                var new_length = b2Math_28.b2Max(this.m_positionConstraints.length * 2, this.m_count);
                while (this.m_positionConstraints.length < new_length) {
                    this.m_positionConstraints[this.m_positionConstraints.length] = new b2ContactPositionConstraint();
                }
            }
            if (this.m_velocityConstraints.length < this.m_count) {
                var new_length = b2Math_28.b2Max(this.m_velocityConstraints.length * 2, this.m_count);
                while (this.m_velocityConstraints.length < new_length) {
                    this.m_velocityConstraints[this.m_velocityConstraints.length] = new b2ContactVelocityConstraint();
                }
            }
            this.m_positions = def.positions;
            this.m_velocities = def.velocities;
            this.m_contacts = def.contacts;
            for (var i = 0; i < this.m_count; ++i) {
                var contact = this.m_contacts[i];
                var fixtureA = contact.m_fixtureA;
                var fixtureB = contact.m_fixtureB;
                var shapeA = fixtureA.GetShape();
                var shapeB = fixtureB.GetShape();
                var radiusA = shapeA.m_radius;
                var radiusB = shapeB.m_radius;
                var bodyA = fixtureA.GetBody();
                var bodyB = fixtureB.GetBody();
                var manifold = contact.GetManifold();
                var pointCount = manifold.pointCount;
                var vc = this.m_velocityConstraints[i];
                vc.friction = contact.m_friction;
                vc.restitution = contact.m_restitution;
                vc.tangentSpeed = contact.m_tangentSpeed;
                vc.indexA = bodyA.m_islandIndex;
                vc.indexB = bodyB.m_islandIndex;
                vc.invMassA = bodyA.m_invMass;
                vc.invMassB = bodyB.m_invMass;
                vc.invIA = bodyA.m_invI;
                vc.invIB = bodyB.m_invI;
                vc.contactIndex = i;
                vc.pointCount = pointCount;
                vc.K.SetZero();
                vc.normalMass.SetZero();
                var pc = this.m_positionConstraints[i];
                pc.indexA = bodyA.m_islandIndex;
                pc.indexB = bodyB.m_islandIndex;
                pc.invMassA = bodyA.m_invMass;
                pc.invMassB = bodyB.m_invMass;
                pc.localCenterA.Copy(bodyA.m_sweep.localCenter);
                pc.localCenterB.Copy(bodyB.m_sweep.localCenter);
                pc.invIA = bodyA.m_invI;
                pc.invIB = bodyB.m_invI;
                pc.localNormal.Copy(manifold.localNormal);
                pc.localPoint.Copy(manifold.localPoint);
                pc.pointCount = pointCount;
                pc.radiusA = radiusA;
                pc.radiusB = radiusB;
                pc.type = manifold.type;
                for (var j = 0; j < pointCount; ++j) {
                    var cp = manifold.points[j];
                    var vcp = vc.points[j];
                    if (this.m_step.warmStarting) {
                        vcp.normalImpulse = this.m_step.dtRatio * cp.normalImpulse;
                        vcp.tangentImpulse = this.m_step.dtRatio * cp.tangentImpulse;
                    }
                    else {
                        vcp.normalImpulse = 0;
                        vcp.tangentImpulse = 0;
                    }
                    vcp.rA.SetZero();
                    vcp.rB.SetZero();
                    vcp.normalMass = 0;
                    vcp.tangentMass = 0;
                    vcp.velocityBias = 0;
                    pc.localPoints[j].Copy(cp.localPoint);
                }
            }
            return this;
        };
        b2ContactSolver.prototype.InitializeVelocityConstraints = function () {
            var xfA = b2ContactSolver.InitializeVelocityConstraints_s_xfA;
            var xfB = b2ContactSolver.InitializeVelocityConstraints_s_xfB;
            var worldManifold = b2ContactSolver.InitializeVelocityConstraints_s_worldManifold;
            var k_maxConditionNumber = 1000;
            for (var i = 0; i < this.m_count; ++i) {
                var vc = this.m_velocityConstraints[i];
                var pc = this.m_positionConstraints[i];
                var radiusA = pc.radiusA;
                var radiusB = pc.radiusB;
                var manifold = this.m_contacts[vc.contactIndex].GetManifold();
                var indexA = vc.indexA;
                var indexB = vc.indexB;
                var mA = vc.invMassA;
                var mB = vc.invMassB;
                var iA = vc.invIA;
                var iB = vc.invIB;
                var localCenterA = pc.localCenterA;
                var localCenterB = pc.localCenterB;
                var cA = this.m_positions[indexA].c;
                var aA = this.m_positions[indexA].a;
                var vA = this.m_velocities[indexA].v;
                var wA = this.m_velocities[indexA].w;
                var cB = this.m_positions[indexB].c;
                var aB = this.m_positions[indexB].a;
                var vB = this.m_velocities[indexB].v;
                var wB = this.m_velocities[indexB].w;
                xfA.q.SetAngle(aA);
                xfB.q.SetAngle(aB);
                b2Math_28.b2Vec2.SubVV(cA, b2Math_28.b2Rot.MulRV(xfA.q, localCenterA, b2Math_28.b2Vec2.s_t0), xfA.p);
                b2Math_28.b2Vec2.SubVV(cB, b2Math_28.b2Rot.MulRV(xfB.q, localCenterB, b2Math_28.b2Vec2.s_t0), xfB.p);
                worldManifold.Initialize(manifold, xfA, radiusA, xfB, radiusB);
                vc.normal.Copy(worldManifold.normal);
                b2Math_28.b2Vec2.CrossVOne(vc.normal, vc.tangent);
                var pointCount = vc.pointCount;
                for (var j = 0; j < pointCount; ++j) {
                    var vcp = vc.points[j];
                    b2Math_28.b2Vec2.SubVV(worldManifold.points[j], cA, vcp.rA);
                    b2Math_28.b2Vec2.SubVV(worldManifold.points[j], cB, vcp.rB);
                    var rnA = b2Math_28.b2Vec2.CrossVV(vcp.rA, vc.normal);
                    var rnB = b2Math_28.b2Vec2.CrossVV(vcp.rB, vc.normal);
                    var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                    vcp.normalMass = kNormal > 0 ? 1 / kNormal : 0;
                    var tangent = vc.tangent;
                    var rtA = b2Math_28.b2Vec2.CrossVV(vcp.rA, tangent);
                    var rtB = b2Math_28.b2Vec2.CrossVV(vcp.rB, tangent);
                    var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
                    vcp.tangentMass = kTangent > 0 ? 1 / kTangent : 0;
                    vcp.velocityBias = 0;
                    var vRel = b2Math_28.b2Vec2.DotVV(vc.normal, b2Math_28.b2Vec2.SubVV(b2Math_28.b2Vec2.AddVCrossSV(vB, wB, vcp.rB, b2Math_28.b2Vec2.s_t0), b2Math_28.b2Vec2.AddVCrossSV(vA, wA, vcp.rA, b2Math_28.b2Vec2.s_t1), b2Math_28.b2Vec2.s_t0));
                    if (vRel < (-b2Settings_30.b2_velocityThreshold)) {
                        vcp.velocityBias += (-vc.restitution * vRel);
                    }
                }
                if (vc.pointCount === 2) {
                    var vcp1 = vc.points[0];
                    var vcp2 = vc.points[1];
                    var rn1A = b2Math_28.b2Vec2.CrossVV(vcp1.rA, vc.normal);
                    var rn1B = b2Math_28.b2Vec2.CrossVV(vcp1.rB, vc.normal);
                    var rn2A = b2Math_28.b2Vec2.CrossVV(vcp2.rA, vc.normal);
                    var rn2B = b2Math_28.b2Vec2.CrossVV(vcp2.rB, vc.normal);
                    var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
                    var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
                    var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
                    if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
                        vc.K.ex.Set(k11, k12);
                        vc.K.ey.Set(k12, k22);
                        vc.K.GetInverse(vc.normalMass);
                    }
                    else {
                        vc.pointCount = 1;
                    }
                }
            }
        };
        b2ContactSolver.prototype.WarmStart = function () {
            var P = b2ContactSolver.WarmStart_s_P;
            for (var i = 0; i < this.m_count; ++i) {
                var vc = this.m_velocityConstraints[i];
                var indexA = vc.indexA;
                var indexB = vc.indexB;
                var mA = vc.invMassA;
                var iA = vc.invIA;
                var mB = vc.invMassB;
                var iB = vc.invIB;
                var pointCount = vc.pointCount;
                var vA = this.m_velocities[indexA].v;
                var wA = this.m_velocities[indexA].w;
                var vB = this.m_velocities[indexB].v;
                var wB = this.m_velocities[indexB].w;
                var normal = vc.normal;
                var tangent = vc.tangent;
                for (var j = 0; j < pointCount; ++j) {
                    var vcp = vc.points[j];
                    b2Math_28.b2Vec2.AddVV(b2Math_28.b2Vec2.MulSV(vcp.normalImpulse, normal, b2Math_28.b2Vec2.s_t0), b2Math_28.b2Vec2.MulSV(vcp.tangentImpulse, tangent, b2Math_28.b2Vec2.s_t1), P);
                    wA -= iA * b2Math_28.b2Vec2.CrossVV(vcp.rA, P);
                    vA.SelfMulSub(mA, P);
                    wB += iB * b2Math_28.b2Vec2.CrossVV(vcp.rB, P);
                    vB.SelfMulAdd(mB, P);
                }
                this.m_velocities[indexA].w = wA;
                this.m_velocities[indexB].w = wB;
            }
        };
        b2ContactSolver.prototype.SolveVelocityConstraints = function () {
            var dv = b2ContactSolver.SolveVelocityConstraints_s_dv;
            var dv1 = b2ContactSolver.SolveVelocityConstraints_s_dv1;
            var dv2 = b2ContactSolver.SolveVelocityConstraints_s_dv2;
            var P = b2ContactSolver.SolveVelocityConstraints_s_P;
            var a = b2ContactSolver.SolveVelocityConstraints_s_a;
            var b = b2ContactSolver.SolveVelocityConstraints_s_b;
            var x = b2ContactSolver.SolveVelocityConstraints_s_x;
            var d = b2ContactSolver.SolveVelocityConstraints_s_d;
            var P1 = b2ContactSolver.SolveVelocityConstraints_s_P1;
            var P2 = b2ContactSolver.SolveVelocityConstraints_s_P2;
            var P1P2 = b2ContactSolver.SolveVelocityConstraints_s_P1P2;
            for (var i = 0; i < this.m_count; ++i) {
                var vc = this.m_velocityConstraints[i];
                var indexA = vc.indexA;
                var indexB = vc.indexB;
                var mA = vc.invMassA;
                var iA = vc.invIA;
                var mB = vc.invMassB;
                var iB = vc.invIB;
                var pointCount = vc.pointCount;
                var vA = this.m_velocities[indexA].v;
                var wA = this.m_velocities[indexA].w;
                var vB = this.m_velocities[indexB].v;
                var wB = this.m_velocities[indexB].w;
                var normal = vc.normal;
                var tangent = vc.tangent;
                var friction = vc.friction;
                for (var j = 0; j < pointCount; ++j) {
                    var vcp = vc.points[j];
                    b2Math_28.b2Vec2.SubVV(b2Math_28.b2Vec2.AddVCrossSV(vB, wB, vcp.rB, b2Math_28.b2Vec2.s_t0), b2Math_28.b2Vec2.AddVCrossSV(vA, wA, vcp.rA, b2Math_28.b2Vec2.s_t1), dv);
                    var vt = b2Math_28.b2Vec2.DotVV(dv, tangent) - vc.tangentSpeed;
                    var lambda = vcp.tangentMass * (-vt);
                    var maxFriction = friction * vcp.normalImpulse;
                    var newImpulse = b2Math_28.b2Clamp(vcp.tangentImpulse + lambda, (-maxFriction), maxFriction);
                    lambda = newImpulse - vcp.tangentImpulse;
                    vcp.tangentImpulse = newImpulse;
                    b2Math_28.b2Vec2.MulSV(lambda, tangent, P);
                    vA.SelfMulSub(mA, P);
                    wA -= iA * b2Math_28.b2Vec2.CrossVV(vcp.rA, P);
                    vB.SelfMulAdd(mB, P);
                    wB += iB * b2Math_28.b2Vec2.CrossVV(vcp.rB, P);
                }
                if (vc.pointCount === 1) {
                    var vcp = vc.points[0];
                    b2Math_28.b2Vec2.SubVV(b2Math_28.b2Vec2.AddVCrossSV(vB, wB, vcp.rB, b2Math_28.b2Vec2.s_t0), b2Math_28.b2Vec2.AddVCrossSV(vA, wA, vcp.rA, b2Math_28.b2Vec2.s_t1), dv);
                    var vn = b2Math_28.b2Vec2.DotVV(dv, normal);
                    var lambda = (-vcp.normalMass * (vn - vcp.velocityBias));
                    var newImpulse = b2Math_28.b2Max(vcp.normalImpulse + lambda, 0);
                    lambda = newImpulse - vcp.normalImpulse;
                    vcp.normalImpulse = newImpulse;
                    b2Math_28.b2Vec2.MulSV(lambda, normal, P);
                    vA.SelfMulSub(mA, P);
                    wA -= iA * b2Math_28.b2Vec2.CrossVV(vcp.rA, P);
                    vB.SelfMulAdd(mB, P);
                    wB += iB * b2Math_28.b2Vec2.CrossVV(vcp.rB, P);
                }
                else {
                    var cp1 = vc.points[0];
                    var cp2 = vc.points[1];
                    a.Set(cp1.normalImpulse, cp2.normalImpulse);
                    b2Math_28.b2Vec2.SubVV(b2Math_28.b2Vec2.AddVCrossSV(vB, wB, cp1.rB, b2Math_28.b2Vec2.s_t0), b2Math_28.b2Vec2.AddVCrossSV(vA, wA, cp1.rA, b2Math_28.b2Vec2.s_t1), dv1);
                    b2Math_28.b2Vec2.SubVV(b2Math_28.b2Vec2.AddVCrossSV(vB, wB, cp2.rB, b2Math_28.b2Vec2.s_t0), b2Math_28.b2Vec2.AddVCrossSV(vA, wA, cp2.rA, b2Math_28.b2Vec2.s_t1), dv2);
                    var vn1 = b2Math_28.b2Vec2.DotVV(dv1, normal);
                    var vn2 = b2Math_28.b2Vec2.DotVV(dv2, normal);
                    b.x = vn1 - cp1.velocityBias;
                    b.y = vn2 - cp2.velocityBias;
                    b.SelfSub(b2Math_28.b2Mat22.MulMV(vc.K, a, b2Math_28.b2Vec2.s_t0));
                    for (;;) {
                        b2Math_28.b2Mat22.MulMV(vc.normalMass, b, x).SelfNeg();
                        if (x.x >= 0 && x.y >= 0) {
                            b2Math_28.b2Vec2.SubVV(x, a, d);
                            b2Math_28.b2Vec2.MulSV(d.x, normal, P1);
                            b2Math_28.b2Vec2.MulSV(d.y, normal, P2);
                            b2Math_28.b2Vec2.AddVV(P1, P2, P1P2);
                            vA.SelfMulSub(mA, P1P2);
                            wA -= iA * (b2Math_28.b2Vec2.CrossVV(cp1.rA, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rA, P2));
                            vB.SelfMulAdd(mB, P1P2);
                            wB += iB * (b2Math_28.b2Vec2.CrossVV(cp1.rB, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rB, P2));
                            cp1.normalImpulse = x.x;
                            cp2.normalImpulse = x.y;
                            break;
                        }
                        x.x = (-cp1.normalMass * b.x);
                        x.y = 0;
                        vn1 = 0;
                        vn2 = vc.K.ex.y * x.x + b.y;
                        if (x.x >= 0 && vn2 >= 0) {
                            b2Math_28.b2Vec2.SubVV(x, a, d);
                            b2Math_28.b2Vec2.MulSV(d.x, normal, P1);
                            b2Math_28.b2Vec2.MulSV(d.y, normal, P2);
                            b2Math_28.b2Vec2.AddVV(P1, P2, P1P2);
                            vA.SelfMulSub(mA, P1P2);
                            wA -= iA * (b2Math_28.b2Vec2.CrossVV(cp1.rA, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rA, P2));
                            vB.SelfMulAdd(mB, P1P2);
                            wB += iB * (b2Math_28.b2Vec2.CrossVV(cp1.rB, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rB, P2));
                            cp1.normalImpulse = x.x;
                            cp2.normalImpulse = x.y;
                            break;
                        }
                        x.x = 0;
                        x.y = (-cp2.normalMass * b.y);
                        vn1 = vc.K.ey.x * x.y + b.x;
                        vn2 = 0;
                        if (x.y >= 0 && vn1 >= 0) {
                            b2Math_28.b2Vec2.SubVV(x, a, d);
                            b2Math_28.b2Vec2.MulSV(d.x, normal, P1);
                            b2Math_28.b2Vec2.MulSV(d.y, normal, P2);
                            b2Math_28.b2Vec2.AddVV(P1, P2, P1P2);
                            vA.SelfMulSub(mA, P1P2);
                            wA -= iA * (b2Math_28.b2Vec2.CrossVV(cp1.rA, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rA, P2));
                            vB.SelfMulAdd(mB, P1P2);
                            wB += iB * (b2Math_28.b2Vec2.CrossVV(cp1.rB, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rB, P2));
                            cp1.normalImpulse = x.x;
                            cp2.normalImpulse = x.y;
                            break;
                        }
                        x.x = 0;
                        x.y = 0;
                        vn1 = b.x;
                        vn2 = b.y;
                        if (vn1 >= 0 && vn2 >= 0) {
                            b2Math_28.b2Vec2.SubVV(x, a, d);
                            b2Math_28.b2Vec2.MulSV(d.x, normal, P1);
                            b2Math_28.b2Vec2.MulSV(d.y, normal, P2);
                            b2Math_28.b2Vec2.AddVV(P1, P2, P1P2);
                            vA.SelfMulSub(mA, P1P2);
                            wA -= iA * (b2Math_28.b2Vec2.CrossVV(cp1.rA, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rA, P2));
                            vB.SelfMulAdd(mB, P1P2);
                            wB += iB * (b2Math_28.b2Vec2.CrossVV(cp1.rB, P1) + b2Math_28.b2Vec2.CrossVV(cp2.rB, P2));
                            cp1.normalImpulse = x.x;
                            cp2.normalImpulse = x.y;
                            break;
                        }
                        break;
                    }
                }
                this.m_velocities[indexA].w = wA;
                this.m_velocities[indexB].w = wB;
            }
        };
        b2ContactSolver.prototype.StoreImpulses = function () {
            for (var i = 0; i < this.m_count; ++i) {
                var vc = this.m_velocityConstraints[i];
                var manifold = this.m_contacts[vc.contactIndex].GetManifold();
                for (var j = 0; j < vc.pointCount; ++j) {
                    manifold.points[j].normalImpulse = vc.points[j].normalImpulse;
                    manifold.points[j].tangentImpulse = vc.points[j].tangentImpulse;
                }
            }
        };
        b2ContactSolver.prototype.SolvePositionConstraints = function () {
            var xfA = b2ContactSolver.SolvePositionConstraints_s_xfA;
            var xfB = b2ContactSolver.SolvePositionConstraints_s_xfB;
            var psm = b2ContactSolver.SolvePositionConstraints_s_psm;
            var rA = b2ContactSolver.SolvePositionConstraints_s_rA;
            var rB = b2ContactSolver.SolvePositionConstraints_s_rB;
            var P = b2ContactSolver.SolvePositionConstraints_s_P;
            var minSeparation = 0;
            for (var i = 0; i < this.m_count; ++i) {
                var pc = this.m_positionConstraints[i];
                var indexA = pc.indexA;
                var indexB = pc.indexB;
                var localCenterA = pc.localCenterA;
                var mA = pc.invMassA;
                var iA = pc.invIA;
                var localCenterB = pc.localCenterB;
                var mB = pc.invMassB;
                var iB = pc.invIB;
                var pointCount = pc.pointCount;
                var cA = this.m_positions[indexA].c;
                var aA = this.m_positions[indexA].a;
                var cB = this.m_positions[indexB].c;
                var aB = this.m_positions[indexB].a;
                for (var j = 0; j < pointCount; ++j) {
                    xfA.q.SetAngle(aA);
                    xfB.q.SetAngle(aB);
                    b2Math_28.b2Vec2.SubVV(cA, b2Math_28.b2Rot.MulRV(xfA.q, localCenterA, b2Math_28.b2Vec2.s_t0), xfA.p);
                    b2Math_28.b2Vec2.SubVV(cB, b2Math_28.b2Rot.MulRV(xfB.q, localCenterB, b2Math_28.b2Vec2.s_t0), xfB.p);
                    psm.Initialize(pc, xfA, xfB, j);
                    var normal = psm.normal;
                    var point = psm.point;
                    var separation = psm.separation;
                    b2Math_28.b2Vec2.SubVV(point, cA, rA);
                    b2Math_28.b2Vec2.SubVV(point, cB, rB);
                    minSeparation = b2Math_28.b2Min(minSeparation, separation);
                    var C = b2Math_28.b2Clamp(b2Settings_30.b2_baumgarte * (separation + b2Settings_30.b2_linearSlop), (-b2Settings_30.b2_maxLinearCorrection), 0);
                    var rnA = b2Math_28.b2Vec2.CrossVV(rA, normal);
                    var rnB = b2Math_28.b2Vec2.CrossVV(rB, normal);
                    var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                    var impulse = K > 0 ? -C / K : 0;
                    b2Math_28.b2Vec2.MulSV(impulse, normal, P);
                    cA.SelfMulSub(mA, P);
                    aA -= iA * b2Math_28.b2Vec2.CrossVV(rA, P);
                    cB.SelfMulAdd(mB, P);
                    aB += iB * b2Math_28.b2Vec2.CrossVV(rB, P);
                }
                this.m_positions[indexA].a = aA;
                this.m_positions[indexB].a = aB;
            }
            return minSeparation > (-3 * b2Settings_30.b2_linearSlop);
        };
        b2ContactSolver.prototype.SolveTOIPositionConstraints = function (toiIndexA, toiIndexB) {
            var xfA = b2ContactSolver.SolveTOIPositionConstraints_s_xfA;
            var xfB = b2ContactSolver.SolveTOIPositionConstraints_s_xfB;
            var psm = b2ContactSolver.SolveTOIPositionConstraints_s_psm;
            var rA = b2ContactSolver.SolveTOIPositionConstraints_s_rA;
            var rB = b2ContactSolver.SolveTOIPositionConstraints_s_rB;
            var P = b2ContactSolver.SolveTOIPositionConstraints_s_P;
            var minSeparation = 0;
            for (var i = 0; i < this.m_count; ++i) {
                var pc = this.m_positionConstraints[i];
                var indexA = pc.indexA;
                var indexB = pc.indexB;
                var localCenterA = pc.localCenterA;
                var localCenterB = pc.localCenterB;
                var pointCount = pc.pointCount;
                var mA = 0;
                var iA = 0;
                if (indexA === toiIndexA || indexA === toiIndexB) {
                    mA = pc.invMassA;
                    iA = pc.invIA;
                }
                var mB = 0;
                var iB = 0;
                if (indexB === toiIndexA || indexB === toiIndexB) {
                    mB = pc.invMassB;
                    iB = pc.invIB;
                }
                var cA = this.m_positions[indexA].c;
                var aA = this.m_positions[indexA].a;
                var cB = this.m_positions[indexB].c;
                var aB = this.m_positions[indexB].a;
                for (var j = 0; j < pointCount; ++j) {
                    xfA.q.SetAngle(aA);
                    xfB.q.SetAngle(aB);
                    b2Math_28.b2Vec2.SubVV(cA, b2Math_28.b2Rot.MulRV(xfA.q, localCenterA, b2Math_28.b2Vec2.s_t0), xfA.p);
                    b2Math_28.b2Vec2.SubVV(cB, b2Math_28.b2Rot.MulRV(xfB.q, localCenterB, b2Math_28.b2Vec2.s_t0), xfB.p);
                    psm.Initialize(pc, xfA, xfB, j);
                    var normal = psm.normal;
                    var point = psm.point;
                    var separation = psm.separation;
                    b2Math_28.b2Vec2.SubVV(point, cA, rA);
                    b2Math_28.b2Vec2.SubVV(point, cB, rB);
                    minSeparation = b2Math_28.b2Min(minSeparation, separation);
                    var C = b2Math_28.b2Clamp(b2Settings_30.b2_toiBaumgarte * (separation + b2Settings_30.b2_linearSlop), (-b2Settings_30.b2_maxLinearCorrection), 0);
                    var rnA = b2Math_28.b2Vec2.CrossVV(rA, normal);
                    var rnB = b2Math_28.b2Vec2.CrossVV(rB, normal);
                    var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                    var impulse = K > 0 ? -C / K : 0;
                    b2Math_28.b2Vec2.MulSV(impulse, normal, P);
                    cA.SelfMulSub(mA, P);
                    aA -= iA * b2Math_28.b2Vec2.CrossVV(rA, P);
                    cB.SelfMulAdd(mB, P);
                    aB += iB * b2Math_28.b2Vec2.CrossVV(rB, P);
                }
                this.m_positions[indexA].a = aA;
                this.m_positions[indexB].a = aB;
            }
            return minSeparation >= -1.5 * b2Settings_30.b2_linearSlop;
        };
        b2ContactSolver.InitializeVelocityConstraints_s_xfA = new b2Math_28.b2Transform();
        b2ContactSolver.InitializeVelocityConstraints_s_xfB = new b2Math_28.b2Transform();
        b2ContactSolver.InitializeVelocityConstraints_s_worldManifold = new b2Collision_8.b2WorldManifold();
        b2ContactSolver.WarmStart_s_P = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_dv = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_dv1 = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_dv2 = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_P = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_a = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_b = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_x = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_d = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_P1 = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_P2 = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveVelocityConstraints_s_P1P2 = new b2Math_28.b2Vec2();
        b2ContactSolver.SolvePositionConstraints_s_xfA = new b2Math_28.b2Transform();
        b2ContactSolver.SolvePositionConstraints_s_xfB = new b2Math_28.b2Transform();
        b2ContactSolver.SolvePositionConstraints_s_psm = new b2PositionSolverManifold();
        b2ContactSolver.SolvePositionConstraints_s_rA = new b2Math_28.b2Vec2();
        b2ContactSolver.SolvePositionConstraints_s_rB = new b2Math_28.b2Vec2();
        b2ContactSolver.SolvePositionConstraints_s_P = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveTOIPositionConstraints_s_xfA = new b2Math_28.b2Transform();
        b2ContactSolver.SolveTOIPositionConstraints_s_xfB = new b2Math_28.b2Transform();
        b2ContactSolver.SolveTOIPositionConstraints_s_psm = new b2PositionSolverManifold();
        b2ContactSolver.SolveTOIPositionConstraints_s_rA = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveTOIPositionConstraints_s_rB = new b2Math_28.b2Vec2();
        b2ContactSolver.SolveTOIPositionConstraints_s_P = new b2Math_28.b2Vec2();
        return b2ContactSolver;
    }());
    exports.b2ContactSolver = b2ContactSolver;
});
define("Dynamics/b2Island", ["require", "exports", "Common/b2Settings", "Common/b2Settings", "Common/b2Settings", "Common/b2Settings", "Common/b2Math", "Common/b2Timer", "Dynamics/Contacts/b2ContactSolver", "Dynamics/b2Body", "Dynamics/b2TimeStep", "Dynamics/b2WorldCallbacks"], function (require, exports, b2Settings_31, b2Settings_32, b2Settings_33, b2Settings_34, b2Math_29, b2Timer_2, b2ContactSolver_1, b2Body_2, b2TimeStep_2, b2WorldCallbacks_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2Island = (function () {
        function b2Island() {
            this.m_allocator = null;
            this.m_bodies = [];
            this.m_contacts = [];
            this.m_joints = [];
            this.m_positions = b2TimeStep_2.b2Position.MakeArray(1024);
            this.m_velocities = b2TimeStep_2.b2Velocity.MakeArray(1024);
            this.m_bodyCount = 0;
            this.m_jointCount = 0;
            this.m_contactCount = 0;
            this.m_bodyCapacity = 0;
            this.m_contactCapacity = 0;
            this.m_jointCapacity = 0;
        }
        b2Island.prototype.Initialize = function (bodyCapacity, contactCapacity, jointCapacity, allocator, listener) {
            this.m_bodyCapacity = bodyCapacity;
            this.m_contactCapacity = contactCapacity;
            this.m_jointCapacity = jointCapacity;
            this.m_bodyCount = 0;
            this.m_contactCount = 0;
            this.m_jointCount = 0;
            this.m_allocator = allocator;
            this.m_listener = listener;
            if (this.m_positions.length < bodyCapacity) {
                var new_length = b2Math_29.b2Max(this.m_positions.length * 2, bodyCapacity);
                while (this.m_positions.length < new_length) {
                    this.m_positions[this.m_positions.length] = new b2TimeStep_2.b2Position();
                }
            }
            if (this.m_velocities.length < bodyCapacity) {
                var new_length = b2Math_29.b2Max(this.m_velocities.length * 2, bodyCapacity);
                while (this.m_velocities.length < new_length) {
                    this.m_velocities[this.m_velocities.length] = new b2TimeStep_2.b2Velocity();
                }
            }
        };
        b2Island.prototype.Clear = function () {
            this.m_bodyCount = 0;
            this.m_contactCount = 0;
            this.m_jointCount = 0;
        };
        b2Island.prototype.AddBody = function (body) {
            body.m_islandIndex = this.m_bodyCount;
            this.m_bodies[this.m_bodyCount++] = body;
        };
        b2Island.prototype.AddContact = function (contact) {
            this.m_contacts[this.m_contactCount++] = contact;
        };
        b2Island.prototype.AddJoint = function (joint) {
            this.m_joints[this.m_jointCount++] = joint;
        };
        b2Island.prototype.Solve = function (profile, step, gravity, allowSleep) {
            var timer = b2Island.s_timer.Reset();
            var h = step.dt;
            for (var i = 0; i < this.m_bodyCount; ++i) {
                var b = this.m_bodies[i];
                this.m_positions[i].c.Copy(b.m_sweep.c);
                var a = b.m_sweep.a;
                var v = this.m_velocities[i].v.Copy(b.m_linearVelocity);
                var w = b.m_angularVelocity;
                b.m_sweep.c0.Copy(b.m_sweep.c);
                b.m_sweep.a0 = b.m_sweep.a;
                if (b.m_type === b2Body_2.b2BodyType.b2_dynamicBody) {
                    v.x += h * (b.m_gravityScale * gravity.x + b.m_invMass * b.m_force.x);
                    v.y += h * (b.m_gravityScale * gravity.y + b.m_invMass * b.m_force.y);
                    w += h * b.m_invI * b.m_torque;
                    v.SelfMul(1.0 / (1.0 + h * b.m_linearDamping));
                    w *= 1.0 / (1.0 + h * b.m_angularDamping);
                }
                this.m_positions[i].a = a;
                this.m_velocities[i].w = w;
            }
            timer.Reset();
            var solverData = b2Island.s_solverData;
            solverData.step.Copy(step);
            solverData.positions = this.m_positions;
            solverData.velocities = this.m_velocities;
            var contactSolverDef = b2Island.s_contactSolverDef;
            contactSolverDef.step.Copy(step);
            contactSolverDef.contacts = this.m_contacts;
            contactSolverDef.count = this.m_contactCount;
            contactSolverDef.positions = this.m_positions;
            contactSolverDef.velocities = this.m_velocities;
            contactSolverDef.allocator = this.m_allocator;
            var contactSolver = b2Island.s_contactSolver.Initialize(contactSolverDef);
            contactSolver.InitializeVelocityConstraints();
            if (step.warmStarting) {
                contactSolver.WarmStart();
            }
            for (var i = 0; i < this.m_jointCount; ++i) {
                this.m_joints[i].InitVelocityConstraints(solverData);
            }
            profile.solveInit = timer.GetMilliseconds();
            timer.Reset();
            for (var i = 0; i < step.velocityIterations; ++i) {
                for (var j = 0; j < this.m_jointCount; ++j) {
                    this.m_joints[j].SolveVelocityConstraints(solverData);
                }
                contactSolver.SolveVelocityConstraints();
            }
            contactSolver.StoreImpulses();
            profile.solveVelocity = timer.GetMilliseconds();
            for (var i = 0; i < this.m_bodyCount; ++i) {
                var c = this.m_positions[i].c;
                var a = this.m_positions[i].a;
                var v = this.m_velocities[i].v;
                var w = this.m_velocities[i].w;
                var translation = b2Math_29.b2Vec2.MulSV(h, v, b2Island.s_translation);
                if (b2Math_29.b2Vec2.DotVV(translation, translation) > b2Settings_32.b2_maxTranslationSquared) {
                    var ratio = b2Settings_32.b2_maxTranslation / translation.Length();
                    v.SelfMul(ratio);
                }
                var rotation = h * w;
                if (rotation * rotation > b2Settings_33.b2_maxRotationSquared) {
                    var ratio = b2Settings_33.b2_maxRotation / b2Math_29.b2Abs(rotation);
                    w *= ratio;
                }
                c.x += h * v.x;
                c.y += h * v.y;
                a += h * w;
                this.m_positions[i].a = a;
                this.m_velocities[i].w = w;
            }
            timer.Reset();
            var positionSolved = false;
            for (var i = 0; i < step.positionIterations; ++i) {
                var contactsOkay = contactSolver.SolvePositionConstraints();
                var jointsOkay = true;
                for (var j = 0; j < this.m_jointCount; ++j) {
                    var jointOkay = this.m_joints[j].SolvePositionConstraints(solverData);
                    jointsOkay = jointsOkay && jointOkay;
                }
                if (contactsOkay && jointsOkay) {
                    positionSolved = true;
                    break;
                }
            }
            for (var i = 0; i < this.m_bodyCount; ++i) {
                var body = this.m_bodies[i];
                body.m_sweep.c.Copy(this.m_positions[i].c);
                body.m_sweep.a = this.m_positions[i].a;
                body.m_linearVelocity.Copy(this.m_velocities[i].v);
                body.m_angularVelocity = this.m_velocities[i].w;
                body.SynchronizeTransform();
            }
            profile.solvePosition = timer.GetMilliseconds();
            this.Report(contactSolver.m_velocityConstraints);
            if (allowSleep) {
                var minSleepTime = b2Settings_31.b2_maxFloat;
                var linTolSqr = b2Settings_34.b2_linearSleepTolerance * b2Settings_34.b2_linearSleepTolerance;
                var angTolSqr = b2Settings_34.b2_angularSleepTolerance * b2Settings_34.b2_angularSleepTolerance;
                for (var i = 0; i < this.m_bodyCount; ++i) {
                    var b = this.m_bodies[i];
                    if (b.GetType() === b2Body_2.b2BodyType.b2_staticBody) {
                        continue;
                    }
                    if (!b.m_autoSleepFlag ||
                        b.m_angularVelocity * b.m_angularVelocity > angTolSqr ||
                        b2Math_29.b2Vec2.DotVV(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
                        b.m_sleepTime = 0;
                        minSleepTime = 0;
                    }
                    else {
                        b.m_sleepTime += h;
                        minSleepTime = b2Math_29.b2Min(minSleepTime, b.m_sleepTime);
                    }
                }
                if (minSleepTime >= b2Settings_31.b2_timeToSleep && positionSolved) {
                    for (var i = 0; i < this.m_bodyCount; ++i) {
                        var b = this.m_bodies[i];
                        b.SetAwake(false);
                    }
                }
            }
        };
        b2Island.prototype.SolveTOI = function (subStep, toiIndexA, toiIndexB) {
            for (var i = 0; i < this.m_bodyCount; ++i) {
                var b = this.m_bodies[i];
                this.m_positions[i].c.Copy(b.m_sweep.c);
                this.m_positions[i].a = b.m_sweep.a;
                this.m_velocities[i].v.Copy(b.m_linearVelocity);
                this.m_velocities[i].w = b.m_angularVelocity;
            }
            var contactSolverDef = b2Island.s_contactSolverDef;
            contactSolverDef.contacts = this.m_contacts;
            contactSolverDef.count = this.m_contactCount;
            contactSolverDef.allocator = this.m_allocator;
            contactSolverDef.step.Copy(subStep);
            contactSolverDef.positions = this.m_positions;
            contactSolverDef.velocities = this.m_velocities;
            var contactSolver = b2Island.s_contactSolver.Initialize(contactSolverDef);
            for (var i = 0; i < subStep.positionIterations; ++i) {
                var contactsOkay = contactSolver.SolveTOIPositionConstraints(toiIndexA, toiIndexB);
                if (contactsOkay) {
                    break;
                }
            }
            this.m_bodies[toiIndexA].m_sweep.c0.Copy(this.m_positions[toiIndexA].c);
            this.m_bodies[toiIndexA].m_sweep.a0 = this.m_positions[toiIndexA].a;
            this.m_bodies[toiIndexB].m_sweep.c0.Copy(this.m_positions[toiIndexB].c);
            this.m_bodies[toiIndexB].m_sweep.a0 = this.m_positions[toiIndexB].a;
            contactSolver.InitializeVelocityConstraints();
            for (var i = 0; i < subStep.velocityIterations; ++i) {
                contactSolver.SolveVelocityConstraints();
            }
            var h = subStep.dt;
            for (var i = 0; i < this.m_bodyCount; ++i) {
                var c = this.m_positions[i].c;
                var a = this.m_positions[i].a;
                var v = this.m_velocities[i].v;
                var w = this.m_velocities[i].w;
                var translation = b2Math_29.b2Vec2.MulSV(h, v, b2Island.s_translation);
                if (b2Math_29.b2Vec2.DotVV(translation, translation) > b2Settings_32.b2_maxTranslationSquared) {
                    var ratio = b2Settings_32.b2_maxTranslation / translation.Length();
                    v.SelfMul(ratio);
                }
                var rotation = h * w;
                if (rotation * rotation > b2Settings_33.b2_maxRotationSquared) {
                    var ratio = b2Settings_33.b2_maxRotation / b2Math_29.b2Abs(rotation);
                    w *= ratio;
                }
                c.SelfMulAdd(h, v);
                a += h * w;
                this.m_positions[i].a = a;
                this.m_velocities[i].w = w;
                var body = this.m_bodies[i];
                body.m_sweep.c.Copy(c);
                body.m_sweep.a = a;
                body.m_linearVelocity.Copy(v);
                body.m_angularVelocity = w;
                body.SynchronizeTransform();
            }
            this.Report(contactSolver.m_velocityConstraints);
        };
        b2Island.prototype.Report = function (constraints) {
            if (this.m_listener === null) {
                return;
            }
            for (var i = 0; i < this.m_contactCount; ++i) {
                var c = this.m_contacts[i];
                if (!c) {
                    continue;
                }
                var vc = constraints[i];
                var impulse = b2Island.s_impulse;
                impulse.count = vc.pointCount;
                for (var j = 0; j < vc.pointCount; ++j) {
                    impulse.normalImpulses[j] = vc.points[j].normalImpulse;
                    impulse.tangentImpulses[j] = vc.points[j].tangentImpulse;
                }
                this.m_listener.PostSolve(c, impulse);
            }
        };
        b2Island.s_timer = new b2Timer_2.b2Timer();
        b2Island.s_solverData = new b2TimeStep_2.b2SolverData();
        b2Island.s_contactSolverDef = new b2ContactSolver_1.b2ContactSolverDef();
        b2Island.s_contactSolver = new b2ContactSolver_1.b2ContactSolver();
        b2Island.s_translation = new b2Math_29.b2Vec2();
        b2Island.s_impulse = new b2WorldCallbacks_2.b2ContactImpulse();
        return b2Island;
    }());
    exports.b2Island = b2Island;
});
define("Controllers/b2Controller", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ControllerEdge = (function () {
        function b2ControllerEdge(controller, body) {
            this.prevBody = null;
            this.nextBody = null;
            this.prevController = null;
            this.nextController = null;
            this.controller = controller;
            this.body = body;
        }
        return b2ControllerEdge;
    }());
    exports.b2ControllerEdge = b2ControllerEdge;
    var b2Controller = (function () {
        function b2Controller() {
            this.m_bodyList = null;
            this.m_bodyCount = 0;
            this.m_prev = null;
            this.m_next = null;
        }
        b2Controller.prototype.GetNext = function () {
            return this.m_next;
        };
        b2Controller.prototype.GetPrev = function () {
            return this.m_prev;
        };
        b2Controller.prototype.GetBodyList = function () {
            return this.m_bodyList;
        };
        b2Controller.prototype.AddBody = function (body) {
            var edge = new b2ControllerEdge(this, body);
            edge.nextBody = this.m_bodyList;
            edge.prevBody = null;
            if (this.m_bodyList) {
                this.m_bodyList.prevBody = edge;
            }
            this.m_bodyList = edge;
            ++this.m_bodyCount;
            edge.nextController = body.m_controllerList;
            edge.prevController = null;
            if (body.m_controllerList) {
                body.m_controllerList.prevController = edge;
            }
            body.m_controllerList = edge;
            ++body.m_controllerCount;
        };
        b2Controller.prototype.RemoveBody = function (body) {
            if (this.m_bodyCount <= 0) {
                throw new Error();
            }
            var edge = this.m_bodyList;
            while (edge && edge.body !== body) {
                edge = edge.nextBody;
            }
            if (edge === null) {
                throw new Error();
            }
            if (edge.prevBody) {
                edge.prevBody.nextBody = edge.nextBody;
            }
            if (edge.nextBody) {
                edge.nextBody.prevBody = edge.prevBody;
            }
            if (this.m_bodyList === edge) {
                this.m_bodyList = edge.nextBody;
            }
            --this.m_bodyCount;
            if (edge.nextController) {
                edge.nextController.prevController = edge.prevController;
            }
            if (edge.prevController) {
                edge.prevController.nextController = edge.nextController;
            }
            if (body.m_controllerList === edge) {
                body.m_controllerList = edge.nextController;
            }
            --body.m_controllerCount;
        };
        b2Controller.prototype.Clear = function () {
            while (this.m_bodyList) {
                this.RemoveBody(this.m_bodyList.body);
            }
            this.m_bodyCount = 0;
        };
        return b2Controller;
    }());
    exports.b2Controller = b2Controller;
});
define("Dynamics/b2World", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Common/b2Timer", "Common/b2Draw", "Collision/b2Collision", "Collision/b2TimeOfImpact", "Collision/Shapes/b2Shape", "Dynamics/Joints/b2Joint", "Dynamics/Joints/b2JointFactory", "Dynamics/b2Body", "Dynamics/b2ContactManager", "Dynamics/b2Island", "Dynamics/b2TimeStep", "Dynamics/b2WorldCallbacks", "Common/b2Settings", "Particle/b2Particle", "Particle/b2ParticleSystem"], function (require, exports, b2Settings_35, b2Math_30, b2Timer_3, b2Draw_2, b2Collision_10, b2TimeOfImpact_1, b2Shape_7, b2Joint_14, b2JointFactory_1, b2Body_3, b2ContactManager_1, b2Island_1, b2TimeStep_3, b2WorldCallbacks_3, b2Settings_36, b2Particle_1, b2ParticleSystem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2World = (function () {
        function b2World(gravity) {
            this.m_newFixture = false;
            this.m_locked = false;
            this.m_clearForces = true;
            this.m_contactManager = new b2ContactManager_1.b2ContactManager();
            this.m_bodyList = null;
            this.m_jointList = null;
            this.m_particleSystemList = null;
            this.m_bodyCount = 0;
            this.m_jointCount = 0;
            this.m_gravity = new b2Math_30.b2Vec2();
            this.m_allowSleep = true;
            this.m_destructionListener = null;
            this.m_debugDraw = null;
            this.m_inv_dt0 = 0;
            this.m_warmStarting = true;
            this.m_continuousPhysics = true;
            this.m_subStepping = false;
            this.m_stepComplete = true;
            this.m_profile = new b2TimeStep_3.b2Profile();
            this.m_island = new b2Island_1.b2Island();
            this.s_stack = [];
            this.m_controllerList = null;
            this.m_controllerCount = 0;
            this.m_gravity.Copy(gravity);
        }
        b2World.prototype.SetDestructionListener = function (listener) {
            this.m_destructionListener = listener;
        };
        b2World.prototype.SetContactFilter = function (filter) {
            this.m_contactManager.m_contactFilter = filter;
        };
        b2World.prototype.SetContactListener = function (listener) {
            this.m_contactManager.m_contactListener = listener;
        };
        b2World.prototype.SetDebugDraw = function (debugDraw) {
            this.m_debugDraw = debugDraw;
        };
        b2World.prototype.CreateBody = function (def) {
            if (def === void 0) { def = {}; }
            if (this.IsLocked()) {
                throw new Error();
            }
            var b = new b2Body_3.b2Body(def, this);
            b.m_prev = null;
            b.m_next = this.m_bodyList;
            if (this.m_bodyList) {
                this.m_bodyList.m_prev = b;
            }
            this.m_bodyList = b;
            ++this.m_bodyCount;
            return b;
        };
        b2World.prototype.DestroyBody = function (b) {
            if (this.IsLocked()) {
                throw new Error();
            }
            var je = b.m_jointList;
            while (je) {
                var je0 = je;
                je = je.next;
                if (this.m_destructionListener) {
                    this.m_destructionListener.SayGoodbyeJoint(je0.joint);
                }
                this.DestroyJoint(je0.joint);
                b.m_jointList = je;
            }
            b.m_jointList = null;
            var coe = b.m_controllerList;
            while (coe) {
                var coe0 = coe;
                coe = coe.nextController;
                coe0.controller.RemoveBody(b);
            }
            var ce = b.m_contactList;
            while (ce) {
                var ce0 = ce;
                ce = ce.next;
                this.m_contactManager.Destroy(ce0.contact);
            }
            b.m_contactList = null;
            var f = b.m_fixtureList;
            while (f) {
                var f0 = f;
                f = f.m_next;
                if (this.m_destructionListener) {
                    this.m_destructionListener.SayGoodbyeFixture(f0);
                }
                f0.DestroyProxies();
                f0.Destroy();
                b.m_fixtureList = f;
                b.m_fixtureCount -= 1;
            }
            b.m_fixtureList = null;
            b.m_fixtureCount = 0;
            if (b.m_prev) {
                b.m_prev.m_next = b.m_next;
            }
            if (b.m_next) {
                b.m_next.m_prev = b.m_prev;
            }
            if (b === this.m_bodyList) {
                this.m_bodyList = b.m_next;
            }
            --this.m_bodyCount;
        };
        b2World.prototype.CreateJoint = function (def) {
            if (this.IsLocked()) {
                throw new Error();
            }
            var j = b2JointFactory_1.b2JointFactory.Create(def, null);
            j.m_prev = null;
            j.m_next = this.m_jointList;
            if (this.m_jointList) {
                this.m_jointList.m_prev = j;
            }
            this.m_jointList = j;
            ++this.m_jointCount;
            j.m_edgeA.prev = null;
            j.m_edgeA.next = j.m_bodyA.m_jointList;
            if (j.m_bodyA.m_jointList) {
                j.m_bodyA.m_jointList.prev = j.m_edgeA;
            }
            j.m_bodyA.m_jointList = j.m_edgeA;
            j.m_edgeB.prev = null;
            j.m_edgeB.next = j.m_bodyB.m_jointList;
            if (j.m_bodyB.m_jointList) {
                j.m_bodyB.m_jointList.prev = j.m_edgeB;
            }
            j.m_bodyB.m_jointList = j.m_edgeB;
            var bodyA = def.bodyA;
            var bodyB = def.bodyB;
            if (!def.collideConnected) {
                var edge = bodyB.GetContactList();
                while (edge) {
                    if (edge.other === bodyA) {
                        edge.contact.FlagForFiltering();
                    }
                    edge = edge.next;
                }
            }
            return j;
        };
        b2World.prototype.DestroyJoint = function (j) {
            if (this.IsLocked()) {
                throw new Error();
            }
            var collideConnected = j.m_collideConnected;
            if (j.m_prev) {
                j.m_prev.m_next = j.m_next;
            }
            if (j.m_next) {
                j.m_next.m_prev = j.m_prev;
            }
            if (j === this.m_jointList) {
                this.m_jointList = j.m_next;
            }
            var bodyA = j.m_bodyA;
            var bodyB = j.m_bodyB;
            bodyA.SetAwake(true);
            bodyB.SetAwake(true);
            if (j.m_edgeA.prev) {
                j.m_edgeA.prev.next = j.m_edgeA.next;
            }
            if (j.m_edgeA.next) {
                j.m_edgeA.next.prev = j.m_edgeA.prev;
            }
            if (j.m_edgeA === bodyA.m_jointList) {
                bodyA.m_jointList = j.m_edgeA.next;
            }
            j.m_edgeA.prev = null;
            j.m_edgeA.next = null;
            if (j.m_edgeB.prev) {
                j.m_edgeB.prev.next = j.m_edgeB.next;
            }
            if (j.m_edgeB.next) {
                j.m_edgeB.next.prev = j.m_edgeB.prev;
            }
            if (j.m_edgeB === bodyB.m_jointList) {
                bodyB.m_jointList = j.m_edgeB.next;
            }
            j.m_edgeB.prev = null;
            j.m_edgeB.next = null;
            b2JointFactory_1.b2JointFactory.Destroy(j, null);
            --this.m_jointCount;
            if (!collideConnected) {
                var edge = bodyB.GetContactList();
                while (edge) {
                    if (edge.other === bodyA) {
                        edge.contact.FlagForFiltering();
                    }
                    edge = edge.next;
                }
            }
        };
        b2World.prototype.CreateParticleSystem = function (def) {
            if (this.IsLocked()) {
                throw new Error();
            }
            var p = new b2ParticleSystem_1.b2ParticleSystem(def, this);
            p.m_prev = null;
            p.m_next = this.m_particleSystemList;
            if (this.m_particleSystemList) {
                this.m_particleSystemList.m_prev = p;
            }
            this.m_particleSystemList = p;
            return p;
        };
        b2World.prototype.DestroyParticleSystem = function (p) {
            if (this.IsLocked()) {
                throw new Error();
            }
            if (p.m_prev) {
                p.m_prev.m_next = p.m_next;
            }
            if (p.m_next) {
                p.m_next.m_prev = p.m_prev;
            }
            if (p === this.m_particleSystemList) {
                this.m_particleSystemList = p.m_next;
            }
        };
        b2World.prototype.CalculateReasonableParticleIterations = function (timeStep) {
            if (this.m_particleSystemList === null) {
                return 1;
            }
            function GetSmallestRadius(world) {
                var smallestRadius = b2Settings_36.b2_maxFloat;
                for (var system = world.GetParticleSystemList(); system !== null; system = system.m_next) {
                    smallestRadius = b2Math_30.b2Min(smallestRadius, system.GetRadius());
                }
                return smallestRadius;
            }
            return b2Particle_1.b2CalculateParticleIterations(this.m_gravity.Length(), GetSmallestRadius(this), timeStep);
        };
        b2World.prototype.Step = function (dt, velocityIterations, positionIterations, particleIterations) {
            if (particleIterations === void 0) { particleIterations = this.CalculateReasonableParticleIterations(dt); }
            var stepTimer = b2World.Step_s_stepTimer.Reset();
            if (this.m_newFixture) {
                this.m_contactManager.FindNewContacts();
                this.m_newFixture = false;
            }
            this.m_locked = true;
            var step = b2World.Step_s_step;
            step.dt = dt;
            step.velocityIterations = velocityIterations;
            step.positionIterations = positionIterations;
            step.particleIterations = particleIterations;
            if (dt > 0) {
                step.inv_dt = 1 / dt;
            }
            else {
                step.inv_dt = 0;
            }
            step.dtRatio = this.m_inv_dt0 * dt;
            step.warmStarting = this.m_warmStarting;
            var timer = b2World.Step_s_timer.Reset();
            this.m_contactManager.Collide();
            this.m_profile.collide = timer.GetMilliseconds();
            if (this.m_stepComplete && step.dt > 0) {
                var timer_1 = b2World.Step_s_timer.Reset();
                for (var p = this.m_particleSystemList; p; p = p.m_next) {
                    p.Solve(step);
                }
                this.Solve(step);
                this.m_profile.solve = timer_1.GetMilliseconds();
            }
            if (this.m_continuousPhysics && step.dt > 0) {
                var timer_2 = b2World.Step_s_timer.Reset();
                this.SolveTOI(step);
                this.m_profile.solveTOI = timer_2.GetMilliseconds();
            }
            if (step.dt > 0) {
                this.m_inv_dt0 = step.inv_dt;
            }
            if (this.m_clearForces) {
                this.ClearForces();
            }
            this.m_locked = false;
            this.m_profile.step = stepTimer.GetMilliseconds();
        };
        b2World.prototype.ClearForces = function () {
            for (var body = this.m_bodyList; body; body = body.m_next) {
                body.m_force.SetZero();
                body.m_torque = 0;
            }
        };
        b2World.prototype.DrawParticleSystem = function (system) {
            if (this.m_debugDraw === null) {
                return;
            }
            var particleCount = system.GetParticleCount();
            if (particleCount) {
                var radius = system.GetRadius();
                var positionBuffer = system.GetPositionBuffer();
                if (system.m_colorBuffer.data) {
                    var colorBuffer = system.GetColorBuffer();
                    this.m_debugDraw.DrawParticles(positionBuffer, radius, colorBuffer, particleCount);
                }
                else {
                    this.m_debugDraw.DrawParticles(positionBuffer, radius, null, particleCount);
                }
            }
        };
        b2World.prototype.DrawDebugData = function () {
            if (this.m_debugDraw === null) {
                return;
            }
            var flags = this.m_debugDraw.GetFlags();
            var color = b2World.DrawDebugData_s_color.SetRGB(0, 0, 0);
            if (flags & b2Draw_2.b2DrawFlags.e_shapeBit) {
                for (var b = this.m_bodyList; b; b = b.m_next) {
                    var xf = b.m_xf;
                    this.m_debugDraw.PushTransform(xf);
                    for (var f = b.GetFixtureList(); f; f = f.m_next) {
                        if (!b.IsActive()) {
                            color.SetRGB(0.5, 0.5, 0.3);
                            this.DrawShape(f, color);
                        }
                        else if (b.GetType() === b2Body_3.b2BodyType.b2_staticBody) {
                            color.SetRGB(0.5, 0.9, 0.5);
                            this.DrawShape(f, color);
                        }
                        else if (b.GetType() === b2Body_3.b2BodyType.b2_kinematicBody) {
                            color.SetRGB(0.5, 0.5, 0.9);
                            this.DrawShape(f, color);
                        }
                        else if (!b.IsAwake()) {
                            color.SetRGB(0.6, 0.6, 0.6);
                            this.DrawShape(f, color);
                        }
                        else {
                            color.SetRGB(0.9, 0.7, 0.7);
                            this.DrawShape(f, color);
                        }
                    }
                    this.m_debugDraw.PopTransform(xf);
                }
            }
            if (flags & b2Draw_2.b2DrawFlags.e_particleBit) {
                for (var p = this.m_particleSystemList; p; p = p.m_next) {
                    this.DrawParticleSystem(p);
                }
            }
            if (flags & b2Draw_2.b2DrawFlags.e_jointBit) {
                for (var j = this.m_jointList; j; j = j.m_next) {
                    this.DrawJoint(j);
                }
            }
            if (flags & b2Draw_2.b2DrawFlags.e_aabbBit) {
                color.SetRGB(0.9, 0.3, 0.9);
                var vs = b2World.DrawDebugData_s_vs;
                for (var b = this.m_bodyList; b; b = b.m_next) {
                    if (!b.IsActive()) {
                        continue;
                    }
                    for (var f = b.GetFixtureList(); f; f = f.m_next) {
                        for (var i = 0; i < f.m_proxyCount; ++i) {
                            var proxy = f.m_proxies[i];
                            var aabb = proxy.treeNode.aabb;
                            vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
                            vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
                            vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
                            vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
                            this.m_debugDraw.DrawPolygon(vs, 4, color);
                        }
                    }
                }
            }
            if (flags & b2Draw_2.b2DrawFlags.e_centerOfMassBit) {
                for (var b = this.m_bodyList; b; b = b.m_next) {
                    var xf = b2World.DrawDebugData_s_xf;
                    xf.q.Copy(b.m_xf.q);
                    xf.p.Copy(b.GetWorldCenter());
                    this.m_debugDraw.DrawTransform(xf);
                }
            }
            if (flags & b2Draw_2.b2DrawFlags.e_controllerBit) {
                for (var c = this.m_controllerList; c; c = c.m_next) {
                    c.Draw(this.m_debugDraw);
                }
            }
        };
        b2World.prototype.QueryAABB = function (callback, aabb, fn) {
            this.m_contactManager.m_broadPhase.Query(aabb, function (proxy) {
                var fixture_proxy = proxy.userData;
                var fixture = fixture_proxy.fixture;
                if (callback) {
                    return callback.ReportFixture(fixture);
                }
                else if (fn) {
                    return fn(fixture);
                }
                return true;
            });
            if (callback instanceof b2WorldCallbacks_3.b2QueryCallback) {
                for (var p = this.m_particleSystemList; p; p = p.m_next) {
                    if (callback.ShouldQueryParticleSystem(p)) {
                        p.QueryAABB(callback, aabb);
                    }
                }
            }
        };
        b2World.prototype.QueryAllAABB = function (aabb, out) {
            if (out === void 0) { out = []; }
            this.QueryAABB(null, aabb, function (fixture) { out.push(fixture); return true; });
            return out;
        };
        b2World.prototype.QueryPointAABB = function (callback, point, fn) {
            this.m_contactManager.m_broadPhase.QueryPoint(point, function (proxy) {
                var fixture_proxy = proxy.userData;
                var fixture = fixture_proxy.fixture;
                if (callback) {
                    return callback.ReportFixture(fixture);
                }
                else if (fn) {
                    return fn(fixture);
                }
                return true;
            });
            if (callback instanceof b2WorldCallbacks_3.b2QueryCallback) {
                for (var p = this.m_particleSystemList; p; p = p.m_next) {
                    if (callback.ShouldQueryParticleSystem(p)) {
                        p.QueryPointAABB(callback, point);
                    }
                }
            }
        };
        b2World.prototype.QueryAllPointAABB = function (point, out) {
            if (out === void 0) { out = []; }
            this.QueryPointAABB(null, point, function (fixture) { out.push(fixture); return true; });
            return out;
        };
        b2World.prototype.QueryFixtureShape = function (callback, shape, index, transform, fn) {
            var aabb = b2World.QueryFixtureShape_s_aabb;
            shape.ComputeAABB(aabb, transform, index);
            this.m_contactManager.m_broadPhase.Query(aabb, function (proxy) {
                var fixture_proxy = proxy.userData;
                var fixture = fixture_proxy.fixture;
                if (b2Collision_10.b2TestOverlapShape(shape, index, fixture.GetShape(), fixture_proxy.childIndex, transform, fixture.GetBody().GetTransform())) {
                    if (callback) {
                        return callback.ReportFixture(fixture);
                    }
                    else if (fn) {
                        return fn(fixture);
                    }
                }
                return true;
            });
            if (callback instanceof b2WorldCallbacks_3.b2QueryCallback) {
                for (var p = this.m_particleSystemList; p; p = p.m_next) {
                    if (callback.ShouldQueryParticleSystem(p)) {
                        p.QueryAABB(callback, aabb);
                    }
                }
            }
        };
        b2World.prototype.QueryAllFixtureShape = function (shape, index, transform, out) {
            if (out === void 0) { out = []; }
            this.QueryFixtureShape(null, shape, index, transform, function (fixture) { out.push(fixture); return true; });
            return out;
        };
        b2World.prototype.QueryFixturePoint = function (callback, point, fn) {
            this.m_contactManager.m_broadPhase.QueryPoint(point, function (proxy) {
                var fixture_proxy = proxy.userData;
                var fixture = fixture_proxy.fixture;
                if (fixture.TestPoint(point)) {
                    if (callback) {
                        return callback.ReportFixture(fixture);
                    }
                    else if (fn) {
                        return fn(fixture);
                    }
                }
                return true;
            });
            if (callback) {
                for (var p = this.m_particleSystemList; p; p = p.m_next) {
                    if (callback.ShouldQueryParticleSystem(p)) {
                        p.QueryPointAABB(callback, point);
                    }
                }
            }
        };
        b2World.prototype.QueryAllFixturePoint = function (point, out) {
            if (out === void 0) { out = []; }
            this.QueryFixturePoint(null, point, function (fixture) { out.push(fixture); return true; });
            return out;
        };
        b2World.prototype.RayCast = function (callback, point1, point2, fn) {
            var input = b2World.RayCast_s_input;
            input.maxFraction = 1;
            input.p1.Copy(point1);
            input.p2.Copy(point2);
            this.m_contactManager.m_broadPhase.RayCast(input, function (input, proxy) {
                var fixture_proxy = proxy.userData;
                var fixture = fixture_proxy.fixture;
                var index = fixture_proxy.childIndex;
                var output = b2World.RayCast_s_output;
                var hit = fixture.RayCast(output, input, index);
                if (hit) {
                    var fraction = output.fraction;
                    var point = b2World.RayCast_s_point;
                    point.Set((1 - fraction) * point1.x + fraction * point2.x, (1 - fraction) * point1.y + fraction * point2.y);
                    if (callback) {
                        return callback.ReportFixture(fixture, point, output.normal, fraction);
                    }
                    else if (fn) {
                        return fn(fixture, point, output.normal, fraction);
                    }
                }
                return input.maxFraction;
            });
            if (callback) {
                for (var p = this.m_particleSystemList; p; p = p.m_next) {
                    if (callback.ShouldQueryParticleSystem(p)) {
                        p.RayCast(callback, point1, point2);
                    }
                }
            }
        };
        b2World.prototype.RayCastOne = function (point1, point2) {
            var result = null;
            var min_fraction = 1;
            this.RayCast(null, point1, point2, function (fixture, point, normal, fraction) {
                if (fraction < min_fraction) {
                    min_fraction = fraction;
                    result = fixture;
                }
                return min_fraction;
            });
            return result;
        };
        b2World.prototype.RayCastAll = function (point1, point2, out) {
            if (out === void 0) { out = []; }
            this.RayCast(null, point1, point2, function (fixture, point, normal, fraction) {
                out.push(fixture);
                return 1;
            });
            return out;
        };
        b2World.prototype.GetBodyList = function () {
            return this.m_bodyList;
        };
        b2World.prototype.GetJointList = function () {
            return this.m_jointList;
        };
        b2World.prototype.GetParticleSystemList = function () {
            return this.m_particleSystemList;
        };
        b2World.prototype.GetContactList = function () {
            return this.m_contactManager.m_contactList;
        };
        b2World.prototype.SetAllowSleeping = function (flag) {
            if (flag === this.m_allowSleep) {
                return;
            }
            this.m_allowSleep = flag;
            if (!this.m_allowSleep) {
                for (var b = this.m_bodyList; b; b = b.m_next) {
                    b.SetAwake(true);
                }
            }
        };
        b2World.prototype.GetAllowSleeping = function () {
            return this.m_allowSleep;
        };
        b2World.prototype.SetWarmStarting = function (flag) {
            this.m_warmStarting = flag;
        };
        b2World.prototype.GetWarmStarting = function () {
            return this.m_warmStarting;
        };
        b2World.prototype.SetContinuousPhysics = function (flag) {
            this.m_continuousPhysics = flag;
        };
        b2World.prototype.GetContinuousPhysics = function () {
            return this.m_continuousPhysics;
        };
        b2World.prototype.SetSubStepping = function (flag) {
            this.m_subStepping = flag;
        };
        b2World.prototype.GetSubStepping = function () {
            return this.m_subStepping;
        };
        b2World.prototype.GetProxyCount = function () {
            return this.m_contactManager.m_broadPhase.GetProxyCount();
        };
        b2World.prototype.GetBodyCount = function () {
            return this.m_bodyCount;
        };
        b2World.prototype.GetJointCount = function () {
            return this.m_jointCount;
        };
        b2World.prototype.GetContactCount = function () {
            return this.m_contactManager.m_contactCount;
        };
        b2World.prototype.GetTreeHeight = function () {
            return this.m_contactManager.m_broadPhase.GetTreeHeight();
        };
        b2World.prototype.GetTreeBalance = function () {
            return this.m_contactManager.m_broadPhase.GetTreeBalance();
        };
        b2World.prototype.GetTreeQuality = function () {
            return this.m_contactManager.m_broadPhase.GetTreeQuality();
        };
        b2World.prototype.SetGravity = function (gravity, wake) {
            if (wake === void 0) { wake = true; }
            if (!b2Math_30.b2Vec2.IsEqualToV(this.m_gravity, gravity)) {
                this.m_gravity.Copy(gravity);
                if (wake) {
                    for (var b = this.m_bodyList; b; b = b.m_next) {
                        b.SetAwake(true);
                    }
                }
            }
        };
        b2World.prototype.GetGravity = function () {
            return this.m_gravity;
        };
        b2World.prototype.IsLocked = function () {
            return this.m_locked;
        };
        b2World.prototype.SetAutoClearForces = function (flag) {
            this.m_clearForces = flag;
        };
        b2World.prototype.GetAutoClearForces = function () {
            return this.m_clearForces;
        };
        b2World.prototype.ShiftOrigin = function (newOrigin) {
            if (this.IsLocked()) {
                throw new Error();
            }
            for (var b = this.m_bodyList; b; b = b.m_next) {
                b.m_xf.p.SelfSub(newOrigin);
                b.m_sweep.c0.SelfSub(newOrigin);
                b.m_sweep.c.SelfSub(newOrigin);
            }
            for (var j = this.m_jointList; j; j = j.m_next) {
                j.ShiftOrigin(newOrigin);
            }
            this.m_contactManager.m_broadPhase.ShiftOrigin(newOrigin);
        };
        b2World.prototype.GetContactManager = function () {
            return this.m_contactManager;
        };
        b2World.prototype.GetProfile = function () {
            return this.m_profile;
        };
        b2World.prototype.Dump = function (log) {
            if (this.m_locked) {
                return;
            }
            log("const g: b2Vec2 = new b2Vec2(%.15f, %.15f);\n", this.m_gravity.x, this.m_gravity.y);
            log("this.m_world.SetGravity(g);\n");
            log("const bodies: b2Body[] = [];\n");
            log("const joints: b2Joint[] = [];\n");
            var i = 0;
            for (var b = this.m_bodyList; b; b = b.m_next) {
                b.m_islandIndex = i;
                b.Dump(log);
                ++i;
            }
            i = 0;
            for (var j = this.m_jointList; j; j = j.m_next) {
                j.m_index = i;
                ++i;
            }
            for (var j = this.m_jointList; j; j = j.m_next) {
                if (j.m_type === b2Joint_14.b2JointType.e_gearJoint) {
                    continue;
                }
                log("{\n");
                j.Dump(log);
                log("}\n");
            }
            for (var j = this.m_jointList; j; j = j.m_next) {
                if (j.m_type !== b2Joint_14.b2JointType.e_gearJoint) {
                    continue;
                }
                log("{\n");
                j.Dump(log);
                log("}\n");
            }
        };
        b2World.prototype.DrawJoint = function (joint) {
            if (this.m_debugDraw === null) {
                return;
            }
            var bodyA = joint.GetBodyA();
            var bodyB = joint.GetBodyB();
            var xf1 = bodyA.m_xf;
            var xf2 = bodyB.m_xf;
            var x1 = xf1.p;
            var x2 = xf2.p;
            var p1 = joint.GetAnchorA(b2World.DrawJoint_s_p1);
            var p2 = joint.GetAnchorB(b2World.DrawJoint_s_p2);
            var color = b2World.DrawJoint_s_color.SetRGB(0.5, 0.8, 0.8);
            switch (joint.m_type) {
                case b2Joint_14.b2JointType.e_distanceJoint:
                    this.m_debugDraw.DrawSegment(p1, p2, color);
                    break;
                case b2Joint_14.b2JointType.e_pulleyJoint:
                    {
                        var pulley = joint;
                        var s1 = pulley.GetGroundAnchorA();
                        var s2 = pulley.GetGroundAnchorB();
                        this.m_debugDraw.DrawSegment(s1, p1, color);
                        this.m_debugDraw.DrawSegment(s2, p2, color);
                        this.m_debugDraw.DrawSegment(s1, s2, color);
                    }
                    break;
                case b2Joint_14.b2JointType.e_mouseJoint:
                    this.m_debugDraw.DrawSegment(p1, p2, color);
                    break;
                default:
                    this.m_debugDraw.DrawSegment(x1, p1, color);
                    this.m_debugDraw.DrawSegment(p1, p2, color);
                    this.m_debugDraw.DrawSegment(x2, p2, color);
            }
        };
        b2World.prototype.DrawShape = function (fixture, color) {
            if (this.m_debugDraw === null) {
                return;
            }
            var shape = fixture.GetShape();
            switch (shape.m_type) {
                case b2Shape_7.b2ShapeType.e_circleShape:
                    {
                        var circle = shape;
                        var center = circle.m_p;
                        var radius = circle.m_radius;
                        var axis = b2Math_30.b2Vec2.UNITX;
                        this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
                    }
                    break;
                case b2Shape_7.b2ShapeType.e_edgeShape:
                    {
                        var edge = shape;
                        var v1 = edge.m_vertex1;
                        var v2 = edge.m_vertex2;
                        this.m_debugDraw.DrawSegment(v1, v2, color);
                    }
                    break;
                case b2Shape_7.b2ShapeType.e_chainShape:
                    {
                        var chain = shape;
                        var count = chain.m_count;
                        var vertices = chain.m_vertices;
                        var v1 = vertices[0];
                        this.m_debugDraw.DrawCircle(v1, 0.05, color);
                        for (var i = 1; i < count; ++i) {
                            var v2 = vertices[i];
                            this.m_debugDraw.DrawSegment(v1, v2, color);
                            this.m_debugDraw.DrawCircle(v2, 0.05, color);
                            v1 = v2;
                        }
                    }
                    break;
                case b2Shape_7.b2ShapeType.e_polygonShape:
                    {
                        var poly = shape;
                        var vertexCount = poly.m_count;
                        var vertices = poly.m_vertices;
                        this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
                    }
                    break;
            }
        };
        b2World.prototype.Solve = function (step) {
            for (var b = this.m_bodyList; b; b = b.m_next) {
                b.m_xf0.Copy(b.m_xf);
            }
            for (var controller = this.m_controllerList; controller; controller = controller.m_next) {
                controller.Step(step);
            }
            this.m_profile.solveInit = 0;
            this.m_profile.solveVelocity = 0;
            this.m_profile.solvePosition = 0;
            var island = this.m_island;
            island.Initialize(this.m_bodyCount, this.m_contactManager.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener);
            for (var b = this.m_bodyList; b; b = b.m_next) {
                b.m_islandFlag = false;
            }
            for (var c = this.m_contactManager.m_contactList; c; c = c.m_next) {
                c.m_islandFlag = false;
            }
            for (var j = this.m_jointList; j; j = j.m_next) {
                j.m_islandFlag = false;
            }
            var stack = this.s_stack;
            for (var seed = this.m_bodyList; seed; seed = seed.m_next) {
                if (seed.m_islandFlag) {
                    continue;
                }
                if (!seed.IsAwake() || !seed.IsActive()) {
                    continue;
                }
                if (seed.GetType() === b2Body_3.b2BodyType.b2_staticBody) {
                    continue;
                }
                island.Clear();
                var stackCount = 0;
                stack[stackCount++] = seed;
                seed.m_islandFlag = true;
                while (stackCount > 0) {
                    var b = stack[--stackCount];
                    if (!b) {
                        throw new Error();
                    }
                    island.AddBody(b);
                    b.SetAwake(true);
                    if (b.GetType() === b2Body_3.b2BodyType.b2_staticBody) {
                        continue;
                    }
                    for (var ce = b.m_contactList; ce; ce = ce.next) {
                        var contact = ce.contact;
                        if (contact.m_islandFlag) {
                            continue;
                        }
                        if (!contact.IsEnabled() || !contact.IsTouching()) {
                            continue;
                        }
                        var sensorA = contact.m_fixtureA.m_isSensor;
                        var sensorB = contact.m_fixtureB.m_isSensor;
                        if (sensorA || sensorB) {
                            continue;
                        }
                        island.AddContact(contact);
                        contact.m_islandFlag = true;
                        var other = ce.other;
                        if (!other) {
                            throw new Error();
                        }
                        if (other.m_islandFlag) {
                            continue;
                        }
                        stack[stackCount++] = other;
                        other.m_islandFlag = true;
                    }
                    for (var je = b.m_jointList; je; je = je.next) {
                        if (je.joint.m_islandFlag) {
                            continue;
                        }
                        var other = je.other;
                        if (!other.IsActive()) {
                            continue;
                        }
                        island.AddJoint(je.joint);
                        je.joint.m_islandFlag = true;
                        if (other.m_islandFlag) {
                            continue;
                        }
                        stack[stackCount++] = other;
                        other.m_islandFlag = true;
                    }
                }
                var profile = new b2TimeStep_3.b2Profile();
                island.Solve(profile, step, this.m_gravity, this.m_allowSleep);
                this.m_profile.solveInit += profile.solveInit;
                this.m_profile.solveVelocity += profile.solveVelocity;
                this.m_profile.solvePosition += profile.solvePosition;
                for (var i = 0; i < island.m_bodyCount; ++i) {
                    var b = island.m_bodies[i];
                    if (b.GetType() === b2Body_3.b2BodyType.b2_staticBody) {
                        b.m_islandFlag = false;
                    }
                }
            }
            for (var i = 0; i < stack.length; ++i) {
                if (!stack[i]) {
                    break;
                }
                stack[i] = null;
            }
            var timer = new b2Timer_3.b2Timer();
            for (var b = this.m_bodyList; b; b = b.m_next) {
                if (!b.m_islandFlag) {
                    continue;
                }
                if (b.GetType() === b2Body_3.b2BodyType.b2_staticBody) {
                    continue;
                }
                b.SynchronizeFixtures();
            }
            this.m_contactManager.FindNewContacts();
            this.m_profile.broadphase = timer.GetMilliseconds();
        };
        b2World.prototype.SolveTOI = function (step) {
            var island = this.m_island;
            island.Initialize(2 * b2Settings_35.b2_maxTOIContacts, b2Settings_35.b2_maxTOIContacts, 0, null, this.m_contactManager.m_contactListener);
            if (this.m_stepComplete) {
                for (var b = this.m_bodyList; b; b = b.m_next) {
                    b.m_islandFlag = false;
                    b.m_sweep.alpha0 = 0;
                }
                for (var c = this.m_contactManager.m_contactList; c; c = c.m_next) {
                    c.m_toiFlag = false;
                    c.m_islandFlag = false;
                    c.m_toiCount = 0;
                    c.m_toi = 1;
                }
            }
            for (;;) {
                var minContact = null;
                var minAlpha = 1;
                for (var c = this.m_contactManager.m_contactList; c; c = c.m_next) {
                    if (!c.IsEnabled()) {
                        continue;
                    }
                    if (c.m_toiCount > b2Settings_35.b2_maxSubSteps) {
                        continue;
                    }
                    var alpha = 1;
                    if (c.m_toiFlag) {
                        alpha = c.m_toi;
                    }
                    else {
                        var fA_1 = c.GetFixtureA();
                        var fB_1 = c.GetFixtureB();
                        if (fA_1.IsSensor() || fB_1.IsSensor()) {
                            continue;
                        }
                        var bA_1 = fA_1.GetBody();
                        var bB_1 = fB_1.GetBody();
                        var typeA = bA_1.m_type;
                        var typeB = bB_1.m_type;
                        var activeA = bA_1.IsAwake() && typeA !== b2Body_3.b2BodyType.b2_staticBody;
                        var activeB = bB_1.IsAwake() && typeB !== b2Body_3.b2BodyType.b2_staticBody;
                        if (!activeA && !activeB) {
                            continue;
                        }
                        var collideA = bA_1.IsBullet() || typeA !== b2Body_3.b2BodyType.b2_dynamicBody;
                        var collideB = bB_1.IsBullet() || typeB !== b2Body_3.b2BodyType.b2_dynamicBody;
                        if (!collideA && !collideB) {
                            continue;
                        }
                        var alpha0 = bA_1.m_sweep.alpha0;
                        if (bA_1.m_sweep.alpha0 < bB_1.m_sweep.alpha0) {
                            alpha0 = bB_1.m_sweep.alpha0;
                            bA_1.m_sweep.Advance(alpha0);
                        }
                        else if (bB_1.m_sweep.alpha0 < bA_1.m_sweep.alpha0) {
                            alpha0 = bA_1.m_sweep.alpha0;
                            bB_1.m_sweep.Advance(alpha0);
                        }
                        var indexA = c.GetChildIndexA();
                        var indexB = c.GetChildIndexB();
                        var input = b2World.SolveTOI_s_toi_input;
                        input.proxyA.SetShape(fA_1.GetShape(), indexA);
                        input.proxyB.SetShape(fB_1.GetShape(), indexB);
                        input.sweepA.Copy(bA_1.m_sweep);
                        input.sweepB.Copy(bB_1.m_sweep);
                        input.tMax = 1;
                        var output = b2World.SolveTOI_s_toi_output;
                        b2TimeOfImpact_1.b2TimeOfImpact(output, input);
                        var beta = output.t;
                        if (output.state === b2TimeOfImpact_1.b2TOIOutputState.e_touching) {
                            alpha = b2Math_30.b2Min(alpha0 + (1 - alpha0) * beta, 1);
                        }
                        else {
                            alpha = 1;
                        }
                        c.m_toi = alpha;
                        c.m_toiFlag = true;
                    }
                    if (alpha < minAlpha) {
                        minContact = c;
                        minAlpha = alpha;
                    }
                }
                if (minContact === null || 1 - 10 * b2Settings_35.b2_epsilon < minAlpha) {
                    this.m_stepComplete = true;
                    break;
                }
                var fA = minContact.GetFixtureA();
                var fB = minContact.GetFixtureB();
                var bA = fA.GetBody();
                var bB = fB.GetBody();
                var backup1 = b2World.SolveTOI_s_backup1.Copy(bA.m_sweep);
                var backup2 = b2World.SolveTOI_s_backup2.Copy(bB.m_sweep);
                bA.Advance(minAlpha);
                bB.Advance(minAlpha);
                minContact.Update(this.m_contactManager.m_contactListener);
                minContact.m_toiFlag = false;
                ++minContact.m_toiCount;
                if (!minContact.IsEnabled() || !minContact.IsTouching()) {
                    minContact.SetEnabled(false);
                    bA.m_sweep.Copy(backup1);
                    bB.m_sweep.Copy(backup2);
                    bA.SynchronizeTransform();
                    bB.SynchronizeTransform();
                    continue;
                }
                bA.SetAwake(true);
                bB.SetAwake(true);
                island.Clear();
                island.AddBody(bA);
                island.AddBody(bB);
                island.AddContact(minContact);
                bA.m_islandFlag = true;
                bB.m_islandFlag = true;
                minContact.m_islandFlag = true;
                for (var i = 0; i < 2; ++i) {
                    var body = (i === 0) ? (bA) : (bB);
                    if (body.m_type === b2Body_3.b2BodyType.b2_dynamicBody) {
                        for (var ce = body.m_contactList; ce; ce = ce.next) {
                            if (island.m_bodyCount === island.m_bodyCapacity) {
                                break;
                            }
                            if (island.m_contactCount === island.m_contactCapacity) {
                                break;
                            }
                            var contact = ce.contact;
                            if (contact.m_islandFlag) {
                                continue;
                            }
                            var other = ce.other;
                            if (other.m_type === b2Body_3.b2BodyType.b2_dynamicBody &&
                                !body.IsBullet() && !other.IsBullet()) {
                                continue;
                            }
                            var sensorA = contact.m_fixtureA.m_isSensor;
                            var sensorB = contact.m_fixtureB.m_isSensor;
                            if (sensorA || sensorB) {
                                continue;
                            }
                            var backup = b2World.SolveTOI_s_backup.Copy(other.m_sweep);
                            if (!other.m_islandFlag) {
                                other.Advance(minAlpha);
                            }
                            contact.Update(this.m_contactManager.m_contactListener);
                            if (!contact.IsEnabled()) {
                                other.m_sweep.Copy(backup);
                                other.SynchronizeTransform();
                                continue;
                            }
                            if (!contact.IsTouching()) {
                                other.m_sweep.Copy(backup);
                                other.SynchronizeTransform();
                                continue;
                            }
                            contact.m_islandFlag = true;
                            island.AddContact(contact);
                            if (other.m_islandFlag) {
                                continue;
                            }
                            other.m_islandFlag = true;
                            if (other.m_type !== b2Body_3.b2BodyType.b2_staticBody) {
                                other.SetAwake(true);
                            }
                            island.AddBody(other);
                        }
                    }
                }
                var subStep = b2World.SolveTOI_s_subStep;
                subStep.dt = (1 - minAlpha) * step.dt;
                subStep.inv_dt = 1 / subStep.dt;
                subStep.dtRatio = 1;
                subStep.positionIterations = 20;
                subStep.velocityIterations = step.velocityIterations;
                subStep.particleIterations = step.particleIterations;
                subStep.warmStarting = false;
                island.SolveTOI(subStep, bA.m_islandIndex, bB.m_islandIndex);
                for (var i = 0; i < island.m_bodyCount; ++i) {
                    var body = island.m_bodies[i];
                    body.m_islandFlag = false;
                    if (body.m_type !== b2Body_3.b2BodyType.b2_dynamicBody) {
                        continue;
                    }
                    body.SynchronizeFixtures();
                    for (var ce = body.m_contactList; ce; ce = ce.next) {
                        ce.contact.m_toiFlag = false;
                        ce.contact.m_islandFlag = false;
                    }
                }
                this.m_contactManager.FindNewContacts();
                if (this.m_subStepping) {
                    this.m_stepComplete = false;
                    break;
                }
            }
        };
        b2World.prototype.AddController = function (controller) {
            controller.m_next = this.m_controllerList;
            controller.m_prev = null;
            if (this.m_controllerList) {
                this.m_controllerList.m_prev = controller;
            }
            this.m_controllerList = controller;
            ++this.m_controllerCount;
            return controller;
        };
        b2World.prototype.RemoveController = function (controller) {
            if (controller.m_prev) {
                controller.m_prev.m_next = controller.m_next;
            }
            if (controller.m_next) {
                controller.m_next.m_prev = controller.m_prev;
            }
            if (this.m_controllerList === controller) {
                this.m_controllerList = controller.m_next;
            }
            --this.m_controllerCount;
            controller.m_prev = null;
            controller.m_next = null;
            return controller;
        };
        b2World.Step_s_step = new b2TimeStep_3.b2TimeStep();
        b2World.Step_s_stepTimer = new b2Timer_3.b2Timer();
        b2World.Step_s_timer = new b2Timer_3.b2Timer();
        b2World.DrawDebugData_s_color = new b2Draw_2.b2Color(0, 0, 0);
        b2World.DrawDebugData_s_vs = b2Math_30.b2Vec2.MakeArray(4);
        b2World.DrawDebugData_s_xf = new b2Math_30.b2Transform();
        b2World.QueryFixtureShape_s_aabb = new b2Collision_10.b2AABB();
        b2World.RayCast_s_input = new b2Collision_10.b2RayCastInput();
        b2World.RayCast_s_output = new b2Collision_10.b2RayCastOutput();
        b2World.RayCast_s_point = new b2Math_30.b2Vec2();
        b2World.DrawJoint_s_p1 = new b2Math_30.b2Vec2();
        b2World.DrawJoint_s_p2 = new b2Math_30.b2Vec2();
        b2World.DrawJoint_s_color = new b2Draw_2.b2Color(0.5, 0.8, 0.8);
        b2World.SolveTOI_s_subStep = new b2TimeStep_3.b2TimeStep();
        b2World.SolveTOI_s_backup = new b2Math_30.b2Sweep();
        b2World.SolveTOI_s_backup1 = new b2Math_30.b2Sweep();
        b2World.SolveTOI_s_backup2 = new b2Math_30.b2Sweep();
        b2World.SolveTOI_s_toi_input = new b2TimeOfImpact_1.b2TOIInput();
        b2World.SolveTOI_s_toi_output = new b2TimeOfImpact_1.b2TOIOutput();
        return b2World;
    }());
    exports.b2World = b2World;
});
define("Particle/b2StackQueue", ["require", "exports", "Common/b2Settings"], function (require, exports, b2Settings_37) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2StackQueue = (function () {
        function b2StackQueue(capacity) {
            this.m_front = 0;
            this.m_back = 0;
            this.m_capacity = 0;
            this.m_buffer = b2Settings_37.b2MakeArray(capacity, function (index) { return null; });
            this.m_capacity = capacity;
        }
        b2StackQueue.prototype.Push = function (item) {
            if (this.m_back >= this.m_capacity) {
                for (var i = this.m_front; i < this.m_back; i++) {
                    this.m_buffer[i - this.m_front] = this.m_buffer[i];
                }
                this.m_back -= this.m_front;
                this.m_front = 0;
                if (this.m_back >= this.m_capacity) {
                    if (this.m_capacity > 0) {
                        this.m_buffer.concat(b2Settings_37.b2MakeArray(this.m_capacity, function (index) { return null; }));
                        this.m_capacity *= 2;
                    }
                    else {
                        this.m_buffer.concat(b2Settings_37.b2MakeArray(1, function (index) { return null; }));
                        this.m_capacity = 1;
                    }
                }
            }
            this.m_buffer[this.m_back] = item;
            this.m_back++;
        };
        b2StackQueue.prototype.Pop = function () {
            this.m_buffer[this.m_front] = null;
            this.m_front++;
        };
        b2StackQueue.prototype.Empty = function () {
            return this.m_front === this.m_back;
        };
        b2StackQueue.prototype.Front = function () {
            var item = this.m_buffer[this.m_front];
            if (!item) {
                throw new Error();
            }
            return item;
        };
        return b2StackQueue;
    }());
    exports.b2StackQueue = b2StackQueue;
});
define("Particle/b2VoronoiDiagram", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Particle/b2StackQueue"], function (require, exports, b2Settings_38, b2Math_31, b2StackQueue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2VoronoiDiagram = (function () {
        function b2VoronoiDiagram(generatorCapacity) {
            this.m_generatorCapacity = 0;
            this.m_generatorCount = 0;
            this.m_countX = 0;
            this.m_countY = 0;
            this.m_diagram = [];
            this.m_generatorBuffer = b2Settings_38.b2MakeArray(generatorCapacity, function (index) { return new b2VoronoiDiagram.Generator(); });
            this.m_generatorCapacity = generatorCapacity;
        }
        b2VoronoiDiagram.prototype.AddGenerator = function (center, tag, necessary) {
            var g = this.m_generatorBuffer[this.m_generatorCount++];
            g.center.Copy(center);
            g.tag = tag;
            g.necessary = necessary;
        };
        b2VoronoiDiagram.prototype.Generate = function (radius, margin) {
            var inverseRadius = 1 / radius;
            var lower = new b2Math_31.b2Vec2(+b2Settings_38.b2_maxFloat, +b2Settings_38.b2_maxFloat);
            var upper = new b2Math_31.b2Vec2(-b2Settings_38.b2_maxFloat, -b2Settings_38.b2_maxFloat);
            var necessary_count = 0;
            for (var k = 0; k < this.m_generatorCount; k++) {
                var g = this.m_generatorBuffer[k];
                if (g.necessary) {
                    b2Math_31.b2Vec2.MinV(lower, g.center, lower);
                    b2Math_31.b2Vec2.MaxV(upper, g.center, upper);
                    ++necessary_count;
                }
            }
            if (necessary_count === 0) {
                this.m_countX = 0;
                this.m_countY = 0;
                return;
            }
            lower.x -= margin;
            lower.y -= margin;
            upper.x += margin;
            upper.y += margin;
            this.m_countX = 1 + Math.floor(inverseRadius * (upper.x - lower.x));
            this.m_countY = 1 + Math.floor(inverseRadius * (upper.y - lower.y));
            this.m_diagram = [];
            var queue = new b2StackQueue_1.b2StackQueue(4 * this.m_countX * this.m_countY);
            for (var k = 0; k < this.m_generatorCount; k++) {
                var g = this.m_generatorBuffer[k];
                g.center.SelfSub(lower).SelfMul(inverseRadius);
                var x = Math.floor(g.center.x);
                var y = Math.floor(g.center.y);
                if (x >= 0 && y >= 0 && x < this.m_countX && y < this.m_countY) {
                    queue.Push(new b2VoronoiDiagram.Task(x, y, x + y * this.m_countX, g));
                }
            }
            while (!queue.Empty()) {
                var task = queue.Front();
                var x = task.m_x;
                var y = task.m_y;
                var i = task.m_i;
                var g = task.m_generator;
                queue.Pop();
                if (!this.m_diagram[i]) {
                    this.m_diagram[i] = g;
                    if (x > 0) {
                        queue.Push(new b2VoronoiDiagram.Task(x - 1, y, i - 1, g));
                    }
                    if (y > 0) {
                        queue.Push(new b2VoronoiDiagram.Task(x, y - 1, i - this.m_countX, g));
                    }
                    if (x < this.m_countX - 1) {
                        queue.Push(new b2VoronoiDiagram.Task(x + 1, y, i + 1, g));
                    }
                    if (y < this.m_countY - 1) {
                        queue.Push(new b2VoronoiDiagram.Task(x, y + 1, i + this.m_countX, g));
                    }
                }
            }
            for (var y = 0; y < this.m_countY; y++) {
                for (var x = 0; x < this.m_countX - 1; x++) {
                    var i = x + y * this.m_countX;
                    var a = this.m_diagram[i];
                    var b = this.m_diagram[i + 1];
                    if (a !== b) {
                        queue.Push(new b2VoronoiDiagram.Task(x, y, i, b));
                        queue.Push(new b2VoronoiDiagram.Task(x + 1, y, i + 1, a));
                    }
                }
            }
            for (var y = 0; y < this.m_countY - 1; y++) {
                for (var x = 0; x < this.m_countX; x++) {
                    var i = x + y * this.m_countX;
                    var a = this.m_diagram[i];
                    var b = this.m_diagram[i + this.m_countX];
                    if (a !== b) {
                        queue.Push(new b2VoronoiDiagram.Task(x, y, i, b));
                        queue.Push(new b2VoronoiDiagram.Task(x, y + 1, i + this.m_countX, a));
                    }
                }
            }
            while (!queue.Empty()) {
                var task = queue.Front();
                var x = task.m_x;
                var y = task.m_y;
                var i = task.m_i;
                var k = task.m_generator;
                queue.Pop();
                var a = this.m_diagram[i];
                var b = k;
                if (a !== b) {
                    var ax = a.center.x - x;
                    var ay = a.center.y - y;
                    var bx = b.center.x - x;
                    var by = b.center.y - y;
                    var a2 = ax * ax + ay * ay;
                    var b2 = bx * bx + by * by;
                    if (a2 > b2) {
                        this.m_diagram[i] = b;
                        if (x > 0) {
                            queue.Push(new b2VoronoiDiagram.Task(x - 1, y, i - 1, b));
                        }
                        if (y > 0) {
                            queue.Push(new b2VoronoiDiagram.Task(x, y - 1, i - this.m_countX, b));
                        }
                        if (x < this.m_countX - 1) {
                            queue.Push(new b2VoronoiDiagram.Task(x + 1, y, i + 1, b));
                        }
                        if (y < this.m_countY - 1) {
                            queue.Push(new b2VoronoiDiagram.Task(x, y + 1, i + this.m_countX, b));
                        }
                    }
                }
            }
        };
        b2VoronoiDiagram.prototype.GetNodes = function (callback) {
            for (var y = 0; y < this.m_countY - 1; y++) {
                for (var x = 0; x < this.m_countX - 1; x++) {
                    var i = x + y * this.m_countX;
                    var a = this.m_diagram[i];
                    var b = this.m_diagram[i + 1];
                    var c = this.m_diagram[i + this.m_countX];
                    var d = this.m_diagram[i + 1 + this.m_countX];
                    if (b !== c) {
                        if (a !== b && a !== c &&
                            (a.necessary || b.necessary || c.necessary)) {
                            callback(a.tag, b.tag, c.tag);
                        }
                        if (d !== b && d !== c &&
                            (a.necessary || b.necessary || c.necessary)) {
                            callback(b.tag, d.tag, c.tag);
                        }
                    }
                }
            }
        };
        return b2VoronoiDiagram;
    }());
    exports.b2VoronoiDiagram = b2VoronoiDiagram;
    (function (b2VoronoiDiagram) {
        var Generator = (function () {
            function Generator() {
                this.center = new b2Math_31.b2Vec2();
                this.tag = 0;
                this.necessary = false;
            }
            return Generator;
        }());
        b2VoronoiDiagram.Generator = Generator;
        var Task = (function () {
            function Task(x, y, i, g) {
                this.m_x = x;
                this.m_y = y;
                this.m_i = i;
                this.m_generator = g;
            }
            return Task;
        }());
        b2VoronoiDiagram.Task = Task;
    })(b2VoronoiDiagram = exports.b2VoronoiDiagram || (exports.b2VoronoiDiagram = {}));
    exports.b2VoronoiDiagram = b2VoronoiDiagram;
});
define("Particle/b2ParticleSystem", ["require", "exports", "Common/b2Settings", "Common/b2Settings", "Common/b2Math", "Common/b2Draw", "Collision/b2Collision", "Collision/Shapes/b2Shape", "Collision/Shapes/b2EdgeShape", "Dynamics/b2TimeStep", "Dynamics/b2WorldCallbacks", "Particle/b2Particle", "Particle/b2ParticleGroup", "Particle/b2VoronoiDiagram"], function (require, exports, b2Settings_39, b2Settings_40, b2Math_32, b2Draw_3, b2Collision_11, b2Shape_8, b2EdgeShape_4, b2TimeStep_4, b2WorldCallbacks_4, b2Particle_2, b2ParticleGroup_1, b2VoronoiDiagram_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function std_iter_swap(array, a, b) {
        var tmp = array[a];
        array[a] = array[b];
        array[b] = tmp;
    }
    function default_compare(a, b) { return a < b; }
    function std_sort(array, first, len, cmp) {
        if (first === void 0) { first = 0; }
        if (len === void 0) { len = array.length - first; }
        if (cmp === void 0) { cmp = default_compare; }
        var left = first;
        var stack = [];
        var pos = 0;
        for (;;) {
            for (; left + 1 < len; len++) {
                var pivot = array[left + Math.floor(Math.random() * (len - left))];
                stack[pos++] = len;
                for (var right = left - 1;;) {
                    while (cmp(array[++right], pivot)) { }
                    while (cmp(pivot, array[--len])) { }
                    if (right >= len) {
                        break;
                    }
                    std_iter_swap(array, right, len);
                }
            }
            if (pos === 0) {
                break;
            }
            left = len;
            len = stack[--pos];
        }
        return array;
    }
    function std_stable_sort(array, first, len, cmp) {
        if (first === void 0) { first = 0; }
        if (len === void 0) { len = array.length - first; }
        if (cmp === void 0) { cmp = default_compare; }
        return std_sort(array, first, len, cmp);
    }
    function std_remove_if(array, predicate, length) {
        if (length === void 0) { length = array.length; }
        var l = 0;
        for (var c = 0; c < length; ++c) {
            if (predicate(array[c])) {
                continue;
            }
            if (c === l) {
                ++l;
                continue;
            }
            std_iter_swap(array, l++, c);
        }
        return l;
    }
    function std_lower_bound(array, first, last, val, cmp) {
        if (cmp === void 0) { cmp = default_compare; }
        var count = last - first;
        while (count > 0) {
            var step = Math.floor(count / 2);
            var it = first + step;
            if (cmp(array[it], val)) {
                first = ++it;
                count -= step + 1;
            }
            else {
                count = step;
            }
        }
        return first;
    }
    function std_upper_bound(array, first, last, val, cmp) {
        if (cmp === void 0) { cmp = default_compare; }
        var count = last - first;
        while (count > 0) {
            var step = Math.floor(count / 2);
            var it = first + step;
            if (!cmp(val, array[it])) {
                first = ++it;
                count -= step + 1;
            }
            else {
                count = step;
            }
        }
        return first;
    }
    function std_rotate(array, first, n_first, last) {
        var next = n_first;
        while (first !== next) {
            std_iter_swap(array, first++, next++);
            if (next === last) {
                next = n_first;
            }
            else if (first === n_first) {
                n_first = next;
            }
        }
    }
    function std_unique(array, first, last, cmp) {
        if (first === last) {
            return last;
        }
        var result = first;
        while (++first !== last) {
            if (!cmp(array[result], array[first])) {
                std_iter_swap(array, ++result, first);
            }
        }
        return ++result;
    }
    var b2GrowableBuffer = (function () {
        function b2GrowableBuffer(allocator) {
            this.data = [];
            this.count = 0;
            this.capacity = 0;
            this.allocator = allocator;
        }
        b2GrowableBuffer.prototype.Append = function () {
            if (this.count >= this.capacity) {
                this.Grow();
            }
            return this.count++;
        };
        b2GrowableBuffer.prototype.Reserve = function (newCapacity) {
            if (this.capacity >= newCapacity) {
                return;
            }
            for (var i = this.capacity; i < newCapacity; ++i) {
                this.data[i] = this.allocator();
            }
            this.capacity = newCapacity;
        };
        b2GrowableBuffer.prototype.Grow = function () {
            var newCapacity = this.capacity ? 2 * this.capacity : b2Settings_39.b2_minParticleSystemBufferCapacity;
            this.Reserve(newCapacity);
        };
        b2GrowableBuffer.prototype.Free = function () {
            if (this.data.length === 0) {
                return;
            }
            this.data = [];
            this.capacity = 0;
            this.count = 0;
        };
        b2GrowableBuffer.prototype.Shorten = function (newEnd) {
        };
        b2GrowableBuffer.prototype.Data = function () {
            return this.data;
        };
        b2GrowableBuffer.prototype.GetCount = function () {
            return this.count;
        };
        b2GrowableBuffer.prototype.SetCount = function (newCount) {
            this.count = newCount;
        };
        b2GrowableBuffer.prototype.GetCapacity = function () {
            return this.capacity;
        };
        b2GrowableBuffer.prototype.RemoveIf = function (pred) {
            this.count = std_remove_if(this.data, pred, this.count);
        };
        b2GrowableBuffer.prototype.Unique = function (pred) {
            this.count = std_unique(this.data, 0, this.count, pred);
        };
        return b2GrowableBuffer;
    }());
    exports.b2GrowableBuffer = b2GrowableBuffer;
    var b2FixtureParticleQueryCallback = (function (_super) {
        __extends(b2FixtureParticleQueryCallback, _super);
        function b2FixtureParticleQueryCallback(system) {
            var _this = _super.call(this) || this;
            _this.m_system = system;
            return _this;
        }
        b2FixtureParticleQueryCallback.prototype.ShouldQueryParticleSystem = function (system) {
            return false;
        };
        b2FixtureParticleQueryCallback.prototype.ReportFixture = function (fixture) {
            if (fixture.IsSensor()) {
                return true;
            }
            var shape = fixture.GetShape();
            var childCount = shape.GetChildCount();
            for (var childIndex = 0; childIndex < childCount; childIndex++) {
                var aabb = fixture.GetAABB(childIndex);
                var enumerator = this.m_system.GetInsideBoundsEnumerator(aabb);
                var index = void 0;
                while ((index = enumerator.GetNext()) >= 0) {
                    this.ReportFixtureAndParticle(fixture, childIndex, index);
                }
            }
            return true;
        };
        b2FixtureParticleQueryCallback.prototype.ReportParticle = function (system, index) {
            return false;
        };
        b2FixtureParticleQueryCallback.prototype.ReportFixtureAndParticle = function (fixture, childIndex, index) {
        };
        return b2FixtureParticleQueryCallback;
    }(b2WorldCallbacks_4.b2QueryCallback));
    exports.b2FixtureParticleQueryCallback = b2FixtureParticleQueryCallback;
    var b2ParticleContact = (function () {
        function b2ParticleContact() {
            this.indexA = 0;
            this.indexB = 0;
            this.weight = 0;
            this.normal = new b2Math_32.b2Vec2();
            this.flags = 0;
        }
        b2ParticleContact.prototype.SetIndices = function (a, b) {
            this.indexA = a;
            this.indexB = b;
        };
        b2ParticleContact.prototype.SetWeight = function (w) {
            this.weight = w;
        };
        b2ParticleContact.prototype.SetNormal = function (n) {
            this.normal.Copy(n);
        };
        b2ParticleContact.prototype.SetFlags = function (f) {
            this.flags = f;
        };
        b2ParticleContact.prototype.GetIndexA = function () {
            return this.indexA;
        };
        b2ParticleContact.prototype.GetIndexB = function () {
            return this.indexB;
        };
        b2ParticleContact.prototype.GetWeight = function () {
            return this.weight;
        };
        b2ParticleContact.prototype.GetNormal = function () {
            return this.normal;
        };
        b2ParticleContact.prototype.GetFlags = function () {
            return this.flags;
        };
        b2ParticleContact.prototype.IsEqual = function (rhs) {
            return this.indexA === rhs.indexA && this.indexB === rhs.indexB && this.flags === rhs.flags && this.weight === rhs.weight && this.normal.x === rhs.normal.x && this.normal.y === rhs.normal.y;
        };
        b2ParticleContact.prototype.IsNotEqual = function (rhs) {
            return !this.IsEqual(rhs);
        };
        b2ParticleContact.prototype.ApproximatelyEqual = function (rhs) {
            var MAX_WEIGHT_DIFF = 0.01;
            var MAX_NORMAL_DIFF_SQ = 0.01 * 0.01;
            return this.indexA === rhs.indexA && this.indexB === rhs.indexB && this.flags === rhs.flags && b2Math_32.b2Abs(this.weight - rhs.weight) < MAX_WEIGHT_DIFF && b2Math_32.b2Vec2.DistanceSquaredVV(this.normal, rhs.normal) < MAX_NORMAL_DIFF_SQ;
        };
        return b2ParticleContact;
    }());
    exports.b2ParticleContact = b2ParticleContact;
    var b2ParticleBodyContact = (function () {
        function b2ParticleBodyContact() {
            this.index = 0;
            this.weight = 0.0;
            this.normal = new b2Math_32.b2Vec2();
            this.mass = 0.0;
        }
        return b2ParticleBodyContact;
    }());
    exports.b2ParticleBodyContact = b2ParticleBodyContact;
    var b2ParticlePair = (function () {
        function b2ParticlePair() {
            this.indexA = 0;
            this.indexB = 0;
            this.flags = 0;
            this.strength = 0.0;
            this.distance = 0.0;
        }
        return b2ParticlePair;
    }());
    exports.b2ParticlePair = b2ParticlePair;
    var b2ParticleTriad = (function () {
        function b2ParticleTriad() {
            this.indexA = 0;
            this.indexB = 0;
            this.indexC = 0;
            this.flags = 0;
            this.strength = 0.0;
            this.pa = new b2Math_32.b2Vec2(0.0, 0.0);
            this.pb = new b2Math_32.b2Vec2(0.0, 0.0);
            this.pc = new b2Math_32.b2Vec2(0.0, 0.0);
            this.ka = 0.0;
            this.kb = 0.0;
            this.kc = 0.0;
            this.s = 0.0;
        }
        return b2ParticleTriad;
    }());
    exports.b2ParticleTriad = b2ParticleTriad;
    var b2ParticleSystemDef = (function () {
        function b2ParticleSystemDef() {
            this.strictContactCheck = false;
            this.density = 1.0;
            this.gravityScale = 1.0;
            this.radius = 1.0;
            this.maxCount = 0;
            this.pressureStrength = 0.005;
            this.dampingStrength = 1.0;
            this.elasticStrength = 0.25;
            this.springStrength = 0.25;
            this.viscousStrength = 0.25;
            this.surfaceTensionPressureStrength = 0.2;
            this.surfaceTensionNormalStrength = 0.2;
            this.repulsiveStrength = 1.0;
            this.powderStrength = 0.5;
            this.ejectionStrength = 0.5;
            this.staticPressureStrength = 0.2;
            this.staticPressureRelaxation = 0.2;
            this.staticPressureIterations = 8;
            this.colorMixingStrength = 0.5;
            this.destroyByAge = true;
            this.lifetimeGranularity = 1.0 / 60.0;
        }
        b2ParticleSystemDef.prototype.Copy = function (def) {
            this.strictContactCheck = def.strictContactCheck;
            this.density = def.density;
            this.gravityScale = def.gravityScale;
            this.radius = def.radius;
            this.maxCount = def.maxCount;
            this.pressureStrength = def.pressureStrength;
            this.dampingStrength = def.dampingStrength;
            this.elasticStrength = def.elasticStrength;
            this.springStrength = def.springStrength;
            this.viscousStrength = def.viscousStrength;
            this.surfaceTensionPressureStrength = def.surfaceTensionPressureStrength;
            this.surfaceTensionNormalStrength = def.surfaceTensionNormalStrength;
            this.repulsiveStrength = def.repulsiveStrength;
            this.powderStrength = def.powderStrength;
            this.ejectionStrength = def.ejectionStrength;
            this.staticPressureStrength = def.staticPressureStrength;
            this.staticPressureRelaxation = def.staticPressureRelaxation;
            this.staticPressureIterations = def.staticPressureIterations;
            this.colorMixingStrength = def.colorMixingStrength;
            this.destroyByAge = def.destroyByAge;
            this.lifetimeGranularity = def.lifetimeGranularity;
            return this;
        };
        b2ParticleSystemDef.prototype.Clone = function () {
            return new b2ParticleSystemDef().Copy(this);
        };
        return b2ParticleSystemDef;
    }());
    exports.b2ParticleSystemDef = b2ParticleSystemDef;
    var b2ParticleSystem = (function () {
        function b2ParticleSystem(def, world) {
            this.m_paused = false;
            this.m_timestamp = 0;
            this.m_allParticleFlags = 0;
            this.m_needsUpdateAllParticleFlags = false;
            this.m_allGroupFlags = 0;
            this.m_needsUpdateAllGroupFlags = false;
            this.m_hasForce = false;
            this.m_iterationIndex = 0;
            this.m_inverseDensity = 0.0;
            this.m_particleDiameter = 0.0;
            this.m_inverseDiameter = 0.0;
            this.m_squaredDiameter = 0.0;
            this.m_count = 0;
            this.m_internalAllocatedCapacity = 0;
            this.m_handleIndexBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_flagsBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_positionBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_velocityBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_forceBuffer = [];
            this.m_weightBuffer = [];
            this.m_staticPressureBuffer = [];
            this.m_accumulationBuffer = [];
            this.m_accumulation2Buffer = [];
            this.m_depthBuffer = [];
            this.m_colorBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_groupBuffer = [];
            this.m_userDataBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_stuckThreshold = 0;
            this.m_lastBodyContactStepBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_bodyContactCountBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_consecutiveContactStepsBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_stuckParticleBuffer = new b2GrowableBuffer(function () { return 0; });
            this.m_proxyBuffer = new b2GrowableBuffer(function () { return new b2ParticleSystem.Proxy(); });
            this.m_contactBuffer = new b2GrowableBuffer(function () { return new b2ParticleContact(); });
            this.m_bodyContactBuffer = new b2GrowableBuffer(function () { return new b2ParticleBodyContact(); });
            this.m_pairBuffer = new b2GrowableBuffer(function () { return new b2ParticlePair(); });
            this.m_triadBuffer = new b2GrowableBuffer(function () { return new b2ParticleTriad(); });
            this.m_expirationTimeBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_indexByExpirationTimeBuffer = new b2ParticleSystem.UserOverridableBuffer();
            this.m_timeElapsed = 0;
            this.m_expirationTimeBufferRequiresSorting = false;
            this.m_groupCount = 0;
            this.m_groupList = null;
            this.m_def = new b2ParticleSystemDef();
            this.m_prev = null;
            this.m_next = null;
            this.SetStrictContactCheck(def.strictContactCheck);
            this.SetDensity(def.density);
            this.SetGravityScale(def.gravityScale);
            this.SetRadius(def.radius);
            this.SetMaxParticleCount(def.maxCount);
            this.m_def = def.Clone();
            this.m_world = world;
            this.SetDestructionByAge(this.m_def.destroyByAge);
        }
        b2ParticleSystem.computeTag = function (x, y) {
            return ((((y + b2ParticleSystem.yOffset) >>> 0) << b2ParticleSystem.yShift) + ((b2ParticleSystem.xScale * x + b2ParticleSystem.xOffset) >>> 0)) >>> 0;
        };
        b2ParticleSystem.computeRelativeTag = function (tag, x, y) {
            return (tag + (y << b2ParticleSystem.yShift) + (x << b2ParticleSystem.xShift)) >>> 0;
        };
        b2ParticleSystem.prototype.Drop = function () {
            while (this.m_groupList) {
                this.DestroyParticleGroup(this.m_groupList);
            }
            this.FreeUserOverridableBuffer(this.m_handleIndexBuffer);
            this.FreeUserOverridableBuffer(this.m_flagsBuffer);
            this.FreeUserOverridableBuffer(this.m_lastBodyContactStepBuffer);
            this.FreeUserOverridableBuffer(this.m_bodyContactCountBuffer);
            this.FreeUserOverridableBuffer(this.m_consecutiveContactStepsBuffer);
            this.FreeUserOverridableBuffer(this.m_positionBuffer);
            this.FreeUserOverridableBuffer(this.m_velocityBuffer);
            this.FreeUserOverridableBuffer(this.m_colorBuffer);
            this.FreeUserOverridableBuffer(this.m_userDataBuffer);
            this.FreeUserOverridableBuffer(this.m_expirationTimeBuffer);
            this.FreeUserOverridableBuffer(this.m_indexByExpirationTimeBuffer);
            this.FreeBuffer(this.m_forceBuffer, this.m_internalAllocatedCapacity);
            this.FreeBuffer(this.m_weightBuffer, this.m_internalAllocatedCapacity);
            this.FreeBuffer(this.m_staticPressureBuffer, this.m_internalAllocatedCapacity);
            this.FreeBuffer(this.m_accumulationBuffer, this.m_internalAllocatedCapacity);
            this.FreeBuffer(this.m_accumulation2Buffer, this.m_internalAllocatedCapacity);
            this.FreeBuffer(this.m_depthBuffer, this.m_internalAllocatedCapacity);
            this.FreeBuffer(this.m_groupBuffer, this.m_internalAllocatedCapacity);
        };
        b2ParticleSystem.prototype.CreateParticle = function (def) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            if (this.m_count >= this.m_internalAllocatedCapacity) {
                var capacity = this.m_count ? 2 * this.m_count : b2Settings_39.b2_minParticleSystemBufferCapacity;
                this.ReallocateInternalAllocatedBuffers(capacity);
            }
            if (this.m_count >= this.m_internalAllocatedCapacity) {
                if (this.m_def.destroyByAge) {
                    this.DestroyOldestParticle(0, false);
                    this.SolveZombie();
                }
                else {
                    return b2Settings_39.b2_invalidParticleIndex;
                }
            }
            var index = this.m_count++;
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            this.m_flagsBuffer.data[index] = 0;
            if (this.m_lastBodyContactStepBuffer.data) {
                this.m_lastBodyContactStepBuffer.data[index] = 0;
            }
            if (this.m_bodyContactCountBuffer.data) {
                this.m_bodyContactCountBuffer.data[index] = 0;
            }
            if (this.m_consecutiveContactStepsBuffer.data) {
                this.m_consecutiveContactStepsBuffer.data[index] = 0;
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            this.m_positionBuffer.data[index] = (this.m_positionBuffer.data[index] || new b2Math_32.b2Vec2()).Copy(b2Settings_39.b2Maybe(def.position, b2Math_32.b2Vec2.ZERO));
            this.m_velocityBuffer.data[index] = (this.m_velocityBuffer.data[index] || new b2Math_32.b2Vec2()).Copy(b2Settings_39.b2Maybe(def.velocity, b2Math_32.b2Vec2.ZERO));
            this.m_weightBuffer[index] = 0;
            this.m_forceBuffer[index] = (this.m_forceBuffer[index] || new b2Math_32.b2Vec2()).SetZero();
            if (this.m_staticPressureBuffer) {
                this.m_staticPressureBuffer[index] = 0;
            }
            if (this.m_depthBuffer) {
                this.m_depthBuffer[index] = 0;
            }
            var color = new b2Draw_3.b2Color().Copy(b2Settings_39.b2Maybe(def.color, b2Draw_3.b2Color.ZERO));
            if (this.m_colorBuffer.data || !color.IsZero()) {
                this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data);
                this.m_colorBuffer.data[index] = (this.m_colorBuffer.data[index] || new b2Draw_3.b2Color()).Copy(color);
            }
            if (this.m_userDataBuffer.data || def.userData) {
                this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data);
                this.m_userDataBuffer.data[index] = def.userData;
            }
            if (this.m_handleIndexBuffer.data) {
                this.m_handleIndexBuffer.data[index] = null;
            }
            var proxy = this.m_proxyBuffer.data[this.m_proxyBuffer.Append()];
            var lifetime = b2Settings_39.b2Maybe(def.lifetime, 0.0);
            var finiteLifetime = lifetime > 0.0;
            if (this.m_expirationTimeBuffer.data || finiteLifetime) {
                this.SetParticleLifetime(index, finiteLifetime ? lifetime :
                    this.ExpirationTimeToLifetime(-this.GetQuantizedTimeElapsed()));
                if (!this.m_indexByExpirationTimeBuffer.data) {
                    throw new Error();
                }
                this.m_indexByExpirationTimeBuffer.data[index] = index;
            }
            proxy.index = index;
            var group = b2Settings_39.b2Maybe(def.group, null);
            this.m_groupBuffer[index] = group;
            if (group) {
                if (group.m_firstIndex < group.m_lastIndex) {
                    this.RotateBuffer(group.m_firstIndex, group.m_lastIndex, index);
                    group.m_lastIndex = index + 1;
                }
                else {
                    group.m_firstIndex = index;
                    group.m_lastIndex = index + 1;
                }
            }
            this.SetParticleFlags(index, b2Settings_39.b2Maybe(def.flags, 0));
            return index;
        };
        b2ParticleSystem.prototype.GetParticleHandleFromIndex = function (index) {
            this.m_handleIndexBuffer.data = this.RequestBuffer(this.m_handleIndexBuffer.data);
            var handle = this.m_handleIndexBuffer.data[index];
            if (handle) {
                return handle;
            }
            handle = new b2Particle_2.b2ParticleHandle();
            handle.SetIndex(index);
            this.m_handleIndexBuffer.data[index] = handle;
            return handle;
        };
        b2ParticleSystem.prototype.DestroyParticle = function (index, callDestructionListener) {
            if (callDestructionListener === void 0) { callDestructionListener = false; }
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            var flags = b2Particle_2.b2ParticleFlag.b2_zombieParticle;
            if (callDestructionListener) {
                flags |= b2Particle_2.b2ParticleFlag.b2_destructionListenerParticle;
            }
            this.SetParticleFlags(index, this.m_flagsBuffer.data[index] | flags);
        };
        b2ParticleSystem.prototype.DestroyOldestParticle = function (index, callDestructionListener) {
            if (callDestructionListener === void 0) { callDestructionListener = false; }
            var particleCount = this.GetParticleCount();
            if (!this.m_indexByExpirationTimeBuffer.data) {
                throw new Error();
            }
            if (!this.m_expirationTimeBuffer.data) {
                throw new Error();
            }
            var oldestFiniteLifetimeParticle = this.m_indexByExpirationTimeBuffer.data[particleCount - (index + 1)];
            var oldestInfiniteLifetimeParticle = this.m_indexByExpirationTimeBuffer.data[index];
            this.DestroyParticle(this.m_expirationTimeBuffer.data[oldestFiniteLifetimeParticle] > 0.0 ?
                oldestFiniteLifetimeParticle : oldestInfiniteLifetimeParticle, callDestructionListener);
        };
        b2ParticleSystem.prototype.DestroyParticlesInShape = function (shape, xf, callDestructionListener) {
            if (callDestructionListener === void 0) { callDestructionListener = false; }
            var s_aabb = b2ParticleSystem.DestroyParticlesInShape_s_aabb;
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            var callback = new b2ParticleSystem.DestroyParticlesInShapeCallback(this, shape, xf, callDestructionListener);
            var aabb = s_aabb;
            shape.ComputeAABB(aabb, xf, 0);
            this.m_world.QueryAABB(callback, aabb);
            return callback.Destroyed();
        };
        b2ParticleSystem.prototype.CreateParticleGroup = function (groupDef) {
            var s_transform = b2ParticleSystem.CreateParticleGroup_s_transform;
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            var transform = s_transform;
            transform.SetPositionAngle(b2Settings_39.b2Maybe(groupDef.position, b2Math_32.b2Vec2.ZERO), b2Settings_39.b2Maybe(groupDef.angle, 0));
            var firstIndex = this.m_count;
            if (groupDef.shape) {
                this.CreateParticlesWithShapeForGroup(groupDef.shape, groupDef, transform);
            }
            if (groupDef.shapes) {
                this.CreateParticlesWithShapesForGroup(groupDef.shapes, b2Settings_39.b2Maybe(groupDef.shapeCount, groupDef.shapes.length), groupDef, transform);
            }
            if (groupDef.positionData) {
                var count = b2Settings_39.b2Maybe(groupDef.particleCount, groupDef.positionData.length);
                for (var i = 0; i < count; i++) {
                    var p = groupDef.positionData[i];
                    this.CreateParticleForGroup(groupDef, transform, p);
                }
            }
            var lastIndex = this.m_count;
            var group = new b2ParticleGroup_1.b2ParticleGroup(this);
            group.m_firstIndex = firstIndex;
            group.m_lastIndex = lastIndex;
            group.m_strength = b2Settings_39.b2Maybe(groupDef.strength, 1);
            group.m_userData = groupDef.userData;
            group.m_transform.Copy(transform);
            group.m_prev = null;
            group.m_next = this.m_groupList;
            if (this.m_groupList) {
                this.m_groupList.m_prev = group;
            }
            this.m_groupList = group;
            ++this.m_groupCount;
            for (var i = firstIndex; i < lastIndex; i++) {
                this.m_groupBuffer[i] = group;
            }
            this.SetGroupFlags(group, b2Settings_39.b2Maybe(groupDef.groupFlags, 0));
            var filter = new b2ParticleSystem.ConnectionFilter();
            this.UpdateContacts(true);
            this.UpdatePairsAndTriads(firstIndex, lastIndex, filter);
            if (groupDef.group) {
                this.JoinParticleGroups(groupDef.group, group);
                group = groupDef.group;
            }
            return group;
        };
        b2ParticleSystem.prototype.JoinParticleGroups = function (groupA, groupB) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            this.RotateBuffer(groupB.m_firstIndex, groupB.m_lastIndex, this.m_count);
            this.RotateBuffer(groupA.m_firstIndex, groupA.m_lastIndex, groupB.m_firstIndex);
            var filter = new b2ParticleSystem.JoinParticleGroupsFilter(groupB.m_firstIndex);
            this.UpdateContacts(true);
            this.UpdatePairsAndTriads(groupA.m_firstIndex, groupB.m_lastIndex, filter);
            for (var i = groupB.m_firstIndex; i < groupB.m_lastIndex; i++) {
                this.m_groupBuffer[i] = groupA;
            }
            var groupFlags = groupA.m_groupFlags | groupB.m_groupFlags;
            this.SetGroupFlags(groupA, groupFlags);
            groupA.m_lastIndex = groupB.m_lastIndex;
            groupB.m_firstIndex = groupB.m_lastIndex;
            this.DestroyParticleGroup(groupB);
        };
        b2ParticleSystem.prototype.SplitParticleGroup = function (group) {
            this.UpdateContacts(true);
            var particleCount = group.GetParticleCount();
            var nodeBuffer = b2Settings_39.b2MakeArray(particleCount, function (index) { return new b2ParticleSystem.ParticleListNode(); });
            b2ParticleSystem.InitializeParticleLists(group, nodeBuffer);
            this.MergeParticleListsInContact(group, nodeBuffer);
            var survivingList = b2ParticleSystem.FindLongestParticleList(group, nodeBuffer);
            this.MergeZombieParticleListNodes(group, nodeBuffer, survivingList);
            this.CreateParticleGroupsFromParticleList(group, nodeBuffer, survivingList);
            this.UpdatePairsAndTriadsWithParticleList(group, nodeBuffer);
        };
        b2ParticleSystem.prototype.GetParticleGroupList = function () {
            return this.m_groupList;
        };
        b2ParticleSystem.prototype.GetParticleGroupCount = function () {
            return this.m_groupCount;
        };
        b2ParticleSystem.prototype.GetParticleCount = function () {
            return this.m_count;
        };
        b2ParticleSystem.prototype.GetMaxParticleCount = function () {
            return this.m_def.maxCount;
        };
        b2ParticleSystem.prototype.SetMaxParticleCount = function (count) {
            this.m_def.maxCount = count;
        };
        b2ParticleSystem.prototype.GetAllParticleFlags = function () {
            return this.m_allParticleFlags;
        };
        b2ParticleSystem.prototype.GetAllGroupFlags = function () {
            return this.m_allGroupFlags;
        };
        b2ParticleSystem.prototype.SetPaused = function (paused) {
            this.m_paused = paused;
        };
        b2ParticleSystem.prototype.GetPaused = function () {
            return this.m_paused;
        };
        b2ParticleSystem.prototype.SetDensity = function (density) {
            this.m_def.density = density;
            this.m_inverseDensity = 1 / this.m_def.density;
        };
        b2ParticleSystem.prototype.GetDensity = function () {
            return this.m_def.density;
        };
        b2ParticleSystem.prototype.SetGravityScale = function (gravityScale) {
            this.m_def.gravityScale = gravityScale;
        };
        b2ParticleSystem.prototype.GetGravityScale = function () {
            return this.m_def.gravityScale;
        };
        b2ParticleSystem.prototype.SetDamping = function (damping) {
            this.m_def.dampingStrength = damping;
        };
        b2ParticleSystem.prototype.GetDamping = function () {
            return this.m_def.dampingStrength;
        };
        b2ParticleSystem.prototype.SetStaticPressureIterations = function (iterations) {
            this.m_def.staticPressureIterations = iterations;
        };
        b2ParticleSystem.prototype.GetStaticPressureIterations = function () {
            return this.m_def.staticPressureIterations;
        };
        b2ParticleSystem.prototype.SetRadius = function (radius) {
            this.m_particleDiameter = 2 * radius;
            this.m_squaredDiameter = this.m_particleDiameter * this.m_particleDiameter;
            this.m_inverseDiameter = 1 / this.m_particleDiameter;
        };
        b2ParticleSystem.prototype.GetRadius = function () {
            return this.m_particleDiameter / 2;
        };
        b2ParticleSystem.prototype.GetPositionBuffer = function () {
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            return this.m_positionBuffer.data;
        };
        b2ParticleSystem.prototype.GetVelocityBuffer = function () {
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            return this.m_velocityBuffer.data;
        };
        b2ParticleSystem.prototype.GetColorBuffer = function () {
            this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data);
            return this.m_colorBuffer.data;
        };
        b2ParticleSystem.prototype.GetGroupBuffer = function () {
            return this.m_groupBuffer;
        };
        b2ParticleSystem.prototype.GetWeightBuffer = function () {
            return this.m_weightBuffer;
        };
        b2ParticleSystem.prototype.GetUserDataBuffer = function () {
            this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data);
            return this.m_userDataBuffer.data;
        };
        b2ParticleSystem.prototype.GetFlagsBuffer = function () {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            return this.m_flagsBuffer.data;
        };
        b2ParticleSystem.prototype.SetParticleFlags = function (index, newFlags) {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            var oldFlags = this.m_flagsBuffer.data[index];
            if (oldFlags & ~newFlags) {
                this.m_needsUpdateAllParticleFlags = true;
            }
            if (~this.m_allParticleFlags & newFlags) {
                if (newFlags & b2Particle_2.b2ParticleFlag.b2_tensileParticle) {
                    this.m_accumulation2Buffer = this.RequestBuffer(this.m_accumulation2Buffer);
                }
                if (newFlags & b2Particle_2.b2ParticleFlag.b2_colorMixingParticle) {
                    this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data);
                }
                this.m_allParticleFlags |= newFlags;
            }
            this.m_flagsBuffer.data[index] = newFlags;
        };
        b2ParticleSystem.prototype.GetParticleFlags = function (index) {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            return this.m_flagsBuffer.data[index];
        };
        b2ParticleSystem.prototype.SetFlagsBuffer = function (buffer, capacity) {
            this.SetUserOverridableBuffer(this.m_flagsBuffer, buffer, capacity);
        };
        b2ParticleSystem.prototype.SetPositionBuffer = function (buffer, capacity) {
            this.SetUserOverridableBuffer(this.m_positionBuffer, buffer, capacity);
        };
        b2ParticleSystem.prototype.SetVelocityBuffer = function (buffer, capacity) {
            this.SetUserOverridableBuffer(this.m_velocityBuffer, buffer, capacity);
        };
        b2ParticleSystem.prototype.SetColorBuffer = function (buffer, capacity) {
            this.SetUserOverridableBuffer(this.m_colorBuffer, buffer, capacity);
        };
        b2ParticleSystem.prototype.SetUserDataBuffer = function (buffer, capacity) {
            this.SetUserOverridableBuffer(this.m_userDataBuffer, buffer, capacity);
        };
        b2ParticleSystem.prototype.GetContacts = function () {
            return this.m_contactBuffer.data;
        };
        b2ParticleSystem.prototype.GetContactCount = function () {
            return this.m_contactBuffer.count;
        };
        b2ParticleSystem.prototype.GetBodyContacts = function () {
            return this.m_bodyContactBuffer.data;
        };
        b2ParticleSystem.prototype.GetBodyContactCount = function () {
            return this.m_bodyContactBuffer.count;
        };
        b2ParticleSystem.prototype.GetPairs = function () {
            return this.m_pairBuffer.data;
        };
        b2ParticleSystem.prototype.GetPairCount = function () {
            return this.m_pairBuffer.count;
        };
        b2ParticleSystem.prototype.GetTriads = function () {
            return this.m_triadBuffer.data;
        };
        b2ParticleSystem.prototype.GetTriadCount = function () {
            return this.m_triadBuffer.count;
        };
        b2ParticleSystem.prototype.SetStuckThreshold = function (steps) {
            this.m_stuckThreshold = steps;
            if (steps > 0) {
                this.m_lastBodyContactStepBuffer.data = this.RequestBuffer(this.m_lastBodyContactStepBuffer.data);
                this.m_bodyContactCountBuffer.data = this.RequestBuffer(this.m_bodyContactCountBuffer.data);
                this.m_consecutiveContactStepsBuffer.data = this.RequestBuffer(this.m_consecutiveContactStepsBuffer.data);
            }
        };
        b2ParticleSystem.prototype.GetStuckCandidates = function () {
            return this.m_stuckParticleBuffer.Data();
        };
        b2ParticleSystem.prototype.GetStuckCandidateCount = function () {
            return this.m_stuckParticleBuffer.GetCount();
        };
        b2ParticleSystem.prototype.ComputeCollisionEnergy = function () {
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var s_v = b2ParticleSystem.ComputeCollisionEnergy_s_v;
            var vel_data = this.m_velocityBuffer.data;
            var sum_v2 = 0;
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                var n = contact.normal;
                var v = b2Math_32.b2Vec2.SubVV(vel_data[b], vel_data[a], s_v);
                var vn = b2Math_32.b2Vec2.DotVV(v, n);
                if (vn < 0) {
                    sum_v2 += vn * vn;
                }
            }
            return 0.5 * this.GetParticleMass() * sum_v2;
        };
        b2ParticleSystem.prototype.SetStrictContactCheck = function (enabled) {
            this.m_def.strictContactCheck = enabled;
        };
        b2ParticleSystem.prototype.GetStrictContactCheck = function () {
            return this.m_def.strictContactCheck;
        };
        b2ParticleSystem.prototype.SetParticleLifetime = function (index, lifetime) {
            var initializeExpirationTimes = this.m_indexByExpirationTimeBuffer.data === null;
            this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data);
            this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data);
            if (initializeExpirationTimes) {
                var particleCount = this.GetParticleCount();
                for (var i = 0; i < particleCount; ++i) {
                    this.m_indexByExpirationTimeBuffer.data[i] = i;
                }
            }
            var quantizedLifetime = lifetime / this.m_def.lifetimeGranularity;
            var newExpirationTime = quantizedLifetime > 0.0 ? this.GetQuantizedTimeElapsed() + quantizedLifetime : quantizedLifetime;
            if (newExpirationTime !== this.m_expirationTimeBuffer.data[index]) {
                this.m_expirationTimeBuffer.data[index] = newExpirationTime;
                this.m_expirationTimeBufferRequiresSorting = true;
            }
        };
        b2ParticleSystem.prototype.GetParticleLifetime = function (index) {
            return this.ExpirationTimeToLifetime(this.GetExpirationTimeBuffer()[index]);
        };
        b2ParticleSystem.prototype.SetDestructionByAge = function (enable) {
            if (enable) {
                this.GetExpirationTimeBuffer();
            }
            this.m_def.destroyByAge = enable;
        };
        b2ParticleSystem.prototype.GetDestructionByAge = function () {
            return this.m_def.destroyByAge;
        };
        b2ParticleSystem.prototype.GetExpirationTimeBuffer = function () {
            this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data);
            return this.m_expirationTimeBuffer.data;
        };
        b2ParticleSystem.prototype.ExpirationTimeToLifetime = function (expirationTime) {
            return (expirationTime > 0 ?
                expirationTime - this.GetQuantizedTimeElapsed() :
                expirationTime) * this.m_def.lifetimeGranularity;
        };
        b2ParticleSystem.prototype.GetIndexByExpirationTimeBuffer = function () {
            if (this.GetParticleCount()) {
                this.SetParticleLifetime(0, this.GetParticleLifetime(0));
            }
            else {
                this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data);
            }
            if (!this.m_indexByExpirationTimeBuffer.data) {
                throw new Error();
            }
            return this.m_indexByExpirationTimeBuffer.data;
        };
        b2ParticleSystem.prototype.ParticleApplyLinearImpulse = function (index, impulse) {
            this.ApplyLinearImpulse(index, index + 1, impulse);
        };
        b2ParticleSystem.prototype.ApplyLinearImpulse = function (firstIndex, lastIndex, impulse) {
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            var numParticles = (lastIndex - firstIndex);
            var totalMass = numParticles * this.GetParticleMass();
            var velocityDelta = new b2Math_32.b2Vec2().Copy(impulse).SelfMul(1 / totalMass);
            for (var i = firstIndex; i < lastIndex; i++) {
                vel_data[i].SelfAdd(velocityDelta);
            }
        };
        b2ParticleSystem.IsSignificantForce = function (force) {
            return force.x !== 0 || force.y !== 0;
        };
        b2ParticleSystem.prototype.ParticleApplyForce = function (index, force) {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (b2ParticleSystem.IsSignificantForce(force) &&
                this.ForceCanBeApplied(this.m_flagsBuffer.data[index])) {
                this.PrepareForceBuffer();
                this.m_forceBuffer[index].SelfAdd(force);
            }
        };
        b2ParticleSystem.prototype.ApplyForce = function (firstIndex, lastIndex, force) {
            var distributedForce = new b2Math_32.b2Vec2().Copy(force).SelfMul(1 / (lastIndex - firstIndex));
            if (b2ParticleSystem.IsSignificantForce(distributedForce)) {
                this.PrepareForceBuffer();
                for (var i = firstIndex; i < lastIndex; i++) {
                    this.m_forceBuffer[i].SelfAdd(distributedForce);
                }
            }
        };
        b2ParticleSystem.prototype.GetNext = function () {
            return this.m_next;
        };
        b2ParticleSystem.prototype.QueryAABB = function (callback, aabb) {
            if (this.m_proxyBuffer.count === 0) {
                return;
            }
            var beginProxy = 0;
            var endProxy = this.m_proxyBuffer.count;
            var firstProxy = std_lower_bound(this.m_proxyBuffer.data, beginProxy, endProxy, b2ParticleSystem.computeTag(this.m_inverseDiameter * aabb.lowerBound.x, this.m_inverseDiameter * aabb.lowerBound.y), b2ParticleSystem.Proxy.CompareProxyTag);
            var lastProxy = std_upper_bound(this.m_proxyBuffer.data, firstProxy, endProxy, b2ParticleSystem.computeTag(this.m_inverseDiameter * aabb.upperBound.x, this.m_inverseDiameter * aabb.upperBound.y), b2ParticleSystem.Proxy.CompareTagProxy);
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            for (var k = firstProxy; k < lastProxy; ++k) {
                var proxy = this.m_proxyBuffer.data[k];
                var i = proxy.index;
                var p = pos_data[i];
                if (aabb.lowerBound.x < p.x && p.x < aabb.upperBound.x &&
                    aabb.lowerBound.y < p.y && p.y < aabb.upperBound.y) {
                    if (!callback.ReportParticle(this, i)) {
                        break;
                    }
                }
            }
        };
        b2ParticleSystem.prototype.QueryShapeAABB = function (callback, shape, xf, childIndex) {
            if (childIndex === void 0) { childIndex = 0; }
            var s_aabb = b2ParticleSystem.QueryShapeAABB_s_aabb;
            var aabb = s_aabb;
            shape.ComputeAABB(aabb, xf, childIndex);
            this.QueryAABB(callback, aabb);
        };
        b2ParticleSystem.prototype.QueryPointAABB = function (callback, point, slop) {
            if (slop === void 0) { slop = b2Settings_39.b2_linearSlop; }
            var s_aabb = b2ParticleSystem.QueryPointAABB_s_aabb;
            var aabb = s_aabb;
            aabb.lowerBound.Set(point.x - slop, point.y - slop);
            aabb.upperBound.Set(point.x + slop, point.y + slop);
            this.QueryAABB(callback, aabb);
        };
        b2ParticleSystem.prototype.RayCast = function (callback, point1, point2) {
            var s_aabb = b2ParticleSystem.RayCast_s_aabb;
            var s_p = b2ParticleSystem.RayCast_s_p;
            var s_v = b2ParticleSystem.RayCast_s_v;
            var s_n = b2ParticleSystem.RayCast_s_n;
            var s_point = b2ParticleSystem.RayCast_s_point;
            if (this.m_proxyBuffer.count === 0) {
                return;
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var aabb = s_aabb;
            b2Math_32.b2Vec2.MinV(point1, point2, aabb.lowerBound);
            b2Math_32.b2Vec2.MaxV(point1, point2, aabb.upperBound);
            var fraction = 1;
            var v = b2Math_32.b2Vec2.SubVV(point2, point1, s_v);
            var v2 = b2Math_32.b2Vec2.DotVV(v, v);
            var enumerator = this.GetInsideBoundsEnumerator(aabb);
            var i;
            while ((i = enumerator.GetNext()) >= 0) {
                var p = b2Math_32.b2Vec2.SubVV(point1, pos_data[i], s_p);
                var pv = b2Math_32.b2Vec2.DotVV(p, v);
                var p2 = b2Math_32.b2Vec2.DotVV(p, p);
                var determinant = pv * pv - v2 * (p2 - this.m_squaredDiameter);
                if (determinant >= 0) {
                    var sqrtDeterminant = b2Math_32.b2Sqrt(determinant);
                    var t = (-pv - sqrtDeterminant) / v2;
                    if (t > fraction) {
                        continue;
                    }
                    if (t < 0) {
                        t = (-pv + sqrtDeterminant) / v2;
                        if (t < 0 || t > fraction) {
                            continue;
                        }
                    }
                    var n = b2Math_32.b2Vec2.AddVMulSV(p, t, v, s_n);
                    n.Normalize();
                    var f = callback.ReportParticle(this, i, b2Math_32.b2Vec2.AddVMulSV(point1, t, v, s_point), n, t);
                    fraction = b2Math_32.b2Min(fraction, f);
                    if (fraction <= 0) {
                        break;
                    }
                }
            }
        };
        b2ParticleSystem.prototype.ComputeAABB = function (aabb) {
            var particleCount = this.GetParticleCount();
            aabb.lowerBound.x = +b2Settings_39.b2_maxFloat;
            aabb.lowerBound.y = +b2Settings_39.b2_maxFloat;
            aabb.upperBound.x = -b2Settings_39.b2_maxFloat;
            aabb.upperBound.y = -b2Settings_39.b2_maxFloat;
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            for (var i = 0; i < particleCount; i++) {
                var p = pos_data[i];
                b2Math_32.b2Vec2.MinV(aabb.lowerBound, p, aabb.lowerBound);
                b2Math_32.b2Vec2.MaxV(aabb.upperBound, p, aabb.upperBound);
            }
            aabb.lowerBound.x -= this.m_particleDiameter;
            aabb.lowerBound.y -= this.m_particleDiameter;
            aabb.upperBound.x += this.m_particleDiameter;
            aabb.upperBound.y += this.m_particleDiameter;
        };
        b2ParticleSystem.prototype.FreeBuffer = function (b, capacity) {
            if (b === null) {
                return;
            }
            b.length = 0;
        };
        b2ParticleSystem.prototype.FreeUserOverridableBuffer = function (b) {
            if (b.userSuppliedCapacity === 0) {
                this.FreeBuffer(b.data, this.m_internalAllocatedCapacity);
            }
        };
        b2ParticleSystem.prototype.ReallocateBuffer3 = function (oldBuffer, oldCapacity, newCapacity) {
            if (newCapacity <= oldCapacity) {
                throw new Error();
            }
            var newBuffer = (oldBuffer) ? oldBuffer.slice() : [];
            newBuffer.length = newCapacity;
            return newBuffer;
        };
        b2ParticleSystem.prototype.ReallocateBuffer5 = function (buffer, userSuppliedCapacity, oldCapacity, newCapacity, deferred) {
            if (newCapacity <= oldCapacity) {
                throw new Error();
            }
            if (!(!userSuppliedCapacity || newCapacity <= userSuppliedCapacity)) {
                throw new Error();
            }
            if ((!deferred || buffer) && !userSuppliedCapacity) {
                buffer = this.ReallocateBuffer3(buffer, oldCapacity, newCapacity);
            }
            return buffer;
        };
        b2ParticleSystem.prototype.ReallocateBuffer4 = function (buffer, oldCapacity, newCapacity, deferred) {
            return this.ReallocateBuffer5(buffer.data, buffer.userSuppliedCapacity, oldCapacity, newCapacity, deferred);
        };
        b2ParticleSystem.prototype.RequestBuffer = function (buffer) {
            if (!buffer) {
                if (this.m_internalAllocatedCapacity === 0) {
                    this.ReallocateInternalAllocatedBuffers(b2Settings_39.b2_minParticleSystemBufferCapacity);
                }
                buffer = [];
                buffer.length = this.m_internalAllocatedCapacity;
            }
            return buffer;
        };
        b2ParticleSystem.prototype.ReallocateHandleBuffers = function (newCapacity) {
            this.m_handleIndexBuffer.data = this.ReallocateBuffer4(this.m_handleIndexBuffer, this.m_internalAllocatedCapacity, newCapacity, true);
        };
        b2ParticleSystem.prototype.ReallocateInternalAllocatedBuffers = function (capacity) {
            function LimitCapacity(capacity, maxCount) {
                return maxCount && capacity > maxCount ? maxCount : capacity;
            }
            capacity = LimitCapacity(capacity, this.m_def.maxCount);
            capacity = LimitCapacity(capacity, this.m_flagsBuffer.userSuppliedCapacity);
            capacity = LimitCapacity(capacity, this.m_positionBuffer.userSuppliedCapacity);
            capacity = LimitCapacity(capacity, this.m_velocityBuffer.userSuppliedCapacity);
            capacity = LimitCapacity(capacity, this.m_colorBuffer.userSuppliedCapacity);
            capacity = LimitCapacity(capacity, this.m_userDataBuffer.userSuppliedCapacity);
            if (this.m_internalAllocatedCapacity < capacity) {
                this.ReallocateHandleBuffers(capacity);
                this.m_flagsBuffer.data = this.ReallocateBuffer4(this.m_flagsBuffer, this.m_internalAllocatedCapacity, capacity, false);
                var stuck = this.m_stuckThreshold > 0;
                this.m_lastBodyContactStepBuffer.data = this.ReallocateBuffer4(this.m_lastBodyContactStepBuffer, this.m_internalAllocatedCapacity, capacity, stuck);
                this.m_bodyContactCountBuffer.data = this.ReallocateBuffer4(this.m_bodyContactCountBuffer, this.m_internalAllocatedCapacity, capacity, stuck);
                this.m_consecutiveContactStepsBuffer.data = this.ReallocateBuffer4(this.m_consecutiveContactStepsBuffer, this.m_internalAllocatedCapacity, capacity, stuck);
                this.m_positionBuffer.data = this.ReallocateBuffer4(this.m_positionBuffer, this.m_internalAllocatedCapacity, capacity, false);
                this.m_velocityBuffer.data = this.ReallocateBuffer4(this.m_velocityBuffer, this.m_internalAllocatedCapacity, capacity, false);
                this.m_forceBuffer = this.ReallocateBuffer5(this.m_forceBuffer, 0, this.m_internalAllocatedCapacity, capacity, false);
                this.m_weightBuffer = this.ReallocateBuffer5(this.m_weightBuffer, 0, this.m_internalAllocatedCapacity, capacity, false);
                this.m_staticPressureBuffer = this.ReallocateBuffer5(this.m_staticPressureBuffer, 0, this.m_internalAllocatedCapacity, capacity, true);
                this.m_accumulationBuffer = this.ReallocateBuffer5(this.m_accumulationBuffer, 0, this.m_internalAllocatedCapacity, capacity, false);
                this.m_accumulation2Buffer = this.ReallocateBuffer5(this.m_accumulation2Buffer, 0, this.m_internalAllocatedCapacity, capacity, true);
                this.m_depthBuffer = this.ReallocateBuffer5(this.m_depthBuffer, 0, this.m_internalAllocatedCapacity, capacity, true);
                this.m_colorBuffer.data = this.ReallocateBuffer4(this.m_colorBuffer, this.m_internalAllocatedCapacity, capacity, true);
                this.m_groupBuffer = this.ReallocateBuffer5(this.m_groupBuffer, 0, this.m_internalAllocatedCapacity, capacity, false);
                this.m_userDataBuffer.data = this.ReallocateBuffer4(this.m_userDataBuffer, this.m_internalAllocatedCapacity, capacity, true);
                this.m_expirationTimeBuffer.data = this.ReallocateBuffer4(this.m_expirationTimeBuffer, this.m_internalAllocatedCapacity, capacity, true);
                this.m_indexByExpirationTimeBuffer.data = this.ReallocateBuffer4(this.m_indexByExpirationTimeBuffer, this.m_internalAllocatedCapacity, capacity, false);
                this.m_internalAllocatedCapacity = capacity;
            }
        };
        b2ParticleSystem.prototype.CreateParticleForGroup = function (groupDef, xf, p) {
            var particleDef = new b2Particle_2.b2ParticleDef();
            particleDef.flags = b2Settings_39.b2Maybe(groupDef.flags, 0);
            b2Math_32.b2Transform.MulXV(xf, p, particleDef.position);
            b2Math_32.b2Vec2.AddVV(b2Settings_39.b2Maybe(groupDef.linearVelocity, b2Math_32.b2Vec2.ZERO), b2Math_32.b2Vec2.CrossSV(b2Settings_39.b2Maybe(groupDef.angularVelocity, 0), b2Math_32.b2Vec2.SubVV(particleDef.position, b2Settings_39.b2Maybe(groupDef.position, b2Math_32.b2Vec2.ZERO), b2Math_32.b2Vec2.s_t0), b2Math_32.b2Vec2.s_t0), particleDef.velocity);
            particleDef.color.Copy(b2Settings_39.b2Maybe(groupDef.color, b2Draw_3.b2Color.ZERO));
            particleDef.lifetime = b2Settings_39.b2Maybe(groupDef.lifetime, 0);
            particleDef.userData = groupDef.userData;
            this.CreateParticle(particleDef);
        };
        b2ParticleSystem.prototype.CreateParticlesStrokeShapeForGroup = function (shape, groupDef, xf) {
            var s_edge = b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_edge;
            var s_d = b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_d;
            var s_p = b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_p;
            var stride = b2Settings_39.b2Maybe(groupDef.stride, 0);
            if (stride === 0) {
                stride = this.GetParticleStride();
            }
            var positionOnEdge = 0;
            var childCount = shape.GetChildCount();
            for (var childIndex = 0; childIndex < childCount; childIndex++) {
                var edge = null;
                if (shape.GetType() === b2Shape_8.b2ShapeType.e_edgeShape) {
                    edge = shape;
                }
                else {
                    edge = s_edge;
                    shape.GetChildEdge(edge, childIndex);
                }
                var d = b2Math_32.b2Vec2.SubVV(edge.m_vertex2, edge.m_vertex1, s_d);
                var edgeLength = d.Length();
                while (positionOnEdge < edgeLength) {
                    var p = b2Math_32.b2Vec2.AddVMulSV(edge.m_vertex1, positionOnEdge / edgeLength, d, s_p);
                    this.CreateParticleForGroup(groupDef, xf, p);
                    positionOnEdge += stride;
                }
                positionOnEdge -= edgeLength;
            }
        };
        b2ParticleSystem.prototype.CreateParticlesFillShapeForGroup = function (shape, groupDef, xf) {
            var s_aabb = b2ParticleSystem.CreateParticlesFillShapeForGroup_s_aabb;
            var s_p = b2ParticleSystem.CreateParticlesFillShapeForGroup_s_p;
            var stride = b2Settings_39.b2Maybe(groupDef.stride, 0);
            if (stride === 0) {
                stride = this.GetParticleStride();
            }
            var identity = b2Math_32.b2Transform.IDENTITY;
            var aabb = s_aabb;
            shape.ComputeAABB(aabb, identity, 0);
            for (var y = Math.floor(aabb.lowerBound.y / stride) * stride; y < aabb.upperBound.y; y += stride) {
                for (var x = Math.floor(aabb.lowerBound.x / stride) * stride; x < aabb.upperBound.x; x += stride) {
                    var p = s_p.Set(x, y);
                    if (shape.TestPoint(identity, p)) {
                        this.CreateParticleForGroup(groupDef, xf, p);
                    }
                }
            }
        };
        b2ParticleSystem.prototype.CreateParticlesWithShapeForGroup = function (shape, groupDef, xf) {
            switch (shape.GetType()) {
                case b2Shape_8.b2ShapeType.e_edgeShape:
                case b2Shape_8.b2ShapeType.e_chainShape:
                    this.CreateParticlesStrokeShapeForGroup(shape, groupDef, xf);
                    break;
                case b2Shape_8.b2ShapeType.e_polygonShape:
                case b2Shape_8.b2ShapeType.e_circleShape:
                    this.CreateParticlesFillShapeForGroup(shape, groupDef, xf);
                    break;
                default:
                    break;
            }
        };
        b2ParticleSystem.prototype.CreateParticlesWithShapesForGroup = function (shapes, shapeCount, groupDef, xf) {
            var compositeShape = new b2ParticleSystem.CompositeShape(shapes, shapeCount);
            this.CreateParticlesFillShapeForGroup(compositeShape, groupDef, xf);
        };
        b2ParticleSystem.prototype.CloneParticle = function (oldIndex, group) {
            var def = new b2Particle_2.b2ParticleDef();
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            def.flags = this.m_flagsBuffer.data[oldIndex];
            def.position.Copy(this.m_positionBuffer.data[oldIndex]);
            def.velocity.Copy(this.m_velocityBuffer.data[oldIndex]);
            if (this.m_colorBuffer.data) {
                def.color.Copy(this.m_colorBuffer.data[oldIndex]);
            }
            if (this.m_userDataBuffer.data) {
                def.userData = this.m_userDataBuffer.data[oldIndex];
            }
            def.group = group;
            var newIndex = this.CreateParticle(def);
            if (this.m_handleIndexBuffer.data) {
                var handle = this.m_handleIndexBuffer.data[oldIndex];
                if (handle) {
                    handle.SetIndex(newIndex);
                }
                this.m_handleIndexBuffer.data[newIndex] = handle;
                this.m_handleIndexBuffer.data[oldIndex] = null;
            }
            if (this.m_lastBodyContactStepBuffer.data) {
                this.m_lastBodyContactStepBuffer.data[newIndex] =
                    this.m_lastBodyContactStepBuffer.data[oldIndex];
            }
            if (this.m_bodyContactCountBuffer.data) {
                this.m_bodyContactCountBuffer.data[newIndex] =
                    this.m_bodyContactCountBuffer.data[oldIndex];
            }
            if (this.m_consecutiveContactStepsBuffer.data) {
                this.m_consecutiveContactStepsBuffer.data[newIndex] =
                    this.m_consecutiveContactStepsBuffer.data[oldIndex];
            }
            if (this.m_hasForce) {
                this.m_forceBuffer[newIndex].Copy(this.m_forceBuffer[oldIndex]);
            }
            if (this.m_staticPressureBuffer) {
                this.m_staticPressureBuffer[newIndex] = this.m_staticPressureBuffer[oldIndex];
            }
            if (this.m_depthBuffer) {
                this.m_depthBuffer[newIndex] = this.m_depthBuffer[oldIndex];
            }
            if (this.m_expirationTimeBuffer.data) {
                this.m_expirationTimeBuffer.data[newIndex] =
                    this.m_expirationTimeBuffer.data[oldIndex];
            }
            return newIndex;
        };
        b2ParticleSystem.prototype.DestroyParticlesInGroup = function (group, callDestructionListener) {
            if (callDestructionListener === void 0) { callDestructionListener = false; }
            for (var i = group.m_firstIndex; i < group.m_lastIndex; i++) {
                this.DestroyParticle(i, callDestructionListener);
            }
        };
        b2ParticleSystem.prototype.DestroyParticleGroup = function (group) {
            if (this.m_world.m_destructionListener) {
                this.m_world.m_destructionListener.SayGoodbyeParticleGroup(group);
            }
            this.SetGroupFlags(group, 0);
            for (var i = group.m_firstIndex; i < group.m_lastIndex; i++) {
                this.m_groupBuffer[i] = null;
            }
            if (group.m_prev) {
                group.m_prev.m_next = group.m_next;
            }
            if (group.m_next) {
                group.m_next.m_prev = group.m_prev;
            }
            if (group === this.m_groupList) {
                this.m_groupList = group.m_next;
            }
            --this.m_groupCount;
        };
        b2ParticleSystem.ParticleCanBeConnected = function (flags, group) {
            return ((flags & (b2Particle_2.b2ParticleFlag.b2_wallParticle | b2Particle_2.b2ParticleFlag.b2_springParticle | b2Particle_2.b2ParticleFlag.b2_elasticParticle)) !== 0) ||
                ((group !== null) && ((group.GetGroupFlags() & b2ParticleGroup_1.b2ParticleGroupFlag.b2_rigidParticleGroup) !== 0));
        };
        b2ParticleSystem.prototype.UpdatePairsAndTriads = function (firstIndex, lastIndex, filter) {
            var s_dab = b2ParticleSystem.UpdatePairsAndTriads_s_dab;
            var s_dbc = b2ParticleSystem.UpdatePairsAndTriads_s_dbc;
            var s_dca = b2ParticleSystem.UpdatePairsAndTriads_s_dca;
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var particleFlags = 0;
            for (var i = firstIndex; i < lastIndex; i++) {
                particleFlags |= this.m_flagsBuffer.data[i];
            }
            if (particleFlags & b2ParticleSystem.k_pairFlags) {
                for (var k = 0; k < this.m_contactBuffer.count; k++) {
                    var contact = this.m_contactBuffer.data[k];
                    var a = contact.indexA;
                    var b = contact.indexB;
                    var af = this.m_flagsBuffer.data[a];
                    var bf = this.m_flagsBuffer.data[b];
                    var groupA = this.m_groupBuffer[a];
                    var groupB = this.m_groupBuffer[b];
                    if (a >= firstIndex && a < lastIndex &&
                        b >= firstIndex && b < lastIndex &&
                        !((af | bf) & b2Particle_2.b2ParticleFlag.b2_zombieParticle) &&
                        ((af | bf) & b2ParticleSystem.k_pairFlags) &&
                        (filter.IsNecessary(a) || filter.IsNecessary(b)) &&
                        b2ParticleSystem.ParticleCanBeConnected(af, groupA) &&
                        b2ParticleSystem.ParticleCanBeConnected(bf, groupB) &&
                        filter.ShouldCreatePair(a, b)) {
                        var pair = this.m_pairBuffer.data[this.m_pairBuffer.Append()];
                        pair.indexA = a;
                        pair.indexB = b;
                        pair.flags = contact.flags;
                        pair.strength = b2Math_32.b2Min(groupA ? groupA.m_strength : 1, groupB ? groupB.m_strength : 1);
                        pair.distance = b2Math_32.b2Vec2.DistanceVV(pos_data[a], pos_data[b]);
                    }
                    std_stable_sort(this.m_pairBuffer.data, 0, this.m_pairBuffer.count, b2ParticleSystem.ComparePairIndices);
                    this.m_pairBuffer.Unique(b2ParticleSystem.MatchPairIndices);
                }
            }
            if (particleFlags & b2ParticleSystem.k_triadFlags) {
                var diagram = new b2VoronoiDiagram_1.b2VoronoiDiagram(lastIndex - firstIndex);
                for (var i = firstIndex; i < lastIndex; i++) {
                    var flags = this.m_flagsBuffer.data[i];
                    var group = this.m_groupBuffer[i];
                    if (!(flags & b2Particle_2.b2ParticleFlag.b2_zombieParticle) &&
                        b2ParticleSystem.ParticleCanBeConnected(flags, group)) {
                        diagram.AddGenerator(pos_data[i], i, filter.IsNecessary(i));
                    }
                }
                var stride = this.GetParticleStride();
                diagram.Generate(stride / 2, stride * 2);
                var system_1 = this;
                var callback = function (a, b, c) {
                    if (!system_1.m_flagsBuffer.data) {
                        throw new Error();
                    }
                    var af = system_1.m_flagsBuffer.data[a];
                    var bf = system_1.m_flagsBuffer.data[b];
                    var cf = system_1.m_flagsBuffer.data[c];
                    if (((af | bf | cf) & b2ParticleSystem.k_triadFlags) &&
                        filter.ShouldCreateTriad(a, b, c)) {
                        var pa = pos_data[a];
                        var pb = pos_data[b];
                        var pc = pos_data[c];
                        var dab = b2Math_32.b2Vec2.SubVV(pa, pb, s_dab);
                        var dbc = b2Math_32.b2Vec2.SubVV(pb, pc, s_dbc);
                        var dca = b2Math_32.b2Vec2.SubVV(pc, pa, s_dca);
                        var maxDistanceSquared = b2Settings_39.b2_maxTriadDistanceSquared * system_1.m_squaredDiameter;
                        if (b2Math_32.b2Vec2.DotVV(dab, dab) > maxDistanceSquared ||
                            b2Math_32.b2Vec2.DotVV(dbc, dbc) > maxDistanceSquared ||
                            b2Math_32.b2Vec2.DotVV(dca, dca) > maxDistanceSquared) {
                            return;
                        }
                        var groupA = system_1.m_groupBuffer[a];
                        var groupB = system_1.m_groupBuffer[b];
                        var groupC = system_1.m_groupBuffer[c];
                        var triad = system_1.m_triadBuffer.data[system_1.m_triadBuffer.Append()];
                        triad.indexA = a;
                        triad.indexB = b;
                        triad.indexC = c;
                        triad.flags = af | bf | cf;
                        triad.strength = b2Math_32.b2Min(b2Math_32.b2Min(groupA ? groupA.m_strength : 1, groupB ? groupB.m_strength : 1), groupC ? groupC.m_strength : 1);
                        var midPoint_x = (pa.x + pb.x + pc.x) / 3.0;
                        var midPoint_y = (pa.y + pb.y + pc.y) / 3.0;
                        triad.pa.x = pa.x - midPoint_x;
                        triad.pa.y = pa.y - midPoint_y;
                        triad.pb.x = pb.x - midPoint_x;
                        triad.pb.y = pb.y - midPoint_y;
                        triad.pc.x = pc.x - midPoint_x;
                        triad.pc.y = pc.y - midPoint_y;
                        triad.ka = -b2Math_32.b2Vec2.DotVV(dca, dab);
                        triad.kb = -b2Math_32.b2Vec2.DotVV(dab, dbc);
                        triad.kc = -b2Math_32.b2Vec2.DotVV(dbc, dca);
                        triad.s = b2Math_32.b2Vec2.CrossVV(pa, pb) + b2Math_32.b2Vec2.CrossVV(pb, pc) + b2Math_32.b2Vec2.CrossVV(pc, pa);
                    }
                };
                diagram.GetNodes(callback);
                std_stable_sort(this.m_triadBuffer.data, 0, this.m_triadBuffer.count, b2ParticleSystem.CompareTriadIndices);
                this.m_triadBuffer.Unique(b2ParticleSystem.MatchTriadIndices);
            }
        };
        b2ParticleSystem.prototype.UpdatePairsAndTriadsWithReactiveParticles = function () {
            var filter = new b2ParticleSystem.ReactiveFilter(this.m_flagsBuffer);
            this.UpdatePairsAndTriads(0, this.m_count, filter);
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            for (var i = 0; i < this.m_count; i++) {
                this.m_flagsBuffer.data[i] &= ~b2Particle_2.b2ParticleFlag.b2_reactiveParticle;
            }
            this.m_allParticleFlags &= ~b2Particle_2.b2ParticleFlag.b2_reactiveParticle;
        };
        b2ParticleSystem.ComparePairIndices = function (a, b) {
            var diffA = a.indexA - b.indexA;
            if (diffA !== 0) {
                return diffA < 0;
            }
            return a.indexB < b.indexB;
        };
        b2ParticleSystem.MatchPairIndices = function (a, b) {
            return a.indexA === b.indexA && a.indexB === b.indexB;
        };
        b2ParticleSystem.CompareTriadIndices = function (a, b) {
            var diffA = a.indexA - b.indexA;
            if (diffA !== 0) {
                return diffA < 0;
            }
            var diffB = a.indexB - b.indexB;
            if (diffB !== 0) {
                return diffB < 0;
            }
            return a.indexC < b.indexC;
        };
        b2ParticleSystem.MatchTriadIndices = function (a, b) {
            return a.indexA === b.indexA && a.indexB === b.indexB && a.indexC === b.indexC;
        };
        b2ParticleSystem.InitializeParticleLists = function (group, nodeBuffer) {
            var bufferIndex = group.GetBufferIndex();
            var particleCount = group.GetParticleCount();
            for (var i = 0; i < particleCount; i++) {
                var node = nodeBuffer[i];
                node.list = node;
                node.next = null;
                node.count = 1;
                node.index = i + bufferIndex;
            }
        };
        b2ParticleSystem.prototype.MergeParticleListsInContact = function (group, nodeBuffer) {
            var bufferIndex = group.GetBufferIndex();
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                if (!group.ContainsParticle(a) || !group.ContainsParticle(b)) {
                    continue;
                }
                var listA = nodeBuffer[a - bufferIndex].list;
                var listB = nodeBuffer[b - bufferIndex].list;
                if (listA === listB) {
                    continue;
                }
                if (listA.count < listB.count) {
                    var _tmp = listA;
                    listA = listB;
                    listB = _tmp;
                }
                b2ParticleSystem.MergeParticleLists(listA, listB);
            }
        };
        b2ParticleSystem.MergeParticleLists = function (listA, listB) {
            for (var b = listB;;) {
                b.list = listA;
                var nextB = b.next;
                if (nextB) {
                    b = nextB;
                }
                else {
                    b.next = listA.next;
                    break;
                }
            }
            listA.next = listB;
            listA.count += listB.count;
            listB.count = 0;
        };
        b2ParticleSystem.FindLongestParticleList = function (group, nodeBuffer) {
            var particleCount = group.GetParticleCount();
            var result = nodeBuffer[0];
            for (var i = 0; i < particleCount; i++) {
                var node = nodeBuffer[i];
                if (result.count < node.count) {
                    result = node;
                }
            }
            return result;
        };
        b2ParticleSystem.prototype.MergeZombieParticleListNodes = function (group, nodeBuffer, survivingList) {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            var particleCount = group.GetParticleCount();
            for (var i = 0; i < particleCount; i++) {
                var node = nodeBuffer[i];
                if (node !== survivingList &&
                    (this.m_flagsBuffer.data[node.index] & b2Particle_2.b2ParticleFlag.b2_zombieParticle)) {
                    b2ParticleSystem.MergeParticleListAndNode(survivingList, node);
                }
            }
        };
        b2ParticleSystem.MergeParticleListAndNode = function (list, node) {
            node.list = list;
            node.next = list.next;
            list.next = node;
            list.count++;
            node.count = 0;
        };
        b2ParticleSystem.prototype.CreateParticleGroupsFromParticleList = function (group, nodeBuffer, survivingList) {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            var particleCount = group.GetParticleCount();
            var def = new b2ParticleGroup_1.b2ParticleGroupDef();
            def.groupFlags = group.GetGroupFlags();
            def.userData = group.GetUserData();
            for (var i = 0; i < particleCount; i++) {
                var list = nodeBuffer[i];
                if (!list.count || list === survivingList) {
                    continue;
                }
                var newGroup = this.CreateParticleGroup(def);
                for (var node = list; node; node = node.next) {
                    var oldIndex = node.index;
                    var newIndex = this.CloneParticle(oldIndex, newGroup);
                    this.m_flagsBuffer.data[oldIndex] |= b2Particle_2.b2ParticleFlag.b2_zombieParticle;
                    node.index = newIndex;
                }
            }
        };
        b2ParticleSystem.prototype.UpdatePairsAndTriadsWithParticleList = function (group, nodeBuffer) {
            var bufferIndex = group.GetBufferIndex();
            for (var k = 0; k < this.m_pairBuffer.count; k++) {
                var pair = this.m_pairBuffer.data[k];
                var a = pair.indexA;
                var b = pair.indexB;
                if (group.ContainsParticle(a)) {
                    pair.indexA = nodeBuffer[a - bufferIndex].index;
                }
                if (group.ContainsParticle(b)) {
                    pair.indexB = nodeBuffer[b - bufferIndex].index;
                }
            }
            for (var k = 0; k < this.m_triadBuffer.count; k++) {
                var triad = this.m_triadBuffer.data[k];
                var a = triad.indexA;
                var b = triad.indexB;
                var c = triad.indexC;
                if (group.ContainsParticle(a)) {
                    triad.indexA = nodeBuffer[a - bufferIndex].index;
                }
                if (group.ContainsParticle(b)) {
                    triad.indexB = nodeBuffer[b - bufferIndex].index;
                }
                if (group.ContainsParticle(c)) {
                    triad.indexC = nodeBuffer[c - bufferIndex].index;
                }
            }
        };
        b2ParticleSystem.prototype.ComputeDepth = function () {
            var contactGroups = [];
            var contactGroupsCount = 0;
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                var groupA = this.m_groupBuffer[a];
                var groupB = this.m_groupBuffer[b];
                if (groupA && groupA === groupB &&
                    (groupA.m_groupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth)) {
                    contactGroups[contactGroupsCount++] = contact;
                }
            }
            var groupsToUpdate = [];
            var groupsToUpdateCount = 0;
            for (var group = this.m_groupList; group; group = group.GetNext()) {
                if (group.m_groupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth) {
                    groupsToUpdate[groupsToUpdateCount++] = group;
                    this.SetGroupFlags(group, group.m_groupFlags &
                        ~b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth);
                    for (var i = group.m_firstIndex; i < group.m_lastIndex; i++) {
                        this.m_accumulationBuffer[i] = 0;
                    }
                }
            }
            for (var k = 0; k < contactGroupsCount; k++) {
                var contact = contactGroups[k];
                var a = contact.indexA;
                var b = contact.indexB;
                var w = contact.weight;
                this.m_accumulationBuffer[a] += w;
                this.m_accumulationBuffer[b] += w;
            }
            for (var i = 0; i < groupsToUpdateCount; i++) {
                var group = groupsToUpdate[i];
                for (var i_3 = group.m_firstIndex; i_3 < group.m_lastIndex; i_3++) {
                    var w = this.m_accumulationBuffer[i_3];
                    this.m_depthBuffer[i_3] = w < 0.8 ? 0 : b2Settings_39.b2_maxFloat;
                }
            }
            var iterationCount = b2Math_32.b2Sqrt(this.m_count) >> 0;
            for (var t = 0; t < iterationCount; t++) {
                var updated = false;
                for (var k = 0; k < contactGroupsCount; k++) {
                    var contact = contactGroups[k];
                    var a = contact.indexA;
                    var b = contact.indexB;
                    var r = 1 - contact.weight;
                    var ap0 = this.m_depthBuffer[a];
                    var bp0 = this.m_depthBuffer[b];
                    var ap1 = bp0 + r;
                    var bp1 = ap0 + r;
                    if (ap0 > ap1) {
                        this.m_depthBuffer[a] = ap1;
                        updated = true;
                    }
                    if (bp0 > bp1) {
                        this.m_depthBuffer[b] = bp1;
                        updated = true;
                    }
                }
                if (!updated) {
                    break;
                }
            }
            for (var i = 0; i < groupsToUpdateCount; i++) {
                var group = groupsToUpdate[i];
                for (var i_4 = group.m_firstIndex; i_4 < group.m_lastIndex; i_4++) {
                    if (this.m_depthBuffer[i_4] < b2Settings_39.b2_maxFloat) {
                        this.m_depthBuffer[i_4] *= this.m_particleDiameter;
                    }
                    else {
                        this.m_depthBuffer[i_4] = 0;
                    }
                }
            }
        };
        b2ParticleSystem.prototype.GetInsideBoundsEnumerator = function (aabb) {
            var lowerTag = b2ParticleSystem.computeTag(this.m_inverseDiameter * aabb.lowerBound.x - 1, this.m_inverseDiameter * aabb.lowerBound.y - 1);
            var upperTag = b2ParticleSystem.computeTag(this.m_inverseDiameter * aabb.upperBound.x + 1, this.m_inverseDiameter * aabb.upperBound.y + 1);
            var beginProxy = 0;
            var endProxy = this.m_proxyBuffer.count;
            var firstProxy = std_lower_bound(this.m_proxyBuffer.data, beginProxy, endProxy, lowerTag, b2ParticleSystem.Proxy.CompareProxyTag);
            var lastProxy = std_upper_bound(this.m_proxyBuffer.data, beginProxy, endProxy, upperTag, b2ParticleSystem.Proxy.CompareTagProxy);
            return new b2ParticleSystem.InsideBoundsEnumerator(this, lowerTag, upperTag, firstProxy, lastProxy);
        };
        b2ParticleSystem.prototype.UpdateAllParticleFlags = function () {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            this.m_allParticleFlags = 0;
            for (var i = 0; i < this.m_count; i++) {
                this.m_allParticleFlags |= this.m_flagsBuffer.data[i];
            }
            this.m_needsUpdateAllParticleFlags = false;
        };
        b2ParticleSystem.prototype.UpdateAllGroupFlags = function () {
            this.m_allGroupFlags = 0;
            for (var group = this.m_groupList; group; group = group.GetNext()) {
                this.m_allGroupFlags |= group.m_groupFlags;
            }
            this.m_needsUpdateAllGroupFlags = false;
        };
        b2ParticleSystem.prototype.AddContact = function (a, b, contacts) {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            var s_d = b2ParticleSystem.AddContact_s_d;
            var pos_data = this.m_positionBuffer.data;
            var d = b2Math_32.b2Vec2.SubVV(pos_data[b], pos_data[a], s_d);
            var distBtParticlesSq = b2Math_32.b2Vec2.DotVV(d, d);
            if (distBtParticlesSq < this.m_squaredDiameter) {
                var invD = b2Math_32.b2InvSqrt(distBtParticlesSq);
                if (!isFinite(invD)) {
                    invD = 1.98177537e+019;
                }
                var contact = this.m_contactBuffer.data[this.m_contactBuffer.Append()];
                contact.indexA = a;
                contact.indexB = b;
                contact.flags = this.m_flagsBuffer.data[a] | this.m_flagsBuffer.data[b];
                contact.weight = 1 - distBtParticlesSq * invD * this.m_inverseDiameter;
                b2Math_32.b2Vec2.MulSV(invD, d, contact.normal);
            }
        };
        b2ParticleSystem.prototype.FindContacts_Reference = function (contacts) {
            var beginProxy = 0;
            var endProxy = this.m_proxyBuffer.count;
            this.m_contactBuffer.count = 0;
            for (var a = beginProxy, c = beginProxy; a < endProxy; a++) {
                var rightTag = b2ParticleSystem.computeRelativeTag(this.m_proxyBuffer.data[a].tag, 1, 0);
                for (var b = a + 1; b < endProxy; b++) {
                    if (rightTag < this.m_proxyBuffer.data[b].tag) {
                        break;
                    }
                    this.AddContact(this.m_proxyBuffer.data[a].index, this.m_proxyBuffer.data[b].index, this.m_contactBuffer);
                }
                var bottomLeftTag = b2ParticleSystem.computeRelativeTag(this.m_proxyBuffer.data[a].tag, -1, 1);
                for (; c < endProxy; c++) {
                    if (bottomLeftTag <= this.m_proxyBuffer.data[c].tag) {
                        break;
                    }
                }
                var bottomRightTag = b2ParticleSystem.computeRelativeTag(this.m_proxyBuffer.data[a].tag, 1, 1);
                for (var b = c; b < endProxy; b++) {
                    if (bottomRightTag < this.m_proxyBuffer.data[b].tag) {
                        break;
                    }
                    this.AddContact(this.m_proxyBuffer.data[a].index, this.m_proxyBuffer.data[b].index, this.m_contactBuffer);
                }
            }
        };
        b2ParticleSystem.prototype.FindContacts = function (contacts) {
            this.FindContacts_Reference(contacts);
        };
        b2ParticleSystem.prototype.UpdateProxies_Reference = function (proxies) {
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var inv_diam = this.m_inverseDiameter;
            for (var k = 0; k < this.m_proxyBuffer.count; ++k) {
                var proxy = this.m_proxyBuffer.data[k];
                var i = proxy.index;
                var p = pos_data[i];
                proxy.tag = b2ParticleSystem.computeTag(inv_diam * p.x, inv_diam * p.y);
            }
        };
        b2ParticleSystem.prototype.UpdateProxies = function (proxies) {
            this.UpdateProxies_Reference(proxies);
        };
        b2ParticleSystem.prototype.SortProxies = function (proxies) {
            std_sort(this.m_proxyBuffer.data, 0, this.m_proxyBuffer.count, b2ParticleSystem.Proxy.CompareProxyProxy);
        };
        b2ParticleSystem.prototype.FilterContacts = function (contacts) {
            var contactFilter = this.GetParticleContactFilter();
            if (contactFilter === null) {
                return;
            }
            var system = this;
            var predicate = function (contact) {
                return ((contact.flags & b2Particle_2.b2ParticleFlag.b2_particleContactFilterParticle) !== 0) && !contactFilter.ShouldCollideParticleParticle(system, contact.indexA, contact.indexB);
            };
            this.m_contactBuffer.RemoveIf(predicate);
        };
        b2ParticleSystem.prototype.NotifyContactListenerPreContact = function (particlePairs) {
            var contactListener = this.GetParticleContactListener();
            if (contactListener === null) {
                return;
            }
            particlePairs.Initialize(this.m_contactBuffer, this.m_flagsBuffer);
            throw new Error();
        };
        b2ParticleSystem.prototype.NotifyContactListenerPostContact = function (particlePairs) {
            var contactListener = this.GetParticleContactListener();
            if (contactListener === null) {
                return;
            }
            for (var k = 0; k < this.m_contactBuffer.count; ++k) {
                var contact = this.m_contactBuffer.data[k];
                var itemIndex = -1;
                if (itemIndex >= 0) {
                    particlePairs.Invalidate(itemIndex);
                }
                else {
                    contactListener.BeginContactParticleParticle(this, contact);
                }
            }
            throw new Error();
        };
        b2ParticleSystem.b2ParticleContactIsZombie = function (contact) {
            return (contact.flags & b2Particle_2.b2ParticleFlag.b2_zombieParticle) === b2Particle_2.b2ParticleFlag.b2_zombieParticle;
        };
        b2ParticleSystem.prototype.UpdateContacts = function (exceptZombie) {
            this.UpdateProxies(this.m_proxyBuffer);
            this.SortProxies(this.m_proxyBuffer);
            var particlePairs = new b2ParticleSystem.b2ParticlePairSet();
            this.NotifyContactListenerPreContact(particlePairs);
            this.FindContacts(this.m_contactBuffer);
            this.FilterContacts(this.m_contactBuffer);
            this.NotifyContactListenerPostContact(particlePairs);
            if (exceptZombie) {
                this.m_contactBuffer.RemoveIf(b2ParticleSystem.b2ParticleContactIsZombie);
            }
        };
        b2ParticleSystem.prototype.NotifyBodyContactListenerPreContact = function (fixtureSet) {
            var contactListener = this.GetFixtureContactListener();
            if (contactListener === null) {
                return;
            }
            fixtureSet.Initialize(this.m_bodyContactBuffer, this.m_flagsBuffer);
            throw new Error();
        };
        b2ParticleSystem.prototype.NotifyBodyContactListenerPostContact = function (fixtureSet) {
            var contactListener = this.GetFixtureContactListener();
            if (contactListener === null) {
                return;
            }
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var index = -1;
                if (index >= 0) {
                    fixtureSet.Invalidate(index);
                }
                else {
                    contactListener.BeginContactFixtureParticle(this, contact);
                }
            }
            throw new Error();
        };
        b2ParticleSystem.prototype.UpdateBodyContacts = function () {
            var s_aabb = b2ParticleSystem.UpdateBodyContacts_s_aabb;
            var fixtureSet = new b2ParticleSystem.FixtureParticleSet();
            this.NotifyBodyContactListenerPreContact(fixtureSet);
            if (this.m_stuckThreshold > 0) {
                if (!this.m_bodyContactCountBuffer.data) {
                    throw new Error();
                }
                if (!this.m_lastBodyContactStepBuffer.data) {
                    throw new Error();
                }
                if (!this.m_consecutiveContactStepsBuffer.data) {
                    throw new Error();
                }
                var particleCount = this.GetParticleCount();
                for (var i = 0; i < particleCount; i++) {
                    this.m_bodyContactCountBuffer.data[i] = 0;
                    if (this.m_timestamp > (this.m_lastBodyContactStepBuffer.data[i] + 1)) {
                        this.m_consecutiveContactStepsBuffer.data[i] = 0;
                    }
                }
            }
            this.m_bodyContactBuffer.SetCount(0);
            this.m_stuckParticleBuffer.SetCount(0);
            var aabb = s_aabb;
            this.ComputeAABB(aabb);
            var callback = new b2ParticleSystem.UpdateBodyContactsCallback(this, this.GetFixtureContactFilter());
            this.m_world.QueryAABB(callback, aabb);
            if (this.m_def.strictContactCheck) {
                this.RemoveSpuriousBodyContacts();
            }
            this.NotifyBodyContactListenerPostContact(fixtureSet);
        };
        b2ParticleSystem.prototype.Solve = function (step) {
            var s_subStep = b2ParticleSystem.Solve_s_subStep;
            if (this.m_count === 0) {
                return;
            }
            if (this.m_expirationTimeBuffer.data) {
                this.SolveLifetimes(step);
            }
            if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_zombieParticle) {
                this.SolveZombie();
            }
            if (this.m_needsUpdateAllParticleFlags) {
                this.UpdateAllParticleFlags();
            }
            if (this.m_needsUpdateAllGroupFlags) {
                this.UpdateAllGroupFlags();
            }
            if (this.m_paused) {
                return;
            }
            for (this.m_iterationIndex = 0; this.m_iterationIndex < step.particleIterations; this.m_iterationIndex++) {
                ++this.m_timestamp;
                var subStep = s_subStep.Copy(step);
                subStep.dt /= step.particleIterations;
                subStep.inv_dt *= step.particleIterations;
                this.UpdateContacts(false);
                this.UpdateBodyContacts();
                this.ComputeWeight();
                if (this.m_allGroupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth) {
                    this.ComputeDepth();
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_reactiveParticle) {
                    this.UpdatePairsAndTriadsWithReactiveParticles();
                }
                if (this.m_hasForce) {
                    this.SolveForce(subStep);
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_viscousParticle) {
                    this.SolveViscous();
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_repulsiveParticle) {
                    this.SolveRepulsive(subStep);
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_powderParticle) {
                    this.SolvePowder(subStep);
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_tensileParticle) {
                    this.SolveTensile(subStep);
                }
                if (this.m_allGroupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_solidParticleGroup) {
                    this.SolveSolid(subStep);
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_colorMixingParticle) {
                    this.SolveColorMixing();
                }
                this.SolveGravity(subStep);
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_staticPressureParticle) {
                    this.SolveStaticPressure(subStep);
                }
                this.SolvePressure(subStep);
                this.SolveDamping(subStep);
                if (this.m_allParticleFlags & b2ParticleSystem.k_extraDampingFlags) {
                    this.SolveExtraDamping();
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_elasticParticle) {
                    this.SolveElastic(subStep);
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_springParticle) {
                    this.SolveSpring(subStep);
                }
                this.LimitVelocity(subStep);
                if (this.m_allGroupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_rigidParticleGroup) {
                    this.SolveRigidDamping();
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_barrierParticle) {
                    this.SolveBarrier(subStep);
                }
                this.SolveCollision(subStep);
                if (this.m_allGroupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_rigidParticleGroup) {
                    this.SolveRigid(subStep);
                }
                if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_wallParticle) {
                    this.SolveWall();
                }
                if (!this.m_positionBuffer.data) {
                    throw new Error();
                }
                if (!this.m_velocityBuffer.data) {
                    throw new Error();
                }
                for (var i = 0; i < this.m_count; i++) {
                    this.m_positionBuffer.data[i].SelfMulAdd(subStep.dt, this.m_velocityBuffer.data[i]);
                }
            }
        };
        b2ParticleSystem.prototype.SolveCollision = function (step) {
            var s_aabb = b2ParticleSystem.SolveCollision_s_aabb;
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            var aabb = s_aabb;
            aabb.lowerBound.x = +b2Settings_39.b2_maxFloat;
            aabb.lowerBound.y = +b2Settings_39.b2_maxFloat;
            aabb.upperBound.x = -b2Settings_39.b2_maxFloat;
            aabb.upperBound.y = -b2Settings_39.b2_maxFloat;
            for (var i = 0; i < this.m_count; i++) {
                var v = vel_data[i];
                var p1 = pos_data[i];
                var p2_x = p1.x + step.dt * v.x;
                var p2_y = p1.y + step.dt * v.y;
                aabb.lowerBound.x = b2Math_32.b2Min(aabb.lowerBound.x, b2Math_32.b2Min(p1.x, p2_x));
                aabb.lowerBound.y = b2Math_32.b2Min(aabb.lowerBound.y, b2Math_32.b2Min(p1.y, p2_y));
                aabb.upperBound.x = b2Math_32.b2Max(aabb.upperBound.x, b2Math_32.b2Max(p1.x, p2_x));
                aabb.upperBound.y = b2Math_32.b2Max(aabb.upperBound.y, b2Math_32.b2Max(p1.y, p2_y));
            }
            var callback = new b2ParticleSystem.SolveCollisionCallback(this, step);
            this.m_world.QueryAABB(callback, aabb);
        };
        b2ParticleSystem.prototype.LimitVelocity = function (step) {
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            var criticalVelocitySquared = this.GetCriticalVelocitySquared(step);
            for (var i = 0; i < this.m_count; i++) {
                var v = vel_data[i];
                var v2 = b2Math_32.b2Vec2.DotVV(v, v);
                if (v2 > criticalVelocitySquared) {
                    v.SelfMul(b2Math_32.b2Sqrt(criticalVelocitySquared / v2));
                }
            }
        };
        b2ParticleSystem.prototype.SolveGravity = function (step) {
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var s_gravity = b2ParticleSystem.SolveGravity_s_gravity;
            var vel_data = this.m_velocityBuffer.data;
            var gravity = b2Math_32.b2Vec2.MulSV(step.dt * this.m_def.gravityScale, this.m_world.GetGravity(), s_gravity);
            for (var i = 0; i < this.m_count; i++) {
                vel_data[i].SelfAdd(gravity);
            }
        };
        b2ParticleSystem.prototype.SolveBarrier = function (step) {
            var s_aabb = b2ParticleSystem.SolveBarrier_s_aabb;
            var s_va = b2ParticleSystem.SolveBarrier_s_va;
            var s_vb = b2ParticleSystem.SolveBarrier_s_vb;
            var s_pba = b2ParticleSystem.SolveBarrier_s_pba;
            var s_vba = b2ParticleSystem.SolveBarrier_s_vba;
            var s_vc = b2ParticleSystem.SolveBarrier_s_vc;
            var s_pca = b2ParticleSystem.SolveBarrier_s_pca;
            var s_vca = b2ParticleSystem.SolveBarrier_s_vca;
            var s_qba = b2ParticleSystem.SolveBarrier_s_qba;
            var s_qca = b2ParticleSystem.SolveBarrier_s_qca;
            var s_dv = b2ParticleSystem.SolveBarrier_s_dv;
            var s_f = b2ParticleSystem.SolveBarrier_s_f;
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            for (var i = 0; i < this.m_count; i++) {
                var flags = this.m_flagsBuffer.data[i];
                if ((flags & b2ParticleSystem.k_barrierWallFlags) !== 0) {
                    vel_data[i].SetZero();
                }
            }
            var tmax = b2Settings_39.b2_barrierCollisionTime * step.dt;
            var mass = this.GetParticleMass();
            for (var k = 0; k < this.m_pairBuffer.count; k++) {
                var pair = this.m_pairBuffer.data[k];
                if (pair.flags & b2Particle_2.b2ParticleFlag.b2_barrierParticle) {
                    var a = pair.indexA;
                    var b = pair.indexB;
                    var pa = pos_data[a];
                    var pb = pos_data[b];
                    var aabb = s_aabb;
                    b2Math_32.b2Vec2.MinV(pa, pb, aabb.lowerBound);
                    b2Math_32.b2Vec2.MaxV(pa, pb, aabb.upperBound);
                    var aGroup = this.m_groupBuffer[a];
                    var bGroup = this.m_groupBuffer[b];
                    var va = this.GetLinearVelocity(aGroup, a, pa, s_va);
                    var vb = this.GetLinearVelocity(bGroup, b, pb, s_vb);
                    var pba = b2Math_32.b2Vec2.SubVV(pb, pa, s_pba);
                    var vba = b2Math_32.b2Vec2.SubVV(vb, va, s_vba);
                    var enumerator = this.GetInsideBoundsEnumerator(aabb);
                    var c = void 0;
                    while ((c = enumerator.GetNext()) >= 0) {
                        var pc = pos_data[c];
                        var cGroup = this.m_groupBuffer[c];
                        if (aGroup !== cGroup && bGroup !== cGroup) {
                            var vc = this.GetLinearVelocity(cGroup, c, pc, s_vc);
                            var pca = b2Math_32.b2Vec2.SubVV(pc, pa, s_pca);
                            var vca = b2Math_32.b2Vec2.SubVV(vc, va, s_vca);
                            var e2 = b2Math_32.b2Vec2.CrossVV(vba, vca);
                            var e1 = b2Math_32.b2Vec2.CrossVV(pba, vca) - b2Math_32.b2Vec2.CrossVV(pca, vba);
                            var e0 = b2Math_32.b2Vec2.CrossVV(pba, pca);
                            var s = void 0, t = void 0;
                            var qba = s_qba, qca = s_qca;
                            if (e2 === 0) {
                                if (e1 === 0) {
                                    continue;
                                }
                                t = -e0 / e1;
                                if (!(t >= 0 && t < tmax)) {
                                    continue;
                                }
                                b2Math_32.b2Vec2.AddVMulSV(pba, t, vba, qba);
                                b2Math_32.b2Vec2.AddVMulSV(pca, t, vca, qca);
                                s = b2Math_32.b2Vec2.DotVV(qba, qca) / b2Math_32.b2Vec2.DotVV(qba, qba);
                                if (!(s >= 0 && s <= 1)) {
                                    continue;
                                }
                            }
                            else {
                                var det = e1 * e1 - 4 * e0 * e2;
                                if (det < 0) {
                                    continue;
                                }
                                var sqrtDet = b2Math_32.b2Sqrt(det);
                                var t1 = (-e1 - sqrtDet) / (2 * e2);
                                var t2 = (-e1 + sqrtDet) / (2 * e2);
                                if (t1 > t2) {
                                    var tmp = t1;
                                    t1 = t2;
                                    t2 = tmp;
                                }
                                t = t1;
                                b2Math_32.b2Vec2.AddVMulSV(pba, t, vba, qba);
                                b2Math_32.b2Vec2.AddVMulSV(pca, t, vca, qca);
                                s = b2Math_32.b2Vec2.DotVV(qba, qca) / b2Math_32.b2Vec2.DotVV(qba, qba);
                                if (!(t >= 0 && t < tmax && s >= 0 && s <= 1)) {
                                    t = t2;
                                    if (!(t >= 0 && t < tmax)) {
                                        continue;
                                    }
                                    b2Math_32.b2Vec2.AddVMulSV(pba, t, vba, qba);
                                    b2Math_32.b2Vec2.AddVMulSV(pca, t, vca, qca);
                                    s = b2Math_32.b2Vec2.DotVV(qba, qca) / b2Math_32.b2Vec2.DotVV(qba, qba);
                                    if (!(s >= 0 && s <= 1)) {
                                        continue;
                                    }
                                }
                            }
                            var dv = s_dv;
                            dv.x = va.x + s * vba.x - vc.x;
                            dv.y = va.y + s * vba.y - vc.y;
                            var f = b2Math_32.b2Vec2.MulSV(mass, dv, s_f);
                            if (cGroup && this.IsRigidGroup(cGroup)) {
                                var mass_1 = cGroup.GetMass();
                                var inertia = cGroup.GetInertia();
                                if (mass_1 > 0) {
                                    cGroup.m_linearVelocity.SelfMulAdd(1 / mass_1, f);
                                }
                                if (inertia > 0) {
                                    cGroup.m_angularVelocity += b2Math_32.b2Vec2.CrossVV(b2Math_32.b2Vec2.SubVV(pc, cGroup.GetCenter(), b2Math_32.b2Vec2.s_t0), f) / inertia;
                                }
                            }
                            else {
                                vel_data[c].SelfAdd(dv);
                            }
                            this.ParticleApplyForce(c, f.SelfMul(-step.inv_dt));
                        }
                    }
                }
            }
        };
        b2ParticleSystem.prototype.SolveStaticPressure = function (step) {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            this.m_staticPressureBuffer = this.RequestBuffer(this.m_staticPressureBuffer);
            var criticalPressure = this.GetCriticalPressure(step);
            var pressurePerWeight = this.m_def.staticPressureStrength * criticalPressure;
            var maxPressure = b2Settings_40.b2_maxParticlePressure * criticalPressure;
            var relaxation = this.m_def.staticPressureRelaxation;
            for (var t = 0; t < this.m_def.staticPressureIterations; t++) {
                for (var i = 0; i < this.m_count; i++) {
                    this.m_accumulationBuffer[i] = 0;
                }
                for (var k = 0; k < this.m_contactBuffer.count; k++) {
                    var contact = this.m_contactBuffer.data[k];
                    if (contact.flags & b2Particle_2.b2ParticleFlag.b2_staticPressureParticle) {
                        var a = contact.indexA;
                        var b = contact.indexB;
                        var w = contact.weight;
                        this.m_accumulationBuffer[a] += w * this.m_staticPressureBuffer[b];
                        this.m_accumulationBuffer[b] += w * this.m_staticPressureBuffer[a];
                    }
                }
                for (var i = 0; i < this.m_count; i++) {
                    var w = this.m_weightBuffer[i];
                    if (this.m_flagsBuffer.data[i] & b2Particle_2.b2ParticleFlag.b2_staticPressureParticle) {
                        var wh = this.m_accumulationBuffer[i];
                        var h = (wh + pressurePerWeight * (w - b2Settings_40.b2_minParticleWeight)) /
                            (w + relaxation);
                        this.m_staticPressureBuffer[i] = b2Math_32.b2Clamp(h, 0.0, maxPressure);
                    }
                    else {
                        this.m_staticPressureBuffer[i] = 0;
                    }
                }
            }
        };
        b2ParticleSystem.prototype.ComputeWeight = function () {
            for (var k = 0; k < this.m_count; k++) {
                this.m_weightBuffer[k] = 0;
            }
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var a = contact.index;
                var w = contact.weight;
                this.m_weightBuffer[a] += w;
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                var w = contact.weight;
                this.m_weightBuffer[a] += w;
                this.m_weightBuffer[b] += w;
            }
        };
        b2ParticleSystem.prototype.SolvePressure = function (step) {
            var s_f = b2ParticleSystem.SolvePressure_s_f;
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            var criticalPressure = this.GetCriticalPressure(step);
            var pressurePerWeight = this.m_def.pressureStrength * criticalPressure;
            var maxPressure = b2Settings_40.b2_maxParticlePressure * criticalPressure;
            for (var i = 0; i < this.m_count; i++) {
                var w = this.m_weightBuffer[i];
                var h = pressurePerWeight * b2Math_32.b2Max(0.0, w - b2Settings_40.b2_minParticleWeight);
                this.m_accumulationBuffer[i] = b2Math_32.b2Min(h, maxPressure);
            }
            if (this.m_allParticleFlags & b2ParticleSystem.k_noPressureFlags) {
                for (var i = 0; i < this.m_count; i++) {
                    if (this.m_flagsBuffer.data[i] & b2ParticleSystem.k_noPressureFlags) {
                        this.m_accumulationBuffer[i] = 0;
                    }
                }
            }
            if (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_staticPressureParticle) {
                for (var i = 0; i < this.m_count; i++) {
                    if (this.m_flagsBuffer.data[i] & b2Particle_2.b2ParticleFlag.b2_staticPressureParticle) {
                        this.m_accumulationBuffer[i] += this.m_staticPressureBuffer[i];
                    }
                }
            }
            var velocityPerPressure = step.dt / (this.m_def.density * this.m_particleDiameter);
            var inv_mass = this.GetParticleInvMass();
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var a = contact.index;
                var b = contact.body;
                var w = contact.weight;
                var m = contact.mass;
                var n = contact.normal;
                var p = pos_data[a];
                var h = this.m_accumulationBuffer[a] + pressurePerWeight * w;
                var f = b2Math_32.b2Vec2.MulSV(velocityPerPressure * w * m * h, n, s_f);
                vel_data[a].SelfMulSub(inv_mass, f);
                b.ApplyLinearImpulse(f, p, true);
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                var w = contact.weight;
                var n = contact.normal;
                var h = this.m_accumulationBuffer[a] + this.m_accumulationBuffer[b];
                var f = b2Math_32.b2Vec2.MulSV(velocityPerPressure * w * h, n, s_f);
                vel_data[a].SelfSub(f);
                vel_data[b].SelfAdd(f);
            }
        };
        b2ParticleSystem.prototype.SolveDamping = function (step) {
            var s_v = b2ParticleSystem.SolveDamping_s_v;
            var s_f = b2ParticleSystem.SolveDamping_s_f;
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            var linearDamping = this.m_def.dampingStrength;
            var quadraticDamping = 1 / this.GetCriticalVelocity(step);
            var inv_mass = this.GetParticleInvMass();
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var a = contact.index;
                var b = contact.body;
                var w = contact.weight;
                var m = contact.mass;
                var n = contact.normal;
                var p = pos_data[a];
                var v = b2Math_32.b2Vec2.SubVV(b.GetLinearVelocityFromWorldPoint(p, b2Math_32.b2Vec2.s_t0), vel_data[a], s_v);
                var vn = b2Math_32.b2Vec2.DotVV(v, n);
                if (vn < 0) {
                    var damping = b2Math_32.b2Max(linearDamping * w, b2Math_32.b2Min(-quadraticDamping * vn, 0.5));
                    var f = b2Math_32.b2Vec2.MulSV(damping * m * vn, n, s_f);
                    vel_data[a].SelfMulAdd(inv_mass, f);
                    b.ApplyLinearImpulse(f.SelfNeg(), p, true);
                }
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                var w = contact.weight;
                var n = contact.normal;
                var v = b2Math_32.b2Vec2.SubVV(vel_data[b], vel_data[a], s_v);
                var vn = b2Math_32.b2Vec2.DotVV(v, n);
                if (vn < 0) {
                    var damping = b2Math_32.b2Max(linearDamping * w, b2Math_32.b2Min(-quadraticDamping * vn, 0.5));
                    var f = b2Math_32.b2Vec2.MulSV(damping * vn, n, s_f);
                    vel_data[a].SelfAdd(f);
                    vel_data[b].SelfSub(f);
                }
            }
        };
        b2ParticleSystem.prototype.SolveRigidDamping = function () {
            var s_t0 = b2ParticleSystem.SolveRigidDamping_s_t0;
            var s_t1 = b2ParticleSystem.SolveRigidDamping_s_t1;
            var s_p = b2ParticleSystem.SolveRigidDamping_s_p;
            var s_v = b2ParticleSystem.SolveRigidDamping_s_v;
            var invMassA = [0.0], invInertiaA = [0.0], tangentDistanceA = [0.0];
            var invMassB = [0.0], invInertiaB = [0.0], tangentDistanceB = [0.0];
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var damping = this.m_def.dampingStrength;
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var a = contact.index;
                var aGroup = this.m_groupBuffer[a];
                if (aGroup && this.IsRigidGroup(aGroup)) {
                    var b = contact.body;
                    var n = contact.normal;
                    var w = contact.weight;
                    var p = pos_data[a];
                    var v = b2Math_32.b2Vec2.SubVV(b.GetLinearVelocityFromWorldPoint(p, s_t0), aGroup.GetLinearVelocityFromWorldPoint(p, s_t1), s_v);
                    var vn = b2Math_32.b2Vec2.DotVV(v, n);
                    if (vn < 0) {
                        this.InitDampingParameterWithRigidGroupOrParticle(invMassA, invInertiaA, tangentDistanceA, true, aGroup, a, p, n);
                        this.InitDampingParameter(invMassB, invInertiaB, tangentDistanceB, b.GetMass(), b.GetInertia() - b.GetMass() * b.GetLocalCenter().LengthSquared(), b.GetWorldCenter(), p, n);
                        var f = damping * b2Math_32.b2Min(w, 1.0) * this.ComputeDampingImpulse(invMassA[0], invInertiaA[0], tangentDistanceA[0], invMassB[0], invInertiaB[0], tangentDistanceB[0], vn);
                        this.ApplyDamping(invMassA[0], invInertiaA[0], tangentDistanceA[0], true, aGroup, a, f, n);
                        b.ApplyLinearImpulse(b2Math_32.b2Vec2.MulSV(-f, n, b2Math_32.b2Vec2.s_t0), p, true);
                    }
                }
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                var n = contact.normal;
                var w = contact.weight;
                var aGroup = this.m_groupBuffer[a];
                var bGroup = this.m_groupBuffer[b];
                var aRigid = this.IsRigidGroup(aGroup);
                var bRigid = this.IsRigidGroup(bGroup);
                if (aGroup !== bGroup && (aRigid || bRigid)) {
                    var p = b2Math_32.b2Vec2.MidVV(pos_data[a], pos_data[b], s_p);
                    var v = b2Math_32.b2Vec2.SubVV(this.GetLinearVelocity(bGroup, b, p, s_t0), this.GetLinearVelocity(aGroup, a, p, s_t1), s_v);
                    var vn = b2Math_32.b2Vec2.DotVV(v, n);
                    if (vn < 0) {
                        this.InitDampingParameterWithRigidGroupOrParticle(invMassA, invInertiaA, tangentDistanceA, aRigid, aGroup, a, p, n);
                        this.InitDampingParameterWithRigidGroupOrParticle(invMassB, invInertiaB, tangentDistanceB, bRigid, bGroup, b, p, n);
                        var f = damping * w * this.ComputeDampingImpulse(invMassA[0], invInertiaA[0], tangentDistanceA[0], invMassB[0], invInertiaB[0], tangentDistanceB[0], vn);
                        this.ApplyDamping(invMassA[0], invInertiaA[0], tangentDistanceA[0], aRigid, aGroup, a, f, n);
                        this.ApplyDamping(invMassB[0], invInertiaB[0], tangentDistanceB[0], bRigid, bGroup, b, -f, n);
                    }
                }
            }
        };
        b2ParticleSystem.prototype.SolveExtraDamping = function () {
            var s_v = b2ParticleSystem.SolveExtraDamping_s_v;
            var s_f = b2ParticleSystem.SolveExtraDamping_s_f;
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            var pos_data = this.m_positionBuffer.data;
            var inv_mass = this.GetParticleInvMass();
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var a = contact.index;
                if (this.m_flagsBuffer.data[a] & b2ParticleSystem.k_extraDampingFlags) {
                    var b = contact.body;
                    var m = contact.mass;
                    var n = contact.normal;
                    var p = pos_data[a];
                    var v = b2Math_32.b2Vec2.SubVV(b.GetLinearVelocityFromWorldPoint(p, b2Math_32.b2Vec2.s_t0), vel_data[a], s_v);
                    var vn = b2Math_32.b2Vec2.DotVV(v, n);
                    if (vn < 0) {
                        var f = b2Math_32.b2Vec2.MulSV(0.5 * m * vn, n, s_f);
                        vel_data[a].SelfMulAdd(inv_mass, f);
                        b.ApplyLinearImpulse(f.SelfNeg(), p, true);
                    }
                }
            }
        };
        b2ParticleSystem.prototype.SolveWall = function () {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            for (var i = 0; i < this.m_count; i++) {
                if (this.m_flagsBuffer.data[i] & b2Particle_2.b2ParticleFlag.b2_wallParticle) {
                    vel_data[i].SetZero();
                }
            }
        };
        b2ParticleSystem.prototype.SolveRigid = function (step) {
            var s_position = b2ParticleSystem.SolveRigid_s_position;
            var s_rotation = b2ParticleSystem.SolveRigid_s_rotation;
            var s_transform = b2ParticleSystem.SolveRigid_s_transform;
            var s_velocityTransform = b2ParticleSystem.SolveRigid_s_velocityTransform;
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            for (var group = this.m_groupList; group; group = group.GetNext()) {
                if (group.m_groupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_rigidParticleGroup) {
                    group.UpdateStatistics();
                    var rotation = s_rotation;
                    rotation.SetAngle(step.dt * group.m_angularVelocity);
                    var position = b2Math_32.b2Vec2.AddVV(group.m_center, b2Math_32.b2Vec2.SubVV(b2Math_32.b2Vec2.MulSV(step.dt, group.m_linearVelocity, b2Math_32.b2Vec2.s_t0), b2Math_32.b2Rot.MulRV(rotation, group.m_center, b2Math_32.b2Vec2.s_t1), b2Math_32.b2Vec2.s_t0), s_position);
                    var transform = s_transform;
                    transform.SetPositionRotation(position, rotation);
                    b2Math_32.b2Transform.MulXX(transform, group.m_transform, group.m_transform);
                    var velocityTransform = s_velocityTransform;
                    velocityTransform.p.x = step.inv_dt * transform.p.x;
                    velocityTransform.p.y = step.inv_dt * transform.p.y;
                    velocityTransform.q.s = step.inv_dt * transform.q.s;
                    velocityTransform.q.c = step.inv_dt * (transform.q.c - 1);
                    for (var i = group.m_firstIndex; i < group.m_lastIndex; i++) {
                        b2Math_32.b2Transform.MulXV(velocityTransform, pos_data[i], vel_data[i]);
                    }
                }
            }
        };
        b2ParticleSystem.prototype.SolveElastic = function (step) {
            var s_pa = b2ParticleSystem.SolveElastic_s_pa;
            var s_pb = b2ParticleSystem.SolveElastic_s_pb;
            var s_pc = b2ParticleSystem.SolveElastic_s_pc;
            var s_r = b2ParticleSystem.SolveElastic_s_r;
            var s_t0 = b2ParticleSystem.SolveElastic_s_t0;
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            var elasticStrength = step.inv_dt * this.m_def.elasticStrength;
            for (var k = 0; k < this.m_triadBuffer.count; k++) {
                var triad = this.m_triadBuffer.data[k];
                if (triad.flags & b2Particle_2.b2ParticleFlag.b2_elasticParticle) {
                    var a = triad.indexA;
                    var b = triad.indexB;
                    var c = triad.indexC;
                    var oa = triad.pa;
                    var ob = triad.pb;
                    var oc = triad.pc;
                    var pa = s_pa.Copy(pos_data[a]);
                    var pb = s_pb.Copy(pos_data[b]);
                    var pc = s_pc.Copy(pos_data[c]);
                    var va = vel_data[a];
                    var vb = vel_data[b];
                    var vc = vel_data[c];
                    pa.SelfMulAdd(step.dt, va);
                    pb.SelfMulAdd(step.dt, vb);
                    pc.SelfMulAdd(step.dt, vc);
                    var midPoint_x = (pa.x + pb.x + pc.x) / 3.0;
                    var midPoint_y = (pa.y + pb.y + pc.y) / 3.0;
                    pa.x -= midPoint_x;
                    pa.y -= midPoint_y;
                    pb.x -= midPoint_x;
                    pb.y -= midPoint_y;
                    pc.x -= midPoint_x;
                    pc.y -= midPoint_y;
                    var r = s_r;
                    r.s = b2Math_32.b2Vec2.CrossVV(oa, pa) + b2Math_32.b2Vec2.CrossVV(ob, pb) + b2Math_32.b2Vec2.CrossVV(oc, pc);
                    r.c = b2Math_32.b2Vec2.DotVV(oa, pa) + b2Math_32.b2Vec2.DotVV(ob, pb) + b2Math_32.b2Vec2.DotVV(oc, pc);
                    var r2 = r.s * r.s + r.c * r.c;
                    var invR = b2Math_32.b2InvSqrt(r2);
                    if (!isFinite(invR)) {
                        invR = 1.98177537e+019;
                    }
                    r.s *= invR;
                    r.c *= invR;
                    var strength = elasticStrength * triad.strength;
                    b2Math_32.b2Rot.MulRV(r, oa, s_t0);
                    b2Math_32.b2Vec2.SubVV(s_t0, pa, s_t0);
                    b2Math_32.b2Vec2.MulSV(strength, s_t0, s_t0);
                    va.SelfAdd(s_t0);
                    b2Math_32.b2Rot.MulRV(r, ob, s_t0);
                    b2Math_32.b2Vec2.SubVV(s_t0, pb, s_t0);
                    b2Math_32.b2Vec2.MulSV(strength, s_t0, s_t0);
                    vb.SelfAdd(s_t0);
                    b2Math_32.b2Rot.MulRV(r, oc, s_t0);
                    b2Math_32.b2Vec2.SubVV(s_t0, pc, s_t0);
                    b2Math_32.b2Vec2.MulSV(strength, s_t0, s_t0);
                    vc.SelfAdd(s_t0);
                }
            }
        };
        b2ParticleSystem.prototype.SolveSpring = function (step) {
            var s_pa = b2ParticleSystem.SolveSpring_s_pa;
            var s_pb = b2ParticleSystem.SolveSpring_s_pb;
            var s_d = b2ParticleSystem.SolveSpring_s_d;
            var s_f = b2ParticleSystem.SolveSpring_s_f;
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            var springStrength = step.inv_dt * this.m_def.springStrength;
            for (var k = 0; k < this.m_pairBuffer.count; k++) {
                var pair = this.m_pairBuffer.data[k];
                if (pair.flags & b2Particle_2.b2ParticleFlag.b2_springParticle) {
                    var a = pair.indexA;
                    var b = pair.indexB;
                    var pa = s_pa.Copy(pos_data[a]);
                    var pb = s_pb.Copy(pos_data[b]);
                    var va = vel_data[a];
                    var vb = vel_data[b];
                    pa.SelfMulAdd(step.dt, va);
                    pb.SelfMulAdd(step.dt, vb);
                    var d = b2Math_32.b2Vec2.SubVV(pb, pa, s_d);
                    var r0 = pair.distance;
                    var r1 = d.Length();
                    var strength = springStrength * pair.strength;
                    var f = b2Math_32.b2Vec2.MulSV(strength * (r0 - r1) / r1, d, s_f);
                    va.SelfSub(f);
                    vb.SelfAdd(f);
                }
            }
        };
        b2ParticleSystem.prototype.SolveTensile = function (step) {
            var s_weightedNormal = b2ParticleSystem.SolveTensile_s_weightedNormal;
            var s_s = b2ParticleSystem.SolveTensile_s_s;
            var s_f = b2ParticleSystem.SolveTensile_s_f;
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            for (var i = 0; i < this.m_count; i++) {
                this.m_accumulation2Buffer[i] = new b2Math_32.b2Vec2();
                this.m_accumulation2Buffer[i].SetZero();
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                if (contact.flags & b2Particle_2.b2ParticleFlag.b2_tensileParticle) {
                    var a = contact.indexA;
                    var b = contact.indexB;
                    var w = contact.weight;
                    var n = contact.normal;
                    var weightedNormal = b2Math_32.b2Vec2.MulSV((1 - w) * w, n, s_weightedNormal);
                    this.m_accumulation2Buffer[a].SelfSub(weightedNormal);
                    this.m_accumulation2Buffer[b].SelfAdd(weightedNormal);
                }
            }
            var criticalVelocity = this.GetCriticalVelocity(step);
            var pressureStrength = this.m_def.surfaceTensionPressureStrength * criticalVelocity;
            var normalStrength = this.m_def.surfaceTensionNormalStrength * criticalVelocity;
            var maxVelocityVariation = b2Settings_40.b2_maxParticleForce * criticalVelocity;
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                if (contact.flags & b2Particle_2.b2ParticleFlag.b2_tensileParticle) {
                    var a = contact.indexA;
                    var b = contact.indexB;
                    var w = contact.weight;
                    var n = contact.normal;
                    var h = this.m_weightBuffer[a] + this.m_weightBuffer[b];
                    var s = b2Math_32.b2Vec2.SubVV(this.m_accumulation2Buffer[b], this.m_accumulation2Buffer[a], s_s);
                    var fn = b2Math_32.b2Min(pressureStrength * (h - 2) + normalStrength * b2Math_32.b2Vec2.DotVV(s, n), maxVelocityVariation) * w;
                    var f = b2Math_32.b2Vec2.MulSV(fn, n, s_f);
                    vel_data[a].SelfSub(f);
                    vel_data[b].SelfAdd(f);
                }
            }
        };
        b2ParticleSystem.prototype.SolveViscous = function () {
            var s_v = b2ParticleSystem.SolveViscous_s_v;
            var s_f = b2ParticleSystem.SolveViscous_s_f;
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            var viscousStrength = this.m_def.viscousStrength;
            var inv_mass = this.GetParticleInvMass();
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var a = contact.index;
                if (this.m_flagsBuffer.data[a] & b2Particle_2.b2ParticleFlag.b2_viscousParticle) {
                    var b = contact.body;
                    var w = contact.weight;
                    var m = contact.mass;
                    var p = pos_data[a];
                    var v = b2Math_32.b2Vec2.SubVV(b.GetLinearVelocityFromWorldPoint(p, b2Math_32.b2Vec2.s_t0), vel_data[a], s_v);
                    var f = b2Math_32.b2Vec2.MulSV(viscousStrength * m * w, v, s_f);
                    vel_data[a].SelfMulAdd(inv_mass, f);
                    b.ApplyLinearImpulse(f.SelfNeg(), p, true);
                }
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                if (contact.flags & b2Particle_2.b2ParticleFlag.b2_viscousParticle) {
                    var a = contact.indexA;
                    var b = contact.indexB;
                    var w = contact.weight;
                    var v = b2Math_32.b2Vec2.SubVV(vel_data[b], vel_data[a], s_v);
                    var f = b2Math_32.b2Vec2.MulSV(viscousStrength * w, v, s_f);
                    vel_data[a].SelfAdd(f);
                    vel_data[b].SelfSub(f);
                }
            }
        };
        b2ParticleSystem.prototype.SolveRepulsive = function (step) {
            var s_f = b2ParticleSystem.SolveRepulsive_s_f;
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            var repulsiveStrength = this.m_def.repulsiveStrength * this.GetCriticalVelocity(step);
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                if (contact.flags & b2Particle_2.b2ParticleFlag.b2_repulsiveParticle) {
                    var a = contact.indexA;
                    var b = contact.indexB;
                    if (this.m_groupBuffer[a] !== this.m_groupBuffer[b]) {
                        var w = contact.weight;
                        var n = contact.normal;
                        var f = b2Math_32.b2Vec2.MulSV(repulsiveStrength * w, n, s_f);
                        vel_data[a].SelfSub(f);
                        vel_data[b].SelfAdd(f);
                    }
                }
            }
        };
        b2ParticleSystem.prototype.SolvePowder = function (step) {
            var s_f = b2ParticleSystem.SolvePowder_s_f;
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var pos_data = this.m_positionBuffer.data;
            var vel_data = this.m_velocityBuffer.data;
            var powderStrength = this.m_def.powderStrength * this.GetCriticalVelocity(step);
            var minWeight = 1.0 - b2Settings_40.b2_particleStride;
            var inv_mass = this.GetParticleInvMass();
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                var a = contact.index;
                if (this.m_flagsBuffer.data[a] & b2Particle_2.b2ParticleFlag.b2_powderParticle) {
                    var w = contact.weight;
                    if (w > minWeight) {
                        var b = contact.body;
                        var m = contact.mass;
                        var p = pos_data[a];
                        var n = contact.normal;
                        var f = b2Math_32.b2Vec2.MulSV(powderStrength * m * (w - minWeight), n, s_f);
                        vel_data[a].SelfMulSub(inv_mass, f);
                        b.ApplyLinearImpulse(f, p, true);
                    }
                }
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                if (contact.flags & b2Particle_2.b2ParticleFlag.b2_powderParticle) {
                    var w = contact.weight;
                    if (w > minWeight) {
                        var a = contact.indexA;
                        var b = contact.indexB;
                        var n = contact.normal;
                        var f = b2Math_32.b2Vec2.MulSV(powderStrength * (w - minWeight), n, s_f);
                        vel_data[a].SelfSub(f);
                        vel_data[b].SelfAdd(f);
                    }
                }
            }
        };
        b2ParticleSystem.prototype.SolveSolid = function (step) {
            var s_f = b2ParticleSystem.SolveSolid_s_f;
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer);
            var ejectionStrength = step.inv_dt * this.m_def.ejectionStrength;
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                var a = contact.indexA;
                var b = contact.indexB;
                if (this.m_groupBuffer[a] !== this.m_groupBuffer[b]) {
                    var w = contact.weight;
                    var n = contact.normal;
                    var h = this.m_depthBuffer[a] + this.m_depthBuffer[b];
                    var f = b2Math_32.b2Vec2.MulSV(ejectionStrength * h * w, n, s_f);
                    vel_data[a].SelfSub(f);
                    vel_data[b].SelfAdd(f);
                }
            }
        };
        b2ParticleSystem.prototype.SolveForce = function (step) {
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var vel_data = this.m_velocityBuffer.data;
            var velocityPerForce = step.dt * this.GetParticleInvMass();
            for (var i = 0; i < this.m_count; i++) {
                vel_data[i].SelfMulAdd(velocityPerForce, this.m_forceBuffer[i]);
            }
            this.m_hasForce = false;
        };
        b2ParticleSystem.prototype.SolveColorMixing = function () {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_colorBuffer.data) {
                throw new Error();
            }
            var colorMixing = 0.5 * this.m_def.colorMixingStrength;
            if (colorMixing) {
                for (var k = 0; k < this.m_contactBuffer.count; k++) {
                    var contact = this.m_contactBuffer.data[k];
                    var a = contact.indexA;
                    var b = contact.indexB;
                    if (this.m_flagsBuffer.data[a] & this.m_flagsBuffer.data[b] &
                        b2Particle_2.b2ParticleFlag.b2_colorMixingParticle) {
                        var colorA = this.m_colorBuffer.data[a];
                        var colorB = this.m_colorBuffer.data[b];
                        b2Draw_3.b2Color.MixColors(colorA, colorB, colorMixing);
                    }
                }
            }
        };
        b2ParticleSystem.prototype.SolveZombie = function () {
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            var newCount = 0;
            var newIndices = [];
            for (var i = 0; i < this.m_count; i++) {
                newIndices[i] = b2Settings_39.b2_invalidParticleIndex;
            }
            var allParticleFlags = 0;
            for (var i = 0; i < this.m_count; i++) {
                var flags = this.m_flagsBuffer.data[i];
                if (flags & b2Particle_2.b2ParticleFlag.b2_zombieParticle) {
                    var destructionListener = this.m_world.m_destructionListener;
                    if ((flags & b2Particle_2.b2ParticleFlag.b2_destructionListenerParticle) && destructionListener) {
                        destructionListener.SayGoodbyeParticle(this, i);
                    }
                    if (this.m_handleIndexBuffer.data) {
                        var handle = this.m_handleIndexBuffer.data[i];
                        if (handle) {
                            handle.SetIndex(b2Settings_39.b2_invalidParticleIndex);
                            this.m_handleIndexBuffer.data[i] = null;
                        }
                    }
                    newIndices[i] = b2Settings_39.b2_invalidParticleIndex;
                }
                else {
                    newIndices[i] = newCount;
                    if (i !== newCount) {
                        if (this.m_handleIndexBuffer.data) {
                            var handle = this.m_handleIndexBuffer.data[i];
                            if (handle) {
                                handle.SetIndex(newCount);
                            }
                            this.m_handleIndexBuffer.data[newCount] = handle;
                        }
                        this.m_flagsBuffer.data[newCount] = this.m_flagsBuffer.data[i];
                        if (this.m_lastBodyContactStepBuffer.data) {
                            this.m_lastBodyContactStepBuffer.data[newCount] = this.m_lastBodyContactStepBuffer.data[i];
                        }
                        if (this.m_bodyContactCountBuffer.data) {
                            this.m_bodyContactCountBuffer.data[newCount] = this.m_bodyContactCountBuffer.data[i];
                        }
                        if (this.m_consecutiveContactStepsBuffer.data) {
                            this.m_consecutiveContactStepsBuffer.data[newCount] = this.m_consecutiveContactStepsBuffer.data[i];
                        }
                        this.m_positionBuffer.data[newCount].Copy(this.m_positionBuffer.data[i]);
                        this.m_velocityBuffer.data[newCount].Copy(this.m_velocityBuffer.data[i]);
                        this.m_groupBuffer[newCount] = this.m_groupBuffer[i];
                        if (this.m_hasForce) {
                            this.m_forceBuffer[newCount].Copy(this.m_forceBuffer[i]);
                        }
                        if (this.m_staticPressureBuffer) {
                            this.m_staticPressureBuffer[newCount] = this.m_staticPressureBuffer[i];
                        }
                        if (this.m_depthBuffer) {
                            this.m_depthBuffer[newCount] = this.m_depthBuffer[i];
                        }
                        if (this.m_colorBuffer.data) {
                            this.m_colorBuffer.data[newCount].Copy(this.m_colorBuffer.data[i]);
                        }
                        if (this.m_userDataBuffer.data) {
                            this.m_userDataBuffer.data[newCount] = this.m_userDataBuffer.data[i];
                        }
                        if (this.m_expirationTimeBuffer.data) {
                            this.m_expirationTimeBuffer.data[newCount] = this.m_expirationTimeBuffer.data[i];
                        }
                    }
                    newCount++;
                    allParticleFlags |= flags;
                }
            }
            var Test = {
                IsProxyInvalid: function (proxy) {
                    return proxy.index < 0;
                },
                IsContactInvalid: function (contact) {
                    return contact.indexA < 0 || contact.indexB < 0;
                },
                IsBodyContactInvalid: function (contact) {
                    return contact.index < 0;
                },
                IsPairInvalid: function (pair) {
                    return pair.indexA < 0 || pair.indexB < 0;
                },
                IsTriadInvalid: function (triad) {
                    return triad.indexA < 0 || triad.indexB < 0 || triad.indexC < 0;
                },
            };
            for (var k = 0; k < this.m_proxyBuffer.count; k++) {
                var proxy = this.m_proxyBuffer.data[k];
                proxy.index = newIndices[proxy.index];
            }
            this.m_proxyBuffer.RemoveIf(Test.IsProxyInvalid);
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                contact.indexA = newIndices[contact.indexA];
                contact.indexB = newIndices[contact.indexB];
            }
            this.m_contactBuffer.RemoveIf(Test.IsContactInvalid);
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                contact.index = newIndices[contact.index];
            }
            this.m_bodyContactBuffer.RemoveIf(Test.IsBodyContactInvalid);
            for (var k = 0; k < this.m_pairBuffer.count; k++) {
                var pair = this.m_pairBuffer.data[k];
                pair.indexA = newIndices[pair.indexA];
                pair.indexB = newIndices[pair.indexB];
            }
            this.m_pairBuffer.RemoveIf(Test.IsPairInvalid);
            for (var k = 0; k < this.m_triadBuffer.count; k++) {
                var triad = this.m_triadBuffer.data[k];
                triad.indexA = newIndices[triad.indexA];
                triad.indexB = newIndices[triad.indexB];
                triad.indexC = newIndices[triad.indexC];
            }
            this.m_triadBuffer.RemoveIf(Test.IsTriadInvalid);
            if (this.m_indexByExpirationTimeBuffer.data) {
                var writeOffset = 0;
                for (var readOffset = 0; readOffset < this.m_count; readOffset++) {
                    var newIndex = newIndices[this.m_indexByExpirationTimeBuffer.data[readOffset]];
                    if (newIndex !== b2Settings_39.b2_invalidParticleIndex) {
                        this.m_indexByExpirationTimeBuffer.data[writeOffset++] = newIndex;
                    }
                }
            }
            for (var group = this.m_groupList; group; group = group.GetNext()) {
                var firstIndex = newCount;
                var lastIndex = 0;
                var modified = false;
                for (var i = group.m_firstIndex; i < group.m_lastIndex; i++) {
                    var j = newIndices[i];
                    if (j >= 0) {
                        firstIndex = b2Math_32.b2Min(firstIndex, j);
                        lastIndex = b2Math_32.b2Max(lastIndex, j + 1);
                    }
                    else {
                        modified = true;
                    }
                }
                if (firstIndex < lastIndex) {
                    group.m_firstIndex = firstIndex;
                    group.m_lastIndex = lastIndex;
                    if (modified) {
                        if (group.m_groupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_solidParticleGroup) {
                            this.SetGroupFlags(group, group.m_groupFlags | b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth);
                        }
                    }
                }
                else {
                    group.m_firstIndex = 0;
                    group.m_lastIndex = 0;
                    if (!(group.m_groupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupCanBeEmpty)) {
                        this.SetGroupFlags(group, group.m_groupFlags | b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupWillBeDestroyed);
                    }
                }
            }
            this.m_count = newCount;
            this.m_allParticleFlags = allParticleFlags;
            this.m_needsUpdateAllParticleFlags = false;
            for (var group = this.m_groupList; group;) {
                var next = group.GetNext();
                if (group.m_groupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupWillBeDestroyed) {
                    this.DestroyParticleGroup(group);
                }
                group = next;
            }
        };
        b2ParticleSystem.prototype.SolveLifetimes = function (step) {
            if (!this.m_expirationTimeBuffer.data) {
                throw new Error();
            }
            if (!this.m_indexByExpirationTimeBuffer.data) {
                throw new Error();
            }
            this.m_timeElapsed = this.LifetimeToExpirationTime(step.dt);
            var quantizedTimeElapsed = this.GetQuantizedTimeElapsed();
            var expirationTimes = this.m_expirationTimeBuffer.data;
            var expirationTimeIndices = this.m_indexByExpirationTimeBuffer.data;
            var particleCount = this.GetParticleCount();
            if (this.m_expirationTimeBufferRequiresSorting) {
                var ExpirationTimeComparator = function (particleIndexA, particleIndexB) {
                    var expirationTimeA = expirationTimes[particleIndexA];
                    var expirationTimeB = expirationTimes[particleIndexB];
                    var infiniteExpirationTimeA = expirationTimeA <= 0.0;
                    var infiniteExpirationTimeB = expirationTimeB <= 0.0;
                    return infiniteExpirationTimeA === infiniteExpirationTimeB ?
                        expirationTimeA > expirationTimeB : infiniteExpirationTimeA;
                };
                std_sort(expirationTimeIndices, 0, particleCount, ExpirationTimeComparator);
                this.m_expirationTimeBufferRequiresSorting = false;
            }
            for (var i = particleCount - 1; i >= 0; --i) {
                var particleIndex = expirationTimeIndices[i];
                var expirationTime = expirationTimes[particleIndex];
                if (quantizedTimeElapsed < expirationTime || expirationTime <= 0) {
                    break;
                }
                this.DestroyParticle(particleIndex);
            }
        };
        b2ParticleSystem.prototype.RotateBuffer = function (start, mid, end) {
            if (start === mid || mid === end) {
                return;
            }
            function newIndices(i) {
                if (i < start) {
                    return i;
                }
                else if (i < mid) {
                    return i + end - mid;
                }
                else if (i < end) {
                    return i + start - mid;
                }
                else {
                    return i;
                }
            }
            if (!this.m_flagsBuffer.data) {
                throw new Error();
            }
            if (!this.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_velocityBuffer.data) {
                throw new Error();
            }
            std_rotate(this.m_flagsBuffer.data, start, mid, end);
            if (this.m_lastBodyContactStepBuffer.data) {
                std_rotate(this.m_lastBodyContactStepBuffer.data, start, mid, end);
            }
            if (this.m_bodyContactCountBuffer.data) {
                std_rotate(this.m_bodyContactCountBuffer.data, start, mid, end);
            }
            if (this.m_consecutiveContactStepsBuffer.data) {
                std_rotate(this.m_consecutiveContactStepsBuffer.data, start, mid, end);
            }
            std_rotate(this.m_positionBuffer.data, start, mid, end);
            std_rotate(this.m_velocityBuffer.data, start, mid, end);
            std_rotate(this.m_groupBuffer, start, mid, end);
            if (this.m_hasForce) {
                std_rotate(this.m_forceBuffer, start, mid, end);
            }
            if (this.m_staticPressureBuffer) {
                std_rotate(this.m_staticPressureBuffer, start, mid, end);
            }
            if (this.m_depthBuffer) {
                std_rotate(this.m_depthBuffer, start, mid, end);
            }
            if (this.m_colorBuffer.data) {
                std_rotate(this.m_colorBuffer.data, start, mid, end);
            }
            if (this.m_userDataBuffer.data) {
                std_rotate(this.m_userDataBuffer.data, start, mid, end);
            }
            if (this.m_handleIndexBuffer.data) {
                std_rotate(this.m_handleIndexBuffer.data, start, mid, end);
                for (var i = start; i < end; ++i) {
                    var handle = this.m_handleIndexBuffer.data[i];
                    if (handle) {
                        handle.SetIndex(newIndices(handle.GetIndex()));
                    }
                }
            }
            if (this.m_expirationTimeBuffer.data) {
                std_rotate(this.m_expirationTimeBuffer.data, start, mid, end);
                var particleCount = this.GetParticleCount();
                if (!this.m_indexByExpirationTimeBuffer.data) {
                    throw new Error();
                }
                var indexByExpirationTime = this.m_indexByExpirationTimeBuffer.data;
                for (var i = 0; i < particleCount; ++i) {
                    indexByExpirationTime[i] = newIndices(indexByExpirationTime[i]);
                }
            }
            for (var k = 0; k < this.m_proxyBuffer.count; k++) {
                var proxy = this.m_proxyBuffer.data[k];
                proxy.index = newIndices(proxy.index);
            }
            for (var k = 0; k < this.m_contactBuffer.count; k++) {
                var contact = this.m_contactBuffer.data[k];
                contact.indexA = newIndices(contact.indexA);
                contact.indexB = newIndices(contact.indexB);
            }
            for (var k = 0; k < this.m_bodyContactBuffer.count; k++) {
                var contact = this.m_bodyContactBuffer.data[k];
                contact.index = newIndices(contact.index);
            }
            for (var k = 0; k < this.m_pairBuffer.count; k++) {
                var pair = this.m_pairBuffer.data[k];
                pair.indexA = newIndices(pair.indexA);
                pair.indexB = newIndices(pair.indexB);
            }
            for (var k = 0; k < this.m_triadBuffer.count; k++) {
                var triad = this.m_triadBuffer.data[k];
                triad.indexA = newIndices(triad.indexA);
                triad.indexB = newIndices(triad.indexB);
                triad.indexC = newIndices(triad.indexC);
            }
            for (var group = this.m_groupList; group; group = group.GetNext()) {
                group.m_firstIndex = newIndices(group.m_firstIndex);
                group.m_lastIndex = newIndices(group.m_lastIndex - 1) + 1;
            }
        };
        b2ParticleSystem.prototype.GetCriticalVelocity = function (step) {
            return this.m_particleDiameter * step.inv_dt;
        };
        b2ParticleSystem.prototype.GetCriticalVelocitySquared = function (step) {
            var velocity = this.GetCriticalVelocity(step);
            return velocity * velocity;
        };
        b2ParticleSystem.prototype.GetCriticalPressure = function (step) {
            return this.m_def.density * this.GetCriticalVelocitySquared(step);
        };
        b2ParticleSystem.prototype.GetParticleStride = function () {
            return b2Settings_40.b2_particleStride * this.m_particleDiameter;
        };
        b2ParticleSystem.prototype.GetParticleMass = function () {
            var stride = this.GetParticleStride();
            return this.m_def.density * stride * stride;
        };
        b2ParticleSystem.prototype.GetParticleInvMass = function () {
            var inverseStride = this.m_inverseDiameter * (1.0 / b2Settings_40.b2_particleStride);
            return this.m_inverseDensity * inverseStride * inverseStride;
        };
        b2ParticleSystem.prototype.GetFixtureContactFilter = function () {
            return (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_fixtureContactFilterParticle) ?
                this.m_world.m_contactManager.m_contactFilter : null;
        };
        b2ParticleSystem.prototype.GetParticleContactFilter = function () {
            return (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_particleContactFilterParticle) ?
                this.m_world.m_contactManager.m_contactFilter : null;
        };
        b2ParticleSystem.prototype.GetFixtureContactListener = function () {
            return (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_fixtureContactListenerParticle) ?
                this.m_world.m_contactManager.m_contactListener : null;
        };
        b2ParticleSystem.prototype.GetParticleContactListener = function () {
            return (this.m_allParticleFlags & b2Particle_2.b2ParticleFlag.b2_particleContactListenerParticle) ?
                this.m_world.m_contactManager.m_contactListener : null;
        };
        b2ParticleSystem.prototype.SetUserOverridableBuffer = function (buffer, newData, newCapacity) {
            buffer.data = newData;
            buffer.userSuppliedCapacity = newCapacity;
        };
        b2ParticleSystem.prototype.SetGroupFlags = function (group, newFlags) {
            var oldFlags = group.m_groupFlags;
            if ((oldFlags ^ newFlags) & b2ParticleGroup_1.b2ParticleGroupFlag.b2_solidParticleGroup) {
                newFlags |= b2ParticleGroup_1.b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth;
            }
            if (oldFlags & ~newFlags) {
                this.m_needsUpdateAllGroupFlags = true;
            }
            if (~this.m_allGroupFlags & newFlags) {
                if (newFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_solidParticleGroup) {
                    this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer);
                }
                this.m_allGroupFlags |= newFlags;
            }
            group.m_groupFlags = newFlags;
        };
        b2ParticleSystem.BodyContactCompare = function (lhs, rhs) {
            if (lhs.index === rhs.index) {
                return lhs.weight > rhs.weight;
            }
            return lhs.index < rhs.index;
        };
        b2ParticleSystem.prototype.RemoveSpuriousBodyContacts = function () {
            std_sort(this.m_bodyContactBuffer.data, 0, this.m_bodyContactBuffer.count, b2ParticleSystem.BodyContactCompare);
            var s_n = b2ParticleSystem.RemoveSpuriousBodyContacts_s_n;
            var s_pos = b2ParticleSystem.RemoveSpuriousBodyContacts_s_pos;
            var s_normal = b2ParticleSystem.RemoveSpuriousBodyContacts_s_normal;
            var k_maxContactsPerPoint = 3;
            var system = this;
            var lastIndex = -1;
            var currentContacts = 0;
            var b2ParticleBodyContactRemovePredicate = function (contact) {
                if (contact.index !== lastIndex) {
                    currentContacts = 0;
                    lastIndex = contact.index;
                }
                if (currentContacts++ > k_maxContactsPerPoint) {
                    return true;
                }
                var n = s_n.Copy(contact.normal);
                n.SelfMul(system.m_particleDiameter * (1 - contact.weight));
                if (!system.m_positionBuffer.data) {
                    throw new Error();
                }
                var pos = b2Math_32.b2Vec2.AddVV(system.m_positionBuffer.data[contact.index], n, s_pos);
                if (!contact.fixture.TestPoint(pos)) {
                    var childCount = contact.fixture.GetShape().GetChildCount();
                    for (var childIndex = 0; childIndex < childCount; childIndex++) {
                        var normal = s_normal;
                        var distance = contact.fixture.ComputeDistance(pos, normal, childIndex);
                        if (distance < b2Settings_39.b2_linearSlop) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            };
            this.m_bodyContactBuffer.count = std_remove_if(this.m_bodyContactBuffer.data, b2ParticleBodyContactRemovePredicate, this.m_bodyContactBuffer.count);
        };
        b2ParticleSystem.prototype.DetectStuckParticle = function (particle) {
            if (this.m_stuckThreshold <= 0) {
                return;
            }
            if (!this.m_bodyContactCountBuffer.data) {
                throw new Error();
            }
            if (!this.m_consecutiveContactStepsBuffer.data) {
                throw new Error();
            }
            if (!this.m_lastBodyContactStepBuffer.data) {
                throw new Error();
            }
            ++this.m_bodyContactCountBuffer.data[particle];
            if (this.m_bodyContactCountBuffer.data[particle] === 2) {
                ++this.m_consecutiveContactStepsBuffer.data[particle];
                if (this.m_consecutiveContactStepsBuffer.data[particle] > this.m_stuckThreshold) {
                    this.m_stuckParticleBuffer.data[this.m_stuckParticleBuffer.Append()] = particle;
                }
            }
            this.m_lastBodyContactStepBuffer.data[particle] = this.m_timestamp;
        };
        b2ParticleSystem.prototype.ValidateParticleIndex = function (index) {
            return index >= 0 && index < this.GetParticleCount() &&
                index !== b2Settings_39.b2_invalidParticleIndex;
        };
        b2ParticleSystem.prototype.GetQuantizedTimeElapsed = function () {
            return Math.floor(this.m_timeElapsed / 0x100000000);
        };
        b2ParticleSystem.prototype.LifetimeToExpirationTime = function (lifetime) {
            return this.m_timeElapsed + Math.floor(((lifetime / this.m_def.lifetimeGranularity) * 0x100000000));
        };
        b2ParticleSystem.prototype.ForceCanBeApplied = function (flags) {
            return !(flags & b2Particle_2.b2ParticleFlag.b2_wallParticle);
        };
        b2ParticleSystem.prototype.PrepareForceBuffer = function () {
            if (!this.m_hasForce) {
                for (var i = 0; i < this.m_count; i++) {
                    this.m_forceBuffer[i].SetZero();
                }
                this.m_hasForce = true;
            }
        };
        b2ParticleSystem.prototype.IsRigidGroup = function (group) {
            return (group !== null) && ((group.m_groupFlags & b2ParticleGroup_1.b2ParticleGroupFlag.b2_rigidParticleGroup) !== 0);
        };
        b2ParticleSystem.prototype.GetLinearVelocity = function (group, particleIndex, point, out) {
            if (group && this.IsRigidGroup(group)) {
                return group.GetLinearVelocityFromWorldPoint(point, out);
            }
            else {
                if (!this.m_velocityBuffer.data) {
                    throw new Error();
                }
                return out.Copy(this.m_velocityBuffer.data[particleIndex]);
            }
        };
        b2ParticleSystem.prototype.InitDampingParameter = function (invMass, invInertia, tangentDistance, mass, inertia, center, point, normal) {
            invMass[0] = mass > 0 ? 1 / mass : 0;
            invInertia[0] = inertia > 0 ? 1 / inertia : 0;
            tangentDistance[0] = b2Math_32.b2Vec2.CrossVV(b2Math_32.b2Vec2.SubVV(point, center, b2Math_32.b2Vec2.s_t0), normal);
        };
        b2ParticleSystem.prototype.InitDampingParameterWithRigidGroupOrParticle = function (invMass, invInertia, tangentDistance, isRigidGroup, group, particleIndex, point, normal) {
            if (group && isRigidGroup) {
                this.InitDampingParameter(invMass, invInertia, tangentDistance, group.GetMass(), group.GetInertia(), group.GetCenter(), point, normal);
            }
            else {
                if (!this.m_flagsBuffer.data) {
                    throw new Error();
                }
                var flags = this.m_flagsBuffer.data[particleIndex];
                this.InitDampingParameter(invMass, invInertia, tangentDistance, flags & b2Particle_2.b2ParticleFlag.b2_wallParticle ? 0 : this.GetParticleMass(), 0, point, point, normal);
            }
        };
        b2ParticleSystem.prototype.ComputeDampingImpulse = function (invMassA, invInertiaA, tangentDistanceA, invMassB, invInertiaB, tangentDistanceB, normalVelocity) {
            var invMass = invMassA + invInertiaA * tangentDistanceA * tangentDistanceA +
                invMassB + invInertiaB * tangentDistanceB * tangentDistanceB;
            return invMass > 0 ? normalVelocity / invMass : 0;
        };
        b2ParticleSystem.prototype.ApplyDamping = function (invMass, invInertia, tangentDistance, isRigidGroup, group, particleIndex, impulse, normal) {
            if (group && isRigidGroup) {
                group.m_linearVelocity.SelfMulAdd(impulse * invMass, normal);
                group.m_angularVelocity += impulse * tangentDistance * invInertia;
            }
            else {
                if (!this.m_velocityBuffer.data) {
                    throw new Error();
                }
                this.m_velocityBuffer.data[particleIndex].SelfMulAdd(impulse * invMass, normal);
            }
        };
        b2ParticleSystem.xTruncBits = 12;
        b2ParticleSystem.yTruncBits = 12;
        b2ParticleSystem.tagBits = 8 * 4;
        b2ParticleSystem.yOffset = 1 << (b2ParticleSystem.yTruncBits - 1);
        b2ParticleSystem.yShift = b2ParticleSystem.tagBits - b2ParticleSystem.yTruncBits;
        b2ParticleSystem.xShift = b2ParticleSystem.tagBits - b2ParticleSystem.yTruncBits - b2ParticleSystem.xTruncBits;
        b2ParticleSystem.xScale = 1 << b2ParticleSystem.xShift;
        b2ParticleSystem.xOffset = b2ParticleSystem.xScale * (1 << (b2ParticleSystem.xTruncBits - 1));
        b2ParticleSystem.yMask = ((1 << b2ParticleSystem.yTruncBits) - 1) << b2ParticleSystem.yShift;
        b2ParticleSystem.xMask = ~b2ParticleSystem.yMask;
        b2ParticleSystem.DestroyParticlesInShape_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.CreateParticleGroup_s_transform = new b2Math_32.b2Transform();
        b2ParticleSystem.ComputeCollisionEnergy_s_v = new b2Math_32.b2Vec2();
        b2ParticleSystem.QueryShapeAABB_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.QueryPointAABB_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.RayCast_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.RayCast_s_p = new b2Math_32.b2Vec2();
        b2ParticleSystem.RayCast_s_v = new b2Math_32.b2Vec2();
        b2ParticleSystem.RayCast_s_n = new b2Math_32.b2Vec2();
        b2ParticleSystem.RayCast_s_point = new b2Math_32.b2Vec2();
        b2ParticleSystem.k_pairFlags = b2Particle_2.b2ParticleFlag.b2_springParticle;
        b2ParticleSystem.k_triadFlags = b2Particle_2.b2ParticleFlag.b2_elasticParticle;
        b2ParticleSystem.k_noPressureFlags = b2Particle_2.b2ParticleFlag.b2_powderParticle | b2Particle_2.b2ParticleFlag.b2_tensileParticle;
        b2ParticleSystem.k_extraDampingFlags = b2Particle_2.b2ParticleFlag.b2_staticPressureParticle;
        b2ParticleSystem.k_barrierWallFlags = b2Particle_2.b2ParticleFlag.b2_barrierParticle | b2Particle_2.b2ParticleFlag.b2_wallParticle;
        b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_edge = new b2EdgeShape_4.b2EdgeShape();
        b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_d = new b2Math_32.b2Vec2();
        b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_p = new b2Math_32.b2Vec2();
        b2ParticleSystem.CreateParticlesFillShapeForGroup_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.CreateParticlesFillShapeForGroup_s_p = new b2Math_32.b2Vec2();
        b2ParticleSystem.UpdatePairsAndTriads_s_dab = new b2Math_32.b2Vec2();
        b2ParticleSystem.UpdatePairsAndTriads_s_dbc = new b2Math_32.b2Vec2();
        b2ParticleSystem.UpdatePairsAndTriads_s_dca = new b2Math_32.b2Vec2();
        b2ParticleSystem.AddContact_s_d = new b2Math_32.b2Vec2();
        b2ParticleSystem.UpdateBodyContacts_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.Solve_s_subStep = new b2TimeStep_4.b2TimeStep();
        b2ParticleSystem.SolveCollision_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.SolveGravity_s_gravity = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_aabb = new b2Collision_11.b2AABB();
        b2ParticleSystem.SolveBarrier_s_va = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_vb = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_pba = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_vba = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_vc = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_pca = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_vca = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_qba = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_qca = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_dv = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveBarrier_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolvePressure_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveDamping_s_v = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveDamping_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveRigidDamping_s_t0 = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveRigidDamping_s_t1 = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveRigidDamping_s_p = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveRigidDamping_s_v = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveExtraDamping_s_v = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveExtraDamping_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveRigid_s_position = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveRigid_s_rotation = new b2Math_32.b2Rot();
        b2ParticleSystem.SolveRigid_s_transform = new b2Math_32.b2Transform();
        b2ParticleSystem.SolveRigid_s_velocityTransform = new b2Math_32.b2Transform();
        b2ParticleSystem.SolveElastic_s_pa = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveElastic_s_pb = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveElastic_s_pc = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveElastic_s_r = new b2Math_32.b2Rot();
        b2ParticleSystem.SolveElastic_s_t0 = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveSpring_s_pa = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveSpring_s_pb = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveSpring_s_d = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveSpring_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveTensile_s_weightedNormal = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveTensile_s_s = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveTensile_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveViscous_s_v = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveViscous_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveRepulsive_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolvePowder_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.SolveSolid_s_f = new b2Math_32.b2Vec2();
        b2ParticleSystem.RemoveSpuriousBodyContacts_s_n = new b2Math_32.b2Vec2();
        b2ParticleSystem.RemoveSpuriousBodyContacts_s_pos = new b2Math_32.b2Vec2();
        b2ParticleSystem.RemoveSpuriousBodyContacts_s_normal = new b2Math_32.b2Vec2();
        return b2ParticleSystem;
    }());
    exports.b2ParticleSystem = b2ParticleSystem;
    (function (b2ParticleSystem) {
        var UserOverridableBuffer = (function () {
            function UserOverridableBuffer() {
                this.data = null;
                this.userSuppliedCapacity = 0;
            }
            return UserOverridableBuffer;
        }());
        b2ParticleSystem.UserOverridableBuffer = UserOverridableBuffer;
        var Proxy = (function () {
            function Proxy() {
                this.index = b2Settings_39.b2_invalidParticleIndex;
                this.tag = 0;
            }
            Proxy.CompareProxyProxy = function (a, b) {
                return a.tag < b.tag;
            };
            Proxy.CompareTagProxy = function (a, b) {
                return a < b.tag;
            };
            Proxy.CompareProxyTag = function (a, b) {
                return a.tag < b;
            };
            return Proxy;
        }());
        b2ParticleSystem.Proxy = Proxy;
        var InsideBoundsEnumerator = (function () {
            function InsideBoundsEnumerator(system, lower, upper, first, last) {
                this.m_system = system;
                this.m_xLower = (lower & b2ParticleSystem.xMask) >>> 0;
                this.m_xUpper = (upper & b2ParticleSystem.xMask) >>> 0;
                this.m_yLower = (lower & b2ParticleSystem.yMask) >>> 0;
                this.m_yUpper = (upper & b2ParticleSystem.yMask) >>> 0;
                this.m_first = first;
                this.m_last = last;
            }
            InsideBoundsEnumerator.prototype.GetNext = function () {
                while (this.m_first < this.m_last) {
                    var xTag = (this.m_system.m_proxyBuffer.data[this.m_first].tag & b2ParticleSystem.xMask) >>> 0;
                    if (xTag >= this.m_xLower && xTag <= this.m_xUpper) {
                        return (this.m_system.m_proxyBuffer.data[this.m_first++]).index;
                    }
                    this.m_first++;
                }
                return b2Settings_39.b2_invalidParticleIndex;
            };
            return InsideBoundsEnumerator;
        }());
        b2ParticleSystem.InsideBoundsEnumerator = InsideBoundsEnumerator;
        var ParticleListNode = (function () {
            function ParticleListNode() {
                this.next = null;
                this.count = 0;
                this.index = 0;
            }
            return ParticleListNode;
        }());
        b2ParticleSystem.ParticleListNode = ParticleListNode;
        var FixedSetAllocator = (function () {
            function FixedSetAllocator() {
            }
            FixedSetAllocator.prototype.Allocate = function (itemSize, count) {
                return count;
            };
            FixedSetAllocator.prototype.Clear = function () {
            };
            FixedSetAllocator.prototype.GetCount = function () {
                return 0;
            };
            FixedSetAllocator.prototype.Invalidate = function (itemIndex) {
            };
            FixedSetAllocator.prototype.GetValidBuffer = function () {
                return [];
            };
            FixedSetAllocator.prototype.GetBuffer = function () {
                return [];
            };
            FixedSetAllocator.prototype.SetCount = function (count) {
            };
            return FixedSetAllocator;
        }());
        b2ParticleSystem.FixedSetAllocator = FixedSetAllocator;
        var FixtureParticle = (function () {
            function FixtureParticle(fixture, particle) {
                this.second = b2Settings_39.b2_invalidParticleIndex;
                this.first = fixture;
                this.second = particle;
            }
            return FixtureParticle;
        }());
        b2ParticleSystem.FixtureParticle = FixtureParticle;
        var FixtureParticleSet = (function (_super) {
            __extends(FixtureParticleSet, _super);
            function FixtureParticleSet() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            FixtureParticleSet.prototype.Initialize = function (bodyContactBuffer, flagsBuffer) {
            };
            FixtureParticleSet.prototype.Find = function (pair) {
                return b2Settings_39.b2_invalidParticleIndex;
            };
            return FixtureParticleSet;
        }(b2ParticleSystem.FixedSetAllocator));
        b2ParticleSystem.FixtureParticleSet = FixtureParticleSet;
        var ParticlePair = (function () {
            function ParticlePair(particleA, particleB) {
                this.first = b2Settings_39.b2_invalidParticleIndex;
                this.second = b2Settings_39.b2_invalidParticleIndex;
                this.first = particleA;
                this.second = particleB;
            }
            return ParticlePair;
        }());
        b2ParticleSystem.ParticlePair = ParticlePair;
        var b2ParticlePairSet = (function (_super) {
            __extends(b2ParticlePairSet, _super);
            function b2ParticlePairSet() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            b2ParticlePairSet.prototype.Initialize = function (contactBuffer, flagsBuffer) {
            };
            b2ParticlePairSet.prototype.Find = function (pair) {
                return b2Settings_39.b2_invalidParticleIndex;
            };
            return b2ParticlePairSet;
        }(b2ParticleSystem.FixedSetAllocator));
        b2ParticleSystem.b2ParticlePairSet = b2ParticlePairSet;
        var ConnectionFilter = (function () {
            function ConnectionFilter() {
            }
            ConnectionFilter.prototype.IsNecessary = function (index) {
                return true;
            };
            ConnectionFilter.prototype.ShouldCreatePair = function (a, b) {
                return true;
            };
            ConnectionFilter.prototype.ShouldCreateTriad = function (a, b, c) {
                return true;
            };
            return ConnectionFilter;
        }());
        b2ParticleSystem.ConnectionFilter = ConnectionFilter;
        var DestroyParticlesInShapeCallback = (function (_super) {
            __extends(DestroyParticlesInShapeCallback, _super);
            function DestroyParticlesInShapeCallback(system, shape, xf, callDestructionListener) {
                var _this = _super.call(this) || this;
                _this.m_callDestructionListener = false;
                _this.m_destroyed = 0;
                _this.m_system = system;
                _this.m_shape = shape;
                _this.m_xf = xf;
                _this.m_callDestructionListener = callDestructionListener;
                _this.m_destroyed = 0;
                return _this;
            }
            DestroyParticlesInShapeCallback.prototype.ReportFixture = function (fixture) {
                return false;
            };
            DestroyParticlesInShapeCallback.prototype.ReportParticle = function (particleSystem, index) {
                if (particleSystem !== this.m_system) {
                    return false;
                }
                if (!this.m_system.m_positionBuffer.data) {
                    throw new Error();
                }
                if (this.m_shape.TestPoint(this.m_xf, this.m_system.m_positionBuffer.data[index])) {
                    this.m_system.DestroyParticle(index, this.m_callDestructionListener);
                    this.m_destroyed++;
                }
                return true;
            };
            DestroyParticlesInShapeCallback.prototype.Destroyed = function () {
                return this.m_destroyed;
            };
            return DestroyParticlesInShapeCallback;
        }(b2WorldCallbacks_4.b2QueryCallback));
        b2ParticleSystem.DestroyParticlesInShapeCallback = DestroyParticlesInShapeCallback;
        var JoinParticleGroupsFilter = (function (_super) {
            __extends(JoinParticleGroupsFilter, _super);
            function JoinParticleGroupsFilter(threshold) {
                var _this = _super.call(this) || this;
                _this.m_threshold = 0;
                _this.m_threshold = threshold;
                return _this;
            }
            JoinParticleGroupsFilter.prototype.ShouldCreatePair = function (a, b) {
                return (a < this.m_threshold && this.m_threshold <= b) ||
                    (b < this.m_threshold && this.m_threshold <= a);
            };
            JoinParticleGroupsFilter.prototype.ShouldCreateTriad = function (a, b, c) {
                return (a < this.m_threshold || b < this.m_threshold || c < this.m_threshold) &&
                    (this.m_threshold <= a || this.m_threshold <= b || this.m_threshold <= c);
            };
            return JoinParticleGroupsFilter;
        }(b2ParticleSystem.ConnectionFilter));
        b2ParticleSystem.JoinParticleGroupsFilter = JoinParticleGroupsFilter;
        var CompositeShape = (function (_super) {
            __extends(CompositeShape, _super);
            function CompositeShape(shapes, shapeCount) {
                if (shapeCount === void 0) { shapeCount = shapes.length; }
                var _this = _super.call(this, b2Shape_8.b2ShapeType.e_unknown, 0) || this;
                _this.m_shapeCount = 0;
                _this.m_shapes = shapes;
                _this.m_shapeCount = shapeCount;
                return _this;
            }
            CompositeShape.prototype.Clone = function () {
                throw new Error();
            };
            CompositeShape.prototype.GetChildCount = function () {
                return 1;
            };
            CompositeShape.prototype.TestPoint = function (xf, p) {
                for (var i = 0; i < this.m_shapeCount; i++) {
                    if (this.m_shapes[i].TestPoint(xf, p)) {
                        return true;
                    }
                }
                return false;
            };
            CompositeShape.prototype.ComputeDistance = function (xf, p, normal, childIndex) {
                return 0;
            };
            CompositeShape.prototype.RayCast = function (output, input, xf, childIndex) {
                return false;
            };
            CompositeShape.prototype.ComputeAABB = function (aabb, xf, childIndex) {
                var s_subaabb = new b2Collision_11.b2AABB();
                aabb.lowerBound.x = +b2Settings_39.b2_maxFloat;
                aabb.lowerBound.y = +b2Settings_39.b2_maxFloat;
                aabb.upperBound.x = -b2Settings_39.b2_maxFloat;
                aabb.upperBound.y = -b2Settings_39.b2_maxFloat;
                for (var i = 0; i < this.m_shapeCount; i++) {
                    var childCount = this.m_shapes[i].GetChildCount();
                    for (var j = 0; j < childCount; j++) {
                        var subaabb = s_subaabb;
                        this.m_shapes[i].ComputeAABB(subaabb, xf, j);
                        aabb.Combine1(subaabb);
                    }
                }
            };
            CompositeShape.prototype.ComputeMass = function (massData, density) {
            };
            CompositeShape.prototype.SetupDistanceProxy = function (proxy, index) {
            };
            CompositeShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
                return 0;
            };
            CompositeShape.prototype.Dump = function (log) {
            };
            return CompositeShape;
        }(b2Shape_8.b2Shape));
        b2ParticleSystem.CompositeShape = CompositeShape;
        var ReactiveFilter = (function (_super) {
            __extends(ReactiveFilter, _super);
            function ReactiveFilter(flagsBuffer) {
                var _this = _super.call(this) || this;
                _this.m_flagsBuffer = flagsBuffer;
                return _this;
            }
            ReactiveFilter.prototype.IsNecessary = function (index) {
                if (!this.m_flagsBuffer.data) {
                    throw new Error();
                }
                return (this.m_flagsBuffer.data[index] & b2Particle_2.b2ParticleFlag.b2_reactiveParticle) !== 0;
            };
            return ReactiveFilter;
        }(b2ParticleSystem.ConnectionFilter));
        b2ParticleSystem.ReactiveFilter = ReactiveFilter;
        var UpdateBodyContactsCallback = (function (_super) {
            __extends(UpdateBodyContactsCallback, _super);
            function UpdateBodyContactsCallback(system, contactFilter) {
                var _this = _super.call(this, system) || this;
                _this.m_contactFilter = contactFilter;
                return _this;
            }
            UpdateBodyContactsCallback.prototype.ShouldCollideFixtureParticle = function (fixture, particleSystem, particleIndex) {
                if (this.m_contactFilter) {
                    var flags = this.m_system.GetFlagsBuffer();
                    if (flags[particleIndex] & b2Particle_2.b2ParticleFlag.b2_fixtureContactFilterParticle) {
                        return this.m_contactFilter.ShouldCollideFixtureParticle(fixture, this.m_system, particleIndex);
                    }
                }
                return true;
            };
            UpdateBodyContactsCallback.prototype.ReportFixtureAndParticle = function (fixture, childIndex, a) {
                var s_n = b2ParticleSystem.UpdateBodyContactsCallback.ReportFixtureAndParticle_s_n;
                var s_rp = b2ParticleSystem.UpdateBodyContactsCallback.ReportFixtureAndParticle_s_rp;
                if (!this.m_system.m_flagsBuffer.data) {
                    throw new Error();
                }
                if (!this.m_system.m_positionBuffer.data) {
                    throw new Error();
                }
                var ap = this.m_system.m_positionBuffer.data[a];
                var n = s_n;
                var d = fixture.ComputeDistance(ap, n, childIndex);
                if (d < this.m_system.m_particleDiameter && this.ShouldCollideFixtureParticle(fixture, this.m_system, a)) {
                    var b = fixture.GetBody();
                    var bp = b.GetWorldCenter();
                    var bm = b.GetMass();
                    var bI = b.GetInertia() - bm * b.GetLocalCenter().LengthSquared();
                    var invBm = bm > 0 ? 1 / bm : 0;
                    var invBI = bI > 0 ? 1 / bI : 0;
                    var invAm = this.m_system.m_flagsBuffer.data[a] &
                        b2Particle_2.b2ParticleFlag.b2_wallParticle ? 0 : this.m_system.GetParticleInvMass();
                    var rp = b2Math_32.b2Vec2.SubVV(ap, bp, s_rp);
                    var rpn = b2Math_32.b2Vec2.CrossVV(rp, n);
                    var invM = invAm + invBm + invBI * rpn * rpn;
                    var contact = this.m_system.m_bodyContactBuffer.data[this.m_system.m_bodyContactBuffer.Append()];
                    contact.index = a;
                    contact.body = b;
                    contact.fixture = fixture;
                    contact.weight = 1 - d * this.m_system.m_inverseDiameter;
                    contact.normal.Copy(n.SelfNeg());
                    contact.mass = invM > 0 ? 1 / invM : 0;
                    this.m_system.DetectStuckParticle(a);
                }
            };
            UpdateBodyContactsCallback.ReportFixtureAndParticle_s_n = new b2Math_32.b2Vec2();
            UpdateBodyContactsCallback.ReportFixtureAndParticle_s_rp = new b2Math_32.b2Vec2();
            return UpdateBodyContactsCallback;
        }(b2FixtureParticleQueryCallback));
        b2ParticleSystem.UpdateBodyContactsCallback = UpdateBodyContactsCallback;
        var SolveCollisionCallback = (function (_super) {
            __extends(SolveCollisionCallback, _super);
            function SolveCollisionCallback(system, step) {
                var _this = _super.call(this, system) || this;
                _this.m_step = step;
                return _this;
            }
            SolveCollisionCallback.prototype.ReportFixtureAndParticle = function (fixture, childIndex, a) {
                var s_p1 = b2ParticleSystem.SolveCollisionCallback.ReportFixtureAndParticle_s_p1;
                var s_output = b2ParticleSystem.SolveCollisionCallback.ReportFixtureAndParticle_s_output;
                var s_input = b2ParticleSystem.SolveCollisionCallback.ReportFixtureAndParticle_s_input;
                var s_p = b2ParticleSystem.SolveCollisionCallback.ReportFixtureAndParticle_s_p;
                var s_v = b2ParticleSystem.SolveCollisionCallback.ReportFixtureAndParticle_s_v;
                var s_f = b2ParticleSystem.SolveCollisionCallback.ReportFixtureAndParticle_s_f;
                var body = fixture.GetBody();
                if (!this.m_system.m_positionBuffer.data) {
                    throw new Error();
                }
                if (!this.m_system.m_velocityBuffer.data) {
                    throw new Error();
                }
                var ap = this.m_system.m_positionBuffer.data[a];
                var av = this.m_system.m_velocityBuffer.data[a];
                var output = s_output;
                var input = s_input;
                if (this.m_system.m_iterationIndex === 0) {
                    var p1 = b2Math_32.b2Transform.MulTXV(body.m_xf0, ap, s_p1);
                    if (fixture.GetShape().GetType() === b2Shape_8.b2ShapeType.e_circleShape) {
                        p1.SelfSub(body.GetLocalCenter());
                        b2Math_32.b2Rot.MulRV(body.m_xf0.q, p1, p1);
                        b2Math_32.b2Rot.MulTRV(body.m_xf.q, p1, p1);
                        p1.SelfAdd(body.GetLocalCenter());
                    }
                    b2Math_32.b2Transform.MulXV(body.m_xf, p1, input.p1);
                }
                else {
                    input.p1.Copy(ap);
                }
                b2Math_32.b2Vec2.AddVMulSV(ap, this.m_step.dt, av, input.p2);
                input.maxFraction = 1;
                if (fixture.RayCast(output, input, childIndex)) {
                    var n = output.normal;
                    var p = s_p;
                    p.x = (1 - output.fraction) * input.p1.x + output.fraction * input.p2.x + b2Settings_39.b2_linearSlop * n.x;
                    p.y = (1 - output.fraction) * input.p1.y + output.fraction * input.p2.y + b2Settings_39.b2_linearSlop * n.y;
                    var v = s_v;
                    v.x = this.m_step.inv_dt * (p.x - ap.x);
                    v.y = this.m_step.inv_dt * (p.y - ap.y);
                    this.m_system.m_velocityBuffer.data[a].Copy(v);
                    var f = s_f;
                    f.x = this.m_step.inv_dt * this.m_system.GetParticleMass() * (av.x - v.x);
                    f.y = this.m_step.inv_dt * this.m_system.GetParticleMass() * (av.y - v.y);
                    this.m_system.ParticleApplyForce(a, f);
                }
            };
            SolveCollisionCallback.prototype.ReportParticle = function (system, index) {
                return false;
            };
            SolveCollisionCallback.ReportFixtureAndParticle_s_p1 = new b2Math_32.b2Vec2();
            SolveCollisionCallback.ReportFixtureAndParticle_s_output = new b2Collision_11.b2RayCastOutput();
            SolveCollisionCallback.ReportFixtureAndParticle_s_input = new b2Collision_11.b2RayCastInput();
            SolveCollisionCallback.ReportFixtureAndParticle_s_p = new b2Math_32.b2Vec2();
            SolveCollisionCallback.ReportFixtureAndParticle_s_v = new b2Math_32.b2Vec2();
            SolveCollisionCallback.ReportFixtureAndParticle_s_f = new b2Math_32.b2Vec2();
            return SolveCollisionCallback;
        }(b2FixtureParticleQueryCallback));
        b2ParticleSystem.SolveCollisionCallback = SolveCollisionCallback;
    })(b2ParticleSystem = exports.b2ParticleSystem || (exports.b2ParticleSystem = {}));
    exports.b2ParticleSystem = b2ParticleSystem;
});
define("Particle/b2ParticleGroup", ["require", "exports", "Common/b2Math", "Common/b2Draw"], function (require, exports, b2Math_33, b2Draw_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ParticleGroupFlag;
    (function (b2ParticleGroupFlag) {
        b2ParticleGroupFlag[b2ParticleGroupFlag["b2_solidParticleGroup"] = 1] = "b2_solidParticleGroup";
        b2ParticleGroupFlag[b2ParticleGroupFlag["b2_rigidParticleGroup"] = 2] = "b2_rigidParticleGroup";
        b2ParticleGroupFlag[b2ParticleGroupFlag["b2_particleGroupCanBeEmpty"] = 4] = "b2_particleGroupCanBeEmpty";
        b2ParticleGroupFlag[b2ParticleGroupFlag["b2_particleGroupWillBeDestroyed"] = 8] = "b2_particleGroupWillBeDestroyed";
        b2ParticleGroupFlag[b2ParticleGroupFlag["b2_particleGroupNeedsUpdateDepth"] = 16] = "b2_particleGroupNeedsUpdateDepth";
        b2ParticleGroupFlag[b2ParticleGroupFlag["b2_particleGroupInternalMask"] = 24] = "b2_particleGroupInternalMask";
    })(b2ParticleGroupFlag = exports.b2ParticleGroupFlag || (exports.b2ParticleGroupFlag = {}));
    var b2ParticleGroupDef = (function () {
        function b2ParticleGroupDef() {
            this.flags = 0;
            this.groupFlags = 0;
            this.position = new b2Math_33.b2Vec2();
            this.angle = 0.0;
            this.linearVelocity = new b2Math_33.b2Vec2();
            this.angularVelocity = 0.0;
            this.color = new b2Draw_4.b2Color();
            this.strength = 1.0;
            this.shapeCount = 0;
            this.stride = 0;
            this.particleCount = 0;
            this.lifetime = 0;
            this.userData = null;
            this.group = null;
        }
        return b2ParticleGroupDef;
    }());
    exports.b2ParticleGroupDef = b2ParticleGroupDef;
    var b2ParticleGroup = (function () {
        function b2ParticleGroup(system) {
            this.m_firstIndex = 0;
            this.m_lastIndex = 0;
            this.m_groupFlags = 0;
            this.m_strength = 1.0;
            this.m_prev = null;
            this.m_next = null;
            this.m_timestamp = -1;
            this.m_mass = 0.0;
            this.m_inertia = 0.0;
            this.m_center = new b2Math_33.b2Vec2();
            this.m_linearVelocity = new b2Math_33.b2Vec2();
            this.m_angularVelocity = 0.0;
            this.m_transform = new b2Math_33.b2Transform();
            this.m_userData = null;
            this.m_system = system;
        }
        b2ParticleGroup.prototype.GetNext = function () {
            return this.m_next;
        };
        b2ParticleGroup.prototype.GetParticleSystem = function () {
            return this.m_system;
        };
        b2ParticleGroup.prototype.GetParticleCount = function () {
            return this.m_lastIndex - this.m_firstIndex;
        };
        b2ParticleGroup.prototype.GetBufferIndex = function () {
            return this.m_firstIndex;
        };
        b2ParticleGroup.prototype.ContainsParticle = function (index) {
            return this.m_firstIndex <= index && index < this.m_lastIndex;
        };
        b2ParticleGroup.prototype.GetAllParticleFlags = function () {
            if (!this.m_system.m_flagsBuffer.data) {
                throw new Error();
            }
            var flags = 0;
            for (var i = this.m_firstIndex; i < this.m_lastIndex; i++) {
                flags |= this.m_system.m_flagsBuffer.data[i];
            }
            return flags;
        };
        b2ParticleGroup.prototype.GetGroupFlags = function () {
            return this.m_groupFlags;
        };
        b2ParticleGroup.prototype.SetGroupFlags = function (flags) {
            flags |= this.m_groupFlags & b2ParticleGroupFlag.b2_particleGroupInternalMask;
            this.m_system.SetGroupFlags(this, flags);
        };
        b2ParticleGroup.prototype.GetMass = function () {
            this.UpdateStatistics();
            return this.m_mass;
        };
        b2ParticleGroup.prototype.GetInertia = function () {
            this.UpdateStatistics();
            return this.m_inertia;
        };
        b2ParticleGroup.prototype.GetCenter = function () {
            this.UpdateStatistics();
            return this.m_center;
        };
        b2ParticleGroup.prototype.GetLinearVelocity = function () {
            this.UpdateStatistics();
            return this.m_linearVelocity;
        };
        b2ParticleGroup.prototype.GetAngularVelocity = function () {
            this.UpdateStatistics();
            return this.m_angularVelocity;
        };
        b2ParticleGroup.prototype.GetTransform = function () {
            return this.m_transform;
        };
        b2ParticleGroup.prototype.GetPosition = function () {
            return this.m_transform.p;
        };
        b2ParticleGroup.prototype.GetAngle = function () {
            return this.m_transform.q.GetAngle();
        };
        b2ParticleGroup.prototype.GetLinearVelocityFromWorldPoint = function (worldPoint, out) {
            var s_t0 = b2ParticleGroup.GetLinearVelocityFromWorldPoint_s_t0;
            this.UpdateStatistics();
            return b2Math_33.b2Vec2.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, b2Math_33.b2Vec2.SubVV(worldPoint, this.m_center, s_t0), out);
        };
        b2ParticleGroup.prototype.GetUserData = function () {
            return this.m_userData;
        };
        b2ParticleGroup.prototype.SetUserData = function (data) {
            this.m_userData = data;
        };
        b2ParticleGroup.prototype.ApplyForce = function (force) {
            this.m_system.ApplyForce(this.m_firstIndex, this.m_lastIndex, force);
        };
        b2ParticleGroup.prototype.ApplyLinearImpulse = function (impulse) {
            this.m_system.ApplyLinearImpulse(this.m_firstIndex, this.m_lastIndex, impulse);
        };
        b2ParticleGroup.prototype.DestroyParticles = function (callDestructionListener) {
            if (this.m_system.m_world.IsLocked()) {
                throw new Error();
            }
            for (var i = this.m_firstIndex; i < this.m_lastIndex; i++) {
                this.m_system.DestroyParticle(i, callDestructionListener);
            }
        };
        b2ParticleGroup.prototype.UpdateStatistics = function () {
            if (!this.m_system.m_positionBuffer.data) {
                throw new Error();
            }
            if (!this.m_system.m_velocityBuffer.data) {
                throw new Error();
            }
            var p = new b2Math_33.b2Vec2();
            var v = new b2Math_33.b2Vec2();
            if (this.m_timestamp !== this.m_system.m_timestamp) {
                var m = this.m_system.GetParticleMass();
                this.m_mass = m * (this.m_lastIndex - this.m_firstIndex);
                this.m_center.SetZero();
                this.m_linearVelocity.SetZero();
                for (var i = this.m_firstIndex; i < this.m_lastIndex; i++) {
                    this.m_center.SelfMulAdd(m, this.m_system.m_positionBuffer.data[i]);
                    this.m_linearVelocity.SelfMulAdd(m, this.m_system.m_velocityBuffer.data[i]);
                }
                if (this.m_mass > 0) {
                    var inv_mass = 1 / this.m_mass;
                    this.m_center.SelfMul(inv_mass);
                    this.m_linearVelocity.SelfMul(inv_mass);
                }
                this.m_inertia = 0;
                this.m_angularVelocity = 0;
                for (var i = this.m_firstIndex; i < this.m_lastIndex; i++) {
                    b2Math_33.b2Vec2.SubVV(this.m_system.m_positionBuffer.data[i], this.m_center, p);
                    b2Math_33.b2Vec2.SubVV(this.m_system.m_velocityBuffer.data[i], this.m_linearVelocity, v);
                    this.m_inertia += m * b2Math_33.b2Vec2.DotVV(p, p);
                    this.m_angularVelocity += m * b2Math_33.b2Vec2.CrossVV(p, v);
                }
                if (this.m_inertia > 0) {
                    this.m_angularVelocity *= 1 / this.m_inertia;
                }
                this.m_timestamp = this.m_system.m_timestamp;
            }
        };
        b2ParticleGroup.GetLinearVelocityFromWorldPoint_s_t0 = new b2Math_33.b2Vec2();
        return b2ParticleGroup;
    }());
    exports.b2ParticleGroup = b2ParticleGroup;
});
define("Dynamics/b2WorldCallbacks", ["require", "exports", "Common/b2Settings", "Dynamics/b2Body"], function (require, exports, b2Settings_41, b2Body_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2DestructionListener = (function () {
        function b2DestructionListener() {
        }
        b2DestructionListener.prototype.SayGoodbyeJoint = function (joint) { };
        b2DestructionListener.prototype.SayGoodbyeFixture = function (fixture) { };
        b2DestructionListener.prototype.SayGoodbyeParticleGroup = function (group) { };
        b2DestructionListener.prototype.SayGoodbyeParticle = function (system, index) { };
        return b2DestructionListener;
    }());
    exports.b2DestructionListener = b2DestructionListener;
    var b2ContactFilter = (function () {
        function b2ContactFilter() {
        }
        b2ContactFilter.prototype.ShouldCollide = function (fixtureA, fixtureB) {
            var bodyA = fixtureA.GetBody();
            var bodyB = fixtureB.GetBody();
            if (bodyB.GetType() === b2Body_4.b2BodyType.b2_staticBody && bodyA.GetType() === b2Body_4.b2BodyType.b2_staticBody) {
                return false;
            }
            if (!bodyB.ShouldCollideConnected(bodyA)) {
                return false;
            }
            var filter1 = fixtureA.GetFilterData();
            var filter2 = fixtureB.GetFilterData();
            if (filter1.groupIndex === filter2.groupIndex && filter1.groupIndex !== 0) {
                return (filter1.groupIndex > 0);
            }
            var collide = (((filter1.maskBits & filter2.categoryBits) !== 0) && ((filter1.categoryBits & filter2.maskBits) !== 0));
            return collide;
        };
        b2ContactFilter.prototype.ShouldCollideFixtureParticle = function (fixture, system, index) {
            return true;
        };
        b2ContactFilter.prototype.ShouldCollideParticleParticle = function (system, indexA, indexB) {
            return true;
        };
        b2ContactFilter.b2_defaultFilter = new b2ContactFilter();
        return b2ContactFilter;
    }());
    exports.b2ContactFilter = b2ContactFilter;
    var b2ContactImpulse = (function () {
        function b2ContactImpulse() {
            this.normalImpulses = b2Settings_41.b2MakeNumberArray(b2Settings_41.b2_maxManifoldPoints);
            this.tangentImpulses = b2Settings_41.b2MakeNumberArray(b2Settings_41.b2_maxManifoldPoints);
            this.count = 0;
        }
        return b2ContactImpulse;
    }());
    exports.b2ContactImpulse = b2ContactImpulse;
    var b2ContactListener = (function () {
        function b2ContactListener() {
        }
        b2ContactListener.prototype.BeginContact = function (contact) { };
        b2ContactListener.prototype.EndContact = function (contact) { };
        b2ContactListener.prototype.BeginContactFixtureParticle = function (system, contact) { };
        b2ContactListener.prototype.EndContactFixtureParticle = function (system, contact) { };
        b2ContactListener.prototype.BeginContactParticleParticle = function (system, contact) { };
        b2ContactListener.prototype.EndContactParticleParticle = function (system, contact) { };
        b2ContactListener.prototype.PreSolve = function (contact, oldManifold) { };
        b2ContactListener.prototype.PostSolve = function (contact, impulse) { };
        b2ContactListener.b2_defaultListener = new b2ContactListener();
        return b2ContactListener;
    }());
    exports.b2ContactListener = b2ContactListener;
    var b2QueryCallback = (function () {
        function b2QueryCallback() {
        }
        b2QueryCallback.prototype.ReportFixture = function (fixture) {
            return true;
        };
        b2QueryCallback.prototype.ReportParticle = function (system, index) {
            return false;
        };
        b2QueryCallback.prototype.ShouldQueryParticleSystem = function (system) {
            return true;
        };
        return b2QueryCallback;
    }());
    exports.b2QueryCallback = b2QueryCallback;
    var b2RayCastCallback = (function () {
        function b2RayCastCallback() {
        }
        b2RayCastCallback.prototype.ReportFixture = function (fixture, point, normal, fraction) {
            return fraction;
        };
        b2RayCastCallback.prototype.ReportParticle = function (system, index, point, normal, fraction) {
            return 0;
        };
        b2RayCastCallback.prototype.ShouldQueryParticleSystem = function (system) {
            return true;
        };
        return b2RayCastCallback;
    }());
    exports.b2RayCastCallback = b2RayCastCallback;
});
define("Dynamics/Contacts/b2Contact", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/b2Collision", "Collision/b2Collision", "Collision/b2TimeOfImpact"], function (require, exports, b2Settings_42, b2Math_34, b2Collision_12, b2Collision_13, b2TimeOfImpact_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function b2MixFriction(friction1, friction2) {
        return b2Math_34.b2Sqrt(friction1 * friction2);
    }
    exports.b2MixFriction = b2MixFriction;
    function b2MixRestitution(restitution1, restitution2) {
        return restitution1 > restitution2 ? restitution1 : restitution2;
    }
    exports.b2MixRestitution = b2MixRestitution;
    var b2ContactEdge = (function () {
        function b2ContactEdge(contact) {
            this.prev = null;
            this.next = null;
            this.contact = contact;
        }
        return b2ContactEdge;
    }());
    exports.b2ContactEdge = b2ContactEdge;
    var b2Contact = (function () {
        function b2Contact() {
            this.m_islandFlag = false;
            this.m_touchingFlag = false;
            this.m_enabledFlag = false;
            this.m_filterFlag = false;
            this.m_bulletHitFlag = false;
            this.m_toiFlag = false;
            this.m_prev = null;
            this.m_next = null;
            this.m_indexA = 0;
            this.m_indexB = 0;
            this.m_manifold = new b2Collision_12.b2Manifold();
            this.m_toiCount = 0;
            this.m_toi = 0;
            this.m_friction = 0;
            this.m_restitution = 0;
            this.m_tangentSpeed = 0;
            this.m_oldManifold = new b2Collision_12.b2Manifold();
            this.m_nodeA = new b2ContactEdge(this);
            this.m_nodeB = new b2ContactEdge(this);
        }
        b2Contact.prototype.GetManifold = function () {
            return this.m_manifold;
        };
        b2Contact.prototype.GetWorldManifold = function (worldManifold) {
            var bodyA = this.m_fixtureA.GetBody();
            var bodyB = this.m_fixtureB.GetBody();
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius);
        };
        b2Contact.prototype.IsTouching = function () {
            return this.m_touchingFlag;
        };
        b2Contact.prototype.SetEnabled = function (flag) {
            this.m_enabledFlag = flag;
        };
        b2Contact.prototype.IsEnabled = function () {
            return this.m_enabledFlag;
        };
        b2Contact.prototype.GetNext = function () {
            return this.m_next;
        };
        b2Contact.prototype.GetFixtureA = function () {
            return this.m_fixtureA;
        };
        b2Contact.prototype.GetChildIndexA = function () {
            return this.m_indexA;
        };
        b2Contact.prototype.GetFixtureB = function () {
            return this.m_fixtureB;
        };
        b2Contact.prototype.GetChildIndexB = function () {
            return this.m_indexB;
        };
        b2Contact.prototype.FlagForFiltering = function () {
            this.m_filterFlag = true;
        };
        b2Contact.prototype.SetFriction = function (friction) {
            this.m_friction = friction;
        };
        b2Contact.prototype.GetFriction = function () {
            return this.m_friction;
        };
        b2Contact.prototype.ResetFriction = function () {
            this.m_friction = b2MixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
        };
        b2Contact.prototype.SetRestitution = function (restitution) {
            this.m_restitution = restitution;
        };
        b2Contact.prototype.GetRestitution = function () {
            return this.m_restitution;
        };
        b2Contact.prototype.ResetRestitution = function () {
            this.m_restitution = b2MixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
        };
        b2Contact.prototype.SetTangentSpeed = function (speed) {
            this.m_tangentSpeed = speed;
        };
        b2Contact.prototype.GetTangentSpeed = function () {
            return this.m_tangentSpeed;
        };
        b2Contact.prototype.Reset = function (fixtureA, indexA, fixtureB, indexB) {
            this.m_islandFlag = false;
            this.m_touchingFlag = false;
            this.m_enabledFlag = true;
            this.m_filterFlag = false;
            this.m_bulletHitFlag = false;
            this.m_toiFlag = false;
            this.m_fixtureA = fixtureA;
            this.m_fixtureB = fixtureB;
            this.m_indexA = indexA;
            this.m_indexB = indexB;
            this.m_manifold.pointCount = 0;
            this.m_prev = null;
            this.m_next = null;
            delete this.m_nodeA.contact;
            this.m_nodeA.prev = null;
            this.m_nodeA.next = null;
            delete this.m_nodeA.other;
            delete this.m_nodeB.contact;
            this.m_nodeB.prev = null;
            this.m_nodeB.next = null;
            delete this.m_nodeB.other;
            this.m_toiCount = 0;
            this.m_friction = b2MixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
            this.m_restitution = b2MixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
        };
        b2Contact.prototype.Update = function (listener) {
            var tManifold = this.m_oldManifold;
            this.m_oldManifold = this.m_manifold;
            this.m_manifold = tManifold;
            this.m_enabledFlag = true;
            var touching = false;
            var wasTouching = this.m_touchingFlag;
            var sensorA = this.m_fixtureA.IsSensor();
            var sensorB = this.m_fixtureB.IsSensor();
            var sensor = sensorA || sensorB;
            var bodyA = this.m_fixtureA.GetBody();
            var bodyB = this.m_fixtureB.GetBody();
            var xfA = bodyA.GetTransform();
            var xfB = bodyB.GetTransform();
            if (sensor) {
                var shapeA = this.m_fixtureA.GetShape();
                var shapeB = this.m_fixtureB.GetShape();
                touching = b2Collision_13.b2TestOverlapShape(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
                this.m_manifold.pointCount = 0;
            }
            else {
                this.Evaluate(this.m_manifold, xfA, xfB);
                touching = this.m_manifold.pointCount > 0;
                for (var i = 0; i < this.m_manifold.pointCount; ++i) {
                    var mp2 = this.m_manifold.points[i];
                    mp2.normalImpulse = 0;
                    mp2.tangentImpulse = 0;
                    var id2 = mp2.id;
                    for (var j = 0; j < this.m_oldManifold.pointCount; ++j) {
                        var mp1 = this.m_oldManifold.points[j];
                        if (mp1.id.key === id2.key) {
                            mp2.normalImpulse = mp1.normalImpulse;
                            mp2.tangentImpulse = mp1.tangentImpulse;
                            break;
                        }
                    }
                }
                if (touching !== wasTouching) {
                    bodyA.SetAwake(true);
                    bodyB.SetAwake(true);
                }
            }
            this.m_touchingFlag = touching;
            if (!wasTouching && touching && listener) {
                listener.BeginContact(this);
            }
            if (wasTouching && !touching && listener) {
                listener.EndContact(this);
            }
            if (!sensor && touching && listener) {
                listener.PreSolve(this, this.m_oldManifold);
            }
        };
        b2Contact.prototype.ComputeTOI = function (sweepA, sweepB) {
            var input = b2Contact.ComputeTOI_s_input;
            input.proxyA.SetShape(this.m_fixtureA.GetShape(), this.m_indexA);
            input.proxyB.SetShape(this.m_fixtureB.GetShape(), this.m_indexB);
            input.sweepA.Copy(sweepA);
            input.sweepB.Copy(sweepB);
            input.tMax = b2Settings_42.b2_linearSlop;
            var output = b2Contact.ComputeTOI_s_output;
            b2TimeOfImpact_2.b2TimeOfImpact(output, input);
            return output.t;
        };
        b2Contact.ComputeTOI_s_input = new b2TimeOfImpact_2.b2TOIInput();
        b2Contact.ComputeTOI_s_output = new b2TimeOfImpact_2.b2TOIOutput();
        return b2Contact;
    }());
    exports.b2Contact = b2Contact;
});
define("Dynamics/b2Body", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/Shapes/b2Shape", "Dynamics/b2Fixture"], function (require, exports, b2Settings_43, b2Math_35, b2Shape_9, b2Fixture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2BodyType;
    (function (b2BodyType) {
        b2BodyType[b2BodyType["b2_unknown"] = -1] = "b2_unknown";
        b2BodyType[b2BodyType["b2_staticBody"] = 0] = "b2_staticBody";
        b2BodyType[b2BodyType["b2_kinematicBody"] = 1] = "b2_kinematicBody";
        b2BodyType[b2BodyType["b2_dynamicBody"] = 2] = "b2_dynamicBody";
    })(b2BodyType = exports.b2BodyType || (exports.b2BodyType = {}));
    var b2BodyDef = (function () {
        function b2BodyDef() {
            this.type = b2BodyType.b2_staticBody;
            this.position = new b2Math_35.b2Vec2(0, 0);
            this.angle = 0;
            this.linearVelocity = new b2Math_35.b2Vec2(0, 0);
            this.angularVelocity = 0;
            this.linearDamping = 0;
            this.angularDamping = 0;
            this.allowSleep = true;
            this.awake = true;
            this.fixedRotation = false;
            this.bullet = false;
            this.active = true;
            this.userData = null;
            this.gravityScale = 1;
        }
        return b2BodyDef;
    }());
    exports.b2BodyDef = b2BodyDef;
    var b2Body = (function () {
        function b2Body(bd, world) {
            this.m_type = b2BodyType.b2_staticBody;
            this.m_islandFlag = false;
            this.m_awakeFlag = false;
            this.m_autoSleepFlag = false;
            this.m_bulletFlag = false;
            this.m_fixedRotationFlag = false;
            this.m_activeFlag = false;
            this.m_toiFlag = false;
            this.m_islandIndex = 0;
            this.m_xf = new b2Math_35.b2Transform();
            this.m_xf0 = new b2Math_35.b2Transform();
            this.m_sweep = new b2Math_35.b2Sweep();
            this.m_linearVelocity = new b2Math_35.b2Vec2();
            this.m_angularVelocity = 0;
            this.m_force = new b2Math_35.b2Vec2();
            this.m_torque = 0;
            this.m_prev = null;
            this.m_next = null;
            this.m_fixtureList = null;
            this.m_fixtureCount = 0;
            this.m_jointList = null;
            this.m_contactList = null;
            this.m_mass = 1;
            this.m_invMass = 1;
            this.m_I = 0;
            this.m_invI = 0;
            this.m_linearDamping = 0;
            this.m_angularDamping = 0;
            this.m_gravityScale = 1;
            this.m_sleepTime = 0;
            this.m_userData = null;
            this.m_controllerList = null;
            this.m_controllerCount = 0;
            this.m_bulletFlag = b2Settings_43.b2Maybe(bd.bullet, false);
            this.m_fixedRotationFlag = b2Settings_43.b2Maybe(bd.fixedRotation, false);
            this.m_autoSleepFlag = b2Settings_43.b2Maybe(bd.allowSleep, true);
            this.m_awakeFlag = b2Settings_43.b2Maybe(bd.awake, true);
            this.m_activeFlag = b2Settings_43.b2Maybe(bd.active, true);
            this.m_world = world;
            this.m_xf.p.Copy(b2Settings_43.b2Maybe(bd.position, b2Math_35.b2Vec2.ZERO));
            this.m_xf.q.SetAngle(b2Settings_43.b2Maybe(bd.angle, 0));
            this.m_xf0.Copy(this.m_xf);
            this.m_sweep.localCenter.SetZero();
            this.m_sweep.c0.Copy(this.m_xf.p);
            this.m_sweep.c.Copy(this.m_xf.p);
            this.m_sweep.a0 = this.m_sweep.a = this.m_xf.q.GetAngle();
            this.m_sweep.alpha0 = 0;
            this.m_linearVelocity.Copy(b2Settings_43.b2Maybe(bd.linearVelocity, b2Math_35.b2Vec2.ZERO));
            this.m_angularVelocity = b2Settings_43.b2Maybe(bd.angularVelocity, 0);
            this.m_linearDamping = b2Settings_43.b2Maybe(bd.linearDamping, 0);
            this.m_angularDamping = b2Settings_43.b2Maybe(bd.angularDamping, 0);
            this.m_gravityScale = b2Settings_43.b2Maybe(bd.gravityScale, 1);
            this.m_force.SetZero();
            this.m_torque = 0;
            this.m_sleepTime = 0;
            this.m_type = b2Settings_43.b2Maybe(bd.type, b2BodyType.b2_staticBody);
            if (bd.type === b2BodyType.b2_dynamicBody) {
                this.m_mass = 1;
                this.m_invMass = 1;
            }
            else {
                this.m_mass = 0;
                this.m_invMass = 0;
            }
            this.m_I = 0;
            this.m_invI = 0;
            this.m_userData = bd.userData;
            this.m_fixtureList = null;
            this.m_fixtureCount = 0;
            this.m_controllerList = null;
            this.m_controllerCount = 0;
        }
        b2Body.prototype.CreateFixture = function (a, b) {
            if (b === void 0) { b = 0; }
            if (a instanceof b2Shape_9.b2Shape) {
                return this.CreateFixtureShapeDensity(a, b);
            }
            else {
                return this.CreateFixtureDef(a);
            }
        };
        b2Body.prototype.CreateFixtureDef = function (def) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            var fixture = new b2Fixture_1.b2Fixture(def, this);
            fixture.Create(def);
            if (this.m_activeFlag) {
                fixture.CreateProxies(this.m_xf);
            }
            fixture.m_next = this.m_fixtureList;
            this.m_fixtureList = fixture;
            ++this.m_fixtureCount;
            if (fixture.m_density > 0) {
                this.ResetMassData();
            }
            this.m_world.m_newFixture = true;
            return fixture;
        };
        b2Body.prototype.CreateFixtureShapeDensity = function (shape, density) {
            if (density === void 0) { density = 0; }
            var def = b2Body.CreateFixtureShapeDensity_s_def;
            def.shape = shape;
            def.density = density;
            return this.CreateFixtureDef(def);
        };
        b2Body.prototype.DestroyFixture = function (fixture) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            var node = this.m_fixtureList;
            var ppF = null;
            while (node !== null) {
                if (node === fixture) {
                    if (ppF) {
                        ppF.m_next = fixture.m_next;
                    }
                    else {
                        this.m_fixtureList = fixture.m_next;
                    }
                    break;
                }
                ppF = node;
                node = node.m_next;
            }
            var edge = this.m_contactList;
            while (edge) {
                var c = edge.contact;
                edge = edge.next;
                var fixtureA = c.GetFixtureA();
                var fixtureB = c.GetFixtureB();
                if (fixture === fixtureA || fixture === fixtureB) {
                    this.m_world.m_contactManager.Destroy(c);
                }
            }
            if (this.m_activeFlag) {
                fixture.DestroyProxies();
            }
            fixture.Destroy();
            fixture.m_next = null;
            --this.m_fixtureCount;
            this.ResetMassData();
        };
        b2Body.prototype.SetTransformVec = function (position, angle) {
            this.SetTransformXY(position.x, position.y, angle);
        };
        b2Body.prototype.SetTransformXY = function (x, y, angle) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            this.m_xf.q.SetAngle(angle);
            this.m_xf.p.Set(x, y);
            this.m_xf0.Copy(this.m_xf);
            b2Math_35.b2Transform.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
            this.m_sweep.a = angle;
            this.m_sweep.c0.Copy(this.m_sweep.c);
            this.m_sweep.a0 = angle;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                f.Synchronize(this.m_xf, this.m_xf);
            }
            this.m_world.m_contactManager.FindNewContacts();
        };
        b2Body.prototype.SetTransform = function (xf) {
            this.SetTransformVec(xf.p, xf.GetAngle());
        };
        b2Body.prototype.GetTransform = function () {
            return this.m_xf;
        };
        b2Body.prototype.GetPosition = function () {
            return this.m_xf.p;
        };
        b2Body.prototype.SetPosition = function (position) {
            this.SetTransformVec(position, this.GetAngle());
        };
        b2Body.prototype.SetPositionXY = function (x, y) {
            this.SetTransformXY(x, y, this.GetAngle());
        };
        b2Body.prototype.GetAngle = function () {
            return this.m_sweep.a;
        };
        b2Body.prototype.SetAngle = function (angle) {
            this.SetTransformVec(this.GetPosition(), angle);
        };
        b2Body.prototype.GetWorldCenter = function () {
            return this.m_sweep.c;
        };
        b2Body.prototype.GetLocalCenter = function () {
            return this.m_sweep.localCenter;
        };
        b2Body.prototype.SetLinearVelocity = function (v) {
            if (this.m_type === b2BodyType.b2_staticBody) {
                return;
            }
            if (b2Math_35.b2Vec2.DotVV(v, v) > 0) {
                this.SetAwake(true);
            }
            this.m_linearVelocity.Copy(v);
        };
        b2Body.prototype.GetLinearVelocity = function () {
            return this.m_linearVelocity;
        };
        b2Body.prototype.SetAngularVelocity = function (w) {
            if (this.m_type === b2BodyType.b2_staticBody) {
                return;
            }
            if (w * w > 0) {
                this.SetAwake(true);
            }
            this.m_angularVelocity = w;
        };
        b2Body.prototype.GetAngularVelocity = function () {
            return this.m_angularVelocity;
        };
        b2Body.prototype.GetDefinition = function (bd) {
            bd.type = this.GetType();
            bd.allowSleep = this.m_autoSleepFlag;
            bd.angle = this.GetAngle();
            bd.angularDamping = this.m_angularDamping;
            bd.gravityScale = this.m_gravityScale;
            bd.angularVelocity = this.m_angularVelocity;
            bd.fixedRotation = this.m_fixedRotationFlag;
            bd.bullet = this.m_bulletFlag;
            bd.awake = this.m_awakeFlag;
            bd.linearDamping = this.m_linearDamping;
            bd.linearVelocity.Copy(this.GetLinearVelocity());
            bd.position.Copy(this.GetPosition());
            bd.userData = this.GetUserData();
            return bd;
        };
        b2Body.prototype.ApplyForce = function (force, point, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type !== b2BodyType.b2_dynamicBody) {
                return;
            }
            if (wake && !this.m_awakeFlag) {
                this.SetAwake(true);
            }
            if (this.m_awakeFlag) {
                this.m_force.x += force.x;
                this.m_force.y += force.y;
                this.m_torque += ((point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x);
            }
        };
        b2Body.prototype.ApplyForceToCenter = function (force, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type !== b2BodyType.b2_dynamicBody) {
                return;
            }
            if (wake && !this.m_awakeFlag) {
                this.SetAwake(true);
            }
            if (this.m_awakeFlag) {
                this.m_force.x += force.x;
                this.m_force.y += force.y;
            }
        };
        b2Body.prototype.ApplyTorque = function (torque, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type !== b2BodyType.b2_dynamicBody) {
                return;
            }
            if (wake && !this.m_awakeFlag) {
                this.SetAwake(true);
            }
            if (this.m_awakeFlag) {
                this.m_torque += torque;
            }
        };
        b2Body.prototype.ApplyLinearImpulse = function (impulse, point, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type !== b2BodyType.b2_dynamicBody) {
                return;
            }
            if (wake && !this.m_awakeFlag) {
                this.SetAwake(true);
            }
            if (this.m_awakeFlag) {
                this.m_linearVelocity.x += this.m_invMass * impulse.x;
                this.m_linearVelocity.y += this.m_invMass * impulse.y;
                this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
            }
        };
        b2Body.prototype.ApplyLinearImpulseToCenter = function (impulse, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type !== b2BodyType.b2_dynamicBody) {
                return;
            }
            if (wake && !this.m_awakeFlag) {
                this.SetAwake(true);
            }
            if (this.m_awakeFlag) {
                this.m_linearVelocity.x += this.m_invMass * impulse.x;
                this.m_linearVelocity.y += this.m_invMass * impulse.y;
            }
        };
        b2Body.prototype.ApplyAngularImpulse = function (impulse, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type !== b2BodyType.b2_dynamicBody) {
                return;
            }
            if (wake && !this.m_awakeFlag) {
                this.SetAwake(true);
            }
            if (this.m_awakeFlag) {
                this.m_angularVelocity += this.m_invI * impulse;
            }
        };
        b2Body.prototype.GetMass = function () {
            return this.m_mass;
        };
        b2Body.prototype.GetInertia = function () {
            return this.m_I + this.m_mass * b2Math_35.b2Vec2.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter);
        };
        b2Body.prototype.GetMassData = function (data) {
            data.mass = this.m_mass;
            data.I = this.m_I + this.m_mass * b2Math_35.b2Vec2.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter);
            data.center.Copy(this.m_sweep.localCenter);
            return data;
        };
        b2Body.prototype.SetMassData = function (massData) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            if (this.m_type !== b2BodyType.b2_dynamicBody) {
                return;
            }
            this.m_invMass = 0;
            this.m_I = 0;
            this.m_invI = 0;
            this.m_mass = massData.mass;
            if (this.m_mass <= 0) {
                this.m_mass = 1;
            }
            this.m_invMass = 1 / this.m_mass;
            if (massData.I > 0 && !this.m_fixedRotationFlag) {
                this.m_I = massData.I - this.m_mass * b2Math_35.b2Vec2.DotVV(massData.center, massData.center);
                this.m_invI = 1 / this.m_I;
            }
            var oldCenter = b2Body.SetMassData_s_oldCenter.Copy(this.m_sweep.c);
            this.m_sweep.localCenter.Copy(massData.center);
            b2Math_35.b2Transform.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
            this.m_sweep.c0.Copy(this.m_sweep.c);
            b2Math_35.b2Vec2.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, b2Math_35.b2Vec2.SubVV(this.m_sweep.c, oldCenter, b2Math_35.b2Vec2.s_t0), this.m_linearVelocity);
        };
        b2Body.prototype.ResetMassData = function () {
            this.m_mass = 0;
            this.m_invMass = 0;
            this.m_I = 0;
            this.m_invI = 0;
            this.m_sweep.localCenter.SetZero();
            if (this.m_type === b2BodyType.b2_staticBody || this.m_type === b2BodyType.b2_kinematicBody) {
                this.m_sweep.c0.Copy(this.m_xf.p);
                this.m_sweep.c.Copy(this.m_xf.p);
                this.m_sweep.a0 = this.m_sweep.a;
                return;
            }
            var localCenter = b2Body.ResetMassData_s_localCenter.SetZero();
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                if (f.m_density === 0) {
                    continue;
                }
                var massData = f.GetMassData(b2Body.ResetMassData_s_massData);
                this.m_mass += massData.mass;
                localCenter.x += massData.center.x * massData.mass;
                localCenter.y += massData.center.y * massData.mass;
                this.m_I += massData.I;
            }
            if (this.m_mass > 0) {
                this.m_invMass = 1 / this.m_mass;
                localCenter.x *= this.m_invMass;
                localCenter.y *= this.m_invMass;
            }
            else {
                this.m_mass = 1;
                this.m_invMass = 1;
            }
            if (this.m_I > 0 && !this.m_fixedRotationFlag) {
                this.m_I -= this.m_mass * b2Math_35.b2Vec2.DotVV(localCenter, localCenter);
                this.m_invI = 1 / this.m_I;
            }
            else {
                this.m_I = 0;
                this.m_invI = 0;
            }
            var oldCenter = b2Body.ResetMassData_s_oldCenter.Copy(this.m_sweep.c);
            this.m_sweep.localCenter.Copy(localCenter);
            b2Math_35.b2Transform.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c);
            this.m_sweep.c0.Copy(this.m_sweep.c);
            b2Math_35.b2Vec2.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, b2Math_35.b2Vec2.SubVV(this.m_sweep.c, oldCenter, b2Math_35.b2Vec2.s_t0), this.m_linearVelocity);
        };
        b2Body.prototype.GetWorldPoint = function (localPoint, out) {
            return b2Math_35.b2Transform.MulXV(this.m_xf, localPoint, out);
        };
        b2Body.prototype.GetWorldVector = function (localVector, out) {
            return b2Math_35.b2Rot.MulRV(this.m_xf.q, localVector, out);
        };
        b2Body.prototype.GetLocalPoint = function (worldPoint, out) {
            return b2Math_35.b2Transform.MulTXV(this.m_xf, worldPoint, out);
        };
        b2Body.prototype.GetLocalVector = function (worldVector, out) {
            return b2Math_35.b2Rot.MulTRV(this.m_xf.q, worldVector, out);
        };
        b2Body.prototype.GetLinearVelocityFromWorldPoint = function (worldPoint, out) {
            return b2Math_35.b2Vec2.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, b2Math_35.b2Vec2.SubVV(worldPoint, this.m_sweep.c, b2Math_35.b2Vec2.s_t0), out);
        };
        b2Body.prototype.GetLinearVelocityFromLocalPoint = function (localPoint, out) {
            return this.GetLinearVelocityFromWorldPoint(this.GetWorldPoint(localPoint, out), out);
        };
        b2Body.prototype.GetLinearDamping = function () {
            return this.m_linearDamping;
        };
        b2Body.prototype.SetLinearDamping = function (linearDamping) {
            this.m_linearDamping = linearDamping;
        };
        b2Body.prototype.GetAngularDamping = function () {
            return this.m_angularDamping;
        };
        b2Body.prototype.SetAngularDamping = function (angularDamping) {
            this.m_angularDamping = angularDamping;
        };
        b2Body.prototype.GetGravityScale = function () {
            return this.m_gravityScale;
        };
        b2Body.prototype.SetGravityScale = function (scale) {
            this.m_gravityScale = scale;
        };
        b2Body.prototype.SetType = function (type) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            if (this.m_type === type) {
                return;
            }
            this.m_type = type;
            this.ResetMassData();
            if (this.m_type === b2BodyType.b2_staticBody) {
                this.m_linearVelocity.SetZero();
                this.m_angularVelocity = 0;
                this.m_sweep.a0 = this.m_sweep.a;
                this.m_sweep.c0.Copy(this.m_sweep.c);
                this.SynchronizeFixtures();
            }
            this.SetAwake(true);
            this.m_force.SetZero();
            this.m_torque = 0;
            var ce = this.m_contactList;
            while (ce) {
                var ce0 = ce;
                ce = ce.next;
                this.m_world.m_contactManager.Destroy(ce0.contact);
            }
            this.m_contactList = null;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                f.TouchProxies();
            }
        };
        b2Body.prototype.GetType = function () {
            return this.m_type;
        };
        b2Body.prototype.SetBullet = function (flag) {
            this.m_bulletFlag = flag;
        };
        b2Body.prototype.IsBullet = function () {
            return this.m_bulletFlag;
        };
        b2Body.prototype.SetSleepingAllowed = function (flag) {
            this.m_autoSleepFlag = flag;
            if (!flag) {
                this.SetAwake(true);
            }
        };
        b2Body.prototype.IsSleepingAllowed = function () {
            return this.m_autoSleepFlag;
        };
        b2Body.prototype.SetAwake = function (flag) {
            if (flag) {
                if (!this.m_awakeFlag) {
                    this.m_awakeFlag = true;
                    this.m_sleepTime = 0;
                }
            }
            else {
                this.m_awakeFlag = false;
                this.m_sleepTime = 0;
                this.m_linearVelocity.SetZero();
                this.m_angularVelocity = 0;
                this.m_force.SetZero();
                this.m_torque = 0;
            }
        };
        b2Body.prototype.IsAwake = function () {
            return this.m_awakeFlag;
        };
        b2Body.prototype.SetActive = function (flag) {
            if (this.m_world.IsLocked()) {
                throw new Error();
            }
            if (flag === this.IsActive()) {
                return;
            }
            this.m_activeFlag = flag;
            if (flag) {
                for (var f = this.m_fixtureList; f; f = f.m_next) {
                    f.CreateProxies(this.m_xf);
                }
            }
            else {
                for (var f = this.m_fixtureList; f; f = f.m_next) {
                    f.DestroyProxies();
                }
                var ce = this.m_contactList;
                while (ce) {
                    var ce0 = ce;
                    ce = ce.next;
                    this.m_world.m_contactManager.Destroy(ce0.contact);
                }
                this.m_contactList = null;
            }
        };
        b2Body.prototype.IsActive = function () {
            return this.m_activeFlag;
        };
        b2Body.prototype.SetFixedRotation = function (flag) {
            if (this.m_fixedRotationFlag === flag) {
                return;
            }
            this.m_fixedRotationFlag = flag;
            this.m_angularVelocity = 0;
            this.ResetMassData();
        };
        b2Body.prototype.IsFixedRotation = function () {
            return this.m_fixedRotationFlag;
        };
        b2Body.prototype.GetFixtureList = function () {
            return this.m_fixtureList;
        };
        b2Body.prototype.GetJointList = function () {
            return this.m_jointList;
        };
        b2Body.prototype.GetContactList = function () {
            return this.m_contactList;
        };
        b2Body.prototype.GetNext = function () {
            return this.m_next;
        };
        b2Body.prototype.GetUserData = function () {
            return this.m_userData;
        };
        b2Body.prototype.SetUserData = function (data) {
            this.m_userData = data;
        };
        b2Body.prototype.GetWorld = function () {
            return this.m_world;
        };
        b2Body.prototype.Dump = function (log) {
            var bodyIndex = this.m_islandIndex;
            log("{\n");
            log("  const bd: b2BodyDef = new b2BodyDef();\n");
            var type_str = "";
            switch (this.m_type) {
                case b2BodyType.b2_staticBody:
                    type_str = "b2BodyType.b2_staticBody";
                    break;
                case b2BodyType.b2_kinematicBody:
                    type_str = "b2BodyType.b2_kinematicBody";
                    break;
                case b2BodyType.b2_dynamicBody:
                    type_str = "b2BodyType.b2_dynamicBody";
                    break;
                default:
                    break;
            }
            log("  bd.type = %s;\n", type_str);
            log("  bd.position.Set(%.15f, %.15f);\n", this.m_xf.p.x, this.m_xf.p.y);
            log("  bd.angle = %.15f;\n", this.m_sweep.a);
            log("  bd.linearVelocity.Set(%.15f, %.15f);\n", this.m_linearVelocity.x, this.m_linearVelocity.y);
            log("  bd.angularVelocity = %.15f;\n", this.m_angularVelocity);
            log("  bd.linearDamping = %.15f;\n", this.m_linearDamping);
            log("  bd.angularDamping = %.15f;\n", this.m_angularDamping);
            log("  bd.allowSleep = %s;\n", (this.m_autoSleepFlag) ? ("true") : ("false"));
            log("  bd.awake = %s;\n", (this.m_awakeFlag) ? ("true") : ("false"));
            log("  bd.fixedRotation = %s;\n", (this.m_fixedRotationFlag) ? ("true") : ("false"));
            log("  bd.bullet = %s;\n", (this.m_bulletFlag) ? ("true") : ("false"));
            log("  bd.active = %s;\n", (this.m_activeFlag) ? ("true") : ("false"));
            log("  bd.gravityScale = %.15f;\n", this.m_gravityScale);
            log("\n");
            log("  bodies[%d] = this.m_world.CreateBody(bd);\n", this.m_islandIndex);
            log("\n");
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                log("  {\n");
                f.Dump(log, bodyIndex);
                log("  }\n");
            }
            log("}\n");
        };
        b2Body.prototype.SynchronizeFixtures = function () {
            var xf1 = b2Body.SynchronizeFixtures_s_xf1;
            xf1.q.SetAngle(this.m_sweep.a0);
            b2Math_35.b2Rot.MulRV(xf1.q, this.m_sweep.localCenter, xf1.p);
            b2Math_35.b2Vec2.SubVV(this.m_sweep.c0, xf1.p, xf1.p);
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                f.Synchronize(xf1, this.m_xf);
            }
        };
        b2Body.prototype.SynchronizeTransform = function () {
            this.m_xf.q.SetAngle(this.m_sweep.a);
            b2Math_35.b2Rot.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p);
            b2Math_35.b2Vec2.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
        };
        b2Body.prototype.ShouldCollide = function (other) {
            if (this.m_type === b2BodyType.b2_staticBody && other.m_type === b2BodyType.b2_staticBody) {
                return false;
            }
            return this.ShouldCollideConnected(other);
        };
        b2Body.prototype.ShouldCollideConnected = function (other) {
            for (var jn = this.m_jointList; jn; jn = jn.next) {
                if (jn.other === other) {
                    if (!jn.joint.m_collideConnected) {
                        return false;
                    }
                }
            }
            return true;
        };
        b2Body.prototype.Advance = function (alpha) {
            this.m_sweep.Advance(alpha);
            this.m_sweep.c.Copy(this.m_sweep.c0);
            this.m_sweep.a = this.m_sweep.a0;
            this.m_xf.q.SetAngle(this.m_sweep.a);
            b2Math_35.b2Rot.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p);
            b2Math_35.b2Vec2.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
        };
        b2Body.prototype.GetControllerList = function () {
            return this.m_controllerList;
        };
        b2Body.prototype.GetControllerCount = function () {
            return this.m_controllerCount;
        };
        b2Body.CreateFixtureShapeDensity_s_def = new b2Fixture_1.b2FixtureDef();
        b2Body.SetMassData_s_oldCenter = new b2Math_35.b2Vec2();
        b2Body.ResetMassData_s_localCenter = new b2Math_35.b2Vec2();
        b2Body.ResetMassData_s_oldCenter = new b2Math_35.b2Vec2();
        b2Body.ResetMassData_s_massData = new b2Shape_9.b2MassData();
        b2Body.SynchronizeFixtures_s_xf1 = new b2Math_35.b2Transform();
        return b2Body;
    }());
    exports.b2Body = b2Body;
});
define("Dynamics/b2Fixture", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Collision/b2Collision", "Collision/Shapes/b2Shape"], function (require, exports, b2Settings_44, b2Math_36, b2Collision_14, b2Shape_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2Filter = (function () {
        function b2Filter() {
            this.categoryBits = 0x0001;
            this.maskBits = 0xFFFF;
            this.groupIndex = 0;
        }
        b2Filter.prototype.Clone = function () {
            return new b2Filter().Copy(this);
        };
        b2Filter.prototype.Copy = function (other) {
            this.categoryBits = other.categoryBits;
            this.maskBits = other.maskBits;
            this.groupIndex = other.groupIndex || 0;
            return this;
        };
        b2Filter.DEFAULT = new b2Filter();
        return b2Filter;
    }());
    exports.b2Filter = b2Filter;
    var b2FixtureDef = (function () {
        function b2FixtureDef() {
            this.userData = null;
            this.friction = 0.2;
            this.restitution = 0;
            this.density = 0;
            this.isSensor = false;
            this.filter = new b2Filter();
        }
        return b2FixtureDef;
    }());
    exports.b2FixtureDef = b2FixtureDef;
    var b2FixtureProxy = (function () {
        function b2FixtureProxy(fixture) {
            this.aabb = new b2Collision_14.b2AABB();
            this.childIndex = 0;
            this.fixture = fixture;
        }
        return b2FixtureProxy;
    }());
    exports.b2FixtureProxy = b2FixtureProxy;
    var b2Fixture = (function () {
        function b2Fixture(def, body) {
            this.m_density = 0;
            this.m_next = null;
            this.m_friction = 0;
            this.m_restitution = 0;
            this.m_proxies = [];
            this.m_proxyCount = 0;
            this.m_filter = new b2Filter();
            this.m_isSensor = false;
            this.m_userData = null;
            this.m_body = body;
            this.m_shape = def.shape.Clone();
        }
        b2Fixture.prototype.GetType = function () {
            return this.m_shape.GetType();
        };
        b2Fixture.prototype.GetShape = function () {
            return this.m_shape;
        };
        b2Fixture.prototype.SetSensor = function (sensor) {
            if (sensor !== this.m_isSensor) {
                this.m_body.SetAwake(true);
                this.m_isSensor = sensor;
            }
        };
        b2Fixture.prototype.IsSensor = function () {
            return this.m_isSensor;
        };
        b2Fixture.prototype.SetFilterData = function (filter) {
            this.m_filter.Copy(filter);
            this.Refilter();
        };
        b2Fixture.prototype.GetFilterData = function () {
            return this.m_filter;
        };
        b2Fixture.prototype.Refilter = function () {
            var edge = this.m_body.GetContactList();
            while (edge) {
                var contact = edge.contact;
                var fixtureA = contact.GetFixtureA();
                var fixtureB = contact.GetFixtureB();
                if (fixtureA === this || fixtureB === this) {
                    contact.FlagForFiltering();
                }
                edge = edge.next;
            }
            var world = this.m_body.GetWorld();
            if (world === null) {
                return;
            }
            var broadPhase = world.m_contactManager.m_broadPhase;
            for (var i = 0; i < this.m_proxyCount; ++i) {
                broadPhase.TouchProxy(this.m_proxies[i].treeNode);
            }
        };
        b2Fixture.prototype.GetBody = function () {
            return this.m_body;
        };
        b2Fixture.prototype.GetNext = function () {
            return this.m_next;
        };
        b2Fixture.prototype.GetUserData = function () {
            return this.m_userData;
        };
        b2Fixture.prototype.SetUserData = function (data) {
            this.m_userData = data;
        };
        b2Fixture.prototype.TestPoint = function (p) {
            return this.m_shape.TestPoint(this.m_body.GetTransform(), p);
        };
        b2Fixture.prototype.ComputeDistance = function (p, normal, childIndex) {
            return this.m_shape.ComputeDistance(this.m_body.GetTransform(), p, normal, childIndex);
        };
        b2Fixture.prototype.RayCast = function (output, input, childIndex) {
            return this.m_shape.RayCast(output, input, this.m_body.GetTransform(), childIndex);
        };
        b2Fixture.prototype.GetMassData = function (massData) {
            if (massData === void 0) { massData = new b2Shape_10.b2MassData(); }
            this.m_shape.ComputeMass(massData, this.m_density);
            return massData;
        };
        b2Fixture.prototype.SetDensity = function (density) {
            this.m_density = density;
        };
        b2Fixture.prototype.GetDensity = function () {
            return this.m_density;
        };
        b2Fixture.prototype.GetFriction = function () {
            return this.m_friction;
        };
        b2Fixture.prototype.SetFriction = function (friction) {
            this.m_friction = friction;
        };
        b2Fixture.prototype.GetRestitution = function () {
            return this.m_restitution;
        };
        b2Fixture.prototype.SetRestitution = function (restitution) {
            this.m_restitution = restitution;
        };
        b2Fixture.prototype.GetAABB = function (childIndex) {
            return this.m_proxies[childIndex].aabb;
        };
        b2Fixture.prototype.Dump = function (log, bodyIndex) {
            log("    const fd: b2FixtureDef = new b2FixtureDef();\n");
            log("    fd.friction = %.15f;\n", this.m_friction);
            log("    fd.restitution = %.15f;\n", this.m_restitution);
            log("    fd.density = %.15f;\n", this.m_density);
            log("    fd.isSensor = %s;\n", (this.m_isSensor) ? ("true") : ("false"));
            log("    fd.filter.categoryBits = %d;\n", this.m_filter.categoryBits);
            log("    fd.filter.maskBits = %d;\n", this.m_filter.maskBits);
            log("    fd.filter.groupIndex = %d;\n", this.m_filter.groupIndex);
            this.m_shape.Dump(log);
            log("\n");
            log("    fd.shape = shape;\n");
            log("\n");
            log("    bodies[%d].CreateFixture(fd);\n", bodyIndex);
        };
        b2Fixture.prototype.Create = function (def) {
            var _this = this;
            this.m_userData = def.userData;
            this.m_friction = b2Settings_44.b2Maybe(def.friction, 0.2);
            this.m_restitution = b2Settings_44.b2Maybe(def.restitution, 0);
            this.m_next = null;
            this.m_filter.Copy(b2Settings_44.b2Maybe(def.filter, b2Filter.DEFAULT));
            this.m_isSensor = b2Settings_44.b2Maybe(def.isSensor, false);
            this.m_proxies = b2Settings_44.b2MakeArray(this.m_shape.GetChildCount(), function (i) { return new b2FixtureProxy(_this); });
            this.m_proxyCount = 0;
            this.m_density = b2Settings_44.b2Maybe(def.density, 0);
        };
        b2Fixture.prototype.Destroy = function () {
        };
        b2Fixture.prototype.CreateProxies = function (xf) {
            var broadPhase = this.m_body.m_world.m_contactManager.m_broadPhase;
            this.m_proxyCount = this.m_shape.GetChildCount();
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i] = new b2FixtureProxy(this);
                this.m_shape.ComputeAABB(proxy.aabb, xf, i);
                proxy.treeNode = broadPhase.CreateProxy(proxy.aabb, proxy);
                proxy.childIndex = i;
            }
        };
        b2Fixture.prototype.DestroyProxies = function () {
            var broadPhase = this.m_body.m_world.m_contactManager.m_broadPhase;
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                delete proxy.treeNode.userData;
                broadPhase.DestroyProxy(proxy.treeNode);
                delete proxy.treeNode;
            }
            this.m_proxyCount = 0;
        };
        b2Fixture.prototype.TouchProxies = function () {
            var broadPhase = this.m_body.m_world.m_contactManager.m_broadPhase;
            var proxyCount = this.m_proxyCount;
            for (var i = 0; i < proxyCount; ++i) {
                broadPhase.TouchProxy(this.m_proxies[i].treeNode);
            }
        };
        b2Fixture.prototype.Synchronize = function (transform1, transform2) {
            if (this.m_proxyCount === 0) {
                return;
            }
            var broadPhase = this.m_body.m_world.m_contactManager.m_broadPhase;
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                var aabb1 = b2Fixture.Synchronize_s_aabb1;
                var aabb2 = b2Fixture.Synchronize_s_aabb2;
                this.m_shape.ComputeAABB(aabb1, transform1, i);
                this.m_shape.ComputeAABB(aabb2, transform2, i);
                proxy.aabb.Combine2(aabb1, aabb2);
                var displacement = b2Math_36.b2Vec2.SubVV(transform2.p, transform1.p, b2Fixture.Synchronize_s_displacement);
                broadPhase.MoveProxy(proxy.treeNode, proxy.aabb, displacement);
            }
        };
        b2Fixture.Synchronize_s_aabb1 = new b2Collision_14.b2AABB();
        b2Fixture.Synchronize_s_aabb2 = new b2Collision_14.b2AABB();
        b2Fixture.Synchronize_s_displacement = new b2Math_36.b2Vec2();
        return b2Fixture;
    }());
    exports.b2Fixture = b2Fixture;
});
define("Controllers/b2BuoyancyController", ["require", "exports", "Controllers/b2Controller", "Common/b2Math", "Common/b2Settings", "Common/b2Draw"], function (require, exports, b2Controller_1, b2Math_37, b2Settings_45, b2Draw_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2BuoyancyController = (function (_super) {
        __extends(b2BuoyancyController, _super);
        function b2BuoyancyController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.normal = new b2Math_37.b2Vec2(0, 1);
            _this.offset = 0;
            _this.density = 0;
            _this.velocity = new b2Math_37.b2Vec2(0, 0);
            _this.linearDrag = 0;
            _this.angularDrag = 0;
            _this.useDensity = false;
            _this.useWorldGravity = true;
            _this.gravity = new b2Math_37.b2Vec2(0, 0);
            return _this;
        }
        b2BuoyancyController.prototype.Step = function (step) {
            if (!this.m_bodyList) {
                return;
            }
            if (this.useWorldGravity) {
                this.gravity.Copy(this.m_bodyList.body.GetWorld().GetGravity());
            }
            for (var i = this.m_bodyList; i; i = i.nextBody) {
                var body = i.body;
                if (!body.IsAwake()) {
                    continue;
                }
                var areac = new b2Math_37.b2Vec2();
                var massc = new b2Math_37.b2Vec2();
                var area = 0;
                var mass = 0;
                for (var fixture = body.GetFixtureList(); fixture; fixture = fixture.m_next) {
                    var sc = new b2Math_37.b2Vec2();
                    var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
                    area += sarea;
                    areac.x += sarea * sc.x;
                    areac.y += sarea * sc.y;
                    var shapeDensity = 0;
                    if (this.useDensity) {
                        shapeDensity = fixture.GetDensity();
                    }
                    else {
                        shapeDensity = 1;
                    }
                    mass += sarea * shapeDensity;
                    massc.x += sarea * sc.x * shapeDensity;
                    massc.y += sarea * sc.y * shapeDensity;
                }
                areac.x /= area;
                areac.y /= area;
                massc.x /= mass;
                massc.y /= mass;
                if (area < b2Settings_45.b2_epsilon) {
                    continue;
                }
                var buoyancyForce = this.gravity.Clone().SelfNeg();
                buoyancyForce.SelfMul(this.density * area);
                body.ApplyForce(buoyancyForce, massc);
                var dragForce = body.GetLinearVelocityFromWorldPoint(areac, new b2Math_37.b2Vec2());
                dragForce.SelfSub(this.velocity);
                dragForce.SelfMul((-this.linearDrag * area));
                body.ApplyForce(dragForce, areac);
                body.ApplyTorque((-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag));
            }
        };
        b2BuoyancyController.prototype.Draw = function (debugDraw) {
            var r = 100;
            var p1 = new b2Math_37.b2Vec2();
            var p2 = new b2Math_37.b2Vec2();
            p1.x = this.normal.x * this.offset + this.normal.y * r;
            p1.y = this.normal.y * this.offset - this.normal.x * r;
            p2.x = this.normal.x * this.offset - this.normal.y * r;
            p2.y = this.normal.y * this.offset + this.normal.x * r;
            var color = new b2Draw_5.b2Color(0, 0, 0.8);
            debugDraw.DrawSegment(p1, p2, color);
        };
        return b2BuoyancyController;
    }(b2Controller_1.b2Controller));
    exports.b2BuoyancyController = b2BuoyancyController;
});
define("Controllers/b2ConstantAccelController", ["require", "exports", "Controllers/b2Controller", "Common/b2Math"], function (require, exports, b2Controller_2, b2Math_38) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ConstantAccelController = (function (_super) {
        __extends(b2ConstantAccelController, _super);
        function b2ConstantAccelController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.A = new b2Math_38.b2Vec2(0, 0);
            return _this;
        }
        b2ConstantAccelController.prototype.Step = function (step) {
            var dtA = b2Math_38.b2Vec2.MulSV(step.dt, this.A, b2ConstantAccelController.Step_s_dtA);
            for (var i = this.m_bodyList; i; i = i.nextBody) {
                var body = i.body;
                if (!body.IsAwake()) {
                    continue;
                }
                body.SetLinearVelocity(b2Math_38.b2Vec2.AddVV(body.GetLinearVelocity(), dtA, b2Math_38.b2Vec2.s_t0));
            }
        };
        b2ConstantAccelController.prototype.Draw = function (draw) { };
        b2ConstantAccelController.Step_s_dtA = new b2Math_38.b2Vec2();
        return b2ConstantAccelController;
    }(b2Controller_2.b2Controller));
    exports.b2ConstantAccelController = b2ConstantAccelController;
});
define("Controllers/b2ConstantForceController", ["require", "exports", "Controllers/b2Controller", "Common/b2Math"], function (require, exports, b2Controller_3, b2Math_39) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2ConstantForceController = (function (_super) {
        __extends(b2ConstantForceController, _super);
        function b2ConstantForceController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.F = new b2Math_39.b2Vec2(0, 0);
            return _this;
        }
        b2ConstantForceController.prototype.Step = function (step) {
            for (var i = this.m_bodyList; i; i = i.nextBody) {
                var body = i.body;
                if (!body.IsAwake()) {
                    continue;
                }
                body.ApplyForce(this.F, body.GetWorldCenter());
            }
        };
        b2ConstantForceController.prototype.Draw = function (draw) { };
        return b2ConstantForceController;
    }(b2Controller_3.b2Controller));
    exports.b2ConstantForceController = b2ConstantForceController;
});
define("Controllers/b2GravityController", ["require", "exports", "Controllers/b2Controller", "Common/b2Settings", "Common/b2Math"], function (require, exports, b2Controller_4, b2Settings_46, b2Math_40) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2GravityController = (function (_super) {
        __extends(b2GravityController, _super);
        function b2GravityController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.G = 1;
            _this.invSqr = true;
            return _this;
        }
        b2GravityController.prototype.Step = function (step) {
            if (this.invSqr) {
                for (var i = this.m_bodyList; i; i = i.nextBody) {
                    var body1 = i.body;
                    var p1 = body1.GetWorldCenter();
                    var mass1 = body1.GetMass();
                    for (var j = this.m_bodyList; j && j !== i; j = j.nextBody) {
                        var body2 = j.body;
                        var p2 = body2.GetWorldCenter();
                        var mass2 = body2.GetMass();
                        var dx = p2.x - p1.x;
                        var dy = p2.y - p1.y;
                        var r2 = dx * dx + dy * dy;
                        if (r2 < b2Settings_46.b2_epsilon) {
                            continue;
                        }
                        var f = b2GravityController.Step_s_f.Set(dx, dy);
                        f.SelfMul(this.G / r2 / b2Math_40.b2Sqrt(r2) * mass1 * mass2);
                        if (body1.IsAwake()) {
                            body1.ApplyForce(f, p1);
                        }
                        if (body2.IsAwake()) {
                            body2.ApplyForce(f.SelfMul(-1), p2);
                        }
                    }
                }
            }
            else {
                for (var i = this.m_bodyList; i; i = i.nextBody) {
                    var body1 = i.body;
                    var p1 = body1.GetWorldCenter();
                    var mass1 = body1.GetMass();
                    for (var j = this.m_bodyList; j && j !== i; j = j.nextBody) {
                        var body2 = j.body;
                        var p2 = body2.GetWorldCenter();
                        var mass2 = body2.GetMass();
                        var dx = p2.x - p1.x;
                        var dy = p2.y - p1.y;
                        var r2 = dx * dx + dy * dy;
                        if (r2 < b2Settings_46.b2_epsilon) {
                            continue;
                        }
                        var f = b2GravityController.Step_s_f.Set(dx, dy);
                        f.SelfMul(this.G / r2 * mass1 * mass2);
                        if (body1.IsAwake()) {
                            body1.ApplyForce(f, p1);
                        }
                        if (body2.IsAwake()) {
                            body2.ApplyForce(f.SelfMul(-1), p2);
                        }
                    }
                }
            }
        };
        b2GravityController.prototype.Draw = function (draw) { };
        b2GravityController.Step_s_f = new b2Math_40.b2Vec2();
        return b2GravityController;
    }(b2Controller_4.b2Controller));
    exports.b2GravityController = b2GravityController;
});
define("Controllers/b2TensorDampingController", ["require", "exports", "Controllers/b2Controller", "Common/b2Math", "Common/b2Settings"], function (require, exports, b2Controller_5, b2Math_41, b2Settings_47) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2TensorDampingController = (function (_super) {
        __extends(b2TensorDampingController, _super);
        function b2TensorDampingController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.T = new b2Math_41.b2Mat22();
            _this.maxTimestep = 0;
            return _this;
        }
        b2TensorDampingController.prototype.Step = function (step) {
            var timestep = step.dt;
            if (timestep <= b2Settings_47.b2_epsilon) {
                return;
            }
            if (timestep > this.maxTimestep && this.maxTimestep > 0) {
                timestep = this.maxTimestep;
            }
            for (var i = this.m_bodyList; i; i = i.nextBody) {
                var body = i.body;
                if (!body.IsAwake()) {
                    continue;
                }
                var damping = body.GetWorldVector(b2Math_41.b2Mat22.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity(), b2Math_41.b2Vec2.s_t0), b2Math_41.b2Vec2.s_t1), b2TensorDampingController.Step_s_damping);
                body.SetLinearVelocity(b2Math_41.b2Vec2.AddVV(body.GetLinearVelocity(), b2Math_41.b2Vec2.MulSV(timestep, damping, b2Math_41.b2Vec2.s_t0), b2Math_41.b2Vec2.s_t1));
            }
        };
        b2TensorDampingController.prototype.Draw = function (draw) { };
        b2TensorDampingController.prototype.SetAxisAligned = function (xDamping, yDamping) {
            this.T.ex.x = (-xDamping);
            this.T.ex.y = 0;
            this.T.ey.x = 0;
            this.T.ey.y = (-yDamping);
            if (xDamping > 0 || yDamping > 0) {
                this.maxTimestep = 1 / b2Math_41.b2Max(xDamping, yDamping);
            }
            else {
                this.maxTimestep = 0;
            }
        };
        b2TensorDampingController.Step_s_damping = new b2Math_41.b2Vec2();
        return b2TensorDampingController;
    }(b2Controller_5.b2Controller));
    exports.b2TensorDampingController = b2TensorDampingController;
});
define("Rope/b2Rope", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Common/b2Draw"], function (require, exports, b2Settings_48, b2Math_42, b2Draw_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b2RopeDef = (function () {
        function b2RopeDef() {
            this.vertices = [];
            this.count = 0;
            this.masses = [];
            this.gravity = new b2Math_42.b2Vec2(0, 0);
            this.damping = 0.1;
            this.k2 = 0.9;
            this.k3 = 0.1;
        }
        return b2RopeDef;
    }());
    exports.b2RopeDef = b2RopeDef;
    var b2Rope = (function () {
        function b2Rope() {
            this.m_count = 0;
            this.m_ps = [];
            this.m_p0s = [];
            this.m_vs = [];
            this.m_ims = [];
            this.m_Ls = [];
            this.m_as = [];
            this.m_gravity = new b2Math_42.b2Vec2();
            this.m_damping = 0;
            this.m_k2 = 1;
            this.m_k3 = 0.1;
        }
        b2Rope.prototype.GetVertexCount = function () {
            return this.m_count;
        };
        b2Rope.prototype.GetVertices = function () {
            return this.m_ps;
        };
        b2Rope.prototype.Initialize = function (def) {
            this.m_count = def.count;
            this.m_ps = b2Math_42.b2Vec2.MakeArray(this.m_count);
            this.m_p0s = b2Math_42.b2Vec2.MakeArray(this.m_count);
            this.m_vs = b2Math_42.b2Vec2.MakeArray(this.m_count);
            this.m_ims = b2Settings_48.b2MakeNumberArray(this.m_count);
            for (var i = 0; i < this.m_count; ++i) {
                this.m_ps[i].Copy(def.vertices[i]);
                this.m_p0s[i].Copy(def.vertices[i]);
                this.m_vs[i].SetZero();
                var m = def.masses[i];
                if (m > 0) {
                    this.m_ims[i] = 1 / m;
                }
                else {
                    this.m_ims[i] = 0;
                }
            }
            var count2 = this.m_count - 1;
            var count3 = this.m_count - 2;
            this.m_Ls = b2Settings_48.b2MakeNumberArray(count2);
            this.m_as = b2Settings_48.b2MakeNumberArray(count3);
            for (var i = 0; i < count2; ++i) {
                var p1 = this.m_ps[i];
                var p2 = this.m_ps[i + 1];
                this.m_Ls[i] = b2Math_42.b2Vec2.DistanceVV(p1, p2);
            }
            for (var i = 0; i < count3; ++i) {
                var p1 = this.m_ps[i];
                var p2 = this.m_ps[i + 1];
                var p3 = this.m_ps[i + 2];
                var d1 = b2Math_42.b2Vec2.SubVV(p2, p1, b2Math_42.b2Vec2.s_t0);
                var d2 = b2Math_42.b2Vec2.SubVV(p3, p2, b2Math_42.b2Vec2.s_t1);
                var a = b2Math_42.b2Vec2.CrossVV(d1, d2);
                var b = b2Math_42.b2Vec2.DotVV(d1, d2);
                this.m_as[i] = b2Math_42.b2Atan2(a, b);
            }
            this.m_gravity.Copy(def.gravity);
            this.m_damping = def.damping;
            this.m_k2 = def.k2;
            this.m_k3 = def.k3;
        };
        b2Rope.prototype.Step = function (h, iterations) {
            if (h === 0) {
                return;
            }
            var d = Math.exp(-h * this.m_damping);
            for (var i = 0; i < this.m_count; ++i) {
                this.m_p0s[i].Copy(this.m_ps[i]);
                if (this.m_ims[i] > 0) {
                    this.m_vs[i].SelfMulAdd(h, this.m_gravity);
                }
                this.m_vs[i].SelfMul(d);
                this.m_ps[i].SelfMulAdd(h, this.m_vs[i]);
            }
            for (var i = 0; i < iterations; ++i) {
                this.SolveC2();
                this.SolveC3();
                this.SolveC2();
            }
            var inv_h = 1 / h;
            for (var i = 0; i < this.m_count; ++i) {
                b2Math_42.b2Vec2.MulSV(inv_h, b2Math_42.b2Vec2.SubVV(this.m_ps[i], this.m_p0s[i], b2Math_42.b2Vec2.s_t0), this.m_vs[i]);
            }
        };
        b2Rope.prototype.SolveC2 = function () {
            var count2 = this.m_count - 1;
            for (var i = 0; i < count2; ++i) {
                var p1 = this.m_ps[i];
                var p2 = this.m_ps[i + 1];
                var d = b2Math_42.b2Vec2.SubVV(p2, p1, b2Rope.s_d);
                var L = d.Normalize();
                var im1 = this.m_ims[i];
                var im2 = this.m_ims[i + 1];
                if (im1 + im2 === 0) {
                    continue;
                }
                var s1 = im1 / (im1 + im2);
                var s2 = im2 / (im1 + im2);
                p1.SelfMulSub(this.m_k2 * s1 * (this.m_Ls[i] - L), d);
                p2.SelfMulAdd(this.m_k2 * s2 * (this.m_Ls[i] - L), d);
            }
        };
        b2Rope.prototype.SetAngle = function (angle) {
            var count3 = this.m_count - 2;
            for (var i = 0; i < count3; ++i) {
                this.m_as[i] = angle;
            }
        };
        b2Rope.prototype.SolveC3 = function () {
            var count3 = this.m_count - 2;
            for (var i = 0; i < count3; ++i) {
                var p1 = this.m_ps[i];
                var p2 = this.m_ps[i + 1];
                var p3 = this.m_ps[i + 2];
                var m1 = this.m_ims[i];
                var m2 = this.m_ims[i + 1];
                var m3 = this.m_ims[i + 2];
                var d1 = b2Math_42.b2Vec2.SubVV(p2, p1, b2Rope.s_d1);
                var d2 = b2Math_42.b2Vec2.SubVV(p3, p2, b2Rope.s_d2);
                var L1sqr = d1.LengthSquared();
                var L2sqr = d2.LengthSquared();
                if (L1sqr * L2sqr === 0) {
                    continue;
                }
                var a = b2Math_42.b2Vec2.CrossVV(d1, d2);
                var b = b2Math_42.b2Vec2.DotVV(d1, d2);
                var angle = b2Math_42.b2Atan2(a, b);
                var Jd1 = b2Math_42.b2Vec2.MulSV((-1 / L1sqr), d1.SelfSkew(), b2Rope.s_Jd1);
                var Jd2 = b2Math_42.b2Vec2.MulSV((1 / L2sqr), d2.SelfSkew(), b2Rope.s_Jd2);
                var J1 = b2Math_42.b2Vec2.NegV(Jd1, b2Rope.s_J1);
                var J2 = b2Math_42.b2Vec2.SubVV(Jd1, Jd2, b2Rope.s_J2);
                var J3 = Jd2;
                var mass = m1 * b2Math_42.b2Vec2.DotVV(J1, J1) + m2 * b2Math_42.b2Vec2.DotVV(J2, J2) + m3 * b2Math_42.b2Vec2.DotVV(J3, J3);
                if (mass === 0) {
                    continue;
                }
                mass = 1 / mass;
                var C = angle - this.m_as[i];
                while (C > b2Settings_48.b2_pi) {
                    angle -= 2 * b2Settings_48.b2_pi;
                    C = angle - this.m_as[i];
                }
                while (C < -b2Settings_48.b2_pi) {
                    angle += 2 * b2Settings_48.b2_pi;
                    C = angle - this.m_as[i];
                }
                var impulse = -this.m_k3 * mass * C;
                p1.SelfMulAdd((m1 * impulse), J1);
                p2.SelfMulAdd((m2 * impulse), J2);
                p3.SelfMulAdd((m3 * impulse), J3);
            }
        };
        b2Rope.prototype.Draw = function (draw) {
            var c = new b2Draw_6.b2Color(0.4, 0.5, 0.7);
            for (var i = 0; i < this.m_count - 1; ++i) {
                draw.DrawSegment(this.m_ps[i], this.m_ps[i + 1], c);
            }
        };
        b2Rope.s_d = new b2Math_42.b2Vec2();
        b2Rope.s_d1 = new b2Math_42.b2Vec2();
        b2Rope.s_d2 = new b2Math_42.b2Vec2();
        b2Rope.s_Jd1 = new b2Math_42.b2Vec2();
        b2Rope.s_Jd2 = new b2Math_42.b2Vec2();
        b2Rope.s_J1 = new b2Math_42.b2Vec2();
        b2Rope.s_J2 = new b2Math_42.b2Vec2();
        return b2Rope;
    }());
    exports.b2Rope = b2Rope;
});
define("Box2D", ["require", "exports", "Common/b2Settings", "Common/b2Math", "Common/b2Draw", "Common/b2Timer", "Common/b2GrowableStack", "Common/b2BlockAllocator", "Common/b2StackAllocator", "Collision/b2Collision", "Collision/b2Distance", "Collision/b2BroadPhase", "Collision/b2DynamicTree", "Collision/b2TimeOfImpact", "Collision/b2CollideCircle", "Collision/b2CollidePolygon", "Collision/b2CollideEdge", "Collision/Shapes/b2Shape", "Collision/Shapes/b2CircleShape", "Collision/Shapes/b2PolygonShape", "Collision/Shapes/b2EdgeShape", "Collision/Shapes/b2ChainShape", "Dynamics/b2Fixture", "Dynamics/b2Body", "Dynamics/b2World", "Dynamics/b2WorldCallbacks", "Dynamics/b2Island", "Dynamics/b2TimeStep", "Dynamics/b2ContactManager", "Dynamics/Contacts/b2Contact", "Dynamics/Contacts/b2ContactFactory", "Dynamics/Contacts/b2ContactSolver", "Dynamics/Contacts/b2CircleContact", "Dynamics/Contacts/b2PolygonContact", "Dynamics/Contacts/b2PolygonAndCircleContact", "Dynamics/Contacts/b2EdgeAndCircleContact", "Dynamics/Contacts/b2EdgeAndPolygonContact", "Dynamics/Contacts/b2ChainAndCircleContact", "Dynamics/Contacts/b2ChainAndPolygonContact", "Dynamics/Joints/b2Joint", "Dynamics/Joints/b2JointFactory", "Dynamics/Joints/b2AreaJoint", "Dynamics/Joints/b2DistanceJoint", "Dynamics/Joints/b2FrictionJoint", "Dynamics/Joints/b2GearJoint", "Dynamics/Joints/b2MotorJoint", "Dynamics/Joints/b2MouseJoint", "Dynamics/Joints/b2PrismaticJoint", "Dynamics/Joints/b2PulleyJoint", "Dynamics/Joints/b2RevoluteJoint", "Dynamics/Joints/b2RopeJoint", "Dynamics/Joints/b2WeldJoint", "Dynamics/Joints/b2WheelJoint", "Controllers/b2Controller", "Controllers/b2BuoyancyController", "Controllers/b2ConstantAccelController", "Controllers/b2ConstantForceController", "Controllers/b2GravityController", "Controllers/b2TensorDampingController", "Particle/b2Particle", "Particle/b2ParticleGroup", "Particle/b2ParticleSystem", "Rope/b2Rope"], function (require, exports, b2Settings_49, b2Math_43, b2Draw_7, b2Timer_4, b2GrowableStack_2, b2BlockAllocator_1, b2StackAllocator_1, b2Collision_15, b2Distance_3, b2BroadPhase_2, b2DynamicTree_2, b2TimeOfImpact_3, b2CollideCircle_3, b2CollidePolygon_2, b2CollideEdge_5, b2Shape_11, b2CircleShape_1, b2PolygonShape_1, b2EdgeShape_5, b2ChainShape_1, b2Fixture_2, b2Body_5, b2World_1, b2WorldCallbacks_5, b2Island_2, b2TimeStep_5, b2ContactManager_2, b2Contact_8, b2ContactFactory_2, b2ContactSolver_2, b2CircleContact_2, b2PolygonContact_2, b2PolygonAndCircleContact_2, b2EdgeAndCircleContact_2, b2EdgeAndPolygonContact_2, b2ChainAndCircleContact_2, b2ChainAndPolygonContact_2, b2Joint_15, b2JointFactory_2, b2AreaJoint_2, b2DistanceJoint_3, b2FrictionJoint_2, b2GearJoint_2, b2MotorJoint_2, b2MouseJoint_2, b2PrismaticJoint_2, b2PulleyJoint_2, b2RevoluteJoint_2, b2RopeJoint_2, b2WeldJoint_2, b2WheelJoint_2, b2Controller_6, b2BuoyancyController_1, b2ConstantAccelController_1, b2ConstantForceController_1, b2GravityController_1, b2TensorDampingController_1, b2Particle_3, b2ParticleGroup_2, b2ParticleSystem_2, b2Rope_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(b2Settings_49);
    __export(b2Math_43);
    __export(b2Draw_7);
    __export(b2Timer_4);
    __export(b2GrowableStack_2);
    __export(b2BlockAllocator_1);
    __export(b2StackAllocator_1);
    __export(b2Collision_15);
    __export(b2Distance_3);
    __export(b2BroadPhase_2);
    __export(b2DynamicTree_2);
    __export(b2TimeOfImpact_3);
    __export(b2CollideCircle_3);
    __export(b2CollidePolygon_2);
    __export(b2CollideEdge_5);
    __export(b2Shape_11);
    __export(b2CircleShape_1);
    __export(b2PolygonShape_1);
    __export(b2EdgeShape_5);
    __export(b2ChainShape_1);
    __export(b2Fixture_2);
    __export(b2Body_5);
    __export(b2World_1);
    __export(b2WorldCallbacks_5);
    __export(b2Island_2);
    __export(b2TimeStep_5);
    __export(b2ContactManager_2);
    __export(b2Contact_8);
    __export(b2ContactFactory_2);
    __export(b2ContactSolver_2);
    __export(b2CircleContact_2);
    __export(b2PolygonContact_2);
    __export(b2PolygonAndCircleContact_2);
    __export(b2EdgeAndCircleContact_2);
    __export(b2EdgeAndPolygonContact_2);
    __export(b2ChainAndCircleContact_2);
    __export(b2ChainAndPolygonContact_2);
    __export(b2Joint_15);
    __export(b2JointFactory_2);
    __export(b2AreaJoint_2);
    __export(b2DistanceJoint_3);
    __export(b2FrictionJoint_2);
    __export(b2GearJoint_2);
    __export(b2MotorJoint_2);
    __export(b2MouseJoint_2);
    __export(b2PrismaticJoint_2);
    __export(b2PulleyJoint_2);
    __export(b2RevoluteJoint_2);
    __export(b2RopeJoint_2);
    __export(b2WeldJoint_2);
    __export(b2WheelJoint_2);
    __export(b2Controller_6);
    __export(b2BuoyancyController_1);
    __export(b2ConstantAccelController_1);
    __export(b2ConstantForceController_1);
    __export(b2GravityController_1);
    __export(b2TensorDampingController_1);
    __export(b2Particle_3);
    __export(b2ParticleGroup_2);
    __export(b2ParticleSystem_2);
    __export(b2Rope_1);
});
//# sourceMappingURL=box2d-ts.js.map