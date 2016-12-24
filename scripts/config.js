const { invoker, compose, propOr } = require('ramda');
const { readFileSync } = require('fs');
/* ---- Config -------------------------------------------------------------- */
const toString = invoker(0, 'toString');
const getPackageJson = compose(JSON.parse, toString, readFileSync);
const getConfig = propOr({}, 'config');

const packageJson = getPackageJson('./package.json');
const config = getConfig(packageJson);

const port = propOr(8080, 'port')(config);
const host = propOr('0.0.0.0', 'host')(config);

module.exports = {
    packageJson,
    config,
    host,
    port,
};
