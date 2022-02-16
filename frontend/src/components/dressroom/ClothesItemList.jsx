import React from 'react';

import ClothesItem from './ClothesItem.jsx';

import { css } from "@emotion/react";

import BackImg from '../../../public/images/add_icon.svg';

export default function ClothesItemList(props) {
  const { filteredClothes, onMouseOverHandler, OnMouseLeaveHandler, onClickHandler, onClickModal, isLoggedInUser } = props;
  const numbers = [];
  for (let i = 0; i < 20; i++) {
    numbers.push(null);
  }

  return (
    <div css={ItemListContainer}>
      {numbers.map((number, idx) =>
        <ClothesItem
          key={idx}
          item={filteredClothes[idx]}
          onMouseOverHandler={onMouseOverHandler}
          OnMouseLeaveHandler={OnMouseLeaveHandler}
          onClickHandler={onClickHandler}
        />
      )}
      <img
        css={AddIcon({ isLoggedInUser })}
        src={BackImg}
        width="100rem"
        onClick={onClickModal}
        alt="추가아이콘"
        className='hvr-float'
      />
    </div>
  );
}

const ItemListContainer = css`
  position: relative;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const AddIcon = ({ isLoggedInUser }) => css`
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  position: absolute;
  right: -2rem;
  bottom: -0.4rem;
  ${!isLoggedInUser &&
    `
      display: none;
    `}
`;
