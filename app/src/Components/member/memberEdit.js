import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

export default class memberEdit extends Component{

    constructor() {
        super();
        this.state = {
            idCheck : false
        };
        this.memberJoin = this.memberJoin.bind(this);
        this.checkMemberId = this.checkMemberId.bind(this);

    }

    checkMemberId(){
        var member_id = this.refs.user_id.value;

        if(member_id== '' || member_id == undefined) {
            alert('아이디를 입력해 주세요.');
            return;
        }
        if(member_id.length >= 20){
            alert('아이디를 20글자 이내로 입력하세요.');
            return;
        }

        fetch(`http://ohjic.qfun.kr/api/Member/checkMemberId?check_member_id=${member_id}`).then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                if(responseData['memberIdCheck']){
                    this.setState({idCheck : true});
                    alert('아이디를 사용하셔도 됩니다');
                }else{
                    this.setState({idCheck : false});
                    alert('이미 존재하는 아이디 입니다');
                }
            })
            .catch((error) => {
                console.log(error);
            });


    }


    memberJoin(){
        if(!this.state.idCheck){
            alert('아이디 중복체크를 해주세요.');
            return;
        }
        if(this.refs.pwd.value != this.refs.pwdChk.value){
            alert('비밀번호 확인을 다시 체크해주세요.');
            return;
        }


        var insert_member = {
            member_id : this.refs.user_id.value,
            member_password: this.refs.pwd.value,
            member_nickname : this.refs.nickName.value,
            member_name : this.refs.name.value,
            member_age : this.refs.age.value,
            member_phone : this.refs.cellPhoneNumber.value,
            member_email : this.refs.email.value,
        };

        var data = new FormData();
        data.append( "insert_member", JSON.stringify( insert_member ) );

        fetch(`http://ohjic.qfun.kr/api/Member/insert_Member`,{
            method: 'POST',
            body: data
        })
            .then((response) => {
                if(response.ok){
                    return response;
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                alert('회원가입을 축하드립니다.');
            })
            .catch((error) => {
                alert('회원가입시 오류가 발생하였습니다. 문의 부탁드립니다.')
                console.log(error);
            });

    }

    render(){

        return(
            <div className="member_area">
                <div className="member_component">
                    <header><div class="member_title"><p>회원정보 변경</p></div></header>
                    <div className="member_input_contents">
                        <div className="member_info_area">
                            <h2>gommpo</h2>
                            <input className="input_pwd" ref="prePwd" type="password" maxLength="20" placeholder="이전비밀번호"/>
                            <input className="input_pwd" ref="pwd" type="password" maxLength="20" placeholder="변경할비밀번호"/>
                            <input className="input_pwd_confirm" ref="pwdChk" type="password" maxLength="20" placeholder="변경할비밀번호확인"/>
                            <input className="input_name" ref="name" type="text" maxLength="20" placeholder="이름"/>
                            <input className="input_nickname" ref="nickName" type="text" maxLength="20" placeholder="닉네임"/>
                            <input className="input_age" ref="age" type="text" maxLength="20" placeholder="나이"/>
                            <input className="input_phoneNumber" ref="cellPhoneNumber" type="text" placeholder="핸드폰번호"/>
                            <input className="input_email" ref="email" type="text" maxLength="20" placeholder="이메일"/>
                            <div className="member_check_area"><p>비밀번호를 확인해주세요</p></div>
                            <button className="member_submit_btn" onClick={this.memberJoin}>회원가입하기</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}
