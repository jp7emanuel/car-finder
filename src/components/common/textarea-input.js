import React from 'react';

const textareaInput = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div className={`field ${touched && error ? 'field error' : ''}`}>
      <label>{label}</label>
      <div>
        <textarea {...input} placeholder={label} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

export { textareaInput };
