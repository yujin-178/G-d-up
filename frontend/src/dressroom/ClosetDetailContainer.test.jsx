/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClosetDetailContainer from './ClosetDetailContainer.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('ClosetDetailContainer', () => {
  it('renders ClosetDetailContainer', () => {
    const { getByText } = render((
      <MemoryRouter>
        <ClosetDetailContainer />
      </MemoryRouter>
    ))

    expect(getByText(/상세정보/)).not.toBeNull();
  });
});
