"use strict";

(function(exports, undefined) {


    var Label = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Label.prototype.xclass = "Label";
    UIClass["Label"] = Label;

    exports.Label = Class.create(Label, {

        text: null,
        fontSize: 12,
        fontName: "Arial",
        fontStyle: "normal",
        color: null,
        width: 0,
        height: 0,
        visible: true,

        onInit: function(){
            this.fontStyleText=Font.getStyle(this.fontSize, this.fontName,this.fontStyle);
        },

        touchStart: function(x, y, id) {},

        touchMove: function(x, y, id) {},

        touchEnd: function(x, y, id) {},

        tap: function(x, y, id) {},

        renderDisabled: function(context) {

        },

        render: function(context) {
            if (!this.visible || this.alpha <= 0) {
                return false;
            }
            if (this.disabled) {
                this.renderDisabled(context);
            } else {
                if (this.color) {
                    context.fillStyle = this.color;
                }
                context.font = this.fontStyleText;
                var measure = context.measureText(this.text);
                measure.height = this.fontSize;
                var x = this.ax;
                var y = this.ay + measure.height;
                context.fillText(this.text, x, y);
            }
        }

    }, Component);

}(this));
