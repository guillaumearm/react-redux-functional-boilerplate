import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { spawn } from 'child_process';

import { host, port, isElectron, isDev } from '../env';
import webpackConf from '../webpack.config.js';
import webpackElectronMainConf from '../webpack.electron-main.config.js'

const compiler = webpack(webpackConf);
const mainCompiler = webpack(webpackElectronMainConf);

const wdm = webpackDevMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath,
    stats: {
        colors: true,
    },
});

const app = express();
app.use(wdm);
app.use(webpackHotMiddleware(compiler));

let electronChildProcess = null;
const startElectron = () => {
    if (isElectron()) {
        const mainPath = `build/${isDev() ? 'dev' : 'prod'}/main.js`;
        electronChildProcess = spawn('electron', [mainPath], {
            env: process.env,
            detached: true,
            shell: true,
            stdio: 'inherit',
        })
        .on('close', (code, signal) => signal !== 'SIGHUP' && process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
};

const stopElectron = (signal = 'SIGINT') => {
    if (electronChildProcess) {
        process.kill(-electronChildProcess.pid, signal);
        electronChildProcess = null;
    }
};

const restartElectron = (signal) => {
    stopElectron(signal);
    setImmediate(startElectron);
}

mainCompiler.watch({}, (err, stats) => {
    if (err) {
        console.error(err);
        console.error(stats.toJson().errors);
        process.exit(1);
    }
    restartElectron('SIGHUP');
    console.info(`${webpackConf.output.filename} compiled`);
});

const server = app.listen(port, host, serverError => {
    if (serverError) {
        return console.error(serverError);
    }

    console.log(`Listening at http://${host}:${port}`);
});

const stopDevServer = () => {
    console.log('Stopping dev server');
    wdm.close(() => {
        server.close(() => {
            process.exit(0);
        });
    });
}

process.on('SIGTERM', stopDevServer);

process.on('SIGINT', () => {
    stopElectron('SIGINT');
    stopDevServer();
})
