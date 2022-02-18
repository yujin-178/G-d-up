import React from 'react';
import { css } from '@emotion/react';

export default function Category ({ item, isSelected, handleClick }) {
  return (
    <li css={liStyle} className='hvr-shrink'>
      <button
        css={buttonStyle({ isSelected })}
        onClick={() => handleClick(item)}
      >
        {item}
      </button>
    </li>
  );
}

const liStyle = css`
  list-style-type: none;
  padding-right: 3%;
  margin-left: 10px;
`;

const buttonStyle = ({ isSelected }) => css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 19px;
  ${isSelected &&
  `
    color: #00acee;
    border-bottom: 2px solid #00acee;
  `}
`;
