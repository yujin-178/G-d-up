/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import FilterContainer from './FilterContainer.jsx';
import { useSelector } from 'react-redux';
 
jest.mock('react-redux');
const initialState = {
  category: '전체',
  isUserItem: false,
  selectedSeason: [],
  selectedColors: [],
  custom: [],
};
 
const store = {
  filterSlice: {
    ...initialState
  }
};
 
describe('FilterContainer', () => {
  it('renders FilterContainer', () => {
 
    useSelector.mockImplementation((selector) => selector(store));
 
    const { getByText, getAllByLabelText } = render((
      <FilterContainer />
    ));
 
    expect(getByText(/전체/)).not.toBeNull();
    expect(getByText(/상의/)).not.toBeNull();
    expect(getAllByLabelText(/봄/)).not.toBeNull();
  });
});
