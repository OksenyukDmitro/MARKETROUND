import React from 'react';
import {
  Col, Form, Button, FormGroup, Label, Input, Media, Spinner, Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import routes from '../router/routes';
import useUserForm from '../hooks/useUserForm';
import validationSchema from '../validationSchema';


const UserProfilePage = () => {
  const [state, formikState, handleSubmit] = useUserForm();

  const formik = useFormik({
    initialValues: formikState,
    validationSchema: Yup.object({
      username: validationSchema.username,
      firstName: validationSchema.firstName,
      lastName: validationSchema.lastName,
    }),

  });
  const {
    username, firstName, lastName,
  } = formik.values;
  const { avatar, isUploading } = state;
  const disabled = Boolean(formik.errors.username
    || formik.errors.firstName || formik.errors.lastName || isUploading);
  return (
    <div style={{ marginLeft: '80px', marginRight: 'auto' }}>
      <Form
        style={{
          minWidth: '200px', maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
        }}
        onSubmit={(e) => handleSubmit(e, formik.values)}
      >
        <FormGroup>
          <Col sm={12}>
            <Media className="avatar" src={avatar} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label sm={3} style={{ display: 'unset' }}>
            Username
          </Label>
          <Col>
            <Input
              value={username}
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              style={{
                padding: '5px',
                marginBottom: '0px',
              }}
              className="font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.errors.username)}
            >
              {formik.errors.username}
            </Alert>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label sm={3} style={{ display: 'unset' }}>
            First name
          </Label>
          <Col>
            <Input
              value={firstName}
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              style={{
                padding: '5px',
                marginBottom: '0px',
              }}
              className=" font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.errors.firstName)}
            >
              {formik.errors.firstName}
            </Alert>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label
            style={{ display: 'unset' }}
            sm={3}
          >
            Last name
          </Label>
          <Col>
            <Input
              value={lastName}
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              style={{
                padding: '5px',
                marginBottom: '0px',
              }}
              className=" font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.errors.lastName)}
            >
              {formik.errors.lastName}
            </Alert>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label sm={3} style={{ display: 'unset' }}>
            Avatar
          </Label>
          <Col>
            <Input
              type="file"
              name="newAvatar"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>

        </FormGroup>

        {isUploading ? <Spinner style={{ width: '2rem', height: '2rem' }} /> : null}
        <Col className="clearfix">
          <Link to={routes.changePassword}>
            <Button className="button" type="button" style={{ float: 'left', marginLeft: '0' }}>  Change Password</Button>
          </Link>
          <Button
            disabled={disabled}
            type="submit"
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
