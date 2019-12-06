import React from 'react';
import {
  Spinner,
  Card, CardBody, CardText, Media, Button,

} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useProduct from '../hooks/useProduct';
import Product from '../components/Product';
import routes from '../router/routes';
import notImage from '../images/notImage.png';

const ProductPage = (props) => {
  const { match: { params: { _id } } } = props;
  const {
    product, loading,
  } = useProduct(_id);
  if (!product && loading) return <Spinner />;
  if (product && product.length === 0) return <Spinner />;

  const {
    title, description, images, price,
  } = product;
  const { firstName, lastName, avatar } = product.creator.profile;

  const image = images && images[0].url ? images[0].url : notImage;


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
        <Link

          to={`${routes.product}/${_id}`}
          className="mt-2 ml-2"
        >
          <CardBody className="pb-2 pl-2 pt-2" style={{ paddingRight: '0px' }}>
            <span className="d-flex">
              <Media
                style={{ width: '100%' }}
                src={image}
                alt="pic"
              />


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
        </Link>
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
          <h3>{price}</h3>
          <Button color="primary" style={{ width: '100%' }}> Start Chat </Button>
          <br />
          <Button color="primary" style={{ width: '100%' }}> Add to wish list  </Button>
          <p>Status</p>
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

          to={`${routes.product}/${_id}`}
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
          paddingBottom: '30px',
        }}
        >
          <CardBody style={{ padding: '0px' }}>
            <Product
              key={product._id}

              {...product}
            />
            <Product
              key={product._id}

              {...product}
            />
            <Product
              key={product._id}

              {...product}
            />
          </CardBody>
        </Card>
      </div>

    </div>
  );
};

export default ProductPage;
