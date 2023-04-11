import { render, screen } from '@testing-library/react';
import Register from '../../Pages/Register';

describe('Tests referring to the register page.', () => {
  const setup = () => render(<Register />);

  it('1 - Test: if the name field is present on the screen.', () => {
    setup();
    const inputName = screen.getByTestId('common_register__input-name');
    expect(inputName).toBeInTheDocument();
  });

  it('2 - Test: if the email field is present on the screen.', () => {
    setup();
    const inputEmail = screen.getByTestId('common_register__input-email');
    expect(inputEmail).toBeInTheDocument();
  });

  it('3 - Test: if the password field is present on the screen.', () => {
    setup();
    const inputPassword = screen.getByTestId('common_register__input-password');
    expect(inputPassword).toBeInTheDocument();
  });

  it('4 - Test: if the registration button is present on the screen.', () => {
    setup();
    const buttonRegister = screen.getByTestId(
      'common_register__button-register',
    );
    expect(buttonRegister).toBeInTheDocument();
  });

  it('5 - Test: if the registration button is disabled', () => {
    setup();
    const buttonRegister = screen.getByTestId(
      'common_register__button-register',
    );
    expect(buttonRegister).toBeDisabled();
  });
});
