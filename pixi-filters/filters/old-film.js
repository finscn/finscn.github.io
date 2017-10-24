// old-film

FilterMakers.push(function(){
    var filter;

    filter = new PIXI.filters.OldFilmFilter();
    filter.enabled = false;

    emitter.addListener('tick', function(delta, count) {
        filter.randomValue = Math.random();
    });

    var folder = gui.addFolder('OldFilmFilter');
    // folder.open();
    folder.add(filter, 'enabled').onChange(trackEvent.bind(folder));
    // folder.add(filter, 'randomValue', 0, 1);
    folder.add(filter, 'sepia', 0, 1);
    folder.add(filter, 'noise', 0, 1);
    folder.add(filter, 'scratch', 0, 1);
    folder.add(filter, 'scratchWidth', 1, 30);
    folder.add(filter, 'vignetting', 0, 1);

    return filter;
});
