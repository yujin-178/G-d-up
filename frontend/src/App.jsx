import React from 'react';
import HomeContainer from './HomeContainer.jsx';
import LoginContainer from './login/LoginContainer.jsx';
import SignupContainer from './signup/SignupContainer.jsx';
import ClosetContainer from './dressroom/closet/ClosetContainer.jsx';
import AddClothesContainer from './dressroom/closet/AddClothesContainer.jsx';
import DressRoomContainer from './dressroom/DressRoomContainer';
import CodyContainer from './dressroom/cody/CodyContainer.jsx';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeContainer />} />
      <Route path="/dressroom" element={<DressRoomContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/closet" element={<ClosetContainer />} />
      <Route path="/cloth" element={<AddClothesContainer />} />
      <Route path="/cody" element={<CodyContainer />} />
    </Routes>
  );
}
