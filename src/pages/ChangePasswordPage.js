import React from 'react';
import {
  Col, Form, Button, FormGroup, Label, Input, Media, Alert,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useChangePasswordForm from '../hooks/useChangePasswordForm';
import validationSchema from '../helpers/validationSchema';

const ChangePasswordPage = () => {
  const [state, handleSubmit] = useChangePasswordForm();

  const formik = useFormik({
    initialValues: state,
    validationSchema: Yup.object({
      password: validationSchema.password,
      newPassword: validationSchema.password,
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const {
    password, avatar, newPassword,
  } = formik.values;
  const disabled = Boolean(formik.errors.password || formik.errors.newPassword);
  return (
    <div
      className="row mx-auto justify-content-center align-items-center flex-column "
      style={{
        paddingLeft: '65px',
        minWidth: '50%',
        maxWidth: '500px',
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup row>
          <Col sm={12}>
            <Media className="avatar" src={avatar} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={3}>
                        password
          </Label>
          <Col sm={9}>
            <Input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Alert
              className=" font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.password && formik.errors.password)}
            >
              {formik.errors.password}
            </Alert>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="new password" sm={3}>
                        New password
          </Label>
          <Col sm={9}>
            <Input
              type="password"
              placeholder="new password"
              name="newPassword"
              value={newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={password.length < 3}
            />
            <Alert
              className=" font-weight-normal"
              color="danger"
              isOpen={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
            >
              {formik.errors.newPassword}
            </Alert>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ offset: 9 }}>
            <Button className="button" disabled={disabled}>
                            Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
