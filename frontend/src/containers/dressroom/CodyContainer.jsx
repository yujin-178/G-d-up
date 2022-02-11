import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodyCreateForm from '../../components/dressroom/CodyCreateForm';
import { resetFilter } from '../../slices/filterSlice';

export default function CodyContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <h1>CodyContainer</h1>
      <button onClick={() => {
        dispatch(resetFilter());
        navigate('/dressroom');
      }}>
        드레스룸으로 돌아가기
      </button>
      <CodyCreateForm />
    </>
  );
}
