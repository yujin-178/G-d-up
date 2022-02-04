import React from 'react';
import { css } from '@emotion/react'

function Category ({ item, isSelected, handleClick }) {
  return (
    <li css={liStyle}>
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
`

const buttonStyle = ({ isSelected }) => css`
  background: none;
  border: none;
  cursor: pointer;
  ${isSelected &&
  `
    background-color: #413F42;
    color: white;
  `}
`;

export default Category;