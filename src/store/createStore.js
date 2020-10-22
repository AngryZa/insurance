import {createStore} from 'redux';
import reducer from './reducer';
import initState from './action';

const store = createStore(reducer,initState);

export default store;