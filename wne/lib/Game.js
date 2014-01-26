"use strict";

(function(exports, undefined) {

    var Game = exports.Game = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key];
        }
    };


    var proto = {
        constructor: Game,

        FPS: 60,
        timer: null,
        timeStep: null,
        timeout: null,
        staticTimeStep: 0,
        gameTime: 0,
        mainLoop: null,

        width: 800,
        height: 480,
        viewWidth: null,
        viewHeight: null,

        container: null,
        viewport: null,
        canvas: "canvas",
        context: null,

        state: null,
        scene: null,
        sceneId: 0,

        resources: null,
        resourcePool: null,
        loader: null,


        init: function() {
            this.viewWidth = this.viewWidth || this.width;
            this.viewHeight = this.viewHeight || this.height;


            this.timeout = this.timeout || Math.floor(1000 / this.FPS);
            this.timeStep = this.timeStep || this.timeout;
            this.maxTimeStep = this.maxTimeStep || Math.floor(this.timeStep * 1.5)
            this.timer = new exports.Timer(this.timer);

            var Me = this;
            this.callRun = function() {
                Me.run();
            }

            this.initContainer();
            this.initViewport();
            this.initCanvas();

            this.initUI();
            this._initEvent();

            this.resourcePool = this.resourcePool || exports.ResourcePool;
            this.initLoader();

            this.onInit();

        },

        onInit: exports.noop,


        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////


        initContainer: function() {
            this.container = exports.$id(this.container) || this.container;
            if (typeof this.container == "string") {
                this._container = this.container;
                this.container = null;
            }

            if (this.container) {
                exports.merger(this.container.style, {
                    visibility: "visible",
                    position: "relative",
                    overflow: "hidden",
                    padding: "0px",
                    opacity: "1",
                    width: this.width + "px",
                    height: this.height + "px",
                    // left : "50%",
                    // marginLeft : -this.width/2+"px",
                });

                var rect = this.container.getBoundingClientRect();
                this.pos = {
                    left: rect.left + window.scrollX,
                    top: rect.top + window.scrollY,
                    right: rect.right + window.scrollX,
                    bottom: rect.bottom + window.scrollY,
                    width: rect.width,
                    height: rect.height
                };
            } else {
                this.pos = {
                    left: 0,
                    top: 0,
                    right: this.width,
                    bottom: this.height,
                    width: this.width,
                    height: this.height
                }
            }

        },

        initViewport: function() {
            if (this.container) {
                this.viewport = document.createElement("div");
                this.container.appendChild(this.viewport);
                var domStyle = this.viewport.style;
                exports.merger(domStyle, {
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    overflow: "hidden",
                    padding: "0px",
                    width: this.viewWidth + "px",
                    height: this.viewHeight + "px",
                    className: "viewport",
                    display: "block",
                    backgroundColor: "transparent"
                });
            }
        },

        initCanvas: function() {

            this.canvas = exports.$id(this.canvas) || this.canvas;
            // this.canvas=this.canvas||document.createElement("canvas");

            var domStyle = this.canvas.style;
            if (this.canvas.parentNode && domStyle) {
                exports.merger(domStyle, {
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    zIndex: 10
                });
            }

            this.canvas.width = this.viewWidth;
            this.canvas.height = this.viewHeight;
            this.context = this.canvas.getContext('2d');

            if (this.viewport) {
                this.viewport.appendChild(this.canvas);
            }

        },

        initUI: exports.noop,

        _initEvent: function() {
            var Me = this;
            var hidden, visibilityChange;
            if (typeof document.hidden !== "undefined") {
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            } else if (typeof document.mozHidden !== "undefined") {
                hidden = "mozHidden";
                visibilityChange = "mozvisibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            }
            document.addEventListener(visibilityChange, function(event) {
                console.log(event.type, document[hidden]);
                if (document[hidden]) {
                    Me.pageHidden = true;
                    Me.onPageHidden();
                } else {
                    Me.pageHidden = false;
                    Me.onPageVisible();
                }
            }, false);

            this.initEvent();
        },

        onPageHidden: exports.noop,
        onPageVisible: exports.noop,

        initEvent: exports.noop,


        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////


        initLoader: function() {
            if (this.loader === false) {
                return;
            }
            var Me = this;
            var options = {
                parent: Me,
                interval: 1,
                delay: 1,
                parallel: false,
                wrapAudio: false,
                onNext: function(timeStep, queue) {
                    var loaded = queue.finishedWeight,
                        total = queue.totalWeight,
                        results = queue.resultPool;
                    return Me.onLoading(loaded, total, results);
                },
                onFinish: function(queue) {
                    console.log("onFinish")
                    var loaded = queue.finishedWeight,
                        total = queue.totalWeight,
                        results = queue.resultPool;
                    if (Me.resourcePool) {
                        for (var id in results) {
                            Me.resourcePool.add(id, results[id]);
                        }
                    } else {
                        Me.resourcePool = results;
                    }
                    Me.onLoad = Me.onLoad || Me.onReady;
                    setTimeout(function() {
                        Me.onLoad(loaded, total, results);
                    }, queue.delay);
                }
            }
            var loader = this.loader || {};
            for (var key in loader) {
                options[key] = loader[key];
            }
            this.loader = new exports.ProcessQ(options);
        },

        beforeLoad: exports.noop,
        load: function(force) {
            if (this.beforeLoad(force) === false) {
                return false;
            }
            var resources = this.resources ? [].concat(this.resources) : [];
            this.loader.items = resources;
            this.loader.init();
            this.loader.start();
        },
        onLoading: exports.noop,
        onLoad: null,
        onReady: exports.noop,

        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////


        start: function(sceneId) {
            this.stop();
            var scene = this.loadScene(sceneId);
            this.enterScene(scene);
            this.onStart();
        },
        onStart: exports.noop,

        stop: function() {
            this.stopLoop();
            this.leaveScene();
            this.onStop();
        },
        onStop: exports.noop,

        getSceneInstance: exports.noop,

        loadScene: function(sceneId) {
            var scene = this.getSceneInstance(sceneId);
            if (scene) {
                scene.id=scene.id||scene.id===0?scene.id:sceneId;
                scene.init(this);
                return scene;
            } else {
                console.error("can't load scene ", sceneId)
                return null;
            }
        },

        enterScene: function(scene) {
            if (!scene) {
                console.error("can't enter scene ", scene)
                return false;
            }

            this.toPause = false;
            this.toResume = false;
            this.toStop = false;
            this.toPlay = false;

            this.scene = scene;
            this.sceneId = scene.id;
            if (scene.beforeRun) {
                scene.beforeRun(this);
            }
            var Me = this;
            // setTimeout(function(){
            // Me.gameTime+=10;
            Me.startLoop();
            // },10)
        },


        leaveScene: function() {
            if (this.scene && this.scene.destructor) {
                this.scene.destructor();
            }
            this.sceneId = null;
            this.scene = null;
        },

        restart: function() {
            this.start(this.sceneId);
        },

        hasPrevScene: exports.noop,
        prevScene: exports.noop,
        hasNextScene: exports.noop,
        nextScene: exports.noop,

        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////

        startLoop: function() {
            console.log("startLoop")
            this.state = Game.RUNNING;
            this.timer.start();
            this.gameTime = Date.now();
            this.frameCount = 0;
            this.paused = 0;
            this.run();
        },
        stopLoop: function() {
            console.log("stopLoop");
            this.state = Game.STOP;
            this.paused = 0;
            this.cancelLoop();
        },
        doNextLoop: function(fn) {
            // this.mainLoop=requestAnimationFrame( this.callRun );
            this.mainLoop = setTimeout(this.callRun, this.timeout);
        },
        cancelLoop: function() {
            if (this.mainLoop !== null) {
                console.log("cancelLoop mainLoop : " + this.mainLoop);
                // cancelAnimationFrame( this.mainLoop );
                clearTimeout(this.mainLoop);
                this.mainLoop = null;
            }
        },

        toRender: true,
        _timeBlank: 0,
        run: function() {

            if (this.state == Game.RUNNING) {

                this.doNextLoop();
                var now = this.timer.tick();
                var timeStep = this.timer.timeStep;

                this.gameTime += timeStep;

                this.frameCount++;
                timeStep = Math.min(timeStep, this.timeout << 1);

                if (this.staticTimeStep !== 0) {
                    timeStep = this.staticTimeStep;
                }

                this.handleInput(timeStep);

                if (this.beforeLoop(timeStep, now) === false) {
                    return;
                };

                if (this.paused) {
                    this.onPausing(timeStep, now);
                } else if (timeStep > 0) {
                    // timeStep=this.timeStep;
                    this.timer.runTasks(timeStep, now);

                    this.update(timeStep, now);

                    // * Plan A
                    // var t=this._timeBlank+timeStep;
                    // do{
                    //     this.update(this.timeStep);
                    //     t-=this.timeStep;
                    // }while(t>=this.timeStep)
                    // this._timeBlank=t;

                    // * Plan B
                    // this.update(this.timeStep);
                    // var d=timeStep-this.timeStep;
                    // if (this._timeBlank>=this.timeStep){
                    //     this.update(this.timeStep);
                    //     this._timeBlank=0;
                    // }else if(d>3){
                    //     this._timeBlank+=d;
                    // }

                    if (!this.pageHidden && this.toRender) {
                        this.render(timeStep, now);
                    }
                }

                this.afterLoop(timeStep, now);

            } else if (this.state == Game.STOP) {
                this.stopLoop();
            } else {
                this[this.state] && this[this.state]();
            }

        },
        onPausing: exports.noop,

        update: function(timeStep, now) {
            var c;
            if ((c = this.scene)) {
                if (c.handleInput) {
                    c.handleInput(timeStep);
                }
                c.update(timeStep, now);
            }
        },
        render: function(timeStep) {
            if (this.scene) {
                this.scene.render(this.context, timeStep);
            }
        },
        handleInput: exports.noop,
        beforeLoop: exports.noop,
        afterLoop: exports.noop,

        pause: function() {
            this.paused = 1;
            this.onPause();
        },
        onPause: exports.noop,

        resume: function() {
            this.paused = 0;
            this.onResume();
        },
        onResume: exports.noop,
        exit: exports.noop,

        geState: function() {
            return this.state;
        },

        isRunning: function() {
            return this.state == Game.RUNNING;
        },

        destructor: function() {
            this.scene = null;
        }

    };

    for (var p in proto) {
        Game.prototype[p] = proto[p];
    }

    Game.RUNNING = "playing";
    Game.PAUSE = "pause";
    Game.STOP = "stop";


})(this);
