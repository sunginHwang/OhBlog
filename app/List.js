/**
 * Created by hwangseong-in on 2016. 7. 3..
 */
import React, { Component,PropTypes } from 'react';
import Card from './Card';

class List extends Component{
    render(){
        var Cards = this.props.cards.map((card)=>{
            return <Card id ={card.id} title = {card.title} description = {card.description} tasks = {card.tasks} taskCallbacks={this.props.taskCallbacks} />
        })
1
        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {Cards}
            </div>
        );
    }
}

List.propTypes = {
    cards : PropTypes.arrayOf(PropTypes.object),
    title : PropTypes.string.isRequired
}

export default List;