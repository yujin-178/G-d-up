/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import Categories from '../categories/Categories.jsx';

describe('Categories', () => {
  it('renders Categories', () => {

    const { getByText } = render((
      <Categories />
    ))

    expect(getByText(/Nav/)).not.toBeNull();
  });
});
