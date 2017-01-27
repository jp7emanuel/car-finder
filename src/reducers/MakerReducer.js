import {
  MAKERS_FETCH,
  MAKER_FETCH
} from '../actions/types';

const INITIAL_STATE = { all: [], maker: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case MAKERS_FETCH:
      return { ...state, all: action.payload.data };
    case MAKER_FETCH:
      return { ...state, maker: action.payload.data };
    default:
      return state;
  }
}
