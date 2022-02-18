import React from 'react';
import CodyCard from './CodyCard';
import Tag from './Tag';
import { ViewCarousel } from '@emotion-icons/material-outlined/ViewCarousel';
import { TriangleUp } from '@emotion-icons/entypo/TriangleUp';

import { css } from "@emotion/react";
import CodyBackgroundImg from '../../../public/images/codybackground.jpg';
import Search from '../../../public/images/search.png';

export default function CodyList({ userName, isLoggedInUser, tagDelete, tagFilter, tagRef, onKeyPress, setisdetailOpen, handleSelectCody, moveScroll, cards }) {
  return (
    <div css={BackImg}>
      <div css={listContainer}>
        {isLoggedInUser ?
          <h2 css={title}>{userName}님의 코디</h2>
          : <h2 css={title}>{userName}님의 코디를 구경해보세요!</h2>
        }
        <div css={searchBar}>
          <input
            data-testid="input"
            ref={tagRef}
            css={searchInput}
            type="text"
            placeholder="태그 검색"
            onKeyPress={onKeyPress}
          />
          <img src={Search} css={searchIcon} />
          <div css={tags}>
            {tagFilter.length ?
              tagFilter.map((tag, index) => {
                return (
                  <Tag
                    key={index}
                    value={tag}
                    deleteTagHandler={tagDelete}
                  />
                );
              }) :
              <Tag
                value={'ex. 데일리'}
                deleteTagHandler={tagDelete}
              />
            }
          </div>
        </div>
        {cards.length >= 1 ?
          <div css={container} id="cody">
            {cards.map((card, index) => {
              return (
                <div
                  css={css`opacity:1;`}
                  key={index}
                  onClick={() => { handleSelectCody(index); setisdetailOpen(true); }}
                >
                  <CodyCard
                    imgurl={card.imageModel.imageUrl}
                    card={card}
                  />
                </div>
              );
            })}
          </div>
          :
          <div css={message}>
            <p>{tagFilter.length >= 1 ? '일치하는 결과가 없습니다..' : '아직 완성한 코디가 없습니다..'}</p>
            {isLoggedInUser ?
              <p>우측 상단의 코디 생성하기 버튼을 눌러 나만의 코디를 완성해보세요! </p>
              :
              ''
            }
          </div>
        }

        <div css={btnContainer}>
          <button
            onClick={() => moveScroll('u')}
            css={scrollBtn}
          >
            <ViewCarousel css={css`width:40px; margin: 10px; `} />
            Slide View
            <TriangleUp css={css`width:30px; margin: 10px; `} />
          </button>
        </div>
      </div>
    </div>
  );
}

const searchIcon = css`
  display: inline-block;
  grid-column: 1;
  grid-row: 1;
  margin-top: 5px;
  margin-left: 0.3rem;
`;

const searchInput = css`
  display: inline-block;
  grid-column: 1;
  grid-row: 1;
  height: 35px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid silver;
  width: 100%;
  font-size: 15px;
  background-color: rgb(242, 241, 240);
  padding-left: 2.3rem;
`;

const searchBar = css`
  width: 30%;
  grid-row: 2;
  grid-column: 2;
  padding-left: 10px;
  display: grid;
`;

const tags = css`
  width: 100%;
  display:flex;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const BackImg = css`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${CodyBackgroundImg});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const listContainer = css`
  display: grid;
  grid-template-rows: 1fr 1fr 63vh 1fr;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap : 15px;
  padding: 30px 30px 0px 30px;
  transition: all 0.35s;
`;

const title = css`
  font-size: 50px;
  margin: 0px;
  color: #f2f2f2;
  text-align : center;
  grid-row : 1;
  grid-column: 2;
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
  font-size: 30px;
  font-weight: lighter;
  width: 100%;
`;

const container = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-row: 3;
  grid-column: 2;
  overflow-y:scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3.5px;
    background-color: #BFAEA4;

    &:hover {
      background-color: #BFAEA4;
    }
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
  }
  margin: 10px;
  padding: 20px;
  background-color : #BFAEA4; 
  opacity: 0.9;
`;

const btnContainer = css`
  display: grid;
  grid-template-columns: repeat(7,1fr);
  grid-row: 4;
  grid-column: 2;
  justify-self : center;
`;

const scrollBtn = css`
  width: 300px;
  height: 50px;
  color: white;
  cursor: pointer;
  border : none;
  font-size: 30px;
  background: transparent;

  grid-column: 4;
  grid-row : 1;
  justify-self: center;
`;
