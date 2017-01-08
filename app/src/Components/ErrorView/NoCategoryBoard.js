import React, { Component } from 'react';
import { render } from 'react-dom';



export default class NoCategoryBoard extends Component{

    render(){
        return(
            <div className="jumbotron">
                <h1>해당 게시판은 현재 정지된 상태입니다 관리자에게 문의해 주세요.</h1>
                <p>...</p>
                <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
            </div>
        )
    };

}
