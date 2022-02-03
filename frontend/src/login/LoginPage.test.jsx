/**
 * @jest-environment jsdom
 */

import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from './LoginPage.jsx';

describe('LoginPage', () => {
  const handleChangeEmail = jest.fn();
  const handleChangePassword = jest.fn();
  const handleClickLogin = jest.fn();

  function renderLoginPage() {
    return render((
      <MemoryRouter>
        <LoginPage 
          onChangeEmail={handleChangeEmail}
          onClickLogin={handleClickLogin}
          onChangePassword={handleChangePassword}
        />
      </MemoryRouter>
    ));
  }

  it('renders Login Page', () => {
    const { getByText, getByLabelText } = renderLoginPage();

    expect(getByText('로그인')).not.toBeNull();
    expect(getByLabelText('email')).not.toBeNull();
    expect(getByLabelText('password')).not.toBeNull();
  });

  it('changes email field', () => {
    const { getByLabelText } = renderLoginPage();

    fireEvent.change(getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });

    expect(handleChangeEmail).toBeCalled();
  });

  it('changes password field', () => {
    const { getByLabelText } = renderLoginPage();

    fireEvent.change(getByLabelText('password'), {
      target: { value: 'passwordExample' },
    });

    expect(handleChangePassword).toBeCalled();
  });

  it('renders login button', () => {
    const { getByText } = renderLoginPage();

    fireEvent.click(getByText('로그인'));

    expect(handleClickLogin).toBeCalled();
  });
});
