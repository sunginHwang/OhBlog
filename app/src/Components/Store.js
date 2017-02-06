import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducer from '../reducers/index';

export default function configureStore() {

    const logger = createLogger();

    const store = createStore(reducer,applyMiddleware(thunk));

    return store;
}

