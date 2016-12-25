import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { spawn } from 'child_process';

import { host, port, isElectron, isDev } from './webpack/env';

let webpackConfig;
if (isElectron())
    webpackConfig = require('./webpack/webpack.electron-renderer.config.js');
else
    webpackConfig = require('./webpack/webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);

const wdm = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
    },
});

app.use(wdm);
app.use(webpackHotMiddleware(compiler));

const server = app.listen(port, host, serverError => {
    if (serverError) {
        return console.error(serverError);
    }

    if (isElectron()) {
        const mainPath = `build/${isDev() ? 'dev' : 'prod'}/main.js`;
        spawn('electron', [mainPath], {
            shell: true, env: process.env, stdio: 'inherit',
        })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }

    console.log(`Listening at http://${host}:${port}`);
});

process.on('SIGTERM', () => {
    console.log('Stopping dev server');
    wdm.close();
    server.close(() => {
        process.exit(0);
    });
});
