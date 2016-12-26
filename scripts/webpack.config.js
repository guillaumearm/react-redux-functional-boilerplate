/* ---- Imports ------------------------------------------------------------- */
const path = require('path');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConf = require('./webpack.base.config');
const { SRC_PATH } = require('./env');
/* -------------------------------------------------------------------------- */

const webpackConf = {
    entry: [path.join(SRC_PATH, 'render.js')],
    output: {
        filename: 'render.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(SRC_PATH, 'view.html'),
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

module.exports = validate(merge.strategy({
    entry: 'prepend',
})(baseConf, webpackConf));
