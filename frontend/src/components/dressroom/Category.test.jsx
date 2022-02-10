/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Category from './Category.jsx';
   
const handleClick = jest.fn();
   
describe('Category', () => {
  it('renders Category', () => {
    const { getByText } = render((
      <Category
        item="전체"
        isSelected={true}
        handleClick={handleClick}
      />
    ));
   
    expect(getByText(/전체/)).not.toBeNull();
    expect(handleClick).not.toBeCalled();
  });
  it('버튼의 value에 적힌 값이 인자로 전달된다.', () => {
    const { getByText } = render((
      <Category
        item="전체"
        isSelected={true}
        handleClick={handleClick}
      />
    ));
   
    const button = getByText('전체');
    fireEvent.click(button);
    expect(handleClick).toBeCalledWith('전체');
  });
});
