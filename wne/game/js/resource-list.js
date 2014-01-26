var resourceList = [
    
    {id: "temp-font" , src:"game/res/DINCondensed-Bold.ttf"},
    {
        id: "fn1",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initPlayerImages();
                loader.finished = true;
            // }, 120)
        }

    },

    {
        id: "fn2",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initWaveImage();
                ImageCreator.initPrintImages();
                // ImageCreator.initTextImages();
                ImageCreator.initDarkImages();
                ImageCreator.initEndLineImages();
                loader.finished = true;
            // }, 120)
        }

    },

    {
        id: "fn3A",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initBlockImagesA();
                loader.finished = true;
            // }, 120)
        }

    }, {
        id: "fn3B",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initBlockImagesB();
                loader.finished = true;
            // }, 120)
        }

    }, {
        id: "fn3C",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initBlockImagesC();
                loader.finished = true;
            // }, 120)
        }

    }, {
        id: "fn4A",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initBallImagesA();
                loader.finished = true;
            // }, 120)
        }

    }, {
        id: "fn4B",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initBallImagesB();
                loader.finished = true;
            // }, 120);
        }

    }, {
        id: "fn4C",
        type: "fn",
        fn: function() {
            var loader = this;
            // setTimeout(function() {
                ImageCreator.initBallImagesC();
                loader.finished = true;
            // }, 120)
        }

    },
];

//

(function() {

    if (Note.resourceList) {
        Note.resourceList.forEach(function(res) {
            resourceList.push(res);
        })
    }
}())
