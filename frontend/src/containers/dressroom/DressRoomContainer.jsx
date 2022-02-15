import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../../slices/friendsSlice';

import DressRoomPage from '../../components/dressroom/DressRoomPage';

export default function DressRoomContainer() {
  const dispatch = useDispatch();

  function handleClickModalOpen() {
    console.log('클릭!');
    dispatch(setIsOpen(true));
  }

  return (
    <DressRoomPage
      onClickModalOpen={handleClickModalOpen}
    />
  );
}
