import React from 'react';
import PropTypes from 'prop-types';
import FinalizeOrder from '../Components/FinalizeOrder';
import OrderDetails from '../Components/OrderDetails';
import Navbar from '../Components/Navbar';
import Auth from '../Components/Auth';

function Checkout({ history }) {
  return (
    <main>
      <Auth />
      <Navbar />
      <OrderDetails />
      <FinalizeOrder history={ history } />
    </main>
  );
}

Checkout.propTypes = {
  history: PropTypes.func,
}.isRequired;
export default Checkout;
