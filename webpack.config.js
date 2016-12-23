/* global process __dirname module */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const { always, reject, isNil } = require('ramda');
const rejectIsNil = reject(isNil);

/* ---- Config -------------------------------------------------------------- */
const { host, port, packageJson } = require('./scripts/config');
/* -------------------------------------------------------------------------- */

const { isDev, isProd, isTest } = require('./scripts/env');
const isElectron = always(require('yargs').argv.electron);

const buildFolder = isDev() ? '/build/dev/' : '/build/prod/';

const devtool = isDev() ? 'source-map' : ''

const entry = rejectIsNil([
    __dirname + '/src/index.js',
    isDev() ? 'react-hot-loader/patch' : undefined,
    isDev() ? `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`: undefined,
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
        path: __dirname + buildFolder,
        filename: 'index.js',
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
            '__ELECTRON__': isElectron(),
            '__NAME__': JSON.stringify(packageJson.name),
            '__VERSION__': JSON.stringify(packageJson.version),
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


if (isElectron()) {
    webpackConfig.target = webpackTargetElectronRenderer(webpackConfig);
}

module.exports = webpackConfig
