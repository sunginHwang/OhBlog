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

export function memberLogout(){
    return{
        type : types.USER_LOGOUT,
        promise: { method: 'get', url:commonTypes.SERVER_URL+'/api/Member/logoutMember', data: null }
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
    isloading : false
};

export default function memberReducers(state=initialState,action){

    switch(action.type){

        case types.USER_LOGIN_REQUEST : {
            return {
                ...state,
                isloading: false
            };
        }
        case types.USER_LOGIN_SUCCESS : {
            return {
                ...state,
                login : action.result.data,
                isloading: true
            };
        }
        case types.USER_LOGIN_FAILURE : {
            return {
                ...state,
                isloading: true
            };
        }

        case types.USER_LOGOUT_REQUEST : {
            return {
                ...state,
                isloading: false
            };
        }
        case types.USER_LOGOUT_SUCCESS : {
            return {
                ...state,
                login : action.result.data,
                isloading: true
            };
        }
        case types.USER_LOGOUT_FAILURE : {
            return {
                ...state,
                isloading: true
            };
        }

        default : {
            return state;break;
        }
    }

}