import React, { Component } from 'react';
import { render } from 'react-dom';
import * as types from '../../const/CommonVal';
import { memberLogin }  from '../../reducers/memberReducers';
import { DeleteOhjicTable } from '../../reducers/OhjicReducers';
import { connect } from 'react-redux';

@connect((store) => {
    return {};},{memberLogin,DeleteOhjicTable})
export default class login extends Component{

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




        fetch(types.SERVER_URL+`/api/Member/loginMember?member_id=${member_id}&member_password=${member_password}`).then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                if(responseData['status'] == 'success'){
                    alert('로그인 성공');
                    this.props.memberLogin(responseData['result'],member_id);
                }else{
                    alert(responseData['msg']);
                }

            })
            .catch((error) => {
                alert(types.SERVER_ERROR_MSG);
            });

    }


    render(){
        return(
                <div className="member_area">
                    <div className="member_component">
                        <header><div className="member_title"><p>로그인</p></div></header>
                        <div className="member_input_contents">
                            <div className="member_info_area">
                                <input className="input_id" type="text" placeholder="id" ref="user_id" maxlength="20"/>
                                <input className="input_pwd" type="password" placeholder="pwd" ref="pwd" maxlength="20"/>
                                <button className="member_submit_btn" onClick={this.memberLogin}>로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    };
}