import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filteredClothesSelector } from '../../filterSelector';
// import { css, jsx } from '@emotion/react';
import { resetFilter } from '../../slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import {
  changeisModalOpen
} from '../../slices/modalSlice';

import ClosetPage from '../../components/dressroom/ClosetPage.jsx';

export default function ClosetContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredClothes = useSelector(state => filteredClothesSelector(state));
  console.log(filteredClothes);

  const goBackHandler = () => {
    dispatch(resetFilter());
    navigate('/dressroom');
  };

  function handleClickModal() {
    dispatch(changeisModalOpen(true));
  }

  return (
    <ClosetPage
      filteredClothes={filteredClothes}
      onClickModal={handleClickModal}
      goBackHandler={goBackHandler}
    />
  );
}

// const GridContainer = css`
// 	display: grid;
// `;
