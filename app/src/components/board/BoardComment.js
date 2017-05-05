import React, { Component } from 'react';
import { render } from 'react-dom';
import * as types from '../../const/CommonVal';

export default class BoardComment extends Component{

    render(){
        const {member_key, comment , deleteComments} = this.props;
        let commentDeleteButton = '';
        if(member_key == comment.member_key){
            commentDeleteButton = <button onClick={(event)=>deleteComments(comment.comment_key,comment.board_key,member_key)}>삭제</button>;
        }

        return(
               <div className="board_comment_lists"  id={comment.comment_key}>
                   <div className="board_comment_lists_body">
                       <div className="board_comment_lists_body_img">
                           <image className="board_comment_lists_body_img_tag" src={types.SERVER_URL+`/uploads/noImage.png`}></image>
                       </div>
                       <div className="board_comment_lists_body_contents">
                           <span className="comment_writer">{comment.member_nickname}</span><span className="comment_date" >2016-12-31</span>
                           <div className="comment_content">
                               <p>  {comment.comment_content}</p>
                           </div>
                       </div>
                   </div>
                   <div className="board_comment_lists_sub">
                       {commentDeleteButton}
                    </div>
                </div>

              )
    };
}