import axios from 'axios';
import firebaseApp from '../../server/database/firebase_connection';
import uuid from 'uuid';
import {
  CREATE_CAR,
  FETCH_CARS,
  FETCH_CAR,
  SEARCH_CAR,
  IS_LOADING,
  NOT_LOADING
} from './types';

const FormData = require('form-data');
const API_URL = process.env.REACT_APP_API_URL;

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
    let data = new FormData();
    data.append('file', car.photo[0]);
    data.append('name', car.name);
    data.append('maker', car.maker);
    data.append('details', car.details);
    data.append('year', car.year);
    data.append('price', car.price);
    data.append('featured', car.featured);

    const request = axios({
      url: `${API_URL}/carfinder/cars`,
      data: data,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return dispatch({
      type: CREATE_CAR,
      payload: request
    });
  }
}

export function updateCar(car) {
  return (dispatch) => {
    let data = new FormData();
    data.append('file', car.photo[0]);
    data.append('car', car);

    const request = axios({
      url: `${API_URL}/carfinder/cars/${car._id}`,
      data: data,
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return dispatch({
      type: CREATE_CAR,
      payload: request
    });
  }
};

function updateAction(dispatch, car) {
  return dispatch({
    type: CREATE_CAR,
    payload: axios.put(`${API_URL}/carfinder/cars/${car._id}`, car)
  });
}

export function deleteCar(id) {
  return {
    type: CREATE_CAR,
    payload: axios.delete(`${API_URL}/carfinder/cars/${id}`)
  };
};

export function searchCar(obj) {
  return (dispatch) => {
    dispatch({
      type: SEARCH_CAR,
      payload: { data: obj }
    });
  }
}

export function isLoading() {
  return {
    type: IS_LOADING
  };
}

export function notLoading() {
  return {
    type: NOT_LOADING
  };
}
