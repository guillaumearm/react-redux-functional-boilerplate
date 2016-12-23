const opn = require('opn');
/* ---- Config -------------------------------------------------------------- */
const { host, port } = require('./config');
/* -------------------------------------------------------------------------- */
const options = {
    wait: false,
};

opn(`http://${host}:${port}`, options);
