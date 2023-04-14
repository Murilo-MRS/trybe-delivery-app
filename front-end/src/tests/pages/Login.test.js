import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';

describe.only('Tests referring to the login page.', () => {
  const emailDataTestId = 'common_login__input-email';
  const loginBtnDataTestId = 'common_login__button-login';
  const registerBtnDataTestId = 'common_login__button-register';
  const passwordDataTestId = 'common_login__input-password';
  const validPassword = '$#zebirita#$';

  afterEach(() => {
    localStorage.clear();
  });

  it('1 - Test: if the page has an input with placeholder email@email.com.', () => {
    renderWithRouter(<App />);
    const placeholder = screen.getByPlaceholderText('email@email.com');
    expect(placeholder).toBeInTheDocument();
  });

  test('2 - Test: if the page has an input with placeholder *******.', () => {
    renderWithRouter(<App />);
    const placeholder = screen.getByPlaceholderText('*******');
    expect(placeholder).toBeInTheDocument();
  });

  it('3 - Test: if the page has a button with the word Login.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
  });

  it('4 - Test: if the page has a button with the attribute disabled.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toHaveAttribute('disabled');
  });

  it('5 - Test: if the page has a button with the word "Ainda não tenho conta".', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: 'Cadastre-se',
    });
    expect(button).toBeInTheDocument();
  });

  it('6 - Test: if the page has only 2 buttons.', () => {
    renderWithRouter(<App />);
    const button = screen.getAllByRole('button');
    expect(button).toHaveLength(2);
  });

  it('7 - Test: if the page has the Email label.', () => {
    renderWithRouter(<App />);
    const label = screen.getByTestId(emailDataTestId);
    expect(label).toBeInTheDocument();
  });

  it('8 - Test: if the page has the Password label.', () => {
    renderWithRouter(<App />);
    const label = screen.getByTestId(passwordDataTestId);
    expect(label).toBeInTheDocument();
  });

  it('9 - Test: if disable the login button when the page loads', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('common_login__button-login');
    expect(button).toBeDisabled();
  });

  it('10 - If error message show with login invalid user', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    fireEvent.change(email, { target: { value: 'zebirasdasdia@email.com' } });
    fireEvent.change(password, { target: { value: validPassword } });

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    const errorMsg = await waitFor(() => screen
      .getByTestId('common_login__element-invalid-email'));

    expect(errorMsg).toBeInTheDocument();
  });

  it('11 - Test: if activation of login button with valid data', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    fireEvent.change(email, { target: { value: 'zebirita@email.com' } });
    fireEvent.change(password, { target: { value: validPassword } });

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));

    const logoutBtn = screen.getByTestId('customer_products__element-navbar-link-logout');
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(loginButton);
  });

  it('12 - Test: if redirect to /register', async () => {
    const { history } = renderWithRouter(<App />);
    const registerButton = screen.getByTestId(registerBtnDataTestId);

    fireEvent.click(registerButton);

    await waitFor(() => expect(history.location.pathname).toBe('/register'));
  });
});
