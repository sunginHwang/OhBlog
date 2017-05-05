import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import BoardComment from '../../components/boards/BoardComment';
import BoardCommentInsert from '../../components/boards/BoardCommentInsert';
import * as types from '../../const/CommonVal'
import { ReadOhjicBoard, InsertBoardComment ,DeleteBoardComment,
         UpdateBoardContent, DeleteBoardContent}  from '../../redux/reducers/boardReducers';
import { memberLogin }  from '../../redux/reducers/memberReducers';
import 'whatwg-fetch';



@connect((store) => {
    return {
        content : store.boardReducers.boardRead.board_content,
        comment : store.boardReducers.boardRead.board_comment
    };
},{ReadOhjicBoard, InsertBoardComment, DeleteBoardComment, UpdateBoardContent, DeleteBoardContent})
export default class BoardDetail extends Component{

    constructor()
    {

        super();
        this.state = {
            boardUpdateState : false
        };

        this.insertComment = this.insertComment.bind(this);
        this.deleteComments = this.deleteComments.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
        this.BoardUpdateClick = this.BoardUpdateClick.bind(this);
    }

    componentDidMount() {
        $(window).scrollTop(0);
        this.props.ReadOhjicBoard(this.props.params.board_key).catch(error => {alert('정지 게시판 처리');
            this.props.history.pushState(null,'/');});
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
        };

        this.props.InsertBoardComment(insert_comment)
                    .then(result => {this.props.ReadOhjicBoard(this.props.content.board_key);})
                    .catch(error => {alert(types.SERVER_ERROR_MSG)});

        $("#commentInput").val('');

    }

    deleteComments(comment_key,board_key,comment_member_key){
        if(this.props.member_key != comment_member_key){
            alert('댓글삭제는 본인만 가능합니다');return;
        }

        this.props.DeleteBoardComment(comment_key)
            .then(result => {this.props.ReadOhjicBoard(board_key);})
            .catch(error => {alert(types.SERVER_ERROR_MSG)});

    }

    updateBoard(){
        if(this.props.member_key != this.props.content.member_key){
            alert('글 수정은 본인만 가능합니다');return;
        }

        var updateBoardContent = $('.board_content').summernote('code');
        var updateBoardTitle = $(".board_content_area_header_title").text();

        var update_board = {
            board_key: this.props.content.board_key,
            member_key: this.props.member_key,
            content : updateBoardContent,
            title : updateBoardTitle
        };

        this.props.UpdateBoardContent(update_board)
            .then(result => {alert('게시글 수정 성공');
                             this.setState({boardUpdateState: false});
                             $('.board_content').summernote('destroy');
                            })
            .catch(error => {alert(types.SERVER_ERROR_MSG)});


        $("#commentInput").val('');
    }

    deleteBoard(){
        if(this.props.member_key != this.props.content.member_key){
            alert('글 삭제는 본인만 가능합니다');return;
        }

        var delete_board = {
            board_key: this.props.content.board_key,
            member_key: this.props.member_key

        };

        this.props.DeleteBoardContent(delete_board)
            .then(result => {alert('게시글 삭제 성공');
                this.props.history.pushState(null,'/board/'+this.props.content.category_key);
            })
            .catch(error => {alert(types.SERVER_ERROR_MSG)});
    }

    BoardUpdateClick(){
        if(this.props.member_key != this.props.content.member_key){
            alert('글 수정은 본인만 가능합니다');return;
        }

        $('.board_content').summernote({focus: true,
            callbacks: {
            onImageUpload: function(files) {
                // upload image to server and create imgNode...
                let data = new FormData();
                data.append("file", files[0]);

                fetch(types.SERVER_URL+`/api/board/insert_image`,{
                    method: 'POST',
                    body: data
                }).then((response) => {

                        if(response.ok){return response.json();}
                        else {throw new Error("Server response wasn't OK");}
                    })
                    .then((responseData) => {
                        if(responseData['state'] == 'success'){
                            var img_url = types.SERVER_URL+'/uploads/'+responseData['img_url'];
                            $('.board_content').summernote('editor.insertImage', img_url);
                        }else{
                            alert(responseData['msg']);
                        }
                    })
                    .catch((error) => {
                        alert(types.SERVER_ERROR_MSG);
                    });

            }
        }});
        this.setState({boardUpdateState: true});
    }



    render(){
        let comment = '';
        let updateButton = '';
        let deleteButton = '';
        let commnetInsert = '';
        if(this.props.comment.length >=1 && this.state.boardUpdateState === false){
            comment = this.props.comment.map((index)=>{return <BoardComment key={index.comment_key}
                                                                            comment={index}
                                                                            member_key={this.props.member_key}
                                                                            deleteComments={this.deleteComments}/>});
        }
        if(this.props.member_key == this.props.content.member_key){
            if(this.state.boardUpdateState === true){
                updateButton =  <button onClick={(event)=>this.updateBoard()}>수정완료</button>;
                commnetInsert = '';
                deleteButton = '';
            }else{
                updateButton =  <button onClick={(event)=>this.BoardUpdateClick()}>게시글 수정</button>;
                commnetInsert = <BoardCommentInsert insertComment={this.insertComment}/>;
                deleteButton =  <button onClick={(event)=>this.deleteBoard()}>삭제</button>;
            }
        }else{
            commnetInsert = <BoardCommentInsert insertComment={this.insertComment}/>;
        }



        return(

            <div>
                <div className="main_board_content" id="boardModal">
                    <div className="board_content_area">
                        <header className="board_content_area_header">
                            <div className="board_content_area_header_title"><h3>{this.props.content.title}</h3></div>
                            <div className="board_content_area_header_sub"><span>{this.props.content.regi_date} 글쓴이 :  {this.props.content.member_id}</span></div>
                            <div className="board_content_area_edit">{updateButton}</div>
                            <div className="board_content_area_edit">{deleteButton}</div>
                        </header>
                        <div className="board_content_area_body">
                            <div className="board_content" dangerouslySetInnerHTML={ {__html: this.props.content.content} }></div>
                        </div>
                    </div>
                    <div className="board_comment_area">
                        <header className="board_comment_area_header">
                            <div><span>댓글수 : </span><span>{this.props.comment.length}</span></div>
                        </header>
                        {commnetInsert}
                        {comment}
                    </div>
                </div>
                <div className="main_board_sidebar">

                </div>
            </div>


        )
    };
}