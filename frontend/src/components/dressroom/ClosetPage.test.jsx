/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import { useSelector } from 'react-redux';
import { clothesData } from '../../fixtures/clothesList.js';
import ClosetPage from './ClosetPage';
import { MemoryRouter } from 'react-router-dom';

const mockStore = () => ({
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
    isModalOpen: false,
  }
});

jest.mock('react-redux');

describe('ClosetPage', () => {
  useSelector.mockImplementation((selector) => selector(mockStore()));

  it('renders Closet', () => {
    render((
      <MemoryRouter>
        <ClosetPage />
      </MemoryRouter>
    ));
  });
});
