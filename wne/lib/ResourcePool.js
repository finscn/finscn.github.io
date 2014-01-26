"use strict";

(function(exports, undefined) {


    exports.ResourcePool = {
        cache: {},
        _count: 0,

        blankImg: null,
        getImage: function(id, cb) {
            var res = ResourcePool.get(id);
            if (!res.lazy){
                return res;
            }
            var imgLoader = res;
            imgLoader.onLoad=function(){
                res.lazy=false;
                var rs=imgLoader.getResult();
                ResourcePool.cache[id] = rs;
                if (cb) {
                    cb(rs);
                }
            };
            imgLoader.start();
            return ResourcePool.get("blank");
        },

        get: function(id, clone) {
            var res = this.cache[id] || null;
            if (clone && res != null) {
                res = res.cloneNode(true);
            }
            // id && console.log(id);
            return res;
        },
        add: function(id, res) {
            this.cache[id] = res;
            this._count++;
        },
        remove: function(id) {
            var res = this.cache[id];
            delete this.cache[id];
            if (exports.isDom(res)) {
                exports.removeDom(res);
            }
            this._count--;
        },
        clear: function() {
            for (var id in this.cache) {
                this.remove(id);
            }
            this.cache = {};
            this._count = 0;
        },
        size: function() {
            return this._count;
        }
    };
}(this));
