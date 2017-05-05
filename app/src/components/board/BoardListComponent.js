import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { Link, Router, Route, browserHistory } from 'react-router';

import * as types from '../../const/CommonVal';

export default class BoardListComponent extends Component{

    constructor()
    {
        super();
    }


    render(){
        const {board_key, id , contents, GoBoardDetail} = this.props;
        let title = `/boardDetail/${board_key}`;
        
        return(
                    <article className="article_list" id={id}>
                        <div className="article_list_item">
                            <img src={types.SERVER_URL+contents.board_category_img}/>
                                <div className="article_list_item_content">
                                    <div className="article_title">
                                        <a onClick={(event)=>GoBoardDetail(title)}>[{contents.category_name}]<br/>{contents.title}</a>

                                    </div>
                                    <div className="article_footer">
                                        <span className="article_date"><span className="icon fa-calendar"></span> {contents.regi_date}</span>

                                        <span className="article_comment"><span className="icon fa-comment"></span> {contents.comments}</span>
                                    </div>
                                </div>
                        </div>
                    </article>
        )
    };
}