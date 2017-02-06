import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './Store';
import Ohjic from './Ohjic';
import Board from './Board/Board';
import BoardDetail from './Board/BoardDetail';
import BoardWrite from './Board/BoardWrite';
import NoCategoryBoard from './ErrorView/NoCategoryBoard';
import SideBar from  './SideBar';
import join from './join';
import login from './member/login'
import memberEdit from './member/memberEdit';


let store = configureStore();

let history = syncHistoryWithStore(browserHistory,store)

render(<Provider store={store}>
            <Router history={history} >
                <Route path='/' component= {SideBar} >
                    <IndexRoute component = {Ohjic} />
                    <Route path='join' component={join}/>
                    <Route path='login' component={login}/>
                    <Route path='edit' component={memberEdit}/>
                    <Route path='board/:category_key' component={Board}/>
                    <Route path='board/NoCategoryBoard' component={NoCategoryBoard}/>
                    <Route path='boardDetail/:board_key' component={BoardDetail}/>
                    <Route path='boardWrite/:category_key' component={BoardWrite}/>
                </Route>
            </Router>
        </Provider>,document.getElementById('root')
      );


