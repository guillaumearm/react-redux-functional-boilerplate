import { always } from 'ramda';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { spawn } from 'child_process';

import { isDev, isProd, isElectron } from './scripts/env';

import { host, port } from './scripts/config';
import config from './webpack.config';

const app = express();
const compiler = webpack(config);

const wdm = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
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
        spawn('electron', ['-r', 'babel-register', 'src/main.js'], {
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
