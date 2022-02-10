import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeEmailField,
  changePasswordField,
} from '../../actions';

import SignupPage from '../../components/auth/SignupPage';

import axios from 'axios';

export default function SignupContainer() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state);

  function handleChangeEmail(event) {
    dispatch(changeEmailField(event.target.value));
  }

  function handleChangePassword(event) {
    dispatch(changePasswordField(event.target.value));
  }

  function handleClickSubmit(event) {
    const nickname = email.slice(0, email.indexOf('@'));
    console.log(nickname);
    const URL = 'http://localhost:8080/account/signup';
    axios.post(URL, {
      'email': email,
      'nickname': nickname,
      'password': password,
    })
      .then(res => {
        console.log(res.data.data);
      });
    
    console.log(email);
    console.log(password);

    console.log(email);
    console.log(password);
  }

  return (
    <SignupPage
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      onClickSubmit={handleClickSubmit}
    />
  );
}
