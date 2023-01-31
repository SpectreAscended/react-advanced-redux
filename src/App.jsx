import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cartActions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartOpen = useSelector(state => state.ui.cartOpen);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    let timer;
    if (cart.changed) {
      dispatch(sendCartData(cart));
      setShowNotification(true);
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [cart, dispatch]);

  return (
    <>
      {showNotification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartOpen && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
