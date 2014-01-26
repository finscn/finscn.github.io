function $TODO(msg) {
    var line = null;
    try {
        var err = new Error();
        var lines = err.stack.split('\n');
        line = lines[2];
    } catch (e) {

    }
    if (!$TODO.displayed[msg + line]) {
        console[console.error ? "error" : "log"]("    // TODO : " + msg);
        $TODO.displayed[msg + line] = true;
        line && console.log(line);
    }
}
$TODO.displayed = {};


;
(function(_this) {

    if (typeof exports == "undefined") {
        var _exports = window || _this;
        _exports.exports = _exports;
    }

}(this));

(function(exports) {

    if (typeof require == "undefined") {
        exports.require = function(url) {
            console.log("require : ", url);
            return exports;
        }
    }

}(exports));


;
(function(exports, undefined) {
    'use strict';

    var noop = exports.noop = function() {};

    var merger = exports.merger = function(receiver, supplier, override) {
        for (var key in supplier) {
            if (override !== false || !(key in receiver)) {
                receiver[key] = supplier[key];
            }
        }
        return receiver;
    }


    merger(exports, {

        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        HALF_PI: Math.PI / 2,
        DOUBLE_PI: Math.PI * 2,

        random: function(min, max) {
            return (max - min) * Math.random() + min;
        },

        randomInt: function(min, max) {
            return ((max - min + 1) * Math.random() + min) >> 0;
        },
        generateRandomFunction: function(seed) {
            return function() {
                seed = (214013 * seed + 2531011) % 0x100000000;
                return seed / 4294967296;
            };
        },
        parseUrl: function(url) {
            //       ht[1] ://   t.cn:80[3]      :port[4] /path[5]   ?query[6] #anchor[7]
            var m = /^(\w*):?\/\/((\/?[^\/\?#:]+)(:\d+)?)(\/[^\?#]*)?(\?[^#]*)?(#.*)?$/i.exec(url);
            if (!m) return null;
            var ret = {
                scheme: m[1] || 'http',
                domain: m[3],
                port: m[4] && parseInt(m[4].substring(1)),
                path: m[5] || '/',
                query: m[6] || '',
                anchor: m[7] || ''
            };
            ret.root = ret.scheme + '://' + m[2];
            ret.pathquery = ret.path + ret.query;
            return ret;
        },
        cleanArray: function(list) {
            var last = list.length - 1;
            for (var i = last; i >= 0; i--) {
                if (list[i] === undefined) {
                    list[i] = list[last];
                    last--;
                }
            }
            list.length = last + 1;
            return list;
        },
        removeItem: function(array, item) {
            var idx = array.indexOf(item);
            if (idx != -1) {
                array.splice(idx, 1);
                return item;
            }
        },
        arrayShuffle: function(arr) {
            for (var i = arr.length - 1; i > 0; i--) {
                var rnd = (Math.random() * i) >> 0;
                var temp = arr[i];
                arr[i] = arr[rnd];
                arr[rnd] = temp;
            }
            return arr;
        },
        randomPick: function(list) {
            return list[Math.random() * list.length >> 0];
        },
        arrayTo2d: function(array, cols) {
            cols = cols || 1;
            var array2d = [];
            var rows = Math.floor((array.length + cols) / cols) - 1;
            var r = 0,
                c = 0,
                i = 0;
            for (r = 0; r < rows; r++) {
                array2d[r] = [];
                for (c = 0; c < cols; c++) {
                    array2d[r][c] = array[i++];
                }
            }
            return array2d;
        },

        /*
          a c e
          b d f

          [a,b,c,d,e,f]
        */
        matrixMultiply: function(m1, m2, dest) {
            var a11 = m1[0],
                a21 = m1[2],
                adx = m1[4],
                a12 = m1[1],
                a22 = m1[3],
                ady = m1[5];
            var b11 = m2[0],
                b21 = m2[2],
                bdx = m2[4],
                b12 = m2[1],
                b22 = m2[3],
                bdy = m2[5];

            dest = dest || [];
            dest[0] = a11 * b11 + a21 * b12;
            dest[1] = a12 * b11 + a22 * b12;
            dest[2] = a11 * b21 + a21 * b22;
            dest[3] = a12 * b21 + a22 * b22;
            dest[4] = a11 * bdx + a21 * bdy + adx;
            dest[5] = a12 * bdx + a22 * bdy + ady;
            return dest;
        },

        insertionSort: function(objs, comparer) {

            for (var i = 1, len = objs.length; i < len; i++) {
                var t = objs[i];
                for (var j = i; j > 0 && comparer(t, objs[j - 1]); j--) {
                    objs[j] = objs[j - 1];
                }
                objs[j] = t;
            }
        },

        cleanKeyState: function() {
            for (var key in exports.KeyState) {
                delete exports.KeyState[key];
            }
        },

        cloneSimple: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        cloneDeep: function(obj) {
            var target = {};
            for (var i in obj) {
                if (typeof(obj) === 'object') {
                    target[i] = clone_deep(obj[i]);
                } else {
                    target[i] = obj[i];
                }
            }
            return target;
        }

    });



    exports.randomSeed = generateRandomFunction(1024);

    exports.randomRange = function(min, max) {
        return (max - min) * randomSeed() + min;
    };

    exports.randomRangeInt = function(min, max) {
        return ((max - min + 1) * randomSeed() + min) >> 0;
    };

    // function KahanSum(input){
    //     var sum = 0;
    //     var c = 0 ;  
    //     for (var i = 0 ;i< input.length ;i++){
    //      var y=input[i]-c;
    //      var t=sum+y;
    //      c= (t - sum) - y;
    //      sum=t;
    //     }
    //     return sum;
    // }


}(exports));
