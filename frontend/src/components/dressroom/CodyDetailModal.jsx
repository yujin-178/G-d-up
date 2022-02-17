import React from 'react';
import { css, Global } from '@emotion/react';
import Modal from 'react-modal';
import { Tags } from '@emotion-icons/fa-solid/Tags';
import ResModal from './ResModal';
import Tag from './Tag';
import { LockOpen, Lock } from '@emotion-icons/fa-solid';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function CodyDetailModal({ updateCody, editCancel, toggle, handleToggle, deleteTagHandler, tagList, inputRef, onKeyPress, contentRef, isLoggedInUser, handleResponse, isResOpen, resText, deleteCody, handleCodyEdit, iscodyEdit, selectedCody, isdetailOpen, handleCodyDetailOpen }) {
  return (
    <div>
      <Global
        styles={modalClass}
      />
      <Modal
        isOpen={isdetailOpen}
        onRequestClose={() => { handleCodyDetailOpen(false); handleCodyEdit(false); editCancel(); }}
        closeTimeoutMS={500}
        onAfterOpen={() => { document.body.style.overflow = 'hidden'; }}
        onAfterClose={() => { document.body.style.overflow = 'auto'; }}
        style={{
          content: {
            backgroundColor: '#2E2E2E',
            width: '35rem',
            height: '80rem',
            padding: '2rem 1rem 2rem'
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          }
        }}
      >
        <div css={Container}>
          <button
            className='hvr-fade'
            css={CloseBtn}
            onClick={() => { handleCodyDetailOpen(false); handleCodyEdit(false); editCancel(); }}>
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
            <div css={css`grid-row: 3; grid-column : 1;`}>

              <div css={inputContainer}>
                <input
                  id="taginput"
                  ref={inputRef}
                  css={inputTag}
                  type="text"
                  placeholder="태그 입력"
                  onKeyPress={onKeyPress}
                />
                <label htmlFor="taginput" css={inputLabel}>
                  <Tags size={20} />
                </label>
              </div>

              <div css={tag}>
                {tagList.length ?
                  tagList.map((tag, index) => {
                    return (
                      <Tag
                        key={index}
                        value={tag}
                        deleteTagHandler={deleteTagHandler}
                      />
                    );
                  })
                  :
                  <Tag
                    value={'ex 데일리'}
                    deleteTagHandler={deleteTagHandler}
                  />
                }
              </div>

            </div>
            :
            <div css={tag}>
              {selectedCody.hashList.map((item, index) => (
                <div css={tagItem} key={index}>
                  {item.includes('#') ?
                    <p>{item}</p>
                    :
                    <p># {item} </p>
                  }
                </div>
              ))}
            </div>

          }
          <div css={toggleContainer}>
            {iscodyEdit ?
              <div onClick={handleToggle}>
                <div
                  data-testid="toggle"
                  css={toggle === 0 ? toggleBtn : toggleXBtn}
                >
                  <div css={toggle === 0 ? toggleBtnCircle : toggleXBtnCircle}></div>
                </div>
                <p css={toggleTitle}>공개 여부</p>
              </div>
              :
              <div css={css`display:flex; align-items:end; margin-left:1.4rem;`}>
                {selectedCody.secret === 0 ?
                  <div>
                    <LockOpen size={30} />
                    <div css={css`margin-top: 10px;`}>
                      공개
                    </div>
                  </div>
                  :
                  <div>
                    <Lock size={30} />
                    <div css={css`margin-top: 10px;`}>
                      비공개
                    </div>
                  </div>
                }
              </div>
            }
          </div>
          {iscodyEdit ?
            <textarea
              ref={contentRef}
              css={contentContainer}
              placeholder="내용 입력"
              defaultValue={selectedCody.content}
            />
            :
            <div css={contentContainer}>
              {selectedCody.content}
            </div>
          }

          {isLoggedInUser ?
            <div css={submitBtnContainer}>
              {iscodyEdit ?
                <button
                  className="hvr-fade"
                  css={editBtn}
                  onClick={updateCody}
                >
                  저장
                </button>
                :
                <button
                  className="hvr-fade"
                  css={editBtn}
                  onClick={() => handleCodyEdit(true)}
                >
                  수정
                </button>
              }
              {iscodyEdit ?
                <button
                  className='hvr-fade'
                  css={delBtn}
                  onClick={() => { handleCodyEdit(false); editCancel(); }}
                >
                  취소
                </button>
                :

                <button
                  className='hvr-fade'
                  css={delBtn}
                  onClick={() => deleteCody(selectedCody.codyId)}
                >
                  삭제
                </button>
              }
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
  grid-template-rows: repeat(5,1fr);
  grid-template-columns: 20rem 1fr;
	max-width: 100%;
`;

const imgContainer = css`
  grid-row : 2;
  grid-column: 1;
  margin-bottom : 10px;
  display: flex;
  justify-content: center;
`;

const codyImg = css`
  position: relative;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const inputContainer = css`
  grid-row:3;
  width: max-content;
  display: grid;
  margin-left: 1.5rem;
`;

const inputTag = css`
  display: inline-block;
  width: 14rem;
  height: 35px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid silver;
  font-size: 15px;
  padding-left: 40px;
  grid-column: 1;
  grid-row: 1;
`;

const inputLabel = css`
  grid-column: 1;
  grid-row: 1;
  margin-top: 5px;
  margin-left: 0.8rem;
`;

const tag = css`
  grid-row: 3;
  grid-column : 1;
  display: flex;
  flex-wrap: wrap;
  margin-bottom : 15px;
  margin-top: 10px;
  margin-left: 1.3rem;
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
  margin-left: 1.5rem;
  grid-row: 4;
  grid-column: 1;
  background-color: rgb(242, 241, 240);
  border: 1px solid rgb(153, 153, 153);

  width: 16.5rem;

  padding: 10px;
  font-size: 16px;
  height: 100px;
  overflow-y : scroll;
  word-break: break-all;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3.5px;
    background-color: #BFAEA4;

    &:hover {
      background-color: #BFAEA4;
    }
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
  }
`;

const toggleContainer = css`
  display: grid;
  grid-row:1;
  grid-column: 1;
  color:#f2f2f2;
  margin-bottom:1rem;
`;

const toggleTitle = css`
  grid-column: 1;
  grid-row: 1;
  margin-left: 1.6rem;
  margin-top: 0.3rem;
  margin-bottom: 0rem;
`;

const toggleXBtn = css`
  grid-column: 2;
  width: 40px;
  height: 20px;
  background: grey;
  border-radius: 30px;
  transition: all 300ms ease-in-out;
  margin-left: 1.6rem;
`;

const toggleBtn = css`
  grid-column: 2;
  background: #00acee;
  width: 40px;
  height: 20px;
  border-radius: 30px;
  transition: all 300ms ease-in-out;
  margin-left: 1.6rem;
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
	grid-template-columns: repeat(5,1fr);

	margin-top: 1.5rem;
  margin-left: 1.3rem;

	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	transition: 0.5s;
  grid-row: 5;
`;

const delBtn = css`
	grid-column: 3;
	margin-left: 10px;

	width: 90px;
  height: 40px;
  color: white;
  border: 1.5px solid white;
  background-color: #C99F9F;
  margin-left : 20px;
  cursor: pointer;
`;

const editBtn = css`
	grid-column: 2;
	width: 90px;
  height: 40px;
  color: white;
  border: 1.5px solid white;
  background-color: #6DA0CF;
  margin-right: 20px;
  cursor: pointer;
`;

const CloseBtn = css`
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;

	height: 1.5rem;
	width : 1.5rem;

  position: absolute;
	top: 2rem;
  right: 2.5rem;

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
	width: 545px;
	height: 680px;
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
