function loadImages(fileList, callback) {
    // src, id, onLoad(img, $next)
    var count = fileList.length;
    var imagePool = {};
    var idx = -1;
    var $next = function() {
        idx++;
        if (idx >= count) {
            callback(imagePool);
            return;
        }
        var cfg = fileList[idx];
        var img = new Image();
        var src = cfg.src || cfg.url || cfg;
        var id = cfg.id || src;
        img.src = src;
        img.id = id;
        img.onload = function(event) {
            imagePool[img.id] = img;
            if (cfg.onLoad) {
                cfg.onLoad.call(img, img);
            }
            $next();
        };
        img.onerror = function() {
            $next();
        };
    }
    $next();
    return imagePool;
}


function randomInt(min, max) {
    return ((max - min + 1) * Math.random() + min) >> 0;
}

function getBrowserInfo() {
    var browser = {};

    if (!window.navigator || !window.navigator.userAgent) {
        return browser;
    }
    var ua = window.navigator.userAgent.toLowerCase();
    // alert(ua);
    var match =
        /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(chromium)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        /(safari)[ \/]([\w.]+)/.exec(ua) ||
        /(firfox)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) || !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];

    browser[match[1]] = true;

    browser.weixin = /micromessenger/.test(ua);
    browser.weibo = /weibo/.test(ua);
    browser.QQBrowser = /qqbrowser/.test(ua);
    browser.QQ = (/qq/.test(ua)) && !browser.QQBrowser;

    browser.iPhone = /iphone/.test(ua);
    browser.iPad = /ipad/.test(ua);
    browser.iPod = /ipod/.test(ua);
    browser.iOS = browser.iPhone || browser.iPad || browser.iPod;
    if (browser.iOS) {
        for (var i = 4; i <= 16; i++) {
            browser["iOS" + i] = ua.indexOf("os " + i) > 0;
        }
    }

    browser.android = /android/.test(ua);
    if (browser.android) {
        browser.android44 = /android 4.4/.test(ua);
        for (var i = 2; i <= 16; i++) {
            browser["android" + i] = ua.indexOf("android " + i) > 0;
        }
    }

    browser.wp = /iemobile/.test(ua) || ua.indexOf("windows phone") > 0;

    browser.mobile = ua.indexOf("mobile") > 0;
    browser.mobile = browser.mobile || browser.iOS || browser.android || browser.wp;
    browser.mobile = browser.mobile && ("ontouchstart" in window);

    browser.devicePixelRatio = window.devicePixelRatio || 1;
    browser.retain = browser.devicePixelRatio >= 1.5;

    return browser;
}
