import {
  GET_ROOMS_ERROR,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
  SET_SEARCH_RESULTS,
} from '../../utils/constants';

export const roomsLoading = () => ({ type: GET_ROOMS_LOADING });

export const roomsSuccess = (data) => ({
  type: GET_ROOMS_SUCCESS,
  payload: data,
});

export const roomsError = (msg) => ({
  type: GET_ROOMS_ERROR,
  payload: msg,
});

export const setSearchResults = (data) => ({
  type: SET_SEARCH_RESULTS,
  payload: data,
});
