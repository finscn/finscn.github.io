"use strict";
(function(exports, undefined) {

    var ns = exports.Sprite = exports.Sprite || {};

    var Animation = ns.Animation = function(options) {
        for (var p in options) {
            this[p] = options[p];
        }
    }

    var proto = {

        constructor: Animation,

        x: 0,
        y: 0,
        parent: null,
        loop: false,

        img: null,
        imageMapping: null,

        duration: 0,
        played: 0,
        frames: null,
        frameCount: -1,
        startIndex: 0,

        currentFrame: null,
        currentIndex: -1,
        currentEndTime: -1,

        init: function() {
            this.frames = this.frames || this.getFramesConfig();
            this.frameCount = this.frames.length;
            this.duration = this.duration || 0;

            if (this.frameCount > 0) {
                var frame = new ns.Frame(this.frames[0]);
                this.frames[0] = frame;
                for (var i = 1; i < this.frameCount; i++) {
                    var nextFrame = new ns.Frame(this.frames[i]);
                    frame.endTime = nextFrame.time;
                    frame.init();
                    frame = nextFrame;
                    this.frames[i] = frame;
                }
                frame.endTime = this.duration;
                frame.init();
                this.played = 0;
                this.setFrame(0);
            }
        },

        getFramesConfig: function() {
            return [];
        },

        setFrame: function(index) {
            this.currentIndex = index;
            this.currentFrame = this.frames[index];
            if (!this.currentFrame) {
                // console.log("error Animation Index", index, this.frameCount);
            }
            this.currentEndTime = this.currentFrame.endTime;
        },

        update: function(timeStep) {

            var last = this.currentIndex;
            if (this.played >= this.currentEndTime) {
                if (this.currentIndex === this.frameCount - 1) {
                    this.onEnd && this.onEnd(timeStep);
                    if (this.loop) {
                        this.played = 0;
                        this.currentIndex = this.startIndex;
                    }
                } else {
                    this.currentIndex++;
                }
                this.setFrame(this.currentIndex);

            } else {
                this.played += timeStep;
            }
            return last !== this.currentIndex;
        },

        onEnd: null,

        render: function(context) {

            var x = this.x,
                y = this.y;
            var frame = this.currentFrame;
            var flip = 1;
            if (this.flip) {
                context.scale(-1, 1);
                flip = -1;
            }
            frame.render(context, x, y);

            if (this.flip) {
                context.scale(-1, 1);
            }
        }
    };


    for (var p in proto) {
        Animation.prototype[p] = proto[p];
    }


})(this);
