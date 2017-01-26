import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required';

class Form extends Component {
  onSubmit(props) {
    this.props.formSubmit(props);
  }

  render() {
    const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
      <div className={`field ${touched && error ? 'field error' : ''}`}>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    );

    const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
      <div className={`field ${touched && error ? 'field error' : ''}`}>
        <label>{label}</label>
        <div>
          <select className='ui fluid dropdown' {...input}>
            {children}
          </select>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );

    return (
      <form onSubmit={this.props.handleSubmit(props => this.onSubmit(props))} className='ui form'>
        <div className='field'>
          <Field name='name' type='text' label='Name' validate={[ required ]} component={renderField} />
        </div>

        <div className='field'>
          <Field name='maker'label='maker' component={renderSelectField} validate={[ required ]}>
            <option value="">Select an option</option>
            {
              this.props.makers.map(maker => {
                return <option key={maker._id} value={maker._id}>{maker.name}</option>
              })
            }
          </Field>
        </div>
        <div className='actions-buttons'>
          <button type='submit' className='ui blue basic button'>Submit</button>
          <Link to='/' className='ui red basic button'>Cancel</Link>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(Form)

