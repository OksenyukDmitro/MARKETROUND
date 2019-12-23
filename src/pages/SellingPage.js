import React from 'react';
import { Spinner, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import useMe from '../hooks/useMe';
import useUserProducts from '../hooks/useUserProducts';
import Product from '../components/Product';
import routes from '../router/routes';

const SellingPage = () => {
  const [me, loading] = useMe();
  const { userProducts, userProductsLoading } = useUserProducts(me ? me._id : null);
  if (loading || userProductsLoading) return <Spinner style={{ width: '2rem', height: '2rem' }} />;

  return (
    <div style={{ marginLeft: '13%', marginRight: 'auto' }}>
      {userProducts.length > 0 ? userProducts.map((userProduct) => (
        <Product
          key={userProduct._id}
          {...userProduct}
        />
      )) : <div className="mr-auto ml-auto text-center">
        <p>Your product list is empty.</p>
        <p>You can add a product on the product creation page</p>
        <Link to={routes.createProduct}>
          <Button>
              Create product
          </Button>
        </Link>
      </div>}

    </div>
  );
};


export default SellingPage;
