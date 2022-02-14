import React from 'react';
import { Link } from 'react-router-dom';
import { css, keyframes } from '@emotion/react';
import { HouseUser } from '@emotion-icons/fa-solid/HouseUser';
import { Login } from '@emotion-icons/material-sharp/Login';

function DressRoomBtn() {
  return (
    <div css={Div}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" css={Goo}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <span css={ButtonBubbleContainer}>
        <Link to='/dressroom' css={[Button, ButtonBubble]}>
          <p css={GoText}>go to get dressed up</p>
        </Link>
        <span css={ButtonBubbleEffectContainer}>
          <span css={[Circle, TopLeft]}></span>
          <span css={[Circle, TopLeft]}></span>
          <span css={[Circle, TopLeft]}></span>

          <span css={[Button, EffectButton]}></span>

          <span css={[Circle, BottomRight]}></span>
          <span css={[Circle, BottomRight]}></span>
          <span css={[Circle, BottomRight]}></span>
        </span>
      </span>
    </div>
  );
}

const Div = css`
  display: block;
  height: 100%;
`;

const Goo = css`
  position: absolute;
  visibility: hidden;
  width: 1px;
  height: 1px;
`;

const ButtonBubbleContainer = css`
  top: 50%;
  margin-top: -25px;
`;

const Button = css`
`;

const ButtonBubble = css`
`;

const ButtonBubbleEffectContainer = css`
`;

const Circle = css`
`;

const TopLeft = css`
`;

const EffectButton = css`
`;

const BottomRight = css`
`;

const HueRotate = keyframes`
  from {
    -webkit-filter: hue-rotate(0);
    -moz-filter: hue-rotate(0);
    -ms-filter: hue-rotate(0);
    filter: hue-rotate(0);
  }
  to {
    -webkit-filter: hue-rotate(360deg);
    -moz-filter: hue-rotate(360deg);
    -ms-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
`;

export default function HomePage() {
  return (
    <div>
      <div css={LivingRoom}>
        <div css={Title}>
          <h1>G'd up</h1>
          <Link to='/dressroom'>
            <DressRoomBtn />
            <p css={GoText}>go to get dressed up</p>
          </Link>
        </div>
        <div css={FlexContainer}>
          <Link to='/login' css={FlexItem}>
            <Login css={SignInStyle} />
          </Link>
          <Link to='/signup' css={FlexItem}>
            <HouseUser css={SignUpStyle} />
          </Link>
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/homebackground.jpg");
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

const GoText = css`
  margin: 0rem;
  font-size: 2rem;
`;

const FlexContainer = css`
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
