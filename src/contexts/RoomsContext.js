import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { $api } from '../service/axios-config';
import { calcSubPrice, calcTotalPrice } from '../utils/calc';
import { checkItemInCart } from '../utils/check-item-in-cart';
import {
  ADD_AND_DELETE_ROOM_IN_CART,
  GET_ROOM,
  GET_ROOMS_ERROR,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
  GET_ROOM_DETAILS,
  GET_ROOM_ERROR,
  GET_ROOM_LOADING,
  GET_ROOM_SUCCESS,
  SET_SEARCH_RESULTS,
} from '../utils/constants';
import {
  roomError,
  roomLoading,
  roomSuccess,
} from './actions/roomDetailsActions';
import {
  roomsLoading,
  roomsSuccess,
  roomsError,
  setSearchResults,
} from './actions/roomsActions';

const roomsContext = createContext();

export const useRooms = () => useContext(roomsContext);

const initialState = {
  loading: false,
  error: null,
  rooms: [],
  roomDetails: {
    loading: false,
    error: null,
    room: null,
  },
  // cartData: JSON.parse(localStorage.getItem('cart'))
  //   ? JSON.parse(localStorage.getItem('cart')).rooms.length
  //   : 0,
  // cart: {},
  searchResults: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ROOMS_LOADING:
      return { ...state, loading: true };

    case GET_ROOMS_ERROR:
      return { ...state, loading: false, rooms: [], error: action.payload };

    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        rooms: action.payload,
      };

    case GET_ROOM_LOADING:
      return {
        ...state,
        roomDetails: { ...state.roomDetails, loading: true },
      };

    case GET_ROOM_SUCCESS:
      return {
        ...state,
        roomDetails: {
          ...state.roomDetails,
          loading: false,
          error: null,
          room: action.payload,
        },
      };

    case GET_ROOM_ERROR:
      return {
        ...state,
        roomDetails: {
          ...state.roomDetails,
          loading: false,
          error: action.payload,
          room: null,
        },
      };

    case ADD_AND_DELETE_ROOM_IN_CART: {
      return {
        ...state,
        cartData: action.payload,
      };
    }
    case GET_ROOM: {
      return {
        ...state,
        cart: action.payload,
      };
    }

    case GET_ROOM_DETAILS: {
      return {
        ...state,
        room: action.payload,
      };
    }

    case SET_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.payload,
      };
    }

    default:
      return state;
  }
};

const RoomsContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const location = useLocation();

  const navigate = useNavigate();

  const fetchRooms = async () => {
    dispatch(roomsLoading());
    try {
      const { data } = await $api(`${window.location.search}`);

      dispatch(roomsSuccess(data));
    } catch (error) {
      console.log(error.message);
      dispatch(roomsError(error.message));
    }
  };

  const fetchOneRoom = async (id) => {
    dispatch(roomLoading());
    try {
      const { data } = await $api(`/${id}`);
      dispatch(roomSuccess(data));
    } catch (error) {
      console.log(error.message);
      dispatch(roomError(error.message));
    }
  };

  const getRoomDetails = async (id) => {
    try {
      const { data } = await axios(`$api/${id}`);
      dispatch({
        type: GET_ROOM_DETAILS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAndDeleteRoomInCart = (room) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      cart = {
        rooms: [],
        totalPrice: 0,
      };
    }
    let newRoom = {
      count: 1,
      subPrice: 0,
      room: room,
    };
    console.log(newRoom);
    newRoom.subPrice = calcSubPrice(newRoom);

    const isItemInCart = checkItemInCart(cart.rooms, room.id);
    if (isItemInCart) {
      cart.rooms = cart.rooms.filter((item) => item.room.id !== room.id);
    } else {
      cart.rooms.push(newRoom);
    }
    cart.totalPrice = calcTotalPrice(cart.rooms);

    console.log(cart, 'cart');
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: ADD_AND_DELETE_ROOM_IN_CART,
      payload: cart.rooms.length,
    });
  };

  const getCart = () => {
    let cartFromLS = JSON.parse(localStorage.getItem('cart'));
    dispatch({
      type: GET_ROOM,
      payload: cartFromLS,
    });
    console.log(cartFromLS);
  };

  const changeRoomCount = (newCount, id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.rooms = cart.rooms.map((item) => {
      if (item.room.id === id) {
        item.count = newCount;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.rooms);
    localStorage.setItem('cart', JSON.stringify(cart));
    getCart();
  };

  const fetchByParams = async (query, value) => {
    const search = new URLSearchParams(location.search);

    if (value === 'all') {
      search.delete(query);
    } else if (Array.isArray(value)) {
      search.set('price_gte', value[0]);
      search.set('price_lte', value[1]);
    } else {
      search.set(query, value);
    }

    // console.log(search.toString());
    const url = `${location.pathname}?${search.toString()}`;
    navigate(url);

    // const { data } = await $api(``);
    // dispatch(productsSuccess(data));
  };

  const fetchSearchRooms = async (value) => {
    try {
      if (!value) {
        dispatch(setSearchResults([]));
        return;
      }
      const { data } = await $api(`?q=${value}`);
      // console.log(data);
      dispatch(setSearchResults(data));
    } catch (e) {
      console.log(e.message);
    }
  };

  const addRoom = async (newRoom) => {
    console.log(newRoom);

    try {
      await $api.post('/', newRoom);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await $api.delete(`/${id}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const editRoom = (room) => {
    try {
      return $api.patch(`/${room.id}`, room);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    rooms: state.rooms,
    loading: state.loading,
    error: state.error,
    roomDetailsLoading: state.roomDetails.loading,
    roomDetails: state.roomDetails.room,
    roomDetailsError: state.roomDetails.error,
    cartData: state.cartData,
    cart: state.cart,
    searchResults: state.searchResults,
    fetchRooms,
    fetchOneRoom,
    addAndDeleteRoomInCart,
    getCart,
    changeRoomCount,
    editRoom,
    getRoomDetails,
    fetchByParams,
    fetchSearchRooms,
    addRoom,
    deleteRoom,
  };

  return (
    <roomsContext.Provider value={values}>{children}</roomsContext.Provider>
  );
};

export default RoomsContext;
