import React from 'react';
import ClothesItemListContainer from '../../containers/dressroom/ClothesItemListContainer';
import FilterContainer from '../../containers/dressroom/FilterContainer.jsx';
import AddClothesContainer from '../../containers/dressroom/AddClothesContainer.jsx';
import ClothesDetailContainer from '../../containers/dressroom/ClothesDetailContainer.jsx';

import { css } from '@emotion/react';
import dressroomBackground from "../../../public/images/dressroombackground.jpg";

import { Link } from 'react-router-dom';

export default function ClosetPage({ filteredClothes, goBackHandler }) {
  console.log(filteredClothes);

  return (
    <div css={DressRoom}>
      <div css={Closet} id="cody">
        <div css={ItemsGridWrapper}>
          <FilterContainer />
          <div css={ItemListStyle} >
            <ClothesItemListContainer />
          </div>
          <AddClothesContainer />
        </div>
        <ClothesDetailContainer />
        <div css={BackBtnContainer}>
          <Link to='/dressroom'>
            <button
              css={BackBtn}
              onClick={goBackHandler}
              className="hvr-fade"
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </div >
  );
}

const BackBtnContainer = css`
  display: flex;
  align-items: end;
  justify-content: end;
  margin-bottom : 20px;
`;

const DressRoom = css`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${dressroomBackground});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const Closet = css`
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 80rem;
  height: 80%;
  vertical-align: middle;
  margin-top: 3%;
`;

const BackBtn = css`
  position: absolute;
  right: 10rem;
  bottom: 35px;
  width: 90px;
  height: 40px;
  background-color: white;
  color: white;
  border: 1.5px solid white;
  background-color: #2E2E2E;
  cursor: pointer;
`;

const ItemsGridWrapper = css`
  position: relative;
  width: 62%;
  max-width: 50rem;
  height: 100%;
  margin: 2.5rem auto;
	display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 12% 88%;
  grid-auto-rows: minmax(100px, auto);
  grid-auto-columns: minmax(100px, auto);
  background-color: #BFAEA4;
`;

const ItemListStyle = css`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  width: 90%;
  height: 96%;
  margin: 1rem 1rem;
`;
