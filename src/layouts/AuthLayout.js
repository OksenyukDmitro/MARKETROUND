import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Container,
  Button,
  Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../images/onlyLogo.png';
import routes from '../router/routes';

const AuthLayout = ({ children }) => (
  <>
    <Navbar
      className="nav-bar "
      color="white"
      light
      expand="md"
      style={{
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
      }}
    >

      <Link to={routes.login}>
        <Button>Login</Button>
      </Link>
      <NavbarBrand>
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
      </NavbarBrand>
    </Navbar>
    <Container>
      {children}
    </Container>
  </>
);
export default AuthLayout;
