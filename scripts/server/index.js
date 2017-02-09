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

let electronChildProcess = null;
const startElectron = () => {
    if (isElectron()) {
        const mainPath = `build/${isDev() ? 'dev' : 'prod'}/main.js`;
        const exit = (code) => {
            console.info('App exited.');
            return stopDevServer(code);
        };
        electronChildProcess = spawn('electron', [mainPath], {
            env: { ...process.env, WEBPACK_DEV_SERVER: 'on' },
            detached: true,
            shell: true,
            stdio: 'inherit',
        })
        .on('close', (code, signal) => signal !== 'SIGHUP' && exit(code))
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

const watchMain = compiler => {
    compiler.watch({}, (err, stats) => {
        if (err) {
            console.error(err);
            console.error(stats.toJson().errors);
            process.exit(1);
        }
        restartElectron('SIGHUP');
        console.info(`${webpackElectronMainConf.output.filename} compiled`);
    });
}

if (isElectron()) {
    watchMain(mainCompiler);
}

let server;
let wdm;
const startDevServer = (compiler) => {
    const app = express();
    wdm = webpackDevMiddleware(compiler, {
        publicPath: webpackConf.output.publicPath,
        stats: {
            colors: true,
        },
    });

    app.use(wdm);
    app.use(webpackHotMiddleware(compiler));
    server = app.listen(port, host, serverError => {
        if (serverError) {
            return console.error(serverError);
        }

        console.log(`listening at http://${host}:${port}`);
    });
}
const stopDevServer = (code = 0) => {
    if (wdm && server) {
        console.info('Closing dev server...');
        server.close(() => {
            console.info('Dev server closed.');
            process.exit(code);
        });
        setTimeout(() => { // prevents to server.close freeze
            process.exit(code)
        }, 1000)
    } else process.exit(code);
}

startDevServer(compiler);

process.on('SIGTERM', stopDevServer);

process.on('SIGINT', () => {
    stopElectron('SIGINT');
    stopDevServer();
})
