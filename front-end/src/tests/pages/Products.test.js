/* eslint-disable max-len */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import allProductsMock from '../mocks/allProducts.mock';
import mockAxios from './utils/mockAxios';

describe('Test: login /seller', () => {
  const emailDataTestId = 'common_login__input-email';
  const loginBtnDataTestId = 'common_login__button-login';
  const passwordDataTestId = 'common_login__input-password';
  const customerEmail = 'zebirita@email.com';
  const customerPassword = '$#zebirita#$';
  // const PRODUCT_LENGTH = 11;

  const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1 - Test: /customer/products aparecem os produtos', async () => {
    mockAxios
      .onPost(loginEndpoint)
      .replyOnce(STATUS_OK, { token: TOKEN_CUSTOMER })
      .onGet('http://localhost:3001/customer/products/')
      .replyOnce(STATUS_OK, { products: allProductsMock });

    renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    userEvent.type(email, customerEmail);
    userEvent.type(password, customerPassword);
    userEvent.click(loginButton);

    const addBtn1 = await waitFor(() => screen.getByTestId('customer_products__button-card-add-item-1'));
    const removeBtn1 = await waitFor(() => screen.getByTestId('customer_products__button-card-rm-item-1'));
    const addBtn2 = await waitFor(() => screen.getByTestId('customer_products__button-card-add-item-2'));
    const removeBtn2 = await waitFor(() => screen.getByTestId('customer_products__button-card-rm-item-2'));

    expect(addBtn1).toBeInTheDocument();
    expect(removeBtn1).toBeInTheDocument();
    expect(removeBtn1).toBeDisabled();

    userEvent.click(addBtn1);
    expect(removeBtn1).toBeEnabled();
    userEvent.click(removeBtn1);

    userEvent.click(addBtn2);
    expect(removeBtn2).toBeEnabled();
    userEvent.click(removeBtn2);
  });
});
