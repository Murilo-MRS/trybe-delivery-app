import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 100%;
    border-radius: 0.4em;
    height: 3em;
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `;

function Button({
  onClick,
  text,
  dataTestId,
  disabled,
  nameButton = 'button',
  textColor,
  backgroundColor,
  border,
}) {
  return (
    <StyledButton
      type="button"
      onClick={ onClick }
      data-testid={ dataTestId }
      disabled={ disabled }
      name={ nameButton }
      style={ { color: textColor, backgroundColor, border } }
    >
      {text}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}.isRequired;

export default Button;
