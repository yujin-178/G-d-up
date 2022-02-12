import React from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import { css } from "@emotion/react";
import { ArrowLeftSquare, ArrowRightSquare } from '@emotion-icons/bootstrap';

export default function CodyPage({ handlegoToSlide, navigate, cards, offsetRadius, showArrows, goToSlide }) {
  return (
    <div>
      <div css={container}>
        <h2>Cody</h2>
        <button css={createBtn} onClick={() => navigate('./create')}>
          새 코디 생성하기
        </button>
        <div css={carousel}>
          <Carousel
            slides={cards}
            goToSlide={goToSlide}
            offsetRadius={offsetRadius}
            showNavigation={showArrows}
            animationConfig={config.gentle}
          />
        </div>

        <div css={LeftArrow}>
          <ArrowLeftSquare
            size={40}
            css={arrowStyle}
            onClick={() => { handlegoToSlide(goToSlide - 1); }}
          />
        </div>
        <div css={RightArrow}>
          <ArrowRightSquare 
            size={40}
            css={arrowStyle}
            onClick={() => { handlegoToSlide(goToSlide + 1); }}
          />
        </div>
        <button css={backBtn} onClick={() => navigate('/dressroom')}>
          Back
        </button>
      </div>
    </div>
  );
}

const LeftArrow = css`
  display: grid;
  grid-column: 1;
  grid-row: 2;
  grid-columns: repeat(7,1fr);
  grid-rows: repeat(7,1fr);
`;

const RightArrow = css`
  display: grid;
  grid-column: 3;
  grid-row: 2;
  grid-columns: repeat(7,1fr);
  grid-rows: repeat(7,1fr);
`;

const arrowStyle = css`
  grid-column: 2;
  grid-row: 2;
`;

const container = css`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 4fr 1fr;
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
  width: 70%;
  height: 500px;
  margin: 0 auto;
`;
