import React from 'react';

export default function SignupOkPage() {
    return (
        <div>
            <h1>회원가입 완료</h1>
            <p>회원 가입 인증 메일이 발송되었습니다. 
                <br />이메일을 확인해 주세요.</p>
            <a href="#" style={{textDecoration:"none"}}>메일 재발송</a><br/><br/>
            <a href="#" style={{textDecoration:"none"}}>메일함으로 이동</a>
        
        </div>
    )
    
}