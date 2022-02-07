import React from 'react';
import ClothesDetail from '../../../components/clothesDetail/ClothesDetail.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { deleteClothesById } from '../../../clothesSlice.js';
import { season } from '../../../constants/filter';

export default function ClosetDetailContainer() {
  const { selectedClothes } = useSelector(state => state.clothesSlice);
  const dispatch = useDispatch();
  const deleteHander = clothesId => {
    dispatch(deleteClothesById(clothesId));
  };
  console

  return (
    <ClothesDetail
      selectedClothes={selectedClothes}
      deleteHander={deleteHander}
      allSeason={season}
    />
  );
}
