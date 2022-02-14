import React from 'react';
import LaundryModal from '../../components/dressroom/LaundryModal';
import { useDispatch, useSelector } from 'react-redux';

import {
  changelaundryOpen,
  changeSelectedIcon,
  resetlaundry,
} from '../../slices/laundrySlice';
import { range } from 'lodash';

export default function laundryModalContainer({ images }) {
  const dispatch = useDispatch();
  const laundry = useSelector(state => state.laundrySlice);
  const { laundryOpen, selectedIcon } = laundry;

  const laundryLabel =
    [
      { 'kind': '물세탁', 'range': range(1, 8) },
      { 'kind': '표백', 'range': range(8, 14) },
      { 'kind': '다림질', 'range': range(14, 21) },
      { 'kind': '드라이클리닝', 'range': range(21, 25) },
      { 'kind': '건조', 'range': range(25, 33) }
    ];

  function handleLaundryOpen(value) {
    dispatch(changelaundryOpen(value));
  }

  function handleSelectedIcon(num) {
    dispatch(changeSelectedIcon(num));
  }

  function saveLaundry() {
    dispatch(changelaundryOpen(false));
    // 백엔드 요청 보내기
  }

  function handleresetLaundry(){
    dispatch(resetlaundry());
  }

  return (
    <div>
      <LaundryModal
        laundryOpen={laundryOpen}
        handleLaundry={handleLaundryOpen}
        iconSelect={handleSelectedIcon}
        selectedIcon={selectedIcon}
        laundryLabel={laundryLabel}
        saveLaundry={saveLaundry}
        images={images}
        resetlaundry={handleresetLaundry}
      />
    </div>
  );
}
