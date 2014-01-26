function getJSList(root) {
    root = root || "";

    var baseList = getBaseJSList(root);

    var list = [

        root + "data/scene-0.js",
        root + "data/scene-1.js",
        root + "data/scene-2.js",
        root + "data/scene-3.js",
        root + "data/music.js",
        root + "game/js/ImageCreator.js",
        root + "game/js/Note.js",
        root + "game/js/FootPrint.js",
        root + "game/js/Dark.js",
        root + "game/js/resource-list.js",
        root + "game/js/render-tools.js",
        root + "game/js/Entity.js",
        root + "game/js/Ball.js",
        root + "game/js/Block.js",
        root + "game/js/Wall.js",
        root + "game/js/GameCollideManager.js",
        root + "game/js/GameWorld.js",
        root + "game/js/Scene.js",
        root + "game/js/Player.js",
        root + "game/js/Wave.js",

        root + "game/js/game.js",

        root + "game/ui/Panel.js",
        root + "game/ui/FadePage.js",
        root + "game/ui/GameHUD.js",
        root + "game/ui/IconButton.js",
        root + "game/ui/CloseButton.js",
        root + "game/ui/HomePage.js",
        root + "game/ui/PausePanel.js",
        root + "game/ui/EndingPage.js",

        root + "game/ui/ui-action.js",

    ];

    return baseList.concat(list);
}


function getBaseJSList(root) {
    root = root || "";
    var list = [
        root + "lib/Base.js",
        root + "lib/DomBase.js",
        root + "lib/Class.js",
        root + "lib/LinkedList.js",
        root + "lib/Queue.js",
        root + "lib/DataStore.js",
        root + "lib/ResourcePool.js",
        root + "lib/ProcessQ.js",
        root + "lib/Sound.js",
        root + "lib/Slider.js",
        root + "lib/Timer.js",
        root + "lib/Event.js",
        root + "lib/EventDispatcher.js",

        root + "lib/Font.js",
        root + "lib/Game.js",
        root + "lib/AbstractScene.js",
        root + "lib/Camera.js",
        root + "lib/Animation.js",
        root + "lib/MovePath.js",
        root + "lib/EntityTemplate.js",

        root + "lib/FrameCounter.js",
        root + "lib/ui/UIManager.js",
        root + "lib/ui/Component.js",
        root + "lib/ui/Button.js",
        root + "lib/ui/ToggleButton.js",
        root + "lib/ui/Label.js",

        root + "lib/tween/Tween.js",

        root + "lib/SimpleBlur/Blur.js",


        root + "lib/CollisionUtils.js",


        root + "lib/PoorPhy/js/Base.js",
        // root+"lib/PoorPhy/js/Class.js",

        root + "lib/PoorPhy/js/collision/CollideManager.js",
        root + "lib/PoorPhy/js/collision/Arbiter.js",

        root + "lib/PoorPhy/js/Body.js",
        root + "lib/PoorPhy/js/shape/Shape.js",
        root + "lib/PoorPhy/js/shape/Polygon.js",
        root + "lib/PoorPhy/js/shape/Segment.js",
        root + "lib/PoorPhy/js/shape/Circle.js",
        root + "lib/PoorPhy/js/shape/Composition.js",

        root + "lib/PoorPhy/js/World.js",
        root + "lib/PoorPhy/js/WorldRunner.js",
    ];

    return list;
}



function getInputJSList(root) {
    root = root || "";
    var list = [
        root + "lib/toucher/Controller.js",
        root + "lib/toucher/TouchWrapper.js",
        root + "lib/toucher/Listener.js",
        root + "lib/toucher/gesture/Any.js",
        root + "lib/toucher/gesture/Tap.js",
        root + "lib/toucher/gesture/Pan.js",
        root + "lib/toucher/gesture/Swipe.js",
        root + "lib/toucher/gesture/Hold.js",
        root + "lib/toucher/components/Joystick.js",

        root + "game/ui/gesture.js",

    ]

    return list;
}


(function() {
    var App = !! window.App;

    var scripts = getJSList();

    includeJS(scripts, function() {

        if (App && !window.webview) {
            includeJS(getInputJSList(), function() {
                initLifeCycle();
                init();
            });
        } else {
            initLifeCycle();
            init();
        }
    });
}());
