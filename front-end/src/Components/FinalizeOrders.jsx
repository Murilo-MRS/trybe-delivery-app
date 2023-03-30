import React from 'react';

function FinalizeOrder() {
  const [productState, productSetState] = React.useState(
    JSON.parse(localStorage.getItem('cartItems') || []),
  );
  const products = JSON.parse(localStorage.getItem('cartItems') || []);

  const sumPrices = products.reduce(
    (acc, curr) => curr.price * curr.quantity + acc,
    0,
  );

  const removeItemByProductName = (productName) => {
    products.forEach((item, index) => {
      if (item.productName === productName) {
        products.splice(index, 1);
      }
    });
    console.log(productName);
    console.log(products);
    productSetState(products);
    localStorage.setItem('cartItem', JSON.stringify(products));
  };

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
          {productState.map(({ productName, quantity, price }, index) => (
            <tr key={ index }>
              <td
                data-testid={ `customer_checkout__
                element-order-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {productName}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `customer_checkout__
                element-order-table-unit-price-${index}` }
              >
                {Number(price).toFixed(2).replace('.', ',')}
              </td>
              <td
                data-testid={ `customer_checkout__
                element-order-table-sub-total-${index}` }
              >
                {Number(price * quantity)
                  .toFixed(2)
                  .replace('.', ',')}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                <button
                  type="button"
                  onClick={ () => removeItemByProductName(productName) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div data-testid="customer_checkout__element-order-total-price">
        Total: R$
        {`${sumPrices.toFixed(2)}`.replace('.', ',')}
      </div>
    </div>
  );
}

export default FinalizeOrder;
