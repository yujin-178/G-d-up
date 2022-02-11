/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClothesDetailContainer from './ClothesDetailContainer';
import { MemoryRouter } from 'react-router-dom';
import { clothesData } from '../../fixtures/clothesList';
import { useSelector } from 'react-redux';
const mockStore= () => ({
  clothesSlice: {
    clothes: [clothesData],
    selectedClothes: clothesData[0],
    loading: false,
    error: null,
  },
});

jest.mock('react-redux');
useSelector.mockImplementation((selector) => selector(mockStore()));

describe('ClosetDetailContainer', () => {
  it('renders ClosetDetailContainer', () => {
    const { getByText } = render((
      <MemoryRouter>
        <ClothesDetailContainer />
      </MemoryRouter>
    ));

    expect(getByText(/옷 정보/)).not.toBeNull();
  });
});
