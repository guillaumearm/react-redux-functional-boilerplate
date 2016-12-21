/* global process __dirname module */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { always, reject, isNil } = require('ramda');
const rejectIsNil = reject(isNil);

/* ---- Config -------------------------------------------------------------- */
const { host, port } = require('./scripts/config');
/* -------------------------------------------------------------------------- */

const isDev = () => process.env.NODE_ENV === 'development'
const isProd = () => process.env.NODE_ENV === 'production'
const isTest = always(false);
const distFolder = isDev() ? '/dist/dev/' : '/dist/prod/';

const devtool = isDev() ? 'source-map' : ''

const entry = rejectIsNil([
    __dirname + '/src/index.js',
    isDev() ? `webpack-dev-server/client?http://${host}:${port}` : undefined,
    isDev() ? 'react-hot-loader/patch' : undefined,
    isDev() ? 'webpack/hot/only-dev-server' : undefined,
]);

const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development')

const webpackConfig = {
    devServer: {
        host,
        port,
    },
    devtool,
    entry,
    output: {
        path: __dirname + distFolder,
        filename: '[name].js',
    },
    resolve: {
        modulesDirectories: [__dirname + '/src', 'web_modules', 'node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': NODE_ENV,
            '__NODE_ENV__': NODE_ENV,
            '__DEVELOPMENT__': isDev(),
            '__PRODUCTION__': isProd(),
            '__TEST__': isTest(),
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

module.exports = webpackConfig
