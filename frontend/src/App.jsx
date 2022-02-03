import React from 'react';
import HomePage from './HomePage.jsx';
import LoginContainer from './login/LoginContainer.jsx';
import SignupContainer from './signup/SignupContainer.jsx';

import DressRoomPage from './dressroom/DressRoomPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  const { location: { pathname } } = window;
  
  // const MyComponent = {
  //   '/': HomePage,
  //   '/signup': SignupContainer,
  //   '/login': LoginContainer,
  // }[pathname];


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dressroom" element={<DressRoomPage />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/signup" element={<SignupContainer />} />
        </Routes>
    </BrowserRouter>
  );
}
