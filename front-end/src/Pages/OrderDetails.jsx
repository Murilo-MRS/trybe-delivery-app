/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import OrderDescription from '../Components/OrderDescription';
import { getRequest, patchRequest } from '../Utils/axios';
import { formatDate } from '../Utils/normalize';

function OrderDetails({ history, match }) {
  const { params: { id } } = match;
  const [products, setProducts] = useState([]);
  const [sellerName, setSellerName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const od = 'customer_order_details';
  useEffect(() => {
    const request = async () => {
      const {
        products: arrayProducts,
        seller: { name },
        saleDate,
        status: currentStatus,
        totalPrice: tp,
      } = await getRequest(`/salesDetails/${id}`);
      const formatedArray = arrayProducts
        .map(({ SaleProduct: { quantity }, ...rest }) => ({ ...rest, quantity }));
      setProducts(formatedArray);
      setSellerName(name);
      setDate(formatDate(saleDate));
      setStatus(currentStatus);
      return setTotalPrice(tp);
    };
    request();
  }, []);

  const changeStatus = () => {
    const request = async () => {
      await patchRequest(`/salesDetails/${id}`, { status: 4 });
      return setStatus('Entregue');
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
            data-testid={ `${od}__element-order-details-label-order-${id}` }
          >
            {id}
          </span>
        </p>
        <p>
          Vendedor:
          {' '}
          <span
            data-testeid={ `${od}__element-order-details-label-seller-name` }
          >
            {sellerName}
          </span>
        </p>
        <p
          data-testeid={ `${od}__element-order-details-label-order-date` }
        >
          {date}
        </p>
        <p
          data-testeid={ `${od}__element-order-details-label-delivery-status${id}` }
        >
          {status}
        </p>
        <button
          type="button"
          onClick={ changeStatus }
          data-testeid={ `${od}__button-delivery-check` }
          disabled={ status === 'Entregue' }
        >
          Marcar como entregue
        </button>
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
