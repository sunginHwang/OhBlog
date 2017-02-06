import React, { Component } from 'react';
import { render } from 'react-dom';
import OhjicLogo from './OhjicLogo';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {connect} from 'react-redux';
import * as types from '../const/CommonVal'
import { memberLogin }  from '../reducers/memberReducers';
import { GetBoardCategory }  from '../reducers/OhjicReducers';


@connect((store) => { return {login : store.memberReducers.login,boardCategory : store.ohjicBoard.boardCategory};},{memberLogin,GetBoardCategory})
export default class SideBar extends Component{

    constructor()
    {
        super();
        this.loginCheck = this.loginCheck.bind(this);
        this.memberLogout = this.memberLogout.bind(this);
        this.getBoardCategoryList = this.getBoardCategoryList.bind(this);
        this.menuToggleClick = this.menuToggleClick.bind(this);
    }
    componentDidMount(){
        /*  this.loginCheck();*/
        this.getBoardCategoryList();
    }

    getBoardCategoryList(){
        fetch(types.SERVER_URL+'/api/Board/get_board_category')
            .then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                this.props.GetBoardCategory(responseData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loginCheck(){
        fetch(types.SERVER_URL+'/api/Member/loginStatusCheck')
            .then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                if(responseData['status'] == 'success'){
                    this.props.memberLogin(responseData['result']['member_key'],responseData['result']['member_id']);
                }
            })
            .catch((error) => {
                console.log(types.CLIENT_ERROR_MSG);
            });
    }

    memberLogout(){
        alert('로그아웃되었습니다');
        this.props.memberLogin(-1,'none');
    }

    /*로그인 유지시의 이부분 처리 요망*/
    componentWillReceiveProps(nextProps){
        this.props.login.member.member_key != nextProps.login.member.member_key ? this.props.history.pushState(null,'/') : '';
    }

    menuToggleClick(){
        document.getElementById('board_body').classList.toggle('toggle_show');
    }


    render(){
        let login = '';
        let join = '';
        let BoardCategoryList = '';

        if(this.props.boardCategory.boardCategory != undefined){
            BoardCategoryList = this.props.boardCategory.boardCategory.map((index)=> {
                let hrefParam = `/board/${index.category_key}`;
                return <li key={index.category_key}>
                            <Link key={index.category_key} to={hrefParam} >
                                {index.category_name}<span className="icon fa-th"></span>
                            </Link>
                        </li>
            });
        }
       if(this.props.login.member.member_key == -1){
           login = <li><Link to="/login">로그인<span className="icon fa-user"></span></Link></li>;
           join = <li><Link to="/join" >회원가입<span className="icon fa-user-plus"></span></Link></li>;
       }else{
           login =  <li><a href="#" >{this.props.login.member.member_id}<br/><p onClick={this.memberLogout}>로그아웃</p></a></li>;
           join = <li><Link to="/edit" >정보수정<span className="icon fa-user-plus"></span></Link></li>
       }

        let child = this.props.children && React.cloneElement(this.props.children,
                                                            {member_key : this.props.login.member.member_key,
                                                                member_id : this.props.login.member.member_id});

      return(
          <div id="board_body">
              <div id="headerToggle" onClick={this.menuToggleClick}><a href="#header" className="toggle"></a></div>
              <header id="main_header">
                  <div>
                      <OhjicLogo />
                      <div id="toggleMenu" className="header_content">
                          <nav className="header_content_list">
                              <ul>
                                  {join}
                                  {login}
                                  {BoardCategoryList}
                              </ul>
                          </nav>
                      </div>
                  </div>
              </header>
              <div id="main_area">
                  {child}
              </div>
          </div>

      )
    };
}