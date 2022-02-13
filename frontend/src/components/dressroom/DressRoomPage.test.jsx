/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import DressRoomPage from './DressRoomPage.jsx';
import { MemoryRouter } from 'react-router-dom';
 
describe('DressRoomPage', () => {
  it('renders DressRoomPage', () => {
    const { getByText } = render((
      <MemoryRouter>
        <DressRoomPage />
      </MemoryRouter>
    ));
 
    expect(getByText(/드레스룸/)).not.toBeNull();
  });
});
