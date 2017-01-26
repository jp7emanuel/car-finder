import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MakerReducer from './MakerReducer';
import CarReducer from './CarReducer';
import {
  MAKERS_FETCH,
  CARS_FETCH,
} from '../actions/types';

const combinedReducer = combineReducers({
  makers: MakerReducer,
  cars: CarReducer,
  form: formReducer
});

function crossSliceReducer(state, action) {
    switch (action.type) {
        case CARS_FETCH:
        case MAKERS_FETCH:
            if (state.cars.all.length && state.makers.all.length) {
                const cars = state.cars.all.map(car => {
                    car.makerObj = state.makers
                        .all
                        .find(maker => maker.firebaseKey === car.maker);
                    return car;
                });
                return {
                    ...state,
                    cars: {
                        ...state.cars,
                        all: cars
                    }
                };
            }
            return state;
        default:
            return state;
    }
}

function rootReducer(state, action) {
    const intermediateState = combinedReducer(state, action);
    const finalState = crossSliceReducer(intermediateState, action);
    return finalState;
}

export default rootReducer;
