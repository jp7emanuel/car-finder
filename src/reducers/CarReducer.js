import {
  FETCH_CARS,
  FETCH_CAR,
  CREATE_CAR,
  SEARCH_CAR,
  IS_LOADING,
  NOT_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  cars: [],
  car: null,
  carsFilteredByMaker: null,
  makerSelected: null,
  carSelected: null,
  filteredCars: null,
  isLoading: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CARS:
      return { ...state, cars: action.payload.data, isLoading: false };
    case FETCH_CAR:
      return { ...state, car: action.payload.data, isLoading: false };
    case CREATE_CAR:
      return { ...state, isLoading: false };
    case SEARCH_CAR:
      const retorno = filter(state, action);
      return { ...state, ...retorno };
    case IS_LOADING:
      return { ...state, isLoading: true };
    case NOT_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

function filter(state, action) {
  let retorno = {
    carsFilteredByMaker: state.carsFilteredByMaker || null,
    filteredCars: state.carsFilteredByMaker || null,
    makerSelected: state.makerSelected || null,
    carSelected: null,
    isLoading: false
  };

  if (action.payload.data.type === 'maker') {
    if (action.payload.data.value) {
      retorno.makerSelected = action.payload.data.value;
      retorno.filteredCars = state.cars.filter((car) => {
        return car.maker._id.indexOf(action.payload.data.value) !== -1;
      });
      retorno.carsFilteredByMaker = retorno.filteredCars;
    } else {
      retorno.filteredCars = null;
      retorno.carsFilteredByMaker = null;
      retorno.makerSelected = null;
      retorno.carSelected = null;
    }
  }

  if (action.payload.data.type === 'car' && action.payload.data.value) {
    retorno.carSelected = action.payload.data.value;
    retorno.filteredCars = state.cars.filter((car) => {
      return car._id.indexOf(action.payload.data.value) !== -1;
    });
  }

  return retorno;
}
