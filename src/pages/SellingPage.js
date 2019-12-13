import React from 'react';
import {
  Card, CardBody, Spinner,
} from 'reactstrap';
import useMe from '../hooks/useMe';
import useUserProducts from '../hooks/useUserProducts';
import Product from '../components/Product';

const SellingPage = () => {
  const [me, loading] = useMe();
  const { userProducts, userProductsLoading } = useUserProducts(me ? me.username : null);

  if (loading) return <Spinner style={{ width: '2rem', height: '2rem' }} />;


  return (
    <div style={{ marginLeft: '80px', marginRight: 'auto' }}>
      <Card>
        <CardBody
          style={{ marginLeft: '7%', marginRight: 'auto', paddingBottom: '45px' }}
        >
          {userProductsLoading ? <Spinner />
            : userProducts.map((userProduct) => (
              <Product
                key={userProduct._id}
                {...userProduct}
              />
            ))}
        </CardBody>
      </Card>
    </div>
  );
};


export default SellingPage;
