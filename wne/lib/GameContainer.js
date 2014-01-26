
"use strict";

(function(exports, undefined) {

    var GameContainer = exports.GameContainer = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key];
        }
    };


    GameContainer.prototype = {
        constructor: GameContainer,

        init: function(){
            this.initContainer();
            this.initViewport();
            this.initCanvas();
        },

        initContainer: function() {
            this.container = exports.$id(this.container) || this.container;
            if (typeof this.container == "string") {
                this._container = this.container;
                this.container = null;
            }
            // if (!this.container){
            //  this.container=document.createElement("div");
            //  document.body.appendChild(this.container);
            // }
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
            if (domStyle) {
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
    };


})(this);
