import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { Link, Router, Route, browserHistory } from 'react-router';

export default class BoardListComponent extends Component{

    constructor()
    {
        super();
    }


    render(){
        let title = `/boardDetail/${this.props.board_key}`;
        
        return(
                    <article className="article_list" id={this.props.id}>
                        <div className="article_list_item">
                            <img src="https://velopert.com/wp-content/uploads/2016/09/이미지-6-450x255.png"/>
                                <div className="article_list_item_content">
                                    <div className="article_title">
                                        <a onClick={(event)=>this.props.GoBoardDetail(title)}>[{this.props.contents.category_name}]<br/>{this.props.contents.title}</a>

                                    </div>
                                    <div className="article_footer">
                                        <span className="article_date"><span className="icon fa-calendar"></span> {this.props.contents.regi_date}</span>

                                        <span className="article_comment"><span className="icon fa-comment"></span> {this.props.contents.comments}</span>
                                    </div>
                                </div>
                        </div>
                    </article>
        )
    };
}