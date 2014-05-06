function $id(id) {
    return document.getElementById(id);
}

function getBaseName(file) {
    var name = file.substring(file.lastIndexOf("/") + 1);
    name = name.substring(0, name.lastIndexOf("."));
    // console.log(name)
    return name;
}

function loadImage(srcList, callback) {
    var imgs = {};
    var totalCount = srcList.length;
    var loadedCount = 0;
    for (var i = 0; i < totalCount; i++) {
        var img = srcList[i];
        var image = imgs[img.id] = new Image();
        image.src = img.src;
        image.onload = function(event) {
            loadedCount++;
        }
    }
    if (typeof callback == "function") {

        function check() {
            if (loadedCount >= totalCount) {
                if (callback) {
                    callback(imgs, srcList);
                }
            } else {
                setTimeout(check, 100);
            }
        }
        check();
    }
    return imgs;
}




function loadFile(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            callback(xmlhttp.responseText)
        }
    }
    xmlhttp.send(null);
}

function createFrames(anim, width, height, ox, oy, scale) {
    scale = scale || 0.5;
    var frames = [];
    var frameCount = anim.frameCount;
    for (var i = 0; i < frameCount; i++) {
        anim.setFrame(i);
        var frame = anim.currentFrame;
        var time = frame.time;
        var endTime = frame.endTime;
        var ctx = Utils.createCanvasContext(width, height);
        ctx.translate(ox, oy);
        ctx.scale(scale, scale);
        anim.x = 0;
        anim.y = 0;
        anim.render(ctx);
        var img = Utils.trimImage(ctx.canvas, borderSpace);
        frames.push({
            img: img,
            offsetX: img.sourceX,
            offsetY: img.sourceY,
            w: img.width,
            h: img.height,
            time: time,
            endTime: endTime
        })
        // document.body.appendChild(img);
    }
    anim.setFrame(0);
    return frames;
}

var Utils = {
    createCanvasContext: function(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.retinaResolutionEnabled = false;
        var context = canvas.getContext("2d");
        return context;
    },

    trimImage: function(img, borderSpace) {
        borderSpace = borderSpace || borderSpace === 0 ? borderSpace : 2;
        var canvasTemp = document.createElement("canvas");
        var width = canvasTemp.width = img.width;
        var height = canvasTemp.height = img.height;
        var ctx = canvasTemp.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, width, height);
        var pixels = imageData.data;

        var top = -1,
            bottom = -1;
        var left = -1,
            right = -1;
        var ineverseOffset = (height - 1) * width;
        for (var y = 0; y < height; y++) {
            var offset = y * width;
            for (var x = 0; x < width; x++) {
                var p1 = offset + x,
                    p2 = ineverseOffset - offset + x;
                if (top < 0 && pixels[p1 * 4 + 3] !== 0) {
                    top = y;
                }
                if (bottom < 0 && pixels[p2 * 4 + 3] !== 0) {
                    bottom = height - 1 - y;
                }
                if (top >= 0 && bottom >= 0) {
                    break;
                }
            }
        }
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var p3 = y * width + x,
                    p4 = p3 - x + (width - x - 1);
                if (left < 0 && pixels[p3 * 4 + 3] !== 0) {
                    left = x;
                }
                if (right < 0 && pixels[p4 * 4 + 3] !== 0) {
                    right = width - x - 1;
                }
                if (left >= 0 && right >= 0) {
                    break;
                }
            }
        }

        var canvas = document.createElement("canvas");
        canvas.width = right - left + 1 + borderSpace * 2;
        canvas.height = bottom - top + 1 + borderSpace * 2;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(canvasTemp, -left + borderSpace, -top + borderSpace);
        canvas.sourceX = left + borderSpace;
        canvas.sourceY = top + borderSpace;
        // document.body.appendChild(canvas);
        return canvas;
    },

    packImages: function(imgInfoList, width, height, packedIndex) {
        packedIndex = packedIndex || 0;
        var maxWidth = width || 1024;
        var maxHeight = height || 1024;
        imgInfoList.forEach(function(info) {
            // delete info.fit;
            if (info.w > maxWidth) {
                maxWidth = info.w;
            }
            if (info.h > maxHeight) {
                maxHeight = info.h;
            }
        });

        imgInfoList.sort(function(a, b) {
            // return Math.max(b.w,b.h) - Math.max(a.w,a.h);
            return b.h - a.h;
            // return b.w - a.w;
        });

        var packInfo;
        var packInfoH = Utils.computePackInfo(imgInfoList, maxWidth, maxHeight);
        if (packInfoH[1]) {
            imgInfoList.sort(function(a, b) {
                return b.w - a.w;
                // return Math.max(b.w,b.h) - Math.max(a.w,a.h);
                // return b.h - a.h;
            });
            packInfoW = Utils.computePackInfo(imgInfoList, maxWidth, maxHeight);
            if (packInfoW[1] && packInfoH[1].length < packInfoW[1].length) {
                packInfo = packInfoH;
            } else {
                packInfo = packInfoW;
            }
        } else {
            packInfo = packInfoH;
        }
        var packed = packInfo[0];
        var canvas = document.createElement("canvas");
        canvas.id = "img_" + packedIndex;
        canvas.width = packInfo[2];
        canvas.height = packInfo[3];
        var ctx = canvas.getContext("2d");
        packed.forEach(function(info) {
            ctx.drawImage(info.img, info.x, info.y);
            var owner = info.owner;
            if (owner) {
                owner.img = canvas;
                owner.imgId = canvas.id;
                owner.ix = info.x;
                owner.iy = info.y;
                owner.iw = info.w;
                owner.ih = info.h;
            }
            info.img = canvas;
            info.imgId = canvas.id;
            info.ix = info.x;
            info.iy = info.y;
            info.iw = info.w;
            info.ih = info.h;
            info.x = 0;
            info.y = 0;
            info.origX = originalX - (info.offsetX - 2 * borderSpace);
            info.origY = originalY - (info.offsetY - 2 * borderSpace);
            delete info.offsetX;
            delete info.offsetY;
            delete info.fit;
            delete info.owner;
        });

        console.log("canvas: ", canvas.id, canvas.width, canvas.height);
        $id("sheet").appendChild(canvas);

        var unpacked = packInfo[1];
        if (unpacked) {
            Utils.packImages(unpacked, width, height, packedIndex + 1);
        }
        return;
        // return [width, height];
    },

    computePackInfo: function(imgInfoList, width, height) {
        var out = false;
        for (var n = 0; n < imgInfoList.length; n++) {
            var f = imgInfoList[n];
            delete f.fit;
        }
        var packer = new GrowingPacker(width, height);
        // var packer = new Packer(width, height);
        packer.fit(imgInfoList);

        var packed = [];
        var unpacked = [];
        for (var n = 0; n < imgInfoList.length; n++) {
            var f = imgInfoList[n];
            if (f.fit) {
                f.x = f.fit.x;
                f.y = f.fit.y;
                packed.push(f);
            } else {
                unpacked.push(f);
            }
        }
        return [packed, unpacked.length > 0 ? unpacked : null, packer.root.w, packer.root.h];
    },

};
