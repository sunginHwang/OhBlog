import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import BoardComment from './BoardComment';
import BoardModalInsert from './BoardModalInsert';
import { ReadOhjicBoard }  from '../../reducers/OhjicReducers';
import 'whatwg-fetch';
require('../../summernote/summernote.js');

@connect((store) => {
    return {
        content : store.ohjicBoard.ohjicBoard.board_content,
        comment : store.ohjicBoard.ohjicBoard.board_comment,
    };
},{ReadOhjicBoard})
export default class BoardModal extends Component{

    constructor()
    {
        super();
        this.state = {
            boardUpdateState : false
        };
        this.insertComment = this.insertComment.bind(this);
        this.deleteComments = this.deleteComments.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.BoardUpdateClick = this.BoardUpdateClick.bind(this);

    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){

    }


    insertComment(){

        if(this.props.member_key == -1){
            alert('댓글작성을 위해 로그인해주세요.');
            return;
        }
        var commentContent = $("#commentInput").val();

        if(commentContent.length < 1){
            alert('댓글에 1글자 이상은 필요합니다.');
            return false;
        }

       var insert_comment = {
            board_key: this.props.content.board_key,
            member_key: this.props.member_key,
            comment_content : commentContent
       }

        var data = new FormData();
        data.append( "insert_comment", JSON.stringify( insert_comment ) );

        fetch(`http://ohjic.qfun.kr/api/Board/insert_board_comment`,{
            method: 'POST',
            body: data
            })
            .then((response) => {
                if(response.ok){
                    return response;
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                this.props.showBoardDetail(this.props.content.board_key);
            })
            .catch((error) => {
                console.log(error);
            });

            $("#commentInput").val('');

    }

    deleteComments(comment_key,board_key,comment_member_key){
        if(this.props.member_key != comment_member_key){
            alert('댓글삭제는 본인만 가능합니다');return;
        }

        fetch(`http://ohjic.qfun.kr/api/Board/delete_board_comment?comment_key=`+comment_key)
            .then((response) => {
                if(response.ok){
                    return response;
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                this.props.showBoardDetail(board_key);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateBoard(){
        if(this.props.member_key != this.props.content.member_key){
            alert('글 수정은 본인만 가능합니다');return;
        }

        var updateBoardContent = $('.board_content').summernote('code');
        var updateBoardTitle = $(".board_title").text();


        var update_board = {
            board_key: this.props.content.board_key,
            member_key: this.props.member_key,
            content : updateBoardContent,
            title : updateBoardTitle
        }

        var data = new FormData();
        data.append( "update_board", JSON.stringify( update_board ) );

        fetch(`http://ohjic.qfun.kr/api/Board/update_board`,{
            method: 'POST',
            body: data
        })
            .then((response) => {
                if(response.ok){
                    return response;
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
               alert('게시글을 수정하였습니다');
                this.setState({boardUpdateState: false});
                $('.board_content').summernote('destroy');
            })
            .catch((error) => {
                console.log(error);
            });

        $("#commentInput").val('');
    }

    BoardUpdateClick(){
        if(this.props.member_key != this.props.content.member_key){
            alert('글 수정은 본인만 가능합니다');return;
        }

        $('.board_content').summernote({focus: true});
        this.setState({boardUpdateState: true});
    }



    render(){
        let comment = '';
        let updateButton = '';
        let commnetInsert = '';
        if(this.props.comment.length >=1 && this.state.boardUpdateState === false){
             comment = this.props.comment.map((index)=>{return <BoardComment key={index.comment_key}
                                                                             comment={index}
                                                                             member_key={this.props.member_key}
                                                                             deleteComments={this.deleteComments}
                                                                             refreshBoardModal={this.refreshBoardModal}/>});
        }
        if(this.props.member_key == this.props.content.member_key){
            if(this.state.boardUpdateState === true){
                updateButton =  <button onClick={(event)=>this.updateBoard()}>수정완료</button>;
                commnetInsert = '';
            }else{
                updateButton =  <button onClick={(event)=>this.BoardUpdateClick()}>게시글 수정</button>;
                commnetInsert = <BoardModalInsert insertComment={this.insertComment}/>;
            }
        }else{
            commnetInsert = <BoardModalInsert insertComment={this.insertComment}/>;
        }



        return(
            <div id="boardModal" className="modal fade bs-example-modal-lg board_modal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title board_title">{this.props.content.title}</h3>
                                {updateButton}
                            </div>
                            <div className="panel-body board_body board_content" dangerouslySetInnerHTML={ {__html: this.props.content.content} }>

                            </div>
                            <div>
                                {comment}
                            </div>
                            {commnetInsert}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}