const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        __dirname + '/src/index.js',
    ],
    output: {
        path: __dirname + '/build/',
        filename: '[name].js',
    },
    resolve: {
        modulesDirectories: ['web_modules', 'node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            '__PRODUCTION__': process.env.NODE_ENV === 'production',
            '__DEVELOPMENT__': process.env.NODE_ENV === 'development',
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                    'react-hot/webpack',
                ],
                exclude: /node_modules/,
            },
        ],
    },
}

module.exports = config
