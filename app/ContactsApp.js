/**
 * Created by hwangseong-in on 2016. 7. 3..
 */
import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import 'babel-polyfill'
import 'whatwg-fetch'



class ContactsApp extends Component{
    constructor(){
        super();
        this.state = {
          filterText : ''
        };
    }

    userInput(SearchWord){
        ({filterText : SearchWord});
    }

    render(){
        return(
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.userInput.bind(this)}/>
                <ContactList contacts={this.props.contacts}
                             filterText={this.state.filterText}/>
            </div>
        );
    }
}

class SearchBar extends Component{

    SearchChange(event){
        this.props.onUserInput(event.target.value);
    }

    render(){
        return(
            <input type="search" placeholder="SeachBar" value={this.props.filterText} onChange={this.SearchChange.bind(this)}/>
        );
    }
}

class ContactList extends Component{
    render(){
        let filteredContacts = this.props.contacts.filter(
            (contact) => contact.name.indexOf(this.props.filterText) !== -1
        );

        return(
            <ul>
                {
                    filteredContacts.map((contact)=> <ContactItem  key ={contact.email}
                                                                   name = {contact.name}
                                                                    email = {contact.email}/>)
                }
            </ul>
        );
    }
}

class ContactItem extends Component{
    render(){
        return(
            <li>{this.props.name} - {this.props.email}</li>
        );
    }
}

let contacts = [
    { name : "sungin", email : "gommpo@naver.com"},
    { name : "sungin2", email : "gommpo2@naver.com"},
    { name : "mungin3", email : "gommpo3@naver.com"},
    { name : "mungin4", email : "gommpo4@naver.com"},
    { name : "uungin5", email : "gommpo5@naver.com"},
];


render(<ContactsApp contacts={contacts}/>,document.getElementById('root'));