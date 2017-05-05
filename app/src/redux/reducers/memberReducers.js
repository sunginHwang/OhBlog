/**
 * Created by hwangseong-in on 2016. 11. 27..
 */
import * as types from '../../const/ActionType'
import * as commonTypes from '../../const/CommonVal';

export function memberLogin(member_id,member_password){
    return{
        type : types.USER_LOGIN,
        promise: { method: 'get', url:commonTypes.SERVER_URL+'/api/Member/loginMember?member_id='+member_id+'&member_password='+member_password, data: null }
    }
}

const initialState ={
    login : {
        member :
            {
                member_key : -1,
                member_id : 'none'
            }
    },
    fetchingUpdate : false
};

export default function memberReducers(state=initialState,action){

    switch(action.type){

        case types.USER_LOGIN_REQUEST : {
            return {
                ...state,
                fetchingUpdate: true
            };
        }
        case types.USER_LOGIN_SUCCESS : {
            return {
                ...state,
                login : action.result.data,
                fetchingUpdate: true
            };
        }
        case types.USER_LOGIN_FAILURE : {
            return {
                ...state,
                fetchingUpdate: true
            };
        }

        default : {
            return state;break;
        }
    }

}