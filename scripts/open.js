const opn = require('opn');
/* ---- Config -------------------------------------------------------------- */
const { host, port } = require('./env');
/* -------------------------------------------------------------------------- */
const options = {
  wait: false,
};

opn(`http://${host}:${port}`, options);
