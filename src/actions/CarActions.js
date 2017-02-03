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
    dispatch(isLoading());

    return firebaseApp.storage().ref().child(uuid.v4())
      .put(car.photo[0]).then((snapshot) => {
        car.photo = snapshot.downloadURL;
        return {
          type: CREATE_CAR,
          payload: axios.post(`${API_URL}/carfinder/cars`, car)
        };
      });
  };
}

export function updateCar(car) {
  return (dispatch) => {
    dispatch(isLoading());

    if (typeof car.photo[0] === 'object') {
      return firebaseApp.storage().ref().child(uuid.v4())
        .put(car.photo[0]).then((snapshot) => {
          car.photo = snapshot.downloadURL;
          return updateAction(dispatch, car);
        });
    } else {
      return updateAction(dispatch, car);
    }
  };
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
