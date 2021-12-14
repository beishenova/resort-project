import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import RoomsContext, { useRooms } from '../../contexts/RoomsContext';
import RoomCard from './RoomCard';

const RoomsFavoriteList = () => {
  // const cart = JSON.parse(localStorage.getItem('cart')) ?? false;

  const { favorite, getFavorite } = useRooms();
  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <Grid container spacing={3} style={{margin: 15}}>
      {favorite &&
        favorite.map((room) => (
          <Grid item xs={4} key={favorite.id}>
            <RoomCard room={room} />
          </Grid>
        ))}
    </Grid>
  );
};

export default RoomsFavoriteList;
