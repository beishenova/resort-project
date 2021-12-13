import React, { useEffect } from 'react';

import { calcTotalPrice } from '../../utils/calc';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useRooms } from '../../contexts/RoomsContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Cart = () => {
  const { cart, getCart, changeRoomCount, cartData } = useRooms();

  useEffect(() => {
    getCart();
  }, []);
  console.log(cart.room);
  const classes = useStyles();

  const handleCountChange = ({ value }, id) => {
    changeRoomCount(value, id);
  };

  return (
    <div>
      {cart && cart.rooms && cartData ? (
        <>
          {
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h2>Your shopping list</h2>
                    </TableCell>

                    <TableCell align="center">Image</TableCell>

                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Count</TableCell>
                    <TableCell align="center">SubTotal</TableCell>
                    <TableCell align="center">Delete an item</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.rooms.map((item) => (
                    <TableRow key={item.room.id}>
                      <TableCell component="th" scope="">
                        {item.room.title}
                      </TableCell>
                      <TableCell align="center">
                        <img
                          src={item.room.image}
                          alt=""
                          style={{ width: '100px' }}
                        />
                      </TableCell>

                      <TableCell align="center">{item.room.price}</TableCell>
                      <TableCell align="center">
                        <input
                          type="number"
                          value={item.count}
                          onChange={(e) =>
                            handleCountChange(e.target, item.room.id)
                          }
                        />
                      </TableCell>

                      <TableCell align="center">{item.subPrice}</TableCell>
                      <TableCell align="center">
                        <IconButton align="center">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: '100px',
                    padding: '10px',
                  }}
                >
                  <h3 align="center">Total : {calcTotalPrice(cart.rooms)}</h3>
                  <Link to="/payment">
                    <Button variant="contained" color="secondary">
                      Оплатить
                    </Button>
                  </Link>
                </div>
              </Table>
            </TableContainer>
          }
        </>
      ) : (
        <h1>Cart is empty</h1>
      )}
    </div>
  );
};

export default Cart;
