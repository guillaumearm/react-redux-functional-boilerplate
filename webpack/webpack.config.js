/* ---- Imports ------------------------------------------------------------- */
const path = require('path');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConf = require('./webpack.base.config');
const { SRC_PATH } = require('./env');
/* -------------------------------------------------------------------------- */

const webpackConfig = {
    entry: path.join(SRC_PATH, 'index.js'),
    output: {
        filename: 'index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(SRC_PATH, 'index.html'),
        }),
        new ExtractTextPlugin('styles.css', {
            allChunks: true,
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader',
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
};

module.exports = validate(merge(baseConf, webpackConfig));
