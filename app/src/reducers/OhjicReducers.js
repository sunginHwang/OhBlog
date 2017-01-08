import * as types from '../const/OhjicActionType'


export function GetOhjicTable(data){
    return{
        type : types.GET_TODO,
        userdata : {
            BoardLists : data
        }
    }
}

export function GetBoardCategory(boardCategory){
    return{
        type : types.GET_CATEGORY,
        boardCategory
    }

}

export function DeleteOhjicTable(){
    return{
        type : types.DELETE_TODO,
        userdata : {
            BoardLists : []
        }
    }
}

export function ReadOhjicBoard(board){
    return{
        type : types.READ_TODO,
        board
    }

}


const initialState ={
    ohjic : {
        BoardLists : [],
    },
    ohjicBoard : {
        board_content : {
            title : '',
            board_key : '-1',
            category_key : '-1',
            content : '',
            member_key : '',
            member_id : '',
            regi_date : '',
            category_name : ''
        },
        board_comment : {
            comment_key : '-1',
            update_date : '',
            member_key : '',
            member_nickname : '',
            comment_content : ' ',
        }
    },
    boardCategory : []
};

export default function ohjicBoard(state=initialState,action){

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

        case types.READ_TODO : {
            return Object.assign({},state,{
                ohjicBoard : action.board
            });
            break;
        }

        case types.GET_CATEGORY : {
            return Object.assign({},state,{
                boardCategory : action.boardCategory
            });
            break;
        }

        default : {
            return state;break;
        }
    }

}
