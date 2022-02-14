import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

import LoginPage from '../../components/auth/LoginPage';

export default function LoginContainer() {
  const { isLoggedIn } = useSelector(state => state.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  function handleClickLogin() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
  }

  return (
    <LoginPage
      emailRef={emailRef}
      passwordRef={passwordRef}
      onClickLogin={handleClickLogin}
    />
  );
}
