import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCar, updateCar } from '../../actions/index';
import { Loading } from '../common';
import CarsForm from './form';
import Redirect from 'react-router/Redirect';

class Edit extends Component {
  state = {
    saved: false,
  };

  componentWillMount() {
    this.props.fetchCar(this.props.params.id);
  }

  onSubmit(props) {
    this.props.updateCar({...props, _id: this.props.params.id})
      .then((retorno) => {
        if (retorno.payload.status === 200) {
          this.setState({ saved: true });
        }
      });
  }

  render() {
    if (this.state.saved) {
      return <Redirect to={`/cars/show/${this.props.params.id}`} />;
    }

    if (!this.props.car) {
      return <Loading />;
    }

    if (this.props.car && this.props.car.maker) {
      this.props.car.maker = this.props.car.maker._id;
    }

    return (
      <div>
        <div className='ui container form-edit'>
          <h3>Edit a Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
            car={this.props.car}
            initialValues={this.props.car}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { car: state.cars.car, isLoading: state.cars.isLoading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, updateCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
