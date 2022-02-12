import React from 'react';
import { Link } from 'react-router-dom';

export default function CodyContainer() {
  return (
    <>
      <h1>codyListContainer</h1>
      <Link to='/cody'>
        <button>
          새 코디 만들기
        </button>
      </Link>
    </>
  );
}
