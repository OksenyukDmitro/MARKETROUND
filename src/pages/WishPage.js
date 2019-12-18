import React from 'react';
import { Spinner } from 'reactstrap';
import Product from '../components/Product';
import useWishProducts from '../hooks/useWishProducts';

const WishPage = () => {
  const {
    products, loading, isFetchMore: isFetchingMore,
  } = useWishProducts();


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

export default WishPage;
