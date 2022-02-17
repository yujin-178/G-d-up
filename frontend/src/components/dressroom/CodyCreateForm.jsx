import React from 'react';
import { css } from '@emotion/react';
import CodyItem from './CodyItem';
import TagSearchBar from './TagSearchBar';
import Tag from './Tag';
import Button from './Button';

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
    activatedItemId,
    deleteCodyItem,
    resetHandler,
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
              isActivated={activatedItemId === item.clothingId}
              deleteCodyItem={deleteCodyItem}
            />
          );
        })}
      </div>
      <div css={css`display: flex; justify-content: space-between; width: 100%; margin-top: 10px; margin-left: 2rem;`}>
        <div css={css`width: 13.5rem; margin-top: 6px;`}>
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
            <p css={css`margin-left: 10px; color: white;`}> 공개 </p> :
            <p css={css`margin-left: 10px; color: white;`}> 비공개 </p>
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
      <div css={buttonGroup}>
        <Button title='리셋하기' onClick={resetHandler} color={'#fff'}/>
        <Button title='저장하기' onClick={saveHandler} color={'#00acee'}/>
      </div>
    </div>
  );
}

const form = css`
  box-sizing: content-box;
  border: 0.5px solid grey;
  width: 24rem;
  height: 73%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 2rem 2rem;
  background-color: white;
  margin-right: 20px;
  background-color: #2E2E2E;
`;

const memo = css`
  display: block;
  overflow: hidden;
  resize: none;
  outline: none;
  width: 21rem;
  min-height: 100px;
  margin-top: 15px;
  background-color: rgb(242, 241, 240);
  border: 1px solid rgb(153, 153, 153);
  padding: 10px;
`;

const canvas = css`
  width: 270px;
  height: 370px;
  background-color: rgb(242, 241, 240);
  position: relative;
  border: 1px solid rgb(153, 153, 153);
  opacity: 1;
`;

const toggleContainer = css`
  display: flex;
  padding: 2px;
  margin-top: 2px;
  margin-right: 1.5rem;
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
  cursor: pointer;
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
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  list-style:none;
  min-height: 44px;
`;

const buttonGroup = css`
  width: 55%;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 1rem;
`;
