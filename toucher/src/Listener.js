"use strict";

(function(exports, undefined) {

    var ns = exports.Toucher = exports.Toucher || {};
    var CONST = ns.CONST = ns.CONST || {};

    var Listener = ns.Listener = function(cfg) {

        for (var property in cfg) {
            this[property] = cfg[property];
        }

    };

    // Use duck-type, GT-Toucher doesn't care the result of "instanceof"
    /* Use to create your custom-listener */
    Listener.extend = function(prototype) {
        var subclass = function(cfg) {
            for (var property in cfg) {
                this[property] = cfg[property];
            }
        };
        var cp = subclass.prototype;
        var sp = this.prototype;
        for (var p in sp) {
            cp[p] = sp[p];
        }
        for (var p in prototype) {
            cp[p] = prototype[p];
        }
        cp.constructor = subclass;
        subclass.extend = this.extend;
        subclass.$super = sp;
        subclass.superclass = this;
        return subclass;
    };

    var proto = {
        constructor: Listener,

        id: null,
        type: null,

        offsetLeft: 0,
        offsetTop: 0,

        order: 1,

        beforeInit: function() {},
        init: function() {
            this.beforeInit();

            // ... ...

            this.onInit();
        },
        onInit: function() {},

        /* Could be overridden by user */
        filterWrappers: function(type, wrappers, event, controller) {
            var validWrappers = [];
            for (var i = 0, len = wrappers.length; i < len; i++) {
                var wrapper = wrappers[i];
                if (this.filterWrapper(type, wrapper, event, controller)) {
                    validWrappers.push(wrapper)
                }
            }
            return validWrappers;
        },

        /* Implement by user */
        filterWrapper: function(type, wrapper, event, controller) {
            return false;
        },

        /* Implement by user */
        // function(vaildWrappers, event, controller){ }
        start: null,

        // function(vaildWrappers, event, controller){ }
        move: null,

        // function(vaildWrappers, event, controller){ }
        end: null,

        cancel: null

    };

    for (var p in proto) {
        Listener.prototype[p] = proto[p];
    }



})(this);
