import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const cartOpen = useSelector(state => state.ui.cartOpen);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    fetch('https://react-redux-f738e-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
      headers: {
        'Content-type': 'application/json',
      },
    });
  }, [cart]);

  return (
    <Layout>
      {cartOpen && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
