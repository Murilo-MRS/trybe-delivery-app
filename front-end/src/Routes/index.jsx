import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Products from '../Pages/Products';
import Checkout from '../Pages/Checkout';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/customer/checkout" component={ Checkout } />
    </Switch>
  );
}

export default Routes;
