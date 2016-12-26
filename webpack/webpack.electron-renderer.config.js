const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const { isElectron } = require('./env');
const webpackConfig = require('./webpack.config.js');

if (isElectron()) {
    webpackConfig.target = webpackTargetElectronRenderer(webpackConfig);
}

module.exports = webpackConfig
