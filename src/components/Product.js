import React from 'react';
import {
  Card, CardBody, CardText, Media,

} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import routes from '../router/routes';
import notImage from '../images/notImage.png';

const Product = ({
  _id, title, images, price,
}) => {
  const image = images && images[0] && images[0].url ? images[0].url : notImage;

  return (
    <div style={{
      width: '320px',
      float: 'left',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10px',
      marginBottom: '10px',
      maxHeight: '250px',

    }}
    >
      <Link

        to={`${routes.product}/${_id}`}
        className="mt-2 ml-2"
      >
        <Card style={{
          margin: '10px',
          height: '250px',
        }}
        >
          <span className="d-flex mb-0">

            <CardBody className="pb-2 pl-2 pt-2" style={{ paddingRight: '8px' }}>
              <span className="d-flex">
                <Media
                  style={{ width: '280px', height: '160px' }}
                  src={image}
                  alt="pic"
                />


              </span>
            </CardBody>
          </span>
          <hr className="m-0" />
          <CardBody style={{ padding: '0px', paddingInline: '2px' }}>
            <CardText tag="span">
              <p style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              > {` ${title}`}<br />
                {` ${price}`}<br />
              </p>
            </CardText>
          </CardBody>

        </Card>
      </Link>
    </div>
  );
};

export default Product;
