import React from 'react';

export default function SignupPage({isSignupCompleted ,SignupClick ,SignupEmail, SignupNickname, SignupPassword, SignupPasswordConfirm}) {
    
    return (
        <div>
        <div>
            <label htmlFor="name" style={{marginRight:"35px"}}>닉네임</label>
            <input 
            id="name" 
            type="text"
            placeholder='닉네임을 입력하세요.'
            onChange={SignupNickname} />
        </div>
        <br />

        <div>
            <label htmlFor="email" style={{marginRight:"35px"}}>이메일</label>
            <input 
            id="email" 
            type="email" 
            placeholder='이메일을 입력하세요.'
            onChange={SignupEmail} />
        </div>
        <br />
        <div>
            <label htmlFor="password" style={{marginRight:"20px"}}>비밀번호</label>
            <input type="password" id="password"
            placeholder='비밀번호를 입력하세요.' 
            onChange={SignupPassword}/>
        </div>
        <br />
        <div>
            <label htmlFor="passwordConfirm" style={{marginRight:"50px"}}>비밀번호 <br />확인</label>
            <input type="password" id="passwordConfirm"
            placeholder='비밀번호를 다시 한번 입력하세요.' 
            onChange={SignupPasswordConfirm}/>
        </div>
        <button 
        type="button" 
        style={{width:"250px" , marginTop:"20px"}}
        onClick={SignupClick}
        disabled={isSignupCompleted? false : true}
        >회원 가입</button>

        </div>
    )
    
}