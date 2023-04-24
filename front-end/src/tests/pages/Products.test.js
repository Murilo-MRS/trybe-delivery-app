/* eslint-disable max-len */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import allProductsMock from '../mocks/allProducts.mock';
import mockAxios from './utils/mockAxios';
import {
  STATUS_OK,
  checkoutBtnDataTestId, customerEmail,
  customerPassword, emailDataTestId,
  finishBtnDataTestId, inputAddressDataTestId,
  inputAddressNumDataTestId, loginBtnDataTestId,
  loginEndpoint, passwordDataTestId,
  selectSellerDataTestId, deliveredBtnDataTestId,
} from '../mocks/data.mocks';
import usersMock from '../mocks/users.mock';
import ordersMock from '../mocks/orders.mock';

const TOKEN_CUSTOMER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjgxMzI3NTIxLCJleHAiOjE2ODE5MzIzMjF9.5-jg8opGN28n8MrzjFCHKQPsqd3eqQX9_hHNVpqpS8o';

describe('Test: Fluxo de fazer pedido com usuário cliente', () => {
  const CREATED = 201;

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

    mockAxios
      .onGet('http://localhost:3001/sellers')
      .replyOnce(STATUS_OK, { sellers: [usersMock[0]] })
      .onPost('http://localhost:3001/sales')
      .replyOnce(CREATED, { sale: [ordersMock[0]] });

    const removeOrder = await waitFor(() => screen.getAllByText('Remover'));
    const selectSeller = await waitFor(() => screen.getByTestId(selectSellerDataTestId));
    const inputAddress = await waitFor(() => screen.getByTestId(inputAddressDataTestId));
    const inputAddressNum = await waitFor(() => screen.getByTestId(inputAddressNumDataTestId));
    const finishBtn = await waitFor(() => screen.getByTestId(finishBtnDataTestId));

    expect(removeOrder.length).toBe(2);
    userEvent.click(removeOrder[1]);

    await waitFor(() => userEvent.selectOptions(selectSeller, 'Fulana Pereira'));
    userEvent.type(inputAddress, 'Rua de Testes');
    userEvent.type(inputAddressNum, '123');

    userEvent.click(finishBtn);
    const changeToDeliveredBtn = await waitFor(() => screen
      .getByTestId(deliveredBtnDataTestId));

    expect(changeToDeliveredBtn).toBeInTheDocument();

    const navMyOrder = await waitFor(() => screen.getByTestId('customer_products__element-navbar-link-orders'));
    userEvent.click(navMyOrder);

    const orderLink = await waitFor(() => screen.getByTestId('customer_orders__element-order-id-1'));
    userEvent.click(orderLink);
  });
});
