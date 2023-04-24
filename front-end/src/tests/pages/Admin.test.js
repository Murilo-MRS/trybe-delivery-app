/* eslint-disable max-len */
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './utils/renderWithRouter';
import usersMock from '../mocks/users.mock';
import mockAxios from './utils/mockAxios';
import { CREATED_STATUS, STATUS_OK,
  admEmail, admPassword, DELETE_STATUS,
  admRegisterBtnDataTestId,
  admRegisterEmailDataTestId,
  admRegisterErrMsgDataTestId,
  admRegisterNameDataTestId,
  admRegisterPasswordDataTestId,
  admRegisterSelectDataTestId,
  emailDataTestId, loginBtnDataTestId,
  loginEndpoint, newUserMock, passwordDataTestId,
} from '../mocks/data.mocks';

const TOKEN_ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjgxMjM5MDUyLCJleHAiOjE2ODE4NDM4NTJ9.fB-uigOpqdz_Y3Enzmw_CVVl816ne529XJEBVhh8nAA';

describe('Tests referring to the login page.', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('1 - Test: cria usuário com dados válidos', async () => {
    mockAxios
      .onPost(loginEndpoint)
      .replyOnce(STATUS_OK, { token: TOKEN_ADMIN })
      .onGet('http://localhost:3001/users')
      .replyOnce(STATUS_OK, { user: usersMock });

    renderWithRouter(<App />);
    const email = screen.getByTestId(emailDataTestId);
    const password = screen.getByTestId(passwordDataTestId);
    const loginButton = screen.getByTestId(loginBtnDataTestId);

    userEvent.type(email, admEmail);
    userEvent.type(password, admPassword);

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    mockAxios
      .onPost('http://localhost:3001/admin/register')
      .replyOnce(CREATED_STATUS);

    const nameInput = await waitFor(() => screen.getByTestId(admRegisterNameDataTestId));
    const emailInput = await waitFor(() => screen.getByTestId(admRegisterEmailDataTestId));
    const passwordInput = await waitFor(() => screen.getByTestId(admRegisterPasswordDataTestId));
    const roleSelect = await waitFor(() => screen.getByTestId(admRegisterSelectDataTestId));
    const createUserBtn = await waitFor(() => screen.getByTestId(admRegisterBtnDataTestId));

    userEvent.type(nameInput, newUserMock.name);
    userEvent.type(emailInput, newUserMock.email);
    userEvent.type(passwordInput, newUserMock.password);
    userEvent.selectOptions(roleSelect, newUserMock.role);
    userEvent.click(createUserBtn);

    mockAxios
      .onGet('http://localhost:3001/users')
      .replyOnce(STATUS_OK, [...usersMock, newUserMock]);

    const newUserName = await waitFor(() => screen.getByText(newUserMock.name));
    expect(newUserName).toBeInTheDocument();

    userEvent.click(createUserBtn);
    const errMsg = await waitFor(() => screen.getByTestId(admRegisterErrMsgDataTestId));

    expect(errMsg).toBeInTheDocument();

    mockAxios
      .onDelete('http://localhost:3001/admin/delete/4')
      .replyOnce(DELETE_STATUS);

    const deleteBtn = await waitFor(() => screen.getByTestId('admin_manage__element-user-table-remove-4'));
    userEvent.click(deleteBtn);
  });
});
