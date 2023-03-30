import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser, logout } from '../Utils/LocalStorage';

export default function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = getUser();
    return setUserName(user?.name);
  }, []);

  return (
    <nav>
      <NavLink
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS

      </NavLink>
      <NavLink
        to="/customer/checkout"
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </NavLink>
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
