"use strict";

var UIAction = {

    reset: function() {
        window.localStorage.clear();
        for (var id in game.sceneInfoMap) {
            var info = game.sceneInfoMap[id];
            info.load();
        }
        for (var id in game.stageInfoMap) {
            var info = game.stageInfoMap[id];
            info.load();
        }
        game.playerInfo.load();
    },
    
    getBoardId: function(sceneId) {
        var boardId = sceneId.replace(/\-/ig, "_");
        return boardId;
    },

    loadPlayerInfo: function() {

    },
    isFading: function() {
        var fade = game.uiManager.getUI("FadePage");
        return fade.visible;
    },

    fadeTo: function(idOrFunc) {
        var fade = game.uiManager.activate("FadePage");
        if (typeof idOrFunc == "function") {
            fade.afterShow = idOrFunc;
        } else {
            fade.afterShow = function() {
                game.uiManager.inactivateAll("FadePage");
                game.uiManager.activate(idOrFunc);
            };
        }
    },
    backHome: function() {
        game.stop();
        UIAction.fadeTo("HomePage");
        game.startLoop();
    },

    prevStage: function() {
        var select = game.uiManager.getUI("SceneSelectPage");
        if (select.groupNo > 1) {
            select.setSceneGroup(select.groupNo - 1);
        }
    },
    nextStage: function() {
        var select = game.uiManager.getUI("SceneSelectPage");
        if (select.groupNo < 4) {
            select.setSceneGroup(select.groupNo + 1);
        }
    },
    quickplay: function() {
        game.stop();
        UIAction.fadeTo(function() {
            game.uiManager.inactivateAll();
            game.start(window.sceneId || "0-1");
        });
        game.startLoop();

    },
    showSetting: function() {

    },
    showHelp: function() {

    },
    showCredit: function() {

    },
    saveSetting: function(key, value) {

    },
    loadSetting: function(key) {

    },

    showStageSelector: function() {
        game.stop();
        UIAction.fadeTo("StageSelectPage");
        game.startLoop();
    },

    showSceneSelector: function(groupNo) {

        game.stop();
        UIAction.fadeTo("SceneSelectPage");
        game.startLoop();
        game.uiManager.getUI("SceneSelectPage").setSceneGroup(groupNo);
    },

    showSceneScoreBoard: function(sceneId) {
        var ui = game.uiManager.activate("SceneScorePanel");
        ui.setSceneId(sceneId);
    },

    showSceneSelectorStar: function(groupNo) {

    },
    showSceneSelectorTime: function(groupNo) {

    },


    start: function(index) {

        game.stop();
        UIAction.fadeTo(function() {
            game.uiManager.inactivateAll();
            game.start(index);
        });
        game.startLoop();
    },

    restart: function() {
        game.toPause = false;
        game.toRestart = false;
        // game.stop();
        UIAction.fadeTo(function() {
            game.uiManager.inactivateAll();
            game.restart();
        });
        // game.startLoop();
    },
    next: function() {
        // game.stop();
        UIAction.fadeTo(function() {
            game.uiManager.inactivateAll();
            if (game.hasNextScene()) {
                game.nextScene();
            } else {
                game.showError("no next level")
            }
        });
        // game.startLoop();
    },

    pause: function() {
        game.toPause = false;
        game.pause();
        game.uiManager.activate("PausePanel");
    },
    resume: function() {
        game.toResume = false;
        game.uiManager.inactivate("PausePanel");
        game.resume();
    },
    complete: function(result) {
        var ui = game.uiManager.activate("CompletePanel");
        ui.setResult(result);
    },
    gameover: function() {
        UIAction.restart();
        // game.toPause = false;
        // game.pause();
        // game.uiManager.activate("OverPanel");
    },

    showMoreSceneTime: function(levelId) {

    },

    finishAll: function() {

    },
    showEnding: function() {

    },

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////


    loginGameCenter: function(cb) {
        if (window.gameCenter) {
            gameCenter.softAuthenticate(function() {
                if (gameCenter.authed) {
                    game.localPlayer = gameCenter.getLocalPlayerInfo();
                    console.log("getLocalPlayerInfo: " + JSON.stringify(game.localPlayer));
                }
                console.log("GameCenter authed: " + gameCenter.authed);
                if (cb) {
                    cb();
                }
            });
        }
    },
    isAuthedGameCenter: function() {

    },

    loadLocalScores: function(sceneId, start, end, cb) {
        var info = game.sceneInfoMap[sceneId];
        var scores = info.getLocalScores();
        if (cb) {
            cb(scores);
        }
    },

    loadGlobalScores: function(sceneId, start, end, cb) {
        var boardId = UIAction.getBoardId(sceneId);
        if (window.gameCenter && window.gameCenter.authed) {
            window.gameCenter.retrieveScores(boardId, {
                friendsOnly: false,
                timeScope: 2,
                start: start,
                end: end
            }, cb);
        } else if (cb) {
            cb(["no game center,can't load Global Scores"]);
        }
    },

    loadFriendsScores: function(sceneId, start, end, cb) {
        var boardId = UIAction.getBoardId(sceneId);
        if (window.gameCenter && window.gameCenter.authed) {
            window.gameCenter.retrieveScores(boardId, {
                friendsOnly: true,
                timeScope: 2,
                start: start,
                end: end
            }, cb);
        } else if (cb) {
            cb(["no game center,can't load Friends Scores"]);
        }
    },

    reportScore: function(sceneId, score, cb) {
        score = Math.round(score);
        var boardId = UIAction.getBoardId(sceneId);
        if (window.gameCenter && window.gameCenter.authed) {
            window.gameCenter.reportScore(boardId, score, function() {
                console.log("reportScore", boardId, score);
            });
        } else {
            console.log("GameCenter not authed! Can't reportScore.");
            UIAction.loginGameCenter(function() {
                window.gameCenter.reportScore(boardId, score, function() {
                    console.log("reportScore", boardId, score);
                });
            });
        }
    },

    loadAchievements: function() {

    },

    saveAchievement: function(sceneId, percent, cb) {

    },

    showLeaderboard: function(sceneId) {
        var boardId = UIAction.getBoardId(sceneId);
        if (window.gameCenter && window.gameCenter.authed) {
            window.gameCenter.showLeaderboard(boardId);
        } else {
            game.showError("GameCenter not authed! Try later.");
            UIAction.loginGameCenter(function() {
                window.gameCenter.showLeaderboard(boardId);
            });
        }
    },

    showAchievements: function() {
        if (window.gameCenter && window.gameCenter.authed) {

            window.gameCenter.showAchievements();

            //for test
            var sceneId = "1-2";
            UIAction.loadGlobalScores(sceneId, 1, 10, function(scores) {
                console.log("loadGlobalScores", sceneId)
                console.log(JSON.stringify(scores))
            });
            UIAction.loadFriendsScores(sceneId, 1, 10, function(scores) {
                console.log("loadFriendsScores", sceneId)
                console.log(JSON.stringify(scores))
            });


        } else {
            game.showError("GameCenter not authed! Try later.");
            UIAction.loginGameCenter(function() {
                // UIAction.showAchievements();
                window.gameCenter.showAchievements();
            });
        }

    },


};
