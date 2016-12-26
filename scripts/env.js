const path = require('path');
const { argv } = require('yargs');
const { readFileSync } = require('fs');
const { invoker, compose, propOr, always } = require('ramda');

const APP_PATH = path.join(__dirname,  '..');

/* ---- Config -------------------------------------------------------------- */
const toString = invoker(0, 'toString');
const getPackageJson = compose(JSON.parse, toString, readFileSync);
const getConfig = propOr({}, 'devConfig');
/* -------------------------------------------------------------------------- */

const isDev = () => process.env.NODE_ENV === 'development'
const isProd = () => process.env.NODE_ENV === 'production'
const isTest = () => process.env.NODE_ENV === 'test';
const isElectron = always(Boolean(argv.electron));

const packageJson = getPackageJson(path.join(APP_PATH, './package.json'));
const config = getConfig(packageJson);

module.exports = {
    APP_PATH,
    SRC_PATH: path.join(APP_PATH, 'src'),
    BUILD_PATH: path.join(APP_PATH, isDev() ? 'build/dev' : 'build/prod'),
    host: propOr('0.0.0.0', 'host')(config),
    port: propOr(8080, 'port')(config),
    config,
    packageJson,
    isDev,
    isProd,
    isTest,
    isElectron,
}
