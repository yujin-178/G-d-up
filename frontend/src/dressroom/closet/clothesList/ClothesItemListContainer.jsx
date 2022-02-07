import React from 'react';

import { css, jsx } from "@emotion/react";

import ClothesItemList from './ClothesItemList.jsx';
import { useSelector } from 'react-redux';

export default function ClothesItemListContainer() {
  const clothes = useSelector(state => state.clothesSlice)
  
  return (
    <div>
      <h5>목록</h5>
      <div css={ItemContainer}>
        <ClothesItemList
          clothes={clothes}
        />
      </div>
    </div>
  );
}

const ItemContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0.5rem;
  background-color: #BFAEA4;
  width: 25rem;
  height: 25em;
`;
