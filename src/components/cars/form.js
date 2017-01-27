import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { makersFetch } from '../../actions/index';
import { textInput, selectInput } from '../common';

const required = value => value ? undefined : 'Required';

class Form extends Component {
  componentWillMount() {
    this.props.makersFetch();
  }

  onSubmit(props) {
    this.props.formSubmit(props);
  }

  render() {
    const renderMakerOption = this.props.makers.map(maker => {
      return <option key={maker._id} value={maker._id}>{maker.name}</option>
    });

    return (
      <form onSubmit={this.props.handleSubmit(props => this.onSubmit(props))} className='ui form'>
        <div className='field'>
          <Field name='name' type='text' label='Name' validate={[ required ]} component={textInput} />
        </div>

        <div className='field'>
          <Field name='maker'label='maker' component={selectInput} validate={[ required ]}>
            <option value="">Select an option</option>
            {renderMakerOption}
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

function mapStateToProps(state) {
  return { makers: state.makers.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ makersFetch }, dispatch);
}

Form = connect(mapStateToProps, mapDispatchToProps)(Form);
Form = reduxForm({
  form: 'simple'
})(Form);

export default Form;
