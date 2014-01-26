;
(function(scope, undefined) {
    'use strict';

    var Sound = scope.Sound = function(cfg) {
        for (var key in cfg) {
            this[key] = cfg[key]
        }
        this.init();
    };



    function noop() {

    }

    Sound.prototype = {
        audio: null,
        loop: false,
        muted: false,
        volume: 1,
        size: 1,
        lazyClone: true,
        init: function() {
            if (this.audio) {

                Sound.set(this.id, this);

                this.audio.loop = this.loop;
                this.audio.volume = this.volume;
                Sound.muteAudio(this.audio, !! this.muted);

                if (this.size > 1) {
                    this.pool = [];
                    this.pool.push(this.audio);
                    if (!this.lazyClone) {
                        for (var i = 1; i < this.size; i++) {
                            this.cloneAudio();
                        }
                    }
                    this.index = 0;
                    this.play = this.playMulti;
                } else {
                    this.play = this.playSingle;
                }
            } else {
                for (var key in this) {
                    if (typeof this[key] == "function") {
                        this[key] = noop;
                    }
                }
                this.play = noop;
            }

        },


        cloneAudio: function() {
            var _a = this.audio.cloneNode();
            _a.loop = this.loop;
            _a.volume = this.volume;
            Sound.muteAudio(_a, !! this.muted);
            this.pool.push(_a);
            return _a;
        },

        play: null,

        playSingle: function() {
            this.stop();
            this.audio.play();
        },
        playMulti: function() {
            if (this.pool.length <= this.index) {
                this.cloneAudio();
            }

            var a = this.audio = this.pool[this.index];
            if (a.currentTime) {
                a.currentTime = 0;
            } else if (a.seekTo) {
                a.seekTo(0);
            }
            a.play();
            this.index = (++this.index) % this.size;
        },

        getCurrentTime: function() {
            return this.audio.currentTime;
        },

        setCurrentTime: function(time) {
            if (this.audio.seekTo) {
                this.audio.seekTo(time);
                // }else if (this.audio.currentTime!=time){
            } else {
                this.audio.currentTime = time;
            }
        },
        setVolume: function(volume) {
            this.volume = volume;
            if (this.pool) {
                this.pool.forEach(function(audio) {
                    audio.volume = volume;
                });
            } else {
                this.audio.volume = volume;
            }
        },
        getVolume: function(volume) {
            return this.volume;
        },
        setMute: function(muted) {
            muted = this.muted = !! muted;
            if (this.pool) {
                this.pool.forEach(function(audio) {
                    Sound.muteAudio(audio, muted);
                });
            } else {
                Sound.muteAudio(this.audio, muted);
            }
        },
        getMute: function() {
            return this.muted;
        },

        pause: function() {
            this.audio.pause();
        },
        resume: function() {
            this.audio.play();
        },
        stop: function() {
            if (this.audio.stop) {
                this.audio.stop();
            } else {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
        }

    };

    Sound.muteAudio = function(audio, muted) {
        // if (muted) {
        //     audio.backVolume = audio.volume;
        //     audio.volume = 0;
        // } else {
        //     audio.volume = audio.backVolume || 1;
        // }
        audio.muted = muted;
    }

    var _cache = {};

    Sound.get = function(id) {
        return _cache[id];
    }
    Sound.set = function(id, sound) {
        _cache[id] = sound;
        return sound;
    }
    Sound.clear = function() {
        _cache = {};
    }
    Sound.remove = function(id) {
        var s = _cache[id];
        delete _cache[id];
        return s;
    }
    Sound.size = function() {
        var keys = Object.keys(_cache);
        return keys.length;
    }

    var methods = ["play", "stop", "pause", "resume", "setMute", "getMute", "setVolume", "getVolume"];

    methods.forEach(function(name) {
        // Sound[name]=function(args){
        //  var id=arguments[0];
        //  var s=Sound.get(id);
        //  if (s && s.audio){
        //      args=Array.prototype.slice.call(arguments,1);
        //      return s[name].apply(s,args);
        //  }
        //  console.log("Sound."+name, id , "failed");
        // }

        Sound[name] = function(id, arg) {
            var s = Sound.get(id);
            if (s && s.audio) {
                return s[name](arg)
            }
            // console.log("Sound."+name, id , "failed");
        }
    });

    Sound.muted = false;

    Sound.setMuteGlobal = function(mute, exclude, isExcludeByTag) {
        mute = !! mute;
        for (var id in _cache) {
            if (isExcludeByTag !== true && id === exclude) {
                continue;
            }
            var s = _cache[id];
            if (isExcludeByTag === true) {
                if (("tag" in s) && s.tag === tag) {
                    continue;
                }
            }
            if (s.setMute) {
                s.setMute(mute);
            } else {
                Sound.muteAudio(s, mute);
            }
        }
        Sound.muted = mute;
    };


    Sound.setMuteByTag = function(tag, mute) {
        mute = !! mute;
        for (var id in _cache) {
            var s = _cache[id];
            if (s.tag === tag) {
                if (s.setMute) {
                    s.setMute(mute);
                } else {
                    Sound.muteAudio(s, mute);
                }
            }
        }
        Sound[tag + "Muted"] = mute;
    };

    Sound.smartPlay = function(id, timeout) {
        var s = Sound.get(id);
        if (s && s.audio) {
            timeout = timeout || 200;
            var t = Sound.smartPlay.timer[id];
            var now = Date.now();
            if (!t || now - t > timeout) {
                Sound.smartPlay.timer[id] = now;
                return s.play();
            }
        }
    };

    Sound.smartPlay.timer = {};

    // uncomment below to remove sound play for ignoring sound
    // Sound.smartPlay = Sound.play = Sound.stop = function (){}

}(this));
