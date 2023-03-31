import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Pages/Login';

describe('Tests referring to the login page.', () => {
  const setup = () => render(<Login />);

  it('Test: if the page has an input with placeholder email@email.com.', () => {
    setup();
    const placeholder = screen.getByPlaceholderText('email@email.com');
    expect(placeholder).toBeInTheDocument();
  });

  test('Test: if the page has an input with placeholder *******.', () => {
    setup();
    const placeholder = screen.getByPlaceholderText('*******');
    expect(placeholder).toBeInTheDocument();
  });

  it('Test: if the page has a button with the word Login.', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toBeInTheDocument();
  });

  it('Test: if the page has a button with the attribute disabled.', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toHaveAttribute('disabled');
  });

  it('Test: if the page has a button with the word "Ainda não tenho conta".', () => {
    setup();
    const button = screen.getByRole('button', {
      name: 'Ainda não tenho conta',
    });
    expect(button).toBeInTheDocument();
  });

  it('Test: if the page has only 2 buttons.', () => {
    setup();
    const button = screen.getAllByRole('button');
    expect(button).toHaveLength(2);
  });

  it('Test: if the page has the Email label.', () => {
    setup();
    const label = screen.getByLabelText('Email');
    expect(label).toBeInTheDocument();
  });

  it('Test: if the page has the Password label.', () => {
    setup();
    const label = screen.getByLabelText('Password');
    expect(label).toBeInTheDocument();
  });

  it('Test: if disable the login button when the page loads', () => {
    setup();
    const button = screen.getByTestId('common_login__button-login');
    expect(button).toBeDisabled();
  });

  it('Test: if activation of login button with valid email and password.', () => {
    setup();
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const loginButton = screen.getByTestId('common_login__button-login');
    fireEvent.change(email, { target: { value: 'test@test.com' } });
    fireEvent.change(password, { target: { value: 'test1234' } });
    expect(loginButton).toBeEnabled();
  });
});
