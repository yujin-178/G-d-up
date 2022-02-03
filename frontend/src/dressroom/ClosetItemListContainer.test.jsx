/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClosetItemListContainer from './ClosetItemListContainer.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('ClosetItemListContainer', () => {
  it('renders ClosetItemListContainer', () => {
    const { getByText } = render((
      <MemoryRouter>
        <ClosetItemListContainer />
      </MemoryRouter>
    ))

    expect(getByText(/목록/)).not.toBeNull();
  });
});