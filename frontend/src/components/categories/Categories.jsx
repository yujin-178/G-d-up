import React from 'react';
import { css } from '@emotion/react';
import Category from '../category/Category.jsx';

function Categories({ categories, selectedCategory, handleClick }) {
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
  align-items: center;
  background-color: #fff;
  height: 4rem;
  width: 40%;
  min-width: 600px;
  border-radius: 10px;
  padding: 10px;
  margin: 0;
  box-shadow: 0px 0px 10px rgba(1, 1, 1, 0.2);
`;

export default Categories;
