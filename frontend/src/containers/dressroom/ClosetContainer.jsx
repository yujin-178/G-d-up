import React from 'react';
import { Link } from 'react-router-dom';
import ClothesItemListContainer from './ClothesItemListContainer.jsx';
import FilterContainer from './FilterContainer.jsx';
import AddClothesContainer from './AddClothesContainer.jsx';
import ClothesDetailContainer from './ClothesDetailContainer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { filteredClothesSelector } from '../../filterSelector';
// import { css, jsx } from '@emotion/react';

import {
  changeisModalOpen
} from '../../slices/modalSlice';

export default function ClosetContainer() {
  const dispatch = useDispatch();
  const filteredClothes = useSelector(state => filteredClothesSelector(state));
  console.log(filteredClothes);

  return (
    <div>
      <h5>옷장</h5>
      <FilterContainer />
      <ClothesItemListContainer />
      <ClothesDetailContainer />
      <button
        onClick={() => dispatch(changeisModalOpen(true))}
      >
				옷 추가
      </button>
      <AddClothesContainer
      />
      <Link to='/dressroom'>
        <button>
					뒤로
        </button>
      </Link>
    </div>
  );
}

// const GridContainer = css`
// 	display: grid;
// `;
