/* eslint-disable max-len */
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import allProductsMock from '../mocks/allProducts.mock';
import usersMock from '../mocks/users.mock';
import ordersMock from '../mocks/orders.mock';
import mockAxios from './utils/mockAxios';
import { NOT_FOUND, STATUS_OK, admEmail, admPassword, customerEmail,
  customerPassword, emailDataTestId, loginBtnDataTestId,
  loginEndpoint, passwordDataTestId, registerBtnDataTestId,
  sellerEmail, sellerPassword } from '../mocks/data.mocks';

const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';
const TOKEN_SELLER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIn0sImlhdCI6MTY4MTMyNzk5NCwiZXhwIjoxNjgxOTMyNzk0fQ.BaHuWKIaXOf-M4DRYAMT_Xr4t6UCsOF8iV95dwsz5U0';
const TOKEN_ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjgxMjM5MDUyLCJleHAiOjE2ODE4NDM4NTJ9.fB-uigOpqdz_Y3Enzmw_CVVl816ne529XJEBVhh8nAA';

describe('Test: Fluxo de login com diferentes tipos de usuários', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('1 - If error message show with login invalid user', async () => {
    mockAxios.onPost(loginEndpoint).reply(NOT_FOUND);
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    userEvent.type(email, 'zebirasdasdia@email.com');
    userEvent.type(password, customerPassword);

    expect(email.value).toBe('zebirasdasdia@email.com');
    expect(password.value).toBe(customerPassword);
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const errorMsg = await waitFor(() => screen
      .getByTestId('common_login__element-invalid-email'));

    expect(errorMsg).toBeInTheDocument();
  });

  it('2 - Test: login /customer', async () => {
    mockAxios
      .onPost(loginEndpoint)
      .replyOnce(STATUS_OK, { token: TOKEN_CUSTOMER })
      .onGet('http://localhost:3001/customer/products/')
      .replyOnce(STATUS_OK, { products: allProductsMock });

    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    userEvent.type(email, customerEmail);
    userEvent.type(password, customerPassword);

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/customer/products');
    });
  });

  it('3 - Test: login /seller', async () => {
    mockAxios
      .onPost(loginEndpoint)
      .replyOnce(STATUS_OK, { token: TOKEN_SELLER })
      .onGet('http://localhost:3001/seller/2/sales')
      .replyOnce(STATUS_OK, { orders: ordersMock });

    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    userEvent.type(email, sellerEmail);
    userEvent.type(password, sellerPassword);

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/seller/orders');
    });
  });

  it('4 - Test: login /admin', async () => {
    mockAxios
      .onPost(loginEndpoint)
      .replyOnce(STATUS_OK, { token: TOKEN_ADMIN })
      .onGet('http://localhost:3001//users')
      .replyOnce(STATUS_OK, { orders: usersMock });

    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    userEvent.type(email, admEmail);
    userEvent.type(password, admPassword);

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/admin/manage');
    });
  });

  it('5 - Test: redirect to /register', async () => {
    const { history } = renderWithRouter(<App />);
    const registerButton = screen.getByTestId(registerBtnDataTestId);

    userEvent.click(registerButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/register');
    });
  });
});
