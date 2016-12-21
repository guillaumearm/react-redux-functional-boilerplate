const { invoker, compose, propOr } = require('ramda');
const { readFileSync } = require('fs');
/* ---- Config -------------------------------------------------------------- */
const toString = invoker(0, 'toString');
const getConfig = compose(propOr({}, 'config'), JSON.parse, toString, readFileSync);
const config = getConfig('./package.json');

const port = propOr(8080, 'port')(config);
const host = propOr('0.0.0.0', 'host')(config);

module.exports = {
    config,
    host,
    port,
};
