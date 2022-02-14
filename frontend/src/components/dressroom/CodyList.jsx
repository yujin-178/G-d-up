import React from 'react';

import { css } from "@emotion/react";

export default function CodyList({ handleSelectCody, moveScroll, cards }) {
  return (
    <div >
      <h2>Cody</h2>
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
