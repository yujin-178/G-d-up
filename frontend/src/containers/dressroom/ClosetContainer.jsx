import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filteredClothesSelector } from '../../filterSelector';
// import { css, jsx } from '@emotion/react';

import {
  changeisModalOpen
} from '../../slices/modalSlice';

import ClosetPage from '../../components/dressroom/ClosetPage.jsx';

export default function ClosetContainer() {
  const dispatch = useDispatch();
  const filteredClothes = useSelector(state => filteredClothesSelector(state));
  console.log(filteredClothes);

  function handleClickModal() {
    dispatch(changeisModalOpen(true));
  }

  return (
    <ClosetPage
      filteredClothes={filteredClothes}
      onClickModal={handleClickModal}
    />
  );
}

// const GridContainer = css`
// 	display: grid;
// `;
