"use strict";

(function(exports, undefined) {

    var ID_SEED = 1;

    exports.Scenes = {};
    exports.Scene = Class.create({

        velScrollX: 0, //0.1,
        musicName: 2,
        musicIndex: 0,
        waveCount: 0,

        level: 1,

        init: function(game) {
            this.game = game;
            this.viewWidth = game.viewWidth;
            this.viewHeight = game.viewHeight;
            this.width = this.width || Infinity;
            this.height = this.height || Infinity;

            this.blocks = [];
            this.walls = [];
            this.waves = [];
            this.entities = [];
            this.shapeList = this.createShapes(this.blocksData, 1 / Config.renderScale);

            this.initBg();
            this.initCamera();

            this.music = Music[this.musicName];


        },

        initBg: function() {
            // TODO
            this.img = ResourcePool.get("bg-0");

        },

        initCamera: function() {
            var x = 0;
            var y = (this.height - this.viewHeight) / 2;
            this.camera = new Camera({
                x: x,
                y: y,
                width: this.viewWidth,
                height: this.viewHeight,
                minX: 0,
                minY: y, //0,
                maxX: Math.max(0, this.width - this.viewWidth),
                maxY: y, //Math.max(0,this.height - this.viewHeight),
            });

            this.camera.setPadding(
                this.viewHeight / 2 - 50,
                this.viewWidth / 2 - 50,
                this.viewHeight / 2 - 50,
                this.viewWidth / 2 - 50
            );

        },


        beforeRun: function() {
            var Me = this;

            game.totalTime=game.totalTime||0;
            game.totalHurt=game.totalHurt||0;

            this.worldViewWidth = this.viewWidth / Config.renderScale;
            this.worldViewHeight = this.viewHeight / Config.renderScale;

            this.worldWidth = this.width / Config.renderScale;
            this.worldHeight = this.height / Config.renderScale;

            this.world = new GameWorld({

            });
            this.world.init(this);


            this.footPrints = [];
            this.darks = [];
            this.dynamics = [];
            this.statics = [];

            this.player = this.createPlayer();

            this.createBlocks();


            this.camera.focus(this.player);
            this.x = this.camera.x;
            this.y = this.camera.y;
            this.win = false;
            this.ending = false;
            this.timeCount = 0;
            this.hurtCount = 0;

            this.createBalls();

            this.startPreview();

            game.uiManager.activate("GameHUD");

        },

        startPreview: function() {
            this.previewing = true;
        },

        stopPreview: function() {
            this.previewing = false;
            this.x = 0;
        },

        createBalls: function() {

            this.layers = [
                [],
                [],
                [],
            ];
            this.layersScale = [
                0.15,
                0.3,
                0.5
            ];
            var dw = this.width - this.viewWidth;

            for (var i = 0; i < 40; i++) {

                var layer = Math.random() * Ball.blurs.length >> 0;

                var r = Ball.radius[Math.random() * Ball.radius.length >> 0];
                var colorIdx = Math.random() * Ball.colors.length >> 0;
                var b = Ball.blurs[layer];
                var alpha = randomInt(9, 10) / 10;

                var scale = this.layersScale[layer];

                var c = new Ball({
                    sn: i,
                    layer: layer,
                    alpha: alpha,
                    radius: r,
                    colorIdx: colorIdx,
                    blur: b,
                    // y: randomInt(-10, -1) * 30
                    // x: randomInt(0, this.viewWidth / 25) * 25,
                    // y: randomInt(0, this.viewHeight / 30) * 30
                    x: randomInt(0, (this.viewWidth + dw * scale) / 30) * 30,
                    y: randomInt(1, this.viewHeight / 20 - 1) * 20,
                })
                c.init(this);
                this.layers[layer].push(c);
            }

        },
        addEntity: function(entity) {
            entity.id = entity.id || "entity_" + ID_SEED++;
            this.entities.push(entity);
        },

        createPlayer: function() {
            var player = new Player({
                level: this.darkLevel,
                x: this.startPointX / Config.renderScale,
                y: this.startPointY / Config.renderScale,
                // vertices: shapeData.polygon
            });
            player.init(this);

            this.dynamics.push(player);
            // this.addEntity(player);

            // this.dynamics.push(this.star);

            return player;
        },

        createShapes: function(shapesData, scale) {
            // group ---> shapeData
            var Me = this;
            var shapeList = [];
            shapesData.forEach(function(shapeData) {

                var ps = shapeData.polygon;
                var polygon = [];
                ps.forEach(function(v) {
                    var x = v[0] / Config.renderScale;
                    var y = v[1] / Config.renderScale;
                    polygon.push([x, y])

                });
                var shape;
                if (shapeData.name == "end") {
                    Me.endLineX = shapeData.x;
                    Me.endLineImg = ResourcePool.get("endLine");
                } else if (shapeData.name == "start") {
                    Me.startPointX = shapeData.x;
                    Me.startPointY = shapeData.y;
                } else {
                    shape = new Polygon({
                        vertices: polygon,
                        type: BodyType.Dynamic,
                        // type: BodyType.Static,
                        // mass: Infinity,
                        // mass: Infinity,
                        // friction: 1,
                        // restitution: 1,

                        friction: 0.3,
                        restitution: 0.25,
                        damping: 0.4,
                        dampingAng: 1,
                        density: 0.8,
                        inertia: 10,
                    })

                    shape.w = shapeData.w;
                    shape.h = shapeData.h;
                    shape.level = shapeData.level || 0;
                    shape.isWall = shapeData.type == "Wall";
                    shapeList.push(shape);
                }
            });
            return shapeList;
        },


        createBlocks: function() {
            var shapeList = this.shapeList;
            var Me = this;
            shapeList.forEach(function(s) {
                if (s.isWall) {
                    s.type = BodyType.Static;
                    s.mass = Infinity;
                    s.friction = 1;
                    s.restitution = 1;
                    Me.createWall(s);

                } else {
                    Me.createBlock(s);

                }
            })

        },

        createBlock: function(shape) {

            // var level=randomInt(0,2);

            var levelList = Block.ratio[this.darkLevel];
            var level = levelList[Math.random() * levelList.length >> 0];

            var block = new Block({
                w: shape.w,
                h: shape.h,
                shape: shape,
                level: level, //shape.level,
            })
            block.init(this);
            this.blocks.push(block);
            this.dynamics.push(block);
            this.addEntity(block);


            return block;
        },
        createWall: function(shape) {


            var wall = new Wall({
                w: shape.w,
                h: shape.h,
                shape: shape
            })
            wall.init(this);
            this.walls.push(wall);
            this.statics.push(wall);
            this.addEntity(wall);


            return wall;
        },

        isCompleted: function() {

            if (this.player.x > this.endLineX + 32) {
                return true;
            }
        },
        touchStart: function(x, y, id) {
            console.log("touchStart", x, y, id);
            this.touchX = x * window.devicePixelRatio;
            this.touchY = y * window.devicePixelRatio;
            this.touched = true;
            if (!this.previewing) {
                this.toAddWave = true;
            }
        },

        touchMove: function(x, y, dx, dy, id) {
            // console.log("touchMove",x, y,dx,dy, id);
            var dis = Math.abs(dx) + Math.abs(dy);
            this.moveDis += dis;
            this.touchX = x * window.devicePixelRatio;
            this.touchY = y * window.devicePixelRatio;
        },

        touchEnd: function(x, y, id) {
            console.log("touchEnd", x, y, id)
            this.touched = false;
            // this.toAddWave=false;
            this.moveDis = 0;
        },

        tap: function(x, y, id) {
            console.log("tap", x, y, id)
            this.touched = false;
            // this.toAddWave=false;
            this.moveDis = 0;
            if (this.previewing) {
                this.stopPreview();
            }
        },


        handleInput: function(timeStep) {


        },

        toAddWave: false,
        touched: false,
        touchX: -1,
        touchY: -1,
        moveDis: 0,

        updateCount: 0,

        previewStep: 2,
        update: function(timeStep, now) {

            if (this.previewing) {
                this.x += this.previewStep;
                if (this.x > this.camera.maxX) {
                    this.previewStep = -this.previewStep;
                    this.x = this.camera.maxX
                }
                if (this.x < 0) {
                    this.x = 0;
                    this.previewing = false;
                }
                this.player.update(timeStep, now);
                return;
            }
            this.updateCount++;


            // if (this.game.toRestart) {
            //     this.onRestart();
            //     return;
            // }
            // this.win = this.isCompleted();
            // if (this.win && !this.submited) {
            //     this.onCompleted();
            // } else if (this.isGameOver()) {
            //     this.onGameOver();
            // }
            if (this.win && !this.ending) {
                this.ending = true;
                game.totalTime += this.timeCount;
                game.totalHurt += this.hurtCount;
                UIAction.next();
            } else {
                if (this.timeCount !== 0) {
                    this.timeCount += timeStep;
                }
            }

            if (!this.win && this.toAddWave) {
                this.addWave(this.touchX, this.touchY);
            } else {
                var holdAdd = false;
                if (holdAdd && this.touched && this.moveDis > 100 * (window.devicePixelRatio || 1)) {
                    this.addWave(this.touchX, this.touchY);
                    this.moveDis = 0;
                }
                // if (this.touched && now-this.lastAddWave>500){
                //     this.addWave(this.touchX, this.touchY);
                // }
            }
            this.updateWaves(timeStep);

            this.player.update(timeStep, now);


            this.world.step(1 / 60);

            this.camera.focus(this.player);
            this.x = this.camera.x;
            this.y = this.camera.y;

            this.win = this.isCompleted();

        },

        updateWaves: function(timeStep) {
            var waves = this.waves;
            var i = 0,
                len = waves.length;
            while (i < len) {
                var wave = waves[i];
                wave.update(timeStep);

                if (wave.alpha <= 0) {
                    wave._to_remove_ = true;
                    wave.shape._to_remove_ = true;
                    waves.splice(i, 1);
                    len--;
                    this.waveCount--;
                    continue;
                }
                i++;
            }
        },

        addWave: function(x, y) {

            x += this.x;
            y += this.y;
            x /= Config.renderScale;
            y /= Config.renderScale;

            if (this.timeCount === 0) {
                this.timeCount = 1;
            }
            if (this.waveCount > 10) {
                return false;
            }
            var disabled = false;
            if (this.player.shape.containPoint(x, y)) {
                disabled = true;
            }
            // if (this.star.isInBall(x, y)) {
            // if (this.star.shape.containPoint(x, y)) {
            //     disabled = true;
            // }

            this.waveCount++;
            var wave = new Wave({
                x: x,
                y: y,
                disabled: disabled
            });
            wave.id = "wave_" + ID_SEED++;
            wave.init(this);

            this.waves.push(wave);

            Note.play(this.music[this.musicIndex]);
            this.musicIndex = ++this.musicIndex % this.music.length;

            this.toAddWave = false;
            this.lastAddWave = Date.now();
            return wave;
        },


        afterLoop: function(timeStep) {

        },

        render: function(context, timeStep) {


            context.fillStyle = BgColors[this.darkLevel];
            context.fillRect(0, 0, game.viewWidth, game.viewHeight);

            var Me = this;
            this.layers.forEach(function(layer, layerIdx) {
                layer.forEach(function(c, idx) {
                    c.x = c.ox - Me.x * Me.layersScale[layerIdx];
                    c.y = c.oy - Me.y * Me.layersScale[layerIdx];
                    c.render(context);
                });
            });


            context.save();

            context.translate(-this.x, -this.y);

            // context.fillStyle = "rgba(255,255,255,0.6)";
            // context.fillRect(this.endLineX, 0, 4, this.height);
            context.drawImage(this.endLineImg,
                0, 0,
                this.endLineImg.width / 2, this.endLineImg.height,
                this.endLineX - 40, 0, 40, this.height);


            this.renderEntites(context, this.entities, timeStep);
            this.renderEntites(context, this.waves, timeStep);
            this.renderEntites(context, this.footPrints, timeStep);
            this.player.render(context, timeStep);

            context.restore();

            this.renderEntites(context, this.darks, timeStep);

            // context.font = "18px DINCondensed-Bold";
            // var sec = Math.round(this.timeCount / 100);
            // context.fillStyle = "#ffffff";
            // context.fillText((sec / 10 >> 0) + "." + sec % 10, 50, 90);
            // context.fillText(this.hurtCount, 50, 120);

        },

        renderEntites: function(context, entities, timeStep) {
            var i = 0,
                len = entities.length;
            while (i < len) {
                var entity = entities[i];
                if (entity._to_remove_) {
                    entities.splice(i, 1);
                    len--;
                    continue;
                }
                entity.render(context, timeStep);
                i++;
            }
            context.globalAlpha = 1;
        },


        destructor: function(game) {

        }

    });


}(exports));
