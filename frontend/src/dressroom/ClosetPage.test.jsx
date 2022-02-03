/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClosetPage from './ClosetPage.jsx';

describe('ClosetPage', () => {
  it('renders ClosetPage', () => {
    const { getByText } = render((
      <ClosetPage />
    ))

    expect(getByText(/옷장/)).not.toBeNull();
    expect(getByText(/옷 추가/)).not.toBeNull();
  });
});
