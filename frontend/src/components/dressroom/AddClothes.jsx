import React from 'react';
import { css, Global } from '@emotion/react';
import Modal from 'react-modal';
import { range } from 'lodash';
import LaundryModalContainer from '../../containers/dressroom/LaundryModalContainer';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function AddClothes({ selectedLaundry, onImgChange, preview, imgInput, modalToggle, isModalOpen, handleLaundry }) {
  return (
    <div>
      <Global
        styles={modalClass}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => modalToggle(false)}
        closeTimeoutMS={500}
        onAfterOpen={() => { document.body.style.overflow = 'hidden'; }}
        onAfterClose={() => document.body.removeAttribute('style')}
      >
        <div css={Container}>
          <button
            css={CloseBtn}
            onClick={() => modalToggle(false)}>
            X
          </button>
          <div css={imgContainer}>
            <img
              src={preview}
              css={previewImg}
            />
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
              <p>색상 :</p>
              <p>소재 :</p>
              <p>패턴 : </p>
            </div>
            <div>
              <div>
                <p>계절</p>
              </div>
              <div css={laundryContainer}>
                <p css={css`width:40px;`}>세탁:</p>
                {range(selectedLaundry.length).map((i) => (
                  <img src={`laundry/${selectedLaundry[i]}.png`} alt={i} key={i} />
                ))}
                <div css={AddBtnContainer}>
                  <button css={AddBtn}
                    onClick={() => handleLaundry(true)}>
                    추가 +
                  </button>
                </div>

                <LaundryModalContainer
                />
              </div>
              <p>태그</p>
            </div>
            <div css={submitBtnContainer}>
              <button
                css={saveBtn}
                onClick={() => modalToggle(false)}
              >
                저장
              </button>
              <button
                css={cancelBtn}
                onClick={() => modalToggle(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const AddBtnContainer = css`
	display: flex;
	justify-content: center;
	align-items : center;
`;

const AddBtn = css`
	height: 60px; 
	width:50px; 
	cursor:pointer;
`;

const laundryContainer = css`
	display: grid;
	grid-template-columns: repeat(5, 0.5fr);
	grid-gap : 10px;
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

const detail = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;

const detailContainer = css`
	grid-row: 3;
	grid-column: 2;
`;

const Container = css`
  display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: repeat(7, 1fr);
`;

const imgContainer = css`
	grid-column: 2;
	display: flex;
	margin-top: 5rem;
	border: 1px solid black;
	width: 400px;
	height: 300px;        
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
	width: 80%;
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
