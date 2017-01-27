import {
  CARS_FETCH,
  CAR_FETCH
} from '../actions/types';

const INITIAL_STATE = { all: [], car: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CARS_FETCH:
      return { ...state, all: action.payload.data };
    case CAR_FETCH:
      return { ...state, car: action.payload.data };
    default:
      return state;
  }
}
