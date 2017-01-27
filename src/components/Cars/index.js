import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { fetchCars, deleteCar } from '../../actions/index';
import CarsList from './list';

class Index extends Component {
  componentWillMount() {
    this.props.fetchCars();
  }

  onDelete(id) {
    this.props.deleteCar(id);
  }

  render() {
    return (
      <div>
        <div className='ui container'>
          <div className='ui right aligned header' style={{ marginTop: 10 }}>
            <Link to='/cars/new' className='ui green basic button'>
              New Car
            </Link>
          </div>
          <div>
            <h3 className='ui center aligned dividing header'>Cars</h3>
          </div>
          <CarsList cars={this.props.cars} onDelete={this.onDelete.bind(this)}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cars: state.cars.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars, deleteCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
