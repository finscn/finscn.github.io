;
(function(_this) {

    if (typeof exports == "undefined") {
        var _exports = window || _this;
        _exports.exports = _exports;
    }

}(this));

(function(exports) {

    if (typeof require == "undefined") {
        exports.require = function(url) {
            console.log("require : ", url);
            return exports;
        }
    }

}(exports));

function hideAddressBar(once) {
    if (!window.scrollTo) {
        return;
    }
    setTimeout(function() {
        window.scrollTo(0, 1);
        if (once === false) {
            hideAddressBar(once);
        }
    }, 1);
}

function autoViewport(landscape, scale, scalable) {
    landscape = landscape || false;
    scale = scale || window.devicePixelRatio || 1;
    scalable = scalable || false;
    if (window.screen.height * scale <= 1280) {
        scale = 1 / scale;
    } else {
        scale = 1;
    }
    var meta = document.createElement("meta");
    if (!meta || !meta.setAttribute) {
        return false;
    }
    meta.setAttribute("name", "viewport");
    var content = [
        "width=" + (landscape ? "device-height" : "device-width"),
        "height=" + (landscape ? "device-width" : "device-height"),
        "user-scalable=" + (scalable ? "yes" : "no"),
        "minimum-scale=" + scale / (scalable ? 2 : 1),
        "maximum-scale=" + scale * (scalable ? 2 : 1),
        "initial-scale=" + scale,
        "target-densitydpi=device-dpi"
    ];
    meta.setAttribute("content", content.join(", "));
    document.head.appendChild(meta);
    window.addEventListener("load", function() {
        var container = document.getElementById("container");
        if (container) {
            container.style.width = Config.width + "px";
            container.style.height = Config.height + "px";
        }
        hideAddressBar();
    });

    return scale;
}



function parseUrl(url) {
    //    ht[1] ://   t.cn:80[3]   :port[4] /path[6]    ?query[7]   #anchor[8]
    var m = /^(\w*):?\/\/(([^\/\?#:]+)(:\d+)?)((\/[^\?#]*)?(\?[^#]*)?)(#.*)?$/i.exec(url);
    if (!m) return null;
    return {
        protocol: m[1],
        host: m[2],
        hostname: m[3],
        port: m[4] && parseInt(m[4].substring(1)),
        path: m[5] || '/',
        pathname: m[6] || '/',
        query: m[7] || '',
        hash: m[8] || ''
    };
}
