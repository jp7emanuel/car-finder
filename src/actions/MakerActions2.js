import firebaseApp from '../firebase_connection';
import {
  MAKERS_FETCH,
} from './types';

export function fetchMakers() {
  return (dispatch) => {
    firebaseApp.database().ref('/makers')
      .on('value', snapshot => {
        let items = [];
        snapshot.forEach((child) => {
          let record = {
            firebaseKey: child.key,
            name: child.val().name,
          }
          items.push(record);
        });

        dispatch({
          type: MAKERS_FETCH,
          payload: { data: items }
        });
      });
  };
};
