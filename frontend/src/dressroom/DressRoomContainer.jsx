import React from 'react';

import { Link } from 'react-router-dom';

import { css, jsx } from "@emotion/react";

export default function DressRoomContainer() {
  const Title = css`
    background-color: hotpink;
  `

  return (
    <div>
      <h2 css={Title}>드레스룸</h2>
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
