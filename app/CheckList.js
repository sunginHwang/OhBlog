/**
 * Created by hwangseong-in on 2016. 7. 3..
 */
import React, { Component, PropTypes } from 'react';

class CheckList extends Component{

    checkInputKeyPress(evt){
        if(evt.key == 'Enter'){
            this.props.taskCallbacks.add(this.props.cardId,evt.target.value);
            evt.target.value = '';
        }
    }

    render(){

        let tasks = this.props.tasks.map((task)=>(
           <li className="checklist_task">
               <input type="checkbox" checked={task.done} onChange={this.props.taskCallbacks.toggle.bind(null,this.props.cardId,task.id,taskIndex)}/>
               {task.name}
               <a href="#" className="checklist_task--remove" onClick={this.props.taskCallbacks.delete.bind(null,this.props.cardId,task.id,taskIndex)}/>
           </li>
        ));

        return(
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text" className="checklist--add-task" placeholder="input add TextFileds" onKeyPress={this.checkInputKeyPress.bind(this)}/>
            </div>
        );
    }
}

CheckList.PropTypes = {
    cardId : PropTypes.number,
    Task : PropTypes.arrayOf(PropTypes.object)
}

export default CheckList;