console.log(`Running in ${process.env.NODE_ENV} mode.`)

if (__PRODUCTION__) {
    module.exports = require('./boot.prod')
} else {
    module.exports = require('./boot.dev')
}
