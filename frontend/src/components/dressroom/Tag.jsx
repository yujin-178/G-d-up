import React from 'react';
import { css } from '@emotion/react';

export default function Tag({ value, deleteTagHandler }) {
  return (
    <li css={tagItem}>
      <p css={tagTitle}>{value}</p>
      <button
        css={tagDeleteBtn}
        onClick={event => {
          event.preventDefault();
          deleteTagHandler(value);
        }}>x</button>
    </li>
  );
}

const tagItem = css`
  position: relative;
  display: flex;
  background-color: white;
  height: 25px;
  padding: 4px;
  border-radius: 18px;
  font-size: 15px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 5px;
  min-width: 50px;
  color: grey;
`;

const tagTitle = css`
  margin: 0;
  padding: 4px;
  vertical-align: middle;
`;

const tagDeleteBtn = css`
  border:none;
  background: none;
  padding: 0px 5px 2px 0px;
  cursor: pointer;
`;
