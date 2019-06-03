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
