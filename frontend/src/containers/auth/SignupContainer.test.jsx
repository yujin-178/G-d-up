/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from "@testing-library/react";

import { useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; 

import SignupContainer from './SignupContainer.jsx';

jest.mock('react-redux');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SignupContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  it('renders SignupContainer page', () => {
    const { getByLabelText, getByText } = render((
      <MemoryRouter>
        <SignupContainer />
      </MemoryRouter>
    ));

    expect(getByLabelText('email')).not.toBeNull();
    expect(getByLabelText('password')).not.toBeNull();
    expect(getByText('가입')).not.toBeNull();
  });

  it('changes email input field', () => {
    const { getByLabelText } = render((
      <MemoryRouter>
        <SignupContainer />
      </MemoryRouter>
    ));

    fireEvent.change(getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });

    expect(dispatch).toBeCalled();
  });

  it('changes password input field', () => {
    const { getByLabelText } = render((
      <MemoryRouter>
        <SignupContainer />
      </MemoryRouter>
    ));

    fireEvent.change(getByLabelText('password'), {
      target: { value: 'passwordExample' },
    });

    expect(dispatch).toBeCalled();
  });

  it('slices username', () => {
    const email = 'ssafy@gmail.com';
    const nickname = email.slice(0, email.indexOf('@'));
    expect(nickname).toBe('ssafy');
  });
});
