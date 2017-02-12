/* eslint-disable global-require */

if (__PRODUCTION__) {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
