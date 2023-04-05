import PropTypes from 'prop-types';
import React from 'react';
import LabelInput from './CSS/LabelInput.styled';

function Input({ type, label, placeholder, id, dataTestId, onChange, value }) {
  return (
    <LabelInput htmlFor={ id }>
      {label}
      <input
        type={ type }
        placeholder={ placeholder }
        data-testid={ dataTestId }
        onChange={ onChange }
        id={ id }
        value={ value }
        name={ id }
      />
    </LabelInput>
  );
}

Input.propTypes = {
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

export default Input;
