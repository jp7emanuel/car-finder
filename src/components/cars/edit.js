import React, { Component, PropTypes  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCar, updateCar } from '../../actions/index';
import CarsForm from './form';

class Edit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchCar(this.props.params.id);
  }

  onSubmit(props) {
    this.props.updateCar({...props, _id: this.props.params.id})
      .then((retorno) => {
        if (retorno.payload.status === 200) {
          this.context.router.push('/');
        }
      });
  }

  render() {
    if (this.props.car && this.props.car.maker) {
      this.props.car.maker = this.props.car.maker._id;
    }

    return (
      <div>
        <div className='ui container form-edit'>
          <h3>Edit a Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
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
