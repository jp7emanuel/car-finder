import axios from 'axios';
import {
  CAR_CREATE,
  CARS_FETCH,
} from './types';

const API_URL = 'http://localhost:8081';

export function carCreate(car) {
  return (dispatch) => {
    axios.post(`${API_URL}/carfinder/cars`, car)
      .then(function(response) {
        dispatch({ type: CAR_CREATE });
      });
  };
}

export function carsFetch() {
  return (dispatch) => {
    axios.get(`${API_URL}/carfinder/cars`)
      .then(function(response) {
        dispatch({
          type: CARS_FETCH,
          payload: { data: response.data }
        });
      });
  };
};
