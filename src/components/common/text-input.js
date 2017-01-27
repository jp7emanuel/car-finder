import React from 'react';

const textInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`field ${touched && error ? 'field error' : ''}`}>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export { textInput };
