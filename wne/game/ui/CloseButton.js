"use strict";

(function(exports, undefined) {


    var CloseButton = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    CloseButton.prototype.xclass = "CloseButton";
    UIClass["CloseButton"] = CloseButton;

    exports.CloseButton = Class.create(CloseButton, {

        width: 80,
        height: 80,
        iw: 102,
        ih: 107,
        img: "close",

        onTap: function(x, y) {
            this.game.uiManager.inactivate(this.parent.id);
            this.down = false;
        },


    }, IconButton);

}(this));
