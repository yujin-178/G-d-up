/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import DressRoomPage from './DressRoomPage.jsx';

describe('DressRoomPage', () => {
  it('renders DressRoomPage', () => {
    const { getByText } = render((
      <DressRoomPage />
    ))

    expect(getByText(/드레스룸/)).not.toBeNull();
  });
});
