const path = require('path');
const { argv } = require('yargs');
const { readFileSync } = require('fs');
const { invoker, compose, propOr, always, find, both, test } = require('ramda');

const APP_PATH = path.join(__dirname, '..');

/* ---- Config -------------------------------------------------------------- */
const toString = invoker(0, 'toString');
const getPackageJson = compose(JSON.parse, toString, readFileSync);
const getConfig = propOr({}, 'config');
/* -------------------------------------------------------------------------- */
const findIsDevServer = compose(Boolean, find(test(/scripts\/server/)));

const isDev = () => process.env.NODE_ENV === 'development';
const isProd = () => process.env.NODE_ENV === 'production';
const isTest = () => process.env.NODE_ENV === 'test';
const isElectron = always(Boolean(argv.electron));

const isDevServer = always(findIsDevServer(process.argv));
const isHMR = both(isDev, isDevServer);

const packageJson = getPackageJson(path.join(APP_PATH, './package.json'));
const config = getConfig(packageJson);
const devServer = propOr({}, 'devServer')(config);


module.exports = {
  APP_PATH,
  SRC_PATH: path.join(APP_PATH, 'src'),
  BUILD_PATH: path.join(APP_PATH, isDev() ? 'build/dev' : 'build/prod'),
  host: propOr('0.0.0.0', 'host')(devServer),
  port: propOr(8080, 'port')(devServer),
  config,
  packageJson,
  isDev,
  isProd,
  isTest,
  isElectron,
  isDevServer,
  isHMR,
};
