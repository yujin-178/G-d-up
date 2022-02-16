import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../../slices/friendsSlice';
import { setUserName } from '../../slices/clothesSlice';
import DressRoomPage from '../../components/dressroom/DressRoomPage';
import { sessionLogin } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function DressRoomContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.getItem('userInfo')){
      const loginedUser = JSON.parse(localStorage.getItem('userInfo')).username;
      dispatch(sessionLogin(loginedUser));
    } else {
      navigate('/login');
    }
    if (localStorage.getItem('friendName')){
      const userName = localStorage.getItem('friendName');
      dispatch(setUserName(userName));
    }
  }, []);

  function handleClickModalOpen() {
    console.log('클릭!');
    dispatch(setIsOpen(true));
  }

  let { userName } = useSelector(state => state.clothesSlice);
  let loginedUser = useSelector(state => state.authSlice.userName);
  
  // console.log(loginedUser);
  // if (loginedUser.length === 0) {
  //   console.log('로그인 되지 않았습니다');
  //   userName = '익명';
  // }

  // useEffect(() => {
  //   dispatch(setUserName(userName));
  // }, []);

  function handleClickToMyDressRoom() {
    dispatch(setUserName(loginedUser));
    localStorage.setItem("friendName", `${loginedUser}`);
  }

  return (
    <DressRoomPage
      onClickModalOpen={handleClickModalOpen}
      onClickToMyDressRoom={handleClickToMyDressRoom}
      userName={userName}
      isMyRoom={loginedUser === userName}
    />
  );
}
