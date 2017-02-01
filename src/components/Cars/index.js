import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { fetchCars, deleteCar, searchCar } from '../../actions/index';
import _ from 'lodash';
import CarsList from './list';
import CarsSearch from './search';

class Index extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchCars();
  }

  onDelete(id) {
    this.props.deleteCar(id)
      .then(() => {
        this.context.router.go('/');
      });
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

            <CarsList cars={this.props.filteredCars || this.props.cars} onDelete={this.onDelete.bind(this)}/>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>
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
  return bindActionCreators({ fetchCars, deleteCar, searchCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
