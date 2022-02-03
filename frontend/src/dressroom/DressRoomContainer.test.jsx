/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import DressRoomContainer from './DressRoomContainer.jsx';

describe('DressRoomContainer', () => {
  it('renders DressRoomContainer', () => {
    const { getByText } = render((
      <DressRoomContainer />
    ))

    expect(getByText(/드레스룸/)).not.toBeNull();
  });
});
