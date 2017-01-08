import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import OhjicMainForm from './OhjicMainForm';

export default class Ohjic extends Component {

    constructor() {
        super();
    }

    componentWillReceiveProps(nextProps) {
    }


    render(){
        let content = '';
            content =  <OhjicMainForm/>;
        return(
            <div>
                <div className="Main_Content">{content}</div>
            </div>

        )
    };

}




