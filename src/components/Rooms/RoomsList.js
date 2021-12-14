import { Grid } from '@material-ui/core';
import React from 'react';
import RoomCard from './RoomCard';

const RoomsList = ({ rooms }) => {
  // const cart = JSON.parse(localStorage.getItem('cart')) ?? false;
  return (
    <Grid container spacing={2}>
      {rooms.map((room) => (
        <Grid item xs={3} key={room.id}>
          <RoomCard room={room}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsList;
