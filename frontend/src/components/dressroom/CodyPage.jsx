import React from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import { css } from "@emotion/react";
import { ArrowLeftSquare, ArrowRightSquare } from '@emotion-icons/bootstrap';
import CodyList from '../../components/dressroom/CodyList';

export default function CodyPage({ scrollisTop, moveScroll, codyList, handlegoToSlide, navigate, cards, offsetRadius, showArrows, goToSlide }) {
  return (
    <div>
      <button css={createBtn} onClick={() => navigate('/codycreate')}>
        새 코디 생성하기
      </button>
      <button
        css={backBtn}
        onClick={() => navigate('/dressroom')}>
        Back
      </button>
      <div css={scrollisTop ? container : displayToggle}>
        <h2>Cody</h2>
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
        <button
          onClick={() => moveScroll('d')}
          css={scrollBtn}
        >
          전체 보기
        </button>
      </div>
      <div css={scrollisTop ? displayToggle : ''}>
        <CodyList
          cards={codyList}
          moveScroll={moveScroll}
          scrollisTop={scrollisTop}
        />
      </div>
    </div>
  );
}

const scrollBtn = css`
  width: 150px;
  height: 30px;
  grid-column: 2;
  grid-row : 3;
  justify-self: center;
`;

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
  transition: all 1s;
`;

const displayToggle = css`
  visibility: hidden;
  transition: all 1s;
`;

const createBtn = css`
  width: 150px;
  height: 30px;
  position: fixed;
  top: 30px;
  right: 50px;
`;

const backBtn = css`
  width: 50px;
  height: 30px;
  position: fixed;
  bottom: 30px;
  right: 50px;
`;

const carousel = css`
  grid-column: 2;
  grid-row: 2;
  width: 70%;
  height: 500px;
  margin: 0 auto;
`;
