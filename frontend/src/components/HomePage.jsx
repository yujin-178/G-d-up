import React from 'react';
import { Link } from 'react-router-dom';
import { LivingRoom } from './resusableCss';

export default function HomePage() {
  return (
    <div>
      <h1>G'd up</h1>
      <div css={LivingRoom}>
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
  );
}
