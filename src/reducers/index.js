import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MakerReducer from './MakerReducer';
import CarReducer from './CarReducer';
import StorageReducer from './StorageReducer';

const combinedReducer = combineReducers({
  makers: MakerReducer,
  cars: CarReducer,
  storage: StorageReducer,
  form: formReducer
});


export default combinedReducer;
