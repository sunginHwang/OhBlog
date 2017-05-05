import { combineReducers } from 'redux';
import boardReducers from './boardReducers'
import memberReducers from './memberReducers'
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    boardReducers,memberReducers,  routing: routerReducer
})

