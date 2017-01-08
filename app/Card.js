/**
 * Created by hwangseong-in on 2016. 7. 3..
 */
import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';


class Card extends Component{

    constructor(){
        super(...arguments);
        this.state = {
            showDetails : false
        };
    }

    toggleDetails(){
        this.setState({showDetails: !this.state.showDetails});
    }

    render(){
        let cardDetails;
        if(this.state.showDetails) {
            cardDetails = (
                    <div className="card_details">
                        {this.props.description}
                        <CheckList cardId={this.props.id} tasks={this.props.tasks}
                                   taskCallbacks={this.props.taskCallbacks}/>
                    </div>
            );
        }

        return(
            <div className="card">
                <div className="card_title" onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                {cardDetails}
            </div>
        );
    }
}

let titlePropType = (props, propName, componentName) => {
    if(props[propName]){
        let value = props[propName];
        if(typeof value !== 'string' || value.length > 80){
            console.log('title length is not 80length');
            return new Error(
                '${propName} in ${componentName} is longer than 80 characters'
            );
        }
    }
}

Card.propTypes = {
    id : PropTypes.number,
    title : titlePropType,
    description : PropTypes.string,
    color : PropTypes.string,
    tasks : PropTypes.arrayOf(PropTypes.object)
};

export default Card;