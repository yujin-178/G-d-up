import React from 'react';
import { Link } from 'react-router-dom';
import ClothesItemListContainer from '../../containers/dressroom/ClothesItemListContainer';
import FilterContainer from '../../containers/dressroom/FilterContainer.jsx';
import AddClothesContainer from '../../containers/dressroom/AddClothesContainer.jsx';
import ClothesDetailContainer from '../../containers/dressroom/ClothesDetailContainer.jsx';
import BackImg from '../../../public/images/add_icon.svg';

import { css } from '@emotion/react';

export default function ClosetPage({ onClickModal, filteredClothes }) {
  console.log(filteredClothes);

  return (
    <div css={DressRoom}>
      <div css={Closet}>
        <div css={ItemsGridWrapper}>
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
            <Link to='/dressroom'>
              <button>
                뒤로
              </button>
            </Link>
          </div>
          <AddClothesContainer />
        </div>
        <ClothesDetailContainer />
      </div>
    </div>

  );
}

const DressRoom = css`
  display: flex;
  justify-content: center;
  margin: 10rem auto;
  width: 85rem;
  height: 50rem;
  background-image: url("/images/dressroombackground.jpg");
  background-size: cover;
  background-position: center;
`;

const Closet = css`
  display: flex;
  justify-content: center;
  width: 80%;
`;

const GridContainer = css`

`;

const ItemsGridWrapper = css`
  position: relative;
  width: 80%;
  height: 90%;
  margin: 2.5rem auto;
	display: grid;
  grid-template-columns: 33% 67%;
  grid-auto-rows: minmax(100px, auto);
  grid-auto-columns: minmax(100px, auto);
  background-color: #BFAEA4;
`;

const AddIcon = css`
  position: relative;
  left: 20rem;
  bottom: 4rem;
  &:hover {
    bottom: 4.3rem;
  }
`;
