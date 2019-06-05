/**
 * Example webpack config
 */
const projectDir = __dirname;

module.exports = {
    mode: 'development',
    entry: projectDir + '/example/index.js',
    devServer: {
        contentBase: projectDir + '/example/', // Where to serve static files from (e.g.: index.html)
    },
    output: {
        path: projectDir + '/dist/example/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ]
    }
};
