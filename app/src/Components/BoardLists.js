import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ListComponent from './ListComponent';

@connect((store) => {
    return {
    };
},null)
export default class OhjicTable extends Component{


    render(){

        let OhjicTr = this.props.name.map((index)=>{ return

            <ListComponent contents={index} />

        });

        return(
            <div>


            </div>
        )
    };
}