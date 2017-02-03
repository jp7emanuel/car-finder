import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchMakers } from '../../actions/index';
import { textInput, selectInput, textareaInput, currencyInput, Loading } from '../common';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const required = value => value ? undefined : 'Required';

class Form extends Component {
  componentWillMount() {
    this.props.fetchMakers();
  }

  onSubmit(props) {
    this.props.formSubmit(props);
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />
    }

    const checkPhotoRequired = this.props.car && this.props.car.photo ? false : [ required ];
    const renderMakerOption = this.props.makers.map(maker => {
      return <option key={maker._id} value={maker._id}>{maker.name}</option>
    });

    return (
      <form onSubmit={this.props.handleSubmit(props => this.onSubmit(props))} className='ui form'>
        <div className='field'>
          <Field name='name' type='text' label='Name' validate={[ required ]} component={textInput} />
        </div>

        <div className='field'>
          <Field name='maker'label='Maker' component={selectInput} validate={[ required ]}>
            <option value="">Select an option</option>
            {renderMakerOption}
          </Field>
        </div>

        <div className='field'>
          <Field name='year' type='text' label='Year' component={textInput} validate={[ required ]} />
        </div>

        <div className='field'>
          <Field name='details' label='Details' component={textareaInput} validate={[ required ]} />
        </div>

        <div className='field'>
          <Field name='price' label='Price' component={currencyInput} validate={[ required ]} />
        </div>

        <div className='field'>
          <Field name='photo' type='file' component={textInput} label='Photo' validate={checkPhotoRequired} />
        </div>

        <div className='actions-buttons'>
          <button type='submit' className='ui blue basic button'>Send</button>
          <button onClick={() => history.goBack()} className='ui red basic button'>Cancel</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { makers: state.makers.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMakers }, dispatch);
}

Form = connect(mapStateToProps, mapDispatchToProps)(Form);
Form = reduxForm({
  form: 'carsForm'
})(Form);

export default Form;
