import axios from 'axios';
import {
  FETCH_MAKERS
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
