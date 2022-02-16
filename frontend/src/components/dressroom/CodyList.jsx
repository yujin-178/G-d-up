import React from 'react';
import CodyCard from './CodyCard';

import { css } from "@emotion/react";
import CodyBackgroundImg from  '../../../public/images/codybackground.jpg';

export default function CodyList({ setisdetailOpen, handleSelectCody, moveScroll, cards }) {
  return (
    <div css={listContainer}>
      <h2 css={title}>Cody</h2>

      {cards ?
        <div css={container}>
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                onClick={() => { handleSelectCody(index); setisdetailOpen(true); }}
              >
                <CodyCard
                  imgurl={card.imageModel.imageUrl}
                />
              </div>
            );
          })}
        </div>
        :
        <div css={message}>
          <p>아직 완성한 코디가 없습니다..</p>
          <p>우측 상단의 코디 생성하기 버튼을 눌러 나만의 코디를 완성해보세요! </p>
        </div>
      }

      <div css={btnContainer}>
        <button
          onClick={() => moveScroll('u')}
          css={scrollBtn}
        >
          갤러리
        </button>
      </div>
    </div>
  );
}

const listContainer = css`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(5,1fr);

  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${CodyBackgroundImg});
  background-size: cover;
  background-position: center;
`;

const title = css`
  grid-row: 1;
`;

const message = css`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: lighter;
  width: 100%;
`;

const container = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  grid-row: 3;
`;

const btnContainer = css`
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-row: 4;
  justify-self : center;
`;

const scrollBtn = css`
  display:flex;
  width: 150px;
  height: 30px;
  grid-column:3;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
