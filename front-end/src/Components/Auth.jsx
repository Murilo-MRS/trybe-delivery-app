import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../Utils/LocalStorage';

export default function Auth() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);
  }, []);

  return (
    <div>
      {isLogged && <Redirect to="/login" />}
    </div>
  );
}
