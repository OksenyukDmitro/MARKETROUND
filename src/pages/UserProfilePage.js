import React from 'react';
import {
  Col, Form, Button, FormGroup, Label, Input, Media, Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import routes from '../router/routes';
import useUserForm from '../hooks/useUserForm';


const UserProfilePage = () => {
  const [state, handleChange, handleSubmit] = useUserForm();
  const {
    username, firstName, lastName, avatar, isUploading,
  } = state;
  return (
    <div style={{ marginLeft: '80px', marginRight: 'auto' }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Col sm={12}>
            <Media className="avatar" src={avatar} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Username
          </Label>
          <Col sm={9}>
            <Input value={username} name="username" onChange={handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            First name
          </Label>
          <Col sm={9}>
            <Input value={firstName} name="firstName" onChange={handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Last name
          </Label>
          <Col sm={9}>
            <Input value={lastName} name="lastName" onChange={handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={3}>
            Avatar
          </Label>
          <Col sm={9}>
            <Input type="file" name="newAvatar" onChange={handleChange} />
          </Col>

        </FormGroup>

        {isUploading ? <Spinner style={{ width: '2rem', height: '2rem' }} /> : null}
        <Col className="clearfix">
          <Link to={routes.changePassword}>
            <Button className="button" type="button" style={{ float: 'left', marginLeft: '0' }}>  Change Password</Button>
          </Link>
          <Button
            style={{ float: 'right' }}
            className="button"
          >
            Save changes
          </Button>
        </Col>
      </Form>


    </div>
  );
};

export default UserProfilePage;
