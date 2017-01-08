/**
 * Created by hwangseong-in on 2016. 11. 27..
 */
import * as types from '../const/OhjicActionType'


export function memberLogin(member_key,member_id){
    return{
        type : types.LOGIN_TODO,
        login : {
            member :
                {
                    member_key : member_key,
                    member_id : member_id
                }

        }
    }
}

const initialState ={
    login : {
        member :
            {
                member_key : -1,
                member_id : 'none'
            }
    }
};

export default function memberReducers(state=initialState,action){

    switch(action.type){

        case types.LOGIN_TODO : {
            return Object.assign({}, state, {
                login : action.login
            });
            break;
        }

        default : {
            return state;break;
        }
    }

}