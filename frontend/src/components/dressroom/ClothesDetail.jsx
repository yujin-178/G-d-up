import React from 'react';
import { css } from '@emotion/react';

export default function ClothesDetail({ selectedClothes, deleteHandler, allSeason }) {
  const {
    id,
    image,
    category,
    color,
    material,
    pattern,
    season,
    custom,
    laundry,
  } = selectedClothes;

  return (
    <div css={detailContainer}>
      <div css={buttonGroup}>
        <button>수정</button>
        <button onClick={() => deleteHandler(id)}>삭제</button>
      </div>
      <img css={clothesImage} src={image} alt="image" />
      <div>
        <p css={clothesInfo}>옷 정보</p>
        <div>
          <div css={clothesInfoGroup}>
            <p>카테고리 <span css={description}>{category}</span></p>
            <p css={marginLeftStyle}>색상 <span css={description}>{color}</span></p>
          </div>
        </div>
        <div css={clothesInfoGroup}>
          <p>소재 <span css={description}>{material}</span></p>
          <p css={marginLeftStyle}>패턴 <span css={description}>{pattern}</span></p>
        </div>
        <div css={clothesInfoGroup}>
          <p>계절</p>
          <ul css={ulStyle}>
            {allSeason.map((item, index) => {
              const isMatched = item === season;
              return (
                <li css={liStyle({ isMatched })} key={index}>
                  <p css={itemTitle}>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div css={clothesInfoGroup}>
          <p>태그</p>
          <ul css={ulStyle}>{custom.map((item, index) => (
            <li css={tagItem} key={index}>
              {item}
            </li>
          ))}</ul>
        </div>
        <div css={clothesInfoGroup}>
          <p>세탁법 <span css={description}>{laundry}</span></p>
        </div>
      </div>
    </div>
  );
}

const liStyle = ({ isMatched }) => css`
  background-color: #e2e2e2;
  width: 3.8rem;
  height: 2rem;
  text-align: center;
    ${isMatched &&
    `
      background-color: #00acee;
    `}
`;

const detailContainer = css`
  grid-column: 3 / 4;
  grid-row: 1 / 4;
  background-color: grey;
  width: 30%;
  font-size: 18px;
  position: relative;
`;

const clothesImage = css`
  width: 40%;
  display: block;
  padding: 40px 10px;
  margin: auto;
`;

const clothesInfo = css`
  font-size: 22px;
  margin: 0 2rem;
  border-bottom: 1px solid silver;
`;

const marginLeftStyle = css`
  margin-left: 2rem;
`;

const description = css`
  margin-left: 15px;
`;

const clothesInfoGroup = css`
  display: flex;
  text-decoration: none;
  margin: 0 2rem;
  border-bottom: 1px solid silver;
  justify-content: space-between;
`;

const ulStyle = css`
  list-style:none;
  display: flex;
  padding: 0;
  width: 80%;
  justify-content: center;
`;

const tagItem = css`
  position: relative;
  display: flex;
  background-color: white;
  height: 25px;
  padding: 4px;
  border-radius: 18px;
  font-size: 15px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 5px;
  min-width: 50px;
`;

const itemTitle = css`
  margin: auto;
  padding: 10%;
`;

const buttonGroup = css`
  position: absolute;
  top: 5px;
  right: 5px;
`;
