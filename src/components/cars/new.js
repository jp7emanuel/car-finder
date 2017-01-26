import React, { Component, PropTypes  } from 'react';
import { reduxForm } from 'redux-form';
import { carCreate } from '../../actions/index';
import CarsForm from './form';

class New extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.carCreate(props);
    return this.context.router.push('/');
  }

  render() {
    return (
      <div>
        <div className='ui container form-new'>
          <h3>Create a New Car</h3>
          <CarsForm
            formSubmit={this.onSubmit.bind(this)}
            initializeForm={this.props.initializeForm}
            validateHandleSubmit={this.props.handleSubmit}
            name={this.props.fields.name}
            maker={this.props.fields.maker}
          />
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a name';
  }
  if (!values.maker) {
    errors.maker = 'Enter a maker';
  }
  return errors;
}

export default reduxForm({
  form: 'CarsForm',
  'fields': ['name', 'maker'],
  validate
}, null, { carCreate })(New);
