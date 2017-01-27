import {
  FETCH_MAKERS,
} from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_MAKERS:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
