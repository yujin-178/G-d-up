import React from 'react';

import { css, jsx } from "@emotion/react";

import ClothesItemList from './ClothesItemList.jsx';
import { useSelector, useDispatch } from 'react-redux';

import { selectClothes } from '../../../clothesSlice';
import { debounce } from "lodash";

export default function ClothesItemListContainer() {
  const { clothes, selectedClothes } = useSelector(state => state.clothesSlice);
  const dispatch = useDispatch();

  const onMouseOverHandler = debounce(clothes => {
    if (selectedClothes.id !== clothes.id) {
      dispatch(selectClothes(clothes));
    }
  }, 250);

  const OnMouseLeaveHandler = () => {
    onMouseOverHandler.cancel();
  };

  return (
    <div>
      <h5>목록</h5>
      <div css={ItemContainer}>
        <ClothesItemList
          clothes={clothes}
          onMouseOverHandler={onMouseOverHandler}
          OnMouseLeaveHandler={OnMouseLeaveHandler}
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
