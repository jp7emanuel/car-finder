import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MakerReducer from './MakerReducer';
import CarReducer from './CarReducer';

const combinedReducer = combineReducers({
  makers: MakerReducer,
  cars: CarReducer,
  form: formReducer
});


export default combinedReducer;
