import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { $api } from '../service/axios-config';
import {
  ADD_AND_DELETE_ROOM_IN_CART,
  ADD_AND_DELETE_ROOM_IN_FAVORITE,
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
  isFavorite: false,
  rooms: [],
  roomDetails: {
    loading: false,
    error: null,
    room: null,
  },
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

    case GET_ROOM: {
      return {
        ...state,
        cart: action.payload,
      };
    }

    case ADD_AND_DELETE_ROOM_IN_FAVORITE: {
      return {
        ...state,
        room: action.payload,
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
      const { data } = await $api(`/${id}`);
      dispatch({
        type: GET_ROOM_DETAILS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAndDeleteRoomInfavorite = async(room) => {
    try{
      const{data} = await $api.post(`/favorite`, room)
      dispatch({
        type: ADD_AND_DELETE_ROOM_IN_FAVORITE,
        payload: data,
      })
    }catch(error){
      console.log(error)
    }
  }

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

    const url = `${location.pathname}?${search.toString()}`;
    navigate(url);
  };

  const fetchSearchRooms = async (value) => {
    try {
      if (!value) {
        dispatch(setSearchResults([]));
        return;
      }
      const { data } = await $api(`?q=${value}`);
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
    searchResults: state.searchResults,
    fetchRooms,
    fetchOneRoom,
    editRoom,
    getRoomDetails,
    fetchByParams,
    addAndDeleteRoomInfavorite,
    fetchSearchRooms,
    addRoom,
    deleteRoom,
  };

  return (
    <roomsContext.Provider value={values}>{children}</roomsContext.Provider>
  );
};

export default RoomsContext;
