import {createStore} from 'redux';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(
    initialState,
    rootReducer,
);

export default store;