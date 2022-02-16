import React from 'react';
import { css, Global } from '@emotion/react';
import Modal from 'react-modal';
import { Tags } from '@emotion-icons/fa-solid/Tags';
import ResModal from './ResModal';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function CodyDetailModal({ isLoggedInUser, handleResponse, isResOpen, resText, deleteCody, handleCodyEdit, iscodyEdit, selectedCody, isdetailOpen, handleCodyDetailOpen }) {
  return (
    <div>
      <Global
        styles={modalClass}
      />
      <Modal
        isOpen={isdetailOpen}
        onRequestClose={() => handleCodyDetailOpen(false)}
        closeTimeoutMS={500}
        onAfterOpen={() => { document.body.style.overflow = 'hidden'; }}
        onAfterClose={() =>{ document.body.style.overflow = 'auto'; }}
        style={{
          content: {
            backgroundColor: '#7c8186',
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          }
        }}
      >
        <div css={Container}>
          <button
            css={CloseBtn}
            onClick={() => handleCodyDetailOpen(false)}>
            X
          </button>
          <div css={imgContainer}>
            <img
              src={selectedCody.imageModel.imageUrl}
              alt={selectedCody.codyName}
              css={codyImg}
            />
          </div>

          {iscodyEdit ?
            <div css={inputContainer}>
              <input
                type="text"
                label='태그'
                placeholder='태그는 총 10개까지 입력 가능합니다.'
                css={inputTag}
                id='taginput'
              />
              <label htmlFor="taginput" css={inputLabel}>
                <Tags size={20} />
              </label>
            </div>
            :
            <div css={tag}>
              {selectedCody.hashList.map((item, index) => (
                <div css={tagItem} key={index}>
                  {item}
                </div>
              ))}
            </div>

          }
          <div css={toggleContainer}>
            {iscodyEdit ?
              <div>
                <div
                  data-testid="toggle"
                  css={selectedCody.secret === 0 ? toggleBtn : toggleXBtn}
                >
                  <div css={selectedCody.secret === 0 ? toggleBtnCircle : toggleXBtnCircle}></div>
                </div>
                <p css={toggleTitle}>공개 여부</p>
              </div>
              :
              <div>
                {selectedCody.secret === 0 ?
                  <div>
                    공개
                  </div>
                  :
                  <div>
                    비공개
                  </div>
                }
              </div>
            }
          </div>

          <div css={contentContainer}>
            {selectedCody.content}
          </div>
          {isLoggedInUser ?
            <div css={submitBtnContainer}>
              <button
                css={editBtn}
                onClick={() => handleCodyEdit(true)}
              >
                수정
              </button>
              <button
                css={delBtn}
                onClick={() => deleteCody(selectedCody.codyId)}
              >
                삭제
              </button>
            </div>
            :
            ''
          }
          <ResModal
            isResOpen={isResOpen}
            resText={resText}
            handleResponse={handleResponse}
          />
        </div>
      </Modal >
    </div >
  );
}

const Container = css`
  display: grid;
	grid-template-columns: 350px 1fr;
	grid-template-rows: repeat(4,1fr);
	max-width: 100%;
  grid-row: 3;
  grid-column: 1;
  margin: 20px;
`;

const imgContainer = css`
  grid-row : 1;
  grid-column: 1;
  height: 380px;
  width: 360px; 
  background-color: #f2f2f2;
  height: fit-content;
`;

const codyImg = css`
  position: relative;
  justify-content: center;
  align-items:center;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const inputContainer = css`
  grid-row: 2;
  grid-column : 1;
  width: max-content;
  display: grid;
  margin: 5px;
`;

const inputTag = css`
  display: inline-block;
  width: 18rem;
  height: 35px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid silver;
  font-size: 15px;
  padding-left: 25px;
  grid-column: 1;
  grid-row: 1;
`;

const inputLabel = css`
  grid-column: 1;
  grid-row: 1;
  margin-top: 5px;
`;

const tag = css`
  grid-row: 2;
  grid-column : 1;
  display: flex;
  flex-wrap: wrap;
  margin : 5px;
  width: fit-content;
`;

const tagItem = css`
  display: flex;
	justify-content: center;
  align-items: center;
  margin: 3px;

  background-color: #faefe8;
  height: 25px;
	width : max-content;
  padding: 4px;
  border-radius: 18px;

  font-size: 13px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  min-width: 50px;
`;

const contentContainer = css`
  display: grid;
  grid-row: 3;
  grid-column: 1;
  color: #f2f2f2;
  border: 1px solid black;
  padding: 5px;
  font-size: 23px;
  height: 100px;
`;

const toggleContainer = css`
  display: flex;
  grid-row:2;
  grid-column: 2;
  color:#f2f2f2;
  margin:10px;
`;

const toggleTitle = css`
  margin-left: 10px;
  margin: 0;
  padding-left: 10px;
`;

const toggleXBtn = css`
  width: 40px;
  height: 20px;
  background: grey;
  border-radius: 30px;
  transition: all 300ms ease-in-out;
`;

const toggleBtn = css`
  background: #00acee;
  width: 40px;
  height: 20px;
  border-radius: 30px;
  transition: all 300ms ease-in-out;
`;

const toggleXBtnCircle = css`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: all 300ms ease-in-out;
`;

const toggleBtnCircle = css`
  margin-left: 60%;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: all 300ms ease-in-out;
`;

const submitBtnContainer = css`
	display:grid;
	grid-template-columns: repeat(6,1fr);

	margin: 1.5rem;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	transition: 0.5s;
  grid-row: 4;
`;

const delBtn = css`
	grid-column: 4;
	margin-left: 10px;
	background: #c99f9f;
	padding: 0.5rem 1rem;
	width: 4rem;
  height: 2rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const editBtn = css`
	grid-column: 3;
	background: #6da0cf;
	padding: 0.5rem 1rem;
	width: 4rem;
  height: 2rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const CloseBtn = css`
	background: #c99f9f;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),  0 2px 4px -1px rgba(0, 0, 0, 0.06);
	height: 1.5rem;
	width : 1.5rem;
	grid-column: 5;
	grid-row: 1;

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
	width: 40%;
	height: 70%;
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
