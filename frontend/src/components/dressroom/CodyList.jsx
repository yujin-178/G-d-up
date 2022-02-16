import React from 'react';
import CodyCard from './CodyCard';
import TagSearchBar from './TagSearchBar';
import Tag from './Tag';

import { css, Global } from "@emotion/react";
import CodyBackgroundImg from '../../../public/images/codybackground.jpg';

export default function CodyList({ isLoggedInUser, tagDelete, tagFilter, tagRef, onKeyPress, setisdetailOpen, handleSelectCody, moveScroll, cards }) {
  return (
    <div css={listContainer}>
      <Global style={listStyle} />
      <h2 css={title}>Cody</h2>
      <div css={searchBar}>
        <TagSearchBar
          inputRef={tagRef}
          onKeyPress={onKeyPress}
        />
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
        <div css={container}>
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                onClick={() => { handleSelectCody(index); setisdetailOpen(true); }}
              >
                <CodyCard
                  imgurl={card.imageModel.imageUrl}
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
          슬라이드로 보기
        </button>
      </div>
    </div>
  );
}

const searchBar = css`
  width: 30%;
  grid-row: 2;
`;

const tags = css`
  width: 100%;
  display:flex;
  flex-wrap: wrap;
`;

const listContainer = css`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(5,1fr);

  grid-gap : 15px;

  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${CodyBackgroundImg});
  background-size: cover;
  background-position: center;

  padding: 10px;
`;

const title = css`
  grid-row: 1;
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
  font-size: 20px;
  font-weight: lighter;
  width: 100%;
`;

const container = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  grid-row: 3;
  overflow:scroll;
  height: 70vh;
  margin: 10px;
  padding: 10px;
  width: 95vw;
`;

const btnContainer = css`
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-row: 4;
  justify-self : center;
`;

const scrollBtn = css`
  display:flex;
  width: 150px;
  height: 30px;
  grid-column:3;
  justify-content: center;
  align-items: center;
  margin: 20px;

  background: #c99f9f;
  border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const listStyle = css`

`;
