import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Loading } from '../common';
import { fetchCars, searchCar } from '../../actions/index';
import CarsList from './list';
import CarsSearch from './search';

class Index extends Component {
  componentWillMount() {
    this.props.fetchCars();
  }

  onChangeSearch(text) {
    this.props.searchCar(text);
  }

  render() {
    if (this.props.filteredCars || this.props.cars.length > 0) {
      return (
        <div>
          <div className='ui container'>
            <div className='ui right aligned header' style={{ marginTop: 10 }}>
              <Link to='/cars/new' className='ui green basic button'>
                New Car
              </Link>
            </div>
            <CarsSearch
              cars={this.props.cars}
              carsToFilter={this.props.carsFilteredByMaker}
              onChangeSearch={this.onChangeSearch.bind(this)}
              makerSelected={this.props.makerSelected}
              carSelected={this.props.carSelected}
            />

            <CarsList cars={this.props.filteredCars || this.props.cars} />
          </div>
        </div>
      );
    } else {
      return <Loading />
    }
  }
}

function mapStateToProps(state) {
  return {
    cars: state.cars.cars,
    carsFilteredByMaker: state.cars.carsFilteredByMaker,
    filteredCars: state.cars.filteredCars,
    makerSelected: state.cars.makerSelected,
    carSelected: state.cars.carSelected
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars, searchCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
