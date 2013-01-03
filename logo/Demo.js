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
    },
    run: function() {

        this.mainLoop = setTimeout(this.callRun, this.timeStep);

        this.frameCount++;
        this.update();
        this.clear();
        this.render();

    },

    update: function() {
        var timeStep = this.timeStep;
        this.sprites.forEach(function(s) {
            s.update(timeStep);
        })
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
        })
    }
}