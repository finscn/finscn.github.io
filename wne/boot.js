
"use strict";





function initLifeCycle() {

    if (window.lifeCycleInited) {
        return;
    }

    window.addEventListener("load",function(event){
        console.log('window onload' );
        
    });

    var pageshow="pageshow",
        pagehide="pagehide";
    window.addEventListener(pagehide, function(event) {
        console.log('entering background' );

    });
    window.addEventListener(pageshow, function(event) {
        console.log('entering foreground' );

    });
    window.lifeCycleInited=true;
}


function init() {
    if (init.called) {
        return;
    }
    init.called = true;
    
    initLifeCycle();
    game.init();
    console.log("after game.init()")
    game.load();
}

includeJS("load-scripts.js", function(){


});


