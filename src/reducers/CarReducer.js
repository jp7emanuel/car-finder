import {
  FETCH_CARS,
  FETCH_CAR,
  CREATE_CAR,
  SEARCH_CAR,
  IS_LOADING,
  NOT_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  isLoading: false,
  car: null,
  filteredCars: null,
  finalFilter: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CARS:
      return { ...state, all: action.payload.data, isLoading: false };
    case FETCH_CAR:
      return { ...state, car: action.payload.data, isLoading: false };
    case CREATE_CAR:
      return { ...state, isLoading: false };
    case SEARCH_CAR:
      let finalFilter = state.filteredCars || null;
      let filteredCars = state.filteredCars || null;

      if (action.payload.data.type === 'maker') {
        if (action.payload.data.value) {
          finalFilter = state.all.filter((car) => {
            return car.maker._id.indexOf(action.payload.data.value) !== -1;
          });
          filteredCars = finalFilter;
        } else {
          finalFilter = null;
          filteredCars = null;
        }
      }

      if (action.payload.data.type === 'car' && action.payload.data.value) {
        finalFilter = state.all.filter((car) => {
          return car._id.indexOf(action.payload.data.value) !== -1;
        });
      }

      return { ...state, finalFilter: finalFilter, filteredCars: filteredCars, isLoading: false };
    case IS_LOADING:
      return { ...state, isLoading: true };
    case NOT_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
