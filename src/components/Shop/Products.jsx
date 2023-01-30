import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import ProductItem from './ProductItem';
import classes from './Products.module.css';
import DUMMY_ITEMS from '../../store/dummyItems';

const Products = props => {
  const dispatch = useDispatch();

  const addItemHandler = item => {
    const cartItem = {
      ...item,
      quantity: 1,
    };
    dispatch(cartActions.addItem(cartItem));
  };

  const items = DUMMY_ITEMS.map(item => {
    return (
      <ProductItem
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        description={item.description}
        onAddItem={addItemHandler.bind(null, item)}
      />
    );
  });

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{items}</ul>
    </section>
  );
};

export default Products;
