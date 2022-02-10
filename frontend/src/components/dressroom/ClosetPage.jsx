import React from 'react';
import { Link } from 'react-router-dom';
import ClothesItemListContainer from '../../containers/dressroom/ClothesItemListContainer';
import FilterContainer from '../../containers/dressroom/FilterContainer.jsx';
import AddClothesContainer from '../../containers/dressroom/AddClothesContainer.jsx';
import ClothesDetailContainer from '../../containers/dressroom/ClothesDetailContainer.jsx';

import { css } from '@emotion/react';

export default function ClosetPage({ onClickModal, filteredClothes }) {
  console.log(filteredClothes);

  return (
    <div css={GridWrapper}>
      <FilterContainer />
      <div>
        <ClothesItemListContainer />
        <button
          onClick={onClickModal}
        >
          옷 추가
        </button>
      </div>
      <ClothesDetailContainer />
      <AddClothesContainer />
      <Link to='/dressroom'>
        <button>
          뒤로
        </button>
      </Link>
    </div>
  );
}

const GridWrapper = css`
	display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;
