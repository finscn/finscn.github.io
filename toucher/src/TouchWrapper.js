"use strict";

(function(exports, undefined) {

    var ns = exports.Toucher = exports.Toucher || {};
    var CONST = ns.CONST = ns.CONST || {};

    var TouchWrapper = ns.TouchWrapper = function(identifier) {
        this.identifier = identifier;
        this.id = identifier;
    };

    var proto = {
        constructor: TouchWrapper,

        pixelRatio: 1,

        start: function(rawTouch, rawEvent) {

            this.type = CONST.START;

            this.update(rawTouch, rawEvent);

            this.startPageX = this.lastPageX = this.pageX;
            this.startPageY = this.lastPageY = this.pageY;
            this.startTarget = this.lastTarget = this.target;

            // this.startClientX = this.lastClientX = this.clientX;
            // this.startClientY = this.lastClientY = this.clientY;

            this.deltaX = 0;
            this.deltaY = 0;
            this.moveAmountX = 0;
            this.moveAmountY = 0;

            this.touching = true;
            this.startTime = this.endTime = Date.now();

        },

        move: function(rawTouch, rawEvent) {

            this.type = CONST.MOVE;

            this.update(rawTouch, rawEvent);

            this.moveTime = Date.now();

        },

        end: function(rawTouch, rawEvent) {

            this.type = CONST.END;

            var deltaX = this.deltaX;
            var deltaY = this.deltaY;

            this.update(rawTouch, rawEvent);

            this.deltaX = deltaX;
            this.deltaY = deltaY;
            this.endPageX = this.pageX;
            this.endPageY = this.pageY;
            this.endTarget = this.target;

            // this.endClientX = this.clientX;
            // this.endClientY = this.clientY;

            this.touching = false;
            this.endTime = Date.now();

        },


        update: function(rawTouch, rawEvent) {

            this.rawEvent = rawEvent;
            this.rawTouch = rawTouch;

            this.lastTarget = this.target;
            this.lastPageX = this.pageX;
            this.lastPageY = this.pageY;
            // this.lastClientX = this.clientX;
            // this.lastClientY = this.clientY;

            this.target = rawTouch.target;
            this.pageX = rawTouch.pageX * this.pixelRatio;
            this.pageY = rawTouch.pageY * this.pixelRatio;
            // this.clientX = rawTouch.clientX * this.pixelRatio;
            // this.clientY = rawTouch.clientY * this.pixelRatio;

            this.deltaX = this.pageX - this.lastPageX;
            this.deltaY = this.pageY - this.lastPageY;
            this.moveAmountX = this.pageX - this.startPageX;
            this.moveAmountY = this.pageY - this.startPageY;

        }

    };

    for (var p in proto) {
        TouchWrapper.prototype[p] = proto[p];
    }

})(this);
