import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatValues, { formatDate } from '../Utils/normalize';

function OrderCard({ id, status, saleDate, totalPrice }) {
  return (
    <div>
      <Link to={ `/customer/orders/${id}` }>
        <div>
          <span
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            {id}
          </span>
        </div>
        <div>
          <span
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            {status}
          </span>
        </div>
        <div>
          <p
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            {formatDate(saleDate)}
          </p>
          <p
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {formatValues(totalPrice)}
          </p>
        </div>
      </Link>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.Date,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
}.isRequired;

export default OrderCard;
