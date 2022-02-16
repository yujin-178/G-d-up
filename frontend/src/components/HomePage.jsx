import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { HouseUser } from '@emotion-icons/fa-solid/HouseUser';
import { Login } from '@emotion-icons/material-sharp/Login';
import { Logout } from '@emotion-icons/material-sharp/Logout';
import homeBackground from '../../public/images/homebackground.jpg';

export default function HomePage() {
  function logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('friendName');
    location.reload();
  }

  return (
    <div>
      <div css={LivingRoom}>
        <div css={Title}>
          <h1>{`G'd up`}</h1>
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
              <Logout css={[FlexItem, SignInStyle]} />
            </button>
            :
            <div>
              <Link to='/login' css={FlexItem}>
                <Login css={SignInStyle} />
              </Link>
              <Link to='/signup' css={FlexItem}>
                <HouseUser css={SignUpStyle} />
              </Link>
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${homeBackground});
  background-size: cover;
  background-position: center;
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
  margin: 0 0.5rem;
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
