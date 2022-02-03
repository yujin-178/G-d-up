import React from 'react';

import ModifyPage from './ModifyPage';

import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {
    ChangePassword,
    AddPasswordConfirm,
    
} from './actions';
import axios from 'axios';


export default function ModifyContainer() {
    const { email, password, nickname, passwordConfirm } = useSelector((state)=>state)
    const dispatch = useDispatch()
    const history= useNavigate();

    let isModifyCompleted = ''
    if (password && passwordConfirm){
        isModifyCompleted = true
    } else {
        isModifyCompleted = false
    }

    function handleClickModify(){
        if (password !== passwordConfirm){
            alert('Message: 비밀번호가 일치하지 않습니다.')
        }
        else if (email.length >=0 ){
            axios.post("http://localhost:8080/account/modify", {email:email, nickname:nickname, password:password})
            .then(()=>{
                alert('Message: 비밀번호 변경 완료되었습니다.')
                history('/')
            })
            .catch(err=>{
                alert(`Message: ${err.response.data.message}`)
            })
        }
    }

    function ModifyPassword(event){
        dispatch(ChangePassword(event.target.value))

    }
    function ModifyPasswordConfirm(event){
        dispatch(AddPasswordConfirm(event.target.value))
    }

    return (
        <div>
        <ModifyPage 
        ModifyClick={handleClickModify} 
        ModifyPassword={ModifyPassword}
        ModifyPasswordConfirm={ModifyPasswordConfirm}
        isModifyCompleted={isModifyCompleted}/>

        </div>
    )
    }