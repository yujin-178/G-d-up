import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage({ onChangeEmail, onChangePassword, onClickSubmit }) {
  return (
    <div>
      <h1>회원가입</h1>
      <label htmlFor="signup-email">email</label>
      <input
        id="signup-email"
        type="text"
        onChange={onChangeEmail}
      />
      <br />
      <label htmlFor="signup-password">password</label>
      <input
        id="signup-password"
        type="text"
        onChange={onChangePassword}
      />
      <br />
      <button onClick={onClickSubmit}>가입</button>
      <Link to='/'>
        <button>
          뒤로
        </button>
      </Link>
    </div>
  );
}
