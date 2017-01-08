/**
 * Created by hwangseong-in on 2016. 7. 4..
 */
import React, { Component } from 'react';
import update from 'react-addons-update'
import 'babel-polyfill'
import KanbanBoard from './kanbanBoard';
import 'whatwg-fetch'

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADER = {
  'Content-type': 'application/json'
};

class KanbanBoardContainer extends Component{

    constructor(){
        super(...arguments);
        this.state = {
            cards:[]
        };
    }

    componentDidMount(){
        fetch(API_URL+'/cards',{Headers : API_HEADER})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({cards : responseData});
            console.log(this.state.cards);
        })
        .catch((error)=>{
            console.log('error generation ',error );
        });
    }

    addTask(cardId, taskName){
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        let newTask = {id:Date.now(), name:taskName, done:false};

        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks : {$push:[newTask]}
            }
        });

        this.setState({cards:nextState});

        fetch(API_URL+'/cards/'+cardId+'/tasks',{
            method: 'post',
            header: API_HEADER,
            body : JSON.stringify(newTask)
        }).then((response)=>response.json)
            .then((responseDate) => {
                newTask.id = responseDate.id
                this.setState({cards:nextState});
            })


    }

    deleteTask(cardId, taskName, taskIndex){
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        let nextState = update(this.state.cards,{
            [cardIndex] : {
                tasks : {$splice:[[taskIndex,1]]}
            }
        });

        this.setState({cards:nextState});

        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}',{
            method: 'delete',
            header: API_HEADER
        });


    }



    toggleTask(cardId, taskName, taskIndex){

        let cardIndex = this.state.cards.findIndex((card)=>card.id == CardId);

        let newDoneValue;

        let nextState = update(this.state.cards,{
            [CardIndex]:{
                tasks:{
                    [taskIndex]:{
                        done:{$apply:(done)=>{
                            newDoneValue = !done
                            return newDoneValue;
                        }}
                    }
                }
            }
        });

        this.setState({cards:nextState});

        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}',{
            method: 'put',
            header: API_HEADER,
            body : JSON.stringify({done:newDoneValue})
        });
    }

    render(){
        return (
            <KanbanBoard cards={this.state.cards} taskcallback={{add:this.addTask.bind(this),
                                                                 delete : this.deleteTask.bind(this),
                                                                 toggle : this.toggleTask.bind(this)}}/>
        );
    }
}

export default KanbanBoardContainer;