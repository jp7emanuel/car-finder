import {
  FETCH_CARS,
  FETCH_CAR,
  SEARCH_CAR
} from '../actions/types';

const INITIAL_STATE = { all: [], car: null, filteredCars: null, finalFilter: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CARS:
      return { ...state, all: action.payload.data };
    case FETCH_CAR:
      return { ...state, car: action.payload.data };
    case SEARCH_CAR:
      let finalFilter = null;
      let filteredCars = state.filteredCars || null;
      if (action.payload.data.value) {
        if (action.payload.data.type === 'maker') {
          finalFilter = state.all.filter((car) => {
            return car.maker._id.indexOf(action.payload.data.value) !== -1;
          });
          filteredCars = finalFilter;
        } else if (action.payload.data.type === 'car') {
          finalFilter = state.all.filter((car) => {
            return car._id.indexOf(action.payload.data.value) !== -1;
          });
        }
      }
      return { ...state, finalFilter: finalFilter, filteredCars: filteredCars };
    default:
      return state;
  }
}
