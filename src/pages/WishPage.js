import React from 'react';
import { Spinner, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import useWishProducts from '../hooks/useWishProducts';
import routes from '../router/routes';

const WishPage = () => {
  const {
    products, loading, isFetchMore: isFetchingMore,
  } = useWishProducts();

  if (loading && products.length === 0) return <Spinner />;
  return (
    <div style={{ marginLeft: '13%', marginRight: 'auto' }}>

      {products.length > 0 ? products.map((product) => (
        <Product
          key={product._id}

          {...product}
        />
      ))
        : <div className="mr-auto ml-auto text-center">
          <p>Your Wishlist is empty.</p>
          <p>You can add this product to the wishlist in the product page</p>
          <Link to={routes.home}>
            <Button>
              Go shopping
            </Button>
          </Link>
          </div>}
      {isFetchingMore && <Spinner />}
    </div>
  );
};

export default WishPage;
