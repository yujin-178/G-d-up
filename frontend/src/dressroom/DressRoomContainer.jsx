import React from 'react';

import ClosetContainer from './ClosetContainer.jsx';
import { Link } from 'react-router-dom';

export default function DressroomContainer() {
  return (
    <div>
      <h5>드레스룸</h5>
        <Link to='/closet'>
          <button>
            옷장 가기
          </button>
        </Link>
        <Link to='/'>
          <button>
            뒤로
          </button>
        </Link>
    </div>
  )
}
