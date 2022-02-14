import React from 'react';

import { Link } from 'react-router-dom';

import { css } from "@emotion/react";

import { BackBtn } from '../dressRoomCss';

export default function DressRoomContainer() {
  return (
    <div css={Container}>
      <div css={DressRoom}>
        <h2 css={Title}>드레스룸</h2>
        <div css={[BtnItem, CodyBtn]}>
          <Link to='/cody'>
            <button css={TextButton}>
              코디 목록으로
            </button>
            <img css={Btn} src="/images/codyBtn.svg" alt="코디버튼" />
          </Link>
        </div>
        <div css={[BtnItem, ClosetBtn]}>
          <Link to='/closet'>
            <button css={TextButton}>
              옷장 가기
            </button>
            <img css={Btn} src="/images/closetBtn.svg" alt="코디버튼" />
          </Link>
        </div>
        <Link to='/'>
          <button css={BackBtn}>
            뒤로
          </button>
        </Link>
      </div>
    </div>
  );
}

const DressRoom = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/dressroombackground.jpg");
  background-size: cover;
  background-position: center;
`;

const BtnItem = css`
  width: 70%;
  height: 32%;
  margin: 4rem 5rem;
  background-color: #685f60;
  opacity: 0.8;
  grid-row: 2 / 3;
  border-radius: 4rem;
`;

const CodyBtn = css`
  grid-column: 2 / 3;
`;

const ClosetBtn = css`
  grid-column: 3 / 4;
`;

const Btn = css`
  width: 100%;
`;

const Title = css`
  padding: 2rem 0 0 0;
  text-align: center;
  font-size: 50px;
`;

const Container = css`
  display: grid;
  height: 100%;
`;

const TextButton = css`
  margin: 1rem 2rem;
  padding: 0.5rem 1rem;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  width: auto;

  background: #e0e0e0;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const GridContainer = css`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr;
`;

