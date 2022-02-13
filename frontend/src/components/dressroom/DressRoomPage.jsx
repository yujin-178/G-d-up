import React from 'react';

import { Link } from 'react-router-dom';

import { css } from "@emotion/react";

import { DressRoom, BackBtn } from '../dressRoomCss';

export default function DressRoomContainer() {
  return (
    <div css={Container}>
      <div css={DressRoom}>
        <h2 css={Title}>드레스룸</h2>
        <div css={GridContainer}>
          <div css={BtnItem}>
            <Link to='/cody'>
              <button css={Button}>
                코디 목록으로
              </button>
            </Link>
          </div>
          <div css={BtnItem}>
            <button css={Button}>
              옷 추천
            </button>
          </div>
          <div css={BtnItem}>
            <Link to='/closet'>
              <button css={Button}>
                옷장 가기
              </button>
            </Link>
          </div>
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

const Title = css`
  padding: 2rem 0 0 0;
  text-align: center;
  font-size: 50px;
`;

const Container = css`
  display: grid;
  height: 100%;
`;

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

const BtnItem = css`
  margin: 4rem auto;
`;
