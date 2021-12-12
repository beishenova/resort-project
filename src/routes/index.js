import { Room } from '@material-ui/icons'
import React from 'react'
import { Route, Routes } from 'react-router'
import AddRoom from '../components/AddRoom/AddRoom'
import AuthPage from '../pages/AuthPage'
import CartPage from '../pages/CartPage'
import MainPage from '../pages/MainPage'

const AppRoutes = () => {
   return (
   <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/register" element={<AuthPage />} />
      <Route path="/addRoom" element={<AddRoom />} />
      <Route path="/room/:id" element={<Room />} />
      <Route path="/cart" element={<CartPage />} />
   </Routes>
   )
}

export default AppRoutes
