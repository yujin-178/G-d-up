import React from 'react';

import { css, jsx } from "@emotion/react";

import ClothesItemList from './ClothesItemList.jsx';

export default function ClothesItemListContainer() {
  const ItemContainer = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0.5rem;
    background-color: #BFAEA4;
    width: 25rem;
    height: 25em;
  `

  return (
    <div>
      <h5>목록</h5>
      <div css={ItemContainer}>
        <ClothesItemList />
      </div>
    </div>
  )
}
