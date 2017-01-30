import {
  UPLOAD_IMAGE
} from '../actions/types';

const INITIAL_STATE = { photoUrl: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UPLOAD_IMAGE:
      return { ...state, photoUrl: action.payload.data };
    default:
      return state;
  }
}
