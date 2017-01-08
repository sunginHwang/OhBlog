import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

export default class BoardCommentInsert extends Component{
    render(){
        return(
            <div className="board_comment_insert_area">
                <input className="comment_input_box" type="text" placeholder="댓글을 입력해주세요." id="commentInput"/>
                <div className="comment_input_box_send" onClick={(event)=>this.props.insertComment()}>댓글달기</div>
            </div>
        );
    };
}