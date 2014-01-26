;
(function() {

    var rp = "";
    if (typeof rootPath !== "undefined") {
        rp = rootPath || "";
    }

    function _loadCSSFileSync(css) {
        if (!css) {
            return;
        }
        document.write('<link rel="stylesheet" href="' + rp + css + '"/>');
    }

    function _loadJSFileSync(js) {
        if (!js) {
            return;
        }
        document.write('<script src="' + rp + js + '"></scr' + 'ipt>');
    }

    var url = window.location + "";
    var isWebview = window.isApp = url.indexOf("?webview=1") > 0;


    var cssList, jsList;


    //common

    jsList = [

        "base/config.js",

        "base/base.js",
        "base/init-web.js",

        "base/config-web.js",

        "lib/Base.js",
        "lib/DomBase.js",

        "lib/toucher/Controller.js",
        "lib/toucher/TouchWrapper.js",
        "lib/toucher/Listener.js",
        "lib/toucher/gesture/Any.js",
        "lib/toucher/gesture/Tap.js",
        "lib/toucher/gesture/Pan.js",
        "lib/toucher/gesture/Swipe.js",
        "lib/toucher/gesture/Hold.js",
        "lib/toucher/components/Joystick.js",

        "game/ui/gesture.js",


    ];
    jsList.forEach(function(js) {
        _loadJSFileSync(js);
    });


    if (isWebview) {
        cssList = [];
        jsList = [
            "base/WebviewBridge.js",
            "game/ui/ui-action-proxy.js",
        ];

    } else {
        cssList = [
            "base/web.css",
        ];
        jsList = [
            "boot.js",
        ];
    }

    cssList.forEach(function(css) {
        _loadCSSFileSync(css);
    });
    jsList.forEach(function(js) {
        _loadJSFileSync(js);
    });


    if (isWebview) {
        window.addEventListener("load", function() {
            WebviewBridge.initInWeb();
        });
    }

}());