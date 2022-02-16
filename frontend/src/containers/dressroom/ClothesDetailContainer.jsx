import React from 'react';
import ClothesDetail from '../../components/dressroom/ClothesDetail';
import { useSelector, useDispatch } from 'react-redux';
import { deleteClothesById } from '../../slices/clothesSlice';
import { season } from '../../constants/filter';

export default function ClothesDetailContainer() {
  const { selectedClothes, userName } = useSelector(state => state.clothesSlice);
  const loggedInUser = useSelector(state => state.authSlice.userName);
  const dispatch = useDispatch();
  // todo: username과 clothes의 username이 일치하는 경우만 삭제 가능
  const deleteHandler = clothesId => {
    dispatch(deleteClothesById(clothesId));
  };

  return (
    <ClothesDetail
      selectedClothes={selectedClothes}
      deleteHandler={deleteHandler}
      allSeason={season}
      isLoggedInUser={loggedInUser === userName}
      userName={userName}
    />
  );
}
