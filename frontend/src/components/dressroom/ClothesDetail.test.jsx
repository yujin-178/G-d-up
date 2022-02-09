/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ClothesDetail from './ClothesDetail';
import { season } from '../../constants/filter';

const selectedClothes = {
  id: 1,
  image: 'https://image.msscdn.net/images/goods_img/20180619/803523/803523_1_500.jpg',
  category: '상의',
  color: 'black',
  material: '면',
  pattern: '기타',
  season: '여름',
  custom: ['여름', '데일리'],
  laundry: 'information',
  userName: 11,
};

const deleteHandler = jest.fn();

const renderComponent = () => render((
  <ClothesDetail
    selectedClothes={selectedClothes}
    deleteHandler={() => deleteHandler(selectedClothes.id)}
    allSeason={season}
  />
));

describe('clothesDetail', () => {
  it('renders clothesDetail', () => {
    const { getByText } = renderComponent();

    expect(getByText(/옷 정보/)).not.toBeNull();
  });
  it('delete button', () => {
    const { getByText } = renderComponent();

    const deleteBtn = getByText('삭제');
    fireEvent.click(deleteBtn);
    expect(deleteHandler).toHaveBeenCalled();
    expect(deleteHandler).toHaveBeenCalledWith(1);
  });
});
