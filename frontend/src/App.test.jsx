/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App.jsx';

test('App', () => {
  render((
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ));
});
