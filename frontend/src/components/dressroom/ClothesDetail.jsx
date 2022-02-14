import React from 'react';
import { css } from '@emotion/react';

export default function ClothesDetail({ selectedClothes, deleteHandler }) {

  return (
    <div css={detailContainer}>
      {selectedClothes ?
        <>
          <div css={buttonGroup}>
            <button>수정</button>
            <button onClick={() => deleteHandler(selectedClothes.clothing.clothingId)}>삭제</button>
          </div>
          <div css={imageWrapper}>
            <img css={clothesImage} src={selectedClothes.clothing.imageModel.imageUrl} alt="image" />
          </div>
          <div>
            <p css={clothesInfo}>옷 정보</p>
            <div>
              <div css={clothesInfoGroup}>
                <p>카테고리 <span css={description}>{selectedClothes.clothing.category}</span></p>
                <p css={marginLeftStyle}>색상 <span css={description}>{selectedClothes.clothing.color}</span></p>
              </div>
            </div>
            <div css={clothesInfoGroup}>
              <p>소재 <span css={description}>{selectedClothes.clothing.material}</span></p>
              <p css={marginLeftStyle}>패턴 <span css={description}>{selectedClothes.clothing.pattern || '없음'}</span></p>
            </div>
            <div css={clothesInfoGroup}>
              <p>태그</p>
              <ul css={ulStyle}>{selectedClothes.hashtag.map((item, index) => (
                <li css={tagItem} key={index}>
                  {item}
                </li>
              ))}</ul>
            </div>
            <div css={clothesInfoGroup}>
              <p>세탁법</p>
              <ul>
                {selectedClothes.washing.map((item, index) => <p key={index}>{item.washingMethod.method}</p>)}
              </ul>
            </div>
          </div>
        </> :
        <div css={message}>
          <p>현재 보유한 옷이 없습니다. </p>
          <p>+ 아이콘을 눌러 새로운 옷을 추가해보세요.</p>
        </div>
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
  font-size: 20px;
  font-weight: lighter;
  width: 100%;
`;

const detailContainer = css`
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  background-color: #3A3D41;
  opacity: 0.8;
  width: 50%;
  margin: 2.5rem 1rem;
  font-size: 18px;
  position: relative;
  border-radius: 0.5rem;
`;

const imageWrapper = css`
  height: 20rem;
`;

const clothesImage = css`
  display: block;
  width: 200px;
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

const buttonGroup = css`
  position: absolute;
  top: 5px;
  right: 5px;
`;
