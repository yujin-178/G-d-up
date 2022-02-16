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

  let { userName } = useSelector(state => state.clothesSlice);
  
  console.log(loginedUser);
  if (loginedUser.length === 0) {
    console.log('로그인 되지 않았습니다');
    userName = '익명';
  }

  useEffect(() => {
    dispatch(setUserName(userName));
  }, []);

  return (
    <DressRoomPage
      onClickModalOpen={handleClickModalOpen}
      userName={userName}
    />
  );
}
