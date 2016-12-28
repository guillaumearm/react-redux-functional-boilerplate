const path = require('path');
const validate = require('webpack-validator');
const merge = require('webpack-merge');

const { SRC_PATH } = require('./env');
const baseConf = require('./webpack.base.config');

module.exports = validate(merge(baseConf, {
    target: 'electron-main',
    entry: [path.join(SRC_PATH, 'main')],
    output: {
        filename: 'main.js',
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    node: {
        __dirname: false,
        __filename: false,
    },
}))
