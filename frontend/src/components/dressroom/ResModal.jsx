import React from 'react';
import { css } from '@emotion/react';
import Modal from 'react-modal';

if (process.env.NODE_ENV !== 'test') {
	Modal.setAppElement('#app')
}

export default function ResModal({ resText, handleResponse, isResOpen }) {
	return (
		<div>
			<Modal
				isOpen={isResOpen}
				onRequestClose={() => handleResponse(false)}
				closeTimeoutMS={500}
				style={{
					content: {
						position: 'relative',
						width: '25%',
						height: '20%',
					}
				}}
			>
				<div css={Container}>
					<div>
						<p>{resText}</p>
						<button
							css={saveBtn}
							onClick={() => handleResponse(false)}
						>
							확인
						</button>
					</div>
				</div>
			</Modal >
		</div >
	)
}

const Container = css`
  display: grid;
	max-width: 100%;
	text-align: center;
	justify-content: center;
	align-items: center;
`

const saveBtn = css`
	grid-column: 3;
	background: #6da0cf;
	padding: 0.5rem 1rem;
	width: 4rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;

	margin: 1.5rem;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	transition: 0.5s;
`