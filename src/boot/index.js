console.log(`Running in ${process.env.NODE_ENV} mode.`)

// load styles
import 'styles'

if (__PRODUCTION__) {
    module.exports = require('./boot.prod')
} else {
    module.exports = require('./boot.dev')
}
