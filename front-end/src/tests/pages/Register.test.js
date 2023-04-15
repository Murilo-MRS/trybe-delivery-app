/* eslint-disable max-len */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import allProductsMock from '../mocks/allProducts.mock';

describe('Tests referring to the register page.', () => {
  const nameDataTestId = 'common_register__input-name';
  const emailDataTestId = 'common_register__input-email';
  const passwordDataTestId = 'common_register__input-password';
  const registerBtnDataTestId = 'common_register__button-register';
  const validName = 'João da Silva';
  const validEmail = 'joao@email.com';
  const validPassword = 'joao123';
  const alreadyUsedEmail = 'zebirita@email.com';

  const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1 - Test: register with valid data', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_CUSTOMER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(allProductsMock),
      }));
    const { history } = renderWithRouter(<App />, { initialEntries: ['/register'] });

    const buttonRegister = screen.getByTestId(registerBtnDataTestId);
    const inputName = screen.getByTestId(nameDataTestId);
    const inputEmail = screen.getByTestId(emailDataTestId);
    const inputPassword = screen.getByTestId(passwordDataTestId);

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);

    expect(buttonRegister).toBeEnabled();

    userEvent.click(buttonRegister);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });

    const logoutBtn = screen.getByTestId('customer_products__element-navbar-link-logout');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
  });

  it('2 - If error message show with login invalid user', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/register'] });

    const inputName = screen.getByTestId(nameDataTestId);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const buttonRegister = screen.getByTestId(registerBtnDataTestId);

    userEvent.type(inputName, validName);
    userEvent.type(email, alreadyUsedEmail);
    userEvent.type(password, validPassword);

    userEvent.click(buttonRegister);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/register');
    });

    const errorMsg = await waitFor(() => screen
      .getByTestId('common_register__element-invalid_register'));

    expect(errorMsg).toBeInTheDocument();
  });
});
