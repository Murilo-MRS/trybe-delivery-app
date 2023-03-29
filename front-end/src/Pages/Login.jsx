/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { userRequest, setToken } from '../Utils/axios';
import verifyFields from '../Utils/validateFields';
import { saveUser } from '../Utils/LocalStorage';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verify = verifyFields(email, password);
    setIsDisable(!verify);
  }, [email, password]);

  const handleLogin = async () => {
    const loginInfo = {
      email,
      password,
    };
    try {
      const { id, ...user } = await userRequest('/login', loginInfo);
      saveUser(user);
      setToken(user.token);
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
          onClick={ () => history.push('/register') }
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
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
