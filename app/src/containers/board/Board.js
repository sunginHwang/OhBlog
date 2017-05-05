import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import 'whatwg-fetch';
import BoardWrite from './BoardWrite';
import BoardTable from './BoardTable';
import * as types from '../../const/CommonVal';

import { memberLogin }  from '../../redux/reducers/memberReducers';
import { GetBoardList, DeleteOhjicTable, ReadOhjicBoard }  from '../../redux/reducers/boardReducers';


@connect((store) => {
    return {
        board : store.boardReducers.board,
        categotry : store.boardReducers.boardCategory
    };
},{GetBoardList, DeleteOhjicTable, ReadOhjicBoard})
export default class Board extends Component{
    constructor()
    {
        super();
        this.writeBoard = this.writeBoard.bind(this);
        this.GoBoardDetail = this.GoBoardDetail.bind(this);
        this.makeGridCard = this.makeGridCard.bind(this);
    }

    componentDidMount(){
        if(this.props.board.BoardLists == false ){
            this.props.GetBoardList(this.props.params.category_key).catch(error => {alert('정지 게시판 처리');
                this.props.history.pushState(null,'/');});
        }else{
            $(window).scrollTop(localStorage.getItem('boardListScroll'));
        }

    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.category_key != nextProps.params.category_key){
            localStorage.setItem('boardListScroll', 0);
            this.props.GetBoardList(nextProps.params.category_key).catch(error => {alert('정지 게시판 처리');
                this.props.history.pushState(null,'/');});
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
                <BoardTable name={this.props.board.BoardLists}
                            category_key={this.props.params.category_key}
                            member_key={this.props.member_key}
                            GoBoardDetail={this.GoBoardDetail}
                />
            </div>
        )
    };

}