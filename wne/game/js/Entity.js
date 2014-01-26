"use strict";

var EntityClass = {};

(function(exports, undefined) {

    function Entity(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }


    exports.Entity = Class.create(Entity, {


        init: function(scene) {
            this.scene = scene;

        },

        update : function(timeStep){

        },

        render : function(context,timeStep){


        },

        destructor: function(game) {
            for (var p in this){
                this[p]=undefined;
            }
            this._to_remove_=true;
        }

    });


}(exports));