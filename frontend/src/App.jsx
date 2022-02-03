import React from 'react';
import HomePage from './HomePage.jsx';
import LoginContainer from './login/LoginContainer.jsx';
import SignupContainer from './signup/SignupContainer.jsx';

export default function App() {
  const { location: { pathname } } = window;
  
  const MyComponent = {
    '/': HomePage,
    '/signup': SignupContainer,
    '/login': LoginContainer,
  }[pathname];

  return (
    <div>
      <MyComponent />
    </div>
  );
}
