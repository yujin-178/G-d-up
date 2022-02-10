import React from 'react';
import { Link } from 'react-router-dom';
import ClothesItemListContainer from '../../containers/dressroom/ClothesItemListContainer';
import FilterContainer from '../../containers/dressroom/FilterContainer.jsx';
import AddClothesContainer from '../../containers/dressroom/AddClothesContainer.jsx';
import ClothesDetailContainer from '../../containers/dressroom/ClothesDetailContainer.jsx';

// import { css, jsx } from '@emotion/react';

export default function ClosetPage({ onClickModal, filteredClothes }) {
  console.log(filteredClothes);

  return (
    <div>
      <h5>옷장</h5>
      <FilterContainer />
      <ClothesItemListContainer />
      <ClothesDetailContainer />
      <button
        onClick={onClickModal}
      >
				옷 추가
      </button>
      <AddClothesContainer />
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
