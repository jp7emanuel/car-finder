import axios from 'axios';
import {
  FETCH_MAKERS,
  FETCH_MAKER,
  CREATE_MAKER
} from './types';

const API_URL = 'http://localhost:8081';

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
  return (dispatch) => {
    axios.post(`${API_URL}/carfinder/makers`, maker)
      .then(function(response) {
        dispatch({ type: CREATE_MAKER });
      });
  };
}

export function updateMaker(maker) {
  return (dispatch) => {
    axios.put(`${API_URL}/carfinder/makers/${maker._id}`, maker)
      .then(function(response) {
        dispatch({
          type: CREATE_MAKER
        });
      });
  };
}

export function deleteMaker(id) {
  return (dispatch) => {
    axios.delete(`${API_URL}/carfinder/makers/${id}`)
      .then(function(response) {
        dispatch({
          type: CREATE_MAKER
        });
      });
  };
};
