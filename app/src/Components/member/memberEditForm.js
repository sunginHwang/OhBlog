/**
 * Created by hwangseong-in on 2017. 2. 5..
 */
import React,{ Component } from 'react';


export default class memberEditForm extends Component{

    constructor() {
        super();
        this.memberEditFormClick = this.memberEditFormClick.bind(this);
    }

    memberEditFormClick

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
                            <button className="member_submit_btn" onClick={this.memberEditFormClick}>회원가입하기</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}