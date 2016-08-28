import { compose } from 'redux'
import configureStore from './configureStore'
import bootRedux from 'boot/redux'

const initStore = compose(bootRedux, configureStore)
export default initStore()
