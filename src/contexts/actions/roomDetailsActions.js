import {
  GET_ROOM_ERROR,
  GET_ROOM_LOADING,
  GET_ROOM_SUCCESS,
} from '../../utils/constants';

export const roomLoading = () => ({ type: GET_ROOM_LOADING });

export const roomSuccess = (data) => ({
  type: GET_ROOM_SUCCESS,
  payload: data,
});

export const roomError = (msg) => ({ type: GET_ROOM_ERROR, payload: msg });
