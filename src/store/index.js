import { compose } from 'redux';
import bootRedux from 'boot/redux';
import configureStore from './configureStore';

const initStore = compose(bootRedux, configureStore);
export default initStore();
