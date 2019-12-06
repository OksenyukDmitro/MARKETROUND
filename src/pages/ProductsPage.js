import React from 'react';
import { Spinner } from 'reactstrap';
import Product from '../components/Product';
import useProducts from '../hooks/useProducts';

const ProductsPage = () => {
  const {
    products, loading, isFetchMore: isFetchingMore,
  } = useProducts();
  console.log(products);
  if (loading && products.length === 0) return <Spinner />;
  return (
    <div style={{ marginLeft: '13%', marginRight: 'auto' }}>
      {products.map((product) => (
        <Product
          key={product._id}

          {...product}
        />
      ))}
      {isFetchingMore && <Spinner />}
    </div>
  );
};

export default ProductsPage;
