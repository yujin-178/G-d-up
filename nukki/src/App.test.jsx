/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '@testing-library/react';

import App from './App.jsx';

test('App', () => {
  render((
    <App />
  ));
});
