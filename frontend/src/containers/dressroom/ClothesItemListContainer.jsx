import React from 'react';

import ClothesItemList from '../../components/dressroom/ClothesItemList';
import { useSelector, useDispatch } from 'react-redux';

import { setClothes, selectClothes, setUserName } from '../../slices/clothesSlice';
import { debounce } from "lodash";
import { useEffect } from 'react';
import { filteredClothesSelector } from '../../filterSelector';
import { css } from "@emotion/react";

export default function ClothesItemListContainer() {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.clothesSlice);

  useEffect(() => {
    if (userName === '익명' && localStorage.getItem('friendName')) {
      const userName = localStorage.getItem('friendName');
      dispatch(setUserName(userName));
      dispatch(setClothes(userName));
    } else if (userName !== '익명'){
      dispatch(setClothes(userName));
    }
  }, []);

  const { selectedClothes } = useSelector(state => state.clothesSlice);
  const filteredClothes = useSelector(state => filteredClothesSelector(state));

  const onMouseOverHandler = debounce(clothes => {
    if (selectedClothes.clothing.clothingId !== clothes.clothing.clothingId) {
      dispatch(selectClothes(clothes));
    }
  }, 250);

  const OnMouseLeaveHandler = () => {
    onMouseOverHandler.cancel();
  };

  return (
    <div css={ImageContainer}>
      <ClothesItemList
        filteredClothes={filteredClothes}
        onMouseOverHandler={onMouseOverHandler}
        OnMouseLeaveHandler={OnMouseLeaveHandler}
      />
    </div>
  );
}

const ImageContainer = css`
 height: 100%;
 width: 100%;
`;
