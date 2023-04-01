import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';
import { getRequest } from '../Utils/axios';
import { getProductsCart, saveTotalPrice } from '../Utils/LocalStorage';

export default function Products({ history }) {
  const [dataProducts, setDataProducts] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editionCount, setEditionCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getRequest('/customer/products');
      return setDataProducts(products);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const cart = getProductsCart() || [];
    setCartProducts(cart);
  }, [editionCount]);

  useEffect(() => {
    const total = saveTotalPrice(cartProduct);
    setTotalPrice(total);
  }, [cartProduct]);

  return (
    <div>
      <h1>Products</h1>
      <Navbar />
      {dataProducts.map(({ id, name, price, urlImage }) => (
        <ProductCard
          key={ id }
          id={ id }
          productName={ name }
          price={ price }
          urlImage={ urlImage }
          forceRender={ setEditionCount }
        />
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ cartProduct.length === 0 }
      >
        Ver carrinho:R$
        <span data-testid="customer_products__checkout-bottom-value">
          {totalPrice}
        </span>
      </button>
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.func,
}.isRequired;
