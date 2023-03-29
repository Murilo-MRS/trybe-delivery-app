import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function ProductCard({ id, productName, price, urlImage }) {
  return (
    <div>
      <p>
        R$
        {price}
      </p>
      <img src={ urlImage } alt={ productName } />
      <h3>{productName}</h3>
      <Button
        onClick={ () => console.log('adicionou') }
        dataTestId={ `customer_products__button-card-add-item-${id}` }
        disable={ false }
        text="+"
      />
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        name="input_card_quantity"
        id={ `product-${id}` }
        min="0"
      />
      <Button
        onClick={ () => console.log('retirou') }
        dataTestId={ `customer_products__button-card-rm-item-${id}` }
        disable={ false }
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
