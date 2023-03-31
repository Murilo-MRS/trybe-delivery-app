import React from 'react';
import PropTypes from 'prop-types';
import FinalizeOrder from '../Components/FinalizeOrder';
import OrderDescription from '../Components/OrderDescription';
import Navbar from '../Components/Navbar';

function Checkout({ history }) {
  return (
    <main>
      <Navbar />
      <OrderDescription />
      <FinalizeOrder history={ history } />
    </main>
  );
}

Checkout.propTypes = {
  history: PropTypes.func,
}.isRequired;
export default Checkout;
