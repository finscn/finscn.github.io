"use strict";
(function (exports, undefined) {
    var Z = exports.Toucher = exports.Toucher || {};
    var В = Z.O = Z.O || {};
    В.$f = [
        "touches",
        "changedTouches",
        "targetTouches"
    ];
    В.touches = "touches";
    В.changedTouches = "changedTouches";
    В.targetTouches = "targetTouches";
    В.d = 1;
    var j = Z.zС = function (Β) {
            for (var q in Β) {
                this[q] = Β[q]
            }
            this.L = this.L || Z.ΥΖ
        };
    var g = {
            constructor: j,
            L: null,
            host: window,
            В: document,
            H: 1,
            Eq: false,
            X: false,
            Υ: true,
            preventDefault: false,
            ВΑ: false,
            vΝ: false,
            kH: false,
            ТW: false,
            offsetLeft: 0,
            offsetTop: 0,
            h: 30,
            Dy: 5,
            І: null,
            e: null,
            Ϝ: null,
            C1: 0,
            ZR: 0,
            u: function () {
            },
            Е: function () {
                this.W = [];
                this.reset();
                this.u();
                var V = this.В;
                this.KE();
                this.Eq = "ontouchstart" in this.В;
                if (!this.Eq) {
                    this.X = true
                }
                if (this.X) {
                    В.I = "mousedown";
                    В.l = "mousemove";
                    В.D = "mouseup";
                    В.fΑ = null
                } else {
                    В.I = "touchstart";
                    В.l = "touchmove";
                    В.D = "touchend";
                    В.fΑ = "touchcancel"
                }
                var Μ = this;
                V.addEventListener(В.I, function (Β) {
                    var c = Date.now();
                    if (Μ.X) {
                        Μ.reset()
                    }
                    if (Μ.kΖ !== null && Μ.kΖ(Β, c) === false) {
                        return
                    }
                    Μ.Α(Β, c);
                    if (Μ.ВΑ || Μ.preventDefault) {
                        Β.preventDefault()
                    }
                }, this.Υ);
                V.addEventListener(В.l, function (H) {
                    var Р = Date.now();
                    if (Р - Μ.C1 < Μ.ZR || Μ.m5 !== null && Μ.m5(H, Р) === false) {
                        return
                    }
                    Μ.C1 = Р;
                    Μ.ЕΥ(H, Р);
                    if (Μ.vΝ || Μ.preventDefault) {
                        H.preventDefault()
                    }
                }, this.Υ);
                var Q = function (J) {
                    var D = Date.now();
                    if (Μ.ΟI !== null && Μ.ΟI(J, D) === false) {
                        return
                    }
                    Μ.kk(J, D);
                    if (Μ.kH || Μ.preventDefault) {
                        J.preventDefault()
                    }
                };
                V.addEventListener(В.D, Q, this.Υ);
                if (this.X) {
                    window.addEventListener("mouseout", function (Ζ) {
                        var c = Ζ.relatedTarget || Ζ.toElement;
                        if (!c || c.nodeName == "HTML") {
                            Q(Ζ)
                        }
                        Ζ.preventDefault()
                    }, false)
                } else {
                    V.addEventListener(В.fΑ, function (i) {
                        var m = Date.now();
                        if (Μ.uΧ !== null && Μ.uΧ(i) === false) {
                            return
                        }
                        Μ.reset();
                        Μ.Ϝa(i, m);
                        if (Μ.ТW || Μ.preventDefault) {
                            i.preventDefault()
                        }
                    }, this.Υ)
                }
                this.V()
            },
            V: function () {
            },
            reset: function () {
                this.І = [];
                this.e = [];
                this.Ϝ = [];
                this.І.s = this.e.s = this.Ϝ.s = 0;
                this.F = {};
                this.rΕ = 0
            },
            KE: function () {
                var S = this.В;
                if (S === window || S === document) {
                    this.offsetLeft = 0;
                    this.offsetTop = 0;
                    return
                }
                if (S.getBoundingClientRect !== undefined) {
                    var G = window.pageXOffset, Υ = 0;
                    if (G || G === 0) {
                        Υ = window.pageYOffset
                    } else {
                        G = document.body.scrollLeft;
                        Υ = document.body.scrollTop
                    }
                    var І = S.getBoundingClientRect();
                    this.offsetLeft = І.left + G;
                    this.offsetTop = І.top + Υ;
                    return
                }
                var h = S.offsetLeft, Β = S.offsetTop;
                while ((S = S.parentNode) && S !== document.body && S !== document) {
                    h += S.offsetLeft;
                    Β += S.offsetTop
                }
                this.offsetLeft = h;
                this.offsetTop = Β
            },
            kΖ: null,
            Α: function (J, W) {
                var Α = this.zV(J, W);
                this.C("start", Α, J)
            },
            m5: null,
            ЕΥ: function (v, f) {
                var Ο = this.BϺ(v, f);
                this.C("move", Ο, v)
            },
            ΟI: null,
            kk: function (Ι, w) {
                var Н = this.XН(Ι, w);
                this.C("end", Н, Ι)
            },
            uΧ: null,
            Ϝa: function (І, q) {
                console.log("cancel", this.W.length);
                for (var А = 0, b = this.W.length; А < b; А++) {
                    var r = this.W[А];
                    if (r.cancel != null) {
                        if (r.cancel(null, І, this) === false) {
                            break
                        }
                    }
                }
            },
            PЕ: function (l, w) {
                if (l.length >= this.Dy) {
                    l.shift()
                }
                l.push(w)
            },
            Yr: function (І, q) {
                if (І.length >= this.Dy) {
                    І.shift()
                }
                І.push(q)
            },
            zV: function (r, x) {
                var Κ = r[В.changedTouches] || [r];
                var E = [];
                for (var o = 0, Μ = Κ.length; o < Μ; o++) {
                    var Е = Κ[o];
                    var _ = Е.K;
                    var l = _ || _ === 0 ? _ : В.d;
                    var b = this.F[l];
                    b = new this.L(l);
                    b.H = this.H;
                    this.F[l] = b;
                    this.rΕ++;
                    b.start(Е, r);
                    E.push(b);
                    var f = this.І;
                    if (x - f.s > this.h) {
                        f.length = 0
                    }
                    f.s = x;
                    f.push(b)
                }
                return E
            },
            BϺ: function (Ο, F) {
                var Β = Ο[В.changedTouches] || [Ο];
                var y = [];
                for (var c = 0, U = Β.length; c < U; c++) {
                    var k = Β[c];
                    var o = k.K;
                    var t = o || o === 0 ? o : В.d;
                    var Ζ = this.F[t];
                    if (Ζ) {
                        if (!Ζ.ΜІ) {
                            var Р = this.e;
                            if (F - Р.s > this.h) {
                                Р.length = 0
                            }
                            Р.s = F;
                            Р.push(Ζ)
                        }
                        Ζ.move(k, Ο);
                        y.push(Ζ)
                    }
                }
                return y
            },
            XН: function (М, n) {
                var y = М[В.changedTouches] || [М];
                var k = {};
                if (!this.X) {
                    var І = М[В.touches];
                    for (var c = І.length - 1; c >= 0; c--) {
                        var Ζ = І[c];
                        k[Ζ.K] = true
                    }
                }
                var Ϝ = [];
                for (var m = 0, C = y.length; m < C; m++) {
                    var Υ = y[m];
                    var K = Υ.K;
                    var A = K || K === 0 ? K : В.d;
                    if (!k[A]) {
                        var Q = this.F[A];
                        if (Q) {
                            Q.end(Υ);
                            delete this.F[A];
                            this.rΕ--;
                            Ϝ.push(Q);
                            var Κ = this.Ϝ;
                            if (n - Κ.s > this.h) {
                                Κ.length = 0
                            }
                            Κ.s = n;
                            Κ.push(Q);
                            this._y(this.І, A);
                            this._y(this.e, A)
                        }
                    }
                }
                return Ϝ
            },
            _y: function (І, b) {
                for (var m = І.length - 1; m >= 0; m--) {
                    if (І[m].K == b) {
                        І.splice(m, 1);
                        return b
                    }
                }
                return false
            },
            C: function (u, v, М) {
                for (var U = 0, D = this.W.length; U < D; U++) {
                    var h = this.W[U];
                    if (h[u] != null) {
                        var Ρ = h.LΖ(u, v, М, this);
                        if (Ρ === true) {
                            Ρ = v
                        }
                        if (Ρ && Ρ.length > 0) {
                            if (h[u](Ρ, М, this) === false) {
                                break
                            }
                        }
                    }
                }
            },
            Ε_: function (w) {
                w.controller = this;
                w.offsetLeft = this.offsetLeft;
                w.offsetTop = this.offsetTop;
                w.Е();
                this.W.push(w);
                w.order = w.order || 0
            },
            x9: function (Е) {
                for (var М = this.W.length - 1; М >= 0; М--) {
                    if (this.W[М] == Е) {
                        this.W.splice(М, 1);
                        Е.controller = null;
                        return Е
                    }
                }
                return null
            },
            Τn: function () {
                for (var T = this.W.length - 1; T >= 0; T--) {
                    R.controller = null
                }
                this.W.length = 0
            }
        };
    for (var M in g) {
        j.prototype[M] = g[M]
    }
}(this));
"use strict";
(function (exports, undefined) {
    var k = exports.Toucher = exports.Toucher || {};
    var V = k.O = k.O || {};
    var Μ = k.ΥΖ = function (Β) {
            this.K = Β;
            this.id = Β
        };
    var w = {
            constructor: Μ,
            H: 1,
            start: function (c, Ϻ) {
                this.type = V.I;
                this.update(c, Ϻ);
                this.S = this.Ν = this.pageX;
                this.U = this.SО = this.pageY;
                this.Cj = this.T_ = this.target;
                this.xϹ = this.С8 = this.clientX;
                this._H = this.SU = this.clientY;
                this.ϜϹ = 0;
                this.ЈK = 0;
                this.zS = 0;
                this.UK = 0;
                this.TB = true;
                this.startTime = this.ΟZ = Date.now()
            },
            move: function (Χ, A) {
                this.type = V.l;
                this.update(Χ, A);
                this.ΜІ = Date.now()
            },
            end: function (Z, A) {
                this.type = V.D;
                this.update(Z, A);
                this.ZЅ = this.pageX;
                this.Ρw = this.pageY;
                this.u$ = this.target;
                this.fH = this.clientX;
                this.Υu = this.clientY;
                this.TB = false;
                this.ΟZ = Date.now()
            },
            update: function (S, H) {
                this.BΗ = H;
                this.rϺ = S;
                this.T_ = this.target;
                this.Ν = this.pageX;
                this.SО = this.pageY;
                this.С8 = this.clientX;
                this.SU = this.clientY;
                this.target = S.target;
                this.pageX = S.pageX * this.H;
                this.pageY = S.pageY * this.H;
                this.clientX = S.clientX * this.H;
                this.clientY = S.clientY * this.H;
                this.ϜϹ = this.pageX - this.Ν;
                this.ЈK = this.pageY - this.SО;
                this.zS = this.pageX - this.S;
                this.UK = this.pageY - this.U
            }
        };
    for (var j in w) {
        Μ.prototype[j] = w[j]
    }
}(this));
"use strict";
(function (exports, undefined) {
    var u = exports.Toucher = exports.Toucher || {};
    var T = u.O = u.O || {};
    var Z = u.Μq = function (S) {
            for (var x in S) {
                this[x] = S[x]
            }
        };
    Z.extend = function (М) {
        var A = this;
        var Υ = function (m) {
            for (var P in m) {
                this[P] = m[P]
            }
        };
        var Α = A.prototype;
        for (var k in Α) {
            Υ.prototype[k] = Α[k]
        }
        for (var k in М) {
            Υ.prototype[k] = М[k]
        }
        Υ.prototype.constructor = Υ;
        Υ.extend = A.extend;
        Υ.yР = Α;
        Υ.НΑ = A;
        return Υ
    };
    var F = {
            constructor: Z,
            id: null,
            type: null,
            offsetLeft: 0,
            offsetTop: 0,
            order: 1,
            u: function () {
            },
            Е: function () {
                this.u();
                this.V()
            },
            V: function () {
            },
            LΖ: function (t, x, C, Ζ) {
                var Μ = [];
                for (var G = 0, w = x.length; G < w; G++) {
                    var y = x[G];
                    if (this.FQ(t, y, C, Ζ)) {
                        Μ.push(y)
                    }
                }
                return Μ
            },
            FQ: function (Α, j, Ζ, K) {
                return false
            },
            start: null,
            move: null,
            end: null,
            cancel: null
        };
    for (var e in F) {
        Z.prototype[e] = F[e]
    }
}(this));
Toucher.Тf = Toucher.Μq.extend({
    p: null,
    disabled: false,
    Z: null,
    М: false,
    _Μ: 0,
    pΑ: 0,
    FQ: function (m, n, Ϻ, Ν) {
        return !this.disabled
    },
    LΤ: function () {
        this.disabled = false;
        this.p = null;
        this.F = false
    },
    cL: function () {
        this.disabled = true;
        this.p = null;
        this.F = false
    },
    Μ: function (Β, Ζ) {
        if (!this.Z) {
            return true
        }
        return this.UϹ(this.Z, Β, Ζ)
    },
    z: function (i, s, M) {
        this.F = true;
        this.Np(i, s, M)
    },
    Gi: function (u, M, b) {
        this.F = false;
        this.Е$(u, M, b)
    },
    UϹ: function (В, v, T) {
        return В && В[0] < v && v < В[2] && В[1] < T && T < В[3]
    },
    start: function (P, H, e) {
        if (this.disabled) {
            return
        }
        for (var o = 0; o < P.length; o++) {
            var B = P[o];
            if (this.p === null && this.Μ(B.pageX, B.pageY)) {
                this.p = B.id;
                this.z(B, H, e);
                break
            }
        }
    },
    move: function (Ζ, p, H) {
        if (this.disabled) {
            return
        }
        if (this.p) {
            for (var v = 0; v < Ζ.length; v++) {
                var q = Ζ[v];
                if (this.p === q.id) {
                    if (this.F && !this.Μ(q.pageX, q.pageY)) {
                        this.Gi(q, p, H)
                    } else if (!this.F && this.Μ(q.pageX, q.pageY)) {
                        this.z(q, p, H)
                    }
                    break
                }
            }
        } else {
            for (var v = 0; v < Ζ.length; v++) {
                var q = Ζ[v];
                if (this.Μ(q.pageX, q.pageY)) {
                    this.p = q.id;
                    this.z(q, p, H);
                    break
                }
            }
        }
    },
    end: function (v, А, В) {
        if (this.disabled) {
            return
        }
        for (var Ρ = 0; Ρ < v.length; Ρ++) {
            var Z = v[Ρ];
            if (this.p === Z.id) {
                this.p = null;
                this.Gi(Z);
                break
            }
        }
    },
    Np: function (f, H, Κ) {
    },
    Lg: function (k, Ν, Β) {
    },
    Е$: function (Н, E, Ι) {
    }
});
Toucher.СΧ = Toucher.Тf.extend({
    Ζ: 0,
    cos: 1,
    sin: 0,
    P: 0,
    A: 0,
    x2: null,
    v: null,
    M: 0,
    J: 0,
    Р: 0,
    j: 0,
    m: 0,
    Ι: 100,
    $: 0,
    _: 0,
    Ј: 0,
    Е: function () {
        this.u();
        this.f();
        this.V()
    },
    f: function () {
        if (this.$) {
            this.N = Math.PI * 2 / this.$
        }
        if (this._) {
            this.Ј = Math.max(this.Ι, this.Ј)
        }
    },
    start: function (H, U, Z) {
        if (this.disabled) {
            return
        }
        for (var q = 0; q < H.length; q++) {
            var W = H[q];
            if (this.p === null && this.Μ(W.pageX, W.pageY)) {
                this.p = W.id;
                this.F = true;
                this.pageX = W.pageX;
                this.pageY = W.pageY;
                if (this.М) {
                    this.P = W.S;
                    this.A = W.U
                } else {
                    this.СН()
                }
                this.Np(W, U, Z);
                break
            }
        }
    },
    move: function (Β, y, H) {
        if (this.disabled || this.p === null) {
            return
        }
        for (var Ϝ = 0; Ϝ < Β.length; Ϝ++) {
            var W = Β[Ϝ];
            if (this.p === W.id) {
                this.pageX = W.pageX;
                this.pageY = W.pageY;
                if (this.СН()) {
                    this.Lg(W, y, H)
                }
                break
            }
        }
    },
    СН: function () {
        var Ζ = this.А = this.pageX - this.P;
        var P = this.aΕ = this.pageY - this.A;
        if (!Ζ && !P) {
            this.j = 0;
            return false
        }
        var n = this.j = Math.sqrt(Ζ * Ζ + P * P);
        if (n < this.m) {
            this.M = this.J = this.Р = 0;
            return
        }
        var Υ = Math.atan2(P, Ζ);
        if (this.N) {
            Υ = Math.floor(Υ / this.N + 0.5) * this.N
        }
        this.Ζ = Υ;
        this.cos = Math.cos(Υ);
        this.sin = Math.sin(Υ);
        if (n > this.Ι) {
            n = this.Ι;
            Ζ = n * this.cos;
            P = n * this.sin
        }
        this.M = Ζ;
        this.J = P;
        this.Р = n;
        return true
    },
    end: function (Μ, $, Υ) {
        if (this.disabled) {
            return
        }
        for (var Κ = 0; Κ < Μ.length; Κ++) {
            var F = Μ[Κ];
            if (this.p === F.id) {
                this.reset();
                this.Е$(F, $, Υ);
                break
            }
        }
    },
    reset: function () {
        this.p = null;
        this.F = false;
        if (this.x2 !== null) {
            this.P = this.x2
        }
        if (this.v !== null) {
            this.A = this.v
        }
        this.pageX = 0;
        this.pageY = 0;
        this.M = 0;
        this.J = 0;
        this.Р = 0;
        this.j = 0;
        this.Ζ = 0;
        this.cos = 1;
        this.sin = 0
    },
    Αa: function (C) {
        if (this.disabled || !this.F || !this._ || this.j <= this.Ј) {
            return
        }
        var В = this._ * C;
        if (!В) {
            return
        }
        var v = this.j - this.Ј;
        if (v < В) {
            В = v
        }
        this.j -= В;
        this.P += this.cos * В;
        this.A += this.sin * В
    }
});
"use strict";
(function (exports, undefined) {
    var Н = exports.Best = exports.Best || {};
    var Ν = Н.aO = function (T) {
            for (var G in T) {
                this[G] = T[G]
            }
        };
    Ν.prototype = {
        constructor: Ν,
        id: null,
        mY: 60,
        Е: function () {
            var E = this;
            this.GΜ = function () {
                E.mP()
            };
            this.С = {
                now: 0,
                B: 0,
                step: Math.round(1000 / this.mY)
            };
            if (this.V) {
                this.V.apply(this, arguments)
            }
        },
        start: function () {
            this.С.now = Date.now();
            this.С.B = Date.now();
            this.paused = false;
            this.Β = true;
            if (this.Α) {
                this.Α()
            }
            this.mP()
        },
        pause: function () {
            this.paused = true;
            if (this.SЅ) {
                this.SЅ()
            }
        },
        Ε2: function () {
            this.paused = false;
            if (this.Νh) {
                this.Νh()
            }
        },
        stop: function () {
            this.Β = false;
            if (this.ΜА) {
                this.ΜА()
            }
        },
        mP: function () {
            var W = this.С.now = Date.now();
            var b = W - this.С.B;
            this.С.B = W;
            this.UU = setTimeout(this.GΜ, this.С.step);
            this.ΝC(b, W);
            if (!this.paused && b > 1) {
                this.update(b, W);
                this.ΧЕ(b, W)
            }
            if (!this.Β) {
                clearTimeout(this.UU)
            }
        },
        update: function (U, s) {
        },
        ΧЕ: function (u, Β) {
        },
        ΝC: function (Α, b) {
        },
        V: null,
        Α: null,
        SЅ: null,
        Νh: null,
        ΜА: null
    }
}(this));
var d = {
        М: false,
        G: false,
        Ι: 85,
        m: 20,
        _: 0,
        Ј: 1,
        Н: 0
    };

var a = {
        x: 200,
        y: 200,
        Xo: 0.2,
        size: 80,
        Ј$: 0,
        color: "red"
    };
var O;
var z;

var N = new Best.aO({
        mY: 60,
        width: 640,
        height: 480,
        Kb: "",
        V: function (В) {
            this.canvas = document.getElementById("canvas");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.RϹ = this.canvas.getContext("2d");
            this.Kb = В;
            this.ΑΚ = Ј("finger");
            if (window.G5) {
                this.Ε = Ј("player2")
            } else {
                this.Ε = Ј("player")
            }
            this.initEvent()
        },
        initEvent: function () {
            Τ()
        },
        Α: function () {
            if (window.eϜ) {
                X.loop = true;
                X.start(0)
            }
        },
        ΝC: function (І, Α) {
        },
        update: function (С, c) {
            if (z.Р > z.m) {
                var P = d.G ? (z.Р - z.m) / z.Ι : 1;
                var Р = a.Xo * С * P;
                var f = a.А = z.cos * Р;
                var Ϝ = z.sin * Р;
                a.x += f;
                a.y += Ϝ;
                a.Ј$ = z.Ζ;
                console.log(this.width - 50);
                a.x = Math.min(this.width - 50, Math.max(50, a.x));
                a.y = Math.min(this.height - 50, Math.max(50, a.y));
                z.Αa(С)
            }
        },
        ΧЕ: function (_, $) {
            var k = this.RϹ;
            k.clearRect(0, 0, this.width, this.height);
            if (this.g) {
                this.g(k, _)
            }
            var Ν = z.Z;
            k.globalAlpha = 0.05;
            k.fillStyle = "white";
            k.fillRect(Ν[0], Ν[1], Ν[0] + Ν[2], Ν[1] + Ν[3]);
            k.globalAlpha = 1;
            k.save();
            k.beginPath();
            k.fillStyle = a.color;
            k.translate(a.x, a.y);
            if (this.g) {
                if (a.А < 0) {
                    k.scale(-1, 1)
                }
                k.drawImage(this.Ε, -80, -60)
            } else {
                k.rotate(a.Ј$);
                k.drawImage(this.Ε, -60, -40)
            }
            k.restore();
            var А = z.P, U = z.A;
            if (z.F) {
                var G = z.pageX, Η = z.pageY;
                k.globalAlpha = 0.7;
                k.drawImage(this.ΑΚ, G - 30, Η - 15, 100, 128);
                k.globalAlpha = 1;
                if (z.Н > 0) {
                    k.fillStyle = "rgba(255,0,0,0.2)";
                    var S = z.Н;
                    if (G < S) {
                        k.fillRect(0, 0, S, this.height)
                    }
                    if (Η > this.height - S) {
                        k.fillRect(0, this.height - S, this.width, S)
                    }
                }
            }
            k.fillStyle = "rgba(0,0,0,0.5)";
            k.beginPath();
            k.arc(А, U, z.Ι, 0, Math.PI * 2);
            k.stroke();
            k.closePath();
            k.fillStyle = "rgba(0,0,0,0.2)";
            k.beginPath();
            k.arc(А + z.M, U + z.J, 35, 0, Math.PI * 2);
            k.fill();
            k.closePath();
            k.fillStyle = "rgba(255,100,100,0.4)";
            k.beginPath();
            k.arc(А, U, z.m, 0, Math.PI * 2);
            k.fill();
            k.closePath()
        }
    });

function Τ() {
    O = new Toucher.zС({
        В: Ј("canvas"),
        H: 1,
        vΝ: true
    });
    O.Е();
    z = new Toucher.СΧ({
        disabled: false,
        Z: [
            0,
            100,
            N.width / 2,
            N.height
        ],
        $: null,
        P: 150,
        A: N.height - 150,
        x2: 150,
        v: N.height - 150,
        m: d.m,
        Ι: d.Ι,
        М: d.М,
        _: d._,
        Ј: d.Ј,
        Н: d.Н
    });
    O.Ε_(z)
}
window.onresize = function () {
    Ј("toolbar").style.height = window.innerHeight + "px";
    N.width = window.innerWidth - 180;
    N.height = window.innerHeight;
    N.canvas.width = N.width;
    N.canvas.height = N.height;
    z.v = N.height - 150;
    z.A = z.v;
    z.Z = [
        0,
        100,
        N.width / 2,
        N.height
    ]
};
window.onload = function () {
    Ј("toolbar").style.width = 180 + "px";
    Ј("toolbar").style.height = window.innerHeight + "px";
    N.width = window.innerWidth - 180;
    N.height = window.innerHeight;
    N.Е();
    if (window.G5) {
        N.g = Ϲ;
        Ε(function () {
            N.start();
            L();
            I()
        })
    } else {
        N.start();
        I()
    }
};
function I() {
    var j = Ј("dynamic");
    var b = Ј("sensitive");
    var Z = Ј("maxMoveRadius");
    var W = Ј("maxMoveRadiusValue");
    var p = Ј("minMoveRadius");
    var Е = Ј("minMoveRadiusValue");
    var v = Ј("followSpeed");
    var Р = Ј("followSpeedValue");
    var Ο = Ј("followDistance");
    var f = Ј("followDistanceValue");
    var _ = Ј("warningEdge");
    var i = Ј("warningEdgeValue");
    j.checked = d.М;
    b.checked = d.G;
    Z.value = d.Ι;
    W.innerHTML = Z.value;
    p.value = d.m;
    Е.innerHTML = p.value;
    v.value = d._;
    Р.innerHTML = v.value;
    Ο.value = d.Ј;
    f.innerHTML = Ο.value;
    _.value = d.Н;
    i.innerHTML = _.value;
    j.onchange = function () {
        d.М = this.checked;
        z.М = this.checked;
        z.f()
    };
    b.onchange = function () {
        d.G = this.checked
    };
    Z.onchange = function () {
        d.Ι = this.value;
        W.innerHTML = this.value;
        z.Ι = this.value;
        z.f()
    };
    p.onchange = function () {
        d.m = this.value;
        Е.innerHTML = this.value;
        z.m = this.value;
        z.f()
    };
    v.onchange = function () {
        d._ = this.value;
        Р.innerHTML = this.value;
        z._ = this.value;
        z.f()
    };
    Ο.onchange = function () {
        d.Ј = this.value;
        f.innerHTML = this.value;
        z.Ј = this.value;
        z.f()
    };
    _.onchange = function () {
        d.Н = this.value;
        i.innerHTML = this.value;
        z.Н = this.value;
        z.f()
    }
}
function Ј(o) {
    return document.getElementById(o)
}
function Т(x, K) {
    return (K - x + 1) * Math.random() + x >> 0
}