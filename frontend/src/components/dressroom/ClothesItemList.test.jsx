/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClothesItemList from './ClothesItemList.jsx';
import { clothesData } from '../../fixtures/clothesList';

describe('ClothesItemList', () => {
  const clothes = {
    clothes: clothesData,
    selectedClothes: clothesData[0],
    loading: false,
    error: null,
  };

  it('renders ClothesItemList', () => {
    render(
      <ClothesItemList 
        clothes={clothes}
      />
    );
  });
});
