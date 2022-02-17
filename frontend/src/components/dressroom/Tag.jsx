import React from 'react';
import { css } from '@emotion/react';

export default function Tag({ value, deleteTagHandler }) {
  return (
    <li css={tagItem}>
      {value.includes('#') ?
        <p css={tagTitle}>{value}</p>
        :
        <p css={tagTitle}># {value} </p>
      }
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
  padding: 8px 3px;
  border-radius: 18px;
  font-size: 13px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 5px;
  min-width: 30px;
  color: grey;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(242, 241, 240);
`;

const tagTitle = css`
  margin: 0;
  padding-left: 4px;
  vertical-align: middle;
`;

const tagDeleteBtn = css`
  display: inline-block;
  border: none;
  background: none;
  cursor: pointer;
  color: grey;
  font-size: 8px;
`;
