import React, { Component, PropTypes  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carFetch, carUpdate } from '../../actions/index';
import CarsForm from './form';

class Edit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.carFetch(this.props.params.id);
  }

  onSubmit(props) {
    this.props.carUpdate({...props, _id: this.props.params.id});
    return this.context.router.push('/');
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
        <div className='ui container form-new'>
          <h3>Create a New Car</h3>
          <CarsForm
            makers={this.props.makers}
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
  return bindActionCreators({ carFetch, carUpdate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
