import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Shop } from "@material-ui/icons";
import { useRooms } from "../../contexts/RoomsContext";
import { checkItemInCart } from "../../utils/check-item-in-cart";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 200,
    backgroundSize: "contain",
  },
  actions: {
    justifyContent: "space-between",
  },
});

const RoomCard = ({ room, cart }) => {
  const classes = useStyles();
  const { addAndDeleteRoomInCart } = useRooms();
//   const isItemInCart = () => {
//     if (cart) {
//       return checkItemInCart(cart.rooms, room.id);
//     }
//     return false;
//   };

  return (
    <Card className={classes.root}>
      <Link to={`/room/${room.id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={room.image}
            title="Rooms image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {room.title}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="textSecondary"
              component="p"
            >
              {room.description}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" component="p">
              Цена: {room.price} сом
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" component="p">
              На {room.person} персоны
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.actions}>
        {/* <IconButton color={isItemInCart() ? "secondary" : "primary"}>
          <ShoppingCartIcon />
        </IconButton> */}
        <Button
         //  onClick={() => addAndDeleteRoomInCart(room)}
          color="primary"
          variant="contained"
          startIcon={<Shop />}
        >
          Купить
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomCard;
