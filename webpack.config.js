const projectDir = __dirname;

module.exports = {
    mode: 'development',
    entry: projectDir + '/src/index.js',
    output: {
        path: projectDir + '/dist',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    }
};
