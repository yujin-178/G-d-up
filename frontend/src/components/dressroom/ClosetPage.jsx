import React from 'react';
import { Link } from 'react-router-dom';
import ClothesItemListContainer from '../../containers/dressroom/ClothesItemListContainer';
import FilterContainer from '../../containers/dressroom/FilterContainer.jsx';
import AddClothesContainer from '../../containers/dressroom/AddClothesContainer.jsx';
import ClothesDetailContainer from '../../containers/dressroom/ClothesDetailContainer.jsx';
import BackImg from '../../../public/images/add_icon.svg'; 

import { css } from '@emotion/react';

import { DressRoom } from '../dressRoomCss';

export default function ClosetPage({ onClickModal, filteredClothes }) {
  console.log(filteredClothes);

  return (

    <div css={DressRoom}>
      <div css={GridWrapper}>
        <FilterContainer />
        <div>
          <ClothesItemListContainer />
          <img
            css={AddIcon}
            src={BackImg}
            width="100rem"
            onClick={onClickModal}
            alt="추가아이콘"
          />
        </div>
        <ClothesDetailContainer />

        <AddClothesContainer />
        <Link to='/dressroom'>
          <button>
            뒤로
          </button>
        </Link>
      </div>

    </div>

  );
}

const Container = css`
  height: 100%;
`;

const GridContainer = css`

`;

const GridWrapper = css`
  position: relative;
  width: 56rem;
  margin: 10rem 10rem 10rem 10rem;
	display: grid;
  grid-template-columns: 17rem 35rem;
  grid-row-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  grid-auto-columns: minmax(100px, auto);
  background-color: #BFAEA4;
`;

const AddIcon = css`
  position: relative;
  left: 32rem;
  bottom: 5rem;
  &:hover {
    bottom: 5.3rem;
  }
`;
