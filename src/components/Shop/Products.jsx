import ProductItem from './ProductItem';
import classes from './Products.module.css';
import DUMMY_ITEMS from '../../store/dummyItems';

const Products = props => {
  const items = DUMMY_ITEMS.map(item => {
    return (
      <ProductItem
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        description={item.description}
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
