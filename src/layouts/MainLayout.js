import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
  Media,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faComment, faStar } from '@fortawesome/free-regular-svg-icons';
import logo from '../images/onlyLogo.png';


const MainLayout = ({ children }) => (
  <div>
    <Navbar
      className="nav-bar mb-2"
      white
      expand="md"
      style={{
        backgroundColor: 'white',
      }}
    >
      <NavbarBrand tag="span">
        Ky
      </NavbarBrand>
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
      }}
    >

      <div>
        <NavbarBrand tag="span">
          <Media
            src={logo}
            alt="pic"
            style={{
              width: ' 62px',
              marginLeft: '-14px',
              marginTop: '-8px',
            }}
          />
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
