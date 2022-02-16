import React from 'react';
import CodyCard from './CodyCard';
import TagSearchBar from './TagSearchBar';
import Tag from './Tag';

import { css, Global } from "@emotion/react";
import CodyBackgroundImg from '../../../public/images/codybackground.jpg';

export default function CodyList({ userName, isLoggedInUser, tagDelete, tagFilter, tagRef, onKeyPress, setisdetailOpen, handleSelectCody, moveScroll, cards }) {
  return (
    <div css={BackImg}>
      <Global style={listStyle} />
      <div css={listContainer}>
        <h2 css={title}>{userName}님의 코디</h2>
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
                  css={css`margin:15px;`}
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
            슬라이드로 보기
          </button>
        </div>
      </div>
    </div>
  );
}

const searchBar = css`
  width: 30%;
  grid-row: 2;
  padding-left: 10px;
`;

const tags = css`
  width: 100%;
  display:flex;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const BackImg = css`
  width: 100vw;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${CodyBackgroundImg});
  background-size: cover;
  background-position: center;
`;

const listContainer = css`
  display: grid;
  grid-template-rows: 1fr 1fr 63vh 1fr;
  grid-gap : 15px;
  padding: 30px 30px 0px 30px;
`;

const title = css`
  font-size: 50px;
  margin: 0px;
  color: #f2f2f2;
  text-align : center;
  grid-row : 1;
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
  padding: 10px;
  width: 90vw;
  background : #f2f2f2;
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
