import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from './App.jsx';

import store from './store.js';

console.log('hiddddd');

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('app'),
);

