import React from 'react';
import { Spinner } from 'reactstrap';
import useMe from '../hooks/useMe';
import useUserProducts from '../hooks/useUserProducts';
import Product from '../components/Product';

const SellingPage = () => {
  const [me, loading] = useMe();
  const { userProducts, userProductsLoading } = useUserProducts(me ? me.username : null);
  if (loading) return <Spinner style={{ width: '2rem', height: '2rem' }} />;
  return (
    <div style={{ marginLeft: '13%', marginRight: 'auto' }}>
      {userProductsLoading ? <Spinner />
        : userProducts.map((userProduct) => (
          <Product
            key={userProduct._id}
            {...userProduct}
          />
        ))}

    </div>
  );
};


export default SellingPage;
