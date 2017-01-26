import { CARS_FETCH } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CARS_FETCH:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
