import React from 'react';
import { Spinner } from 'reactstrap';
import Product from '../components/Product';
import useProducts from '../hooks/useProducts';

const ProductsPage = () => {
  const {
    products, handleRemovePost, loading, isFetchMore: isFetchingMore,
  } = useProducts();
  console.log(products);
  if (loading && products.length === 0) return <Spinner />;
  return (
    <div style={{ marginLeft: '13%', marginRight: 'auto' }}>
      {products.map((post) => (
        <Product
          key={post._id}
          handleRemovePost={() => handleRemovePost({ _id: post._id })}
          {...post}
        />
      ))}
      {isFetchingMore && <Spinner />}
    </div>
  );
};

export default ProductsPage;
