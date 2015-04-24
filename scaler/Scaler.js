/**
 * Scaler.js - Licensed under the MIT license
 * https://github.com/finscn/scaler.js
 * ----------------------------------------------
 * A tool for auto scaling the size of something based on pixels ( fucking my terrible English ).
 * 基于像素的画面大小等比例缩放工具, 纯数值计算类工具.
 * 至于到底缩放什么(div canvas window...), 你自己说的算.
 *
 */


"use strict";

// 画面大小等比例缩放工具
var Scaler = function(options) {
    for (var p in options) {
        this[p] = options[p];
    }
    this.init();
};


// 设计稿不缩放, 在屏幕上居中
Scaler.CENTER = 1;

// 让设计稿宽高都填满屏幕(画面内容可能会有剪切)
Scaler.ASPECT_FILL = 2;

// 让设计稿完整显示在屏幕上(画面四周可能会出现空白)
Scaler.ASPECT_FIT = 3;

// 让设计稿的宽度填满屏幕(画面内容可能会有剪切)
Scaler.WIDTH_FIT = 4;

// 让设计稿的高度填满屏幕(画面内容可能会有剪切)
Scaler.HEIGHT_FIT = 5;

// 改变设计稿的宽高比例,以适应屏幕
Scaler.SCALE_FIT = 6;

Scaler.prototype = {
    constructor: Scaler,

    //设计稿尺寸
    width: null,
    height: null,

    // 屏幕尺寸 (实际的物理尺寸)
    screenWidth: 0,
    screenHeight: 0,

    // 缩放后的设计稿大小
    scaledWidth: null,
    scaledHeight: null,

    // 屏幕可视区域的逻辑尺寸
    fullWidth: 0,
    fullHeight: 0,

    // 设计稿在屏幕中的显示位置(按设计稿的单位)
    offsetX: null,
    offsetY: null,

    // 缩放方式
    scaleMode: Scaler.CENTER,

    // 缩放阈值 (需要缩放的比例过小时, 不进行缩放.)
    scaleThreshold: 0.02,

    // 缩放值
    scale: null,
    scaleX: null,
    scaleY: null,

    init: function() {
        this.screenWidth = this.screenWidth || this.width;
        this.screenHeight = this.screenHeight || this.height;
    },

    setSize: function(w, h) {
        this.width = w;
        this.height = h;
    },
    setScreenSize: function(w, h) {
        this.screenWidth = w;
        this.screenHeight = h;
    },

    setScaleMode: function(scaleMode) {
        this.scaleMode = scaleMode;
        this.update();
    },

    // 在需要计算缩放数值时,调用此方法.
    update: function() {
        switch (this.scaleMode) {
            case Scaler.ASPECT_FILL:
                this.doAspectFill();
                break;
            case Scaler.ASPECT_FIT:
                this.doAspectFit();
                break;
            case Scaler.WIDTH_FIT:
                this.doWidthFit();
                break;
            case Scaler.HEIGHT_FIT:
                this.doHeightFit();
                break;
            case Scaler.SCALE_FIT:
                this.doScaleFit();
                break;
            case Scaler.CENTER:
            default:
                this.doCenter();
                break;
        }
    },

    ///////////////////////////////////////////
    ////       开发者直接设置缩放比例         ////
    ////  以下 3个 setter 方法通常不需要使用  ////
    ///////////////////////////////////////////
    setScale: function(scale) {
        if (Math.abs(scale - 1) <= this.scaleThreshold) {
            scale = 1;
        }
        this.setScaleX(scale);
        this.setScaleY(scale);
        this.scale = scale;
    },
    setScaleX: function(scaleX) {
        this.scale = null;
        this.scaleX = scaleX;
        this.scaledWidth = this.width * this.scaleX;
        this.fullWidth = Math.ceil(this.screenWidth / this.scaleX);
        this.offsetX = (this.fullWidth - this.width) >> 1;
    },
    setScaleY: function(scaleY) {
        this.scale = null;
        this.scaleY = scaleY;
        this.scaledHeight = this.height * this.scaleY;
        this.fullHeight = Math.ceil(this.screenHeight / this.scaleY);
        this.offsetY = (this.fullHeight - this.height) >> 1;
    },


    ///////////////////////////////////////////
    ////  以下几个 do**** 方法通常不需要关心  ////
    ///////////////////////////////////////////
    doCenter: function() {
        this.scaleX = this.scaleY = this.scale = 1;
        this.scaledWidth = this.width;
        this.scaledHeight = this.height;
        this.fullWidth = this.screenWidth;
        this.fullHeight = this.screenHeight;
        this.offsetX = (this.fullWidth - this.width) >> 1;
        this.offsetY = (this.fullHeight - this.height) >> 1;
    },
    doWidthFit: function() {
        var scale = this.screenWidth / this.width;
        if (Math.abs(scale - 1) <= this.scaleThreshold) {
            scale = 1;
        }
        this.scaleX = this.scaleY = this.scale = scale;
        this.scaledWidth = this.screenWidth;
        this.scaledHeight = this.height * this.scaleY;
        this.fullWidth = this.width;
        this.fullHeight = Math.ceil(this.screenHeight / this.scaleY);
        this.offsetX = 0;
        this.offsetY = (this.fullHeight - this.height) >> 1;
    },
    doHeightFit: function() {
        var scale = this.screenHeight / this.height;
        if (Math.abs(scale - 1) <= this.scaleThreshold) {
            scale = 1;
        }
        this.scaleX = this.scaleY = this.scale = scale;
        this.scaledWidth = this.width * this.scaleX;
        this.scaledHeight = this.screenHeight;
        this.fullWidth = Math.ceil(this.screenWidth / this.scaleX);
        this.fullHeight = this.height;
        this.offsetX = (this.fullWidth - this.width) >> 1;
        this.offsetY = 0;
    },
    doScaleFit: function() {
        this.scaleX = this.screenWidth / this.width;
        this.scaleY = this.screenHeight / this.height;
        this.scale = null;
        this.scaledWidth = this.width * this.scaleX;
        this.scaledHeight = this.height * this.scaleY;
        this.fullWidth = Math.ceil(this.screenWidth / this.scaleX);
        this.fullHeight = Math.ceil(this.screenHeight / this.scaleY);
        this.offsetX = 0;
        this.offsetY = 0;
    },
    doAspectFill: function() {
        var designR = this.width / this.height;
        var screenR = this.screenWidth / this.screenHeight;
        if (designR >= screenR) {
            this.doHeightFit();
        } else {
            this.doWidthFit();
        }
    },
    doAspectFit: function() {
        var designR = this.width / this.height;
        var screenR = this.screenWidth / this.screenHeight;
        if (designR >= screenR) {
            this.doWidthFit();
        } else {
            this.doHeightFit();
        }
    },

};


////////////////////////////////////////////
////  以下为若干辅助函数, 非该工具核心功能  ////
////////////////////////////////////////////

// 缩放canvas, 改变canvas的像素比例.
Scaler.prototype.resizeCanvas = function(canvas, useTransform) {
    canvas.width = this.fullWidth;
    canvas.height = this.fullHeight;
    if (useTransform) {
        canvas.style.width = this.fullWidth + "px";
        canvas.style.height = this.fullHeight + "px";
        canvas.style.transformOrigin = "0 0";
        canvas.style.transform = "scale(" + this.scaleX + "," + this.scaleY + ")";
    } else {
        canvas.style.width = this.screenWidth + "px";
        canvas.style.height = this.screenHeight + "px";
    }
};

// 缩放普通dom元素, 其实这个意义不大.
Scaler.prototype.resizeDom = function(dom) {
    dom.style.width = this.fullWidth + "px";
    dom.style.height = this.fullHeight + "px";
    dom.style.transformOrigin = "0 0";
    dom.style.transform = "scale(" + this.scaleX + "," + this.scaleY + ")";
};
