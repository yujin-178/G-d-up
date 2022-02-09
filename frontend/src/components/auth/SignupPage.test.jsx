/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import SignupPage from './SignupPage.jsx';

describe('SignupPage', () => {
  const handleChangeEmail = jest.fn();
  const handleChangePassword = jest.fn();
  const handleClickSubmit = jest.fn();

  function renderSignup() {
    return render((
      <MemoryRouter>
        <SignupPage
          onChangeEmail={handleChangeEmail}
          onChangePassword={handleChangePassword}
          onClickSubmit={handleClickSubmit}
        />
      </MemoryRouter>
    ));
  }

  it('renders Signup page', () => {
    const { getByLabelText, getByText } = renderSignup();

    expect(getByLabelText('email')).not.toBeNull();
    expect(getByLabelText('password')).not.toBeNull();
    expect(getByText('가입')).not.toBeNull();
  });

  it('changes email field', () => {
    const { getByLabelText } = renderSignup();

    fireEvent.change(getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });
    expect(handleChangeEmail).toBeCalled();
  });

  it('changes password field', () => {
    const { getByLabelText } = renderSignup();

    fireEvent.change(getByLabelText('password'), {
      target: { value: 'passwordExample' },
    });
    expect(handleChangePassword).toBeCalled();
  });

  it('submits email and password', () => {
    const { getByText } = renderSignup();

    fireEvent.click(getByText('가입'));
    expect(handleClickSubmit).toBeCalled();
  });
});
