/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ClosetSidebar from './ClosetSidebar';
import { season, colors } from '../../constants/filter';

const initialState = {
  'category': '전체',
  'isUserItem': false,
  'selectedSeason': [],
  'selectedColors': [],
  'custom': [],
};
const handleClick = jest.fn();
const seasonHandler = jest.fn();
const colorHandler = jest.fn();
const handleEnter = jest.fn();
const useRefSpy = jest.spyOn(React, "useRef").mockImplementation(() => ({ current: { value: '' } }));
const renderComponent = () => render((
  <ClosetSidebar
    season={season}
    colors={colors}
    selectedColors={initialState.selectedColors}
    isUserItem={initialState.isUserItem}
    toggleIsUserItem={handleClick}
    onChangeSeason={seasonHandler}
    onChangeColor={colorHandler}
    customTags={initialState.custom}
    deleteCustomHandler={handleClick}
    inputRef={useRefSpy}
    onKeyPress={handleEnter}
  />
));

describe('closetSidebar', () => {
  it('renders closetSidebar', () => {
    const { getByText } = renderComponent();

    expect(getByText(/내 옷만 보기/)).not.toBeNull();
    expect(getByText(/season/)).not.toBeNull();
    expect(getByText(/color/)).not.toBeNull();
  });
  it('toggles button', () => {
    const { getByTestId } = renderComponent();
    const toggleElement = getByTestId('toggle');

    fireEvent.click(toggleElement);
    expect(handleClick).toBeCalledTimes(1);
  });
  it('submits custom tag', () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('input');

    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(handleEnter).toBeCalledTimes(1);
  });
  it('clicks checkbox', () => {
    const { getByLabelText, getByTestId } = renderComponent();
    const label = getByLabelText('봄');
    fireEvent.click(label);
    const checkbox = getByTestId('봄');

    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toBeChecked();
    expect(seasonHandler).toBeCalledTimes(1);
  });
  it('clicks color', () => {
    const { getByTestId } = renderComponent();
    const colorBtn = getByTestId('red');

    fireEvent.click(colorBtn);
    expect(colorHandler).toBeCalledTimes(1);
  });
});
