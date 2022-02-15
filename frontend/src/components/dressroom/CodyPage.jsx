import React from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import { css } from "@emotion/react";
import { ArrowLeftSquare, ArrowRightSquare } from '@emotion-icons/bootstrap';
import CodyList from '../../components/dressroom/CodyList';
import CodyDetailContainer from '../../containers/dressroom/CodyDetailContainer';

export default function CodyPage({ isdetailOpen, handleSelectCody, scrollisTop, moveScroll, codyList, handlegoToSlide, navigate, cards, offsetRadius, showArrows, goToSlide }) {
  // const animatedItem = {
  //   0: useScrollFadeIn('down', 1, 0),
  //   1: useScrollFadeIn('down', 1, 0.2),
  //   2: useScrollFadeIn('up', 1, 0.3),
  // };

  return (
    <div css={CodyBackground}>
      <div css={isdetailOpen ? css`visibility: hidden;` : container}>
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

      <div css={scrollisTop ? Fadeup : Fadein} id="fade">
        <div>
          <CodyList
            cards={codyList}
            moveScroll={moveScroll}
            scrollisTop={scrollisTop}
            handleSelectCody={handleSelectCody}
          />
        </div>
      </div>

      <button css={createBtn} onClick={() => navigate('/codycreate')}>
        새 코디 생성하기
      </button>
      <button
        css={backBtn}
        onClick={() => navigate('/dressroom')}>
        Back
      </button>
      <CodyDetailContainer
      />

    </div>
  );
}

const CodyBackground = css`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/codybackground.jpg");
  background-size: cover;
  background-position: center;
`;

const Fadeup = css`
  transition-timing-function : cubic-bezier(0,0,0.2,1);
  transition-property : all;
  transition-duration : 1s;
  transition-delay : 1s;
  opacity : 1;
  transform = translate3d(0, 50%, 0);
`;

const Fadein = css`
  transition-timing-function : cubic-bezier(0,0,0.2,1);
  transition-property : all;
  transition-duration : 1s;
  transition-delay : 1s;
  opacity : 1;
  transform = translate3d(0, -50%, 0);
`;

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
  height: 100vh;

  transition-timing-function : cubic-bezier(0,0,0.2,1);
  transition-property : all;
  transition-duration : 1s;
  transition-delay : 1s;
  opacity : 1;
  transform = translate3d(0, 50%, 0);
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
