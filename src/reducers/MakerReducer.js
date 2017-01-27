import {
  FETCH_MAKERS,
  FETCH_MAKER,
} from '../actions/types';

const INITIAL_STATE = { all: [], maker: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_MAKERS:
      return { ...state, all: action.payload.data };
    case FETCH_MAKER:
      return { ...state, maker: action.payload.data };
    default:
      return state;
  }
}
