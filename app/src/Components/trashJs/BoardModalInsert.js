import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

export default class BoardModalInsert extends Component{
    render(){
        return(
            <div className="panel-body">
                <div className="navbar-form navbar-left">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="댓글을 입력하세요" id="commentInput"/>
                    </div>
                    <button type="button" onClick={(event)=>this.props.insertComment()}  className="btn btn-default">댓글</button>
                </div>
            </div>
        );
    };
}