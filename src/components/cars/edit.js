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
      .then(() => {
        this.context.router.push('/makers');
      });
  }

  render() {
    let car = null;
    if (this.props.car) {
      car = {
        name: this.props.car.name,
        maker: this.props.car.maker._id
      }
    }

    return (
      <div>
        <div className='ui container form-edit'>
          <h3>Create a New Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
            initialValues={car}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { car: state.cars.car };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, updateCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
