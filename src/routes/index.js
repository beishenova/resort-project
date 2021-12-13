import React from 'react';
import { Route, Routes } from 'react-router';
import AuthPage from '../pages/AuthPage';
import AddRoomPage from '../pages/AddRoomPage';
import CartPage from '../pages/CartPage';
import MainPage from '../pages/MainPage';
import Room from '../pages/Room';
import EditRoomPage from '../pages/EditRoomPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/addRoom" element={<AddRoomPage />} />
      <Route path="/room/:id" element={<Room />} />
      <Route path="/edit/:id" element={<EditRoomPage/>}/> 
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
