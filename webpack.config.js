/* global process __dirname module */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = () => process.env.NODE_ENV === 'development'
const isProd = () => process.env.NODE_ENV === 'production'

const devtool = isDev() ? 'source-map' : ''

const config = {
    devtool,
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
        modulesDirectories: [__dirname + '/src', 'web_modules', 'node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            '__NODE_ENV__': JSON.stringify(process.env.NODE_ENV || 'development'),
            '__DEVELOPMENT__': isDev(),
            '__PRODUCTION__': isProd(),
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css', {
            allChunks: true,
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'ramda-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader',
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            },
        ],
    },
}

module.exports = config
