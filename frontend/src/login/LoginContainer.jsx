import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeEmailField,
  changePasswordField,
} from '../actions.js';

import LoginPage from './LoginPage.jsx';

import axios from 'axios';

export default function LoginContainer() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state);

  function handleChangeEmail(event) {
    dispatch(changeEmailField(event.target.value));
  }

  function handleChangePassword(event) {
    dispatch(changePasswordField(event.target.value));
  }

  function handleClickLogin() {
    const URL = `http://localhost:8080/account/login?email=${email}&password=${password}`;

    axios.get(URL)
      .then(res => {
        console.log('login ' + res.data.data);
      });
    
    console.log(email);
    console.log(password);
  }

  return (
    <LoginPage
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      onClickLogin={handleClickLogin}
    />
  );
}
