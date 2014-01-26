;
(function(exports, undefined) {
    'use strict';

    var Animation = exports.Animation = function(cfg) {
        exports.merger(this, cfg);
        this.init();
    }

    var proto = {

        constructor: Animation,

        frames: null,
        frameCount: -1,
        frameDuration: Infinity,
        currentFrame: null,
        currentFrameIndex: -1,
        currentDuration: -1,
        currentPlayed: -1,

        startFrameIndex: 0,
        totalDuration: 0,

        originX: 0,
        originY: 0,

        loop: false,
        paused: false,

        img: null,
        x: 0,
        y: 0,
        width: 0,
        height: 0,

        resourcePool: null,
        parent: null,

        init: function() {
            this.resourcePool = this.resourcePool || exports.ResourcePool;

            this.img = this.getImage(this.img);
            this.frames = this.frames || this.getFramesConfig();
            this.frameCount = this.frames.length;
            this.totalDuration = 0;
            if (this.frameCount > 0) {
                var Me = this;
                this.frames.forEach(function(frame, idx) {
                    if (typeof frame == "number") {
                        frame = Me.frames[idx] = {
                            ref: frame
                        };
                    }
                    if (typeof frame.ref == "number") {
                        var refFrame = Me.frames[frame.ref];
                        for (var p in refFrame) {
                            if (!(p in frame)) {
                                frame[p] = refFrame[p];
                            }
                        }
                    }
                });

                this.frames.forEach(function(frame, idx) {
                    var f = Me.initFrame(frame);
                    Me.totalDuration += f.d;
                });

                this.setFrame(0);
            }
        },

        reset: function() {
            this.setFrame(0);
        },

        updateFramesImg: function(img) {
            this.frames.forEach(function(frame) {
                frame.img = img;
            });
        },

        initFrame: function(frame) {
            frame.img = this.getImage(frame.img) || this.img;
            var minX = Infinity,
                minY = Infinity;
            var maxX = -Infinity,
                maxY = -Infinity;

            var complex = false;

            if (!("flip" in frame)) {
                frame.flip = this.flip || false;
            }

            if (frame.sub && !frame.inited) {
                complex = true;
                frame.subConut = frame.sub.length;
                for (var i = 0; i < frame.subConut; i++) {

                    var s = frame.sub[i];
                    if (this.frameList && typeof s == "number") {
                        s = this.frameList[s];
                        frame.sub[i] = s;
                    }
                    s.img = this.getImage(s.img) || frame.img;
                    if (!"flip" in s) {
                        s.flip = this.flip || false;
                    }
                    var t = 0 - (s.oy || 0),
                        b = t + s.h;
                    var l = 0 - (s.ox || 0),
                        r = l + s.w;
                    if (t < minY) {
                        minY = t;
                    }
                    if (b > maxY) {
                        maxY = b;
                    }
                    if (l < minX) {
                        minX = l;
                    }
                    if (r > maxX) {
                        maxX = r;
                    }
                }
                frame.inited = true;
            }

            frame.x = frame.x || 0;
            frame.y = frame.y || 0;
            if (complex) {
                frame.w = maxX - minX;
                frame.h = maxY - minY;
            } else {
                frame.w = frame.w || this.width || frame.img.width;
                frame.h = frame.h || this.height || frame.img.height;
            }
            frame.ox = frame.ox || 0;
            frame.oy = frame.oy || 0;
            frame.dw = frame.dw || this.dw || frame.w;
            frame.dh = frame.dh || this.dh || frame.h;
            frame.d = frame.d || frame.d === 0 ? frame.d : this.frameDuration;
            // frame.d*=8;
            return frame;
        },

        setData: function(data) {
            for (var key in data) {
                this[key] = data[key];
            }
            this.frameCount = this.frames.length;
            this.img = this.getImage(this.img);
            this.setFrame(0);
        },

        getImage: function(img) {
            if (typeof img == "string") {
                return this.resourcePool.get(img);
            }
            return img;
        },
        getFramesConfig: function() {
            return [];
        },
        getFrame: function() {
            return this.currentFrame;
        },
        setFrame: function(index) {
            this.currentFrameIndex = index;
            this.currentPlayed = 0;
            this.currentFrame = this.frames[index];
            if (!this.currentFrame) {
                console.log("error Animation Index", index, this.frameCount);
            }
            this.currentDuration = this.currentFrame.d;
        },
        nextFrame: function() {
            this.currentFrameIndex++;
            this.setFrame(this.currentFrameIndex);
        },

        isEnd: function() {
            return this.currentPlayed >= this.currentDuration && this.currentFrameIndex === this.frameCount - 1;
        },

        update: function(timeStep) {
            if (this.paused) {
                return false;
            }
            var last = this.currentFrameIndex;
            if (this.currentPlayed >= this.currentDuration) {
                if (this.currentFrameIndex === this.frameCount - 1) {
                    this.onEnd && this.onEnd(timeStep);
                    if (this.loop) {
                        this.currentFrameIndex = this.startFrameIndex;
                    }
                } else {
                    this.currentFrameIndex++;
                }
                this.setFrame(this.currentFrameIndex);

            } else {
                this.currentPlayed += timeStep;
            }
            return last !== this.currentFrameIndex;
        },

        onEnd: null,

        renderImg: function(context) {
            var x = this.x + this.originX,
                y = this.y + this.originY;
            var frame = this.currentFrame;
            var img = this.img;
            context.drawImage(img, x - frame.ox, y - frame.oy, frame.w, frame.h);
        },

        render: function(context) {

            var x = this.x + this.originX,
                y = this.y + this.originY;

            var frame = this.currentFrame;
            var img = frame.img || this.img;

            // if (!img) {
            //     console.warn("no img");
            //     return;
            // }

            var flip = 1;
            if (frame.flip) {
                context.scale(-1, 1);
                flip = -1;
            }
            if (frame.sub) {
                for (var i = 0, len = frame.subConut; i < len; i++) {
                    var _frame = frame.sub[i];
                    if (_frame.flip) {
                        context.scale(-1, 1);
                        flip = -1;
                    }
                    context.drawImage(_frame.img, _frame.x, _frame.y, _frame.w, _frame.h,
                        x * flip - _frame.ox, y - _frame.oy, _frame.w, _frame.h);
                    if (_frame.flip) {
                        context.scale(-1, 1);
                        flip = 1;
                    }
                }

            } else {
                context.drawImage(img, frame.x, frame.y, frame.w, frame.h,
                    x * flip - frame.ox, y - frame.oy, frame.w, frame.h);
                // context.strokeStyle="red"
                // context.fillText(this.currentFrameIndex,x*flip-frame.ox, y-frame.oy)
                // context.strokeRect(x*flip-frame.ox, y-frame.oy, frame.w, frame.h)
                // context.strokeRect(x*flip, y, 4,4)
            }


            if (frame.flip) {
                context.scale(-1, 1);
            }
        }
    };

    Animation.merge = function(a, b) {
        for (var key in b) {
            if (key in a) {
                if (key !== "frames" && typeof a[key] == "object" && typeof b[key] == "object") {
                    Animation.merge(a[key], b[key])
                }
            } else {
                a[key] = b[key];
            }
        }
        return a;
    };

    for (var p in proto) {
        Animation.prototype[p] = proto[p];
    }


}(this));
