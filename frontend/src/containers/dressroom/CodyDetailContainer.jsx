import React from 'react';
import CodyDetailModal from '../../components/dressroom/CodyDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  setisdetailOpen,
  changeCodyEdit,
} from '../../slices/codySlice';

import {
  changeisResOpen,
  changeResText
} from '../../slices/modalSlice';

export default function CodyDetailContainer() {
  const dispatch = useDispatch();
  const cody = useSelector(state => state.codySlice);
  const { iscodyEdit, selectedCody, isdetailOpen } = cody;

  const modal = useSelector(state => state.modalSlice);
  const { isResOpen, resText } = modal;

  function handleCodyDetailOpen(value) {
    dispatch(setisdetailOpen(value));
  }

  function handleCodyEdit(value) {
    dispatch(changeCodyEdit(value));
  }

  function handleResponse(value) {
    dispatch(changeisResOpen(value));
    dispatch(setisdetailOpen(value));
  }

  function deleteByCodyId(codyId) {
    dispatch(changeisResOpen(true));
    axios.delete(`http://i6b108.p.ssafy.io:8000/cody/delete/${codyId}`)
      .then((res) => {
        dispatch(changeResText(`${res.data.data} 번 ${res.data.message}`));
      })
      .catch((err) => {
        dispatch(changeResText(err.data.message));
      });
  }

  return (
    <div>
      <CodyDetailModal
        isdetailOpen={isdetailOpen}
        handleCodyDetailOpen={handleCodyDetailOpen}
        selectedCody={selectedCody}
        handleCodyEdit={handleCodyEdit}
        iscodyEdit={iscodyEdit}
        deleteCody={deleteByCodyId}
        isResOpen={isResOpen}
        resText={resText}
        handleResponse={handleResponse}
      />
    </div>
  );
}
