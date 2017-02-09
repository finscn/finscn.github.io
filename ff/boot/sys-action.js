"use strict";

var SysAction = {

    reportCount: function(key, value) {
        if (!window.navigator.onLine) {
            return;
        }
        if (window.location.href.indexOf("file") === 0) {
            return;
        }
        value = arguments.length < 2 ? 1 : value;
        var url = "http://onemorejoy.com:8802/statistic/add?";
        url += "key=" + key + "&value=" + value;
        Utils.simpleAjax(url, {
            callback: function(text) {
                console.log(text);
            }
        });
    },
    showNotice: function(message, type) {
        game.showNotice(message, type);
    },

    canOpenPageAd: function() {
        if (Unlimited || !window.pageAd) {
            return false;
        }
        if (!window.pageAd.hasInterstitial()) {
            setTimeout(function() {
                window.pageAd.loadInterstitial();
            }, 900);
            return false;
        }
        return true;
    },
    openPageAd: function(beforeShow, afterClose) {
        if (!window.pageAd) {
            return false;
        }
        if (this.canOpenPageAd()) {
            SysAction.reportCount(GameName + ".adPage");

            window.pageAd.showInterstitial();
            setTimeout(function() {
                window.pageAd.loadInterstitial();
            }, 900);
            return true;
        }
        return false;
    },

    canPlayVideoAd: function() {
        if (Unlimited || !window.videoAd) {
            return false;
        }
        return window.videoAd.isReady;
    },
    playVideoAd: function(beforeShow, afterClose) {
        if (!window.videoAd) {
            return false;
        }
        if (this.canPlayVideoAd()) {
            SysAction.reportCount(GameName + ".adVideo");
            game.topMask.show();
            setTimeout(function() {
                game.topMask.hide();
            }, 3333);
            window.videoAd.show({
                incentivized: true,
                // incentivizedAlertTitleText: "title",
                // incentivizedAlertBodyText: "body",
                // incentivizedAlertCloseButtonText: "close-button",
                // incentivizedAlertContinueButtonText: "continue-button",
                orientations: "portrait",
                placement: "Placement-A",
                // User: "test-user-1",
                beforeShow: function() {
                    game.user.setItem("adStartCount", game.user.adStartCount + 1);
                    game.smartMute(true);
                    console.log("beforeShow");
                    beforeShow();
                },
                afterClose: function(info) {
                    game.topMask.hide();
                    console.log("afterClose", JSON.stringify(info));
                    game.smartMute(false);
                    afterClose(info);
                },
            });
        }
        return true;
    },


    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////


    isAuthedGameCenter: function() {
        return window.gameCenter && window.gameCenter.authed;
    },

    loginGameCenter: function(cb, soft) {
        if (!window.gameCenter) {
            return false;
        }
        var gameCenter = window.gameCenter;
        var methodName = soft ? "softAuthenticate" : "authenticate";
        gameCenter[methodName](function() {
            console.log("GameCenter authed: " + gameCenter.authed);
            if (gameCenter.authed) {
                game.localPlayer = gameCenter.getLocalPlayerInfo();
                console.log("getLocalPlayerInfo: " + JSON.stringify(game.localPlayer));
            }
            if (cb) {
                cb(gameCenter.authed);
            }
        });
    },

    showGameCenter: function() {
        if (!window.gameCenter) {
            this.showNotice("GameCenter is NOT activated.");
            return false;
        }
        if (this.isAuthedGameCenter()) {
            SysAction.reportCount(GameName + ".gamecenter");
            window.gameCenter.showGameCenter();
        } else {
            this.showNotice("GameCenter not authed! Try later.");
            this.loginGameCenter(function() {
                if (window.gameCenter.authed) {
                    SysAction.reportCount(GameName + ".gamecenter");
                    window.gameCenter.showGameCenter();
                }
            });
        }
    },

    showLeaderboard: function(boardId) {
        if (!window.gameCenter) {
            return false;
        }
        boardId = boardId || boardId === 0 ? boardId : null;
        if (this.isAuthedGameCenter()) {
            SysAction.reportCount(GameName + ".leaderboard." + boardId);
            window.gameCenter.showLeaderboard(boardId);
        } else {
            this.showNotice("GameCenter not authed! Try later.");
            this.loginGameCenter(function() {
                if (window.gameCenter.authed) {
                    SysAction.reportCount(GameName + ".leaderboard." + boardId);
                    window.gameCenter.showLeaderboard(boardId);
                }
            });
        }
    },

    showAchievements: function() {
        if (!window.gameCenter) {
            return false;
        }
        if (this.isAuthedGameCenter()) {
            window.gameCenter.showAchievements();
        } else {
            this.showNotice("GameCenter not authed! Try later.");
            this.loginGameCenter(function() {
                window.gameCenter.showAchievements();
            });
        }
    },

    reportScore: function(boardId, score, contextNum, cb) {
        if (!window.gameCenter) {
            return false;
        }
        if (this.isAuthedGameCenter()) {
            window.gameCenter.reportScore(boardId, score, contextNum, function() {
                console.log("reportScore 1", boardId, score);
                cb && cb();
            });
        } else {
            console.log("GameCenter not authed! Can't reportScore.");
            this.loginGameCenter(function(authed) {
                if (authed) {
                    window.gameCenter.reportScore(boardId, score, contextNum, function() {
                        console.log("reportScore 2", boardId, score);
                        cb && cb();
                    });
                }
            });
        }
    },

    reportAchievement: function(achievId, percentage, cb) {
        if (!window.gameCenter) {
            return false;
        }
        if (this.isAuthedGameCenter()) {
            window.gameCenter.reportAchievement(achievId, percentage, function() {
                console.log("reportAchievement 1", achievId, percentage);
                cb && cb();
            });
        } else {
            console.log("GameCenter not authed! Can't reportAchievement.");
            this.loginGameCenter(function(authed) {
                if (authed) {
                    window.gameCenter.reportAchievement(achievId, percentage, function() {
                        console.log("reportAchievement 2", achievId, percentage);
                        cb && cb();
                    });
                }
            });
        }
    },

    loadPlayerScore: function(boardId, cb) {
        if (!window.gameCenter) {
            return false;
        }
        if (this.isAuthedGameCenter()) {
            window.gameCenter.retrieveScores(boardId, {
                localPlayerOnly: true,
                timeScope: 2
            }, cb);
        } else if (cb) {
            cb(null);
        }
    },

    loadGlobalScores: function(boardId, start, end, cb) {
        if (!window.gameCenter) {
            return false;
        }
        if (this.isAuthedGameCenter()) {
            window.gameCenter.retrieveScores(boardId, {
                friendsOnly: false,
                withLocalPlayer: true,
                timeScope: 2,
                start: start,
                end: end
            }, cb);
        } else if (cb) {
            cb(null);
        }
    },

    loadFriendsScores: function(boardId, start, end, cb) {
        if (!window.gameCenter) {
            return false;
        }
        if (this.isAuthedGameCenter()) {
            window.gameCenter.retrieveScores(boardId, {
                friendsOnly: true,
                withLocalPlayer: true,
                timeScope: 2,
                start: start,
                end: end
            }, cb);
        } else if (cb) {
            cb(null);
        }
    },

    loadAchievements: function() {
        if (!window.gameCenter) {
            return false;
        }
    },


    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    shareGame: function(message, earnCoin, cb) {
        if (!window.social) {
            this.showNotice("Can't share game now.");
            return false;
        }
        var Me = this;
        var message = message || DefaultShareMessage;
        window.social.openShare(message, "share.png", function() {
            SysAction.reportCount(GameName + ".share" + (earnCoin ? "EarnCoin" : ""));
            game.user.setItem("shareCount", game.user.shareCount + 1);
            if (earnCoin) {
                setTimeout(function() {
                    game.user.addCoins(earnCoin);
                }, 1000);
            }
            cb && cb();
        });
        return true;
    },

    rateGame: function(earnCoin, cb) {
        var Me = this;
        SysAction.reportCount(GameName + ".rate");
        game.user.setItem("rateCount", game.user.rateCount + 1);
        if (game.user.rateCount == 1 && earnCoin) {
            setTimeout(function() {
                game.user.addCoins(earnCoin);
            }, 1000);
        }
        cb && cb();
        window.open(GameAppUrl);
    },

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    loadProducts: function(productIds, cb) {
        this.products = {};
        if (!window.iap) {
            return false;
        }
        productIds = productIds || game.shop.productIds;
        var Me = this;
        console.log("getProducts", productIds);
        window.iap.getProducts(productIds, function(error, products) {
            if (error || !products || products.length === 0) {
                console.log("getProducts", error);
                cb && cb(error, null);
                return;
            }
            console.log("getProducts", products.length);
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                console.log([
                    product.id,
                    product.title,
                    product.description,
                    product.price
                ]);
                Me.products[product.id] = product;
            }
            cb && cb(error, products);
        });
    },

    buyProductRemote: function(productId, cb) {
        if (!window.iap) {
            return false;
        }

        game.topMask.show();
        setTimeout(function() {
            // game.topMask.hide();
        }, 2000);

        var Me = this;

        window.iap.getProducts([productId], function(error, products) {
            if (error || !products || products.length === 0) {
                game.topMask.hide();
                console.log("getProducts", error);
                cb && cb(error, null);
            } else {
                var product = products[0];
                console.log([
                    product.id,
                    product.title,
                    product.description,
                    product.price
                ]);
                productId = product.id;
                Me.products[productId] = product;
                Me.buyProductLocal(productId, cb)
            }
        });
        return true;
    },

    buyProductLocal: function(productId, cb) {
        if (!window.iap) {
            return false;
        }
        var product = this.products[productId];
        if (!product) {
            this.loadProducts([productId]);
            return false;
        }

        game.topMask.show();
        setTimeout(function() {
            // game.topMask.hide();
        }, 2222);

        var Me = this;
        // Buy 1 product
        product.purchase(1, function(error, transaction) {
            game.topMask.hide();
            if (error) {
                console.log("purchase", error);
            } else if (transaction) {
                // Purchase successful; log some transaction info
                console.log([
                    transaction.productId,
                    transaction.id,
                    transaction.receipt
                ]);
            }
            cb && cb(error, transaction);
        });
        return true;
    },

    buyProduct: function(productId, cb) {
        if (!window.iap) {
            return false;
        }
        SysAction.reportCount(GameName + ".buy." + productId);
        return this.buyProductLocal(productId, cb);
    },

    restoreTransactions: function(cb) {
        if (!window.iap) {
            return false;
        }
        game.topMask.show();
        window.iap.restoreTransactions(function(error, transactions) {
            game.topMask.hide();
            if (error) {
                console.log(error);
            } else if (transactions) {
                for (var i = 0; i < transactions.length; i++) {
                    console.log(
                        [transactions[i].productId,
                            transactions[i].id,
                            transactions[i].receipt
                        ]
                    );
                }
            }
            cb && cb(error, transactions);
        });
        return true;
    }

};

var SysActionNone = {};

(function() {
    var noop = function() {
        return false;
    };

    for (var p in SysAction) {
        SysActionNone[p] = noop;
    }

    if (!window.App) {
        // SysAction = SysActionNone;
    }
}());
