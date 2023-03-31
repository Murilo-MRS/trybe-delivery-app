import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Products from '../Pages/Products';
import Checkout from '../Pages/Checkout';
import Auth from '../Components/Auth';

function Routes() {
  return (
    <Switch>
      <Route path="/customer/orders">
        <Auth />
      </Route>
      <Route path="/customer/checkout">
        <Auth />
        <Checkout />
      </Route>
      <Route path="/customer/products">
        <Auth />
        <Products />
      </Route>
      <Route path="/register" component={ Register } />
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default Routes;
