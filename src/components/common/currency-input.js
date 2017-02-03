import React from 'react';
import CurrencyInput from 'react-currency-input';

const currencyInput = ({ input, label, type, meta: { touched, error }, children }) => {
  return (
    <div className={`field ${touched && error ? 'field error' : ''}`}>
      <label>{label}</label>
      <CurrencyInput thousandSeparator='.' precision='3' {...input} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export { currencyInput };
