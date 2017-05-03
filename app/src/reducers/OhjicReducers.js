import * as types from '../const/OhjicActionType'
import * as commonTypes from '../const/CommonVal';

export function GetOhjicTable(data){
    console.log('GetOhjicTable');
    return{
        type : types.GET_TODO,
        userdata : {
            BoardLists : data
        }
    }
}

export function GetBoardList(boardCategory){
    console.log('GetBoardList');
    return{
        type : types.GET_BOARD_LIST,
        promise: { method: 'GET', url:commonTypes.SERVER_URL+'/api/Board/get_list?category='+boardCategory, data: null }
    }
}


export function GetBoardCategory(boardCategory){
    console.log('GetBoardCategory');
    return{
        type : types.GET_BOARD_CATEGORY,
        promise: { method: 'GET', url:commonTypes.SERVER_URL+'/api/Board/get_board_category', data: null }
    }

}

export function DeleteOhjicTable(){
    console.log('DeleteOhjicTable');
    return{
        type : types.DELETE_BOARD,
        userdata : {
            BoardLists : []
        }
    }
}

export function ReadOhjicBoard(board_key){
    console.log('ReadOhjicBoard');
    return{
        type : types.READ_BOARD,
        promise: { method: 'GET', url:commonTypes.SERVER_URL+'/api/Board/get_board_content?board_key='+board_key, data: null }
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
    fetchingUpdate: true,
};

export default function ohjicBoard(state=initialState,action){

    switch(action.type){

        case types.GET_BOARD_LIST_REQUEST : {
            return {
                ...state,
                fetchingUpdate: true
            };
        }
        case types.GET_BOARD_LIST_SUCCESS : {
            return {
                ...state,
                fetchingUpdate: true,
                ohjic : action.result.data
            };
        }case types.GET_BOARD_LIST_FAILURE : {
            return {
                ...state,
                fetchingUpdate: false
            };
        }

        case types.GET_BOARD_CATEGORY_REQUEST : {
            return {
                ...state,
                fetchingUpdate: true
            };
        }

        case types.GET_BOARD_CATEGORY_SUCCESS : {
            return {
                ...state,
                fetchingUpdate: true,
                boardCategory : action.result.data
            };
        }

        case types.GET_BOARD_CATEGORY_FAILURE : {
            return {
                ...state,
                fetchingUpdate: false
            };
        }

        case types.DELETE_BOARD_REQUEST : {
            return {
                ...state,
                fetchingUpdate: true
            };
        }

        case types.DELETE_BOARD_SUCCESS : {
            return {
                ...state,
                fetchingUpdate: true,
                ohjic : action.result
            };
        }

        case types.DELETE_BOARD_FAILURE : {
            return {
                ...state,
                fetchingUpdate: true
            };
        }


        case types.READ_BOARD_REQUEST : {
            return {
                ...state,
                fetchingUpdate: true
            };
        }
        case types.READ_BOARD_SUCCESS : {
            return {
                ...state,
                fetchingUpdate: true,
                ohjicBoard : action.result.data
            };
        }
        case types.READ_BOARD_FAILURE : {
            return {
                ...state,
                fetchingUpdate: true
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
