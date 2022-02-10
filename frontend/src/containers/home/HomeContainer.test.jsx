/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomeContainer from './HomeContainer.jsx';

describe('HomeContainer', () => {
  it('renders Home Container', () => {
    const { getByText } = render((
      <MemoryRouter>
        <HomeContainer />
      </MemoryRouter>
    ));

    expect(getByText(/Home/)).not.toBeNull();
  });
});
