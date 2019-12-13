import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Spinner,
} from 'reactstrap';
import useUser from '../hooks/useUser';
import useUserProducts from '../hooks/useUserProducts';
import Product from '../components/Product';

const UserPage = (props) => {
  const { match: { params: { username } } } = props;
  const { user, loading } = useUser(username);
  const { userProducts, userProductsLoading } = useUserProducts(username);

  if (loading) return <Spinner style={{ width: '2rem', height: '2rem' }} />;
  const { profile } = user;

  return (
    <div style={{ marginLeft: '80px', marginRight: 'auto' }}>
      <Card>
        <CardImg className="avatar mt-3" src={profile.avatar} />
        <CardTitle className="mr-auto ml-auto">
          <CardTitle className="h4 text-center">{profile.firstName}</CardTitle>
          <CardTitle className="h4 text-center">{profile.lastName}</CardTitle>
        </CardTitle>
        <CardBody style={{ marginLeft: '7%', marginRight: 'auto', paddingBottom: '45px' }}>

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


export default UserPage;
