import { createStore, applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducer from '../reducers/index';
import asnycMiddleware from '../middleware/asnycMiddleware';

export default function configureStore(initialState) {

    const logger = createLogger();
    const enhancer = compose(applyMiddleware(thunk, logger, asnycMiddleware));
    const store = createStore(reducer,initialState,enhancer);

    return store;
}

