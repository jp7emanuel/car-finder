import axios from 'axios';
import {
  MAKERS_FETCH,
  MAKER_FETCH
} from './types';

const API_URL = 'http://localhost:8081';

export function makersFetch() {
  return (dispatch) => {
    axios.get(`${API_URL}/carfinder/makers`)
      .then(function(response) {
        dispatch({
          type: MAKERS_FETCH,
          payload: { data: response.data }
        });
      });
  };
};

export function makerFetch(id) {
  return (dispatch) => {
    /*axios.get(`${API_URL}/carfinder/makers/:id`, id)
      .then(function(response) {
        dispatch({
          type: MAKER_FETCH,
          payload: { data: response.data }
        });
      });*/
    console.log(1);
  };
};
