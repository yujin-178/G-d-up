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
    const { getByText, getAllByText } = render((
      <MemoryRouter>
        <ClothesItemListContainer />
      </MemoryRouter>
    ));

    expect(getByText(/목록/)).not.toBeNull();
    expect(getAllByText(/image/)).not.toBeNull();
  });
});
