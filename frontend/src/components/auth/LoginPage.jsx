import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage({ onChangeEmail, onChangePassword, onClickLogin }) {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <label htmlFor="login-email">email</label>
      <input
        id="login-email"
        type="text"
        onChange={onChangeEmail}
      />
      <label htmlFor="login-password">password</label>
      <input
        id="login-password"
        type="text"
        onChange={onChangePassword}
      />
      <button onClick={onClickLogin}>로그인</button>
      <Link to='/'>
        <button>
          뒤로
        </button>
      </Link>

    </div>
  );
}
