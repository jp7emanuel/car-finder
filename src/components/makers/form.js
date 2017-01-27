import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { textInput } from '../common';

const required = value => value ? undefined : 'Required';

class Form extends Component {
  onSubmit(props) {
    this.props.formSubmit(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(props => this.onSubmit(props))} className='ui form'>
        <div className='field'>
          <Field name='name' type='text' label='Name' validate={[ required ]} component={textInput} />
        </div>

        <div className='actions-buttons'>
          <button type='submit' className='ui blue basic button'>Submit</button>
          <Link to='/makers' className='ui red basic button'>Cancel</Link>
        </div>
      </form>
    );
  }
}

export default Form = reduxForm({
  form: 'makersForm'
})(Form);
