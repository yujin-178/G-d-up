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
            width: '22%',
            height: '20%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginTop: '5rem',
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
                <p css={css`font-size: 18px;`}>{resText}</p>
                <button
                  css={saveBtn}
                  onClick={() => { handleResponse(false); window.location.reload(); }}
                >
                  확인
                </button>
                <button css={cancelBtn} onClick={() => handleResponse(false)}>
                  취소
                </button>
              </div>
            }
          </div>
        </div>
      </Modal >
    </div >
  );
}

const cancelBtn = css`
margin-left: 10px;
grid-column: 3;
background: #C99F9F;
padding: 0.6rem 1rem;
width: 6rem;
border: none;
border-radius: 8px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
cursor: pointer;

margin-top: 2rem;

font-family: "Noto Sans KR", sans-serif;
font-size: 1rem;
font-weight: 300;
text-align: center;
transition: 0.5s;

color: rgb(242, 241, 240);
&:hover {
  color: #4EBBFA;
  background: rgb(242, 241, 240)
}
`;

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
  margin-right:10px;
	grid-column: 3;
	background: #6da0cf;
	padding: 0.6rem 1rem;
	width: 6rem;
	border: none;
	border-radius: 8px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;

	margin-top: 2rem;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	transition: 0.5s;

  background: #4EBBFA;
  color: rgb(242, 241, 240);
  &:hover {
    color: #4EBBFA;
    background: rgb(242, 241, 240)
  }
`;
