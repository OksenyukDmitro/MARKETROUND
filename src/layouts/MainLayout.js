import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
  Media,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faComment, faStar } from '@fortawesome/free-regular-svg-icons';
import logo from '../images/onlyLogo.png';
import routes from '../router/routes';

// TODO: Fix logo load
// TODO: Fix margin in top while scroll

const MainLayout = ({ children }) => (
  <div>
    <Navbar
      className="nav-bar mb-2"
      white
      expand="md"
      style={{
        backgroundColor: 'white',
        flexDirection: 'row-reverse',
      }}
    >
      <Link to={routes.createProduct}>
        <Button>Sell</Button>
      </Link>
      <NavbarToggler className="m-2" />
    </Navbar>
    <Container>
      {children}
    </Container>

    <Navbar
      style={{
        width: '70px',
        height: '100%',
        position: 'fixed',
        marginTop: '-65px',
        backgroundColor: 'white',
        display: 'flow-root',
        top: '76px',
      }}
    >
      <div>
        <NavbarBrand tag="span">
          <Link
            to={routes.home}
            className="mt-2 ml-2"
          >
            <Button
              className="bg-transparent border-0"
              style={{
                margin: '0px',
                marginLeft: '-12px',
                marginTop: '-5px',
                width: ' 62px',
                height: ' 58px',
              }}
            >
              <Media
                src={logo}
                alt="pic"
                style={{
                  width: ' 62px',
                  marginLeft: '-20px',
                  marginTop: '-8px',
                }}
              />
            </Button>
          </Link>
          <br />
          <Button
            className="bg-transparent border-0"
            style={{
              margin: '0px',
              marginLeft: '-20px',

            }}
          >
            <FontAwesomeIcon className="fa-3x" icon={faStar} color="#6B7BF7" />
            <p style={{ color: 'black' }}> Wish</p>
          </Button>
          <br />
          <Link to={routes.chats}>
            <Button
              className="bg-transparent border-0"
              style={{
                margin: '0px',
                marginLeft: '-16px',
              }}
            >
              <FontAwesomeIcon className="fa-3x" icon={faComment} color="#6B7BF7" />
              <p style={{ color: 'black' }}> Chats</p>
            </Button>
          </Link>
          <br />
          <Button
            className="bg-transparent border-0"
            style={{
              margin: '0px',
              marginLeft: '-23px',
            }}
          >
            <FontAwesomeIcon className="fa-3x" icon={faStore} color="#6B7BF7" />
            <p style={{ color: 'black' }}> Selling</p>
          </Button>
          <br />
          <Button
            className="bg-transparent border-0"
            style={{
              margin: '0px',
              marginLeft: '-16px',
            }}
          >
            <FontAwesomeIcon className="fa-3x" icon={faUserTie} color="#6B7BF7" />
            <p style={{ color: 'black' }}> Profile</p>
          </Button>
        </NavbarBrand>
      </div>
    </Navbar>


  </div>
);

export default MainLayout;
