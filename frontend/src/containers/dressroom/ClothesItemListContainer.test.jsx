/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClothesItemListContainer from './ClothesItemListContainer.jsx';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clothesData } from '../../../fixtures/clothesList';

jest.mock('react-redux');

const renderClothesItemListContainer = () => {
  render((
    <MemoryRouter>
      <ClothesItemListContainer />
    </MemoryRouter>
  ));
};

describe('ClothesItemListContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    clothesSlice: {
      clothes: clothesData,
      selectedClothes: clothesData[0],
      loading: false,
      error: null,
    }
  }));
  
  it('renders ClothesItemListContainer', () => {
    const { getAllByText } = renderClothesItemListContainer();

    expect(getAllByText(/image/)).not.toBeNull();
  });

  it('loads ClothesItemList', () => {
    const { getAllByText } = render((
      <MemoryRouter>
        <ClothesItemListContainer />
      </MemoryRouter>
    ));

    expect(getAllByText(/image/)).not.toBeNull();
  });
});
