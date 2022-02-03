/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '@testing-library/react';

import HomePage from './HomePage.jsx';

describe('HomePage', () => {
  it('renders Home Page', () => {
    const { getByText } = render((
      <HomePage />
    ));

    expect(getByText(/Home/)).not.toBeNull();
  });
});
