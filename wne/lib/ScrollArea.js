"use strict";

var ScrollArea = function(cfg) {

    for (var key in cfg) {
        this[key] = cfg[key];
    }
};

ScrollArea.all = {};
ScrollArea.SN = 1;

ScrollArea.prototype = {

    h: true,
    v: true,
    dom: null,

    task: null,

    damping: null,

    init: function() {
        this.sn = ScrollArea.SN++;
        this.id = this.id || this.sn;

        this.dom = this.dom || document.getElementById(this.id);
        // this.transitionEnable();

        this.slider = new Slider({});
        if (this.damping) {
            this.slider.damping = this.damping;
        }

        this.reset();

        ScrollArea.all[this.id] = this;
        // test
    },

    reset: function(cb) {
        var Me = this;
        this.stopScroll();
        setTimeout(function() {
            Me.x = 0;
            Me.y = 0;
            Me.minX = Math.min(0, -(Me.dom.offsetWidth - Me.dom.parentNode.clientWidth));
            Me.minY = Math.min(0, -(Me.dom.offsetHeight - Me.dom.parentNode.clientHeight));
            Me.maxX = 0;
            Me.maxY = 0;

            Me.slider.reset();
            Me.scrollBy(0, 0);
            if (cb) {
                cb();
            }
        }, 16);


    },

    destructor: function() {

    },

    setPosition: function(x, y) {
        this.dom.style.left = x + "px";
        this.dom.style.top = y + "px";
    },

    setTranslate: function(x, y) {
        // this.dom.style.webkitTransform="translate("+x+"px,"+y+"px) translateZ(0)"
        this.dom.style.webkitTransform = "translate3d(" + x + "px," + y + "px, 0px)";
        this.dom.style.msTransform = "translate3d(" + x + "px," + y + "px, 0px)";
        this.dom.style.transform = "translate3d(" + x + "px," + y + "px, 0px)";
    },

    transitionEnable: function() {
        // this.dom.classList.add("slide");
        this.transition = true;
        this.dom.style.webkitTransitionTimingFunction = "ease-out";
        this.dom.style.webkitTransitionProperty = "-webkit-transform";
        this.dom.style.webkitTransitionDuration = "300ms";
        this.dom.style.msTransitionTimingFunction = "ease-out";
        this.dom.style.msTransitionProperty = "-ms-transform";
        this.dom.style.msTransitionDuration = "300ms";
        this.dom.style.transitionTimingFunction = "ease-out";
        this.dom.style.transitionProperty = "transform";
        this.dom.style.transitionDuration = "300ms";
    },

    transitionDisable: function() {
        // this.dom.classList.remove("slide");
        this.transition = false;
        this.dom.style.webkitTransitionProperty = "none";
        this.dom.style.webkitTransitionDuration = "0ms";
        this.dom.style.msTransitionProperty = "none";
        this.dom.style.msTransitionDuration = "0ms";
        this.dom.style.transitionProperty = "none";
        this.dom.style.transitionDuration = "0ms";
    },

    canScroll: function(dom, vx, vy) {
        if (!this.dom.contains(dom)) {
            return false;
        }
        if (arguments.length === 1) {
            return true;
        }
        var k = Math.abs(vy / vx);
        if (this.v && !this.h) {
            return k > 1;
        } else if (this.h && !this.v) {
            return k < 1;
        }
        return true
    },

    scrollTo: function(x, y) {
        this.x = x;
        this.y = y;
        this.setTranslate(this.x, this.y)
    },

    addIntervalTask: function() {
        if (this.task) {
            this.task[this.sn] = this;
        }
    },

    removeIntervalTask: function() {
        if (this.task) {
            delete this.task[this.sn];
        }
    },

    stopScroll: function() {
        this.transitionDisable();
        this.slider.stop();
        this.removeIntervalTask();
    },

    startScroll: function(vx, vy) {
        if (!this.h) {
            vx = 0;
        }
        if (!this.v) {
            vy = 0;
        }
        this.finished = false;

        // this.transitionEnable();
        this.slider.toStart = true;
        this.slider.start(vx, vy);

        this.addIntervalTask();
    },

    scrollBy: function(dx, dy, scrolling) {
        if (!this.h) {
            dx = 0;
        }
        if (!this.v) {
            dy = 0;
        }
        if (!scrolling && this.transition) {
            this.transitionDisable();
        }
        this.scrollTo(this.x + dx, this.y + dy)

    },

    update: function(timeStep) {
        // return;

        if (this.x < this.minX || this.x > this.maxX || this.y < this.minY || this.y > this.maxY) {
            this.removeIntervalTask();
            this.transitionEnable();

            this.x = Math.min(this.maxX, Math.max(this.minX, this.x));
            this.y = Math.min(this.maxY, Math.max(this.minY, this.y));
            this.setTranslate(this.x, this.y)
            return;
        }

        if (this.finished) {
            this.removeIntervalTask();
            return;
        }
        var scrolling = this.slider.update(timeStep);
        if (scrolling) {
            this.scrollBy(this.slider.dx, this.slider.dy, scrolling)
        } else {
            this.finished = true;
        }

    }

};
