import React from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import { css } from "@emotion/react";

export default function CodyPage({ navigate, cards, offsetRadius, showArrows, goToSlide }) {
  return (
    <div>
      <div css={container}>
        <h2>Cody</h2>
        <button css={createBtn} onClick={() => navigate('./create')}>
          새 코디 생성하기
        </button>
        <div css={carousel}>
          <h3>carousel</h3>
          <Carousel 
            slides={cards}
            goToSlide={goToSlide}
            offsetRadius={offsetRadius}
            showNavigation={showArrows}
            animationConfig={config.gentle}
          /> 
        </div>
        <button css={backBtn} onClick={() => navigate('/dressroom')}>
          Back
        </button>
      </div>
    </div>
  );
}

const container = css`
  display: grid;
  grid-template-columns: 10rem 35rem 35rem;
  grid-template-rows: 5rem 25rem 5rem;
  grid-row-gap: 10px;
`;

const createBtn = css`
  grid-column: 3;
  grid-row: 1;
  width: 150px;
  height: 30px;
`;

const backBtn = css`
  grid-column: 3;
  grid-row: 3;
  width: 50px;
  height: 30px;
`;

const carousel = css`
  grid-column: 2;
  grid-row: 2;
  width: 30%;
  height: 500px;
  margin: 0 auto;
`;
