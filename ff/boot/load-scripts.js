"use strict";

(function(exports) {


    exports.getJSList = function(root) {
        root = root || "";

        var list = [
            // [JS-FILE]


            "res/image/pack-1.js",
            "res/image/pack-2.js",

            "boot/config.js",
            "boot/text-data.js",
            "boot/resource-list.js",
            "boot/stage-config.js",
            "boot/iap-config.js",
            "boot/sys-action.js",

            "js/lib/init.js",

            "js/lib/Tween.js",
            "js/lib/Utils.js",
            "js/lib/Slider.js",
            "js/lib/Camera.js",
            "js/lib/ImageUtils.js",
            "js/lib/DomUI.js",
            "js/lib/SceneFader.js",
            "js/lib/Particle.js",
            "js/lib/SimpleTableLayout.js",


            "js/lib/GT/Class.js",
            "js/lib/GT/Game.js",
            "js/lib/GT/Color.js",
            "js/lib/GT/EventDispatcher.js",
            "js/lib/GT/ProcessQ.js",
            "js/lib/GT/ResourcePool.js",
            "js/lib/GT/Scaler.js",
            "js/lib/GT/Sound.js",
            "js/lib/GT/TimeTask.js",
            "js/lib/GT/DisplayObject.js",
            "js/lib/GT/DataStore.js",

            "js/lib/GT/state/State.js",
            "js/lib/GT/state/StateEntity.js",

            "js/lib/GT/toucher/Controller.js",
            "js/lib/GT/toucher/TouchWrapper.js",
            "js/lib/GT/toucher/Listener.js",
            "js/lib/GT/toucher/gesture/Any.js",
            "js/lib/GT/toucher/gesture/Tap.js",
            "js/lib/GT/toucher/gesture/Pan.js",
            "js/lib/GT/toucher/gesture/Swipe.js",
            "js/lib/GT/toucher/gesture/Pinch.js",
            "js/lib/GT/toucher/gesture/Rotate.js",
            "js/lib/GT/toucher/components/Joybutton.js",
            "js/lib/GT/toucher/components/Joystick.js",

            "js/lib/CUI.js/Class.js",
            "js/lib/CUI.js/Utils.js",
            "js/lib/CUI.js/Composite.js",
            "js/lib/CUI.js/EventDispatcher.js",
            "js/lib/CUI.js/TouchTarget.js",
            "js/lib/CUI.js/Slider.js",
            "js/lib/CUI.js/Font.js",
            "js/lib/CUI.js/renderer/BaseRenderer.js",
            "js/lib/CUI.js/renderer/TextRenderer.js",
            "js/lib/CUI.js/renderer/ImageRenderer.js",
            "js/lib/CUI.js/layout/BaseLayout.js",
            "js/lib/CUI.js/layout/VBoxLayout.js",
            "js/lib/CUI.js/layout/HBoxLayout.js",
            "js/lib/CUI.js/layout/TableLayout.js",
            "js/lib/CUI.js/layout/Layout.js",
            "js/lib/CUI.js/Component.js",
            "js/lib/CUI.js/Root.js",
            "js/lib/CUI.js/widget/Blank.js",
            "js/lib/CUI.js/widget/Picture.js",
            "js/lib/CUI.js/widget/Label.js",
            "js/lib/CUI.js/widget/Button.js",
            "js/lib/CUI.js/widget/Page.js",
            "js/lib/CUI.js/widget/Panel.js",
            "js/lib/CUI.js/widget/ProgressBar.js",
            "js/lib/CUI.js/widget/ScrollView.js",


            "js/lib/Sprite/Sprite.js",
            "js/lib/Sprite/Frame.js",
            "js/lib/Sprite/Animation.js",

            "js/lib/SimpleButton.js",


            "js/base/DefaultGame.js",
            "js/base/gesture.js",
            "js/base/init-event.js",


            "js/ui/ui-init.js",

            "js/ui/button/IconButton.js",
            "js/ui/button/MenuButton.js",

            "js/ui/button/CloseButton.js",
            "js/ui/button/GuideButton.js",
            "js/ui/button/LeaderButton.js",
            "js/ui/button/PauseButton.js",
            "js/ui/button/QuitButton.js",
            "js/ui/button/RateButton.js",
            "js/ui/button/RestartButton.js",
            "js/ui/button/ResumeButton.js",
            "js/ui/button/ShareButton.js",
            "js/ui/button/ShopButton.js",
            "js/ui/button/ShopItemButton.js",
            "js/ui/button/SoundButton.js",
            "js/ui/button/StartMenuButton.js",
            "js/ui/button/WatchADButton.js",
            "js/ui/button/SkillButton.js",

            "js/ui/PanelBackground.js",
            "js/ui/TopMask.js",
            "js/ui/NoticeBar.js",
            "js/ui/TipLabel.js",
            "js/ui/AdPanel.js",
            "js/ui/CoinBar.js",
            "js/ui/ShopPanel.js",
            "js/ui/StartPage.js",
            "js/ui/PlayHeadBar.js",
            "js/ui/PlayFootBar.js",
            "js/ui/GameOverPanel.js",
            "js/ui/GamePausePanel.js",
            "js/ui/GamePauseMiniPanel.js",
            "js/ui/GameResult.js",
            "js/ui/PanelTitle.js",
            "js/ui/PanelMenuBar.js",
            "js/ui/PlayPage.js",

            "js/ui/GalleryMenuItem.js",
            "js/ui/GalleryPanel.js",


            "js/entity/Entity.js",
            "js/entity/Trigger.js",
            "js/entity/TipBlock.js",

            "js/entity/Card.js",
            "js/entity/TimeBar.js",
            "js/entity/CenterTile.js",
            "js/entity/FinishEffect.js",

            "js/anim/player-anim.js",


            "js/LoadingScene.js",
            "js/StartScene.js",
            "js/Ground.js",
            "js/PlayScene.js",


            "js/User.js",
            "js/Shop.js",

            "js/main.js",


            // #### [JS-FILE]

        ];

        list.forEach(function(js, idx) {
            list[idx] = root + js;
        });
        return list;
    }


    exports.getInputJSList = function(root) {
        root = root || "";
        var list = [


        ];

        list.forEach(function(js, idx) {
            list[idx] = root + js;
        });

        return list;
    }

})(typeof exports == "undefined" ? this : exports);
