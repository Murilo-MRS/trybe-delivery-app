import React from 'react';
import PropTypes from 'prop-types';
import { removeProductCart } from '../Utils/LocalStorage';
import formatValues from '../Utils/normalize';

function OrderDescription({ history, orders, totalPrice, updateCart }) {
  const { location: { pathname } } = history;
  const path = pathname.includes('checkout') ? 'checkout' : 'order_details';

  return (
    <div>
      Finalizar Pedido
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {path === 'checkout'
            && <th>Remover Item</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map(({ name: productName, quantity, price, id }, i) => (
            <tr key={ i }>
              <td
                data-testid={ `customer_${path}__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_${path}__element-order-table-name-${i}` }
              >
                {productName}
              </td>
              <td
                data-testid={ `customer_${path}__element-order-table-quantity-${i}` }
              >
                {quantity}
              </td>
              <td>
                R$
                <span
                  data-testid={ `customer_${path}__element-order-table-unit-price-${i}` }
                >
                  {formatValues(price)}
                </span>
              </td>
              <td>
                R$
                <span
                  data-testid={ `customer_${path}__element-order-table-sub-total-${i}` }
                >
                  {formatValues(Number(price) * Number(quantity))}
                </span>
              </td>
              {
                path === 'checkout' && (
                  <td
                    data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  >
                    <button
                      type="button"
                      onClick={ () => {
                        removeProductCart({ id });
                        return updateCart();
                      } }
                    >
                      Remover
                    </button>
                  </td>)
              }
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Total: R$
        <span data-testid={ `customer_${path}__element-order-total-price` }>
          {formatValues(totalPrice)}
        </span>
      </div>
    </div>
  );
}

OrderDescription.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  orders: PropTypes.array,
  totalPrice: PropTypes.string,
  updateCart: PropTypes.func,
}.isRequired;

export default OrderDescription;
