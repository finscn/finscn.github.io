;
(function(scope, undefined) {
    "use strict";


    var FrameCounter = scope.FrameCounter = function(cfg) {
        for (var property in cfg) {
            this[property] = cfg[property];
        }
        if (this.useAvg) {
            this.tick=this.tickAvg;
        } else {
            this.tick=this.tickRecently;
        }
    };

    FrameCounter.prototype = {
        constructor: FrameCounter,
        id: "FPSCounterBar",
        avg: false,
        time: 0,
        avgTime: 0,
        FPS: 60,
        _count: 0,
        frame: 0,
        start: 0,

        useAvg: false,

        reset: function() {
            this._count = this.FPS;
            this.lastTickTime = Date.now();

            this.avgTime = 1000 / this.FPS;
            this.lastTime = this.lastTickTime;
            this.tick = this.avg ? this.avgTick : this.tickRecently;

            this.lastValue = 0;
            this.value = this.FPS;
        },

        render: function(context) {

        },

        update: function(context) {
        	this.tick(context);
        },


        tickAvg: function(context) {
            this._count--;
            var now = Date.now();
            this.avgTime = this.avgTime * 0.9 + (now - this.lastTime) * 0.1;
            this.lastTime = now;
            if (this._count == 0) {
                this._count = this.FPS;
                this.lastValue = this.value;
                this.value = (10000 / this.avgTime >> 0) / 10;
                // this.render(context);
            }
        },
        tickRecently: function(context) {
            this._count--;
            if (this._count == 0) {
                this._count = this.FPS;
                var now = Date.now();
                var fps = 10000 * this.FPS / (now - this.lastTickTime);
                this.lastTickTime = now;
                this.lastValue = this.value;
                this.value = (fps >> 0) / 10;
                // this.render(context);
            }
        }
    };

}(this));
