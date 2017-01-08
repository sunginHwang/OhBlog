/**
 * Created by hwangseong-in on 2016. 7. 3..
 */
import React, { Component } from 'react';
import Lists from './Lists';

class KanApp extends Component{

    constructor(){
        super(...arguments);
        console.log(this.props.cards);
    }

    render(){
        return(
            <div className="app">
                <Lists id = 'todo' title= "to do" cards={this.props.cards.filter((card)=>card.status == "todo")} />
                <Lists id = 'in-progress' title= "In progress" cards={this.props.cards.filter((card)=>card.status == "in-progress")} />
                <Lists id = 'done' title= "Done" cards={this.props.cards.filter((card)=>card.status == "done")} />
            </div>

        )
    }
}

export default KanApp