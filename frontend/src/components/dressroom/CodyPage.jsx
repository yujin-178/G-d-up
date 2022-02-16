import React from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import { css } from "@emotion/react";
import CodyBackgroundImg from '../../../public/images/codybackground.jpg';

import { ArrowLeftSquare, ArrowRightSquare } from '@emotion-icons/bootstrap';
import CodyList from '../../components/dressroom/CodyList';
import CodyDetailContainer from '../../containers/dressroom/CodyDetailContainer';

export default function CodyPage({ filterCody, tagDelete ,tagFilter ,tagRef, onKeyPress ,setisdetailOpen, selectedCody, isdetailOpen, handleSelectCody, scrollisTop, moveScroll, codyList, handlegoToSlide, navigate, cards, offsetRadius, showArrows, goToSlide, userName, isLoggedInUser }) {
  // const animatedItem = {
  //   0: useScrollFadeIn('down', 1, 0),
  //   1: useScrollFadeIn('down', 1, 0.2),
  //   2: useScrollFadeIn('up', 1, 0.3),
  // };

  return (
    <div>
      {scrollisTop ?
        <div css={CodyBackground}>
          <div css={isdetailOpen ? css`visibility: hidden;` : container}>
            <h2>{userName}님의 코디</h2>
            {cards ?
              <div css={carousel}>
                <Carousel
                  slides={cards}
                  goToSlide={goToSlide}
                  offsetRadius={offsetRadius}
                  showNavigation={showArrows}
                  animationConfig={config.gentle}
                />
              </div>
              :
              ''
            }

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
        </div>
        :

        <div css={scrollisTop ? Fadeup : Fadein} id="fade">
          <div>
            <CodyList
              cards={filterCody}
              moveScroll={moveScroll}
              scrollisTop={scrollisTop}
              handleSelectCody={handleSelectCody}
              setisdetailOpen={setisdetailOpen}
              tagRef={tagRef}
              onKeyPress={onKeyPress}
              tagFilter={tagFilter}
              tagDelete={tagDelete}
            />
          </div>
        </div>
      }

      <button css={createBtn({ isLoggedInUser })} onClick={() => navigate('/codycreate')}>
            새 코디 생성
      </button>
      <button
        css={backBtn}
        onClick={() => navigate('/dressroom')}>
            Back
      </button>
      {selectedCody ?
        <CodyDetailContainer
        />
        :
        ''
      }
    </div>
  );
}

const CodyBackground = css`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${CodyBackgroundImg});
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
  grid-column: 2;
  grid-row : 3;
  justify-self: center;

  background: #c99f9f;
	width: 8rem;
  height: 2rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const LeftArrow = css`
  display: grid;
  grid-column: 1;
  grid-row: 2;
  grid-columns: repeat(7,1fr);
  grid-rows: repeat(7,1fr);
  color: #f2f2f2;
`;

const RightArrow = css`
  display: grid;
  grid-column: 3;
  grid-row: 2;
  grid-columns: repeat(7,1fr);
  grid-rows: repeat(7,1fr);
  color: #f2f2f2;
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

const createBtn = ({ isLoggedInUser }) => css`
  width: 150px;
  height: 30px;
  position: fixed;
  top: 30px;
  right: 50px;

  background: #c99f9f;
  width: 8rem;
  height: 2rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  ${!isLoggedInUser &&
  `
    display: none;
  `}
`;

const backBtn = css`
  position: fixed;
  bottom: 30px;
  right: 50px;

  background: #c99f9f;
	padding: 0.5rem 1rem;
	width: 4rem;
  height: 2rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const carousel = css`
  grid-column: 2;
  grid-row: 2;
  width: 70%;
  height: 500px;
  margin: 0 auto;
`;
