"use strict";


(function(exports, undefined) {

    function FadePage(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    FadePage.prototype.xclass = "FadePage";
    UIClass["FadePage"] = FadePage;

    exports.FadePage = Class.create(FadePage, {

        id: "FadePage",
        mask: false,
        modal: true,
        zIndex: 1000,
        visible: false,
        relative: false,
        disabled: false,
        margin: 0,

        color: "#ffffff",
        startAlpha:0,
        maxAlpha:1,
        endAlpha:0,
        stepAlpha:0.05,
        defaultStepAlpha:0.05,
        onInit: function(game) {


        },
        show: function() {
            this.visible = true;
            this.alpha=this.startAlpha;
            this.showing=true;
            this.hidding=false;
        },
        afterShow: function(){

        },
        afterHide:function(){
            this.game.uiManager.inactivate(this.id);
        },
        update: function(){
            if (this.showing){
                if (this.alpha>this.maxAlpha){
                    this.hidding=true;
                    this.showing=false;
                    this.afterShow();
                }
                this.alpha+=this.stepAlpha;
            }else if (this.hidding){
                if (this.alpha<=this.endAlpha){
                    this.afterHide();
                }
                this.alpha-=this.stepAlpha;
            }
        },
        render: function(context, timeStep, now) {
            if (!this.visible || this.alpha <= 0) {
                return false;
            }
            context.globalAlpha = Math.max(0,Math.min(1,this.alpha));
            context.fillStyle = this.color;
            context.fillRect(this.ax, this.ay, this.width, this.height);
            context.globalAlpha = 1;
        },

    }, Component);


}(exports));
