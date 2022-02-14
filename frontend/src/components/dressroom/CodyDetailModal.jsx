import React from 'react';
import { css } from '@emotion/react';
import Modal from 'react-modal';
import { Tags } from '@emotion-icons/fa-solid/Tags';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function CodyDetailModal({ selectedCody, isdetailOpen, handleCodyDetailOpen }) {
  return (
    <div>
      <Modal
        isOpen={isdetailOpen}
        onRequestClose={() => handleCodyDetailOpen(false)}
        closeTimeoutMS={500}
      >
        <div css={Container}>
          <button
            css={CloseBtn}
            onClick={() => handleCodyDetailOpen(false)}>
            X
          </button>
          <div css={detailContainer}>
            <input
              type="text"
              label='태그'
              placeholder='    태그는 총 10개까지 입력 가능합니다.'
              css={inputTag}
              id='taginput'
            />
            <label htmlFor="taginput" css={inputLabel}>
              <Tags size={20}/>
            </label>
            
            <div css={toggleContainer}>
              <div
                data-testid="toggle"
                css={selectedCody.secret === 0 ? toggleBtn : toggleXBtn}
              >
                <div css={selectedCody.secret === 0 ? toggleBtnCircle : toggleXBtnCircle}></div>
              </div>
              <p css={toggleTitle}>공개 여부</p>
            </div>

            <div css={submitBtnContainer}>

            </div>
          </div>
        </div>
      </Modal >
    </div >
  );
}

const inputTag = css`
  position: relative;
  width: 20rem;
  height: 35px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid silver;
  font-size: 19px;
`;

const inputLabel = css`
  position:absolute;
  top: 25px;
  left: 20px;
  

`;

const Container = css`
  display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(7, 1fr);
	max-width: 100%;
`;

const detailContainer = css`
	grid-row: 1;
	grid-column: 1;
	width: max-content;
`;

const toggleContainer = css`
  display: flex;
  padding-top: 30px;
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
`;

const cancelBtn = css`
	grid-column: 4;
	margin-left: 10px;
	background: #c99f9f;
	padding: 0.5rem 1rem;
	width: 4rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
`;

const saveBtn = css`
	grid-column: 3;
	margin-left: 40px;
	background: #6da0cf;
	padding: 0.5rem 1rem;
	width: 4rem;
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
	margin-top : 1rem;
	margin-left: 1rem;

	cursor: pointer;
`;
