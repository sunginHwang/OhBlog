import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import * as types from '../../const/CommonVal';

export default class BoardWrite extends Component{

    constructor() {
        super();
        this.writeForm = this.writeForm.bind(this);
        this.BoardWrite = this.BoardWrite.bind(this);
    }

    componentDidMount() {
        $('#summernote').summernote({
            height : "420px",
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
                                $('#summernote').summernote('editor.insertImage', img_url);
                            }else{
                                alert(responseData['msg']);
                            }
                        })
                        .catch((error) => {
                            alert('사진 업로드 중 문제가 발생하였습니다.');
                        });

                }
            }
        });

    }

    writeForm(){

        if(this.props.member_key == -1){
            alert('로그인이 필요합니다');
            return;
        }

        var content = $('#summernote').summernote('code');
        var title = $('#title').val();

        if(content == '' || title == '' || content =='<p><br></p>'){
            alert('제목과 내용은 필수입니다');
            return false;
        }
        this.BoardWrite(title,content);
    }

    BoardWrite(title,content){
        let insert_board = {
            title : title,
            content: content,
            member_key : this.props.member_key,
            category_key : this.props.params.category_key,
        }

        var data = new FormData();
        data.append( "insert_board", JSON.stringify( insert_board ) );
        data.append('board_sub_img',this.refs.board_sub_img.files[0]);

        fetch(types.SERVER_URL+`/api/Board/insert_board`,{
            method: 'POST',
            body: data
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                if(responseData['state'] == 'success'){
                    alert(responseData['msg']);
                    this.props.history.pushState(null,`/board/${this.props.params.category_key}`);
                }else if(responseData['state'] == 'fail'){
                    alert(responseData['msg']);
                    this.props.history.pushState(null,'/');
                }else{
                    alert(types.CLIENT_ERROR_MSG);
                }

            })
            .catch((error) => {
                console.log(error);
            });

    }


    render(){
        return(
            <div>
                <div className="main_board_content" id="boardModal">
                    <div className="board_content_area">
                        <header className="board_content_area_header">
                            <div className="board_content_area_header_title"><input type="text" id="title" placeholder="제목을 입력하세요."/></div>
                            <div className="board_content_area_header_sub"><span>작성자 아이디 : {this.props.member_id}</span></div>

                            <div className="board_content_area_edit"> <button id="sss" title="Hooray!" onClick={(event)=>this.writeForm()}>글 작성하기</button></div>
                        </header>
                        <div className="board_content_area_body">
                            <div><span>게시판 대표 이미지</span><input type="file" ref="board_sub_img" id="board_sub_img"/></div>
                            <div id="summernote"></div>
                        </div>
                    </div>

                </div>
                <div className="main_board_sidebar">

                </div>
            </div>

        )

    };
}