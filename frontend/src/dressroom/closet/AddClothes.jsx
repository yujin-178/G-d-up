import React from 'react';
import { css, jsx } from '@emotion/react';
import { ClassNames } from '@emotion/core';
import Modal from 'react-modal';

Modal.setAppElement('#app')

export default function AddClothesPage({ onImgChange, preview, imgInput, modalToggle, modalIsOpen }) {
	const Container = css`
    display: grid;
    grid-gap : 10px;
  `

	const imgContainer = css`
    grid-column: 2;
    display: block;
    margin-top: 5rem;
    border: 1px solid black;
    width: 400px;
    height: 300px;        
    position: relative;
  `

	const previewImg = css`
    position: absolute;
    max-width: 95%;
    max-height: 95%;
    width: auto;
    height: auto;
    margin : auto;
    top:0; bottom:0; left:0; right:0;
  `

	const btnContainer = css`
    grid-column: 2;
    width: 400px;
    text-align: center;
  `

	const inputTag = css`
    display : none;
  `

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
	`
  
	const CloseBtn = css`
    background: #c99f9f;
    height: 2rem;
    grid-column: 4;
    grid-row: 1;
  `

  return (
    <div>
      <ClassNames>
        {({ css, cx }) => (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => modalToggle(false)}
            overlayClassName={{
              base: 'overlay-base',
              afterOpen: 'overlay-after',
              beforeClose: 'overlay-before'
            }}
            className={{
              base: "content-base",
              afterOpen: "content-after",
              beforeClose: "content-before"
            }}
            closeTimeoutMS={500}
            portalClassName={
              css`
                .overlay-base {
                  padding: 1rem;
                  position: fixed;
                  width: 100%;
                  height: 100%;
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

                .overlay-after {
                  background-color: rgba(0, 0, 0, 0.8);
                  opacity: 1;
                }

                .overlay-before {
                  background-color: rgba(0, 0, 0, 0);
                  opacity: 0;
                }

                .content-base {
                  position: relative;
                  top: auto;
                  left: auto;
                  right: auto;
                  bottom: auto;
                  margin: 0 auto;
                  border: 0;
                  outline: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 0%;
                  width: 0%;
                  background-color: transparent;
                  transition-property: background-color, width, height;
                  transition-duration: 500ms;
                  transition-timing-function: ease-in-out;
                }

                .content-after {
                  width: 80%;
                  height: 80%;
                  background-color: #f2f2f2;
                }

                .content-before {
                  width: 0%;
                  height: 0%;
                  background-color: transparent;
                }
              `
            }
          >
            <div css={Container}>
              <h5>옷 추가</h5>
              <button
                css={CloseBtn}
                onClick={() => modalToggle(false)}>
                Close
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
            </div>
          </Modal>
        )}
      </ClassNames>
    </div>
  )
}
