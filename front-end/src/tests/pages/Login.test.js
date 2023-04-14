/* eslint-disable max-len */
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import allProductsMock from '../mocks/allProducts.mock';
import usersMock from '../mocks/users.mock';
import ordersMock from '../mocks/orders.mock';

describe('Tests referring to the login page.', () => {
  const emailDataTestId = 'common_login__input-email';
  const loginBtnDataTestId = 'common_login__button-login';
  const registerBtnDataTestId = 'common_login__button-register';
  const passwordDataTestId = 'common_login__input-password';
  const customerEmail = 'zebirita@email.com';
  const customerPassword = '$#zebirita#$';
  const admEmail = 'adm@deliveryapp.com';
  const admPassword = '--adm2@21!!--';
  const sellerEmail = 'fulana@deliveryapp.com';
  const sellerPassword = 'fulana@123';

  const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';
  const TOKEN_SELLER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiRnVsYW5hIFBlcmVpcmEiLCJlbWFpbCI6ImZ1bGFuYUBkZWxpdmVyeWFwcC5jb20iLCJyb2xlIjoic2VsbGVyIn0sImlhdCI6MTY4MTMyNzk5NCwiZXhwIjoxNjgxOTMyNzk0fQ.BaHuWKIaXOf-M4DRYAMT_Xr4t6UCsOF8iV95dwsz5U0';
  const TOKEN_ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjgxMjM5MDUyLCJleHAiOjE2ODE4NDM4NTJ9.fB-uigOpqdz_Y3Enzmw_CVVl816ne529XJEBVhh8nAA';

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1 - If error message show with login invalid user', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    fireEvent.change(email, { target: { value: 'zebirasdasdia@email.com' } });
    fireEvent.change(password, { target: { value: customerPassword } });

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    const errorMsg = await waitFor(() => screen
      .getByTestId('common_login__element-invalid-email'));

    expect(errorMsg).toBeInTheDocument();
  });

  it('2 - Test: login /customer', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_CUSTOMER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(allProductsMock),
      }));
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    fireEvent.change(email, { target: { value: customerEmail } });
    fireEvent.change(password, { target: { value: customerPassword } });

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/customer/products');
    });

    const logoutBtn = screen.getByTestId('customer_products__element-navbar-link-logout');
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(logoutBtn);
  });

  it('3 - Test: login /seller', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_SELLER }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(ordersMock),
      }));
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    fireEvent.change(email, { target: { value: sellerEmail } });
    fireEvent.change(password, { target: { value: sellerPassword } });

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/seller/orders');
    });
  });

  it('4 - Test: login /admin', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ token: TOKEN_ADMIN }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(usersMock),
      }));
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    fireEvent.change(email, { target: { value: admEmail } });
    fireEvent.change(password, { target: { value: admPassword } });

    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/admin/manage');
    });
  });

  it('5 - Test: if redirect to /register', async () => {
    const { history } = renderWithRouter(<App />);
    const registerButton = screen.getByTestId(registerBtnDataTestId);

    fireEvent.click(registerButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/register');
    });
  });
});
