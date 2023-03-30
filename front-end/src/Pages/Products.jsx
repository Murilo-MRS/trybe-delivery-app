import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';
import { productsRequest } from '../Utils/axios';
import { getProductsCart, getUser } from '../Utils/LocalStorage';
import formatValues from '../Utils/normalize';

export default function Products({ history }) {
  const [isLogged, setIsLogged] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editionCount, setEditionCount] = useState(0);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const products = await productsRequest('/customer/products');
      return setDataProducts(products);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const cart = getProductsCart() || [];
    setCartProducts(cart);
  }, [editionCount]);

  useEffect(() => {
    const total = cartProduct
      .reduce((acc, { price, quantity }) => acc + (Number(price) * Number(quantity)), 0);
    setTotalPrice(formatValues(total));
  }, [cartProduct]);

  return (
    <div>
      {isLogged && <Redirect to="/login" />}
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
