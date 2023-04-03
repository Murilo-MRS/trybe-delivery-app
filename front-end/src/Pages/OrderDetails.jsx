/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import OrderDescription from '../Components/OrderDescription';
import { getRequest, patchRequest } from '../Utils/axios';
import formatValues, { formatDate } from '../Utils/normalize';

function OrderDetails({ history, match }) {
  const [products, setProducts] = useState([]);
  const [sellerName, setSellerName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const { params: { id }, path } = match;
  const arrayStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];
  const role = path.split('/')[1];
  const od = `${role}_order_details`;

  useEffect(() => {
    const request = async () => {
      const {
        products: arrayProducts,
        seller: { name },
        saleDate,
        status: currentStatus,
        totalPrice: tp,
      } = await getRequest(`/sales/${id}`);
      const formatedArray = arrayProducts
        .map(({ SaleProduct: { quantity }, ...rest }) => ({ ...rest, quantity }));
      setProducts(formatedArray);
      setSellerName(name);
      setDate(formatDate(saleDate));
      setStatus(currentStatus);
      return setTotalPrice(formatValues(tp));
    };
    request();
  }, []);

  const changeStatus = (statusSale) => {
    const request = async () => {
      await patchRequest(`/sales/${id}`, { status: Number(statusSale) });
      return setStatus(arrayStatus[Number(statusSale) - 1]);
    };
    request();
  };

  return (
    <div>
      <Navbar />
      <div>
        <p>
          Pedido:
          {' '}
          <span
            data-testid={ `${od}__element-order-details-label-order-id` }
          >
            {id}
          </span>
        </p>
        { role === 'customer' && (
          <p>
            Vendedor:
            {' '}
            <span
              data-testid={ `${od}__element-order-details-label-seller-name` }
            >
              {sellerName}
            </span>
          </p>
        )}
        <p
          data-testid={ `${od}__element-order-details-label-order-date` }
        >
          {date}
        </p>
        <p
          data-testid={ `${od}__element-order-details-label-delivery-status${id}` }
        >
          {status}
        </p>
        {role === 'customer' && (
          <button
            type="button"
            onClick={ () => changeStatus('4') }
            data-testid="customer_order_details__button-delivery-check"
            disabled={ status !== arrayStatus[2] }

          >
            Marcar como entregue
          </button>
        )}
        {role === 'seller' && (
          <div>
            <button
              type="button"
              onClick={ () => changeStatus('2') }
              data-testid="seller_order_details__button-preparing-check"
              disabled={ status !== arrayStatus[0] }
            >
              PREPARAR PEDIDO
            </button>

            <button
              type="button"
              onClick={ () => changeStatus('3') }
              data-testid="seller_order_details__button-dispatch-check"
              disabled={ status !== arrayStatus[1] }
            >
              SAIU PARA A ENTREGA
            </button>
          </div>
        )}
      </div>
      <OrderDescription
        history={ history }
        totalPrice={ totalPrice }
        orders={ products }
      />
    </div>
  );
}
OrderDetails.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default OrderDetails;
