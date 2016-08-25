const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = () => process.env.NODE_ENV === 'production'
const isDev = () => process.env.NODE_ENV === 'development'

const ramdaLoaderDebug = isDev() ? '?debug=true' : ''
const ramdaLoader = 'ramda-loader' + ramdaLoaderDebug

const config = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        __dirname + '/src/index.js',
    ],
    output: {
        path: __dirname + '/build/',
        filename: '[name].js',
    },
    resolve: {
        modulesDirectories: [__dirname + '/src', 'web_modules', 'node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            '__PRODUCTION__': isProd(),
            '__DEVELOPMENT__': isDev(),
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    ramdaLoader,
                    'babel-loader',
                    'react-hot/webpack',
                    // ramdaLoader,
                ],
                exclude: /node_modules/,
            },
        ],
    },
}

module.exports = config
