import React from 'react';
import { Link } from 'react-router-dom';
import CodyCreateForm from '../../components/codyCreateForm/CodyCreateForm';

export default function CodyContainer() {
  return (
    <>
      <h1>CodyContainer</h1>
      <Link to='/dressroom'>
        <button>
          드레스룸으로 돌아가기
        </button>
      </Link>
      <CodyCreateForm />
    </>
  );
}
