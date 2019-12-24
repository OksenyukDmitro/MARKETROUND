import React from 'react';
import {
  CardImg, CardBody, CardTitle, Spinner,
} from 'reactstrap';
import useUser from '../hooks/useUser';
import useUserProducts from '../hooks/useUserProducts';
import Product from '../components/Product';
import emptyAvatar from '../images/emptyAvatar.png';

const UserPage = (props) => {
  const { match: { params: { username } } } = props;
  const { user, loading } = useUser(username);
  const { userProducts, userProductsLoading } = useUserProducts(user ? user._id : null);

  if (loading) return <Spinner style={{ width: '2rem', height: '2rem' }} />;
  const { profile } = user;
  const avatar = profile.avatar ? profile.avatar : emptyAvatar;
  return (
    <div style={{ marginLeft: '80px', marginRight: 'auto' }}>
      <CardTitle className="mr-auto ml-auto text-center">
        <CardImg className="avatar mt-3 " src={avatar} />
        <CardTitle className="h5">First Name: {profile.firstName}</CardTitle>
        <CardTitle className="h5">Last Name: {profile.lastName}</CardTitle>
      </CardTitle>

      {userProducts && userProducts.length > 0 ? <CardTitle
        className="p"
        style={{
          marginLeft: '7%',
          marginRight: 'auto',
          marginBottom: '-50px',
          marginTop: '50px',
        }}
      >User products :
      </CardTitle> : null}

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
