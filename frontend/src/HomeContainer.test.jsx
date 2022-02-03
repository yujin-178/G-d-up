/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '@testing-library/react';

import HomeContainer from './HomeContainer.jsx';

describe('HomeContainer', () => {
  it('renders Home Container', () => {
    const { getByText } = render((
      <HomeContainer />
    ));

    expect(getByText(/Home/)).not.toBeNull();
  });
});
