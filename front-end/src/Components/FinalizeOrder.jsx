import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

function FinalizeOrder() {
  const [sellers] = useState([]);
  const [seller, setSeller] = useState(0);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  console.log('TESTE');

  // const history = useNavigate();
  const dispatch = useDispatch();
  const products = JSON.parse(localStorage.getItem('cartItems') || []);
  console.log('produtct', products);
  const sumPrices = products.reduce((acc, curr) => (curr.price * curr.quantity) + acc, 0);

  // useEffect(() => {
  //   const asyncFunction = async () => {
  //     const { token } = JSON.parse(localStorage.getItem('user'));
  //     const newSellers = await getSellers(token);
  //     setSellers(newSellers);
  //     setSeller(newSellers[0].id);
  //   };
  //   asyncFunction();
  // }, []);

  async function finishOrder() {
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const body = {
      user_id: id,
      seller_id: seller,
      status: 'Pendente',
      delivery_address: address,
      delivery_number: number,
      total_price: sumPrices,
      products,
    };
    console.log(token);
    console.log(body);
    // const order = await createOrder({ token, body });
    dispatch(setProducts([]));
    // history(`/customer/orders/${order.id}`);
    // atualizando branch
  }

  return (
    <div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form>
        <select
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target }) => setSeller(target.value) }
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

export default FinalizeOrder;
