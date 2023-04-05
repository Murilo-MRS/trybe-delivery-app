/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { postRequest, setToken } from '../Utils/axios';
import verifyFields, { getUserRoute } from '../Utils/validateFields';
import { saveUser } from '../Utils/LocalStorage';

const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 8px;
  img {
    width: 22vw;
    min-width: 200px
  };
  form {
    min-width: 220px;
    min-height: 220px;
    width: 20vw;
    height: 22vh;
    background-color: #495057;
    border-radius: 4px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  p {
    color: white;
  }
`;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState('');

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
      const user = await postRequest('/login', loginInfo);
      saveUser(user);
      setUserRole(user.role);
      setToken(user.token);
      return setIsLogged(true);
    } catch (error) {
      setIsIncorrectValues(true);
      return setErrorMessage(error.response.data.message);
    }
  };

  return (
    <ContainerLogin>
      <img src="http://localhost:3001/images/Logo.svg" alt="Logo" width="300px" />
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
          label="Senha"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="common_login__input-password"
          id="password-input"
          value={ password }
        />
        <Button
          onClick={ handleLogin }
          text="Entrar"
          dataTestId="common_login__button-login"
          disabled={ isDisable }
          textColor="white"
          backgroundColor="#995bd5"
          borderColor="1px solid black"
        />
        <Button
          onClick={ () => history.push('/register') }
          text="Cadastre-se"
          dataTestId="common_login__button-register"
          disabled={ false }
          textColor="black"
          backgroundColor="#80c423"
          borderColor="2px solid black"
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
      {isLogged && <Redirect to={ getUserRoute(userRole) } />}
    </ContainerLogin>
  );
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
