"use strict";

(function(exports, undefined) {


    var ToggleButton = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    ToggleButton.prototype.xclass = "ToggleButton";
    UIClass["ToggleButton"] = ToggleButton;

    exports.ToggleButton = Class.create(ToggleButton, {

        id: null,
        text: null,

        off: false,

        onTap: function(x, y) {
            this.off = !this.off;
            if (this.off) {
                this.turnOff();
            } else {
                this.turnOn();
            }
        },

        turnOn: function() {
            this.off=false;
        },
        turnOff: function() {
            this.off=true;
        },

        renderOff: function(context) {

        },
        renderOn: function(context) {

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
                if (this.off){
                    this.renderOff(context);
                }else{
                    this.renderOn(context);
                }
            }
        }

    }, Button);

}(this));
