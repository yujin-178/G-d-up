/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import ClothesItem from './ClothesItem.jsx';
 
describe('ClothesItem', () => {
  it('renders ClothesItem', () => {
    render(
      <ClothesItem />
    );
  });
});
