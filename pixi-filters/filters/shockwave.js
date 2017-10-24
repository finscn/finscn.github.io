// shockwave

FilterMakers.push(function() {
    var filter;

    filter = new PIXI.filters.ShockwaveFilter([stageWidth / 2, stageHeight / 2]);
    filter.enabled = false;

    var maxTime = 1200;

    // var time = 0;
    // var startTime = Date.now();
    // emitter.addListener('tick', function(delta, count) {
    //     time = (Date.now() - startTime) % maxTime;
    //     filter.time = time;
    // });

    var folder = gui.addFolder('ShockwaveFilter');
    // folder.open();
    folder.add(filter, 'enabled').onChange(trackEvent.bind(folder));
    folder.add(filter, 'time', 0, maxTime);
    folder.add(filter, 'amplitude', 1, 100);
    folder.add(filter, 'wavelength', 2, 400);
    folder.add(filter, 'brightness', 0.2, 2.0);
    folder.add(filter, 'radius', 100, 2000);
    folder.add(filter.center, '0', 0, stageWidth).name('center.x');
    folder.add(filter.center, '1', 0, stageHeight).name('center.y');

    return filter;
});
