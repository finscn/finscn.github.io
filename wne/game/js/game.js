
"use strict";


var game=new Game({

    container: "container",

    FPS: Config.FPS,
    // staticTimeStep: Config.timeStep,

    width: Config.width,
    height: Config.height,

    resources : resourceList ,
    // onInit: function() {
    //     this.ready();
    // },

    loader : {
        wrapAudio : true,
        parallel : !true,
        deplay : 1,
        onProgressing: function(timeStep, queue) {
            var loaded = queue.finishedWeight,
                total = queue.totalWeight,
                results = queue.resultPool;

            var game=queue.parent;
            var canvas=game.canvas;
            var context=game.context;

            var w=400, h=16;
            var x=(game.viewWidth-w)/2,
                y=game.viewHeight-h-200;

            context.clearRect(0,0,game.viewWidth,game.viewHeight);
            context.strokeStyle="#ffffff";
            context.fillStyle="#ffffff";
            context.strokeRect(x,y,w,h);
            context.fillRect(x,y,w*loaded/total,h);

        },
    },

    onReady: function() {
        var Me = this;
            this.context.font="20px DINCondensed-Bold";
            this.context.fillText(" ",110,110);
            setTimeout(function(){
                 ImageCreator.initTextImages();

                game.initGameUI();

                UIAction.backHome();
                // // UIAction.quickplay();
                // UIAction.ending();

            },100);
    },
    beforeLoop: function(timeStep, now) {
        TWEEN.update();
    },
    afterLoop: function(timeStep, now) {
        if (this.paused) {
            this.render(0, now)
        }
        this.uiManager.update(timeStep, now);
        this.uiManager.render(this.context, timeStep, now);
    },
    initGameUI: function() {
        this.uiManager = new UIManager();
        this.uiManager.init(this);
        var Me = this;
        var list = [
            new HomePage(),
            new FadePage(),
            new GameHUD(),
            new EndingPage(),
        ];

        list.forEach(function(ui) {
            ui.init(Me);
            Me.uiManager.register(ui);
        })

    },
    getSceneInstance : function(index){
        var cfg=Maps["scene-"+index]
        var scene={
            index: index,
            darkLevel: cfg.darkLevel,
            width:cfg.w*cfg.tilewidth,
            height:cfg.h*cfg.tileheight,
            blocksData : cfg.layers[0].objects
        }
        this.sceneIndex=index;
        scene=new Scene(scene);

        return scene;
    },
    hasNextScene: function(){
        var index=this.sceneIndex+1;
        return !!Maps["scene-"+index];
    },
    nextScene: function(){
        if (this.hasNextScene()){
            return this.start(this.sceneIndex+1);
        }
        return false;
    },

});