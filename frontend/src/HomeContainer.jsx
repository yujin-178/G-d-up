import React from 'react';
import DressRoomContainer from './dressroom/DressRoomContainer.jsx';
import { Link } from 'react-router-dom';

export default function HomeContainer() {
  return (
    <div>
      <h1>HomePage</h1>
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
  );
}
