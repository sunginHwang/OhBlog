import * as types from '../const/OhjicActionType'
import * as commonTypes from '../const/CommonVal';

export function GetOhjicTable(data){
    return{
        type : types.GET_TODO,
        userdata : {
            BoardLists : data
        }
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

export function GetBoardList(boardCategory){
    return{
        type : types.GET_BOARD_LIST,
        promise: { method: 'GET', url:commonTypes.SERVER_URL+'/api/Board/get_list?category='+boardCategory, data: null }
    }
}


export function GetBoardCategory(boardCategory){
    return{
        type : types.GET_BOARD_CATEGORY,
        promise: { method: 'GET', url:commonTypes.SERVER_URL+'/api/Board/get_board_category', data: null }
    }

}

export function ReadOhjicBoard(board_key){
    return{
        type : types.READ_BOARD,
        promise: { method: 'GET', url:commonTypes.SERVER_URL+'/api/Board/get_board_content?board_key='+board_key, data: null }
    }

}

export function UpdateBoardContent(update_board){
    var data = new FormData();
    data.append( "update_board", JSON.stringify( update_board ) );
    return{
        type : types.UPDATE_BOARD_CONTENT,
        promise: { method: 'POST', url:commonTypes.SERVER_URL+'/api/Board/update_board', data: data }
    }

}

export function InsertBoardContent(insert_data){
    return{
        type : types.INSERT_BOARD_CONTENT,
        promise: { method: 'POST', url:commonTypes.SERVER_URL+'/api/Board/insert_board', data: insert_data }
    }

}

export function DeleteBoardContent(delete_board){
    var data = new FormData();
    data.append( "delete_board", JSON.stringify( delete_board ) );
    return{
        type : types.DELETE_BOARD_CONTENT,
        promise: { method: 'POST', url:commonTypes.SERVER_URL+'/api/Board/delete_board', data: data }
    }

}

export function InsertBoardComment(insert_comment_param){
    var data = new FormData();
    data.append( "insert_comment", JSON.stringify( insert_comment_param ) );
    return{
        type : types.INSERT_BOARD_COMMENT,
        promise: { method: 'POST', url:commonTypes.SERVER_URL+'/api/Board/insert_board_comment', data: data }
    }

}

export function DeleteBoardComment(comment_key){

    return{
        type : types.INSERT_BOARD_COMMENT,
        promise: { method: 'GET', url:commonTypes.SERVER_URL+`/api/Board/delete_board_comment?comment_key=`+comment_key, data: null }
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
            category_name : '',
            board_category_img : ''
        },
        board_comment : {
            comment_key : '-1',
            update_date : '',
            member_key : '',
            member_nickname : '',
            comment_content : ' ',
        }
    },
    boardCategory : [],
    BoardLists : [],
    isLoading: false,
};

export default function ohjicBoard(state=initialState,action){

    switch(action.type){

        case types.GET_BOARD_LIST_REQUEST : {
            return {
                ...state,
                isLoading: true
            };
        }
        case types.GET_BOARD_LIST_SUCCESS : {
            return {
                ...state,
                isLoading: false,
                ohjic : action.result.data
            };
        }case types.GET_BOARD_LIST_FAILURE : {
            return {
                ...state,
                isLoading: false
            };
        }

        case types.GET_BOARD_CATEGORY_REQUEST : {
            return {
                ...state,
                isLoading: true
            };
        }

        case types.GET_BOARD_CATEGORY_SUCCESS : {
            return {
                ...state,
                isLoading: false,
                boardCategory : action.result.data
            };
        }

        case types.GET_BOARD_CATEGORY_FAILURE : {
            return {
                ...state,
                isLoading: false
            };
        }

        case types.DELETE_BOARD_CONTENT_REQUEST : {
            return {
                ...state,
                isLoading: true
            };
        }

        case types.DELETE_BOARD_CONTENT_SUCCESS : {
            return {
                ...state,
                isLoading: false
            };
        }

        case types.DELETE_BOARD_CONTENT_FAILURE : {
            return {
                ...state,
                isLoading: false
            };
        }

        case types.READ_BOARD_REQUEST : {
            return {
                ...state,
                isLoading: false
            };
        }
        case types.READ_BOARD_SUCCESS : {
            return {
                ...state,
                isLoading: false,
                ohjicBoard : action.result.data
            };
        }
        case types.READ_BOARD_FAILURE : {
            return {
                ...state,
                isLoading: true
            };
        }

        case types.INSERT_BOARD_COMMENT_REQUEST : {
            return {
                ...state,
                isLoading: true
            };
        }
        case types.INSERT_BOARD_COMMENT_SUCCESS : {
            return {
                ...state,
                isLoading: false
            };
        }
        case types.INSERT_BOARD_COMMENT_FAILURE : {
            return {
                ...state,
                isLoading: false
            };
        }

        case types.DELETE_BOARD_COMMENT_REQUEST : {
            return {
                ...state,
                isLoading: true
            };
        }
        case types.DELETE_BOARD_COMMENT_SUCCESS : {
            return {
                ...state,
                isLoading: false
            };
        }
        case types.DELETE_BOARD_COMMENT_FAILURE : {
            return {
                ...state,
                isLoading: false
            };
        }

        case types.UPDATE_BOARD_CONTENT_REQUEST : {
            return {
                ...state,
                isLoading: true
            };
        }
        case types.UPDATE_BOARD_CONTENT_SUCCESS : {
            return {
                ...state,
                isLoading: false
            };
        }
        case types.UPDATE_BOARD_CONTENT_FAILURE : {
            return {
                ...state,
                isLoading: false
            };
        }
        case types.INSERT_BOARD_CONTENT_REQUEST : {
            return {
                ...state,
                isLoading: true
            };
        }
        case types.INSERT_BOARD_CONTENT_SUCCESS : {
            return {
                ...state,
                isLoading: false
            };
        }
        case types.INSERT_BOARD_CONTENT_FAILURE : {
            return {
                ...state,
                isLoading: false
            };
        }

        case types.GET_TODO : {
            return Object.assign({}, state, {
                ohjic : action.userdata
            });
        }
        case types.DELETE_TODO : {
            return Object.assign({},state,{
                ohjic : action.userdata
            });
            break;
        }

        default : {
            return state;
        }
    }

}
