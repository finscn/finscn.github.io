"use strict";

var UIClass = {};

(function(exports, undefined) {

    function UIManager(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    UIManager.prototype.xclass = "UIManager";
    UIClass["UIManager"] = UIManager;

    exports.UIManager = Class.create(UIManager, {

        constructor: UIManager,
        timer: null,
        activedList: null,
        activedStack: null,

        blockInput: false,
        blockLoop: false,

        cmps: null,

        init: function(game) {
            this.game = game;
            this.timer = game.timer;
            this.cmps = this.cmps || {};
            this.activedList = [];
            this.activedStack = [];
        },

        defer: function(fn, timeout) {
            this.timer.addTask(fn, timeout);
        },

        showUI: function(uiOrId, cb) {
            var ui = this.cmps[uiOrId] || uiOrId;
            if (!ui) {
                console.log(uiOrId)
            }
            if (!ui.visible) {
                ui.show(cb);
                return ui;
            }
            return false;
        },

        hideUI: function(uiOrId, cb) {
            var ui = this.cmps[uiOrId] || uiOrId;
            if (!ui) {
                console.log("the ui " + uiOrId + " is not in cmps");
            }
            if (ui && ui.visible) {
                ui.hide(cb);
                return ui;
            }
            return false;
        },

        updateUI: function(uiOrId, data, cb) {
            var ui = this.cmps[uiOrId] || uiOrId;
            if (!ui) {
                console.log(uiOrId)
            }
            ui.setData(data, cb);
        },

        register: function(ui) {
            this.cmps[ui.id] = ui;
        },
        unregister: function(uiOrId) {
            var id = uiOrId.id || uiOrId;
            delete this.cmps[id];
        },

        getUI: function(id) {
            return this.cmps[id];
        },

        activate: function(uiOrId) {
            var id = uiOrId.id || uiOrId;
            var ui = this.cmps[id];
            if (!ui){
                return ui;
            }
            if (ui.reset) {
                ui.reset();
            }
            this.showUI(ui);
            this.lastActived = ui;
            if (this.activedList.indexOf(ui) == -1) {
                this.activedList.push(ui);
                this.sortActivedList();
            }
            return ui;
        },
        inactivate: function(uiOrId) {
            var id = uiOrId.id || uiOrId;
            var ui = this.cmps[id];
            this.hideUI(ui);
            var idx = this.activedList.indexOf(ui);
            if (idx != -1) {
                this.activedList.splice(idx, 1);
            }
            return ui;
        },
        inactivateAll: function(excludeId) {
            var Me = this;
            var newIdx=0;
            this.activedList.forEach(function(ui,idx,list) {
                if (ui.id!==excludeId){
                    Me.hideUI(ui);
                }else{
                    list[newIdx++]=ui;
                }
            });
            this.activedList.length=newIdx;
        },
        
        sortActivedList: function() {
            this.activedList.sort(function(a, b) {
                return a.zIndex - b.zIndex;
            });
        },
        update: function(timeStep, now) {
            this.activedList.forEach(function(ui) {
                ui.update(timeStep, now);
            });
        },
        render: function(context, timeStep, now) {
            this.activedList.forEach(function(ui) {
                ui.render(context, timeStep, now);
            });
        },

        touchStart: function(x, y, id) {
            var last = this.activedList.length - 1;
            var rs = false;
            for (var i = last; i >= 0; i--) {
                var ui = this.activedList[i];
                rs = ui.touchStart(x, y, id);
                if (rs || ui.modal || ui.mask) {
                    return rs;
                }
            }
            return rs;
        },
        touchMove: function(x, y, id) {
            var last = this.activedList.length - 1;
            var rs = false;
            for (var i = last; i >= 0; i--) {
                var ui = this.activedList[i];
                rs = ui.touchMove(x, y, id);
                if (rs || ui.modal || ui.mask) {
                    return rs;
                }
            }
            return rs;
        },
        touchEnd: function(x, y, id) {
            var last = this.activedList.length - 1;
            var rs = false;
            for (var i = last; i >= 0; i--) {
                var ui = this.activedList[i];
                rs = ui.touchEnd(x, y, id);
                if (rs || ui.modal || ui.mask) {
                    return rs;
                }
            }
            return rs;
        },
        tap: function(x, y, id) {
            var last = this.activedList.length - 1;
            var rs = false;
            for (var i = last; i >= 0; i--) {
                var ui = this.activedList[i];
                rs = ui.tap(x, y, id);
                if (rs || ui.modal || ui.mask) {
                    return rs;
                }
            }
            return rs;
        },

    });

}(this));
