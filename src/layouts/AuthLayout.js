import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  NavItem,
  Button,
  Media,
} from 'reactstrap';
import logo from '../images/onlyLogo.png';
import { Link } from 'react-router-dom';
import routes from '../router/routes';

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar className="nav-bar " color="white" light expand="md">
        <NavbarBrand >
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
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to={routes.login}>
                <Button>Login</Button>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        {children}
      </Container>
    </>
  )
};
export default AuthLayout;
