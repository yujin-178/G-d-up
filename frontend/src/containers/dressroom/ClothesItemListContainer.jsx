import React from 'react';

import ClothesItemList from '../../components/dressroom/ClothesItemList';
import { useSelector, useDispatch } from 'react-redux';

import { setClothes, selectClothes } from '../../slices/clothesSlice';
import { debounce } from "lodash";
import { useEffect } from 'react';

export default function ClothesItemListContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setClothes({}));
  });

  const { clothes, selectedClothes } = useSelector(state => state.clothesSlice);

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
