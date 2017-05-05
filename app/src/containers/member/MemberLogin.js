import React, { Component } from 'react';
import { render } from 'react-dom';
import * as types from '../../const/CommonVal';
import { memberLogin }  from '../../redux/reducers/memberReducers';
import { DeleteOhjicTable } from '../../redux/reducers/boardReducers';
import { connect } from 'react-redux';

@connect((store) => {return {};},{memberLogin,DeleteOhjicTable})
export default class MemberLogin extends Component{

    constructor()
    {
        super();
        this.memberLogin = this.memberLogin.bind(this);
    }

    componentDidMount(){
        this.props.DeleteOhjicTable();
    }

    memberLogin(){
        var member_id = this.refs.user_id.value;
        var member_password = this.refs.pwd.value;
        if(member_id == ''){
            alert('아이디를 입력해주세요.');
            return;
        }

        if(member_password == ''){
            alert('비밀번호를 입력해주세요.');
            return;
        }
        this.props.memberLogin(member_id,member_password).catch((error) => {alert('로그인 실패');});

    }


    render(){
        return(
                <div className="member_area">
                    <div className="member_component">
                        <header><div className="member_title"><p>로그인</p></div></header>
                        <div className="member_input_contents">
                            <div className="member_info_area">
                                <input className="input_id" type="text" placeholder="id" ref="user_id" maxLength="20"/>
                                <input className="input_pwd" type="password" placeholder="pwd" ref="pwd" maxLength="20"/>
                                <button className="member_submit_btn" onClick={this.memberLogin}>로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    };
}