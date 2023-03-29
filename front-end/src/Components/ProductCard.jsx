/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { addProductCart, getProductsCart } from '../Utils/LocalStorage';

export default function ProductCard(product) {
  const { id, productName, price, urlImage } = product;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => addProductCart({ ...product, quantity }), [quantity]);

  const changeCart = async ({ target }) => {
    const products = getProductsCart() || [];
    if (target.name === 'add') {
      const productFromCart = products
        .find(({ id: idProd }) => idProd === id) || { ...product, quantity };
      productFromCart.quantity = quantity;
      return setQuantity((prev) => Number(prev) + 1);
    }
    const productFromCart = products
      .find(({ id: idProd }) => idProd === id) || { ...product, quantity };
    productFromCart.quantity = quantity;
    return setQuantity((prev) => Number(prev) - 1);
  };

  return (
    <div>
      <h3
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {productName}
      </h3>
      <img
        src={ urlImage }
        alt={ productName }
        style={ { width: '50px' } }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        R$
        { price }
      </p>
      <Button
        onClick={ changeCart }
        dataTestId={ `customer_products__button-card-add-item-${id}` }
        disable={ false }
        nameButton="add"
        text="+"
      />
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        name="input_card_quantity"
        onChange={ ({ target: { value } }) => setQuantity(Number(value)) }
        id={ `product-${id}` }
        min="0"
        value={ quantity }
      />
      <Button
        onClick={ changeCart }
        dataTestId={ `customer_products__button-card-rm-item-${id}` }
        disabled={ quantity <= 0 }
        nameButton="sub"
        text="-"
      />
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  productName: PropTypes.string,
  urlImage: PropTypes.string,
}.isRequired;
