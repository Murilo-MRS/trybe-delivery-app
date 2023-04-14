import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Tests referring to the register page.', () => {
  const nameDataTestId = 'common_register__input-name';
  const emailDataTestId = 'common_register__input-email';
  const passwordDataTestId = 'common_register__input-password';
  const registerBtnDataTestId = 'common_register__button-register';
  const validName = 'João da Silva';
  const validEmail = 'joao@email.com';
  const validPassword = 'joao123';
  const alreadyUsedEmail = 'zebirita@email.com';

  afterEach(() => {
    localStorage.clear();
  });

  it('1 - Test: if the name field is present on the screen.', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });
    const inputName = screen.getByTestId(nameDataTestId);
    expect(inputName).toBeInTheDocument();
  });

  it('2 - Test: if the email field is present on the screen.', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });
    const inputEmail = screen.getByTestId(emailDataTestId);
    expect(inputEmail).toBeInTheDocument();
  });

  it('3 - Test: if the password field is present on the screen.', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });
    const inputPassword = screen.getByTestId(passwordDataTestId);
    expect(inputPassword).toBeInTheDocument();
  });

  it('4 - Test: if the registration button is present on the screen.', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });
    const buttonRegister = screen.getByTestId(registerBtnDataTestId);
    expect(buttonRegister).toBeInTheDocument();
  });

  it('5 - Test: if the registration button is disabled', () => {
    renderWithRouter(<App />, { initialEntries: ['/register'] });
    const buttonRegister = screen.getByTestId(registerBtnDataTestId);
    expect(buttonRegister).toBeDisabled();
  });

  it('6 - Test: register with valid data', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/register'] });

    const buttonRegister = screen.getByTestId(registerBtnDataTestId);
    const inputName = screen.getByTestId(nameDataTestId);
    const inputEmail = screen.getByTestId(emailDataTestId);
    const inputPassword = screen.getByTestId(passwordDataTestId);

    fireEvent.change(inputName, { target: { value: validName } });
    fireEvent.change(inputEmail, { target: { value: validEmail } });
    fireEvent.change(inputPassword, { target: { value: validPassword } });

    expect(buttonRegister).toBeEnabled();

    fireEvent.click(buttonRegister);

    await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));
  });

  it('7 - If error message show with login invalid user', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(nameDataTestId);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const buttonRegister = screen.getByTestId(registerBtnDataTestId);

    fireEvent.change(inputName, { target: { value: validName } });
    fireEvent.change(email, { target: { value: alreadyUsedEmail } });
    fireEvent.change(password, { target: { value: validPassword } });

    fireEvent.click(buttonRegister);

    const errorMsg = await waitFor(() => screen
      .getByTestId('common_register__element-invalid_register'));

    await waitFor(() => expect(history.location.pathname).toBe('/register'));
    expect(errorMsg).toBeInTheDocument();
  });
});
