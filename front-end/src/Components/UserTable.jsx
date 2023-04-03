import PropTypes from 'prop-types';
import React from 'react';
import { deleteRequest, getRequest } from '../Utils/axios';

export default function UserTable({ users, updateUsers }) {
  const deleteUser = async (id) => {
    await deleteRequest(`/admin/delete/${id}`);
    const response = await getRequest('/users');
    return updateUsers(response);
  };

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
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {user.name}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {user.email}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {user.role}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ async () => deleteUser(user.id) }
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
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

UserTable.propTypes = {
  updateUsers: PropTypes.func,
  users: PropTypes.array,
}.isRequired;
