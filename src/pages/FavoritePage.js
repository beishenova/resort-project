import React, { useEffect } from 'react';
import RoomsFavoriteList from '../components/Rooms/RoomsFavoriteList';
import RoomsContext from '../contexts/RoomsContext';
import MainLayout from '../layouts/MainLayout';

const FavoritePage = () => {
  return (
    <RoomsContext>
      <MainLayout>
        <RoomsFavoriteList />
      </MainLayout>
    </RoomsContext>
  );
};

export default FavoritePage;
