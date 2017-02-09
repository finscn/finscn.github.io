var ImageMapping=ImageMapping||{};
(function(){

var _imgs={
  "face-1": {
    "img": "pack-2",
    "x": 0,
    "y": 88,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-10": {
    "img": "pack-2",
    "x": 600,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-11": {
    "img": "pack-2",
    "x": 750,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-13": {
    "img": "pack-2",
    "x": 150,
    "y": 88,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-14": {
    "img": "pack-2",
    "x": 300,
    "y": 88,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-18": {
    "img": "pack-2",
    "x": 0,
    "y": 278,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-19": {
    "img": "pack-2",
    "x": 150,
    "y": 278,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-20": {
    "img": "pack-2",
    "x": 300,
    "y": 278,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-23": {
    "img": "pack-2",
    "x": 454,
    "y": 0,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-24": {
    "img": "pack-2",
    "x": 454,
    "y": 190,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-26": {
    "img": "pack-2",
    "x": 604,
    "y": 0,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-27": {
    "img": "pack-2",
    "x": 604,
    "y": 190,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-28": {
    "img": "pack-2",
    "x": 754,
    "y": 0,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-29": {
    "img": "pack-2",
    "x": 754,
    "y": 190,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-3": {
    "img": "pack-2",
    "x": 0,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-30": {
    "img": "pack-2",
    "x": 150,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-4": {
    "img": "pack-2",
    "x": 300,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "face-7": {
    "img": "pack-2",
    "x": 450,
    "y": 468,
    "w": 150,
    "h": 190,
    "ox": 0,
    "oy": 0,
    "sw": 150,
    "sh": 190
  },
  "icon_newrecord": {
    "img": "pack-2",
    "x": 604,
    "y": 380,
    "w": 72,
    "h": 32,
    "ox": 0,
    "oy": 0,
    "sw": 72,
    "sh": 32
  },
  "icon_noad-big": {
    "img": "pack-2",
    "x": 454,
    "y": 380,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_noad": {
    "img": "pack-2",
    "x": 604,
    "y": 412,
    "w": 50,
    "h": 50,
    "ox": 0,
    "oy": 0,
    "sw": 50,
    "sh": 50
  },
  "icon_play": {
    "img": "pack-2",
    "x": 754,
    "y": 380,
    "w": 80,
    "h": 80,
    "ox": 0,
    "oy": 0,
    "sw": 80,
    "sh": 80
  },
  "icon_plus": {
    "img": "pack-2",
    "x": 514,
    "y": 380,
    "w": 40,
    "h": 40,
    "ox": 0,
    "oy": 0,
    "sw": 40,
    "sh": 40
  },
  "icon_score": {
    "img": "pack-2",
    "x": 654,
    "y": 412,
    "w": 44,
    "h": 44,
    "ox": 0,
    "oy": 0,
    "sw": 44,
    "sh": 44
  },
  "icon_shop": {
    "img": "pack-2",
    "x": 834,
    "y": 380,
    "w": 60,
    "h": 60,
    "ox": 0,
    "oy": 0,
    "sw": 60,
    "sh": 60
  },
  "icon_time": {
    "img": "pack-2",
    "x": 698,
    "y": 412,
    "w": 44,
    "h": 44,
    "ox": 0,
    "oy": 0,
    "sw": 44,
    "sh": 44
  },
  "timebar-bg-freeze": {
    "img": "pack-2",
    "x": 0,
    "y": 44,
    "w": 454,
    "h": 44,
    "ox": 0,
    "oy": 0,
    "sw": 454,
    "sh": 44
  },
  "timebar-bg": {
    "img": "pack-2",
    "x": 0,
    "y": 0,
    "w": 454,
    "h": 44,
    "ox": 0,
    "oy": 0,
    "sw": 454,
    "sh": 44
  }
};

for (var key in _imgs){ ImageMapping[key]=_imgs[key]; }

})();