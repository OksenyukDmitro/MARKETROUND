import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
  Media,
  Button,
} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faComment, faStar } from '@fortawesome/free-regular-svg-icons';
import logo from '../images/onlyLogo.png';
import routes from '../router/routes';
import useAuthHandlers from '../hooks/useAuthHandlers';
import color from '../helpers/colors';


const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  const { logout } = useAuthHandlers();
  return (
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
        <div>
          <Link to={routes.createProduct}>
            <Button>Sell</Button>
          </Link>
          <Button onClick={logout}>log out</Button>
        </div>
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
          marginTop: '-75px',
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
            <Link
              to={routes.wish}
              className="mt-2 ml-2"
            >
              <Button
                className="border-0"
                style={{
                  margin: '0px',
                  marginLeft: '-30px',
                  backgroundColor: pathname === routes.wish ? color.navBarSelected : 'transparent',
                }}
              >
                <FontAwesomeIcon className="fa-3x" icon={faStar} color={color.main} />
                <p style={{ color: 'black' }}> Wish</p>
              </Button>
            </Link>
            <br />
            <Link to={routes.chats}>
              <Button
                className="border-0"
                style={{
                  margin: '0px',
                  marginLeft: '-16px',
                  marginBottom: '12px',
                  backgroundColor: pathname === routes.chats ? color.navBarSelected : 'transparent',
                }}
              >
                <FontAwesomeIcon className="fa-3x" icon={faComment} color={color.main} />
                <p style={{ color: 'black' }}> Chats</p>
              </Button>
            </Link>
            <br />
            <Link to={routes.selling}>
              <Button
                className=" border-0"
                style={{
                  margin: '0px',
                  marginLeft: '-23px',
                  paddingRight: '3px',
                  backgroundColor: pathname === routes.selling ? color.navBarSelected : 'transparent',
                }}
              >
                <FontAwesomeIcon className="fa-3x" icon={faStore} color={color.main} />
                <p style={{ color: 'black' }}> Selling</p>
              </Button>
            </Link>
            <br />
            <Link to={routes.profile}>
              <Button
                className="border-0"
                style={{
                  margin: '0px',
                  marginLeft: '-16px',
                  backgroundColor: pathname === routes.profile ? color.navBarSelected : 'transparent',
                }}
              >
                <FontAwesomeIcon className="fa-3x" icon={faUserTie} color={color.main} />
                <p style={{ color: 'black' }}> Profile</p>
              </Button>
            </Link>
          </NavbarBrand>
        </div>
      </Navbar>


    </div>
  );
};

export default MainLayout;
