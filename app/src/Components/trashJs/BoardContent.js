import React, { Component } from 'react';
import { render } from 'react-dom';



export default class BoardContent extends Component{

    render(){

        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.contents.title} {this.props.contents.id}</h3>
                </div>
                <div className="panel-body">
                    {this.props.contents.content}
                </div>
            </div>
        )
    };

}
