/**
 * @jest-environment jsdom
 */

import React from 'react';

import { useDispatch } from 'react-redux';

import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import LoginContainer from './LoginContainer';

jest.mock('react-redux');

beforeEach(() => {
  jest.clearAllMocks()
});

function renderLogin() {
  return render((
    <MemoryRouter>
      <LoginContainer />
    </MemoryRouter>
  ));
}

describe('LoginContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch)

  it('renders Login Page', () => {
    renderLogin();
  });

  it('changes Login field', () => {
    const { getByLabelText } = renderLogin();

    fireEvent.change(getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });

    expect(dispatch).toBeCalled();
  });
  
  it('changes password field', () => {
    const { getByLabelText } = renderLogin();

    fireEvent.change(getByLabelText('password'), {
      target: { value: 'passwordExample' },
    });

    expect(dispatch).toBeCalled();
  });
});
