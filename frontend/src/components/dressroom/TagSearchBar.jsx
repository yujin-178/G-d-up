import React from 'react';
import { css } from '@emotion/react';

export default function TagSearchBar({ inputRef, onKeyPress }) {

  return (
    <input
      data-testid="input"
      ref={inputRef}
      css={searchInputStyle}
      type="text"
      placeholder="태그 입력"
      onKeyPress={onKeyPress}
    />
  );
}

const searchInputStyle = css`
  height: 35px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid silver;
  width: 100%;
  font-size: 15px;
  background-color: rgb(242, 241, 240);
  padding-left: 10px;
`;
