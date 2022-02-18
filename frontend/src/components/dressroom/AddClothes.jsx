import React, { Fragment } from 'react';
import { css, Global } from '@emotion/react';
import Modal from 'react-modal';
import LaundryModalContainer from '../../containers/dressroom/LaundryModalContainer';
import ResModal from './ResModal';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { isNull } from 'lodash';
import { Tags } from '@emotion-icons/fa-solid/Tags';
import Tag from './Tag';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export default function AddClothes({ deleteTagHandler, isTagOpen, setisTagOpen, inputRef, onKeyPress, imgError, resloading, resetClothes, loading, images, resText, isResOpen, handleResponse, saveClothes, selectSeason, tagGroup, allSeason, tagInfo, selectedLaundry, onImgChange, preview, imgInput, modalToggle, isModalOpen, handleLaundry }) {
  return (
    <div>
      <Global
        styles={modalClass}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => { modalToggle(false); resetClothes(); }}
        closeTimeoutMS={500}
        onAfterOpen={() => { document.body.style.overflow = 'hidden'; }}
        onAfterClose={() => { document.body.style.overflow = 'auto'; }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            borderRadius: '0px',
            outline: 'none',
            overflowY: 'auto',
            padding: '16px',
            width: '50%',
            border: 'none',
          }
        }}
      >
        <div css={css`position: relative;`}>
          <div css={imgContainer}>
            {loading ?
              <div css={css`transition: 0.5s;`}>
                <p css={css`font-family: 'KOTRAHOPE'; font-size:20px;`}>
                  배경 제거하는 중 ...
                </p>
                <ScaleLoader
                  color='black'
                  loading={loading}
                  height={130}
                  width={20}
                  radius={15}
                  margin={7}
                />
              </div>
              :
              imgError.text ?
                <div>
                  <p css={css`color: #c99f9f ; font-weight: bold; font-size: 20px;`}>
                    {imgError.text} !!
                  </p>
                </div>
                :
                <img
                  src={preview}
                  css={previewImg}
                />}
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
              Upload
            </button>
          </div>
          <div>
            <br />

            <div>
              <div css={css`display: grid; grid-template-columns: 40px 360px;`}>
                <p css={label}>종류</p>
                <div css={valueStyle}>
                  <Fragment>
                    {tagInfo['subcategory'] ?
                      tagInfo['category'] + ">" + tagInfo['subcategory']
                      : tagInfo['category']
                    }
                  </Fragment>
                </div>
              </div>

              <div css={css`display: grid; grid-template-columns: 1fr 1fr;`}>
                <div css={css`display: grid; grid-template-columns: 40px 160px`}>
                  <p css={label}> 색상 </p>
                  <div css={valueStyle2}>
                    {isNull(tagInfo['color']) ? '없음' : tagInfo['color']}
                  </div>
                </div>

                <div css={css`display: grid; grid-template-columns: 40px 160px`}>
                  <p css={label}> 소재 </p>
                  <div css={valueStyle2}>
                    {isNull(tagInfo['material']) ? '없음' : tagInfo['material']}
                  </div>
                </div>

                <div css={css`display: grid; grid-template-columns: 40px 160px`}>
                  <p css={label}> 패턴 </p>
                  <div css={valueStyle2}>
                    {isNull(tagInfo['pattern']) ? '없음' : tagInfo['pattern']}
                  </div>
                </div>

                <div css={css`display: grid; grid-template-columns: 40px 160px`}>
                  <p css={label}> 핏 </p>
                  <div css={valueStyle2}>
                    {isNull(tagInfo['fit']) ? '없음' : tagInfo['fit']}
                  </div>
                </div>
              </div>
            </div>

            <div css={season}>
              <p css={css`position: relative; top: 11px`}> 계절 </p>
              {allSeason.map((item, index) => {
                const seasonMatched = item === tagInfo['season'];
                return (
                  <p css={liStyle({ seasonMatched })}
                    key={index}
                    onClick={() => selectSeason(item)}
                  >
                    {item}
                  </p>
                );
              })}
            </div>

            <div css={laundryContainer}>
              <p css={css`position: relative`}>세탁
                <button css={AddBtn}
                  onClick={() => handleLaundry(true)}>
                  +
                </button>
              </p>
              {selectedLaundry.map((i) => {
                const image = images[i];
                return (
                  <img css={css`width: 60px; height: 60px;`} src={image} alt={i} key={i} />
                );
              })}
              <LaundryModalContainer
                images={images}
              />
            </div>

            <div>
              <div css={inputContainer}>
                <p
                  css={css`grid-column: 1; grid-row:1; position: relative; right:5px;`}>
                  태그
                  <button css={AddBtn}
                    onClick={() => setisTagOpen(!isTagOpen)}>
                    {isTagOpen ? <span>-</span> : <span>+</span> }
                  </button>
                </p>
                <input
                  id="taginput"
                  ref={inputRef}
                  css={tagInput({ isTagOpen })}
                  type="text"
                  placeholder="태그 추가"
                  onKeyPress={onKeyPress}
                />
                <label htmlFor="taginput" css={inputLabel({ isTagOpen })}>
                  <Tags size={20} />
                </label>
              </div>

              <div css={tagsGroup}>
                {tagGroup.map((item, index) => {
                  return (
                    <Tag
                      key={index}
                      value={item}
                      deleteTagHandler={deleteTagHandler} />
                  );
                })}
              </div>
            </div>

            <div css={submitBtnContainer}>
              <button
                css={saveBtn}
                onClick={() => saveClothes()}
                id="saveBtn"
              >
                저장
              </button>
              <button
                css={cancelBtn}
                onClick={() => { modalToggle(false); resetClothes(); }}
              >
                취소
              </button>
            </div>
            <ResModal
              isResOpen={isResOpen}
              handleResponse={handleResponse}
              resText={resText}
              resloading={resloading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

const label = css`
  margin-right: 10px;
  font-size: 15px;
`;

const valueStyle = css`
	border: 1px solid #C0C0C0;
  border-radius: 10px;
	height: 30px;
	min-width: 80%;
  left: 10px;
  font-size: 15px;
  padding: 5px;
  transition: all 0.3s ease;
  margin-right: 10px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
`;

const valueStyle2 = css`
  border: 1px solid #C0C0C0;
  border-radius: 10px;
  height: 30px;
  min-width: 60%;
  left: 10px;
  font-size: 15px;
  padding: 5px;
  transition: all 0.3s ease;
  margin-right: 10px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
`;

const inputContainer = css`
  display: grid;
  margin: 5px;
`;

const tagInput = ({ isTagOpen }) => css`
  display: none;
  width: 10rem;
  height: 35px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid silver;
  font-size: 15px;
  padding-left: 35px;
  margin-left: 3rem;
  grid-column: 1;
  grid-row: 1;
  ${isTagOpen && `
    display: inline-block;
  `}
`;

const inputLabel = ({ isTagOpen }) => css`
  display: none;
  grid-column: 1;
  grid-row: 1;
  margin-top: 5px;
  margin-left: 3.5rem;
  ${isTagOpen && `
  display:inline-block;
`}
`;

// const tagItem = css`
//   display: flex;
// 	justify-content: center;
//   align-items: center;

//   background-color: #faefe8;
//   height: 25px;
// 	width : max-content;
//   padding: 4px;
//   border-radius: 18px;

//   font-size: 13px;
//   box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
//   margin: 5px;
//   min-width: 50px;
// `;

const season = css`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr;
`;

const liStyle = ({ seasonMatched }) => css`
  background-color: rgb(242, 241, 240);
  width: 4.5rem;
  height: 2.5rem;
	display: flex;
	justify-content: center;
  align-items: center;
	cursor: pointer;
  color: grey;
    ${seasonMatched &&
  `
    background-color: #4EBBFA;
    color: rgb(242, 242, 242);
  `}
  border-radius: 8px;
  transition: 0.5s;
  &:hover {
    color: rgb(242, 241, 240);
    background: #4EBBFA;
  }
	border: none;
`;

const AddBtn = css`
  position: absolute;
	width: 1.2rem;
	height: 1.2rem;
	background: #008000;
	color: white;
  border: none;
	border-radius: 50%;
	cursor: pointer;
  left: 30px;
  top: -10px;
`;

const laundryContainer = css`
	display: grid;
	margin-top: 10px;
	margin-bottom: 10px;
  grid-template-columns: repeat(6, 0.5fr);
`;

const submitBtnContainer = css`
	margin: 1.5rem;
	font-family: "Noto Sans KR", sans-serif;
	font-size: 1rem;
	font-weight: 300;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 4rem;
`;

const cancelBtn = css`
	background: rgb(191, 191, 189)
  color: rgb(242, 241, 240);
	padding: 0.5rem 1rem;
	width: 6rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: rgb(242, 241, 240);
    background: rgb(191, 191, 189)
  }
	border: none;
	border-radius: 8px;
`;

const saveBtn = css`
  background: #4EBBFA;
  color: rgb(242, 241, 240);
	padding: 0.5rem 1rem;
	width: 6rem;
	border: none;
	border-radius: 4px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #4EBBFA;
    background: rgb(242, 241, 240)
  }
	border: none;
	border-radius: 8px;
`;

const imgContainer = css`
	display: flex;
	margin-top: 5rem;
	border: 1px solid #d3d3d3;
	width: 400px;
	height: 300px;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  box-shadow: 2px 2px 1px rgba(1, 1, 2, 0.1);
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
  padding: 5px;
`;

const inputBtn = css`
	background: #4EBBFA;
  color: white;
  font-weight: bold;

  &:hover {
    color: #4EBBFA;
    background: rgb(242, 241, 240)
  }

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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

	cursor: pointer;

	transition: 0.5s;

	border: none;
	border-radius: 8px;

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
`;

const tagsGroup = css`
  grid-row: 2;
  grid-column : 1;
  display: flex;
  flex-wrap: wrap;
  margin-bottom : 15px;
  margin-top: 10px;
  margin-left: 2rem;
  max-width: 370px;
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
	width: 50%;
	height: 80%;
	background-color: #f2f2f2;
	justify-content: center;
}

.ReactModal__Content--before-close {
	width: 0%;
	height: 0%;
	background-color: transparent;
}
`;
