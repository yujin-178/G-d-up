import React from 'react';
import ClothesDetail from '../../../components/clothesDetail/ClothesDetail.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { deleteClothesById } from '../../../clothesSlice.js';
import { season } from '../../../constants/filter';

export default function ClothesDetailContainer() {
  const { selectedClothes } = useSelector(state => state.clothesSlice);
  const dispatch = useDispatch();
  // todo: username과 clothes의 username이 일치하는 경우
  const deleteHandler = clothesId => {
    dispatch(deleteClothesById(clothesId));
  };

  return (
    <ClothesDetail
      selectedClothes={selectedClothes}
      deleteHandler={deleteHandler}
      allSeason={season}
    />
  );
}
