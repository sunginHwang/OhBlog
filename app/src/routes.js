import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './redux/store/Store';
import HomeView from './components/board/HomeView';
import Board from './containers/board/Board';
import BoardDetail from './containers/board/BoardDetail';
import BoardWrite from './containers/board/BoardWrite';
import NoCategoryBoard from './components/errorView/NoCategoryBoard';
import MainContainer from  './containers/main/MainContainer';
import MemberJoin from './containers/member/MemberJoin';
import MemberLogin from './containers/member/MemberLogin'
import MemberEdit from './containers/member/MemberEdit';


let store = configureStore();

let history = syncHistoryWithStore(browserHistory,store)

render(<Provider store={store}>
            <Router history={history} >
                <Route path='/' component= {MainContainer} >
                    <IndexRoute component = {HomeView} />
                    <Route path='join' component={MemberJoin}/>
                    <Route path='login' component={MemberLogin}/>
                    <Route path='edit' component={MemberEdit}/>
                    <Route path='board/:category_key' component={Board}/>
                    <Route path='board/NoCategoryBoard' component={NoCategoryBoard}/>
                    <Route path='boardDetail/:board_key' component={BoardDetail}/>
                    <Route path='boardWrite/:category_key' component={BoardWrite}/>
                </Route>
            </Router>
        </Provider>,document.getElementById('root')
      );


