import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../Utils/LocalStorage';

export default function Auth() {
  const [isNotLogged, setIsNotLogged] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsNotLogged(true);
  }, []);

  return (
    <div>
      {isNotLogged ? <Redirect to="/login" /> : <Redirect to="/customer/products" />}
    </div>
  );
}
