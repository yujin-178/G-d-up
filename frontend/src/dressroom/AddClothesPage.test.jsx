/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import AddClothesPage from './AddClothesPage.jsx';

describe('AddClothesPage', () => {
  it('renders AddClothesPage', () => {


    const { getByText } = render((
      <AddClothesPage />
    ))

    expect(getByText(/옷 추가/)).not.toBeNull();
  });
});
