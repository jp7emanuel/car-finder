import axios from 'axios';
import {
  FETCH_MAKERS,
  FETCH_MAKER,
  CREATE_MAKER,
  UPDATE_MAKER
} from './types';

const API_URL = process.env.REACT_APP_API_URL;

export function fetchMakers() {
  return (dispatch) => {
    axios.get(`${API_URL}/carfinder/makers`)
      .then(function(response) {
        dispatch({
          type: FETCH_MAKERS,
          payload: { data: response.data }
        });
      });
  };
};

export function fetchMaker(id) {
  return (dispatch) => {
    axios.get(`${API_URL}/carfinder/makers/${id}`)
      .then(function(response) {
        dispatch({
          type: FETCH_MAKER,
          payload: { data: response.data }
        });
      });
  };
}

export function createMaker(maker) {
  const request = axios.post(`${API_URL}/carfinder/makers`, maker);
  return  {
    type: CREATE_MAKER,
    payload: request
  };
}

export function updateMaker(maker) {
  const request = axios.put(`${API_URL}/carfinder/makers/${maker._id}`, maker);
  return {
    type: UPDATE_MAKER,
    payload: request
  };
}

export function deleteMaker(id) {
  const request = axios.delete(`${API_URL}/carfinder/makers/${id}`);
  return {
    type: CREATE_MAKER,
    payload: request
  };
};
