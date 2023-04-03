import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Products from '../Pages/Products';
import Checkout from '../Pages/Checkout';
import Auth from '../Components/Auth';
import MyOrders from '../Pages/MyOrders';
import OrderDetails from '../Pages/OrderDetails';

function Routes() {
  const authDetails = (props) => (
    <>
      <Auth />
      <OrderDetails { ...props } />
    </>
  );

  const authMyOrders = (props) => (
    <>
      <Auth />
      <MyOrders { ...props } />
    </>
  );
  return (
    <Switch>
      <Route
        path="/seller/orders/:id"
        render={ authDetails }
      />
      <Route
        path="/seller/orders"
        render={ authMyOrders }
      />
      <Route
        path="/customer/orders/:id"
        render={ authDetails }
      />
      <Route
        path="/customer/orders"
        render={ authMyOrders }
      />
      <Route
        path="/customer/checkout"
        render={ (props) => (
          <>
            <Auth />
            <Checkout { ...props } />
          </>
        ) }
      />
      <Route
        path="/customer/products"
        render={ (props) => (
          <>
            <Auth />
            <Products { ...props } />
          </>
        ) }
      />
      <Route path="/register" component={ Register } />
      <Route
        path="/login"
        render={ (props) => (
          <>
            <Auth />
            <Login { ...props } />
          </>
        ) }
      />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default Routes;
