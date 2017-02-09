"use strict";
var Config = {

    FPS: 30,
    useStaticTimeStep: true,
    devicePixelRatio: window.devicePixelRatio || 1,

    imgScale: 2,

    cardCount: 32,

    // width: 720,
    // height: 960,
    width: 640,
    // height: 832,
    height: 1020,
    // height: 1008,
    // height: 1140,

    // viewWidth: 640,
    // viewHeight: 960,

    scaleMinAspectRatio: 1 / 2,
    scaleMaxAspectRatio: 2 / 3 + 0.0001,

    loadingOptions: window.loadingOptions,
};

var AppVersion = AppVersion || "0.0.1";
var AppVerNum;
(function() {
    var numList = AppVersion.split(".");
    AppVerNum = 0;
    var count = numList.length;
    numList.forEach(function(n) {
        count--;
        var k = Math.pow(100, count);
        AppVerNum += n * k;
    });
    console.log("AppVerNum", AppVerNum);
}());

var Unlimited = Unlimited || false;
var GameName = Unlimited ? "FatFallUnlimited" : "FatFall";
var GameAppUrl = "https://itunes.apple.com/app/" + (Unlimited ? "fat-fall-unlimited/id1063628276" : "fat-fall/id1054336310") + "?mt=8";

var DefaultShareMessage = "#" + GameName + " is so hard. Do you dare to challenge? " + GameAppUrl;
var RandomSeedFix = Unlimited ? 12345 : 0;
var DefaultLanguage = DefaultLanguage || "en";
var DefaultFont = DefaultFont || "font-8bitoperatorRegular";
var SmallFont = SmallFont || "PixelOperator"; // "NBP-Sydnie2-Standard";
var PriceFont = PriceFont || "Arial";


(function() {
    var url = window.location.href;
    if (!("ontouchstart" in window) && url.indexOf("file") === 0) {

        var device = 1;
        if (url.indexOf("d=1") > 0) {
            device = 1
        } else if (url.indexOf("d=2") > 0) {
            device = 2
        } else if (url.indexOf("d=3") > 0) {
            device = 3
        }

        if (device === 1) {
            // // iPhone 4
            Config.viewWidth = 320;
            Config.viewHeight = 480;
        }

        if (device === 2) {
            // // iPhone 5 6
            Config.viewWidth = 320;
            Config.viewHeight = 568;
        }

        if (device === 3) {
            // iPad
            Config.viewWidth = 512 * 3 / 4;
            Config.viewHeight = 512;
        }

        // Config.viewWidth = 320;
        // Config.viewHeight = 416;
        // Config.viewHeight = 504;
        // Config.viewHeight = 516;
        // Config.viewHeight = 568;


    } else {


    }
    // var r = Config.width / Config.height;
    // // var r = window.innerWidth / window.innerHeight;
    // var minR = 640 / 1010;
    // var maxR = 640 / 830;
    // r = Math.min(maxR, Math.max(minR, r));
    // Config.height = Config.width / r >> 0;
    // // alert(Config.height);
}());

Config.timeStep = 1000 / Config.FPS >> 0;

if (!window.devicePixelRatio) {
    window.devicePixelRatio = 1;
}

window.debug = true;
window.log = function(args) {
    if (window.debug) {
        console.log.apply(console, arguments);
    }
};
