;
(function(exports, undefined) {
    'use strict';

    var ProcessQ = exports.ProcessQ = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key]
        }
        var Me = this;
        this.callRun = function() {
            Me.run();
        };
        this.timer = {};
    };
    ProcessQ.types = {};

    ProcessQ.prototype = {

        constructor: ProcessQ,

        interval: 20,

        ignoreError: true,
        delay: 0,
        defalutType: "img",

        parallel: false,
        wrapAudio: false,
        rootPath: null,
        defaultItemIsFinished: function() {
            return true;
        },

        init: function() {
            this.resultPool = {};

            var items = this.items || [];
            this.items = [];
            this.itemCount = 0;
            this.totalWeight = 0;

            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                this.addItem(item);
            }

            if (this.onInit != null) {
                this.onInit();
            }
        },
        onInit: null,

        timerStart: function() {
            var timer = this.timer;
            timer.current = Date.now();
            timer.start = timer.last = timer.current;
            timer.delta = 0;
            timer.duration = 0;
        },

        timerTick: function() {
            var timer = this.timer;
            timer.last = timer.current;
            timer.current = Date.now();
            timer.delta = timer.current - timer.last;
            timer.duration += timer.delta;
        },

        addItem: function(item) {
            var options = item;
            item = {};
            for (var key in options) {
                item[key] = options[key];
            }
            item.options = options;

            item.src = item.src || item.url;

            item.id = item.id || item.src || "id_" + (this.items.length + 1);

            var type = item.type || this.defalutType;
            if (type) {
                item = new ProcessQ.types[type](item);
            }
            if (this.rootPath) {
                if (this.rootPath[this.rootPath.length - 1] != "/") {
                    this.rootPath += "/";
                }
            } else {
                this.rootPath = "";
            }
            if (item.src) {
                if (item.src[0] == "/") {
                    item.src = item.src.substring(1);
                }
                item.src = this.rootPath + item.src;
            }

            item.delay = isNaN(item.delay) ? this.delay : Number(item.delay);
            item.weight = isNaN(item.weight) || item.weight === 0 ? 1 : Number(item.weight);
            item.isFinished = item.isFinished || this.defaultItemIsFinished;
            this.totalWeight += item.weight;
            this.items.push(item);
            this.itemCount++;
        },

        start: function() {
            this.paused = false;
            this.itemIndex = 0;
            this.finishedWeight = 0;
            this.finishedCount = 0;
            this.timerStart();
            this.activeItem(0);

            if (this.parallel) {
                this.runParallel();
            } else {
                this.run();
            }
        },

        runParallel: function() {
            var Me = this;
            this.items.forEach(function(item) {
                item.start(Me);
            });
            var delay = this.delay || 10;

            var totalCount = this.items.length;
            var finished = {};
            var lastFinished = null;

            function check() {
                if (Me.finishedCount >= totalCount) {
                    Me.finish();
                } else {
                    Me.items.forEach(function(item, idx) {
                        if (!finished[idx] && item.isFinished(Me)) {
                            finished[idx] = true;
                            Me._onItemFinish(item, Me);
                        } else if (item.isError && item.isError(Me)) {
                            Me.onItemError(item, Me);
                            if (Me.ignoreError) {
                                finished[idx] = true;
                                Me.finishedCount += 1;
                                Me.finishedWeight += item.weight;
                            }
                        }
                    });
                    var currentFinished = Me.finishedWeight;
                    if (currentFinished !== lastFinished) {
                        Me.onProgressing(delay, Me);
                        lastFinished = currentFinished;
                    }
                    setTimeout(check, delay);
                }
            }
            check();
        },

        run: function() {
            this.mainLoop = setTimeout(this.callRun, this.interval);
            this.timerTick();
            var timeStep = this.timer.delta;
            if (this.paused && this.onPausing != null) {
                this.onPausing(timeStep);
                return;
            }
            if (!this.currentItem) {
                this.finish();
                return;
            }
            this.update(timeStep);
        },

        finish: function() {
            clearTimeout(this.mainLoop);
            if (this.onFinish != null) {
                this.onFinish(this);
            }
        },
        onFinish: null,

        next: function(timeStep) {
            this.activeItem(++this.itemIndex);
            this.onNext(timeStep, this);
        },

        getItem: function(index) {
            return this.items[index];
        },

        activeItem: function(index) {
            this.itemIndex = index;
            this.currentItem = this.getItem(index);
            if (this.currentItem) {
                this.currentItem._delay = this.currentItem.delay;
                if (this.currentItem._delay == 0) {
                    this.currentItem.start(this);
                    this.currentItem._started = true;
                }
            }
        },

        update: function(timeStep) {
            if (timeStep < 1) {
                return;
            }
            if (this.currentItem._delay >= this.interval) {
                this.currentItem._delay -= timeStep;
            } else if (!this.currentItem._started) {
                this.currentItem.start(this);
                this.currentItem._started = true;
            }


            if (this.currentItem._started) {

                if (this.currentItem.isFinished(this)) {
                    this._onItemFinish(this.currentItem, this);

                    this.next(timeStep);


                } else if (this.currentItem.isError && this.currentItem.isError(this)) {

                    this.onItemError(this.currentItem, this);

                    if (this.ignoreError) {
                        this.finishedCount += 1;
                        this.finishedWeight += this.currentItem.weight;
                        this.next(timeStep);
                    }
                }
            }

            if (this.currentItem) {
                if (this.currentItem.onProgressing) {
                    this.currentItem.onProgressing(timeStep, this);
                }
            }
            this.onProgressing(timeStep, this);
        },

        onItemFinish: function(item, queue) {

        },

        _onItemFinish: function(item, queue) {
            if (item.onFinish) {
                item.onFinish(queue);
            }
            if (item.getResult) {
                var rs = item.getResult();
                this.resultPool[item.id] = rs;
            }
            this.finishedCount += 1;
            this.finishedWeight += item.weight;
            this.onItemFinish(item, queue)
        },
        onItemError: function(item, queue) {
            if (item.onError) {
                item.onError(item.errorEvent, queue);
            }
            item.errorEvent = null;
        },

        onProgressing: function(timeStep, queue) {

        },
        onNext: function(timeStep, queue) {

        }

    };

    var FunctionLoader = exports.FunctionLoader = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key]
        }
    }
    ProcessQ.types["fn"] = FunctionLoader;

    FunctionLoader.prototype = {
        constructor: FunctionLoader,
        id: null,
        async: false,
        errorEvent: null,
        start: function(queue) {
            this.finished = this.async;
            // this.finished = true;
            this.result = this.fn(this);
        },

        getResult: function() {
            return this.result;
        },

        onFinish: function(queue) {

        },

        isFinished: function(queue) {
            return this.finished;
        },

        isError: function(queue) {
            return this.errorEvent;
        }

    }

    var ImageLoader = exports.ImageLoader = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key]
        }
    }
    ProcessQ.types["img"] = ImageLoader;

    ImageLoader.prototype = {
        constructor: ImageLoader,
        id: null,
        src: null,
        finished: false,
        async: false,
        lazy: false,
        errorEvent: null,

        start: function(queue) {
            if (this.lazy) {
                this.finished = true;
                return;
            }
            var img = this.img = new Image();
            this.finished = this.async;
            img.loader = this;
            img.addEventListener("load", this._onload);
            img.addEventListener("error", this._onerror);
            img.src = this.src;
            this.loading = true;
        },

        _onload: function(event) {
            this.loader.finished = true;
            this.loader.loading = false;
            this.removeEventListener("load", this.loader._onload);
            this.loader.onLoad(this, event);
            delete this.loader;
        },
        onLoad: function(img, event) {

        },
        _onerror: function(event) {
            this.loader.finished = false;
            this.loader.errorEvent = event;
            this.removeEventListener("error", this.loader._onerror);
            this.loader.onError(this, event);
            delete this.loader;
        },
        onError: function(img, event) {

        },

        getResult: function() {
            if (this.lazy) {
                return this;
            }
            return this.img;
        },

        onFinish: function(queue) {

        },

        isFinished: function(queue) {
            return this.finished;
        },

        isError: function(queue) {
            return this.errorEvent;
        }

    }


    var AudioLoader = exports.AudioLoader = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key]
        }
    };

    AudioLoader.formats = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg; codecs=vorbis',
    };
    ProcessQ.types["audio"] = AudioLoader;


    (function() {

        var test = new Audio();
        for (var ext in AudioLoader.formats) {
            if (test.canPlayType(AudioLoader.formats[ext])) {
                AudioLoader.supportFormat = ext;
                break;
            }
        }
    }());

    AudioLoader.prototype = {
        constructor: AudioLoader,
        id: null,
        src: null,
        finished: false,
        async: false,
        lazy: false,
        errorEvent: null,
        wrap: null,
        ignoreIOS: true,
        isIOS: function() {
            if (typeof window != "undefined" && window.navigator && window.navigator.userAgent && window.navigator.userAgent.toLowerCase) {
                var ua = window.navigator.userAgent.toLowerCase();
                var iPhone = /iphone/.test(ua);
                var iPad = /ipad/.test(ua);
                var iPod = /ipod/.test(ua);
                var iOS = iPhone || iPad || iPod;
                var l = window.location;
                var inBroswer = l && l.replace && l.reload;
                return iOS && inBroswer;
            }
            return false;
        },
        start: function(queue) {
            if (this.lazy) {
                this.finished = true;
                return;
            }
            this.wrap = this.wrap === null ? queue.wrapAudio : this.wrap;
            this.finished = this.async;

            var audio = this.audio = new Audio();
            //TODO : check has ext-filename
            if (this.src.indexOf(AudioLoader.supportFormat) == -1) {
                audio.src = this.src + "." + AudioLoader.supportFormat;
            } else {
                audio.src = this.src;
            }
            audio.loop = this.loop || false;
            audio.preload = true;
            audio.autobuffer = true;

            if (this.ignoreIOS && this.isIOS()) {
                this.finished = true;
                this.wrap = false;
                this.audio = null;
                return;
            }
            audio.loader = this;
            audio.addEventListener("canplaythrough", this._onload);
            audio.addEventListener("error", this._onerror);
            audio.load();
            this.loading = true;
        },

        _onload: function(event) {
            this.loader.finished = true;
            this.loader.loading = false;
            this.removeEventListener("canplaythrough", this.loader._onload);
            this.loader.onLoad(this, event);
            delete this.loader;
        },
        onLoad: function(audio, event) {

        },

        _onerror: function(event) {
            this.loader.finished = false;
            this.loader.errorEvent = event;
            this.removeEventListener("error", this.loader._onerror);
            this.loader.onError(this, event);
            delete this.loader;
        },
        onError: function(audio, event) {

        },

        getResult: function() {
            if (this.lazy) {
                return this;
            }
            if (typeof Sound != "undefined" && this.wrap && !(this.audio instanceof Sound)) {
                var o = this.options || {};
                o.audio = this.audio;
                this.audio = new Sound(o);
            }

            return this.audio;
        },

        isFinished: function(queue) {
            return this.finished;
        },
        isError: function(queue) {
            return this.errorEvent;
        }

    };


}(this));
