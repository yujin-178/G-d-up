import React from 'react';

import ClothesItem from './ClothesItem.jsx';

import { css } from "@emotion/react";

export default function ClothesItemList(props) {
  const { clothes, onMouseOverHandler, OnMouseLeaveHandler, onClickHandler } = props;
  const numbers = [];
  for (let i = 0; i < 20; i++) {
    numbers.push(null);
  }

  return (
    <div css={ItemListContainer}>
      {numbers.map((number, idx) =>
        <ClothesItem
          key={idx}
          item={clothes[idx]}
          onMouseOverHandler={onMouseOverHandler}
          OnMouseLeaveHandler={OnMouseLeaveHandler}
          onClickHandler={onClickHandler}
        />
      )}
    </div>
  );
}

const ItemListContainer = css`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0.5 0.5 1rem;
  background-color: #BFAEA4;
  width: 98%;
  height: 100%;
`;
