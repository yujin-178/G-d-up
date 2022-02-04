import React from 'react';

import { Link } from 'react-router-dom';

import { css, jsx } from "@emotion/react";

export default function DressRoomContainer() {
  const Title = css`
    padding: 2rem 0 0 0;
    text-align: center;
    font-size: 50px;
  `

  const DressRoom = css`
    min-height: 30rem;
    background-image: url("/images/dressroombackground.jpg");
    background-size: cover;
    background-position: center;
  `

  const Container = css`
    height: 100%;
  `

  return (
    <div css={Container}>
      <div css={DressRoom}>
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
    </div>

  )
}
