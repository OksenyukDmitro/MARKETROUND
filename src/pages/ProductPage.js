import React, { useState } from 'react';
import {
  Spinner,
  Card, CardBody, CardText, Media, Button, Input,
} from 'reactstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Link } from 'react-router-dom';
import useProduct from '../hooks/useProduct';
import useUserProducts from '../hooks/useUserProducts';
import useChatHandlers from '../hooks/useChatHandlers';
import Product from '../components/Product';
import routes from '../router/routes';
import notImage from '../images/notImage.png';
import useMe from '../hooks/useMe';
import useWishHandlers from '../hooks/useWishHandlers';
import useProductHandlers from '../hooks/useProductHandlers';
import WishModel from '../modules/wish';
import enumStatus from '../status';

const ProductPage = (props) => {
  const { match: { params: { _id } }, history, location } = props;
  const [isWish, setWish] = useState(WishModel.isWish(_id));
  const { product, loading } = useProduct(_id);
  const [localStatus, setStatus] = useState('CLOSED');
  const { updateProduct } = useProductHandlers(_id);
  const { userProducts, userProductsLoading } = useUserProducts(product
    ? product.creator._id : null);
  const [me] = useMe();
  const [handleCreateChat] = useChatHandlers(history);
  const [addToWish, removeFromWish] = useWishHandlers(_id, setWish);

  if (!product && loading) return <Spinner />;
  if (product && product.length === 0) return <Spinner />;

  const openLoginPage = () => {
    history.push({
      pathname: routes.login,
      state: {
        from: location.pathname,
      },
    });
  };
  const {
    title, description, images, price, status, category,
  } = product;
  const { firstName, lastName, avatar } = product.creator.profile;
  const { _id: ownerId, username: ownerUsername } = product.creator;
  const imagesForImageGallery = [];
  if (images) {
    images.forEach((image) => {
      imagesForImageGallery.push({ original: image.url });
    });
  }

  return (
    <div style={{ marginLeft: '80px', marginRight: 'auto' }}>
      <div style={{
        float: 'left',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px',
        marginBottom: '10px',

        width: '100%',
        maxWidth: '500px',
      }}
      >
        <CardBody className="pb-2 pl-2 pt-2" style={{ paddingRight: '0px' }}>
          <span className="d-flex">

            {imagesForImageGallery.length > 0 ? <ImageGallery
              items={imagesForImageGallery}
              defaultImage={notImage}
              showBullets
              showIndex
              showThumbnails={false}
              lazyLoad
              showPlayButton={false}
            /> : <Media
              style={{ width: '100%' }}
              src={notImage}
              alt="pic"
            />}


          </span>
        </CardBody>
        <Card style={{
          marginLeft: '6px',
          width: '99%',
          maxWidth: '500px',
        }}
        >
          <span className="d-flex mb-0" />
          <hr className="m-0" />
          <CardBody style={{ paddingInline: '2px' }}>
            <h3>{` ${title}`}</h3>
            <br />
            <CardText tag="span">
              <p style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              >
                {` ${description}`}<br />
              </p>
            </CardText>
          </CardBody>

        </Card>
      </div>
      <div style={{

        float: 'left',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
        paddingRight: '70px',
        width: '100%',
        maxWidth: '300px',
      }}
      >
        <CardBody className="mt-2 ml-2 pb-2 pl-2 pt-2" style={{ paddingRight: '0px', maxWidth: '300px' }}>
          <h5>Price : {price}</h5>
          <Button
            disabled={status === 'CLOSED'}
            onClick={me ? () => handleCreateChat(_id, me._id, ownerId) : openLoginPage}
            color="primary"
            style={{ width: '100%' }}
          >{me && me._id === ownerId ? 'Chats' : 'Start Chat'}
          </Button>
          <br />
          <Button
            onClick={isWish ? removeFromWish : addToWish}
            color="primary"
            style={{ width: '100%' }}
            disabled={!me}
          >
            {isWish ? 'Remove from wish list' : 'Add to wish list'}
          </Button>
          {me && me._id === ownerId ? <>

            <Input
              className="login-input "
              type="select"
              name="status"
              style={{
                marginLeft: '10px', maxWidth: '200px', minWidth: '100px', marginTop: '5px',
              }}
              onChange={({ target }) => setStatus(target.value)}
            >
              {enumStatus.map((sts) => (
                <option>{sts}</option>
              ))}

            </Input>
            <Button
              onClick={() => updateProduct(_id, localStatus)}
              color="primary"
              style={{ width: '100%' }}
            >
              Change status
            </Button>
          </> : null}
          <p>Status : {status}</p>
          <p>Category : {category.name}</p>
        </CardBody>

      </div>
      <div style={{
        float: 'left',
        marginRight: '0px',
        marginTop: '10px',
        marginBottom: '10px',
        width: '100%',
        maxWidth: '340px',

      }}
      >
        <Link
          to={me && me._id === ownerId ? `${routes.profile}` : `${routes.profile}/${ownerUsername}`}
          className="mt-2 ml-2"
        >

          <Card style={{
            marginLeft: '6px',
            width: '99%',
            maxWidth: '500px',
          }}
          >

            <CardBody style={{ paddingInline: '2px' }}>
              <Media
                className="avatar"
                style={{ width: '50%' }}
                src={avatar || notImage}
                alt="pic"
              />

              <h3>{` ${firstName}`}</h3>
              <br />
              <h3>{` ${lastName}`}</h3>
              <br />

            </CardBody>

          </Card>
        </Link>

        <Card style={{
          marginLeft: '6px',
          marginTop: '30px',
          width: '99%',
          maxWidth: '500px',
          height: '100%',
          paddingBottom: userProducts.length > 0 ? '30px' : '0px',
        }}
        >
          <CardBody style={{ padding: '0px' }}>

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

    </div>
  );
};

export default ProductPage;
