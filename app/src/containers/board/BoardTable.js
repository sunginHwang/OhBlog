import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { Link, Router, Route, browserHistory } from 'react-router';
import BoardListComponent from '../../componentsss/board/BoardListComponent';
import * as types from '../../const/CommonVal'
import { GetOhjicTable }  from '../../redux/reducers/boardReducers';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'jquery/dist/jquery';

require('../../summernote/summernote.js');

@connect((store) => {return {};},{GetOhjicTable})
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
        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if (($(document).height() - $(window).height() - $(window).scrollTop() < 250) && this.state.infinityScroll == false) {
                let limit = this.props.name.length-1;
                this.setState({infinityScroll : true});
                fetch(types.SERVER_URL+`/api/Board/get_list?category=${this.props.category_key}&limit=${limit}`)
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
                        }else if(responseData['state'] == 'fail'){
                            alert(responseData['msg']);
                        }else{
                            alert(types.CLIENT_ERROR_MSG);
                        }
                    })
                    .catch((error) => {
                        console.log(types.SERVER_ERROR_MSG);
                    });
            }
        });
    }


    render(){
        let idNumber = 0;
        let BoardLists = this.props.name.map((index)=>{ return <BoardListComponent key={index.board_key} board_key={index.board_key} contents={index} id={idNumber++} GoBoardDetail={this.props.GoBoardDetail}/>});

        return(
            <div className="area_content">
                {BoardLists}
            </div>
        )
    };
}