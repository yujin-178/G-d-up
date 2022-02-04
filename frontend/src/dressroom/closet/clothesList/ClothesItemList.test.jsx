/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClothesItemList from './ClothesItemList.jsx';

describe('ClothesItemList', () => {
  it('renders ClothesItemList', () => {
    render(
      <ClothesItemList />
    )
  });
});
