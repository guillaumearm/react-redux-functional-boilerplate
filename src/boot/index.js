console.log(`Running in ${__NODE_ENV__} mode.`)

// load styles
import 'styles'

// Specific boot modes.
if (__PRODUCTION__) {
    module.exports = require('./boot.prod')
} else {
    module.exports = require('./boot.dev')
}
