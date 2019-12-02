import React from 'react';
import {
  Card, CardBody, CardText, CardTitle, Media,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useMe from '../hooks/useMe';
import routes from '../router/routes';

const Product = ({
  description, creator: owner, createdAt,
}) => {
  const [me] = useMe();
  const { _id: ownerId } = owner;
  const { avatar, firstName, lastName } = owner.profile;


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
      <Card style={{
        margin: '10px',
        height: '200px',
      }}
      >
        <span className="d-flex mb-0">
          <CardBody className="pb-2 pl-2 pt-2">
            <span className="d-flex">
              <Media
                className="icon"
                src={avatar}
                alt="pic"
              />
              <Link

                to={me._id === ownerId ? `${routes.profile}` : `${routes.profile}/${owner.username}`}
                className="mt-2 ml-2"
              >
                {` ${firstName}`} {lastName}<br />
                <small>{moment(createdAt, 'x').fromNow()}</small>
              </Link>
            </span>
          </CardBody>
          <CardTitle>

            {me._id === ownerId
              ? <Button className=" border-0 bg-transparent">X</Button>
              : null}

          </CardTitle>
        </span>
        <hr className="m-0" />
        <CardBody>
          <CardText tag="span"><p>{description}</p></CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Product;
