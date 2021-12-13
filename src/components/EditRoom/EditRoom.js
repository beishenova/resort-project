import { Button, Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRooms } from '../../contexts/RoomsContext';

const EditRoom = () => {
  const { roomDetails, fetchOneRoom, editRoom } = useRooms();
  const [room, setRoom] = useState({
    title: '',
    image: '',
    price: 0,
    description: '',
    person: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneRoom(id);
  }, []);

  useEffect(() => {
    if (roomDetails) {
      setRoom({
        title: roomDetails.title,
        image: roomDetails.image,
        price: roomDetails.price,
        description: roomDetails.description,
        person: roomDetails.person,
      });
    }
  }, [roomDetails]);

  const handleChange = (e) => {
    const values = {
      ...room,
      [e.target.name]: e.target.value,
    };
    setRoom(values);
  };

  const handleSubmit = async () => {
    if (
      !room.title ||
      !room.image ||
      !room.price ||
      !room.description ||
      !room.person
    ) {
      alert('Все поля должны быть заполнены!');
      return;
    }
    await editRoom({ ...room, id });
    navigate('/');
  };
  return (
    roomDetails && (
      <div className="adding">
        {/* <h1>Edit your room</h1> */}
        <Grid container className="main" onSubmit={handleSubmit}>
          <Grid item md={5}>
            <Paper elevation={5} className="paper">
              <form className="inp">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={room.title}
                  onChange={handleChange}
                />
                <textarea
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={room.description}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Image"
                  name="image"
                  value={room.image}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={room.price}
                />
                <input
                  type="number"
                  placeholder="For how many persons?"
                  name="person"
                  value={room.person}
                  onChange={handleChange}
                />
              </form>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                className="btn-add"
              >
                Edit room
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  );
};

export default EditRoom;
