import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  NavItem,
  NavLink,
} from 'reactstrap';
import logo from '../images/onlyLogo.png';

const AuthLayout = ({ children }) => (
  <>
    <Navbar className="nav-bar " color="white" light expand="md">
      <NavbarBrand href="#">
        <img src={logo} alt="j" style={{ width: '60px' }} />
      </NavbarBrand>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#">
                About us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
                Why NAF?
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <Container>
      {children}
    </Container>
  </>
);
export default AuthLayout;
