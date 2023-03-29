import PropTypes from 'prop-types';

function Button({ onClick, text, dataTestId, disabled }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ dataTestId }
      disabled={ disabled }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}.isRequired;

export default Button;
