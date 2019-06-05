/**
 * Library webpack config
 */
const projectDir = __dirname;

module.exports = {
    mode: 'production',
    devtool: 'source-map',

    entry: projectDir + '/src/geojsonBboxLayer.js',
    output: {
        path: projectDir + '/dist/library/',
        publicPath: '/dist/library/',
        filename: 'leaflet-geojson-bbox-layer.js',
        library: 'leafletGeojsonBboxLayer',
        // libraryTarget: 'umd'
    },

    externals: {
        'leaflet': 'leaflet' // Don't include leaflet in library code
    }
};
