import React from 'react';
import {
  Card, CardBody, CardText, Media,

} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useMe from '../hooks/useMe';
import routes from '../router/routes';
import notImage from '../images/notImage.png';

const Product = ({
  title, creator: owner, images, price,
}) => {
  console.log(images);
  const [me] = useMe();
  const { _id: ownerId } = owner;
  const image = images && images[0].url ? images[0].url : notImage;

  return (
    <div style={{
      width: '200px',
      float: 'left',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10px',
      marginBottom: '10px',
      maxHeight: '200px',

    }}
    >
      <Link

        to={me._id === ownerId ? `${routes.profile}` : `${routes.profile}/${owner.username}`}
        className="mt-2 ml-2"
      >
        <Card style={{
          margin: '10px',
          height: '200px',
        }}
        >
          <span className="d-flex mb-0">

            <CardBody className="pb-2 pl-2 pt-2">
              <span className="d-flex">
                <Media
                  style={{ width: '160px', height: '120px' }}
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
