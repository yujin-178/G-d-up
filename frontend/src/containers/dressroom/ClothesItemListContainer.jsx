import React from 'react';

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
      <ClothesItemList
        clothes={clothes}
        onMouseOverHandler={onMouseOverHandler}
        OnMouseLeaveHandler={OnMouseLeaveHandler}
      />
    </div>
  );
}
