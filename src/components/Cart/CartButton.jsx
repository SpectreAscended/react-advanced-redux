import { useSelector } from 'react-redux';
import classes from './CartButton.module.css';

const CartButton = props => {
  const totalAmount = useSelector(state => state.cart.totalAmount);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default CartButton;
