export default function() {
    this.addFilter('BlurFilter', {
        name: '<fish> Blur filter',
        fishOnly: true,
        global: true,
        oncreate(folder) {
            this.blur = 6;
            this.quality = 3;

            folder.add(this, 'blur', 0, 100);
            folder.add(this, 'quality', 1, 10);
        }
    });
}
