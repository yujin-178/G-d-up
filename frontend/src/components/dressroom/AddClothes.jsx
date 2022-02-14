import React, { Fragment } from 'react';
import { css, Global } from '@emotion/react';
import Modal from 'react-modal';
import LaundryModalContainer from '../../containers/dressroom/LaundryModalContainer';
import ResModal from './ResModal';
import ScaleLoader from 'react-spinners/ScaleLoader';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function AddClothes({ resloading ,resetClothes, loading, images, resText, isResOpen, handleResponse, saveClothes, selectSeason, tagGroup, allSeason, tagInfo, selectedLaundry, onImgChange, preview, imgInput, modalToggle, isModalOpen, handleLaundry }) {
  return (
    <div>
      <Global
        styles={modalClass}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {modalToggle(false); resetClothes();}}
        closeTimeoutMS={500}
        onAfterOpen={() => { document.body.style.overflow = 'hidden'; }}
        onAfterClose={() => document.body.removeAttribute('style')}
      >
        <div css={Container}>
          <button
            css={CloseBtn}
            onClick={() => { modalToggle(false); resetClothes(); }} >
            X
          </button>
          <div css={imgContainer}>
            {loading ?
              <div css={css`transition: 0.5s;`}>
                <p css={css`font-family: 'KOTRAHOPE'; font-size:20px;`}>
                  배경 제거하는 중 ...
                </p>
                <ScaleLoader
                  color='black'
                  loading={loading}
                  height={130}
                  width={20}
                  radius={15}
                  margin={7}
                />
              </div>
              :
              <img
                src={preview}
                css={previewImg}
              />
            }
          </div>

          <div css={btnContainer}>
            <input
              css={inputTag}
              ref={refParam => imgInput = refParam}
              type="file"
              accept='image/*'
              name="file"
              onChange={onImgChange}
            />
            <button
              css={inputBtn}
              onClick={() => imgInput.click()}
            >
              업로드
            </button>
          </div>
          <div css={detailContainer}>
            <h3>옷 정보</h3>
            <div css={detail}>
              <p>카테고리 :</p>
              <div css={valueStyle}>
                <Fragment>
                  {tagInfo['subcategory'] ?
                    tagInfo['category'] + ">" + tagInfo['subcategory']
                    : tagInfo['category']
                  }
                </Fragment>
              </div>
              <p css={css`grid-column:1;`}>
                색상 :
              </p>
              <div css={valueStyle}>
                {tagInfo['color']}
              </div>
              <p css={css`grid-column:3; margin-left:10px;`}>
                소재 :
              </p>
              <div css={valueStyle2}>
                {tagInfo['material']}
              </div>
              <p>
                패턴 :
              </p>
              <div css={valueStyle}>
                {tagInfo['pattern']}
              </div>
            </div>

            <div css={season}>
              <p>계절 : </p>
              {allSeason.map((item, index) => {
                const seasonMatched = item === tagInfo['season'];
                return (
                  <p css={liStyle({ seasonMatched })}
                    key={index}
                    onClick={() => selectSeason(item)}
                  >
                    {item}
                  </p>
                );
              })}
            </div>

            <div css={laundryContainer}>
              <p css={css`width:40px;`}>세탁:</p>
              {selectedLaundry.map((i) => {
                const image = images[i];
                return (
                  <img src={image} alt={i} key={i} />
                );
              })}
              <div css={AddBtnContainer}>
                <button css={AddBtn}
                  onClick={() => handleLaundry(true)}>
                  +
                </button>
              </div>
              <LaundryModalContainer
                images={images}
              />
            </div>

            <div css={tag}>
              <p>태그 : </p>
              {tagGroup.map((item, index) => (
                <div css={tagItem} key={index}>
                  {item}
                </div>
              ))}
            </div>

            <div css={submitBtnContainer}>
              <button
                css={saveBtn}
                onClick={() => saveClothes()}
              >
                저장
              </button>
              <button
                css={cancelBtn}
                onClick={() => {modalToggle(false); resetClothes();}}
              >
                취소
              </button>
            </div>
            <ResModal
              isResOpen={isResOpen}
              handleResponse={handleResponse}
              resText={resText}
              resloading={resloading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

const valueStyle = css`
	border: 1px solid;
	height: 35px;
	display: inline-block;
	grid-column:2;
	width: max-content;
	min-width: 80%;
	padding : 5px;
	text-align: center;
	display: flex;
	justify-content: center;
  align-items: center;
`;

const valueStyle2 = css`
	border: 1px solid;
	height: 35px;
	display: inline-block;
	grid-column:4;
	width: max-content;
	min-width: 80%;
	display: flex;
	justify-content: center;
  align-items: center;
`;

const tagItem = css`
  display: flex;
	justify-content: center;
  align-items: center;

  background-color: #faefe8;
  height: 25px;
	width : max-content;
  padding: 4px;
  border-radius: 18px;

  font-size: 13px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 5px;
  min-width: 50px;
`;

const tag = css`
	display: grid;
	grid-template-columns: 100px 1fr 1fr 1fr 1fr;
`;

const season = css`
	display: grid;
	grid-template-columns: repeat(5,1fr);
`;

const liStyle = ({ seasonMatched }) => css`
  background-color: #e2e2e2;
  width: 3.8rem;
  height: 2rem;
	display: flex;
	justify-content: center;
  align-items: center;
	cursor: pointer;
    ${seasonMatched &&
  `
      background-color: #00acee;
    `}
`;

const AddBtnContainer = css`
	display: flex;
	align-items : center;
	margin-left: 20px;
`;

const AddBtn = css`
	width: 30px;
	height: 25px;
	background: #ecc194;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const laundryContainer = css`
	display: grid;
	grid-template-columns: repeat(5, 0.5fr);
	margin-top: 10px;
	margin-bottom: 10px;
`;

const submitBtnContainer = css`
	display:grid;F
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

	margin: 1.5rem;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	transition: 0.5s;
`;

const cancelBtn = css`
	grid-column: 4;

	background: #c99f9f;
	padding: 0.5rem 1rem;
	width: 4rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const saveBtn = css`
	grid-column: 2;

	background: #6da0cf;
	padding: 0.5rem 1rem;
	width: 4rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const detailContainer = css`
	grid-row: 3;
	grid-column: 2;
	grid-gap: 10px;
`;

const detail = css`
	display: grid;
	grid-template-columns: 80px 1fr 70px 1fr;
	align-items: center;
`;

const Container = css`
  display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: repeat(7, 1fr);
`;

const imgContainer = css`
	display: flex;
  grid-column: 2;
	margin-top: 5rem;
	border: 1px solid black;
	width: 400px;
	height: 300px;  
  justify-content: center;
  align-items: center;      
  transition: 0.5s;
`;

const previewImg = css`
	position: relative;
	justify-content: center;
	align-items:center;
	max-width: 95%;
	max-height: 95%;
	width: auto;
	height: auto;
	margin : auto;
	top:0; bottom:0; left:0; right:0;
`;

const btnContainer = css`
	grid-column: 2;
	margin-top: 1rem;
	width: 400px;
	text-align: center;
`;

const inputTag = css`
	display : none;
`;

const inputBtn = css`
	background: #6da0cf;

	margin: 0;
	padding: 0.5rem 1rem;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	text-decoration: none;

	display: inline;
	width: 8rem;

	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

	cursor: pointer;

	transition: 0.5s;

	border: none;
	border-radius: 4px;

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
`;

const CloseBtn = css`
	background: #c99f9f;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),  0 2px 4px -1px rgba(0, 0, 0, 0.06);
	height: 1.5rem;
	grid-column: 4;
	grid-row: 1;
	margin-top : 1rem;
	margin-right: 1rem;

	cursor: pointer;
`;

const modalClass = css`
.ReactModal__Overlay {
	padding: 1rem;
	position: fixed;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0);
	opacity: 0;
	transition-property: background-color, opacity;
	transition-duration: 500ms;
	transition-timing-function: ease-in-out;
	outline: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.ReactModal__Overlay--after-open {
	background-color: rgba(0, 0, 0, 0.8);
	opacity: 1;
}

.ReactModal__Overlay--before-close {
	background-color: rgba(0, 0, 0, 0);
	opacity: 0;
}

.ReactModal__Content {
	position: relative;
	top: auto;
	left: auto;
	right: auto;
	bottom: auto;
	margin: 0 auto;
	border: 0;
	border-radius: 8px;
	outline: 0;
	display: flex;
	max-height:calc(100vh - 210px);
	overflow-y: auto;
	height: 0%;
	width: 0%;
	background-color: transparent;
	transition-property: background-color, width, height;
	transition-duration: 500ms;
	transition-timing-function: ease-in-out;
}

.ReactModal__Content--after-open {
	width: 50%;
	height: 80%;
	grid-column:4;
	background-color: #f2f2f2;
	justify-content: center;
}

.ReactModal__Content--before-close {
	width: 0%;
	height: 0%;
	background-color: transparent;
}
`;
