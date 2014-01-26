var Colors = [
    "rgba(240,240,240,1)",
    "rgba(160,160,160,1)",
    "rgba(40,40,40,1)",
];

var BgColors = [
    "rgba(110,110,110,0.8)",
    "rgba(90,90,90,0.8)",
    "rgba(70,70,70,0.8)",
];

var BallColors = [
    "rgba(200,200,200,1)",
    "rgba(150,150,150,1)",
    "rgba(100,100,100,1)",
];

var PrintColors = [
    "rgba(190,190,190,0.5)",
    "rgba(100,100,100,0.5)",
    "rgba(0,0,0,0.5)",
];


var ImageCreator = {

    maxBlurRadius: 40,
    defaultMargin: 4,
    defaultColor: "#000000",
    MSAAEnabled: false, // true or false
    MSAASamples: 2, // 2 or 4

    init: function() {

        this.initBlurs();
    },
    initBlurs: function() {
        this.blurs = {};
        for (var r = 1; r <= this.maxBlurRadius; r += 1) {
            var b = new Blur({
                radius: r,
                gaussian: true
            });
            b.init();
            this.blurs[r] = b;
        }
    },
    initPlayerImages: function() {
        var radius = 30;
        var blur1 = 16;
        var blur2 = 3;
        Colors.forEach(function(color, idx) {
            var img = ImageCreator.createCircle(radius, color);
            var blurImg1 = ImageCreator.blurImage(img, blur1);
            var blurImg2 = ImageCreator.blurImage(img, blur2);

            var context = blurImg1.getContext("2d");
            context.drawImage(blurImg2, blur1 - blur2, blur1 - blur2);
            ResourcePool.add("p-" + idx, blurImg1);
        });
    },
    initPrintImages: function() {
        var radius = 25;
        var blur = 8;
        PrintColors.forEach(function(color, idx) {
            var img = ImageCreator.createCircle(radius, color);
            img = ImageCreator.blurImage(img, blur);
            ResourcePool.add("print-" + idx, img);
        });
    },
    initTextImages: function() {
        var text = "Win isn't Everything";
        var canvas = this.createCanvasForText(text, 110, "DINCondensed-Bold", "#ffffff");
        var context = canvas.getContext("2d");

        var blur = 15;
        var img = ImageCreator.blurImage(canvas, blur);
        var context = img.getContext("2d");
        context.drawImage(canvas, blur, blur);
        ResourcePool.add("title", img);
        // context.strokeStyle="#ffffff";
        // context.strokeRect(0,0,img.width,img.height);

        /////////////////////////////
        var text = "Congratulations";
        var canvas = this.createCanvasForText(text, 60, "DINCondensed-Bold", "#ffffff");
        var context = canvas.getContext("2d");

        var blur = 10;
        var img = ImageCreator.blurImage(canvas, blur);
        var context = img.getContext("2d");
        context.drawImage(canvas, blur, blur);
        ResourcePool.add("end1", img);
        // context.strokeStyle="#ffffff";
        // context.strokeRect(0,0,img.width,img.height);

        /////////////////////////////
        var text = "You WIN";
        var canvas = this.createCanvasForText(text, 90, "DINCondensed-Bold", "#ffffff");
        var context = canvas.getContext("2d");

        var blur = 10;
        var img = ImageCreator.blurImage(canvas, blur);
        var context = img.getContext("2d");
        context.drawImage(canvas, blur, blur);
        ResourcePool.add("end2", img);
        // context.strokeStyle="#ffffff";
        // context.strokeRect(0,0,img.width,img.height);



        var text = "But do NOT forget to look at";
        var canvas = this.createCanvasForText(text, 60, "DINCondensed-Bold", "#333333");
        var context = canvas.getContext("2d");

        var blur = 10;
        var img = ImageCreator.blurImage(canvas, blur);
        var context = img.getContext("2d");
        context.drawImage(canvas, blur, blur);
        ResourcePool.add("end3", img);
        // context.strokeStyle="#ffffff";
        // context.strokeRect(0,0,img.width,img.height);

        //////////////////
        var text = "the Color of your Heart";
        var canvas = this.createCanvasForText(text, 60, "DINCondensed-Bold", "#333333");
        var context = canvas.getContext("2d");

        var blur = 10;
        var img = ImageCreator.blurImage(canvas, blur);
        var context = img.getContext("2d");
        context.drawImage(canvas, blur, blur);
        ResourcePool.add("end4", img);
        // context.strokeStyle="#ffffff";
        // context.strokeRect(0,0,img.width,img.height);
    },

    createCanvasForText: function(text, size, font, color) {
        var canvas = createCanvas(size * 2, size * 2);
        var context = canvas.getContext("2d");
        context.font = size + "px " + font;
        var measure = context.measureText(text);
        measure.height = size >> 0;
        canvas.width = measure.width * 1.1 >> 0;
        canvas.height = measure.height * 1.5 >> 0;
        context.font = size + "px " + font;
        context.fillStyle = color;
        context.fillText(text, measure.width * 0.05 >> 0, measure.height + measure.height * 0.1 >> 0);
        return canvas;
    },

    initDarkImages: function() {
        var radius = 10;
        var blur = 10;
        var color = "#000000";
        var img = ImageCreator.createCircle(radius, color);
        img = ImageCreator.blurImage(img, blur);
        ResourcePool.add("dark", img);
    },
    initEndLineImages: function() {
        var blur = 10;
        var color = "#ffffff";
        var img = ImageCreator.createRect(10, 30, color);
        img = ImageCreator.blurImage(img, blur);
        ResourcePool.add("endLine", img);
    },
    initBallImagesA: function() {

        var colors = Ball.colors;
        var radius = Ball.radius;
        var blurs = Ball.blurs;

        var idx = 0;
        var color = colors[idx];
        radius.forEach(function(r) {
            blurs.forEach(function(b) {
                var img = ImageCreator.createCircle(r, color);
                img = ImageCreator.blurImage(img, b);
                ResourcePool.add("c-" + r + "-" + idx + "-" + b, img);
            });
        });
    },
    initBallImagesB: function() {

        var radius = Ball.radius;
        var colors = Ball.colors;
        var blurs = Ball.blurs;

        var idx = 1;
        var color = colors[idx];
        radius.forEach(function(r) {
            blurs.forEach(function(b) {
                var img = ImageCreator.createCircle(r, color);
                img = ImageCreator.blurImage(img, b);
                ResourcePool.add("c-" + r + "-" + idx + "-" + b, img);
            });
        });
    },
    initBallImagesC: function() {

        var radius = Ball.radius;
        var colors = Ball.colors;
        var blurs = Ball.blurs;

        var idx = 2;
        var color = colors[idx];
        radius.forEach(function(r) {
            blurs.forEach(function(b) {
                var img = ImageCreator.createCircle(r, color);
                img = ImageCreator.blurImage(img, b);
                ResourcePool.add("c-" + r + "-" + idx + "-" + b, img);
            });
        });
    },
    initBlockImagesA: function() {
        var blur = 3;
        var size = [
            [40, 40],
            // [40, 80],
            // [40, 120],
            // [40, 160],
        ];
        for (var no in Colors) {
            var color = Colors[no];
            size.forEach(function(s) {
                var img = ImageCreator.createRect(s[0], s[1], color, null, true);
                img = ImageCreator.blurImage(img, blur);
                ResourcePool.add("rect-" + s[0] + "-" + s[1] + "-" + no, img);
            });
        }
    },
    initBlockImagesB: function() {
        var blur = 3;
        var size = [

            [60, 60],
            // [60, 120],
            // [60, 160],

        ];
        for (var no in Colors) {
            var color = Colors[no];
            size.forEach(function(s) {
                var img = ImageCreator.createRect(s[0], s[1], color, null, true);
                img = ImageCreator.blurImage(img, blur);
                ResourcePool.add("rect-" + s[0] + "-" + s[1] + "-" + no, img);
            });
        }
    },
    initBlockImagesC: function() {
        var blur = 3;
        var size = [
            [80, 80],
            // [80, 120],
            // [80, 160],
        ];
        for (var no in Colors) {
            var color = Colors[no];
            size.forEach(function(s) {
                var img = ImageCreator.createRect(s[0], s[1], color, null, true);
                img = ImageCreator.blurImage(img, blur);
                ResourcePool.add("rect-" + s[0] + "-" + s[1] + "-" + no, img);
            });
        }
    },
    initWaveImage: function() {

        radius = Wave.imgRadius;
        var color = "#ffffff";
        var margin = 4;
        var canvas = createCanvas((radius + margin) * 2, (radius + margin) * 2);
        canvas.MSAAEnabled = this.MSAAEnabled;
        canvas.MSAASamples = this.MSAASamples;
        var context = canvas.getContext("2d");
        context.lineWidth = 3;
        context.beginPath();
        context.arc(radius + margin, radius + margin, radius, 0, Math.PI * 2);
        context.strokeStyle = color;
        context.stroke()
        context.closePath();
        var blurs = this.blurs;
        var canvasBlur = blurs[4].blurRGBA(canvas, null, true);
        // canvasBlur.getContext("2d").drawImage(canvas,0,0);
        canvas = canvasBlur;

        ResourcePool.add("wave", canvas);
    },

    createRect: function(width, height, color, margin, border) {
        margin = margin || margin === 0 ? margin : this.defaultMargin;
        var canvas = createCanvas(width + margin * 2, height + margin * 2);
        canvas.MSAAEnabled = this.MSAAEnabled;
        canvas.MSAASamples = this.MSAASamples;
        var context = canvas.getContext("2d");
        context.fillStyle = color || this.defaultColor;
        context.fillRect(margin, margin, width, height);
        if (border) {
            context.strokeStyle = "rgba(0,0,0,0.5)";
            context.strokeRect(margin, margin, width, height);
        }
        return canvas;
    },

    createCircle: function(radius, color, margin) {
        margin = margin || margin === 0 ? margin : this.defaultMargin;
        var canvas = createCanvas((radius + margin) * 2, (radius + margin) * 2);
        canvas.MSAAEnabled = this.MSAAEnabled;
        canvas.MSAASamples = this.MSAASamples;
        var context = canvas.getContext("2d");
        context.beginPath();
        context.arc(radius + margin, radius + margin, radius, 0, Math.PI * 2);
        context.fillStyle = color || this.defaultColor;
        context.fill();
        context.closePath();
        return canvas;
    },

    blurImage: function(img, blurRadius) {
        var blurs = this.blurs;
        if (!blurRadius || !blurs[blurRadius]) {
            return img;
        }
        return blurs[blurRadius].blurRGBA(img, null, true);
    }

};

ImageCreator.init();
