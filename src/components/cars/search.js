import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { selectInput } from '../common';
import _ from 'lodash';

class Search extends Component {
  onChange(event) {
    this.props.onChangeSearch({
      type: event.target.name,
      value: event.target.value
    });
  }

  render() {
    const makers = this.props.cars.map(car => { return car.maker });
    const renderMakerOption = _.map(_.uniq(makers, '_id'), (maker) => {
      return <option key={maker._id} value={maker._id}>{maker.name}</option>
    });

    const renderCarsOption = _.map(_.uniq(this.props.filteredCars, '_id'), (car) => {
      return <option key={car._id} value={car._id}>{car.name}</option>
    });

    return (
      <div className='ui segment'>
        <h2 className='ui floated header'>Cars</h2>
        <div className='ui grid form'>
          <div className='eight wide column'>
            <Field name='maker' label='maker' component={selectInput} onChange={this.onChange.bind(this)}>
              <option value="">Select an option</option>
              {renderMakerOption}
            </Field>
          </div>
          <div className='eight wide column'>
            <Field name='car' label='car' component={selectInput} onChange={this.onChange.bind(this)}>
              <option value="">Cars</option>
              {renderCarsOption}
            </Field>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'search'
})(Search);
