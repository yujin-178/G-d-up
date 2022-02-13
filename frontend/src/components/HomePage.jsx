import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

export default function HomePage() {
  return (
    <div>
      <div css={LivingRoom}>
        <div css={Title}>
          <h1>G'd up</h1>
          <p css={GoText}>go to get dressed up</p>
        </div>
        <div>
          <Link to='/login'>
            <button>
              로그인
            </button>
          </Link>
          <Link to='/signup'>
            <button>
              회원가입
            </button>
          </Link>
          <Link to='/dressroom'>
            <button>
              드레스룸
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const LivingRoom = css`
  display: grid;
  grid-template-columns: 25% 50% 25%;
  margin: 5rem auto;
  width: 85rem;
  height: 50rem;
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
