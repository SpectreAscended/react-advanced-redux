import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import classes from './CartItem.module.css';

const CartItem = props => {
  const dispatch = useDispatch();
  const { title, quantity, total, price, id } = props.item;

  const addItemToCartHandler = item => {
    dispatch(cartActions.addItem(item));
  };

  const removeItemsFromCartHandler = id => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={removeItemsFromCartHandler.bind(null, props.item.id)}
          >
            -
          </button>
          <button onClick={addItemToCartHandler.bind(null, props.item)}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
