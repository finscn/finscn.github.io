
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

    var size=Config.defaultSizePixel;
    var min=Math.floor(Math.min(window.screen.availWidth,window.screen.availHeight)*window.devicePixelRatio);
    if (min<size){
        size=min;
    }
    Config.width=size;
    Config.height=size;

    init();
    test.run();
    showFPS(test);
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

function showFPS(logger) {

    if (logger == null) {
        return;
    }
    logger.frameCount = 0;

    var id = "fpsBar";

    var div = $id(id);
    if (div == null) {
        var style = {
            border: "solid 1px #ccc",
            position: "absolute",
            left: "1px",
            top: "1px",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.6)",
            minWidth: "150px",
            height: "55px",
            padding : "7px",
            fontSize: "50px",
            zIndex: 99999
        }
        div = document.createElement("div");
        div.id = id;
        for (var p in style) {
            div.style[p] = style[p];
        }
        document.body.appendChild(div);

    }

    div.innerHTML = "Waiting...";

    function _core() {
        div.innerHTML = "FPS:" + logger.frameCount;
        logger.frameCount = 0;
    }
    setInterval(_core, 1000);
}