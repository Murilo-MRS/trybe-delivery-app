/* eslint-disable max-len */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import allProductsMock from '../mocks/allProducts.mock';
import mockAxios from './utils/mockAxios';
import {
  STATUS_OK,
  TOKEN_CUSTOMER,
  checkoutBtnDataTestId,
  customerEmail,
  customerPassword,
  emailDataTestId,
  loginBtnDataTestId,
  loginEndpoint,
  passwordDataTestId,
} from '../mocks/data.mocks';

describe('Test: login /seller', () => {
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
    const checkouBtn = screen.getByTestId(checkoutBtnDataTestId);

    expect(addBtn1).toBeInTheDocument();
    expect(removeBtn1).toBeInTheDocument();
    expect(removeBtn1).toBeDisabled();

    userEvent.click(addBtn1);
    expect(removeBtn1).toBeEnabled();
    userEvent.click(removeBtn1);

    userEvent.click(addBtn1);
    userEvent.click(addBtn1);
    userEvent.click(addBtn2);

    expect(checkouBtn).toBeEnabled();
    userEvent.click(checkouBtn);
  });
});
