const { always } = require('ramda');

const isDev = () => process.env.NODE_ENV === 'development'
const isProd = () => process.env.NODE_ENV === 'production'
const isTest = () => process.env.NODE_ENV === 'test';
const isElectron = always(require('yargs').argv.electron);

module.exports = {
    isDev,
    isProd,
    isTest,
    isElectron,
};
