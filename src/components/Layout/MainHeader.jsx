import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/uiSlice';
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = props => {
  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
  };

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={showCartHandler} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
