import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRequest, postRequest } from '../Utils/axios';
import { getUser, getProductsCart, getTotalPrice } from '../Utils/LocalStorage';

function FinalizeOrder({ history }) {
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const request = async () => {
      const sellerRequest = await getRequest('/sellers');
      return setSellers(sellerRequest);
    };
    request();
  }, []);

  useEffect(() => {
    setSellerId(sellers[0]?.id);
  }, [sellers]);

  async function finishOrder() {
    const { id: userId } = getUser();
    const totalPrice = getTotalPrice().replace(',', '.');

    const body = {
      userId,
      sellerId,
      deliveryAddress: address,
      deliveryNumber: number,
      totalPrice: Number(totalPrice),
      products: getProductsCart(),
    };

    const { id } = await postRequest('/sales', body);
    return history.push(`/customer/orders/${id}`);
  }

  return (
    <div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form>
        <select
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target }) => setSellerId(target.value) }
        >
          { sellers.map(({ id, name }, index) => (
            <option key={ index } value={ id }>{ name }</option>
          )) }
        </select>
        <label htmlFor="input-address">
          Endereço
          <input
            type="text"
            id="input-address"
            data-testid="customer_checkout__input-address"
            onChange={ ({ target }) => setAddress(target.value) }
          />
        </label>
        <label htmlFor="input-number">
          Número
          <input
            type="text"
            id="input-number"
            data-testid="customer_checkout__input-address-number"
            onChange={ ({ target }) => setNumber(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => finishOrder() }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

FinalizeOrder.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default FinalizeOrder;
