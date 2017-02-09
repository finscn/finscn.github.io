var ImageMapping=ImageMapping||{};
(function(){

var _imgs={
  "coin-bg": {
    "img": "pack-1",
    "x": 300,
    "y": 278,
    "w": 68,
    "h": 82,
    "ox": 0,
    "oy": 0,
    "sw": 68,
    "sh": 82
  },
  "coin": {
    "img": "pack-1",
    "x": 300,
    "y": 360,
    "w": 68,
    "h": 82,
    "ox": 0,
    "oy": 0,
    "sw": 68,
    "sh": 82
  },
  "face-0": {
    "img": "pack-1",
    "x": 866,
    "y": 0,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-12": {
    "img": "pack-1",
    "x": 416,
    "y": 0,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-15": {
    "img": "pack-1",
    "x": 566,
    "y": 0,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-16": {
    "img": "pack-1",
    "x": 0,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-17": {
    "img": "pack-1",
    "x": 150,
    "y": 88,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-2": {
    "img": "pack-1",
    "x": 0,
    "y": 278,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-21": {
    "img": "pack-1",
    "x": 150,
    "y": 278,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-22": {
    "img": "pack-1",
    "x": 0,
    "y": 88,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-25": {
    "img": "pack-1",
    "x": 416,
    "y": 190,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-31": {
    "img": "pack-1",
    "x": 150,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-5": {
    "img": "pack-1",
    "x": 566,
    "y": 190,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-6": {
    "img": "pack-1",
    "x": 716,
    "y": 0,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-8": {
    "img": "pack-1",
    "x": 716,
    "y": 190,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-9": {
    "img": "pack-1",
    "x": 866,
    "y": 190,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "icon_ad": {
    "img": "pack-1",
    "x": 360,
    "y": 468,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_auto": {
    "img": "pack-1",
    "x": 716,
    "y": 380,
    "w": 80,
    "h": 80,
    "ox": 0,
    "oy": 0,
    "sw": 80,
    "sh": 80
  },
  "icon_close": {
    "img": "pack-1",
    "x": 796,
    "y": 380,
    "w": 64,
    "h": 64,
    "ox": 0,
    "oy": 0,
    "sw": 64,
    "sh": 64
  },
  "icon_coin": {
    "img": "pack-1",
    "x": 600,
    "y": 468,
    "w": 50,
    "h": 50,
    "ox": 0,
    "oy": 0,
    "sw": 50,
    "sh": 50
  },
  "icon_exit": {
    "img": "pack-1",
    "x": 300,
    "y": 88,
    "w": 80,
    "h": 80,
    "ox": 0,
    "oy": 0,
    "sw": 80,
    "sh": 80
  },
  "icon_freeze": {
    "img": "pack-1",
    "x": 300,
    "y": 168,
    "w": 80,
    "h": 80,
    "ox": 0,
    "oy": 0,
    "sw": 80,
    "sh": 80
  },
  "icon_help": {
    "img": "pack-1",
    "x": 480,
    "y": 468,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_leader-big": {
    "img": "pack-1",
    "x": 416,
    "y": 380,
    "w": 80,
    "h": 80,
    "ox": 0,
    "oy": 0,
    "sw": 80,
    "sh": 80
  },
  "icon_leader": {
    "img": "pack-1",
    "x": 496,
    "y": 380,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_new": {
    "img": "pack-1",
    "x": 380,
    "y": 88,
    "w": 30,
    "h": 30,
    "ox": 0,
    "oy": 0,
    "sw": 30,
    "sh": 30
  },
  "icon_pause": {
    "img": "pack-1",
    "x": 946,
    "y": 380,
    "w": 64,
    "h": 64,
    "ox": 0,
    "oy": 0,
    "sw": 64,
    "sh": 64
  },
  "icon_quit": {
    "img": "pack-1",
    "x": 566,
    "y": 380,
    "w": 80,
    "h": 80,
    "ox": 0,
    "oy": 0,
    "sw": 80,
    "sh": 80
  },
  "icon_rate": {
    "img": "pack-1",
    "x": 646,
    "y": 380,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_restart": {
    "img": "pack-1",
    "x": 866,
    "y": 380,
    "w": 80,
    "h": 80,
    "ox": 0,
    "oy": 0,
    "sw": 80,
    "sh": 80
  },
  "icon_share": {
    "img": "pack-1",
    "x": 420,
    "y": 468,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_sound-off": {
    "img": "pack-1",
    "x": 300,
    "y": 468,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_sound-on": {
    "img": "pack-1",
    "x": 540,
    "y": 468,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "timebar-value-freeze": {
    "img": "pack-1",
    "x": 0,
    "y": 44,
    "w": 416,
    "h": 44,
    "ox": 0,
    "oy": 0,
    "sw": 416,
    "sh": 44
  },
  "timebar-value": {
    "img": "pack-1",
    "x": 0,
    "y": 0,
    "w": 416,
    "h": 44,
    "ox": 0,
    "oy": 0,
    "sw": 416,
    "sh": 44
  }
};

for (var key in _imgs){ ImageMapping[key]=_imgs[key]; }

})();