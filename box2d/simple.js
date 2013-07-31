"use strict";

(function() {
    var canvas, context, pointer, drag, boxes, dropc = 0,
        objects = [],
        contacts = [],
        contactsI = 0,
        numIterations, kTimeStep, kGravity, kFriction, mostSeparated = [0, 0, 0, 0, 0],
        mostPenetrating = [0, 0, 0, 0, 0];

    function randomInt(min, max) {
        return Math.floor((max - min + 1) * Math.random()) + min;
    }

    function createRandomPoly(n, w, h, x, y, inverseMass, angle, angularVel) {

        n = n || 4;
        h = h || w;
        var radius = w / 2;
        var scaleX = scaleX || 1;
        var scaleY = scaleY || scaleX * h / w;

        var skew = Math.PI / 10;

        var skewX = w > h ? Math.tan(skew) : 0;
        var skewY = h > w ? Math.tan(skew) : 0;

        var vertices = [];
        var perAng = Math.PI * 2 / n;
        var fix = perAng * 100 >> 2;
        for (var i = 0; i < n; i++) {
            var ang = perAng * i + randomInt(-fix, fix) / 100;
            var _x = radius * Math.cos(ang);
            var _y = radius * Math.sin(ang);

            var px = _x * scaleX + _y * scaleY * skewX;
            var py = _y * scaleY + _x * scaleX * skewY;
            vertices.push([px, py]);
        }
        var poly = new Polygon({
            vertices: vertices,
            x: x || 0,
            y: y || 0,
            w: w || 0,
            h: h || 0,
            inverseMass: inverseMass || 0,
            angularVel: angularVel || angularVel === 0 ? angularVel : randomInt(-0.1, 0.1),
            angle: angle || angle === 0 ? angle : randomInt(-314, 314) / 400
        })
        return poly;
    }

    var Polygon = function(cfg) {

            for (var key in cfg) {
                this[key] = cfg[key];
            }
            this.init();
        }

    Polygon.prototype = {
        constructor: Polygon,

        vertices: null,
        x: 0,
        y: 0,
        inverseMass: 0,
        angularVel: 0,
        angle: 0,

    }
    Polygon.prototype.init = function() {

        var inverseMass = this.inverseMass;
        var w = this.w;
        var h = this.h;
        this.pos = [this.x, this.y];
        this.vel = this.vel || [0, 0];
        this.matrix = [0, 0, 0, 0, 0, 0];
        this.AABB = [0, 0, 0, 0, 0, 0];
        this.localSpacePoints = this.vertices;


        this.localSpaceNormals = [];
        this.vCount = this.localSpacePoints.length;
        for (var i = 0; i < this.vCount; i++) {
            var a = this.localSpacePoints[i];
            var b = this.localSpacePoints[(i + 1) % this.vCount];
            var x = b[0] - a[0];
            var y = b[1] - a[1];
            var len = Math.sqrt(x * x + y * y);
            this.localSpaceNormals[i] = [y / len, -x / len];
        }
        this.worldSpaceNormals = [];
        this.worldSpacePoints = [];
        for (var i = 0; i < this.vCount; i++) {
            this.worldSpaceNormals[i] = [0, 0];
            this.worldSpacePoints[i] = [0, 0];
        }
        this.inverseInertia = (inverseMass > 0) ? 1 / ((1 / inverseMass) * (w * w + h * h) / 6) : 0
        this.c0 = [0, 0];
        this.c1 = [0, 0];
    }
    Polygon.prototype.featurePairJudgement = function(that, fpc) {
        var closest, closestI, closestD, wsN, v, d, dx, dy, lsp, wsp, mfp0, mfp1, dist, centreDist;
        for (var edge = 0; edge < this.vCount; edge++) {
            wsN = this.worldSpaceNormals[edge];
            dx = -wsN[0];
            dy = -wsN[1];
            v = [
            dx * that.matrix[0] + dy * that.matrix[1], dx * that.matrix[2] + dy * that.matrix[3]];
            closestI = -1;
            closestD = -1E6;
            for (var i = 0; i < that.vCount; i++) {
                lsp = that.localSpacePoints[i];
                d = v[0] * lsp[0] + v[1] * lsp[1];
                if (d > closestD) {
                    closestD = d;
                    closestI = i;
                }
            }
            closest = that.worldSpacePoints[closestI];
            wsp = this.worldSpacePoints[edge];
            mfp0 = [closest[0] - wsp[0], closest[1] - wsp[1]];
            wsp = this.worldSpacePoints[(edge + 1) % this.vCount];
            mfp1 = [closest[0] - wsp[0], closest[1] - wsp[1]];
            dist = mfp0[0] * wsN[0] + mfp0[1] * wsN[1];
            dx = closest[0] - this.pos[0];
            dx = closest[1] - this.pos[1];
            centreDist = dx * dx + dy * dy;;
            if (dist > 0) {
                this.projectPointOntoEdge([0, 0], mfp0, mfp1, 0);
                dist = this.c0[0] * this.c0[0] + this.c0[1] * this.c0[1];
                if (dist < mostSeparated[0]) {
                    mostSeparated = [dist, closestI, edge, fpc, centreDist];
                } else if (dist == mostSeparated[0] && fpc == mostSeparated[3]) {
                    if (centreDist < mostSeparated[4]) {
                        mostSeparated = [dist, closestI, edge, fpc, centreDist];
                    }
                }
            } else {
                if (dist > mostPenetrating[0]) {
                    mostPenetrating = [dist, closestI, edge, fpc, centreDist];
                } else if (dist == mostPenetrating[0] && fpc == mostPenetrating[3]) {
                    if (centreDist < mostPenetrating[4]) {
                        mostPenetrating = [dist, closestI, edge, fpc, centreDist];
                    }
                }
            }
        }
    }
    Polygon.prototype.projectPointOntoEdge = function(p, e0, e1, flag) {

        var v = [p[0] - e0[0], p[1] - e0[1]];

        var e = [e1[0] - e0[0], e1[1] - e0[1]];
        var t = (e[0] * v[0] + e[1] * v[1]) / (e[0] * e[0] + e[1] * e[1]);
        if (t < 0) {
            t = 0;
        } else if (t > 1) {
            t = 1;
        }
        if (flag) {
            this.c1 = [e0[0] + e[0] * t, e0[1] + e[1] * t];
        } else {
            this.c0 = [e0[0] + e[0] * t, e0[1] + e[1] * t];
        }
    }
    var Contact = function() {
            this.a = {};
            this.b = {};
            this.normal = [0, 0];
            this.ra = [0, 0];
            this.rb = [0, 0];
            this.dist = 0;
            this.impulseNormal = 0;
            this.impulseTangent = 0;
            this.invDenom = 0;
            this.invDenomTangent = 0;
        }
    Contact.prototype.set = function(A, B, wsN, flag) {
        var pa, pb;
        this.a = A;
        this.b = B;
        this.normal = wsN;
        if (flag) {
            pa = A.c1;
            pb = B.c1;
        } else {
            pa = A.c0;
            pb = B.c0;
        }
        this.dist = (pb[0] - pa[0]) * wsN[0] + (pb[1] - pa[1]) * wsN[1];
        this.impulseNormal = 0;
        this.impulseTangent = 0;
        this.ra = [-(pa[1] - A.pos[1]), pa[0] - A.pos[0]];
        this.rb = [-(pb[1] - B.pos[1]), pb[0] - B.pos[0]];
        var ran = this.ra[0] * wsN[0] + this.ra[1] * wsN[1];
        var rbn = this.rb[0] * wsN[0] + this.rb[1] * wsN[1];
        this.invDenom = 1 / (A.inverseMass + B.inverseMass + (ran * ran * A.inverseInertia) + (rbn * rbn * B.inverseInertia));

        ran = this.ra[0] * -wsN[1] + this.ra[1] * wsN[0];
        rbn = this.rb[0] * -wsN[1] + this.rb[1] * wsN[0];
        this.invDenomTangent = 1 / (A.inverseMass + B.inverseMass + (ran * ran * A.inverseInertia) + (rbn * rbn * B.inverseInertia));
    }
    var updateVerticesAndAABB = function() {
            for (var i = 0, rb; rb = objects[i++];) {
                var x, min = [1E6, 1E6],
                    max = [-1E6, -1E6],
                    m0 = rb.matrix;
                for (var j = 0; j < rb.vCount; j++) {
                    var lp = rb.localSpacePoints[j],
                        ln = rb.localSpaceNormals[j];
                    for (var u = 0; u < 2; u++) {
                        x = (m0[u] * lp[0]) + (m0[2 + u] * lp[1]) + m0[4 + u];
                        rb.worldSpacePoints[j][u] = x;
                        if (x < min[u]) {
                            min[u] = x;
                        }
                        if (x > max[u]) {
                            max[u] = x;
                        }
                        x = (m0[u] * ln[0]) + (m0[2 + u] * ln[1]);
                        rb.worldSpaceNormals[j][u] = x;
                    }
                }
                rb.AABB = [(min[0] + max[0]) * 0.5, (min[1] + max[1]) * 0.5, (max[0] - min[0]) * 0.5, (max[1] - min[1]) * 0.5];
            }
        }
    var updateMatrix = function() {
            for (var i = 0, rb; rb = objects[i++];) {
                if (rb.drag) {
                    rb.vel[0] = (pointer.X - rb.pos[0]) * 10;
                    rb.vel[1] = (pointer.Y - rb.pos[1]) * 10;
                } else {
                    rb.vel[0] *= 0.98;
                    if (rb.inverseMass > 0) {
                        rb.vel[1] += kGravity;
                    }
                }
                rb.pos = [rb.pos[0] + rb.vel[0] * kTimeStep, rb.pos[1] + rb.vel[1] * kTimeStep];
                rb.angle += rb.angularVel * kTimeStep;
                var c = Math.cos(rb.angle),
                    s = Math.sin(rb.angle);
                rb.matrix = [
                c, s, -s, c, rb.pos[0], rb.pos[1]];
            }
        }
    var collide = function() {
            var face, vertex, fp, vertexRect, faceRect, wsN, worldV0, worldV1, wsV0, wsV1, va, vb, vc, na, nc, len, f;
            contactsI = 0;
            for (var i = 0, l = objects.length; i < l - 1; i++) {
                var A = objects[i];
                for (var j = i + 1; j < l; j++) {
                    var B = objects[j];
                    if (A.inverseMass != 0 || B.inverseMass != 0) {
                        var AMB = A.AABB,
                            BMB = B.AABB;
                        if (Math.abs(BMB[0] - AMB[0]) - (AMB[2] + BMB[2]) < 0 && Math.abs(BMB[1] - AMB[1]) - (AMB[3] + BMB[3]) < 0) {
                            mostSeparated = [1E9, -1, -1, 0, 1E9];
                            mostPenetrating = [-1E9, -1, -1, 0, 1E9];
                            A.featurePairJudgement(B, 2);
                            B.featurePairJudgement(A, 1);
                            if (mostSeparated[0] > 0 && mostSeparated[3] != 0) {
                                vertex = mostSeparated[1];
                                face = mostSeparated[2];
                                fp = mostSeparated[3];
                            } else if (mostPenetrating[0] <= 0) {
                                vertex = mostPenetrating[1];
                                face = mostPenetrating[2];
                                fp = mostPenetrating[3];
                            }
                            if (fp == 1) {
                                vertexRect = A;
                                faceRect = B;
                            } else {
                                vertexRect = B;
                                faceRect = A;
                            }
                            f = faceRect.worldSpaceNormals[face];
                            wsN = [f[0], f[1]];
                            va = vertexRect.worldSpacePoints[(vertex - 1 + vertexRect.vCount) % vertexRect.vCount];
                            vb = vertexRect.worldSpacePoints[vertex];
                            vc = vertexRect.worldSpacePoints[(vertex + 1) % vertexRect.vCount];
                            na = [-(vb[1] - va[1]), vb[0] - va[0]];
                            len = Math.sqrt(na[0] * na[0] + na[1] * na[1]);
                            na[0] /= len;
                            na[1] /= len;

                            nc = [-(vc[1] - vb[1]), vc[0] - vb[0]];
                            len = Math.sqrt(nc[0] * nc[0] + nc[1] * nc[1]);
                            nc[0] /= len;
                            nc[1] /= len;

                            if (na[0] * wsN[0] + na[1] * wsN[1] < nc[0] * wsN[0] + nc[1] * wsN[1]) {
                                worldV0 = va;
                                worldV1 = vb;
                            } else {
                                worldV0 = vb;
                                worldV1 = vc;
                            }
                            wsV0 = faceRect.worldSpacePoints[face];
                            wsV1 = faceRect.worldSpacePoints[(face + 1) % faceRect.vCount];
                            if (fp === 1) {
                                A.projectPointOntoEdge(wsV0, worldV0, worldV1, 0);
                                A.projectPointOntoEdge(wsV1, worldV0, worldV1, 1);
                                B.projectPointOntoEdge(worldV1, wsV0, wsV1, 0);
                                B.projectPointOntoEdge(worldV0, wsV0, wsV1, 1);
                                wsN[0] = -wsN[0];
                                wsN[1] = -wsN[1];
                            } else {
                                A.projectPointOntoEdge(worldV1, wsV0, wsV1, 0);
                                A.projectPointOntoEdge(worldV0, wsV0, wsV1, 1);
                                B.projectPointOntoEdge(wsV0, worldV0, worldV1, 0);
                                B.projectPointOntoEdge(wsV1, worldV0, worldV1, 1);
                            }
                            if (!contacts[contactsI]) {
                                contacts[contactsI] = new Contact();
                            }
                            contacts[contactsI++].set(A, B, wsN, 0);
                            if (!contacts[contactsI]) {
                                contacts[contactsI] = new Contact();
                            }
                            contacts[contactsI++].set(A, B, wsN, 1);
                        }
                    }
                }
            }
        }
        

   var solve = function() {
        for (var j = 0; j < numIterations; j++) {
            for (var i = 0; i < contactsI; i++) {
                var con = contacts[i],
                    a = con.a,
                    b = con.b,
                    ra = con.ra,
                    rb = con.rb,
                    normal = con.normal;
                var dv = [(b.vel[0] + rb[0] * b.angularVel) - (a.vel[0] + ra[0] * a.angularVel), 
                        (b.vel[1] + rb[1] * b.angularVel) - (a.vel[1] + ra[1] * a.angularVel)];
                var relNv=dv[0] * normal[0] + dv[1] * normal[1];
                var remove = relNv + con.dist / kTimeStep;
                if (remove < 0) {
                    var imp = remove * con.invDenom;
                    var newImpulse = Math.min(imp + con.impulseNormal, 0);
                    var change = newImpulse - con.impulseNormal;
                    con.impulseNormal = newImpulse;
                    var x = normal[0] * change,
                        y = normal[1] * change;
                    a.vel[0] += (x * a.inverseMass);
                    a.vel[1] += (y * a.inverseMass);
                    b.vel[0] -= (x * b.inverseMass);
                    b.vel[1] -= (y * b.inverseMass);

                    a.angularVel += (x * ra[0] + y * ra[1]) * a.inverseInertia;
                    b.angularVel -= (x * rb[0] + y * rb[1]) * b.inverseInertia;

                    var absImp = Math.abs(con.impulseNormal) * kFriction;
                    var tangentVel = dv[0] * -normal[1] + dv[1] * normal[0];
                    newImpulse = Math.min(Math.max(tangentVel * con.invDenomTangent + con.impulseTangent, -absImp), absImp);
                    var change = newImpulse - con.impulseTangent;
                    con.impulseTangent = newImpulse;
                    var x = -normal[1] * change, 
                        y = normal[0] * change;
                        
                    a.vel[0] += (x * a.inverseMass);
                    a.vel[1] += (y * a.inverseMass);
                    b.vel[0] -= (x * b.inverseMass);
                    b.vel[1] -= (y * b.inverseMass);
                    a.angularVel += (x * ra[0] + y * ra[1]) * a.inverseInertia;
                    b.angularVel -= (x * rb[0] + y * rb[1]) * b.inverseInertia;
                }
            }
        }
    }
   var draw = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0, rb; rb = objects[i++];) {
            context.beginPath();
            context.strokeStyle = "red";
            var a = rb.worldSpacePoints[0];
            var first = a;
            context.moveTo(a[0], a[1]);
            for (var j = 1; j < rb.vCount; j++) {
                var a = rb.worldSpacePoints[j];
                context.lineTo(a[0], a[1]);
            }
            context.lineTo(first[0], first[1]);
            context.stroke()
            context.closePath();
        }
    }

   var drop = function() {
        for (var i = 0; i < 10; i++) {
            dropc++;
            setTimeout(function() {
                dropc--;
                var x = 128 + (Math.random() * (canvas.width - 256)),
                    y = -Math.random() * 1000;
                if (!x) {
                    var x = pointer.X,
                        y = 0;
                }
                objects.push(createRandomPoly(randomInt(4,8), 60, 60, x, y, 60 * 60));

            }, i * 600);
        }
    }


   var init = function() {
        canvas = document.getElementById("canvas");
        canvas.width = 960;
        canvas.height = 640;
        context = canvas.getContext("2d");

        numIterations = 8;
        kTimeStep = 1 / 60;
        kGravity = 7;
        kFriction = 0.3;

        createDefaultPoly();

        run();
    }

   var createDefaultPoly = function() {

        objects.push(createRandomPoly(5, 400, 100, canvas.width * 0.2, canvas.height * 0.5, 0, 0.5));
        objects.push(createRandomPoly(5, 400, 100, canvas.width * 0.8, canvas.height * 0.5, 0, 0.5));
        
        objects.push(createRandomPoly(5, 800, 100, canvas.width * 0.5, canvas.height * 1, 0, 0,0,0));

    }

   var run = function() {
        setTimeout(run, 16);

        for (var i = 0, rb; rb = objects[i++];) {
            if (rb.pos[1] > canvas.height) {
                i--;
                objects.splice(i, 1);
            }
        }
        if (objects.length < 80 - dropc) {
            drop();
        }

        updateMatrix();
        updateVerticesAndAABB();
        draw();

        collide();
        solve();


    }
   window.init = init;
   })();