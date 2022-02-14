import React from 'react';
import { css } from '@emotion/react';
import Modal from 'react-modal';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function ResModal({ resloading, resText, handleResponse, isResOpen }) {
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
            height: '25%',
          }
        }}
      >
        <div css={Container}>
          <div>
            {resloading ?
              <div css={loading}>
                <ClimbingBoxLoader
                  color='black'
                  loading={resloading}
                  size={15}
                  css={loading}
                />
                <p css={loadingText}>
                  옷장에 옷 넣는 중 ...
                </p>
              </div>
              :
              <div>
                <p>{resText}</p>
                <button
                  css={saveBtn}
                  onClick={() => handleResponse(false)}
                >
                  확인
                </button>
              </div>
            }
          </div>
        </div>
      </Modal >
    </div >
  );
}

const loading = css`
  display: grid;
  grid-template-rows: 5rem 2rem;
  margin-bottom: 10px;
`;

const loadingText = css`
  font-family: 'KOTRAHOPE'; 
  font-size:20px; 
`;

const Container = css`
  display: grid;
	max-width: 100%;
	text-align: center;
	justify-content: center;
	align-items: center;
`;

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
`;
