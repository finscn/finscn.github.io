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
    var scale = autoViewport();
    Config.touchPixelRatio *= scale;

    console.log("Config size: ", Config.width, Config.height, window.innerWidth, window.innerHeight);

    window.getUDID = function() {
        return window.udid;
    }

    window.getUUID = function() {
        return window.uuid;
    }
    window.getAppVer = function() {
        return window.ver;
    }

    function include(src, onload) {
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (src) {
            script.src = src;
            script.defer = false;
            var done = false;
            script.onload = script.onreadystatechange = function(e) {
                if (!done &&
                    (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                    done = true;
                    if (onload) {
                        onload(e);
                    }
                    this.onload = this.onreadystatechange = this.onerror = null;
                }
            };
            script.onerror = function(e) {
                if (onload) {
                    onload(e);
                }
                this.onload = this.onreadystatechange = this.onerror = null;
            };
        }
        head.appendChild(script);
    }

    window.includeJS = function(files, cb) {
        files = [].concat(files);

        var total = files.length;
        var loaded = -1;

        function loadNext(e) {
            loaded++;
            if (loaded < total) {
                var js = files[loaded];
                if (js) {
                    console.log(js)
                    include(window.rootPath + js + ("?_t=" + Date.now()), loadNext);
                } else {
                    loadNext({});
                }
            } else if (cb) {
                setTimeout(function() {
                    cb();
                }, 1);
            }
        }
        loadNext({});
    }


}());
