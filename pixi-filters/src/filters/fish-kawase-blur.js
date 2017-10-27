export default function() {
    const app = this;

    let kernels = [3, 2, 1];
    let pixelSize = [1, 1];

    app.addFilter('KawaseBlurFilter', {
        name: '<fish> KawaseBlur filter',
        fishOnly: true,
        enabled: false,
        global: false,
        args: [kernels, pixelSize],
        oncreate(folder) {
            const filter = this;

            folder.add(kernels, '0', 0, 8).name('kernels[0]')
                .onChange(function() {
                    filter.kernels = kernels;
                });
            folder.add(kernels, '1', 0, 8).name('kernels[1]')
                .onChange(function() {
                    filter.kernels = kernels;
                });
            folder.add(kernels, '2', 0, 8).name('kernels[2]')
                .onChange(function() {
                    filter.kernels = kernels;
                });
        }
    });
}
