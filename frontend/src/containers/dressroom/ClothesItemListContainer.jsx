import React from 'react';

import { css } from "@emotion/react";

import ClothesItemList from '../../components/dressroom/ClothesItemList';
import { useSelector, useDispatch } from 'react-redux';

import { selectClothes } from '../../slices/clothesSlice';
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
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0.5rem;
  background-color: #BFAEA4;
  width: 100%;
  height: 100%;
`;
