import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as types from '../../const/CommonVal';
import { memberLogin }  from '../../reducers/memberReducers';


@connect((store) => {
    return {login : store.memberReducers.login};})
export default class memberEdit extends Component{

    constructor() {
        super();
        this.member_edit = this.member_edit.bind(this);
        this.memberInfoAutoInsert = this.memberInfoAutoInsert.bind(this);

    }

    componentDidMount(){
        let member_key =  this.props.login.member.member_key;
        fetch(`http://ohjic.qfun.kr/api/Member/get_member_info?member_key=${member_key}`).then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                if(responseData['status'] == 'success'){
                   this.memberInfoAutoInsert(responseData['result']);
                }else{
                    console.log(responseData);
                }
            })
            .catch((error) => {
                alert(types.SERVER_ERROR_MSG);
            });
    }

    memberInfoAutoInsert(member_info){

        this.refs.member_id.value = member_info['member_id'];
        this.refs.name.value = member_info['member_name'];
        this.refs.cellPhoneNumber.value = member_info['member_phone'];
        this.refs.email.value = member_info['member_email'];
    }



    member_edit(){
        if(this.refs.prePwd.value == ''){
            alert("회원정보 수정에는 이전 비밀번호가 필요합니다");
            return;
        }

        if(this.refs.pwd.value =='' && (this.refs.pwd.value != this.refs.pwdChk.value)){
            alert("변경하실 비밀번호 가 확인과 일치하지 않습니다.");
            return;
        }

        var update_member = {
            member_id : this.refs.member_id.value,
            member_pre_password: this.refs.prePwd.value,
            member_password: this.refs.pwd.value,
            member_nickname : this.refs.nickName.value,
            member_name : this.refs.name.value,
            member_age : this.refs.age.value,
            member_phone : this.refs.cellPhoneNumber.value,
            member_email : this.refs.email.value,
        };

        var data = new FormData();
        data.append( "update_member", JSON.stringify( update_member ) );

        fetch(types.SERVER_URL+`/api/Member/update_Member`,{
            method: 'POST',
            body: data
        })
            .then((response) => {
                if(response.ok){
                    return response.json();;
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                responseData['status'] == 'success' ? alert(responseData['msg']) : alert(responseData['msg']);
            })
            .catch((error) => {
                alert(types.SERVER_ERROR_MSG);
            });

    }

    render(){

        return(
            <div className="member_area">
                <div className="member_component">
                    <header><div class="member_title"><p>회원정보 변경</p></div></header>
                    <div className="member_input_contents">
                        <div className="member_info_area">
                            <input ref="member_id" type="text" maxLength="20" disabled/>
                            <input className="input_pwd" ref="prePwd" type="password" maxLength="20" placeholder="이전비밀번호"/>
                            <input className="input_pwd" ref="pwd" type="password" maxLength="20" placeholder="변경할비밀번호"/>
                            <input className="input_pwd_confirm" ref="pwdChk" type="password" maxLength="20" placeholder="변경할비밀번호확인"/>
                            <input className="input_name" ref="name" type="text" maxLength="20" placeholder="이름"/>
                            <input className="input_nickname" ref="nickName" type="text" maxLength="20" placeholder="닉네임"/>
                            <input className="input_age" ref="age" type="text" maxLength="20" placeholder="나이"/>
                            <input className="input_phoneNumber" ref="cellPhoneNumber" type="text" placeholder="핸드폰번호"/>
                            <input className="input_email" ref="email" type="text" maxLength="20" placeholder="이메일"/>
                            <div className="member_check_area"><p></p></div>
                            <button className="member_submit_btn" onClick={this.member_edit}>회원정보수정</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}
