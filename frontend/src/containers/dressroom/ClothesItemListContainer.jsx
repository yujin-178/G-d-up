import React from 'react';

import ClothesItemList from '../../components/dressroom/ClothesItemList';
import { useSelector, useDispatch } from 'react-redux';

import { setClothes, selectClothes } from '../../slices/clothesSlice';
import { debounce } from "lodash";
import { useEffect } from 'react';
import { filteredClothesSelector } from '../../filterSelector';

export default function ClothesItemListContainer() {
  const dispatch = useDispatch();

  const userName = JSON.parse(localStorage.getItem('userInfo')).username;

  useEffect(() => {
    dispatch(setClothes(userName));
  }, []);

  const { selectedClothes } = useSelector(state => state.clothesSlice);
  const filteredClothes = useSelector(state => filteredClothesSelector(state));

  const onMouseOverHandler = debounce(clothes => {
    if (selectedClothes.clothing.clothingId !== clothes.clothing.clothingId) {
      dispatch(selectClothes(clothes));
    }
  }, 250);

  const OnMouseLeaveHandler = () => {
    onMouseOverHandler.cancel();
  };

  return (
    <div>
      <ClothesItemList
        filteredClothes={filteredClothes}
        onMouseOverHandler={onMouseOverHandler}
        OnMouseLeaveHandler={OnMouseLeaveHandler}
      />
    </div>
  );
}
