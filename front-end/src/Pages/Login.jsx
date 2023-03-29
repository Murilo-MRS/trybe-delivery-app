/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { loginRequest, setToken } from '../Utils/axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const verifyFields = () => {
    const MIN_LENGTH = 6;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email) && password.length >= MIN_LENGTH;
  };

  useEffect(() => {
    const verify = verifyFields();
    setIsDisable(!verify);
  }, [email, password]);

  const handleLogin = async () => {
    const loginInfo = {
      email,
      password,
    };
    try {
      const token = await loginRequest('/login', loginInfo);
      console.log(token.token);
      setToken(token.token);
      return setIsLogged(true);
    } catch (error) {
      setIsIncorrectValues(true);
      return setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <form>
        <Input
          type="email"
          placeholder="email@email.com"
          label="Email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          dataTestId="common_login__input-email"
          id="email-input"
          value={ email }
        />
        <Input
          type="password"
          placeholder="*******"
          label="Password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="common_login__input-password"
          id="password-input"
          value={ password }
        />
        <Button
          onClick={ handleLogin }
          text="Login"
          dataTestId="common_login__button-login"
          disabled={ isDisable }
        />
        <Button
          onClick={ () => console.log('register') }
          text="Ainda não tenho conta"
          dataTestId="common_login__button-register"
          disabled={ false }
        />
      </form>
      {
        isIncorrectValues
        && (
          <p data-testid="common_login__element-invalid-email">
            { errorMessage }
          </p>
        )
      }
      {isLogged && <Redirect to="/customer/products" />}
      {/* {toRegister && <Redirect to="/register" />} */}
    </div>
  );
}

export default Login;
