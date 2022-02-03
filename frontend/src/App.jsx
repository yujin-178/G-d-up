import React from 'react';
import HomeContainer from './HomeContainer.jsx';
import LoginContainer from './login/LoginContainer.jsx';
import SignupContainer from './signup/SignupContainer.jsx';

import DressRoomContainer from './dressroom/DressRoomContainer.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/dressroom" element={<DressRoomContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/signup" element={<SignupContainer />} />
        </Routes>
    </BrowserRouter>
  );
}
