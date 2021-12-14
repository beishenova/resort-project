import {
   FormControl,
   FormControlLabel,
   FormLabel,
   Grid,
   makeStyles,
   Paper,
 } from "@material-ui/core";
 import React, { useState } from "react";
 import Radio from "@material-ui/core/Radio";
 import RadioGroup from "@material-ui/core/RadioGroup";
 import Slider from "@material-ui/core/Slider";
import { useRooms } from "../../contexts/RoomsContext";
 
 const useStyles = makeStyles((theme) => ({
   root: {
     minHeight: "300px",
     padding: theme.spacing(2),
   },
 }));
 
 const Filtration = () => {
   const classes = useStyles();
   const [slider, setSlider] = useState([200, 15000]);
 
   const { fetchByParams } = useRooms();
 
   const handleSlider = (e, value) => {
     setSlider(value);
   };
   const handleFilterPrice = () => {
     fetchByParams("price_lte", slider);
   };
 
   return (
     <Grid item md={3}>
       <Paper
         className={classes.root}
       >
         <Grid>
           <FormControl component="fieldset">
             <FormLabel component="label">Person</FormLabel>
             <RadioGroup
               aria-label="person"
               name="person"
               onChange={(e) => fetchByParams("person", e.target.value)}
             >
               <FormControlLabel value="1" control={<Radio />} label="1" />
               <FormControlLabel value="2" control={<Radio />} label="2" />
               <FormControlLabel value="3" control={<Radio />} label="3" />
               <FormControlLabel value="4" control={<Radio />} label="4" />
               <FormControlLabel value="5" control={<Radio />} label="5" />
               <FormControlLabel value="all" control={<Radio />} label="All" />
             </RadioGroup>
           </FormControl>
         </Grid>
         <Grid>
           <FormControl component="fieldset">
             <FormLabel component="label">Price</FormLabel>
             <RadioGroup
               aria-label="price"
               name="price"
               onChange={(e) => fetchByParams("price", e.target.value)}
             >
               <FormControlLabel
                 value="10000"
                 control={<Radio />}
                 label="до 10000"
               />
                 <FormControlLabel
                   value="12000"
                   control={<Radio />}
                   label="до 12000"
                 />
               <FormControlLabel
                 value="15000"
                 control={<Radio />}
                 label="до 15000"
               />
               <FormControlLabel
                 value="50000"
                 control={<Radio />}
                 label="до 50000"
               />
               <FormControlLabel
                 value="150000"
                 control={<Radio />}
                 label="до 150000"
               />
               <FormControlLabel value="all" control={<Radio />} label="All" />
             </RadioGroup>
           </FormControl>
         </Grid>
         <Grid>
           <Slider
             min={200}
             max={200000}
             value={slider}
             onChangeCommitted={handleFilterPrice}
             onChange={handleSlider}
             valueLabelDisplay="auto"
             aria-labelledby="range-slider"
           />
         </Grid>
       </Paper>
     </Grid>
   );
 };
 
 export default Filtration;
 