import React from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { ViewTile } from '@emotion-icons/zondicons/ViewTile';
import { TriangleDown } from '@emotion-icons/entypo/TriangleDown';
import { ImageEdit } from '@emotion-icons/fluentui-system-regular/ImageEdit';

import { css } from "@emotion/react";
import CodyBackgroundImg from '../../../public/images/codybackground.jpg';

import { ArrowLeftSquare, ArrowRightSquare } from '@emotion-icons/bootstrap';
import CodyList from '../../components/dressroom/CodyList';
import CodyDetailContainer from '../../containers/dressroom/CodyDetailContainer';

export default function CodyPage({ filterCody, tagDelete, tagFilter, tagRef, onKeyPress, setisdetailOpen, selectedCody, isdetailOpen, handleSelectCody, scrollisTop, moveScroll, handlegoToSlide, navigate, cards, offsetRadius, showArrows, goToSlide, userName, isLoggedInUser }) {

  return (
    <div>
      {scrollisTop ?
        <div css={CodyBackground}>
          <div css={isdetailOpen ? css`visibility: hidden;` : container}>
            {isLoggedInUser ?
              <h2 css={Title}>{userName}님의 코디</h2>
              : <h2 css={Title}>{userName}님의 코디를 구경해보세요!</h2>
            }
            {cards.length >= 1 ?
              <>
                <div css={carousel} id="cody2">
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
              </>
              :
              <div css={message}>
                <p>아직 완성한 코디가 없습니다..</p>
                {isLoggedInUser ?
                  <p>우측 상단의 코디 생성하기 버튼을 눌러 나만의 코디를 완성해보세요! </p>
                  :
                  ''
                }
              </div>
            }
            <button
              onClick={() => moveScroll('d')}
              css={scrollBtn}
            >
              <ViewTile css={css`width:30px; margin: 10px; `} />
              Gallery
              <TriangleDown css={css`width:30px; color:white; `} />
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

      <button css={createBtn({ isLoggedInUser })} onClick={() => navigate('/codycreate')}>
        <ImageEdit css={css`width:70px; margin-right:10px;`} />
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

const message = css`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: lighter;
  width: 100%;
`;

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
  width: 200px;
  height: 50px;
  color: white;
  cursor: pointer;
  border : none;
  font-size: 30px;
  background: transparent;

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
  justify-content:end;
`;

const RightArrow = css`
  display: grid;
  grid-column: 3;
  grid-row: 2;
  grid-columns: repeat(7,1fr);
  grid-rows: repeat(7,1fr);
  color: #f2f2f2;
  justify-content: start;
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
  right: 8rem;
  top: 30px;
  width: 150px;
  height: 50px;
  font-size: 25px;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  ${!isLoggedInUser &&
  `
    display: none;
  `}
`;

const backButton = css`
  position: absolute;
  right: 10rem;
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
