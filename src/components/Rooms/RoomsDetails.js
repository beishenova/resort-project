import { Grid, Paper, makeStyles, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import MySpinner from "../../shared/MySpinner";
import {
  ImageWithZoom,
  Slider,
  CarouselProvider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { grey, lightGreen } from "@material-ui/core/colors";
import { useRooms } from "../../contexts/RoomsContext";

const useStyles = makeStyles((theme) => ({
  custom_container: {
    marginTop: "0",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    textAlign: "left",
    backgroundColor: "honeydew",
    minHeight: "400px",
  },
}));

const RoomsDetails = () => {
  const { fetchOneRoom, roomDetails, deleteRoom } = useRooms();
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    fetchOneRoom(id);
  }, [id]);

  const handleRedirectAfterDelete = () => {
    deleteRoom(id);
    navigate("/");
  };
  const classes = useStyles();
  return (
    <Grid container>
      {roomDetails ? (
        <Grid container className={classes.custom_container}>
          <Grid item md={4}>
            <CarouselProvider
              naturalSlideWidth={2000}
              naturalSlideHeight={2020}
              totalSlides={3}
            >
              <Slider>
                <Slide backgroundColor="grey" index={0}>
                  <ImageWithZoom src={roomDetails.image} />
                </Slide>
                <Slide index={1}>
                  <ImageWithZoom src={roomDetails.image} />
                </Slide>
                <Slide index={2}>
                  <ImageWithZoom src={roomDetails.image} />
                </Slide>
              </Slider>
              <ButtonBack>Back</ButtonBack>
              <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
          </Grid>
          <Grid item md={7}>
            <Paper elevation={8} className={classes.paper}>
              <table>
                <tbody>
                  <br />
                  <tr>
                    <th>Title:</th>
                    <td>{roomDetails.title}</td>
                  </tr>
                  <br />
                  <tr>
                    <th>Price:</th>
                    <td>{roomDetails.price}</td>
                  </tr>
                  <br />
                  <tr>
                    <th>Description:</th>
                    <td>{roomDetails.description}</td>
                  </tr>
                  <br />
                  {/* {roomDetails.salePrice ? (
                    <tr>
                      <th> Sale Price:</th>
                      <td>{productDetails.salePrice}</td>
                    </tr>
                  ) : null} */}
                  <br />
                  <tr>
                    <th> На сколько персон:</th>
                    <td>{roomDetails.person}</td>
                  </tr>
                </tbody>
              </table>
            </Paper>
            <Button
              onClick={() => handleRedirectAfterDelete(roomDetails.id)}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ) : (
        <MySpinner />
      )}
    </Grid>
  );
};

export default RoomsDetails;
