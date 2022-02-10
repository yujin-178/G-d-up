/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClosetPage from './ClosetPage';
        
describe('ClosetPage', () => {
  it('renders Closet', () => {
    render((
      <CategoryPage />
    ));
  });
});
