import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser, logout } from '../Utils/LocalStorage';
import Logo from './Logo';

export default function Navbar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = getUser();
    setUserRole(user.role);
    return setUserName(user?.name);
  }, []);

  return (
    <nav>
      <Logo />
      {userRole === 'customer' && (
        <NavLink
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS

        </NavLink>

      )}
      { (userRole === 'customer' || userRole === 'seller') && (
        <NavLink
          to={ `/${userRole}/orders` }
          data-testid="customer_products__element-navbar-link-orders"
        >
          { userRole === 'customer' ? 'MEUS PEDIDOS' : 'PEDIDOS' }
        </NavLink>
      )}
      {userRole === 'administrator' && (
        <NavLink
          to="/admin/manage"
          data-testid="customer_products__element-navbar-link-products"
        >
          GERENCIAR USUÁRIOS

        </NavLink>

      )}
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { userName }
      </p>
      <NavLink
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        SAIR
      </NavLink>
    </nav>
  );
}
