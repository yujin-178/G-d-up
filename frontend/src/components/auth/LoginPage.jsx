import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import dressroomBackground from  '../../../public/images/dressroombackground.jpg';

export default function LoginPage({ emailRef, passwordRef, onClickLogin, error, toSignup }) {
  return (
    <div css={LivingRoom}>
      <div css={Closet}>
        <div css={ItemsGridWrapper}>
          <br/>
          <div css={Title}>
            <h1>{`G'd up`}</h1>
          </div>
          {error && <p css={errorMessage}>{error}</p>}
          <div css={inputGroup}>
            <input
              css={inputStyle}
              ref={emailRef}
              id="email"
              type="text"
              placeholder='abc@gmail.com'
            />
            <br/>
            <input
              css={inputStyle}
              ref={passwordRef}
              id="password"
              type="password"
              placeholder='비밀번호를 입력해주세요'
            />
            <br/>
            <button css={LoginBtn} onClick={onClickLogin}>로그인</button>
          </div>
          <hr css={hrStyle}/>
          <p>아직 회원이 아니신가요?&nbsp;&nbsp;
            <span onClick={toSignup} css={signupStyle}>회원가입</span>
          </p>
        </div>
        <Link to='/'>
          <button css={BackBtn} className="hvr-fade">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

const signupStyle = css`
  text-decoration:none; 
  cursor: pointer; 
  color: #551a8b
`;

const LivingRoom = css`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${dressroomBackground});
  background-size: cover;
  background-position: center;
`;

const Title = css`
  text-align: center;
  color: white;
  font-size: 2rem;
  margin: 0rem;
`;

const Closet = css`
  display: flex;
  justify-content: center;
  width: 60%;
  max-width: 42rem;
  height: 60%;
  display:inline-block;
  margin-top: 7%;
`;

const ItemsGridWrapper = css`
  position: relative;
  width: 60%;
  height: 90%;
  margin: 2.5rem auto;
  background-color: #BFAEA4;
  border-radius: 0.5rem;
  opacity: 0.9;
  text-align: center;
`;

const inputGroup = css`
  padding: 5px;
`;

const inputStyle = css`
  width: 66%;
  height: 45px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  background-color: #F2F2F2;
  margin: 5px;
  padding-left: 13px;
`;

const hrStyle = css`
  margin-top: 5%;
  width: 70%;
  align: center;
  color: #E5E5E5;
`;

const LoginBtn = css`
  width: 70%;
  height: 45px;
  background: #ecc194;
	border: 0;
	border-radius: 15px;
  font-size: 15px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
  margin: 5px;
`;

const BackBtn = css`
  position: absolute;
  left: 75.6rem;
  top: 44.3rem;

  width: 90px;
  height: 40px;
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;
  cursor: pointer;
`;

const errorMessage = css`
  position: absolute;
  left: 32%;
  top: 27%;
`;
