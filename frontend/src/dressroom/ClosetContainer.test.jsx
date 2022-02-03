/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClosetContainer from './ClosetContainer.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('ClosetContainer', () => {
  it('renders ClosetContainer', () => {
    const { getByText } = render((
      <MemoryRouter>
        <ClosetContainer />
      </MemoryRouter>
    ))

    expect(getByText(/옷장/)).not.toBeNull();
    expect(getByText(/옷 추가/)).not.toBeNull();
  });
});
