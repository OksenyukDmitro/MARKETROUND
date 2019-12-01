import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
} from 'reactstrap';


const MainLayout = ({ children }) => (
  <>
    <Navbar className="nav-bar mb-2" dark expand="md">
      <NavbarBrand tag="span">
                    Ky
      </NavbarBrand>
      <NavbarToggler className="m-2" />
    </Navbar>
    <Container>
      {children}
    </Container>
  </>
);

export default MainLayout;
