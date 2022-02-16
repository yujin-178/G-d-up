import React from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import { css } from "@emotion/react";
import CodyBackgroundImg from '../../../public/images/codybackground.jpg';

import { ArrowLeftSquare, ArrowRightSquare } from '@emotion-icons/bootstrap';
import CodyList from '../../components/dressroom/CodyList';
import CodyDetailContainer from '../../containers/dressroom/CodyDetailContainer';

export default function CodyPage({ filterCody, tagDelete, tagFilter, tagRef, onKeyPress, setisdetailOpen, selectedCody, isdetailOpen, handleSelectCody, scrollisTop, moveScroll, codyList, handlegoToSlide, navigate, cards, offsetRadius, showArrows, goToSlide, userName, isLoggedInUser }) {
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
            <h2 css={Title}>{userName}님의 코디</h2>
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
                className="hvr-fade"
              />
            </div>
            <div css={RightArrow}>
              <ArrowRightSquare
                size={40}
                css={arrowStyle}
                onClick={() => { handlegoToSlide(goToSlide + 1); }}
                className="hvr-fade"
              />
            </div>
            <button
              onClick={() => moveScroll('d')}
              css={scrollBtn}
              className="hvr-fade"
            >
              Gallery
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
              isLoggedInUser={isLoggedInUser}
              userName={userName}
            />
          </div>
        </div>
      }

      <button css={createBtn({ isLoggedInUser })} onClick={() => navigate('/codycreate')} className='hvr-fade'>
        Create
      </button>
      <button
        css={backButton}
        onClick={() => navigate('/dressroom')}
        className='hvr-fade'
      > Back </button>
      {selectedCody ?
        < CodyDetailContainer
          isLoggedInUser={isLoggedInUser}
        />
        :
        ''
      }
    </div>
  );
}

const Title = css`
  padding: 2rem 0 0 0;
  font-size: 50px;
  margin: 0px;
  color: #f2f2f2;
  text-align : center;
  grid-row : 1;
  grid-column:2;
`;

const CodyBackground = css`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${CodyBackgroundImg});
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
  width: 90px;
  height: 40px;
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;
  cursor: pointer;

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
  cursor: pointer;
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
  position: absolute;
  right: 50px;
  top: 30px;
  width: 90px;
  height: 40px;
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;
  cursor: pointer;
  ${!isLoggedInUser &&
  `
    display: none;
  `}
`;

const backButton = css`
  position: absolute;
  right: 50px;
  bottom: 35px;
  width: 90px;
  height: 40px;
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;
  cursor: pointer;
`;

const carousel = css`
  grid-column: 2;
  grid-row: 2;
  width: 70%;
  height: 500px;
  margin: 0 auto;
  cursor: pointer;
`;
