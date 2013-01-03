function Demo(cfg) {
    for (var key in cfg) {
        this[key] = cfg[key];
    }
}

Demo.prototype = {

    canvas: null,
    context: null,
    sprites: null,
    FPS: Config.FPS,
    init: function() {
        this.width= Config.width;
        this.height= Config.height;
        this.sprites = this.sprites || [];
        this.canvas = $id(this.canvas) || this.canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle="white";
        
        var s = this.canvas.parentNode.style;
        s.width = this.width + "px";
        s.height = this.height + "px";
        this.timeStep = 1000 / this.FPS;

        var Me = this;
        this.callRun = function() {
            Me.run();
        }
        this.bg = $id("bg");

        this.fpsReset();
    },
    run: function() {

        this.mainLoop = setTimeout(this.callRun, this.timeStep);

        this.frameCount++;
        this.update();
        this.clear();
        this.render();

        this.fpsUpdate();
    },

    update: function() {
        var timeStep = this.timeStep;
        this.sprites.forEach(function(s) {
            s.update(timeStep);
        })
    },

    fpsReset : function(){
        var style = {
            border: "solid 1px #ccc",
            position: "absolute",
            left: "1px",
            top: "1px",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.6)",
            minWidth: "160px",
            height: "55px",
            padding : "7px",
            fontSize: "30pt",
            zIndex: 99999
        }
        var div = document.createElement("div");
        div.innerHTML="Waiting";
        for (var p in style) {
            div.style[p] = style[p];
        }
        document.body.appendChild(div);

        this.fpsBar=div;

        this._count=this.FPS;
        this.lastFPS=0;
        this.currentFPS=this.FPS;
        this.avgTime=1000/this.FPS;
        this.lastTime=Date.now();
    },
    fpsUpdate : function(){
        this._count--;
        var now=Date.now();
        this.avgTime=this.avgTime*0.85+(now-this.lastTime)*0.15;
        this.lastTime=now;
        if (this._count==0){
            this._count=this.FPS;
            this.lastFPS=this.currentFPS;
            this.currentFPS=( 10000/this.avgTime>>0)/10;
            this.fpsBar.innerHTML="FPS:"+this.currentFPS;
        }
    },

    clear: function() {
        this.context.clearRect(0, 0, this.width, this.height);
    },
    renderBg: function() {
        if (!this.bg){
            return;
        }
        var ctx = this.context;

        
        // ctx.save();
        // ctx.translate(this.width,this.height);
        // ctx.scale(-1,-1);

        ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, 0, 50, this.width, this.height - 100);
        
        // ctx.restore();
    },

    render: function() {
        this.renderBg();

        var ctx = this.context;

        this.sprites.forEach(function(s) {
            s.render(ctx);
        });


    }
}