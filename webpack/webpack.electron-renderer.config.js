const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const { isElectron } = require('../scripts/env');
const webpackConfig = require('./webpack.config.js');

if (isElectron()) {
    webpackConfig.target = webpackTargetElectronRenderer(webpackConfig);
}

module.exports = webpackConfig
