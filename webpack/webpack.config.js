/* global process __dirname module */
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const { always, reject, isNil } = require('ramda');
const rejectIsNil = reject(isNil);

/* ---- Config -------------------------------------------------------------- */
const { host, port, packageJson } = require('../scripts/config');
const { isDev, isProd, isTest, isElectron } = require('../scripts/env');
const APP_PATH = path.join(__dirname,  '..');
const SRC_PATH = path.join(APP_PATH, 'src');
const BUILD_PATH = path.join(APP_PATH, isDev() ? 'build/dev' : 'build/prod');
/* -------------------------------------------------------------------------- */

const devtool = isDev() ? 'source-map' : ''

const entry = rejectIsNil([
    path.join(SRC_PATH, 'index.js'),
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
        path: BUILD_PATH,
        filename: 'index.js',
    },
    resolve: {
        modulesDirectories: [SRC_PATH, 'web_modules', 'node_modules'],
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
            template: path.join(SRC_PATH, 'index.html'),
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
