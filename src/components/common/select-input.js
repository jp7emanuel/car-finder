import React from 'react';

const selectInput = ({ input, label, type, meta: { touched, error }, children }) => {
  return (
  <div className={`field ${touched && error ? 'field error' : ''}`}>
    <label>{label}</label>
    <select className='ui search dropdown' {...input}>
      {children}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
  );
};

export { selectInput };
