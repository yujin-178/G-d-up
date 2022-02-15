import React from 'react';

import { css } from "@emotion/react";

export default function CodyList({ handleSelectCody, moveScroll, cards }) {
  return (
    <div >
      <h2>Cody</h2>

      {cards ?
        <div css={container}>
          {cards.map((card, index) => {
            return (
              <img
                key={index}
                src={card.imageModel.imageUrl}
                css={imgStyle}
                onClick={() => handleSelectCody(index)}
              />
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

const imgStyle = css`
  width: 90%;
  height: fit-content;
`;

const container = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

const btnContainer = css`
  display: grid;
  grid-template-columns: repeat(5,1fr);
`;

const scrollBtn = css`
  width: 150px;
  height: 30px;
  grid-column:3;
  justify-self: center;
  margin: 20px;
`;
