
var Config = {
    FPS: 60,
    defaultSizePixel : 600
};

window.devicePixelRatio = window.devicePixelRatio || 1;


window.onload = function() {
    var b=getBrowserInfo();
    if (b.iOS){
        setViewportScale(1 / window.devicePixelRatio, true);
    }else if (b.android){
        setViewportScale(1 , true);
    }else{
        // TODO : I don't know anything about WP or BB :(
        setViewportScale(1 , true);
    }

    var min=Math.min(window.screen.availWidth,window.screen.availHeight);
    if (b.iOS){
        min=min*window.devicePixelRatio;
    }
    var size=Config.defaultSizePixel;
    size=min<size?min:size;

    Config.width=size;
    Config.height=size;

    init();
    test.run();
    
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
    $id("ua").innerHTML=ua;
    var browser={};
    browser.iPhone=/iphone/.test(ua);
    browser.iPad=/ipad/.test(ua);
    browser.iOS = browser.iPhone || browser.iPad ;
    browser.android=/android/.test(ua);
    browser.retain=window.devicePixelRatio>=1.5;
        
    return browser;
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

