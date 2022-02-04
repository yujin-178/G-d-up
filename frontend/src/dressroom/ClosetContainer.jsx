import React from 'react';
import { Link } from 'react-router-dom';
import ClosetItemListContainer from './ClosetItemListContainer.jsx';
import FilterContainer from './FilterContainer/FilterContainer.jsx';

export default function ClosetContainer() {
  return (
    <div>
      <h5>옷장</h5>
      <FilterContainer />
      <ClosetItemListContainer />
      <button>옷 추가</button>
      <Link to='/dressroom'>
        <button>
          뒤로
        </button>
      </Link>
    </div>

  )
}
