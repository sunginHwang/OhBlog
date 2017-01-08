import * as types from '../const/OhjicActionType'


export function GetOhjicTable(){
    return{
        type : types.GET_TODO,
        userdata : {
            ohjicTr : [
                {
                    id : 1,
                    title : "Read the React",
                    writer : "sungin",
                    comment : 5
                },
                {
                    id : 2,
                    title : "Test the React",
                    writer : "joihhon",
                    comment : 2
                },
            ]
        }
    }
}

export function DeleteOhjicTable(){
    return{
        type : types.DELETE_TODO,
        userdata : {
            ohjicTr : []
        }
    }
}


const initialState ={
    ohjic : {
        ohjicTr : [
            {
                id : 3,
                title : "Read the React2"
            },
            {
                id : 4,
                title : "Test Sung In2"
            },
            {
                id : 5,
                title : "Test Sung In23"
            },
        ],
    }
};

export default function reducer(state=initialState,action){

    switch(action.type){

        case types.GET_TODO : {
            return Object.assign({}, state, {
                ohjic : action.userdata
            });
            break;
        }

        case types.DELETE_TODO : {
            return Object.assign({},state,{
                ohjic : action.userdata
            });
            break;
        }
        default : {
            return state;break;
        }
    }

}