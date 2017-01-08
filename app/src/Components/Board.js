import React, { Component } from 'react';
import { render } from 'react-dom';
import SideBar from './SideBar';
import OhjicBoardContent from './OhjicBoardContent';
import { connect } from 'react-redux';
import { ReadOhjicBoard }  from '../reducers/OhjicReducers';

@connect((store) => {
    return {
        ohjicBoard : store.ohjicBoard.ohjicBoard
    };
},{ReadOhjicBoard})
export default class Board extends Component{

    componentDidMount() {
        fetch(`http://ohjic.qfun.kr/api/Board/get_board_content?id=${this.props.params.id}`)
            .then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                this.props.ReadOhjicBoard(responseData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return(
            <div>
                <SideBar />
                <div className="Main_Content"><OhjicBoardContent contents ={this.props.ohjicBoard}/></div>
            </div>
        )
    };

}
