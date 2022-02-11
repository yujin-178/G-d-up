import React from 'react';
import { css } from '@emotion/react';
import { useRef } from 'react';
import CodyItem from './CodyItem';

export default function CodyCreateForm({ codyItems, handleOnStart, handleOnStop }) {
  const canvasRef = useRef();

  return (
    <form>
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
            />
          );
        })}
      </div>

      <input
        css={tagInput}
        type="text"
        placeholder="태그 입력"
      />
      <textarea
        css={memo}
        name="memo"
        placeholder="메모 입력"
      />
      <input type="text" css={searchInputStyle} />
      <button>리셋</button>
      <button>저장</button>
    </form>
  );
}

const tagInput = css`
  outline: none;
  display: block;
`;

const memo = css`
  display: block;
  overflow: hidden;
  resize:none;
  outline: none;
`;

const searchInputStyle = css`
  display: block;
  height: 35px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid silver;
  font-size: 19px;
`;

const canvas = css`
  min-width: 400px;
  max-width: 400px;
  min-height: 400px;
  background-color: beige;
  position: relative;
`;
