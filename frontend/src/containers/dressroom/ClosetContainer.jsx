import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filteredClothesSelector } from '../../filterSelector';
import { resetFilter } from '../../slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import ClosetPage from '../../components/dressroom/ClosetPage.jsx';
import { sessionLogin } from '../../slices/authSlice';

export default function ClosetContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredClothes = useSelector(state => filteredClothesSelector(state));
  console.log(filteredClothes);

  useEffect(() => {
    if (localStorage.getItem('userInfo')){
      const userName = JSON.parse(localStorage.getItem('userInfo')).username;
      dispatch(sessionLogin(userName));
    } else {
      navigate('/login');
    }
  }, []);

  const goBackHandler = () => {
    dispatch(resetFilter());
    navigate('/dressroom');
  };

  return (
    <ClosetPage
      filteredClothes={filteredClothes}
      goBackHandler={goBackHandler}
    />
  );
}
