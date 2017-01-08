/**
 * Created by hwangseong-in on 2016. 7. 3..
 */
import React, { Component } from 'react';
import Card from './Card';

class Lists extends Component{
    render(){
        var Cards = this.props.cards.map((card)=>{
            return <Card id ={card.id} title = {card.title} description = {card.description} tasks = {card.tasks} />
        })

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {Cards}
            </div>
        )
    }
}

export default Lists