import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { postRequest, setToken } from '../Utils/axios';
import { saveUser } from '../Utils/LocalStorage';
import verifyFields from '../Utils/validateFields';

function Register() {
  const MIN_LENGTH_NAME = 12;
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verify = verifyFields(email, password);
    const verifyName = userName.length >= MIN_LENGTH_NAME;
    setIsDisable(!verify || !verifyName);
  }, [email, password, userName]);

  const handleRegister = async () => {
    const userInfo = {
      name: userName,
      email,
      password,
      role: 'customer',
    };
    try {
      const { id, ...user } = await postRequest('/register', userInfo);
      saveUser(user);
      setToken(user.token);
      return setIsRegistered(true);
    } catch (error) {
      setIsIncorrectValues(true);
      return setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <Input
          type="text"
          placeholder="Seu nome"
          label="Nome"
          onChange={ ({ target: { value } }) => setUserName(value) }
          dataTestId="common_register__input-name"
          id="name-input"
          value={ userName }
        />
        <Input
          type="email"
          placeholder="email@email.com"
          label="Email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          dataTestId="common_register__input-email"
          id="email-input"
          value={ email }
        />
        <Input
          type="password"
          placeholder="*******"
          label="Password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="common_register__input-password"
          id="password-input"
          value={ password }
        />
        <Button
          onClick={ () => handleRegister() }
          text="Cadastrar"
          dataTestId="common_register__button-register"
          disabled={ isDisable }
        />

      </form>
      {
        isIncorrectValues
        && (
          <p data-testid="common_register__element-invalid_register">
            { errorMessage }
          </p>
        )
      }
      {isRegistered && <Redirect to="/customer/products" />}

    </div>
  );
}

export default Register;
