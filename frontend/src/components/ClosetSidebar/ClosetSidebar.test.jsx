/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClosetSidebar from './ClosetSidebar.jsx.js';

describe('ClosetSidebar', () => {
  it('renders ClosetSidebar', () => {

    const { getByText } = render((
      <ClosetSidebar />
    ))

    expect(getByText(/Nav/)).not.toBeNull();
  });
});
