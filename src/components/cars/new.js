import React, { Component  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';
import { createCar, uploadImage } from '../../actions/index';
import CarsForm from './form';

class New extends Component {
  state = { saved: false };

  onSubmit(props) {
    this.props.createCar(props)
      .then((response) => {
        this.setState({ saved: true });
      });
  }

  render() {
    if (this.state.saved) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className='ui container form-new'>
          <h3>Create a New Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isLoading: state.cars.isLoading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createCar, uploadImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
