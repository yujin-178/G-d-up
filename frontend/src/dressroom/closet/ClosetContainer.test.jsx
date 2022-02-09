/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClosetContainer from './ClosetContainer.jsx';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clothesData } from '../../../fixtures/clothesList.js';

const mockStore= () => ({
  clothesSlice: {
    clothes: [clothesData],
    selectedClothes: clothesData[0],
    loading: false,
    error: null,
  },
  filterSlice: {
    category: '전체',
    isUserItem: false,
    selectedSeason: [],
    selectedColors: [],
    custom: [],
  },
  modalSlice: {
    isModalOpen : false,
  }
});

jest.mock('react-redux');

describe('ClosetContainer', () => {
  it('renders ClosetContainer', () => {
    useSelector.mockImplementation((selector) => selector(mockStore()));
    const { getByText } = render((
      <MemoryRouter>
        <ClosetContainer />
      </MemoryRouter>
    ));

    expect(getByText(/옷장/)).not.toBeNull();
    expect(getByText(/옷 추가/)).not.toBeNull();
  });
});
