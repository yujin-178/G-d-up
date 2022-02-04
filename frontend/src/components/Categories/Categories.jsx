import React from 'react';
import { css } from '@emotion/react';
import Category from '../Category/Category.jsx';

const categories = ['all', 'top', 'bottom', 'shoes', 'outer', 'accessories'];

function Categories({ selectedCategory, handleClick }) {
  return (
    <ul css={ulStayle}>
      {categories.map((category, index) =>(
        <Category
          key={index}
          item={category}
          isSelected={selectedCategory === category}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
}

const ulStayle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFAFA;
  height: 3rem;
  width: 50%;
`;

export default Categories;
