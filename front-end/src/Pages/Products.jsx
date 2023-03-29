import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';
import { productsRequest } from '../Utils/axios';
import { getUser } from '../Utils/LocalStorage';

export default function Products() {
  const [isLogged, setIsLogged] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);

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
        />
      ))}
    </div>
  );
}
