import React from 'react';
import { css } from '@emotion/react';
import Modal from 'react-modal';

import LaundryItem from './LaundryItem';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function LaundryModal({ resetlaundry ,images ,saveLaundry, laundryOpen, handleLaundry, iconSelect, selectedIcon, laundryLabel }) {
  return (
    <div>
      <Modal
        isOpen={laundryOpen}
        onRequestClose={() => {handleLaundry(false); resetlaundry();}}
        closeTimeoutMS={500}
      >
        <div css={Container}>
          <div css={detailContainer}>
            {laundryLabel.map((laundry) => (
              <LaundryItem
                key={laundryLabel.indexOf(laundry)}
                kind={laundry['kind']}
                range={laundry['range']}
                iconSelect={iconSelect}
                selectedIcon={selectedIcon}
                images={images}
              />
            ))}
            <div css={submitBtnContainer}>
              <button
                css={saveBtn}
                onClick={() => saveLaundry()}
              >
                저장
              </button>
              <button
                css={cancelBtn}
                onClick={() => {handleLaundry(false); resetlaundry();}}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </Modal >
    </div >
  );
}

const Container = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(7, 1fr);
	max-width: 86%;
`;

const detailContainer = css`
	grid-row: 1;
	grid-column: 1;
	width: max-content;
`;

const submitBtnContainer = css`
	display: flex;
	margin-top: 3rem;
  justify-content: center;
  align-items: center;
	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	transition: 0.5s;
`;

const cancelBtn = css`
  background: rgb(191, 191, 189)
  color: rgb(242, 241, 240);
	margin: 0 1.5rem;
	padding: 0.5rem 1rem;
	width: 6rem;
  height: 2rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
  &:hover {
    color: rgb(242, 241, 240);
    background: rgb(191, 191, 189)
  }
  transition: 0.5s;
`;

const saveBtn = css`
  color: rgb(242, 241, 240);
  background: #4EBBFA;
  margin: 0 1.5rem;
	padding: 0.5rem 1rem;
	width: 6rem;
  height: 2rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
  &:hover {
    color: #4EBBFA;
    background: rgb(242, 241, 240)
  }
  transition: 0.5s;
`;
