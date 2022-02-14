import React from 'react';
import CodyDetailModal from '../../components/dressroom/CodyDetailModal';
import { useDispatch, useSelector } from 'react-redux';

import {
  setisdetailOpen,
} from '../../slices/codySlice';

export default function CodyDetailContainer() {
  const dispatch = useDispatch();
  const cody = useSelector(state => state.codySlice);
  const { selectedCody ,isdetailOpen } = cody;

  function handleCodyDetailOpen(value) {
    dispatch(setisdetailOpen(value));
  }

  return (
    <div>
      <CodyDetailModal
        isdetailOpen={isdetailOpen}
        handleCodyDetailOpen={handleCodyDetailOpen}
        selectedCody={selectedCody}
      />
    </div>
  );
}
