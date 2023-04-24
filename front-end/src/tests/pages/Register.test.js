/* eslint-disable max-len */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import allProductsMock from '../mocks/allProducts.mock';
import mockAxios from './utils/mockAxios';
import {
  STATUS_OK,
  alreadyUsedEmail, nameDataTestId,
  registerEndpoint, validEmail,
  validName, validPassword,
  emailRegisterDataTestId,
  passwordRegisterDataTestId,
  registerRegisterBtnDataTestId,
} from '../mocks/data.mocks';

const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';

describe('Tests referring to the register page.', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('1 - Test: register with valid data', async () => {
    mockAxios
      .onPost(registerEndpoint)
      .replyOnce(STATUS_OK, { token: TOKEN_CUSTOMER })
      .onGet('http://localhost:3001/customer/products/')
      .replyOnce(STATUS_OK, { products: allProductsMock });

    const { history } = renderWithRouter(<App />, {
      initialEntries: ['/register'],
    });

    const buttonRegister = screen.getByTestId(registerRegisterBtnDataTestId);
    const inputName = screen.getByTestId(nameDataTestId);
    const inputEmail = screen.getByTestId(emailRegisterDataTestId);
    const inputPassword = screen.getByTestId(passwordRegisterDataTestId);

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);

    expect(buttonRegister).toBeEnabled();

    userEvent.click(buttonRegister);

    await waitFor(() => {
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe('/customer/products');
    });

    const logoutBtn = screen.getByTestId(
      'customer_products__element-navbar-link-logout',
    );
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
  });

  it('2 - If error message show with login invalid user', async () => {
    const { history } = renderWithRouter(<App />, {
      initialEntries: ['/register'],
    });

    const inputName = screen.getByTestId(nameDataTestId);
    const email = screen.getByTestId(emailRegisterDataTestId);
    const password = screen.getByTestId(passwordRegisterDataTestId);
    const buttonRegister = screen.getByTestId(registerRegisterBtnDataTestId);

    userEvent.type(inputName, validName);
    userEvent.type(email, alreadyUsedEmail);
    userEvent.type(password, validPassword);

    userEvent.click(buttonRegister);

    await waitFor(() => {
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe('/register');
    });

    const errorMsg = await waitFor(() => screen.getByTestId('common_register__element-invalid_register'));

    expect(errorMsg).toBeInTheDocument();
  });
});
