"use strict";

(function(exports, undefined) {


    var Button = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Button.prototype.xclass = "Button";
    UIClass["Button"] = Button;

    exports.Button = Class.create(Button, {

        id: null,
        touchId: null,
        text: null,
        visible: true,
        relative: true,

        down: false,
        disabled: false,
        tapOnly: false,

        touchStart: function(x, y, id) {
            if (!this.disabled && this.inRegion(x, y)) {
                this.touchId = id;
                this.down = true;
                return true;
            }
        },

        touchMove: function(x, y, id) {
            if (this.touchId === id) {
                if (!this.inRegion(x, y)) {
                    this.touchId = null;
                    this.down = false;
                }
            }
        },

        touchEnd: function(x, y, id) {
            if (!this.disabled && this.touchId === id) {
                this.touchId = null;
                this.down = false;
                if (!this.tapOnly && this.inRegion(x, y)) {
                    this.onTap(x, y, id);
                    return true;
                }
            }
        },

        tap: function(x, y, id) {
            // if (this.touchId === id) {
            this.touchId = null;
            this.down = false;
            if (!this.disabled && this.inRegion(x, y)) {
                this.onTap(x, y, id);
                return true;
            }
            // }
        },

        renderDisabled: function(context) {

        },
        renderDown: function(context) {
            this.fontSize = 16;
            context.font = this.fontSize + "px Arial";
            context.strokeStyle = "black";
            context.fillStyle = "black";
            this.renderBtn(context)
        },
        renderNormal: function(context) {
            this.fontSize = 20;
            context.font = this.fontSize + "px Arial";
            context.strokeStyle = "red";
            context.fillStyle = "red";
            this.renderBtn(context)

        },
        renderBtn: function(context) {
            var measure = context.measureText(this.text);
            measure.height = this.fontSize;
            var x = this.ax + (this.width - measure.width) / 2;
            var y = this.ay + this.height - (this.height - measure.height) / 2;
            context.strokeRect(this.ax, this.ay, this.width, this.height)
            context.fillText(this.text, x, y);
        },

        render: function(context) {
            if (!this.visible || this.alpha <= 0) {
                return false;
            }
            if (this.disabled) {
                this.renderDisabled(context);
            } else if (this.down) {
                this.renderDown(context);
            } else {
                this.renderNormal(context);
            }
        }

    }, Component);

}(this));
