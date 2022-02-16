import React from 'react';
import { css } from '@emotion/react';

export default function ClothesDetail({ selectedClothes, deleteHandler, isLoggedInUser, userName }) {

  return (
    <div css={detailContainer}>
      {selectedClothes ?
        <>
          <div css={buttonGroup}>
            <button css={delBtn({ isLoggedInUser })} onClick={() => deleteHandler(selectedClothes.clothing.clothingId)}>삭제</button>
          </div>
          <div css={imageWrapper}>
            <img css={clothesImage} src={selectedClothes.clothing.imageModel.imageUrl} alt="image" />
          </div>
          <div css={infoWrapper}>
            <p css={clothesInfo}><strong>옷 정보</strong></p>
            <div>
              <div css={clothesInfoGroup}>
                <p><strong>카테고리</strong> <span css={description}>{selectedClothes.clothing.category}</span></p>
                <p css={marginLeftStyle}><strong>색상</strong> <span css={description}>{selectedClothes.clothing.color}</span></p>
              </div>
            </div>
            <div css={clothesInfoGroup}>
              <p><strong>소재</strong> <span css={description}>{selectedClothes.clothing.material}</span></p>
              <p css={marginLeftStyle}><strong>패턴</strong> <span css={description}>{selectedClothes.clothing.pattern || '없음'}</span></p>
            </div>
            <div css={clothesInfoGroup}>
              <p><strong>태그</strong>
                <div css={tag}>
                  {selectedClothes.hashtag.map((item, index) => (
                    <div css={tagItem} key={index}>
                      {item}
                    </div>
                  ))}
                  {/* <div css={tag}>
                  <ul css={tagItem}>{selectedClothes.hashtag.map((item, index) => (
                    // <li css={tagItem} key={index}>
                    <li key={index}>
                      {item}
                    </li>
                  ))}</ul>
                </div> */}
                </div>
              </p>
            </div>
            <div css={clothesInfoGroup}>
              <p><strong>세탁법</strong>
                <span css={description}>
                  {/* <ul> */}
                  {selectedClothes.washing.map((item, index) => <p key={index}>{item.washingMethod.method}</p>)}
                  {/* </ul> */}
                </span>
              </p>
            </div>
          </div>
        </> :
        <>
          {isLoggedInUser ? (
            <div css={message}>
              <p>현재 보유한 옷이 없습니다. </p>
              <p>+ 아이콘을 눌러 새로운 옷을 추가해보세요.</p>
            </div>) : (
            <div css={message}>
              <p>{userName}님이 보유한 옷이 없습니다.</p>
            </div>
          )}
        </>
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
  opacity: 0.95;
  width: 38%;
  height: 100%;
  margin: 2.5rem 1rem;
  font-size: 18px;
  position: relative;
  border-radius: 0.5rem;
  color:white;
  text-align: center;
  overflow-y: auto;
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
`;

const imageWrapper = css`
  height: 30%;
  width: 80%;
  display: inline-block;
  margin-top: 5%;
`;

const clothesImage = css`
  display: block;
  padding: 5%;
  height: 80%;
  margin: auto;
  background-color: white;
  border-radius: 0.4rem;
`;

const clothesInfo = css`
  font-size: 22px;
  margin: 0 2rem;
  margin-bottom: 2%;
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

const tagTextStyle = css`
  display: flex;
  text-decoration: none;
  margin: 0 2rem;
  justify-content: space-between;
`;

const tagItem = css`
  display: flex;
	justify-content: center;
  align-items: center;

  background-color: #BFAEA4;;
  height: 25px;
	width : max-content;
  margin: 2px;
  border-radius: 18px;
  
  font-size: 13px;
  color: black;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  min-width: 50px;
`;

const tag = css`
  margin-top: 1%;
  width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const buttonGroup = css`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const WrapVertical = css`
  color: #112031;
  width: 100%;
  white-space: pre-line;
`;

const infoWrapper = css`
  margin-top: 5%;
  text-align: left;
`;

const delBtn = ({ isLoggedInUser }) => css`
  width: 3rem;
  height: 1.5rem;
  background: #ecc194;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  ${!isLoggedInUser &&
  `
    display: none;
  `}
`;
