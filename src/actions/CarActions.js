import axios from 'axios';
import {
  CREATE_CAR,
  FETCH_CARS,
  FETCH_CAR
} from './types';

const API_URL = 'http://localhost:8081';

export function fetchCars() {
  return (dispatch) => {
    axios.get(`${API_URL}/carfinder/cars`)
      .then(function(response) {
        dispatch({
          type: FETCH_CARS,
          payload: { data: response.data }
        });
      });
  };
};

export function fetchCar(id) {
  return (dispatch) => {
    axios.get(`${API_URL}/carfinder/cars/${id}`)
      .then(function(response) {
        dispatch({
          type: FETCH_CAR,
          payload: { data: response.data }
        });
      });
  };
};

export function createCar(car) {
  return (dispatch) => {
    axios.post(`${API_URL}/carfinder/cars`, car)
      .then(function(response) {
        dispatch({ type: CREATE_CAR });
      });
  };
}

export function updateCar(car) {
  return (dispatch) => {
    axios.put(`${API_URL}/carfinder/cars/${car._id}`, car)
      .then(function(response) {
        dispatch({
          type: CREATE_CAR
        });
      });
  };
};

export function deleteCar(id) {
  return (dispatch) => {
    axios.delete(`${API_URL}/carfinder/cars/${id}`)
      .then(function(response) {
        dispatch({
          type: CREATE_CAR
        });
      });
  };
};
