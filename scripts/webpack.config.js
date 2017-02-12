/* ---- Imports ------------------------------------------------------------- */
const { propOr } = require('ramda');
const path = require('path');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const merge = require('webpack-merge').strategy({
  entry: 'prepend',
});

const baseConf = require('./webpack.base.config');
const { config, SRC_PATH, isElectron } = require('./env');

const view = propOr({}, 'view', config);
/* -------------------------------------------------------------------------- */

const webpackConf = {
  entry: [path.join(SRC_PATH, 'render.jsx')],
  output: {
    filename: 'render.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'view.ejs'),
      title: view.title,
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
    ],
  },
};

if (isElectron()) {
  webpackConf.target = webpackTargetElectronRenderer(webpackConf);
}

module.exports = validate(merge(baseConf, webpackConf));
