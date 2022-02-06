/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClothesItemListContainer from './ClothesItemListContainer.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('ClothesItemListContainer', () => {
  it('renders ClothesItemListContainer', () => {
    const { getByText } = render((
      <MemoryRouter>
        <ClothesItemListContainer />
      </MemoryRouter>
    ))

    expect(getByText(/목록/)).not.toBeNull();
  });
});
