/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import DressRoomContainer from './DressRoomContainer.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('DressRoomContainer', () => {
  it('renders DressRoomContainer', () => {
    const { getByText } = render((
      <MemoryRouter>
        <DressRoomContainer />
      </MemoryRouter>
    ));

    expect(getByText(/드레스룸/)).not.toBeNull();
  });
});
