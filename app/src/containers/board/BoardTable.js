import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { Link, Router, Route, browserHistory } from 'react-router';
import BoardListComponent from '../../components/board/BoardListComponent';
import * as types from '../../const/CommonVal'
import { GetBoardList }  from '../../redux/reducers/boardReducers';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'jquery/dist/jquery';

require('../../summernote/summernote.js');

@connect((store) => {return {};},{GetBoardList})
export default class BoardTable extends Component{

    constructor()
    {
        super();
        this.state = {
            infinityScroll : false,
            boardUpdateState : false
        };
        this.BoardInfinityScroll = this.BoardInfinityScroll.bind(this);
    }


    componentDidMount(){
       this.BoardInfinityScroll();
    }

    componentWillUnmount() {
        $(window).unbind();
        this.setState({infinityScroll : false});
    }

    componentWillReceiveProps(nextProps) {
        this.componentWillUnmount();
        this.componentDidMount();
    }

    /*무한스크롤*/
    BoardInfinityScroll(){
        const {name, category_key, GetBoardList} = this.props;
        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if (($(document).height() - $(window).height() - $(window).scrollTop() < 250) && this.state.infinityScroll == false) {
                console.log(name.length);
                let limit = name.length-1;
                this.setState({infinityScroll : true});
                GetBoardList(category_key,limit).catch(error => {alert('정지 게시판 처리');
                    history.pushState(null,'/');});

            }
        });
    }


    render(){
        const {name, GoBoardDetail} = this.props;
        let idNumber = 0;
        let boardLists = name.map((index)=>{ return <BoardListComponent key={index.board_key} board_key={index.board_key} contents={index} id={idNumber++} GoBoardDetail={GoBoardDetail}/>});

        return(
            <div className="area_content">
                {boardLists}
            </div>
        )
    };
}