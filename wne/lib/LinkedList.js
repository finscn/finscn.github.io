"use strict";

(function(exports, undefined) {

    var LinkedList = exports.LinkedList = function() {
        this.head = {};
        this.tail = {};
        this.clear();
    };

    var proto = {

        length: 0,

        clear: function() {
            this.head._next = this.tail;
            this.tail._prev = this.head;
            this.head._prev = this.tail._next = null;
            this.length = 0;
        },

        push: function(node) {
            node._prev = this.tail._prev;
            node._next = this.tail;
            node._prev._next = this.tail._prev = node;
            this.length++;
        },

        pop: function(n) {
            n = Math.min(n || 1, this.length);
            var node = this.tail._prev;
            while (n > 0) {
                node = node._prev;
                n--;
                this.length--;
            }
            node._next = this.tail;
            this.tail._prev = node;
        },

        unshift: function(node) {
            node._next = this.head._next;
            node._prev = this.head;
            node._next._prev = this.head._next = node;
            this.length++;
        },

        shift: function(n) {
            n = Math.min(n || 1, this.length);
            var node = this.head._next;
            while (n > 0) {
                node = node._next;
                n--;
                this.length--;
            }
            node._prev = this.head;
            this.head._next = node;
        },

        remove: function(node) {
            node._prev._next = node._next;
            node._next._prev = node._prev;
            node._next = node._prev = null;
            this.length--;
        },

        addNodes: function(args) {
            for (var i = 0, len = arguments.length; i < len; i++) {
                this.push(arguments[i]);
            }
        },

        moveAfter: function(node, afterNode) {
            node._prev._next = node._next;
            node._next._prev = node._prev;

            node._next = afterNode._next;
            node._prev = afterNode;
            node._next._prev = afterNode._next = node;
        },

        moveBefore: function(node, beforeNode) {
            node._prev._next = node._next;
            node._next._prev = node._prev;

            node._prev = beforeNode._prev;
            node._next = beforeNode;
            node._prev._next = beforeNode._prev = node;
        },

        insertAfter: function(node, afterNode) {
            node._next = afterNode._next;
            node._prev = afterNode;
            node._next._prev = afterNode._next = node;
            this.length++;
        },

        insertBefore: function(node, beforeNode) {
            node._prev = beforeNode._prev;
            node._next = beforeNode;
            node._prev._next = beforeNode._prev = node;
            this.length++;
        },

        replace: function(node1, node2) {
            node2._next = node1._next;
            node2._prev = node1._prev;
            node2._next._prev = node2;
            node2._prev._next = node2;
            return node1;
        },

        swap: function(node1, node2) {
            node1._prev._next = node2;
            var tmp = node2._prev;
            node2._prev = node1._prev;
            node1._prev = tmp;
            tmp._next = node1;

            node1._next.prev = node2;
            tmp = node2._next;
            node2._next = node1._next;
            node1._next = tmp;
            tmp._prev = node1;

        },

        indexOf: function(nodeI) {
            var node = this.head;
            var idx = 0;
            while ((node = node._next) != this.tail) {
                if (nodeI === node) {
                    return idx;
                }
                idx++;
            }
            return -1;
        },

        isHead: function(node) {
            return node === this.head;
        },

        isTail: function(node) {
            return node === this.tail;
        },

        first: function() {
            return this.head._next;
        },

        last: function() {
            return this.tail._prev;
        },

        isFirst: function(node) {
            return node == this.first();
        },

        isLast: function(node) {
            return node == this.last();
        },

        circle: function() {
            var last = this.last();
            var first = this.first();
            last._next = this.first();
            first._prev = last;
        },

        uncircle: function() {
            this.last()._next = this.tail;
            this.first()._prev = this.head;
        },

        getNodeByIndex: function(index) {
            index || 0;
            var node = this.head;
            for (var i = 0; i < index; i++) {
                node = node._next;
            }
            return node;
        },

        forEach: function(fn) {
            var rsList = [];
            var node = this.head;
            var idx = 0;
            while ((node = node._next) != this.tail) {
                var rs = fn(node, idx, this);
                rsList.push(rs);
                idx++;
            }
            return rsList;
        },

        some: function(fn) {
            var node = this.head;
            var idx = 0;
            while ((node = node._next) != this.tail) {
                var rs = fn(node, idx, this);
                if (rs === true) {
                    break;
                }
                idx++;
            }
        },

        map: function(fn) {
            var arr = [];
            var node = this.head;
            var idx = 0;
            while ((node = node._next) != this.tail) {
                var rs = fn(node, idx, this);
                arr.push(rs);
                idx++;
            }
            return arr;
        },

        toArray: function(clean) {
            var arr = this.map(function(node) {
                return node
            });
            if (clean) {
                arr.forEach(function(node) {
                    delete node._prev;
                    delete node._next;
                });
            }
            return arr;
        }
    };


    LinkedList.createNode = function(data) {
        return {
            data: data,
            _prev: null,
            _next: null
        };
    };

    for (var p in proto) {
        LinkedList.prototype[p] = proto[p];
    }



}(typeof exports == "undefined" ? this : exports));
