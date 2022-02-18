import React from 'react';
import { css } from '@emotion/react';
import Category from './Category.jsx';

export default function Categories({ categories, selectedCategory, handleClick }) {
  return (
    <div css={CategoriesNav}>
      <ul css={ulStyle}>
        {categories.map((category, index) => (
          <Category
            key={index}
            item={category}
            isSelected={selectedCategory === category}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </div>
  );
}

const CategoriesNav = css`
  grid-column: 1 / 3;
  margin: 1rem 1rem 0rem 1rem;
  z-index: 0;
`;

const ulStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 4rem;
  width: 97%;
  padding: 10px;
  margin: 0;
  box-shadow: 0px 0px 10px rgba(1, 1, 1, 0.2);
  background-color: rgb(242, 241, 240);
`;
