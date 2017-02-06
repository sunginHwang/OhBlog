import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as types from '../const/CommonVal'
import {DeleteOhjicTable} from '../reducers/OhjicReducers'

@connect((store)=>{
    return{};
},{DeleteOhjicTable})
export default class join extends Component{

    constructor() {
        super();
        this.state = {
            idCheck : false
        };
        this.memberJoin = this.memberJoin.bind(this);
        this.checkMemberId = this.checkMemberId.bind(this);

    }

    componentDidMount(){
        this.props.DeleteOhjicTable();
    }

    checkMemberId(){
      var member_id = this.refs.user_id.value;

      if(member_id== '' || member_id == undefined) {
          this.ref.confirm.value = "아이디를 입력해 주세요.";
          return;
      }
      if(member_id.length >= 20){
          this.ref.confirm.value = "아이디를 20글자 이내로 입력하세요.";
          return;
      }

        fetch(types.SERVER_URL+`/api/Member/checkMemberId?check_member_id=${member_id}`).then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                if(responseData['status'] == 'success'){
                    console.log( responseData['msg']);
                    this.setState({idCheck : true});
                    alert(responseData['msg']);
                }else{
                    this.setState({idCheck : false});
                    alert(responseData['msg']);
                }
            })
            .catch((error) => {
                alert(types.SERVER_ERROR_MSG);
            });


    }


    memberJoin(){

        if(!this.state.idCheck){
            alert("아이디 중복검사가 끝나지 않았습니다.");
            return;
        }
        if(this.refs.pwd.value != this.refs.pwdChk.value){
            alert("비밀번호 확인이 비밀번호와 다릅니다.");
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

        fetch(types.SERVER_URL+`/api/Member/insert_Member`,{
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
                        <header><div className="member_title"><p>회원가입</p></div></header>
                        <div className="member_input_contents">
                            <div className="member_info_area">
                                <input className="tempinput input_id" ref="user_id" id="user_id" type="text" maxLength="20" placeholder="아이디" />
                                <button className="tempbtn" onClick={this.checkMemberId}>ID</button>
                                <input className="input_pwd" ref="pwd" type="password" maxLength="20" placeholder="비밀번호"/>
                                <input className="input_pwd_confirm" ref="pwdChk" type="password" maxLength="20" placeholder="비밀번호확인"/>
                                <input className="input_name" ref="name" type="text" maxLength="20" placeholder="이름"/>
                                <input className="input_nickname" ref="nickName" type="text" maxLength="20" placeholder="닉네임"/>
                                <input className="input_age" ref="age" type="text" maxLength="20" placeholder="나이"/>
                                <input className="input_phoneNumber" ref="cellPhoneNumber" type="text" placeholder="핸드폰번호"/>
                                <input className="input_email" ref="email" type="text" maxLength="20" placeholder="이메일"/>
                                <div className="member_check_area"><p ref="confirm"></p></div>
                                <button className="member_submit_btn" onClick={this.memberJoin}>회원가입하기</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    };

}
