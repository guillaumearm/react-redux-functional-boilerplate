const webpack = require('webpack')
const validate = require('webpack-validator');

const { rejectIsNil } = require('./utils');

const {
    isDev, isProd, isTest, isElectron,
    SRC_PATH, BUILD_PATH, host, port, packageJson,
} = require('./env')
/* -------------------------------------------------------------------------- */

const devtool = isDev() ? 'source-map' : undefined;

// hot reload
const entry = rejectIsNil([
    isDev() ? 'react-hot-loader/patch' : undefined,
    isDev() ? `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`: undefined,
]);

// stringified NODE_ENV
const NODE_ENV_STRING = JSON.stringify(process.env.NODE_ENV || 'development');

const webpackConfig = {
    devServer: {
        host,
        port,
    },
    devtool,
    entry,
    output: {
        path: BUILD_PATH,
    },
    resolve: {
        modulesDirectories: [SRC_PATH, 'web_modules', 'node_modules'],
    },
    plugins: rejectIsNil([
        isDev() ? new webpack.HotModuleReplacementPlugin() : undefined,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': NODE_ENV_STRING,
            '__NODE_ENV__': NODE_ENV_STRING,
            '__DEVELOPMENT__': isDev(),
            '__PRODUCTION__': isProd(),
            '__TEST__': isTest(),
            '__ELECTRON__': isElectron(),
            '__NAME__': JSON.stringify(packageJson.name),
            '__VERSION__': JSON.stringify(packageJson.version),
            '__PACKAGEJSON__': JSON.stringify(packageJson),
        }),
    ]),
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
}
module.exports = validate(webpackConfig)
