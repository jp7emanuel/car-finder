import axios from 'axios';
import {
  MAKERS_FETCH,
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
