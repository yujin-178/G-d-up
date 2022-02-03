import React from 'react';

import SignupPage from './SignupPage';

import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {
    AddEmail,
    AddNickname,
    AddPassword,
    AddPasswordConfirm,
} from './actions';
import axios from 'axios';


export default function SignupContainer() {
    const { nickname, email, password, passwordConfirm} = useSelector((state)=>state)
    const dispatch = useDispatch()
    const history= useNavigate();

    let isSignupCompleted = ''
    
    if (email && password && nickname && passwordConfirm){
        isSignupCompleted = true
    } else {
        isSignupCompleted = false
    }

    function handleClickSignup(){
        if (email.length >=0 ){
            axios.post("http://localhost:8080/account/signup", {email:email, nickname:nickname, password:password, createDate:''})
            .then(res=>{
                history('/signupok')
            })
            .catch(err=>{
                alert(`Message: ${err.response.data.message}`)
            })
        }
    }

    function SignupEmail(event){
        dispatch(AddEmail(event.target.value))

    }

    function SignupNickname(event){
        dispatch(AddNickname(event.target.value))

    }
    function SignupPassword(event){
        dispatch(AddPassword(event.target.value))

    }
    function SignupPasswordConfirm(event){
        dispatch(AddPasswordConfirm(event.target.value))

    }

    return (
        <div>
        <SignupPage 
        SignupClick={handleClickSignup} 
        SignupEmail={SignupEmail}
        SignupNickname={SignupNickname}
        SignupPassword={SignupPassword}
        SignupPasswordConfirm={SignupPasswordConfirm}
        isSignupCompleted={isSignupCompleted}/>

        </div>
    )
    }