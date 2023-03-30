import React from 'react';
import DetailsOrders from '../Components/DetailsOrders';
import FinalizeOrder from '../Components/FinalizeOrders';
import Navbar from '../Components/Navbar';

function Checkout() {
  return (
    <main>
      <Navbar />
      <FinalizeOrder />
      <DetailsOrders />
    </main>
  );
}

export default Checkout;
