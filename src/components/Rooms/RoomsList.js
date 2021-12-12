import { Grid } from "@material-ui/core";
import React from "react";
import RoomCard from "./RoomCard";


const RoomsList = ({ rooms }) => {
  const cart = JSON.parse(localStorage.getItem("cart")) ?? false;
  return (
    <Grid container spacing={3}>
      {rooms.map((room) => (
        <Grid item xs={4} key={room.id}>
          <RoomCard room={room} cart={cart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsList;
