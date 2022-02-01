import React from 'react';

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
      <button onClick={() => { window.location.pathname = '/' }}>뒤로</button>
    </div>
  );
}
