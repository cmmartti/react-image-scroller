const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    if (env === 'prod') env = 'production';
    if (env === 'dev') env = 'development';
    return {
        mode: env || 'production',

        entry: {
            app: path.resolve(__dirname, 'demo/src/app.js'),
        },
        output: {
            path: path.resolve(__dirname, 'demo/dist'),
            filename: '[name].js',
            publicPath: '/',
        },

        devtool: 'cheap-module-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'demo/src'),
            port: 8000,
        },
        resolve: {
            alias: {
                'react-image-scroller': path.resolve(
                    __dirname,
                    'src/ImageScroller'
                ),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: false,
                template: 'demo/src/index.html',
            }),
            new CopyWebpackPlugin([
                {
                    from: 'demo/src/images',
                    to: 'images',
                },
            ]),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: {loader: 'babel-loader'},
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.html$/,
                    use: [{loader: 'html-loader'}],
                },
            ],
        },
    };
};
