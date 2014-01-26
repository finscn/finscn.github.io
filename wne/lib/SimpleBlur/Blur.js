"use strict";

/*

var blur= new Blur({
    radius: 20,
    gaussian : true,
});
blur.init();

var img =  [ a  Image or Canvas ]
var blurImg = blur.blurRGBA(img, null, true);

*/

(function(exports) {

    var Blur = exports.Blur = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.init();
    };


    var proto = {

        constructor: Blur,

        radius: 1,
        gaussian: false,
        matrix: null,

        init: function() {
            this.setRadius(this.radius);
        },

        setRadius: function(radius) {
            this.radius = Math.ceil(radius || 1);
            if (this.gaussian) {
                this.matrix = this.makeMatrix(this.radius);
            }
        },

        useGaussian: function() {
            this.gaussian = true;
            this.setRadius(this.radius);
        },

        useStack: function() {
            this.gaussian = false;
            this.matrix = null;
        },

        makeMatrix: function(radius) {
            var r = Math.ceil(radius);
            var rows = r * 2 + 1;
            var matrix = [];
            var sigma = radius / 3;
            var sigma22 = 2 * sigma * sigma;
            var sigmaPi2 = 2 * Math.PI * sigma;
            var sqrtSigmaPi2 = Math.sqrt(sigmaPi2);
            var radius2 = radius * radius;
            var total = 0;
            var index = 0;
            for (var row = -r; row <= r; row++) {
                var distance = row * row;
                if (distance > radius2)
                    matrix[index] = 0;
                else
                    matrix[index] = Math.exp(-(distance) / sigma22) / sqrtSigmaPi2;
                total += matrix[index];
                index++;
            }
            for (var i = 0; i < rows; i++) {
                matrix[i] /= total;
            }

            return matrix;
        },


        doGaussian: function(pixels, width, height, outPixels) {
            outPixels = outPixels || pixels;
            var radius = this.radius;
            var matrix = this.matrix;
            var buff = [];
            var idx = 0;
            var k;
            for (var y = 0; y < height; y++) {
                var offset = y * width;
                for (var x = 0; x < width; x++, idx += 4) {
                    var r = 0,
                        g = 0,
                        b = 0,
                        a = 0;
                    for (var n = 0, i = -radius; i <= radius; ++i, ++n) {

                        var ix = x + i;
                        if (ix < 0) {
                            ix = 0;
                        } else if (ix >= width) {
                            ix = width - 1;
                        }

                        var f = matrix[n];
                        var idxF = (offset + ix) << 2;
                        var alpha = pixels[idxF + 3];
                        k = alpha / 255;
                        r += pixels[idxF] * f * k;
                        g += pixels[idxF + 1] * f * k;
                        b += pixels[idxF + 2] * f * k;
                        a += alpha * f;
                    }
                    if (a == 0) {
                        k = 0
                    } else {
                        k = 255 / a;
                    }
                    buff[idx] = r * k;
                    buff[idx + 1] = g * k;
                    buff[idx + 2] = b * k;
                    buff[idx + 3] = a;
                }
            }


            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var idx = (y * width + x) << 2;
                    var r = 0,
                        g = 0,
                        b = 0,
                        a = 0;
                    for (var n = 0, i = -radius; i <= radius; ++i, ++n) {
                        var iy = y + i;
                        if (iy < 0) {
                            iy = 0;
                        } else if (iy >= height) {
                            iy = height - 1;
                        }
                        var f = matrix[n];
                        var idxF = (iy * width + x) << 2;
                        var alpha = buff[idxF + 3];
                        k = alpha / 255;
                        r += buff[idxF] * f * k;
                        g += buff[idxF + 1] * f * k;
                        b += buff[idxF + 2] * f * k;
                        a += alpha * f;
                    }
                    if (a == 0) {
                        outPixels[idx] = outPixels[idx + 1] = outPixels[idx + 2] = outPixels[idx + 3] = 0;
                    } else {
                        k = 255 / a;
                        outPixels[idx] = this.clamp(r * k);
                        outPixels[idx + 1] = this.clamp(g * k);
                        outPixels[idx + 2] = this.clamp(b * k);
                        outPixels[idx + 3] = this.clamp(a);
                    }
                }
            }
        },

        doStack: function(pixels, width, height) {
            var radius = this.radius;

            var i, p, np, r_sum, g_sum, b_sum, a_sum,
                r_out_sum, g_out_sum, b_out_sum, a_out_sum,
                r_in_sum, g_in_sum, b_in_sum, a_in_sum,
                pr, pg, pb, pa, rbs;

            var mul_sum = Blur.mul_table[radius],
                shg_sum = Blur.shg_table[radius];


            var widthMinus1 = width - 1,
                heightMinus1 = height - 1,
                radiusPlus1 = radius + 1,
                sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2,
                div = radius + radius + 1,
                w4 = width << 2;
            var stackStart = Blur.newBlurStack(),
                stackEnd = null,
                stackIn = null,
                stackOut = null,
                stack = stackStart;

            for (i = 1; i < div; i++) {
                stack = stack.next = Blur.newBlurStack();
                if (i == radiusPlus1) {
                    stackEnd = stack;
                }
            }
            stack.next = stackStart;

            var k;
            var pix1, count1, pix2, count2;
            var isH = true;
            count1 = height;
            count2 = width;
            while (true) {
                var jump = 0;
                var pxIdx = 0;
                for (pix1 = 0; pix1 < count1;) {

                    r_sum = g_sum = b_sum = a_sum = 0;
                    r_in_sum = g_in_sum = b_in_sum = a_in_sum = 0;

                    pa = pixels[pxIdx + 3];
                    k = pa / 255;
                    pr = pixels[pxIdx] * k;
                    pg = pixels[pxIdx + 1] * k;
                    pb = pixels[pxIdx + 2] * k;

                    r_out_sum = radiusPlus1 * pr
                    g_out_sum = radiusPlus1 * pg
                    b_out_sum = radiusPlus1 * pb
                    a_out_sum = radiusPlus1 * pa

                    r_sum += sumFactor * pr;
                    g_sum += sumFactor * pg;
                    b_sum += sumFactor * pb;
                    a_sum += sumFactor * pa;

                    stack = stackStart;
                    for (i = 0; i < radiusPlus1; i++) {
                        stack.r = pr;
                        stack.g = pg;
                        stack.b = pb;
                        stack.a = pa;
                        stack = stack.next;
                    }

                    for (i = 1; i < radiusPlus1; i++) {
                        if (isH) {
                            p = pxIdx + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                        } else {
                            if (i < heightMinus1) {
                                jump += width;
                            }
                            p = pxIdx + jump << 2;
                        }

                        pa = pixels[p + 3];
                        k = pa / 255;
                        pr = pixels[p] * k;
                        pg = pixels[p + 1] * k;
                        pb = pixels[p + 2] * k;

                        rbs = radiusPlus1 - i;
                        r_sum += (stack.r = pr) * rbs;
                        g_sum += (stack.g = pg) * rbs;
                        b_sum += (stack.b = pb) * rbs;
                        a_sum += (stack.a = pa) * rbs;

                        r_in_sum += pr;
                        g_in_sum += pg;
                        b_in_sum += pb;
                        a_in_sum += pa;

                        stack = stack.next;

                    }

                    stackIn = stackStart;
                    stackOut = stackEnd;

                    for (pix2 = 0; pix2 < count2; pix2++) {
                        if (isH) {
                            np = (jump + ((np = pix2 + radiusPlus1) < widthMinus1 ? np : widthMinus1)) << 2;
                        } else {
                            np = (pix1 + (((np = pix2 + radiusPlus1) < heightMinus1 ? np : heightMinus1) * width)) << 2;
                        }

                        var _a = ((a_sum * mul_sum) >> shg_sum);
                        if (_a === 0) {
                            _r = _g = _b = 0;
                        } else {
                            k = 255 / _a;
                            var _r = ((r_sum * mul_sum) >> shg_sum) * k;
                            var _g = ((g_sum * mul_sum) >> shg_sum) * k;
                            var _b = ((b_sum * mul_sum) >> shg_sum) * k;
                        }


                        pixels[pxIdx] = this.clamp(_r);
                        pixels[pxIdx + 1] = this.clamp(_g);
                        pixels[pxIdx + 2] = this.clamp(_b);
                        pixels[pxIdx + 3] = this.clamp(_a);

                        r_sum -= r_out_sum;
                        g_sum -= g_out_sum;
                        b_sum -= b_out_sum;
                        a_sum -= a_out_sum;

                        r_out_sum -= stackIn.r;
                        g_out_sum -= stackIn.g;
                        b_out_sum -= stackIn.b;
                        a_out_sum -= stackIn.a;


                        var npa = pixels[np + 3];
                        k = npa / 255;
                        var npr = pixels[np] * k;
                        var npg = pixels[np + 1] * k;
                        var npb = pixels[np + 2] * k;

                        r_sum += (r_in_sum += (stackIn.r = npr));
                        g_sum += (g_in_sum += (stackIn.g = npg));
                        b_sum += (b_in_sum += (stackIn.b = npb));
                        a_sum += (a_in_sum += (stackIn.a = npa));

                        r_out_sum += (pr = stackOut.r);
                        g_out_sum += (pg = stackOut.g);
                        b_out_sum += (pb = stackOut.b);
                        a_out_sum += (pa = stackOut.a);

                        r_in_sum -= pr;
                        g_in_sum -= pg;
                        b_in_sum -= pb;
                        a_in_sum -= pa;

                        stackIn = stackIn.next;
                        stackOut = stackOut.next;

                        if (isH) {
                            pxIdx += 4;
                        } else {
                            pxIdx += w4;
                        }
                    }

                    pix1++;

                    if (isH) {
                        jump += width;
                    } else {
                        jump = 0;
                        pxIdx = pix1 << 2;
                    }
                }

                if (!isH) {
                    break;
                }
                isH = false;
                count1 = width;
                count2 = height;
            }
        },

        blurRGBA: function(canvas, outCanvas, ext) {
            var radius = this.radius;

            if (outCanvas === true || outCanvas === false) {
                ext = outCanvas;
                outCanvas = null;
            }
            var sx = 0,
                sy = 0,
                width = canvas.width,
                height = canvas.height;
            if (!canvas.getContext || ext) {
                var img = canvas;
                canvas = this.createSourceCanvas(img, sx, sy, width, height, radius, ext);
                if (ext !== false) {
                    width += radius * 2,
                    height += radius * 2;
                }
                if (!outCanvas) {
                    outCanvas = canvas;
                }
            }
            if (!outCanvas) {
                width += radius * 2,
                height += radius * 2;
                outCanvas = this.createCanvas(width, height);
            }
            var context = canvas.getContext('2d');
            var outContext = outCanvas.getContext('2d');

            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var pixels = imageData.data;

            if (this.gaussian) {
                this.doGaussian(pixels, width, height);
            } else {
                this.doStack(pixels, width, height);
            }
            outContext.clearRect(0,0,outCanvas.width, outCanvas.height)
            outContext.putImageData(imageData, sx, sy);

            return outCanvas;
        },


        createSourceCanvas: function(img, sx, sy, sw, sh, radius, ext) {
            var dx = 0,
                dy = 0;
            var width = sw,
                height = sh;
            if (ext !== false) {
                dx = radius;
                dy = radius;
                width += radius * 2,
                height += radius * 2;
            }
            var canvas = this.createCanvas(width, height);
            var context = canvas.getContext('2d');

            context.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh);
            return canvas;
        },

        clamp: function(v) {
            return v < 255 ? (v > 0 ? (v | 0) : 0) : 255;
        },

        createCanvas: function(width, height) {
            var canvas = document.createElement("canvas");
            canvas.retinaResolutionEnabled = false;
            canvas.width = width;
            canvas.height = height;
            // canvas.MSAAEnabled = true;
            // canvas.MSAASamples = 4;
            return canvas;
        },

    };


    Blur.newBlurStack = function() {
        return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            next: null
        }
    };

    Blur.mul_table = [
        512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
        454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
        482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
        437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
        497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
        320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
        446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
        329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
        505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
        399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
        324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
        268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
        451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
        385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
        332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
        289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
    ];

    Blur.shg_table = [
        9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
        17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
        19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
    ];

    for (var p in proto) {
        Blur.prototype[p] = proto[p];
    }

}(window));
