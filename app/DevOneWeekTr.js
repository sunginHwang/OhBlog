import React, {Component} from 'react';
import {render} from 'react-dom';

class DevTr extends Component{


    render(){
        return(
            <tr Key={this.props.id}>
                <td>{this.props.title}</td>
            </tr>
        );
    }
}

export default DevTr