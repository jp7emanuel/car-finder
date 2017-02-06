import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { selectInput } from '../common';
import _ from 'lodash';
import CurrencyInput from 'react-currency-input';

class Search extends Component {
  state = { initialPrice: 0 };

  componentDidUpdate() {
    const initialFormData = {
      maker: this.props.makerSelected,
      car: this.props.carSelected
    };

    this.props.dispatch(initialize('search', initialFormData));
  }

  onChangeInitialPrice(price) {
    this.props.onChangeSearch({
      type: 'initialPrice',
      value: price
    });
  }

  onChangeFinalPrice(price) {
    this.props.onChangeSearch({
      type: 'finalPrice',
      value: price
    });
  }

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

    const renderCarsOption = _.map(this.props.carsToFilter || this.props.cars, (car) => {
      return <option key={car._id} value={car._id}>{car.name}</option>
    });

    return (
      <div className='ui segment'>
        <h2 className='ui floated header'>Cars</h2>
        <div className='ui grid form'>
          <div className='four wide column'>
            <Field name='maker' label='Maker' component={selectInput} onChange={this.onChange.bind(this)}>
              <option value="">Select a maker</option>
              {renderMakerOption}
            </Field>
          </div>
          <div className='four wide column'>
            <Field name='car' label='Car' component={selectInput} onChange={this.onChange.bind(this)}>
              <option value="">Select a car</option>
              {renderCarsOption}
            </Field>
          </div>
          <div className='four wide column field'>
            <label>Initial Price</label>
            <CurrencyInput name='initialPrice' onChange={this.onChangeInitialPrice.bind(this)} />
          </div>
          <div className='four wide column field'>
            <label>Final Price</label>
            <CurrencyInput name='finalPrice' onChange={this.onChangeFinalPrice.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'search'
})(Search);
