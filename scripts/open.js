const opn = require('opn');
const { propOr } = require('ramda');
/* ---- Config -------------------------------------------------------------- */
const { host, port } = require('./config');
/* -------------------------------------------------------------------------- */
const options = {
    wait: false,
};

opn(`http://${host}:${port}`, options);
