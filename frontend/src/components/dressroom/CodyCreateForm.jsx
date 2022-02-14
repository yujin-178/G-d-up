import React from 'react';
import { css } from '@emotion/react';
import CodyItem from './CodyItem';
import TagSearchBar from './TagSearchBar';
import Tag from './Tag';

export default function CodyCreateForm(props) {
  const {
    canvasRef,
    codyItems,
    handleOnStart,
    handleOnStop,
    handleResizeStop,
    inputRef,
    tags,
    onKeyPress,
    deleteTagHandler,
    contentRef,
    isNotSecret,
    toggleIsNotSecret,
    saveHandler,
  } = props;

  return (
    <div css={form}>
      <div
        id="canvas"
        css={canvas}
        ref={canvasRef}
      >
        {codyItems.map((item, index) => {
          return (
            <CodyItem
              key={index}
              item={item}
              handleOnStart={handleOnStart}
              handleOnStop={handleOnStop}
              handleResizeStop={handleResizeStop}
            />
          );
        })}
      </div>
      <div css={css`display: flex; justify-content: space-between; width: 100%; margin-top: 10px`}>
        <div css={css`width: 70%`}>
          <TagSearchBar
            inputRef={inputRef}
            onKeyPress={onKeyPress}
          />
        </div>
        <div css={toggleContainer}>
          <div
            css={toggleBtn({ isNotSecret })}
            onClick={toggleIsNotSecret}>
            <div css={toggleBtnCircle({ isNotSecret })}></div>
          </div>
          {isNotSecret ?
            <p css={css`margin-left: 10px`}> 공개 </p> :
            <p css={css`margin-left: 10px`}> 비공개 </p>
          }
        </div>
      </div>
      <div css={tagContainer}>
        {tags.length ?
          tags.map((tag, index) => {
            return (
              <Tag
                key={index}
                value={tag}
                deleteTagHandler={deleteTagHandler}
              />
            );
          }) :
          <Tag
            value={'ex 데일리'}
            deleteTagHandler={deleteTagHandler}
          />
        }
      </div>
      <textarea
        ref={contentRef}
        css={memo}
        name="memo"
        placeholder="내용 입력"
      />
      <div css={css`display: flex; justify-content: space-between;`}>
        <button
          css={button({})}
        >리셋
        </button>
        <button
          css={button({})}
          onClick={saveHandler}
        >저장</button>
      </div>
    </div>
  );
}

const form = css`
  border: 0.5px solid grey;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const memo = css`
  display: block;
  overflow: hidden;
  resize: none;
  outline: none;
  width: 100%;
  min-height: 100px;
  margin-top: 15px;
`;

const canvas = css`
  min-width: 100%;
  min-height: 450px;
  background-color: white;
  position: relative;
  border: 1px solid grey;
`;

const toggleContainer = css`
  display: flex;
  padding: 2px;
`;

const toggleBtn = ({ isNotSecret }) => css`
  width: 50px;
  height: 25px;
  background: grey;
  border-radius: 30px;
  transition: all 300ms ease-in-out;
  margin: auto;
  ${isNotSecret &&
  `
    background: #00acee;
  `}
`;

const toggleBtnCircle = ({ isNotSecret }) => css`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  transition: all 300ms ease-in-out;
  ${isNotSecret &&
  `
    margin-left: 50%;
  `}
`;

const tagContainer = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style:none;
  min-height: 44px;
`;

const button = ({ color }) => css`
  background-color: ${color};
`;
