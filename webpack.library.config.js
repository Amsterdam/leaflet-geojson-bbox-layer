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
        libraryTarget: 'umd',
        library: 'leafletGeojsonBboxLayer'
    },
    externals: ['leaflet'], // Don't include leaflet in library code
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            }
        ]
    },
};
