import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { HouseUser } from '@emotion-icons/fa-solid/HouseUser';
import { Login } from '@emotion-icons/material-sharp/Login';
import { Logout } from '@emotion-icons/material-sharp/Logout';
import homeBackground from '../../public/images/homebackground.jpg';
import '../css/animate.css';
import '../css/hover.css';

export default function HomePage() {
  function logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('friendName');
    location.reload();
  }
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  return (
    <div>
      <div css={LivingRoom}>
        <div css={Title} className="mount1">
          <h1 >{`G'd up`}</h1>
          <div css={BtnBody}>
            <Link to='/dressroom'>
              <button css={DressroomBtn}>Go to get dressed up!</button>
            </Link>
          </div>
        </div>
        <div css={FlexContainer}>
          {localStorage.getItem('userInfo') ?
            <button
              css={css`background-color:transparent; border:none; cursor:pointer; position: absolute;`}
              onClick={logout}>
              <Logout
                css={[FlexItem, SignInStyle]}
                onMouseEnter={() => setHover3(true)}
                onMouseLeave={() => setHover3(false)}
              />
              {hover3 ?
                <p className="arrow_logout">로그아웃</p>
                :
                ''
              }
            </button>
            :
            <div>
              <Link to='/login' css={FlexItem}>
                <Login
                  css={SignInStyle}
                  onMouseEnter={() => setHover1(true)}
                  onMouseLeave={() => setHover1(false)}
                />
              </Link>
              {hover1 ?
                <p className="arrow_login">로그인</p>
                :
                ''
              }
              <Link to='/signup' css={FlexItem}>
                <HouseUser
                  css={SignUpStyle}
                  onMouseEnter={() => setHover2(true)}
                  onMouseLeave={() => setHover2(false)}
                />
              </Link>
              {hover2 ?
                <p className="arrow_signup">회원가입</p>
                :
                ''
              }
            </div>
          }
        </div>
        <div css={BlankDiv}>
        </div>
      </div>
    </div>
  );
}

const LivingRoom = css`
  display: grid;
  grid-template-columns: 25% 50% 25%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${homeBackground});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const Title = css`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  text-align: center;
  color: white;
  font-size: 5rem;
  margin: 0rem;
`;

const BtnBody = css`
  text-align:center;
  &:before {
    content:'';
    height:100%;
    display:inline-block;
    vertical-align:middle;
  }
`;

const DressroomBtn = css`
  background:#1AAB8A;
  color:#fff;
  border:none;
  position:relative;
  height:60px;
  font-size: 0.3em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;

  &:hover {
    background:#fff;
    color:#1AAB8A;
  }

  &:before, &:after: {
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #1AAB8A;
    transition:400ms ease all;
  }
  &:after {
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }
  &:hover:before, &:hover:after: {
    width:100%;
    transition:800ms ease all;
  }
`;

// const GoText = css`
//   margin: 0rem;
//   font-size: 2rem;
// `;

const FlexContainer = css`
  position: relative;
  grid-column: 3 / 4;
  display: flex;
  justify-content: end;
  padding: 2rem 1rem;
`;

const FlexItem = css`
  margin: 0 1.9rem;
`;

const SignInStyle = css`
  color: white;
  width: 3rem;
  hover: ;
  margin: 3rem, 0.5rem;
`;

const SignUpStyle = css`
  color: white;
  width: 3rem;
  hover: ;
  margin: 2rem, 0.5rem;
`;

const BlankDiv = css`
  width: 30rem;
  height: 10rem;
  grid-row: 3 / 4;
`;
