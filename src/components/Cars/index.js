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
    if (this.props.cars.length) {
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
              filteredCars={this.props.filteredCars}
              onChangeSearch={this.onChangeSearch.bind(this)}
            />

            <CarsList cars={this.props.finalFilter || this.props.cars} onDelete={this.onDelete.bind(this)}/>
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>
    }
  }
}

function mapStateToProps(state) {
  return {
    cars: state.cars.all,
    finalFilter: state.cars.finalFilter,
    filteredCars: state.cars.filteredCars
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars, deleteCar, searchCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
