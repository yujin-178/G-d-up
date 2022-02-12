import React from 'react';
import { css } from '@emotion/react';
import { useRef } from 'react';
import CodyItem from './CodyItem';
import axios from 'axios';
import { createFile } from '../../services/api';
import TagSearchBar from './TagSearchBar';
import Tag from './Tag';

export default function CodyCreateForm({ codyItems, handleOnStart, handleOnStop, handleResizeStop, inputRef, tags, onKeyPress, deleteTagHandler, contentRef, isNotSecret, toggleIsNotSecret }) {
  const canvasRef = useRef();

  const createCody = async (file, content, isNotSecret, tags) => {
    const fd = new FormData();
    fd.append('imageFile', file);

    const itemsIncody = codyItems.map(item => {
      const { clothingId, position, size } = item;
      return {
        clothingId,
        x: position.x,
        y: position.y,
        z: position.z,
        m: size.m,
      };
    });

    const data = {
      userName: 'jisoon',
      codyName: 'name',
      content: content,
      secret: isNotSecret ? 0 : 1,
      clothingList: itemsIncody,
      codyTag: tags.join(),
    };

    fd.append('createCody', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    const config = {
      Headers: { 'Content-Type': 'multipart/form-data' },
    };

    try {
      const response = await axios.post('http://i6b108.p.ssafy.io:8000/cody/create', fd, config);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    const content = contentRef.current.value;
    const file = await createFile(canvasRef.current);
    createCody(file, content, isNotSecret, tags);
  };

  return (
    <form css={form}>
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
    </form>
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
