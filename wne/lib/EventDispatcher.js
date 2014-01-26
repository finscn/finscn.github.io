"use strict";

(function(exports, undefined) {


    var EventDispatcher = exports.EventDispatcher = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this._listeners = {};
    }

    var proto = {

        constructor: EventDispatcher,

        _listeners: null,

        apply: function(object, override) {
            var proto = EventDispatcher.prototype;
            override=override!==false;
            (override || !object._listeners) && (object._listeners = {});
            (override || !object.addEventListener) && (object.addEventListener = proto.addEventListener);
            (override || !object.hasEventListener) && (object.hasEventListener = proto.hasEventListener);
            (override || !object.removeEventListener) && (object.removeEventListener = proto.removeEventListener);
            (override || !object.dispatch) && (object.dispatch = proto.dispatch);
            (override || !object.getEventListeners) && (object.getEventListeners = proto.getEventListeners);
            (override || !object.removeEventListeners) && (object.removeEventListeners = proto.removeEventListeners);

        },

        addEventListener: function(type, listener) {
            var listeners = this._listeners;
            if (listeners[type] === undefined) {
                listeners[type] = [];
            }
            if (listeners[type].indexOf(listener) === -1) {
                listeners[type].push(listener);
            }
        },

        hasEventListener: function(type, listener) {
            var listeners = this._listeners;
            if (listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1) {
                return true;
            }
            return false;
        },

        removeEventListener: function(type, listener) {
            var listeners = this._listeners[type];
            if (listeners !== undefined) {
                var index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                    return listener;
                }
            }
            return null;
        },

        dispatch: function(type, args) {
            var listeners = this._listeners[type];
            args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].apply(this, args);
            }
        },

        getEventListeners: function(type) {
            if (!type) {
                return this._listeners;
            }
            return this._listeners[type];
        },

        removeEventListeners: function(type) {
            if (!type) {
                var ls = this._listeners;
                this._listeners = {};
                return ls;
            }
            var ls = this._listeners[type] || null;
            if (ls) {
                this._listeners[type] = [];
            }
            return ls;
        },

    };

    for (var p in proto) {
        EventDispatcher.prototype[p] = proto[p];
    }

}(this));
