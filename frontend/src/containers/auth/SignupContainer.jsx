import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

import SignupPage from '../../components/auth/SignupPage';

export default function SignupContainer() {
  const { isLoggedIn } = useSelector(state => state.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const toLogin = () => {
    navigate('/login');
  };

  const handleClickSubmit = () => {
    const email = emailRef.current.value;
    if (!email) {
      return alert('이메일을 입력해 주세요');
    }

    const userName = userNameRef.current.value;
    if (!userName) {
      return alert('이름을 입력해 주세요');
    }

    const password = passwordRef.current.value;
    if (!password) {
      return alert('비밀번호를 입력해 주세요');
    }

    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!reg.test(password)) {
      return alert("비밀번호는 문자 및 숫자 혼합 8자 이상으로 이루어져야 합니다.");
    }

    const passwordConfirm = passwordConfirmRef.current.value;
    if (password !== passwordConfirm) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

    dispatch(signin({ email, userName, password }));
  };

  return (
    <SignupPage
      emailRef={emailRef}
      userNameRef={userNameRef}
      passwordRef={passwordRef}
      passwordConfirmRef={passwordConfirmRef}
      onClickSubmit={handleClickSubmit}
      toLogin={toLogin}
    />
  );
}
