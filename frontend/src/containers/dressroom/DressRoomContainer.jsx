import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../../slices/friendsSlice';
import { setUserName } from '../../slices/clothesSlice';
import DressRoomPage from '../../components/dressroom/DressRoomPage';

export default function DressRoomContainer() {
  const dispatch = useDispatch();

  function handleClickModalOpen() {
    console.log('클릭!');
    dispatch(setIsOpen(true));
  }

  const loginedUser = JSON.parse(localStorage.getItem('userInfo')).username;

  useEffect(() => {
    dispatch(setUserName(loginedUser));
  }, []);

  const { userName } = useSelector(state => state.clothesSlice);

  return (
    <DressRoomPage
      onClickModalOpen={handleClickModalOpen}
      userName={userName}
    />
  );
}
