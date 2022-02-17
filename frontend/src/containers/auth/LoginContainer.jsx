import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';
import { setUserName } from '../../slices/clothesSlice';
import { useNavigate } from 'react-router-dom';

import LoginPage from '../../components/auth/LoginPage';

export default function LoginContainer() {
  const { isLoggedIn, error } = useSelector(state => state.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const toSignup = () => {
    navigate('/signup');
  };

  function handleClickLogin() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
  }

  const { userName } = useSelector(state => state.authSlice);
  dispatch(setUserName(userName));

  return (
    <LoginPage
      emailRef={emailRef}
      passwordRef={passwordRef}
      onClickLogin={handleClickLogin}
      error={error}
      toSignup={toSignup}
    />
  );
}
