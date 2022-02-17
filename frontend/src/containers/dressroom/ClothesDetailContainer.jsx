import React from 'react';
import ClothesDetail from '../../components/dressroom/ClothesDetail';
import { useSelector, useDispatch } from 'react-redux';
import { deleteClothesById } from '../../slices/clothesSlice';
import { season } from '../../constants/filter';

import {
  changeisResOpen,
} from '../../slices/modalSlice';

export default function ClothesDetailContainer() {
  const dispatch = useDispatch();
  const { selectedClothes, userName } = useSelector(state => state.clothesSlice);
  const loggedInUser = useSelector(state => state.authSlice.userName);
  const { isResOpen, resText, } = useSelector(state => state.modalSlice);

  // todo: username과 clothes의 username이 일치하는 경우만 삭제 가능
  function deleteHandler(clothesId) {
    dispatch(deleteClothesById(clothesId));
    // dispatch(changeisResOpen(true));
    // dispatch(changeResText('정말 삭제하시겠습니까?'));
    // if (confirm === true) {
    //   dispatch(deleteClothesById(clothesId));
    // }
  }

  function handleResponse(value) {
    dispatch(changeisResOpen(value));
  }

  return (
    <ClothesDetail
      selectedClothes={selectedClothes}
      deleteHandler={deleteHandler}
      allSeason={season}
      isLoggedInUser={loggedInUser === userName}
      userName={userName}
      isResOpen={isResOpen}
      resText={resText}
      handleResponse={handleResponse}
    />
  );
}
