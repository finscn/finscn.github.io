"use strict";


(function(exports, undefined) {

    function Panel(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Panel.prototype.xclass = "Panel";
    UIClass["Panel"] = Panel;

    exports.Panel = Class.create(Panel, {

        id: "Panel",
        // mask: true,
        visible: false,
        disabled: false,
        relative: true,

        show: function(cb) {
            this.visible = true;
            this.showCallback = cb;
        },
        hide: function(cb) {
            this.visible = false;
            this.hideCallback = cb;
        },
        touchStart: function(x, y, id, list) {
            return this.checkTouch("touchStart", x, y, id, this.children);
        },
        touchEnd: function(x, y, id, list) {
            return this.checkTouch("touchEnd", x, y, id, this.children);
        },
        tap: function(x, y, id, list) {
            return this.checkTouch("tap", x, y, id, this.children);
        },
        update: function(timeStep, now) {
            // TODO
        },
        renderSelf: function(context, timeStep, now) {
            // TODO
        },
        onRender: function(context, timeStep, now) {
            // TODO
        },

    }, Component);


}(exports));
