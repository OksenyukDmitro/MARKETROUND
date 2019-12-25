import React from 'react';
import {
  Input, Button, Form, Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import routes from '../router/routes';
import validationSchema from '../helpers/validationSchema';
import useForgotPassword from '../hooks/useForgotPassword';

const ForgotPasswordPage = () => {
  const [handleSubmit, errChange] = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      username: validationSchema.username,
      email: validationSchema.email,
      newPassword: validationSchema.password,
    }),
    onSubmit: (values) => { handleSubmit(values); },
  });

  const { username, email, newPassword } = formik.values;
  const disabled = Boolean(formik.errors.newPassword
        || formik.errors.username || formik.errors.email);
  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="text-center"
      style={{
        minWidth: '200px', maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
      }}
    >
      <h2 className="login text-center">Password reset</h2>
      <Alert className="login-input font-weight-normal" color="danger" isOpen={errChange.active}>
        {errChange.msg}
      </Alert>
      <Input
        className="login-input"
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Alert
        className="login-input font-weight-normal"
        color="danger"
        isOpen={Boolean(formik.touched.username && formik.errors.username)}
      >
        {formik.errors.username}
      </Alert>
      <Input
        className="login-input"
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Alert
        className="login-input font-weight-normal"
        color="danger"
        isOpen={Boolean(formik.touched.email && formik.errors.email)}
      >
        {formik.errors.email}
      </Alert>
      <Input
        className="login-input"
        type="text"
        name="newPassword"
        placeholder="New password"
        value={newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Alert
        className="login-input font-weight-normal"
        color="danger"
        isOpen={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
      >
        {formik.errors.newPassword}
      </Alert>

      <Button
        className="button"
        type="submit"
        color="secondary"
        disabled={disabled}
      >
                Reset password
      </Button>
      <div>
                Don&apos;t have an account? <Link to={routes.signUp}>Sign up</Link>
        <br />
      </div>
    </Form>
  );
};


export default ForgotPasswordPage;
