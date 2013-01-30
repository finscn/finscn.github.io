
var Config = {
    FPS: 60,
    logoCount : 160 ,
    defaultSizePixel : 600
};

window.devicePixelRatio = window.devicePixelRatio || 1;


window.onload = function() {

    var browser=getBrowserInfo();
    if( window.devicePixelRatio==1) {
            setViewportScale(1);
            Config.width = window.innerWidth;
            Config.height = window.innerHeight;
    } else {
        if (browser.android){
            setViewportScale(1);
            Config.width = window.innerWidth;
            Config.height = window.innerHeight;
        }else{
            setViewportScale(0.5)
            Config.width = window.innerWidth;
            Config.height = window.innerHeight;
        }
    }

    var min=Math.min(Config.width,Config.height);

    var size=Config.defaultSizePixel;
    size=min<size?min:size;

    Config.width=size;
    Config.height=size;

    init();
    test.run();

    setTimeout(function(){
        showBrowserInfo();
    },1);
    
}


var test;

function init() {

    test = new Demo({
        canvas: "canvas",
        sprites: createSprties()
    });

    test.init();
}


//////// utils ////////////

function $id(id) {
    return document.getElementById(id);
}


function getBrowserInfo(){
    var ua=window.navigator.userAgent.toLowerCase();

    var browser={};

    var match = /(safari)[ \/]([\w.]+)/.exec( ua ) ||
            /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(chromium)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            !/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) || [];       
    
    browser[ match[1] ]=true;
    
    browser.mobile=ua.indexOf("mobile")>0 || "ontouchstart" in window; 

    browser.iPhone=/iphone/.test(ua);
    browser.iPad=/ipad/.test(ua);
    browser.iOS = browser.iPhone || browser.iPad ;
    browser.android=/android/.test(ua);
        
    return browser;
}

function showBrowserInfo(){
        $id("info").innerHTML=[
        "userAgent : "+window.navigator.userAgent,
        "devicePixelRatio : "+window.devicePixelRatio,
        "screenSize : "+[window.screen.width,window.screen.height],
        "availSize : "+[window.screen.availWidth,window.screen.availHeight],
        "innerSize : "+[window.innerWidth,window.innerHeight],
    ].join("<br>");
}

function setViewportScale(scale, scalable) {
    scale = scale || 1; // ?  1/window.devicePixelRatio ;
    var meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    var content = [
            "width=device-width", "height=device-height", 
            "user-scalable=" + (scalable ? "yes" : "no"), 
            "minimum-scale=" + scale / (scalable ? 2 : 1), 
            "maximum-scale=" + scale * (scalable ? 2 : 1), 
            "initial-scale=" + scale, 
            "target-densitydpi=device-dpi"   // for android
        ];
    meta.setAttribute("content", content.join(", "));
    document.head.appendChild(meta);
};

