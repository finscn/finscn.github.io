"use strict";

(function() {

    window.devicePixelRatio = window.devicePixelRatio || 1;
    Config.retinaEnabled = false;
    Config.devicePixelRatio = 1;
    var minPixels = Math.min(Config.width, Config.height) * window.devicePixelRatio;
    if (window.devicePixelRatio > 1 && minPixels <= 1280) {
        Config.retinaEnabled = true;
        Config.devicePixelRatio = window.devicePixelRatio;
        Config.width *= Config.devicePixelRatio;
        Config.height *= Config.devicePixelRatio;
    }
    Config.touchPixelRatio = Config.devicePixelRatio;
    console.log("Config size: ", Config.width, Config.height, window.innerWidth, window.innerHeight);

    var canvas = document.getElementById("canvas");
    canvas.retinaResolutionEnabled = Config.retinaEnabled;
    canvas.MSAAEnabled = Config.MSAAEnabled||false;
    canvas.MSAASamples = Config.MSAASamples||2;
    canvas.width = Config.width;
    canvas.height = Config.height;
    if (canvas.style) {
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
    }
    var context = canvas.getContext("2d");


    window.getUDID = function() {
        return window.udid;
    }

    window.getUUID = function() {
        return window.uuid;
    }
    window.getAppVer = function() {
        return window.ver;
    }


    window.includeJS = function(files, cb) {
        files = [].concat(files);
        files.forEach(function(item, idx) {
            if (item) {
                app.include(window.rootPath + item);
            }
        });
        if (cb) {
            cb();
        }
    }

    if (App.WebView && Config.webview) {

        window.webview = new App.WebView();
        webview.hide();
        webview.src = window.rootPath + Config.webview + "?webview=1";

        webview.addEventListener("load", function() {

            includeJS(window.rootPath + 'base/WebviewBridge.js',
                function() {
                    WebviewBridge.initInNative(webview);
                    webview.show();
                });

        });

    }



}());
