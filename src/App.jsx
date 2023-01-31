import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/uiSlice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartOpen = useSelector(state => state.ui.cartOpen);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data',
        })
      );

      const res = await fetch(
        'https://react-redux-f738e-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (!res.ok) throw new Error('Sending cart data failed.');

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Sent cart data successfully',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(err => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          tittle: 'Error.',
          message: 'Sending cart data failed',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
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
