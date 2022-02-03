import React from 'react';

import LoginPage from './LoginPage';

import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {
    ChangeEmail,
    ChangePassword,
} from './actions';
import axios from 'axios';


export default function LoginContainer() {
    const { email, password} = useSelector((state)=>state)
    const dispatch = useDispatch()
    const history= useNavigate();

    let isLoginCompleted = ''
    if (email && password){
        isLoginCompleted = true
    } else {
        isLoginCompleted = false
    }

    function handleClickLogin(event){
        console.log({email:email, password:password})
        if (email.length >=0 ){
            axios.get(`http://localhost:8080/account/login?email=${email}&password=${password}`)
            .then(res=>{
                history('/',{email, password})
            })
            .catch(err=>{
                alert(`Message: ${err.response.data.message}`)
            })
        }
    }

    function LoginEmail(event){
        dispatch(ChangeEmail(event.target.value))

    }

    function LoginPassword(event){
        dispatch(ChangePassword(event.target.value))

    }

    return (
        <div>
        <LoginPage 
        LoginClick={handleClickLogin} 
        LoginEmail={LoginEmail}
        LoginPassword={LoginPassword}
        isLoginCompleted={isLoginCompleted}/>

        </div>
    )
    }