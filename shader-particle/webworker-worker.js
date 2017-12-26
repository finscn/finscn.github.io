var particleCount = 0;
var workerArraySize = 0;
var width = 0;
var height = 0;
var workerArray = null;

self.onmessage = function(e) {
    if (!particleCount) {
        particleCount = e.data.particleCount;
        workerArraySize = e.data.workerArraySize;
        width = e.data.width;
        height = e.data.height;
    } else {
        workerArray = e.data;
    }
}


setInterval(function() {
    if (!workerArray) {
        return;
    }
    var gravity = 0.75;
    var index = 0;
    for (var i = 0;index+=5, i < particleCount; i++) {
        var posX = workerArray[index + 0];
        var posY = workerArray[index + 1];
        var velX = workerArray[index + 2];
        var velY = workerArray[index + 3];
        var rotation = workerArray[index + 4];

        posX += velX;
        posY += velY;

        velY += gravity;

        if (posY > height) {
            posY = height;
            velY *= -0.85;

            if (velY > -20.0) {
                velY = Math.random() * -32.0;
            }
        }

        if (posX > width) {
            posX = width;
            velX *= -1.0;
        } else if (posX < 0.0) {
            posX = 0.0;
            velX *= -1.0;
        }

        var r = rotation;
        r += 0.02;
        if (r > 3.1415926 * 2.0) {
            r = 0.0;
        }
        rotation = r;

        workerArray[index + 0] = posX;
        workerArray[index + 1] = posY;
        workerArray[index + 2] = velX;
        workerArray[index + 3] = velY;
        workerArray[index + 4] = rotation;
    }

    self.postMessage(workerArray, [workerArray.buffer]);
    workerArray = null;

}, 1000 / 60);
