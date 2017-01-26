import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { makersFetch } from '../../actions/index';

class Form extends Component {
  componentWillMount() {
    this.props.makersFetch();
    if (this.props.post) {
      this.props.initializeForm(this.props.post);
    }
  }

  onSubmit(props) {
    this.props.formSubmit(props);
  }

  render() {
    const renderField = field => (
      <div className={`field ${field.touched && field.invalid ? 'field error' : ''}`}>
        <label>{field.name}</label>
        <input {...field.input} />
        <div className='message'>
          {field.touched && field.error && <span>{field.error}</span>}
        </div>
      </div>
    );

    return (
      <form onSubmit={this.props.validateHandleSubmit(props => this.onSubmit(props))} className='ui form'>
        { renderField(this.props.name) }

        <div className={`field ${this.props.maker.touched && this.props.maker.invalid ? 'field error' : ''}`}>
          <label>Maker</label>
          <select className='ui fluid dropdown' {...this.props.maker.input}>
            <option>Select one maker</option>
            {
              this.props.makers.map(maker => {
                return <option key={maker._id} value={maker._id}>{maker.name}</option>
              })
            }
          </select>
          <div className='message'>
            {this.props.maker.touched ? this.props.maker.error : ''}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
