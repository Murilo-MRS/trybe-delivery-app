import React, { useEffect, useState } from 'react';
import { getRequest } from '../Utils/axios';

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await getRequest('/users');
      return setUsers(response);
    };
    return request();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Item
            </th>
            <th>
              Nome
            </th>
            <th>
              E-mail
            </th>
            <th>
              Tipo
            </th>
            <th>
              Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={ index }>
              <td>
                {index + 1}
              </td>
              <td>
                {user.name}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.role}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => (user.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
