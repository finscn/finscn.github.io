"use strict";

(function(exports, undefined) {

    var DataStore = exports.DataStore = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key];
        }
    };

    DataStore.ID_SEED = 0;

    var proto = {

        constructor: DataStore,

        _data: null,

        withId: false,

        serializePrefix: ">>S<<",

        init: function() {
            this._data = {};
            this.id = this.id || "DS_" + DataStore.ID_SEED++;
            if (this.withId) {
                this.keyPrefix = this.id + "@";
            } else {
                this.keyPrefix = "";
            }
        },

        get: function(key) {
            return this._data[key]
        },

        set: function(key, value) {
            this._data[key] = value;
        },
        remove: function(key) {
            var value = this._data[key];
            delete this._data[key]
            return value;
        },
        removeAll: function() {
            this._data = {};
        },
        update: function(key, objValue) {
            var dataOrig = this._data[key] || {};
            for (var key in objValue) {
                dataOrig[key] = objValue[key];
            }
            this._data[key] = dataOrig;
            return dataOrig;
        },

        persist: function() {
            var s = this.serialize();
            window.localStorage.setItem(this.serializePrefix + "@" + this.id, s);
            return s;
        },

        depersist: function() {
            var s = window.localStorage.getItem(this.serializePrefix + "@" + this.id);
            return this.deserialize(s);
        },

        serialize: function() {
            return JSON.stringify(this._data);
        },

        deserialize: function(s, override) {
            var data = s ? JSON.parse(s) : {};
            if (override) {
                this._data = data;
            } else {
                for (var key in data) {
                    this.set(key, data[key]);
                }
            }
            return data;
        },

        save: function(key, value) {
            if (arguments.length == 1) {
                value = this.get(key);
            } else {
                this.set(key, value);
            }
            window.localStorage.setItem(this.keyPrefix + key, value);
        },
        load: function(key, parse) {
            var value = window.localStorage.getItem(this.keyPrefix + key);
            if (parse){
                value=this.parseValue(value);
            }
            this.set(key, value);
            return value;
        },
        delete: function(key) {
            var value = window.localStorage.getItem(this.keyPrefix + key);
            window.localStorage.removeItem(this.keyPrefix + key);
            this.remove(key);
            return value;
        },

        clear: function() {
            for (var key in this._data) {
                window.localStorage.removeItem(this.keyPrefix + key);
            }
            window.localStorage.removeItem(this.serializePrefix + "@" + this.id);
            this._data = {};
        },

        parseValue: function(v) {
            if (v === null || v === undefined) {
                return v;
            }
            if (v === "true") {
                v = true;
            } else if (v === "false") {
                v = false;
            } else if (v === "null") {
                v = null;
            } else if (v === "undefined") {
                v = undefined;
            } else if (!isNaN(Number(v))) {
                v = Number(v);
            }
            return v;
        },

        clean: function() {

        }

    };

    for (var p in proto) {
        DataStore.prototype[p] = proto[p];
    }

}(this));
