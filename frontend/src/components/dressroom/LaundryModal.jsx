import React from 'react';
import { css } from '@emotion/react';
import Modal from 'react-modal';
import { range } from 'lodash';

import LaundryItem from './LaundryItem';

if (process.env.NODE_ENV !== 'test') {
	Modal.setAppElement('#app')
}

export default function LaundryModal({ saveLaundry, laundryOpen, handleLaundry, iconSelect, selectedIcon, laundryLabel }) {
	return (
		<div>
			<Modal
				isOpen={laundryOpen}
				onRequestClose={() => handleLaundry(false)}
				closeTimeoutMS={500}
			>
				<div css={Container}>
					<button
						css={CloseBtn}
						onClick={() => handleLaundry(false)}>
						X
					</button>
					<div css={detailContainer}>
						{range(0, 5).map((i) => (
							<LaundryItem
								key={i}
								Label={laundryLabel[i][0]}
								Nums={laundryLabel[i][1]}
								iconSelect={iconSelect}
								selectedIcon={selectedIcon}
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
								onClick={() => handleLaundry(false)}
							>
								취소
							</button>
						</div>
					</div>
				</div>
			</Modal >
		</div >
	)
}

const Container = css`
  display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(7, 1fr);
`

const detailContainer = css`
	grid-row: 1;
	grid-column: 1;
`

const submitBtnContainer = css`
	display:grid;
	grid-template-columns: repeat(6,1fr);

	margin: 1.5rem;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	transition: 0.5s;
`

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
`

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
`

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
`