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

  const Button = css`
    margin: 0;
    padding: 0.5rem 1rem;

    font-family: "Noto Sans KR", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    text-decoration: none;

    display: inline-block;
    width: auto;

    border: none;
    border-radius: 4px;
  `

  const FlexContainer = css`
    display: flex;
    justify-content: space-between;
  `

  return (
    <div css={Container}>
      <div css={DressRoom}>
        <h2 css={Title}>드레스룸</h2>
        <div css={FlexContainer}>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
            <Link to='/closet'>
              <button css={Button}>
                옷장 가기
              </button>
            </Link>
            <Link to='/'>
              <button css={Button}>
                뒤로
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}
