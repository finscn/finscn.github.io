"use strict";

var UIClass = {};

(function(exports, undefined) {

    function Component(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Component.prototype.xclass = "Component";
    UIClass["Component"] = Component;

    exports.Component = Class.create(Component, {

        id: null,
        name: null,
        mask: false,
        modal: false,

        x: 0,
        y: 0,
        width: 0,
        height: 0,
        alpha: 1,
        ax: 0,
        ay: 0,
        aa: 1,

        color: null,
        font: null,
        fontSize: null,
        backgroundImage: null,

        borderImage: null,
        borderWidth: null,
        padding: null,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        margin: null,
        marginTop: null,
        marginRight: null,
        marginBottom: null,
        marginLeft: null,

        cols: 1,
        rows: 1,
        centerX: false,
        centerY: false,

        index: 0,
        zIndex: 0,

        parent: null,
        children: null,

        relative: true,
        disabled: false,
        visible: false,

        data: null,

        init: function(game) {
            this.game = game;
            this.aabb = [];
            if (this.parent) {
                this.parent.addChild(this);
            }
            this.setPos(this.x, this.y);
            this.setSize(this.width, this.height);
            if (this.padding !== null) {
                this.setPadding(this.padding);
            } else {
                // this.setPadding(this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft);
            }
            if (this.margin !== null) {
                this.setMargin(this.margin);
            } else {
                // this.setMargin(this.marginTop, this.marginRight, this.marginBottom, this.marginLeft);
            }
            if (this.centerX) {
                this.alignCenterX();
            }
            if (this.centerY) {
                this.alignCenterY();
            }

            this.initChildren(game);
            // TODO
            this.onInit(game);
        },

        onInit: function(game) {
            // TODO
        },
        renderBorder: function(context, dx, dy, img, sx, sy, sw, sh) {
            dx = dx || 0;
            dy = dy || 0;
            img = img || this.borderImage;
            sx = sx || 0;
            sy = sy || 0;
            sw = sw || img.width;
            sh = sh || img.height;
            var bs = this.borderWidth;

            context.drawImage(img, sx, sy, bs, bs, dx, dy, bs, bs);
            context.drawImage(img, sx + bs, sy, sw - bs - bs, bs, dx + bs, dy, this.width - bs - bs, bs);
            context.drawImage(img, sx + sw - bs, sy, bs, bs, dx + this.width - bs, dy, bs, bs);

            context.drawImage(img, sx, sy + bs, bs, sh - bs - bs, dx, dy + bs, bs, this.height - bs - bs);

            context.drawImage(img, sx + sw - bs, sy + bs, bs, sh - bs - bs, dx + this.width - bs, dy + bs, bs, this.height - bs - bs);

            context.drawImage(img, sx, sy + sh - bs, bs, bs, dx, dy + this.height - bs, bs, bs);
            context.drawImage(img, sx + bs, sy + sh - bs, sw - bs - bs, bs, dx + bs, dy + this.height - bs, this.width - bs - bs, bs);
            context.drawImage(img, sx + sw - bs, sy + sh - bs, bs, bs, dx + this.width - bs, dy + this.height - bs, bs, bs);

        },

        reset: function() {

        },

        defer: function(fn, timeout) {
            this.game.timer.addTask(fn, timeout);
        },

        setData: function(data) {
            this.data = data;
            // TODO
        },

        handleInput: function(event) {
            if (this.disabled || !this.visible || this.alpha <= 0) {
                return;
            }
            // TODO
        },
        touchStart: function(x, y, id) {

        },
        touchMove: function(x, y, id) {

        },
        touchEnd: function(x, y, id) {

        },
        tap: function(x, y, id) {

        },

        checkTouch: function(type, x, y, id, list) {
            list = list || this.children;
            var last = list.length - 1;
            var rs = false;
            for (var i = last; i >= 0; i--) {
                var ui = list[i];
                if (!ui.visible || ui.alpha<=0){
                    continue;
                }
                rs = ui[type](x, y, id);
                if (rs || ui.modal || ui.mask) {
                    return rs;
                }
            }
            return rs;
        },

        updateSelf: function(timeStep, now) {
            // TODO
        },
        onUpdate: function(timeStep, now) {
            // TODO
        },

        renderSelf: function(context, timeStep, now) {
            if (!this.visible || this.alpha <= 0) {
                return;
            }
            // TODO
        },
        onRender: function(context, timeStep, now) {
            // TODO
        },

        remove: function() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            // TODO
            this.destructor();
        },

        setParent: function(parent) {
            this.parent = parent;
            this.setPos(this.x, this.y);
            this.setSize(this.width, this.height);
        },

        initChildren: function(game) {
            this.childSN = 0;
            this.children = [];
        },

        getChild: function(index) {
            return this.children[index];
        },
        addChild: function(child) {
            this.removeChild(child);
            child.index = this.childSN++;
            this.children.push(child);
            this.sortChildren();
            child.setParent(this);
        },
        sortChildren: function() {
            this.children.sort(function(a, b) {
                return a.zIndex - b.zIndex || a.index - b.index;
            });
        },
        hasChild: function(child) {
            return this.children.indexOf(child) != -1;
        },
        removeChild: function(child) {
            var idx = this.children.indexOf(child);
            if (idx != -1) {
                this.children.splice(idx, 1);
                child.parent = null;
            }
        },

        update: function(timeStep, now) {
            this.updateSelf(timeStep, now);
            this.children.forEach(function(c) {
                c.update(timeStep, now);
            });
            this.onUpdate(timeStep, now);
        },

        render: function(context, timeStep, now) {
            if (!this.visible || this.alpha <= 0) {
                return false;
            }
            if (this.mask) {
                this.renderMask(context, timeStep, now);
            }
            this.renderSelf(context, timeStep, now);
            this.children.forEach(function(c) {
                c.render(context, timeStep, now);
            });
            this.onRender(context, timeStep, now);
        },

        renderMask: function(context, timeStep, now) {
            context.fillStyle = "rgba(0,0,0,0.4)";
            context.fillRect(-1, -1, this.game.viewWidth + 2, this.game.viewHeight + 2);
        },

        setPos: function(x, y) {
            this.x = x;
            this.y = y;
            if (this.relative && this.parent) {
                x += this.parent.ax + this.parent.paddingLeft;
                y += this.parent.ay + this.parent.paddingTop;
            }
            this.ax = x;
            this.ay = y;
            this.updateAABB();
        },

        setPosX: function(x) {
            this.x = x;
            if (this.relative && this.parent) {
                x += this.parent.ax;
            }
            this.ax = x;
            this.updateAABB();
        },
        setPosY: function(y) {
            this.y = y;
            if (this.relative && this.parent) {
                y += this.parent.ay;
            }
            this.ay = y;
            this.updateAABB();
        },
        setSize: function(width, height) {
            this.width = width;
            this.height = height;
            this.updateAABB();
        },
        setAlpha: function(alpha) {
            this.alpha = alpha;
            if (this.relative && this.parent) {
                alpha *= this.parent.alpha;
            }
            this.aa = alpha;
        },
        updateChildrenPos: function() {
            if (this.children) {
                this.children.forEach(function(child) {
                    child.setPos(child.x, child.y);
                    child.updateChildrenPos();
                });
            }
        },
        updateAABB: function() {
            this.aabb[0] = this.ax;
            this.aabb[1] = this.ay;
            this.aabb[2] = this.ax + this.width;
            this.aabb[3] = this.ay + this.height;
        },

        show: function(cb) {
            this.visible = true;
            this.showCallback = cb;
            this.onShow(cb);
        },
        onShow: function(cb) {},
        hide: function(cb) {
            this.visible = false;
            this.hideCallback = cb;
            this.onHide(cb);
        },
        onHide: function(cb) {},

        isVisible: function() {
            return this.visible;
        },

        destructor: function() {
            this.game = null;
        },

        getChildrenCount: function() {
            return this.children.length;
        },

        inRegion: function(x, y) {
            var aabb = this.aabb;
            return aabb[0] < x && x < aabb[2] && aabb[1] < y && y < aabb[3];
        },

        collideAABB: function(aabb) {
            var aabb2 = this.aabb;
            return aabb[0] < aabb2[2] && aabb[2] > aabb2[0] && aabb[1] < aabb2[3] && aabb[3] > aabb2[1];
        },

        getParentWidth: function() {
            if (this.parent) {
                return this.parent.width;
            }
            return this.game.viewWidth;
        },
        getParentHeight: function() {
            if (this.parent) {
                return this.parent.height;
            }
            return this.game.viewHeight;
        },

        setPadding: function(top, right, bottom, left) {
            if (arguments.length < 2) {
                right = top;
                bottom = top;
                left = top;
            } else if (arguments.length === 2) {
                left = top;
                bottom = right;
                right = left;
                top = bottom;
            }
            this.paddingTop = top;
            this.paddingRight = right;
            this.paddingBottom = bottom;
            this.paddingLeft = left;
        },

        setMargin: function(top, right, bottom, left) {
            if (arguments.length < 2) {
                right = top;
                bottom = top;
                left = top;
            } else if (arguments.length === 2) {
                left = top;
                bottom = right;
                right = left;
                top = bottom;
            }
            var width = this.getParentWidth() - left - right;
            var height = this.getParentHeight() - top - bottom;
            this.setPos(left, top);
            this.setSize(width, height);
        },

        getInnerWidth: function() {
            return this.width - this.paddingLeft - this.paddingRight;
        },
        getInnerHeight: function() {
            return this.height - this.paddingTop - this.paddingBottom;
        },

        getTableInfo: function(cols, rows, spaceX, spaceY) {
            spaceX = spaceX || 0;
            spaceY = spaceY || spaceX;
            cols = cols || this.cols || 1;
            rows = rows || this.rows || 1;
            var innerW = this.width - this.paddingLeft - this.paddingRight;
            var innerH = this.height - this.paddingTop - this.paddingBottom;
            var cw = (innerW + spaceX) / cols >> 0;
            var ch = (innerH + spaceY) / rows >> 0;
            var tables = {};
            for (var r = 0; r < rows; r++) {
                var y = r * ch;
                for (var c = 0; c < cols; c++) {
                    var x = c * cw;
                    tables[c + "," + r] = [x, y];
                }
            }
            return tables;
        },
        getColX: function(colIdx, cols, spaceX) {
            spaceX = spaceX || 0;
            cols = cols || this.cols || 1;
            var innerW = this.width - this.paddingLeft - this.paddingRight;
            var cw = (innerW + spaceX) / cols >> 0;
            return cw * colIdx;
        },
        getRowY: function(rowIdx, rows, spaceY) {
            spaceY = spaceY || 0;
            rows = rows || this.rows || 1;
            var innerH = this.height - this.paddingTop - this.paddingBottom;
            var ch = (innerH + spaceY) / rows >> 0;
            return ch * rowIdx;
        },
        getCellWidth: function(colspan, cols, spaceX) {
            colspan = colspan || 1;
            spaceX = spaceX || 0;
            cols = cols || this.cols || 1;
            var innerW = this.width - this.paddingLeft - this.paddingRight;
            var cw = (innerW + spaceX) / cols >> 0;
            return cw * colspan - spaceX;
        },
        getCellHeight: function(rowspan, rows, spaceY) {
            rowspan = rowspan || 1;
            spaceY = spaceY || 0;
            rows = rows || this.rows || 1;
            var innerH = this.height - this.paddingTop - this.paddingBottom;
            var ch = (innerH + spaceY) / rows >> 0;
            return ch * rowspan - spaceY;
        },
        alignCenterXY: function() {
            var x = (this.getParentWidth() - this.width) / 2;
            var y = (this.getParentHeight() - this.height) / 2;
            this.setPos(x, y);
        },
        alignCenterX: function() {
            var x = (this.getParentWidth() - this.width) / 2;
            this.setPos(x, this.y);
        },
        alignCenterY: function() {
            var y = (this.getParentHeight() - this.height) / 2;
            this.setPos(this.x, y);
        },
        moveBy: function(x, y) {
            this.x += x;
            this.y += y;
            this.ax += x;
            this.ay += y;
        },

        getTextSize: function(context, text, size) {
            var measure = context.measureText(this.text);
            if (!size) {
                size = parseInt(context.font);
            }
            measure.height = size;
            return measure;
        }
    });

}(this));
