import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Navbar from '../Components/Navbar';
import UserTable from '../Components/UserTable';
import { getRequest, postRequest } from '../Utils/axios';
import verifyFields from '../Utils/validateFields';
import { getUser } from '../Utils/LocalStorage';

function Admin() {
  const MIN_LENGTH_NAME = 12;
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isIncorrectValues, setIsIncorrectValues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState('customer');

  const arrayOptions = [
    { value: 'customer', text: 'Cliente' },
    { value: 'seller', text: 'Vendedor' },
    { value: 'administrator', text: 'Administrador' },
  ];
  const TIME_MESSAGE_ERROR = 3000;

  useEffect(() => {
    const verify = verifyFields(email, password);
    const verifyName = userName.length >= MIN_LENGTH_NAME;
    setIsDisable(!verify || !verifyName);
  }, [email, password, userName]);

  const filterOwnUser = (usersArray) => {
    const ownUser = getUser();
    return usersArray.filter(({ id }) => id !== ownUser.id);
  };

  useEffect(() => {
    const request = async () => {
      const response = await getRequest('/users');

      return setUsers(filterOwnUser(response));
    };
    return request();
  }, []);

  const handleRegister = async () => {
    const userInfo = {
      name: userName,
      email,
      password,
      role: userRole,
    };
    try {
      await postRequest('/admin/register', userInfo);
      const response = await getRequest('/users');
      return setUsers(response);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsIncorrectValues(true);
      return setTimeout(() => {
        setIsIncorrectValues(false);
        return setErrorMessage('');
      }, TIME_MESSAGE_ERROR);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Cadastrar novo usuário</h1>
      <form>
        <Input
          type="text"
          placeholder="Seu nome"
          label="Nome"
          onChange={ ({ target: { value } }) => setUserName(value) }
          dataTestId="admin_manage__input-name"
          id="name-input"
          value={ userName }
        />
        <Input
          type="email"
          placeholder="email@email.com"
          label="Email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          dataTestId="admin_manage__input-email"
          id="email-input"
          value={ email }
        />
        <Input
          type="password"
          placeholder="*******"
          label="Password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="admin_manage__input-password"
          id="password-input"
          value={ password }
        />
        <label htmlFor="select">
          Tipo
          <select
            id="select"
            data-testid="admin_manage__select-role"
            onChange={ ({ target }) => setUserRole(target.value) }
          >
            { arrayOptions.map(({ text, value }, index) => (
              <option key={ index } value={ value }>{ text }</option>
            )) }
          </select>
        </label>
        <Button
          onClick={ () => handleRegister() }
          text="Cadastrar"
          dataTestId="admin_manage__button-register"
          disabled={ isDisable }
        />

      </form>
      {
        isIncorrectValues
        && (
          <p data-testid="admin_manage__element-invalid-register">
            { errorMessage }
          </p>
        )
      }
      <UserTable
        users={ users }
        updateUsers={ setUsers }
        filterUser={ filterOwnUser }
      />
    </div>
  );
}

export default Admin;
