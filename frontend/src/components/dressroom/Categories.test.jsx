/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import Categories from './Categories.jsx';
import { categories } from '../../constants/filter.js';
 
const handleClick = jest.fn();
 
describe('Categories', () => {
  it('renders Categories', () => {
    render((
      <Categories
        categories={categories}
        selectedCategory={'전체'}
        handleClick={handleClick}
      />
    ));
 
    expect(categories).toHaveLength(6);
    expect(categories).toContain("상의");
    expect(categories).not.toContain("자켓");
  });
});
