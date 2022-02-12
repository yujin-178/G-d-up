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
    <div css={ItemContainer}>
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

const ItemContainer = css`
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0.5rem;
  background-color: #BFAEA4;
  width: 100%;
  height: 100%;
`;
