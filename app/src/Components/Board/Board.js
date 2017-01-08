import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import 'whatwg-fetch';
import BoardWrite from './BoardWrite';
import BoardTable from './BoardTable';
import * as types from '../../const/CommonVal'

import { memberLogin }  from '../../reducers/memberReducers';
import { GetOhjicTable, DeleteOhjicTable, ReadOhjicBoard }  from '../../reducers/OhjicReducers';


@connect((store) => {
    return {
        ohjic : store.ohjicBoard.ohjic,
    };
},{GetOhjicTable, DeleteOhjicTable, ReadOhjicBoard})
export default class Board extends Component{
    constructor()
    {
        super();
        this.writeBoard = this.writeBoard.bind(this);
        this.category_board_show = this.category_board_show.bind(this);
        this.GoBoardDetail = this.GoBoardDetail.bind(this);
        this.makeGridCard = this.makeGridCard.bind(this);
    }

    componentDidMount(){

        if(this.props.ohjic.BoardLists == false ){
            this.category_board_show(this.props.params.category_key);
        }else{
            $(window).scrollTop(localStorage.getItem('boardListScroll'));
        }

    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.category_key != nextProps.params.category_key){
            localStorage.setItem('boardListScroll', 0);
            this.category_board_show(nextProps.params.category_key);

        }
    }

    componentDidUpdate(){
        this.makeGridCard();
    }

    makeGridCard(){
        $('.area_content').imagesLoaded( function() {
            var container = document.querySelector( '.area_content' );
            var msnry = new Masonry( container, {
                // options
                columnWidth: 50,
                itemSelector: '.article_list',
                transitionDuration : '0.8s',
            } );
        });

    }

    category_board_show(category){
         fetch(types.SERVER_URL+'/api/Board/get_list?category='+category)
            .then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
             .then((responseData) => {
                 if(responseData['state'] == 'success'){
                     this.props.GetOhjicTable(responseData['result']);
                 }else{
                     alert(responseData['msg']);
                     this.props.history.pushState(null,'/');
                 }
             })
             .catch((error) => {
                 alert('사진 업로드 중 문제가 발생하였습니다.');
                 console.log(error);
             });

    }

    writeBoard(){
        if(this.props.member_key == -1){
            alert('게시글 작성에는 로그인이 필요합니다.');
            return;
        }
        this.props.history.pushState(null,`/boardWrite/${this.props.params.category_key}`);
    }


    /*해당 글 상세보기*/
    GoBoardDetail(url){
        localStorage.setItem('boardListScroll', $(window).scrollTop());
        this.props.history.pushState(null,url);
    }

    render(){
        return(
            <div>
                <header className="area_header">
                    <div className="area_header_title">
                        <h1>게시판 카테고리명</h1>
                    </div>
                    <div className="board_write_button" onClick={(event)=>this.writeBoard()}>
                    </div>
                </header>
                <BoardTable name={this.props.ohjic.BoardLists}
                            category_key={this.props.params.category_key}
                            member_key={this.props.member_key}
                            GoBoardDetail={this.GoBoardDetail}
                />
            </div>
        )
    };

}
