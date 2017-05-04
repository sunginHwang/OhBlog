import { combineReducers } from 'redux';
import ohjicBoard from './OhjicReducers'
import memberReducers from './memberReducers'
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    ohjicBoard,memberReducers,  routing: routerReducer
})

