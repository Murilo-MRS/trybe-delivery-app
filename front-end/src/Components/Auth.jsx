import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../Utils/LocalStorage';
import { getUserRoute } from '../Utils/validateFields';

export default function Auth() {
  const [isNotLogged, setIsNotLogged] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) {
      return setIsNotLogged(true);
    }
    return setUserRole(user.role);
  }, []);

  return (
    <div>
      {isNotLogged
        ? <Redirect to="/login" /> : <Redirect to={ getUserRoute(userRole) } />}
    </div>
  );
}
