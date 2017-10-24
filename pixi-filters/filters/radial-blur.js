// radial-blur

FilterMakers.push(function() {
    var filter;
    filter = new PIXI.filters.RadialBlurFilter(20, [stageWidth / 2, stageHeight / 2], 15, 300);
    filter.enabled = false;

    var folder = gui.addFolder('RadialBlurFilter');
    folder.add(filter, 'enabled').onChange(trackEvent.bind(folder));
    folder.add(filter, 'angle', -180, 180);
    folder.add(filter.center, '0', 0, stageWidth).name('center.x');
    folder.add(filter.center, '1', 0, stageHeight).name('center.y');
    folder.add(filter, 'radius', -1, Math.max(stageHeight, stageWidth));
    folder.add(filter, 'kernelSize', [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]).name('kernelSize');

    return filter;
});
