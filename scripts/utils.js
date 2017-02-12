const { reject, isNil } = require('ramda');

const rejectIsNil = reject(isNil);

module.exports = {
  rejectIsNil,
};
