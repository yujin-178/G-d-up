/**
 * @jest-environment jsdom
 */

import React from 'react';

import { useDispatch } from 'react-redux';

import { fireEvent, render } from "@testing-library/react";

import LoginContainer from './LoginContainer.jsx';

jest.mock('react-redux');

beforeEach(() => {
  jest.clearAllMocks()
});

describe('LoginContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch)

  it('renders Login Page', () => {
    render(
      <LoginContainer />
    );
  });

  it('changes Login field', () => {
    const { getByLabelText } = render(
      <LoginContainer />
    );

    fireEvent.change(getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });

    expect(dispatch).toBeCalled();
  });
  
  it('changes password field', () => {
    const { getByLabelText } = render(
      <LoginContainer />
    );

    fireEvent.change(getByLabelText('password'), {
      target: { value: 'passwordExample' },
    });

    expect(dispatch).toBeCalled();
  });

  // it('does login', () => {
  //   const { getByLabelText } = render(
  //     <LoginContainer />
  //   );

  //   fireEvent.click(getByLabelText('email'), {
  //     target: { value: 'test@example.com' },
  //   });

  //   expect(dispatch).toBeCalled();
  // });
});
