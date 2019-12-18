import React from 'react';
import {
  CardImg, CardBody, CardTitle, Spinner,
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


      <CardTitle className="mr-auto ml-auto text-center">
        <CardImg className="avatar mt-3 " src={profile.avatar} />
        <CardTitle className="h4">{profile.firstName}</CardTitle>
        <CardTitle className="h4">{profile.lastName}</CardTitle>
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

    </div>
  );
};


export default UserPage;
