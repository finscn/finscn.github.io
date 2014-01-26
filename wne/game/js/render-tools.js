var DEFAULT_COLOR = "#ff6600";

function drawBody(context, body, color,scale) {
    color = color || DEFAULT_COLOR;
    var _color = body.sleeping ? "#ff6666" : color;
    if (body.shapes) {
        drawComp(context, body, _color,scale)
    } else {
        if (body.centre) {
            drawCircle(context, body, _color,scale)
        } else {
            drawPoly(context, body, _color,scale);
        }
    }
}

function drawBodies(context, bodies, color) {
    // color = color || DEFAULT_COLOR;
    // var oa = context.globalAlpha;
    for (var i = 0, len = bodies.length; i < len; i++) {
        var body = bodies[i];
        // var _color = body.sleeping ? "#e3e3e3" : color;
        // var alpha = ("alpha" in body) ? (body.alpha || 0) : 1;
        // context.globalAlpha = alpha;
        drawBody(context, body, color);
    }
    // context.globalAlpha = oa || 1;

}

function drawComp(context, comp, color) {
    comp.shapes.forEach(function(p) {
        if (p.centre) {
            drawCircle(context, p, color)
        } else {
            drawPoly(context, p, color);
        }
    });
    drawPoint(context, comp.x, comp.y, color)
}

function drawPoly(context, poly, color, scale) {

    scale=scale||Config.renderScale;
    var drawNormal = false;

    context.strokeStyle = color || DEFAULT_COLOR;
    context.fillStyle = color || DEFAULT_COLOR;
    if (!poly.vertices) {
        return;
    }
    var a = poly.vertices[0];
    var first = a;
    context.beginPath();
    context.moveTo(a[0] * scale, a[1] * scale);
    for (var j = 1; j < poly.vertexCount; j++) {
        var a = poly.vertices[j];
        context.lineTo(a[0] * scale, a[1] * scale);
        // console.log(a[0] * scale, a[1] * scale)
        if (drawNormal) {
            var n = poly.normals[j];
            var _v0 = a[0] * scale,
                _v1 = a[1] * scale;
            context.moveTo(_v0, _v1);
            context.lineTo(_v0 + n[0] * 50, _v1 + n[1] * 50);
            context.moveTo(_v0, _v1);
        }
    }
    context.lineTo(first[0] * scale, first[1] * scale);

    if (drawNormal) {
        var n = poly.normals[0];
        var _v0 = first[0] * scale,
            _v1 = first[1] * scale;
        context.moveTo(_v0, _v1);
        context.lineTo(_v0 + n[0] * 50, _v1 + n[1] * 50);
    }

    context.stroke()
    context.closePath();

    context.strokeRect(poly.x * scale - 2, poly.y * scale - 2, 4, 4)

}



function drawPoint(context, x, y, color) {
    if (Array.isArray(x)) {
        color = y;
        y = x[1]
        x = x[0]
    }
    context.strokeStyle = color || DEFAULT_COLOR;
    context.strokeRect(x * Config.renderScale - 2, y * Config.renderScale - 2, 4, 4);
}

function drawCircle(context, circle, color) {
    context.strokeStyle = color || DEFAULT_COLOR;
    context.fillStyle = color || DEFAULT_COLOR;

    var r = circle.radius * Config.renderScale;
    var x = circle.x;
    var y = circle.y;

    var c = circle.centre;

    // in the context.arc path , if draw other things will trigger one chrome's bug.
    context.beginPath();
    context.arc(c[0] * Config.renderScale, c[1] * Config.renderScale, r, 0, Math.PI * 2, false);
    context.stroke()
    // context.fill();
    context.closePath();
    // console.log(circle.cos,circle.sin)
    // drawLine(context, x, y, x + circle.radius * circle.cos, y + circle.radius * circle.sin, color);
    drawLine(context, c[0], c[1], c[0] + circle.radius * circle.cos, c[1] + circle.radius * circle.sin, color);
    context.fillRect(c[0] * Config.renderScale - 3, c[1] * Config.renderScale - 3, 6, 6)
    context.strokeRect(x * Config.renderScale - 1, y * Config.renderScale - 1, 2, 2)

}

function drawLine(context, x1, y1, x2, y2, color) {
    context.strokeStyle = color || DEFAULT_COLOR;
    context.beginPath();
    context.moveTo(x1 * Config.renderScale, y1 * Config.renderScale);
    context.lineTo(x2 * Config.renderScale, y2 * Config.renderScale);
    context.stroke();
    context.closePath();
}


function drawArbiter(context, collideManager) {
    var colors = ["#66ff66", "#ff66ff", "#6666ff"];
    var colors = ["#33ff66"];

    var arbiters = collideManager.arbiters;
    var arbiterCount = collideManager.arbiterCount;

    for (var i = 0; i < arbiterCount; i++) {
        var arbiter = arbiters[i];
        var contacts = arbiter.contacts;
        context.strokeStyle = colors[i % 3];
        for (var k = 0; k < contacts.length; k++) {
            var contact = contacts[k];
            var p1 = contact.contactOnA,
                p2 = contact.contactOnB;
            context.strokeRect(p1[0] * Config.renderScale - 2, p1[1] * Config.renderScale - 2, 4, 4);
            context.strokeRect(p2[0] * Config.renderScale - 2, p2[1] * Config.renderScale - 2, 4, 4);
        }

    }
}