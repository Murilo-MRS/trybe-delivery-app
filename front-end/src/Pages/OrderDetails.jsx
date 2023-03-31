import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';

function OrderDetails() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
OrderDetails.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default OrderDetails;
