import { Button, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useRooms } from '../../contexts/RoomsContext';
import './AddRoom.css'

const AddRoom = () => {
   const { addRoom } = useRooms();
   console.log(addRoom)
   const [room, setRoom] = useState({
     title: "",
     image: "",
     description: "",
     price: "",
     person:1,
   });
   const navigate = useNavigate();
 
   const handleChange = (e) => {
     const values = {
       ...room,
       [e.target.name]: e.target.value,
     };
     setRoom(values);
   };
 
   const addNewRoom = async () => {
     if (
       !room.title ||
       !room.image ||
       !room.description ||
       !room.price ||
       !room.person 
      
     ) {
       alert("fill all blanks");
       return;
     }
     await addRoom(room);
     // navigate("/");
   };
   //   console.log(form);
   return (
     <div className="adding">
       <h1>Add new Room</h1>
       <Grid container className="main">
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
               onClick={addNewRoom}
               variant="contained"
               color="secondary"
               className="btn-add"
             >
               Add new room
             </Button>
           </Paper>
         </Grid>
       </Grid>
     </div>
   );
}

export default AddRoom
