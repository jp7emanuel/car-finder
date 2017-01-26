import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { carsFetch } from '../../actions/index';
import CarsList from './list';

class Index extends Component {
  componentWillMount() {
    this.props.carsFetch();
  }

  render() {
    return (
      <div>
        <div className='ui container'>
          <div className='ui right aligned header'>
            <Link to='/cars/new' className='ui green basic button'>
              New Car
            </Link>
          </div>
          <div>
            <h3 className='ui center aligned dividing header'>Cars</h3>
          </div>
          <CarsList cars={this.props.cars} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cars: state.cars.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carsFetch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
