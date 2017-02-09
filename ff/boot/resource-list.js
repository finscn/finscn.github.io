
var resourceList = [

{ id:"pack-1" , src: window.resPath + "pack-1.png" },
{ id:"pack-2" , src: window.resPath + "pack-2.png" },

// { id:"icon_auto" , src: window.resPath + "ui/icon_auto.png" },
// { id:"icon_freeze" , src: window.resPath + "ui/icon_freeze.png" },

// { id:"icon_new" , src: window.resPath + "ui/icon_new.png" },
// { id:"icon_close" , src: window.resPath + "ui/icon_close.png" },
// { id:"icon_restart" , src: window.resPath + "ui/icon_restart.png" },
// { id:"icon_share" , src: window.resPath + "ui/icon_share.png" },
// { id:"icon_sound-off" , src: window.resPath + "ui/icon_sound-off.png" },
// { id:"icon_quit" , src: window.resPath + "ui/icon_quit.png" },
// { id:"icon_ad" , src: window.resPath + "ui/icon_ad.png" },
// { id:"icon_noad" , src: window.resPath + "ui/icon_noad.png" },
// { id:"icon_leader" , src: window.resPath + "ui/icon_leader.png" },
// { id:"icon_help" , src: window.resPath + "ui/icon_help.png" },
// { id:"icon_pause" , src: window.resPath + "ui/icon_pause.png" },
// { id:"icon_sound-on" , src: window.resPath + "ui/icon_sound-on.png" },
// { id:"icon_leader-big" , src: window.resPath + "ui/icon_leader-big.png" },
// { id:"icon_coin" , src: window.resPath + "ui/icon_coin.png" },
// { id:"icon_rate" , src: window.resPath + "ui/icon_rate.png" },
// { id:"icon_time" , src: window.resPath + "ui/icon_time.png" },
// { id:"icon_newrecord" , src: window.resPath + "ui/icon_newrecord.png" },
// { id:"icon_play" , src: window.resPath + "ui/icon_play.png" },
// { id:"icon_plus" , src: window.resPath + "ui/icon_plus.png" },
// { id:"icon_score" , src: window.resPath + "ui/icon_score.png" },
// { id:"icon_shop" , src: window.resPath + "ui/icon_shop.png" },
// { id:"timebar-bg" , src: window.resPath + "timebar-bg.png" },
// { id:"timebar-value" , src: window.resPath + "timebar-value.png" },
// { id:"timebar-bg-freeze" , src: window.resPath + "timebar-bg-freeze.png" },
// { id:"timebar-value-freeze" , src: window.resPath + "timebar-value-freeze.png" },
// { id:"coin" , src: window.resPath + "coin.png" },
// { id:"coin-bg" , src: window.resPath + "coin-bg.png" },

];

(function() {

    // for (var i = 0; i < Config.cardCount; i++) {
    //     resourceList.push({
    //         id: "face-" + i,
    //         src: window.resPath + "face/face-" + i + ".jpg"
    //     });
    // }

    resourceList.push({
        id: "signIn",
        type: "fn",
        fn: function(loader, queue) {
            var Me = this;
            this.finished = true;
        },
        update: function() {

        },
        isFinished: function() {
            return this.finished;
        }
    });

    resourceList.push({
        id: "createUIImages",
        type: "fn",
        fn: function(loader, queue) {

            UIImage.create();
            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////

            this.finished = true;

        },
        update: function() {

        },
        isFinished: function() {
            return this.finished;
        }
    });

    var soundPath = "res/sound/";
    var audioList = [
        // { id:"bgm-home", src: soundPath + "bgm-home.mp3", loop: true },
    ];

    resourceList.unshift({
        id: "loadSound",
        type: "fn",
        fn: function(loader, queue) {
            this.finished = false;
            // setTimeout(function() {
            GT.Sound.setTouchLoadSounds(audioList, false);
            // GT.Sound.loadSounds(audioList, false);
            // }, 300);
        },
        isFinished: function() {
            // return true;
            // if (!GT.Sound.supportWebAudio) {
            //     return true;
            // }

            var count = audioList.length;
            var loaded = 0;
            audioList.forEach(function(info) {
                var s = GT.Sound.get(info.id);
                if (s && (s.loaded || s.error)) {
                    loaded++
                }
            });
            if (loaded >= count) {
                var Me = this;
                setTimeout(function() {
                    Me.finished = true;
                }, 100)
            }
            return this.finished;
        }
    });

}());

