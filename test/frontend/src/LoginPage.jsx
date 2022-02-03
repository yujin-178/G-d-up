import React from 'react';

export default function Login({LoginClick, LoginEmail, LoginPassword,isLoginCompleted}) {

    return (
        <div>
        <h2> 로그인을 하고 나면  <br />
         좋은 일만 있을 거에요.</h2> 
        <div>
            <label htmlFor="email" style={{marginRight:"35px"}}>이메일</label>
            <input 
            id="email" 
            type="text" 
            onChange={LoginEmail}
            placeholder='이메일을 입력하세요.' />
        </div>
        <br />
        <div>
            <label htmlFor="password" style={{marginRight:"20px"}}>비밀번호</label>
            <input type="password" id="password"
            placeholder='비밀번호를 입력하세요.' 
            onChange={LoginPassword}/>
        </div>
        <button type="submit" 
        style={{width:"250px" , marginTop:"20px"}} disabled={isLoginCompleted? false : true}
        onClick={LoginClick}
        >로그인</button>

        </div>
    )
    
}