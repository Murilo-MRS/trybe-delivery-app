import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProductsCart, saveTotalPrice } from '../Utils/LocalStorage';
import FinalizeOrder from '../Components/FinalizeOrder';
import OrderDescription from '../Components/OrderDescription';
import Navbar from '../Components/Navbar';

function Checkout({ history }) {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateCart = () => {
    const products = getProductsCart() || [];
    setOrder(products);
  };

  useEffect(() => {
    updateCart();
  }, []);

  useEffect(() => {
    const total = saveTotalPrice(order);
    setTotalPrice(total);
  }, [order]);

  return (
    <main>
      <Navbar />
      <OrderDescription
        history={ history }
        orders={ order }
        totalPrice={ totalPrice }
        updateCart={ updateCart }
      />
      <FinalizeOrder history={ history } />
    </main>
  );
}

Checkout.propTypes = {
  history: PropTypes.func,
}.isRequired;
export default Checkout;
