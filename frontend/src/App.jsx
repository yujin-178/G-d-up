import React from 'react';
import HomeContainer from './containers/home/HomeContainer';
import LoginContainer from './containers/auth/LoginContainer.jsx';
import SignupContainer from './containers/auth/SignupContainer.jsx';
import ClosetContainer from './containers/dressroom/ClosetContainer.jsx';
import AddClothesContainer from './containers/dressroom/AddClothesContainer.jsx';
import DressRoomContainer from './containers/dressroom/DressRoomContainer';
import CodyContainer from './containers/dressroom/CodyContainer';
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
