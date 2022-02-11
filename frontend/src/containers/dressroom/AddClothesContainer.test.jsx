/**
 * @jest-environment jsdom
 */

// import React from 'react';

// import AddClothesContainer from './AddClothesContainer.jsx';
// import { render } from "@testing-library/react";

import { useSelector, useDispatch } from 'react-redux';

jest.mock('react-redux');

describe('AddClothesContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(()=> dispatch);
  useSelector.mockImplementation((selector)=> selector({
    isModalOpen : true,
  }) || {});

  it('handleModal function well', ()=> {
    // const handleModal = jest.fn();

    // const { getByText, container } = render((
    //   <AddClothesContainer />
    // ));

    // const xbtn = screen.getByRole('button', {name: /x/i})
    // fireEvent.click(xbtn);
    // expect(dispatch).toBeCalledWith({
    // 	type:'handleModal',
    // });

  });
});
