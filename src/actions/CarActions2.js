import firebaseApp from '../firebase_connection';
import {
  CAR_CREATE,
  CARS_FETCH,
} from './types';

export function carCreate(car) {
  return (dispatch) => {
    firebaseApp.database().ref('/cars')
      .push(car)
      .then(() => {
        dispatch({ type: CAR_CREATE });
      });
  };
}

export function carsFetch() {
  const carsRef = firebaseApp.database().ref('/cars');
  return dispatch => {
    carsRef.on('value', snapshot => {
      let items = [];
      snapshot.forEach((child) => {
        let record = {
          firebaseKey: child.key,
          ...child.val()
        };

        items.push(record);
      });
      dispatch({
        type: CARS_FETCH,
        payload: { data: items }
      });
    });
  };
};

// export function carsFullFetch() {
//   // return dispatch => Promise.all([makersFetch(), carsFetch()]).then(function(results) {
//   // return dispatch => Promise.all({
//   //   carsRef.on('value', snapshot => {
//   //     snapshot.forEach((child) => {
//   //       let record = {
//   //         firebaseKey: child.key,
//   //         name: child.val().name
//   //       };

//   //       items.push(record);

//   //       markersRef.child(child.val().maker).once('value', makerSnap => {
//   //         record.maker = makerSnap.val().name;
//   //       });
//   //     });

//   //     dispatch({
//   //       type: CARS_FULL_FETCH,
//   //       payload: { data: items }
//   //     });
//   //   });
//   // });
// };
