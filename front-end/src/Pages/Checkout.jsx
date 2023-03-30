import React from 'react';
import FinalizeOrder from '../Components/FinalizeOrder';
import OrderDetails from '../Components/OrderDetails';
import Navbar from '../Components/Navbar';

function Checkout() {
  return (
    <main>
      <Navbar />
      <OrderDetails />
      <FinalizeOrder />
    </main>
  );
}

export default Checkout;
