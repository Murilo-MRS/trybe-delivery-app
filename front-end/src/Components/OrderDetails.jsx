import React, { useState, useEffect } from 'react';
import { getProductsCart, removeProductCart } from '../Utils/LocalStorage';
import formatValues from '../Utils/normalize';

function OrderDetails() {
  const [order, setOrder] = useState([]);

  const updateCart = () => {
    const products = getProductsCart() || [];
    setOrder(products);
  };

  useEffect(() => {
    updateCart();
  }, []);

  const sumPrices = order.reduce(
    (acc, curr) => curr.price * curr.quantity + acc,
    0,
  );

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
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {order.map(({ productName, quantity, price, id }, i) => (
            <tr key={ i }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {productName}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {quantity}
              </td>
              <td>
                R$
                <span
                  data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
                >
                  {formatValues(price)}

                </span>
              </td>
              <td>
                R$
                <span
                  data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
                >
                  {formatValues(price * quantity)}
                </span>
              </td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Total: R$
        <span data-testid="customer_checkout__element-order-total-price">
          {formatValues(sumPrices)}
        </span>
      </div>
    </div>
  );
}

export default OrderDetails;
