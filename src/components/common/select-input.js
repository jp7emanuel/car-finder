import React from 'react';

const selectInput = ({ input, label, type, meta: { touched, error }, children }) => (
  <div className={`field ${touched && error ? 'field error' : ''}`}>
    <label>{label}</label>
    <select className='ui fluid dropdown' {...input}>
      {children}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

export { selectInput };
