import React from 'react';
import { useSelector } from 'react-redux';

export default function ModifyPage({location, ModifyClick, ModifyPassword, isModifyCompleted, ModifyPasswordConfirm}) {
    const { email, nickname} = useSelector((state)=>state)

    return (
        <div>
        <div>
            <p style={{marginRight:"35px"}}>닉네임 : </p>
            <p>{nickname} </p>
        </div>
        <br />

        <div>
        <p style={{marginRight:"35px"}}>이메일 : </p>
            <p>{email} </p>
        </div>
        <br />
        <div>
            <label htmlFor="password" style={{marginRight:"20px"}}>비밀번호</label>
            <input type="password" id="password" onChange={ModifyPassword}
            placeholder='비밀번호를 입력하세요.' />
        </div>
        <br />
        <div>
            <label htmlFor="passwordConfirm" style={{marginRight:"50px"}}>비밀번호 <br />확인</label>
            <input type="password" id="passwordConfirm"
            placeholder='비밀번호를 다시 한번 입력하세요.' onChange={ModifyPasswordConfirm}/>
        </div>
        <button type="button" style={{width:"250px" , marginTop:"20px"}}
        onClick={ModifyClick}
        disabled={isModifyCompleted? false : true}
        >저장</button>

        </div>
    )
    
}