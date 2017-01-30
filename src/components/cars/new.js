import React, { Component, PropTypes  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createCar, uploadImage } from '../../actions/index';
import CarsForm from './form';

class New extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createCar(props)
      .then((response) => {
        this.context.router.push('/');
      });
  }

  render() {
    return (
      <div>
        <div className='ui container form-new'>
          <h3>Create a New Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createCar, uploadImage }, dispatch);
}

export default connect(null, mapDispatchToProps)(New);
